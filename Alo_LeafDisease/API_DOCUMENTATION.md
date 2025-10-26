# 📚 API Documentation cho Frontend

## 🌐 Base URL
```
http://localhost:8000
```

## 📋 Danh sách Endpoints

### 1. Health Check
### 2. Nhận diện bệnh lá cây
### 3. Chatbot tư vấn
### 4. Danh sách bệnh
### 5. Thống kê & Biểu đồ ⭐

---

## 1️⃣ GET /health - Health Check

**Mô tả:** Kiểm tra trạng thái hệ thống

### Request
```http
GET /health
```

### Response
```json
{
  "status": "healthy",
  "model_loaded": true,
  "chatbot_loaded": true,
  "device": "cuda"
}
```

### Response Schema
| Field | Type | Mô tả |
|-------|------|-------|
| status | string | Trạng thái hệ thống |
| model_loaded | boolean | Model đã load hay chưa |
| chatbot_loaded | boolean | Chatbot đã load hay chưa |
| device | string/null | Thiết bị sử dụng (cuda/cpu) |

---

## 2️⃣ POST /predict - Nhận diện bệnh lá cây

**Mô tả:** Upload ảnh để phát hiện bệnh

### Request
```http
POST /predict
Content-Type: multipart/form-data
```

**Form Data:**
- `file` (required): File ảnh (JPG, JPEG, PNG)

### Response Success (200)
```json
{
  "success": true,
  "disease": "tomato_early_blight",
  "confidence": 0.95,
  "confidence_percent": "95.0%"
}
```

### Response Error (400)
```json
{
  "detail": "File phải là ảnh (JPG, PNG, JPEG)"
}
```

### Response Error (503)
```json
{
  "detail": "Model chưa được load"
}
```

### Response Schema
| Field | Type | Mô tả |
|-------|------|-------|
| success | boolean | Thành công hay không |
| disease | string | Tên bệnh phát hiện được |
| confidence | float | Độ tin cậy (0.0 - 1.0) |
| confidence_percent | string | Độ tin cậy dạng % |

### Example Code

