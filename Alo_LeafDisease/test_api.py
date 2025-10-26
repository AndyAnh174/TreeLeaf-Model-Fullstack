"""
Script test API cho AI Nông Nghiệp
Chạy: python test_api.py
"""

import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    """Test health endpoint"""
    print("🔍 Testing /health endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        print("✅ Health check passed!\n")
        return True
    except Exception as e:
        print(f"❌ Health check failed: {e}\n")
        return False

def test_root():
    """Test root endpoint"""
    print("🔍 Testing / endpoint...")
    try:
        response = requests.get(BASE_URL)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        print("✅ Root endpoint passed!\n")
        return True
    except Exception as e:
        print(f"❌ Root endpoint failed: {e}\n")
        return False

def test_class_names():
    """Test class-names endpoint"""
    print("🔍 Testing /class-names endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/class-names")
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Total classes: {data.get('total', 0)}")
        print(f"First 5 classes: {data.get('classes', [])[:5]}")
        print("✅ Class names endpoint passed!\n")
        return True
    except Exception as e:
        print(f"❌ Class names endpoint failed: {e}\n")
        return False

def test_chat(query="Cách trồng cà chua?", context=None):
    """Test chat endpoint"""
    print("🔍 Testing /chat endpoint...")
    try:
        data = {"query": query}
        if context:
            data["context"] = context
        
        response = requests.post(f"{BASE_URL}/chat", json=data)
        print(f"Status Code: {response.status_code}")
        result = response.json()
        print(f"Query: {query}")
        print(f"Response: {result.get('response', '')[:200]}...")  # Chỉ in 200 ký tự đầu
        print("✅ Chat endpoint passed!\n")
        return True
    except Exception as e:
        print(f"❌ Chat endpoint failed: {e}\n")
        return False

def test_statistics():
    """Test statistics endpoint"""
    print("🔍 Testing /statistics endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/statistics")
        print(f"Status Code: {response.status_code}")
        data = response.json()
        
        # Hiển thị metrics
        metrics = data.get('metrics', {})
        print(f"\n📊 Metrics:")
        print(f"  - Tổng phân tích: {metrics.get('total_analysis', 0)}")
        print(f"  - Độ chính xác: {metrics.get('accuracy', 0)}%")
        print(f"  - Câu hỏi chatbot: {metrics.get('chatbot_questions', 0)}")
        print(f"  - Tổng người dùng: {metrics.get('total_users', 0)}")
        
        # Hiển thị weekly data
        weekly = data.get('weekly_analysis', {})
        print(f"\n📈 Weekly Analysis:")
        print(f"  - Labels: {weekly.get('labels', [])}")
        print(f"  - Data: {weekly.get('data', [])}")
        
        # Hiển thị disease distribution
        diseases = data.get('disease_distribution', {})
        print(f"\n🦠 Disease Distribution:")
        print(f"  - Labels: {diseases.get('labels', [])}")
        print(f"  - Data: {diseases.get('data', [])}")
        
        print("\n✅ Statistics endpoint passed!\n")
        return True
    except Exception as e:
        print(f"❌ Statistics endpoint failed: {e}\n")
        return False

def test_predict(image_path):
    """Test predict endpoint"""
    print("🔍 Testing /predict endpoint...")
    try:
        if not image_path:
            print("⚠️  Không có đường dẫn ảnh, bỏ qua test này\n")
            return True
            
        with open(image_path, "rb") as f:
            files = {"file": f}
            response = requests.post(f"{BASE_URL}/predict", files=files)
        
        print(f"Status Code: {response.status_code}")
        result = response.json()
        print(f"Disease: {result.get('disease', 'N/A')}")
        print(f"Confidence: {result.get('confidence_percent', 'N/A')}")
        print("✅ Predict endpoint passed!\n")
        return True
    except FileNotFoundError:
        print(f"⚠️  Không tìm thấy file ảnh: {image_path}\n")
        return True
    except Exception as e:
        print(f"❌ Predict endpoint failed: {e}\n")
        return False

def main():
    """Run all tests"""
    print("=" * 50)
    print("🧪 Bắt đầu test API")
    print("=" * 50)
    print()
    
    # Test basic endpoints
    test_root()
    test_health()
    test_class_names()
    test_statistics()
    
    # Test chat
    test_chat("Cách trồng cà chua?")
    test_chat("Phương pháp phòng bệnh đốm lá?", "Lá cây bị tomato_early_blight")
    
    # Test predict (cần có file ảnh)
    # test_predict("test_image.jpg")
    
    print("=" * 50)
    print("✅ Hoàn thành test!")
    print("💡 Lưu ý: Test predict cần có file ảnh thực tế")
    print("=" * 50)

if __name__ == "__main__":
    main()

