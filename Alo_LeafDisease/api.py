from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
import torch.nn as nn
from torchvision import transforms
from torchvision.models import vit_b_16, ViT_B_16_Weights
from PIL import Image
import numpy as np
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage
from dotenv import load_dotenv
import os
from typing import Optional
import io

# Khởi tạo FastAPI với prefix /api/v1
app = FastAPI(
    title="🌿 AI Nông Nghiệp API",
    description="API để nhận diện bệnh lá cây và tư vấn nông nghiệp",
    version="1.0.0",
    docs_url="/docs",  # Swagger UI
    redoc_url="/redoc",  # ReDoc alternative
    openapi_url="/openapi.json"  # OpenAPI schema
)

# Create router với prefix /api/v1
from fastapi import APIRouter
api_router = APIRouter(prefix="/api/v1")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================== GLOBAL MODELS ==================
device = None
model = None
transform = None
class_names = None
llm = None
combined_text = None

# ================== LOAD MODELS ==================
def load_model():
    """Load Vision Transformer model"""
    global device, model, transform, class_names
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
    try:
        checkpoint = torch.load("best.pt", map_location=device)
        weights = ViT_B_16_Weights.IMAGENET1K_V1
        model_vit = vit_b_16(weights=weights)
        num_classes = 46
        model_vit.heads.head = nn.Linear(model_vit.heads.head.in_features, num_classes)
        model_vit.load_state_dict(checkpoint["model_state_dict"])
        model_vit.to(device)
        model_vit.eval()
        
        transform_weights = weights.transforms()
        class_names_list = [
            'apple_apple_scab', 'apple_black_rot', 'apple_cedar_apple_rust', 'apple_healthy',
            'blueberry_healthy', 'cherry_including_sour_healthy', 'cherry_including_sour_powdery_mildew',
            'corn_maize_cercospora_leaf_spot_gray_leaf_spot', 'corn_maize_common_rust', 'corn_maize_healthy',
            'corn_maize_northern_leaf_blight', 'grape_black_rot', 'grape_esca_black_measles',
            'grape_healthy', 'grape_leaf_blight_isariopsis_leaf_spot', 'mango_anthracnose',
            'mango_bacterial_canker', 'mango_cutting_weevil', 'mango_die_back', 'mango_gall_midge',
            'mango_healthy', 'mango_powdery_mildew', 'mango_sooty_mould',
            'orange_haunglongbing_citrus_greening', 'peach_bacterial_spot', 'peach_healthy',
            'pepper_bell_bacterial_spot', 'pepper_bell_healthy', 'potato_early_blight',
            'potato_healthy', 'potato_late_blight', 'raspberry_healthy', 'soybean_healthy',
            'squash_powdery_mildew', 'strawberry_healthy', 'strawberry_leaf_scorch',
            'tomato_bacterial_spot', 'tomato_early_blight', 'tomato_healthy', 'tomato_late_blight',
            'tomato_leaf_mold', 'tomato_septoria_leaf_spot', 'tomato_spider_mites_two_spotted_spider_mite',
            'tomato_target_spot', 'tomato_tomato_mosaic_virus', 'tomato_tomato_yellow_leaf_curl_virus'
        ]
        
        model = model_vit
        transform = transform_weights
        class_names = class_names_list
        
        return True
    except Exception as e:
        raise Exception(f"Không thể tải model: {e}")

def load_chatbot():
    """Load Chatbot với Google Gemini"""
    global llm, combined_text
    
    load_dotenv()
    
    try:
        loader = TextLoader("books/huong_dan_trong_cay.txt", encoding="utf-8")
        documents = loader.load()
        
        splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        chunks = splitter.split_documents(documents)
        combined_text = "\n\n".join([chunk.page_content for chunk in chunks])
        
        llm_instance = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            temperature=0.3,
            google_api_key=os.getenv("GOOGLE_API_KEY")
        )
        
        llm = llm_instance
        return True
    except Exception as e:
        raise Exception(f"Không thể tải chatbot: {e}")

# ================== PREDICT & CHATBOT FUNCTIONS ==================
def predict_disease(image: Image.Image):
    """Dự đoán bệnh từ ảnh"""
    if model is None:
        raise HTTPException(status_code=503, detail="Model chưa được load")
    
    try:
        img = image.convert("RGB")
        img_t = transform(img).unsqueeze(0).to(device)
        
        with torch.no_grad():
            outputs = model(img_t)
            probs = torch.softmax(outputs, dim=1).cpu().numpy()[0]
            pred_idx = np.argmax(probs)
        
        return class_names[pred_idx], float(probs[pred_idx])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi dự đoán: {str(e)}")

def chatbot_response(query: str, context_info: Optional[str] = None):
    """Trả lời chatbot"""
    if llm is None:
        raise HTTPException(status_code=503, detail="Chatbot chưa được khởi tạo")
    
    try:
        context = f"Thông tin bệnh cây: {context_info}\n\n" if context_info else ""
        messages = [
            SystemMessage(content="Bạn là trợ lý AI chuyên về nông nghiệp. Trả lời thân thiện, dễ hiểu cho nông dân Việt Nam."),
            HumanMessage(content=f"Tài liệu:\n{combined_text}\n\n{context}Câu hỏi: {query}")
        ]
        response = llm.invoke(messages)
        return response.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi chatbot: {str(e)}")