**JavaScript/Fetch:**
```javascript
async function predictDisease(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile);

  try {
    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Bệnh:', data.disease);
      console.log('Độ tin cậy:', data.confidence_percent);
    }
    
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

**Axios:**
```javascript
async function predictDisease(imageFile) {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await axios.post('http://localhost:8000/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}
```

---

## 3️⃣ POST /chat - Chatbot tư vấn

**Mô tả:** Gửi câu hỏi để nhận tư vấn nông nghiệp

### Request
```http
POST /chat
Content-Type: application/json
```

**Body:**
```json
{
  "query": "Cách phòng chống bệnh đốm lá trên cà chua?",
  "context": "Lá cây bị bệnh: tomato_early_blight (độ tin cậy 95%)"
}
```

**Parameters:**
- `query` (required, string): Câu hỏi của người dùng
- `context` (optional, string): Thông tin ngữ cảnh về bệnh cây

### Response Success (200)
```json
{
  "success": true,
  "response": "Để phòng chống bệnh đốm lá trên cà chua, bạn cần..."
}
```

### Response Error (503)
```json
{
  "detail": "Chatbot chưa được khởi tạo"
}
```

### Response Schema
| Field | Type | Mô tả |
|-------|------|-------|
| success | boolean | Thành công hay không |
| response | string | Câu trả lời từ AI |

### Example Code

**JavaScript/Fetch:**
```javascript
async function askChatbot(query, context = null) {
  try {
    const response = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query,
        context: context
      })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Sử dụng
askChatbot('Cách trồng cà chua?');
```

**Axios:**
```javascript
async function askChatbot(query, context = null) {
  try {
    const response = await axios.post('http://localhost:8000/chat', {
      query: query,
      context: context
    });
    
    return response.data;
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}
```

---

## 4️⃣ GET /class-names - Danh sách bệnh

**Mô tả:** Lấy danh sách tất cả các loại bệnh

### Request
```http
GET /class-names
```

### Response
```json
{
  "success": true,
  "classes": [
    "apple_apple_scab",
    "apple_black_rot",
    "apple_cedar_apple_rust",
    ...
  ],
  "total": 46
}
```

### Response Schema
| Field | Type | Mô tả |
|-------|------|-------|
| success | boolean | Thành công hay không |
| classes | array<string> | Danh sách tên bệnh |
| total | number | Tổng số loại bệnh |

---

## 5️⃣ GET /statistics - Thống kê & Biểu đồ ⭐

**Mô tả:** Lấy dữ liệu thống kê cho các biểu đồ

### Request
```http
GET /statistics
```

### Response
```json
{
  "success": true,
  "metrics": {
    "total_analysis": 1247,
    "total_analysis_today": 23,
    "accuracy": 95.8,
    "accuracy_delta": 2.1,
    "chatbot_questions": 856,
    "chatbot_questions_today": 45,
    "total_users": 234,
    "new_users": 12
  },
  "weekly_analysis": {
    "labels": ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"],
    "data": [23, 45, 56, 78, 32, 67, 89]
  },
  "disease_distribution": {
    "labels": ["Bệnh đốm lá", "Bệnh héo xanh", "Bệnh thối rễ", "Khỏe mạnh"],
    "data": [35, 28, 22, 15]
  }
}
```

### Response Schema

#### Metrics Object
| Field | Type | Mô tả |
|-------|------|-------|
| total_analysis | number | Tổng số lượt phân tích |
| total_analysis_today | number | Số lượt phân tích hôm nay |
| accuracy | float | Độ chính xác (%) |
| accuracy_delta | float | Thay đổi độ chính xác (%) |
| chatbot_questions | number | Tổng câu hỏi chatbot |
| chatbot_questions_today | number | Câu hỏi chatbot hôm nay |
| total_users | number | Tổng số người dùng |
| new_users | number | Người dùng mới |

#### Weekly Analysis Object
| Field | Type | Mô tả |
|-------|------|-------|
| labels | array<string> | Nhãn (ngày trong tuần) |
| data | array<number> | Số lượt phân tích theo ngày |

#### Disease Distribution Object
| Field | Type | Mô tả |
|-------|------|-------|
| labels | array<string> | Tên bệnh |
| data | array<number> | Số lượng mỗi bệnh |

---

## 🎨 Ví dụ sử dụng với Chart.js

Xem file `frontend_chartjs_example.html` để xem code hoàn chỉnh.

### Cơ bản
```javascript
// Lấy dữ liệu
async function loadStatistics() {
  const response = await fetch('http://localhost:8000/statistics');
  const data = await response.json();
  
  return data;
}
```

### Biểu đồ cột (Weekly Analysis)
```javascript
const stats = await loadStatistics();

const ctx = document.getElementById('weeklyChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: stats.weekly_analysis.labels,
    datasets: [{
      label: 'Lượt phân tích',
      data: stats.weekly_analysis.data,
      backgroundColor: 'rgba(76, 175, 80, 0.6)',
      borderColor: 'rgba(76, 175, 80, 1)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
```

### Biểu đồ tròn (Disease Distribution)
```javascript
const ctx = document.getElementById('diseaseChart').getContext('2d');
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: stats.disease_distribution.labels,
    datasets: [{
      data: stats.disease_distribution.data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }]
  }
});
```

---

## 🔧 Error Handling

### HTTP Status Codes
- `200 OK`: Request thành công
- `400 Bad Request`: Request không hợp lệ
- `500 Internal Server Error`: Lỗi server
- `503 Service Unavailable`: Model/chatbot chưa load

### Error Response Format
```json
{
  "detail": "Mô tả lỗi"
}
```

---

## 📱 Flow Tích hợp cho Mobile App

### 1. Flow Nhận diện bệnh
```
1. User chọn ảnh
2. Upload ảnh → POST /predict
3. Hiển thị kết quả (bệnh + độ tin cậy)
4. (Optional) Gợi ý hỏi chatbot về bệnh đó
```

### 2. Flow Chatbot
```
1. User nhập câu hỏi
2. Send → POST /chat
3. Hiển thị response
4. Continue conversation
```

### 3. Flow Thống kê
```
1. Load page
2. Fetch data → GET /statistics
3. Render charts với Chart.js
4. Display metrics
```

---

## 🧪 Testing với Postman/cURL

### Test /health
```bash
curl http://localhost:8000/health
```

### Test /predict
```bash
curl -X POST http://localhost:8000/predict \
  -F "file=@path/to/image.jpg"
```

### Test /chat
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "Cách trồng cà chua?"}'
```

### Test /statistics
```bash
curl http://localhost:8000/statistics
```

---

## 📖 Thêm tài liệu

Xem thêm:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

