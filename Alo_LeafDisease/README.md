# 🌿 Alo_LeafDisease - Hệ thống nhận diện bệnh lá cây bằng AI

Ứng dụng Streamlit sử dụng Vision Transformer để nhận diện bệnh lá cây và chatbot AI tư vấn nông nghiệp.

## 🚀 Cài đặt và Chạy

### 1. Cài đặt thư viện

```bash
pip install -r requirements.txt
```

### 2. Cấu hình môi trường

Copy file `.env.example` thành `.env`:
```bash
copy .env.example .env
```

Sửa file `.env` và thêm Google API Key:
```
GOOGLE_API_KEY=your_api_key_here
```

### 3. Chuẩn bị dữ liệu

- File model: `best.pt` (đã có)
- File tài liệu: `books/huong_dan_trong_cay.txt` (đã có)
- **QUAN TRỌNG**: Cần cập nhật đường dẫn thư mục test data trong `app.py` (dòng 240-247)

### 4. Chạy ứng dụng

```bash
streamlit run app.py
```

Hoặc:

```bash
python -m streamlit run app.py
```

Trình duyệt sẽ tự động mở tại: `http://localhost:8501`

## 📋 Các chức năng

- 🔬 **Nhận diện bệnh lá cây**: Upload ảnh để phát hiện bệnh với độ chính xác cao
- 💬 **Chatbot tư vấn**: Trò chuyện với AI để được tư vấn về nông nghiệp
- 📊 **Thống kê**: Xem thống kê hoạt động hệ thống

## 📝 Lưu ý

- Cần có GPU hoặc CPU mạnh để chạy model
- Cần API key của Google Gemini cho chatbot
- Xem thêm chi tiết trong file `HUONG_DAN_CHAY_APP.md`

## 📁 Cấu trúc thư mục

```
Alo_LeafDisease/
├── app.py                    # File chính của ứng dụng
├── best.pt                   # Model đã train
├── requirements.txt          # Thư viện cần thiết
├── .env.example             # Template file cấu hình
├── books/                   # Tài liệu nông nghiệp
│   └── huong_dan_trong_cay.txt
├── train.py                 # Script train model
├── balance_data.py          # Script cân bằng dữ liệu
└── split_data.py            # Script chia train/test
```