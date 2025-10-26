# Hướng dẫn chạy ứng dụng Streamlit

## Bước 1: Cài đặt các thư viện cần thiết

Mở terminal/PowerShell và chạy lệnh:

```bash
pip install -r requirements.txt
```

Hoặc cài đặt thủ công:

```bash
pip install streamlit torch torchvision Pillow numpy langchain-community langchain-text-splitters langchain-google-genai langchain-core python-dotenv pandas
```

## Bước 2: Kiểm tra các file cần thiết

Trước khi chạy, bạn cần chuẩn bị:

1. **File model**: `best.pt` (hiện tại có ở thư mục gốc)
   - Di chuyển file này vào thư mục `checkpoints/` hoặc cập nhật đường dẫn trong `app.py`

2. **File `.env`**: Tạo file `.env` trong thư mục gốc với nội dung:
   ```
   GOOGLE_API_KEY=your_google_api_key_here
   ```

3. **File dữ liệu chatbot**: `books/huong_dan_trong_cay.txt` (đã có sẵn)

4. **Thư mục test data**: 
   - File `app.py` hiện đang trỏ đến: `C:\Users\tam\Documents\data\PlantVillage_Split\test`
   - Bạn cần cập nhật đường dẫn này trong `app.py` cho phù hợp với máy của bạn

## Bước 3: Cập nhật đường dẫn trong app.py

Mở file `app.py` và sửa các đường dẫn sau:

- **Dòng 237**: Sửa đường dẫn đến file model `best.pt`
- **Dòng 240-247**: Sửa đường dẫn đến thư mục dữ liệu test

Ví dụ:
```python
checkpoint = torch.load("best.pt", map_location=device)  # thay vì "./checkpoints/best.pt"
num_classes = len(os.listdir("./data/PlantVillage_Split/test"))  # thay đường dẫn phù hợp
class_names = os.listdir("./data/PlantVillage_Split/test")
```

## Bước 4: Chạy ứng dụng

Sau khi đã cài đặt đầy đủ và cập nhật đường dẫn, chạy lệnh:

```bash
streamlit run app.py
```

Hoặc:

```bash
python -m streamlit run app.py
```

## Bước 5: Truy cập ứng dụng

Sau khi chạy lệnh, Streamlit sẽ tự động mở trình duyệt và hiển thị ứng dụng tại địa chỉ:

```
http://localhost:8501
```

Nếu không tự động mở, bạn có thể mở trình duyệt và truy cập địa chỉ trên.

## Các chức năng của ứng dụng

1. **🏠 Trang chủ**: Giới thiệu về hệ thống
2. **🔬 Nhận diện bệnh**: Upload ảnh lá cây để phát hiện bệnh
3. **💬 Chatbot tư vấn**: Chat với AI để được tư vấn về nông nghiệp
4. **📊 Thống kê**: Xem thống kê về hoạt động hệ thống

## Lưu ý

- Cần có GPU hoặc CPU đủ mạnh để chạy model Vision Transformer
- Cần có API key của Google Gemini để sử dụng chatbot
- Model `best.pt` phải tương thích với cấu trúc ViT_B_16

## Troubleshooting

- **Lỗi không tìm thấy model**: Kiểm tra đường dẫn file `best.pt`
- **Lỗi API key**: Đảm bảo file `.env` có GOOGLE_API_KEY hợp lệ
- **Lỗi import thư viện**: Chạy lại `pip install -r requirements.txt`
- **Lỗi CUDA**: Nếu không có GPU, ứng dụng sẽ sử dụng CPU nhưng chạy chậm hơn