# ================== STARTUP ==================
@app.on_event("startup")
async def startup_event():
    """Khởi tạo models khi server start"""
    print("🔄 Đang load models...")
    try:
        load_model()
        print("✅ Model đã load thành công!")
    except Exception as e:
        print(f"❌ Lỗi load model: {e}")
    
    try:
        load_chatbot()
        print("✅ Chatbot đã load thành công!")
    except Exception as e:
        print(f"❌ Lỗi load chatbot: {e}")

# ================== API ENDPOINTS ==================

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "🌿 AI Nông Nghiệp API",
        "version": "1.0.0",
        "endpoints": {
            "/": "Trang chủ",
            "/health": "Kiểm tra trạng thái",
            "/predict": "POST - Nhận diện bệnh lá cây",
            "/chat": "POST - Chatbot tư vấn",
            "/class-names": "GET - Danh sách bệnh",
            "/statistics": "GET - Thống kê & Biểu đồ",
            "/docs": "Swagger documentation"
        }
    }

@app.get("/health")
async def health_check():
    """Kiểm tra trạng thái hệ thống"""
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "chatbot_loaded": llm is not None,
        "device": str(device) if device else None
    }

# Register router với prefix /api/v1
api_router.get("/health")(health_check)

async def predict_route(file: UploadFile = File(...)):
    """
    Nhận diện bệnh lá cây từ ảnh
    
    - **file**: File ảnh (JPG, JPEG, PNG)
    
    Returns:
    - disease: Tên bệnh được phát hiện
    - confidence: Độ tin cậy (0-1)
    """
    # Kiểm tra file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File phải là ảnh (JPG, PNG, JPEG)")
    
    try:
        # Đọc và xử lý ảnh
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Dự đoán
        disease, confidence = predict_disease(image)
        
        return {
            "success": True,
            "disease": disease,
            "confidence": confidence,
            "confidence_percent": f"{confidence:.1%}"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi xử lý ảnh: {str(e)}")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    return await predict_route(file)

# Register với router
api_router.post("/predict")(predict_route)

class ChatRequest(BaseModel):
    """Request model cho chatbot"""
    query: str
    context: Optional[str] = None

async def chat_route(request: ChatRequest):
    """
    Chatbot tư vấn nông nghiệp
    
    - **query**: Câu hỏi của người dùng
    - **context**: Ngữ cảnh (thông tin về bệnh cây nếu có)
    
    Returns:
    - response: Câu trả lời từ AI
    """
    try:
        response = chatbot_response(request.query, request.context)
        
        return {
            "success": True,
            "response": response
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi chatbot: {str(e)}")

@app.post("/chat")
async def chat(request: ChatRequest):
    return await chat_route(request)

# Register với router
api_router.post("/chat")(chat_route)

async def get_class_names_route():
    """Lấy danh sách tên các class bệnh"""
    return {
        "success": True,
        "classes": class_names,
        "total": len(class_names) if class_names else 0
    }

@app.get("/class-names")
async def get_class_names():
    return await get_class_names_route()

# Register với router
api_router.get("/class-names")(get_class_names_route)

async def get_statistics_route():
    """
    Lấy dữ liệu thống kê cho biểu đồ
    
    Returns:
    - metrics: Các chỉ số tổng quan (tổng phân tích, độ chính xác, câu hỏi chatbot, người dùng)
    - weekly_analysis: Dữ liệu phân tích theo tuần
    - disease_distribution: Phân bố bệnh
    """
    # Dữ liệu mẫu (có thể thay thế bằng database thực tế)
    metrics = {
        "total_analysis": 1247,
        "total_analysis_today": 23,
        "accuracy": 95.8,
        "accuracy_delta": 2.1,
        "chatbot_questions": 856,
        "chatbot_questions_today": 45,
        "total_users": 234,
        "new_users": 12
    }
    
    # Dữ liệu phân tích theo tuần
    weekly_analysis = {
        "labels": ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"],
        "data": [23, 45, 56, 78, 32, 67, 89]
    }
    
    # Phân bố bệnh
    disease_distribution = {
        "labels": ["Bệnh đốm lá", "Bệnh héo xanh", "Bệnh thối rễ", "Khỏe mạnh"],
        "data": [35, 28, 22, 15]
    }
    
    return {
        "success": True,
        "metrics": metrics,
        "weekly_analysis": weekly_analysis,
        "disease_distribution": disease_distribution
    }

@app.get("/statistics")
async def get_statistics():
    return await get_statistics_route()

# Register với router
api_router.get("/statistics")(get_statistics_route)

# Include router vào app
app.include_router(api_router)

# Mount FastAPI docs tại root (sẽ được proxy bởi nginx)
@app.get("/api/v1/docs")
async def docs_redirect():
    """Redirect to FastAPI Swagger UI"""
    from fastapi.responses import RedirectResponse
    return RedirectResponse(url="/docs")

# Chạy server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

