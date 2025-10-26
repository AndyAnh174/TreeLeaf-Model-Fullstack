# 🌿 Hướng Dẫn Sử Dụng API

## 📋 Mô tả
API FastAPI cho hệ thống AI Nông Nghiệp với các endpoint nhận diện bệnh lá cây và chatbot tư vấn.

## 🚀 Cài đặt

### 1. Cài đặt thư viện
```bash
pip install -r requirements.txt
```

### 2. Thiết lập biến môi trường
Tạo file `.env` từ `.env.example`:
```bash
cp .env.example .env
```

Sau đó cập nhật Google API Key:
```
GOOGLE_API_KEY=your_api_key_here
```

### 3. Khởi động API server
```bash
# Cách 1: Dùng uvicorn trực tiếp
uvicorn api:app --host 0.0.0.0 --port 8000 --reload

# Cách 2: Chạy file trực tiếp
python api.py
```

API sẽ chạy tại: `http://localhost:8000`

## 📚 API Endpoints

### 1. GET `/` - Trang chủ
Trả về thông tin về API và các endpoint available.

**Request:**
```bash
curl http://localhost:8000/
```

**Response:**
```json
{
  "message": "🌿 AI Nông Nghiệp API",
  "version": "1.0.0",
  "endpoints": {
    "/": "Trang chủ",
    "/health": "Kiểm tra trạng thái",
    "/predict": "POST - Nhận diện bệnh lá cây",
    "/chat": "POST - Chatbot tư vấn",
    "/docs": "Swagger documentation"
  }
}
```

### 2. GET `/health` - Kiểm tra trạng thái
Kiểm tra model và chatbot đã được load chưa.

**Request:**
```bash
curl http://localhost:8000/health
```

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "chatbot_loaded": true,
  "device": "cuda" hoặc "cpu"
}
```

### 3. POST `/predict` - Nhận diện bệnh lá cây
Upload ảnh để phát hiện bệnh.

**Request:**
```bash
curl -X POST \
  http://localhost:8000/predict \
  -H "Content-Type: multipart/form-data" \
  -F "file=@path/to/image.jpg"
```

**Response:**
```json
{
  "success": true,
  "disease": "tomato_early_blight",
  "confidence": 0.95,
  "confidence_percent": "95.0%"
}
```

**Với Python requests:**
```python
import requests

url = "http://localhost:8000/predict"
files = {"file": open("path/to/image.jpg", "rb")}
response = requests.post(url, files=files)
print(response.json())
```

### 4. POST `/chat` - Chatbot tư vấn
Gửi câu hỏi để nhận tư vấn nông nghiệp.

**Request:**
```bash
curl -X POST \
  http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Cách phòng chống bệnh đốm lá trên cà chua?",
    "context": "Lá cây bị bệnh: tomato_early_blight (độ tin cậy 95%)"
  }'
```

**Response:**
```json
{
  "success": true,
  "response": "Để phòng chống bệnh đốm lá trên cà chua, bạn cần..."
}
```

**Với Python requests:**
```python
import requests

url = "http://localhost:8000/chat"
data = {
    "query": "Cách phòng chống bệnh đốm lá trên cà chua?",
    "context": "Lá cây bị bệnh: tomato_early_blight (độ tin cậy 95%)"
}
response = requests.post(url, json=data)
print(response.json())
```

**Request Body:**
- `query` (required): Câu hỏi của người dùng
- `context` (optional): Thông tin ngữ cảnh về bệnh cây (nếu có)

### 5. GET `/class-names` - Danh sách tên bệnh
Lấy danh sách tất cả các loại bệnh có thể phát hiện.

**Request:**
```bash
curl http://localhost:8000/class-names
```

**Response:**
```json
{
  "success": true,
  "classes": [
    "apple_apple_scab",
    "apple_black_rot",
    "..."
  ],
  "total": 46
}
```

## 📖 Swagger Documentation
Sau khi khởi động server, truy cập Swagger UI tại:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🧪 Testing

### Test bằng Python
```python
import requests

# Test health
response = requests.get("http://localhost:8000/health")
print(response.json())

# Test predict
with open("test_image.jpg", "rb") as f:
    files = {"file": f}
    response = requests.post("http://localhost:8000/predict", files=files)
    print(response.json())

# Test chat
data = {"query": "Cách trồng cà chua?"}
response = requests.post("http://localhost:8000/chat", json=data)
print(response.json())
```

## 🔧 Cấu trúc Code

```
api.py                  # FastAPI application (không ảnh hưởng app.py)
app.py                  # Streamlit application (không thay đổi)
best.pt                 # Model weights
books/
  └── huong_dan_trong_cay.txt  # Tài liệu nông nghiệp
requirements.txt        # Dependencies
.env                    # Environment variables
```

## ⚠️ Lưu ý

1. **Model File**: Đảm bảo file `best.pt` tồn tại trong thư mục gốc
2. **Google API Key**: Cần cấu hình trong file `.env`
3. **Tài liệu**: File `books/huong_dan_trong_cay.txt` cần tồn tại
4. **Port**: Mặc định chạy ở port 8000, có thể thay đổi trong `api.py`

## 🐛 Xử lý lỗi

- **503 Service Unavailable**: Model hoặc chatbot chưa được load
- **400 Bad Request**: File không phải là ảnh hoặc format không hỗ trợ
- **500 Internal Server Error**: Lỗi xử lý request

## 📞 Liên hệ
- Tác giả: Nguyễn Quang Minh
- Version: 1.0.0
- Công nghệ: FastAPI + PyTorch + LangChain

