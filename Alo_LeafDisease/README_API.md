# 🌿 AI Nông Nghiệp - FastAPI

API FastAPI cho hệ thống nhận diện bệnh lá cây và chatbot tư vấn nông nghiệp.

## 📦 Tính năng

- ✅ **Nhận diện bệnh lá cây** - Phát hiện 46 loại bệnh với Vision Transformer
- ✅ **Chatbot tư vấn** - AI tư vấn nông nghiệp dựa trên tài liệu
- ✅ **RESTful API** - Dễ tích hợp với mobile/web app
- ✅ **Auto documentation** - Swagger UI tự động
- ✅ **CORS enabled** - Hỗ trợ cross-origin requests

## 🚀 Cài đặt nhanh

```bash
# 1. Cài đặt dependencies
pip install -r requirements.txt

# 2. Copy và cấu hình .env
cp .env.example .env
# Mở .env và cập nhật GOOGLE_API_KEY

# 3. Khởi động API
uvicorn api:app --reload
```

API sẽ chạy tại: http://localhost:8000

## 📝 API Endpoints

| Endpoint | Method | Mô tả |
|----------|--------|-------|
| `/` | GET | Thông tin API |
| `/health` | GET | Kiểm tra trạng thái |
| `/predict` | POST | Nhận diện bệnh từ ảnh |
| `/chat` | POST | Chatbot tư vấn |
| `/class-names` | GET | Danh sách bệnh |
| `/docs` | GET | Swagger UI |

## 🧪 Test API

```bash
# Chạy script test
python test_api.py
```

## 📖 Documentation

- **Chi tiết**: [HUONG_DAN_API.md](HUONG_DAN_API.md)
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 💡 Sử dụng với Postman/cURL

### 1. Test Health
```bash
curl http://localhost:8000/health
```

### 2. Nhận diện bệnh
```bash
curl -X POST \
  http://localhost:8000/predict \
  -F "file=@path/to/image.jpg"
```

### 3. Chatbot
```bash
curl -X POST \
  http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "Cách trồng cà chua?"}'
```

## 🔧 Cấu hình

File `.env`:
```
GOOGLE_API_KEY=your_api_key_here
```

## 📂 Cấu trúc

```
.
├── api.py                 # FastAPI application
├── app.py                 # Streamlit app (không thay đổi)
├── test_api.py           # Test script
├── best.pt               # Model weights
├── requirements.txt      # Dependencies
└── HUONG_DAN_API.md     # Chi tiết hướng dẫn
```

## ⚠️ Yêu cầu

- Python 3.8+
- PyTorch
- FastAPI
- Model file `best.pt`
- Google API Key

## 🎯 Tích hợp Mobile App

File `api.py` được thiết kế để tích hợp dễ dàng với mobile app:

```python
import requests

# Upload ảnh và nhận kết quả
files = {'file': open('leaf.jpg', 'rb')}
response = requests.post('http://your-server:8000/predict', files=files)
result = response.json()
print(f"Bệnh: {result['disease']}, Độ tin cậy: {result['confidence_percent']}")
```

## 🔐 Security

⚠️ **Lưu ý**: API hiện tại chạy với CORS `allow_origins=["*"]` cho development. Trong production, nên hạn chế domain cụ thể.

## 📞 Support

- 📧 Email: support@example.com
- 🐛 Issues: GitHub Issues
- 📚 Docs: [HUONG_DAN_API.md](HUONG_DAN_API.md)

