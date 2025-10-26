# Quick Restart Backend - Không rebuild requirements

## Khi sửa code backend (không đổi requirements.txt):

### Option 1: Chỉ restart container (nhanh nhất)
```bash
docker-compose restart backend
```

### Option 2: Rebuild nhưng dùng cache (nếu thay đổi Dockerfile)
```bash
# Docker sẽ dùng cache layer cho requirements nếu file không đổi
docker-compose up -d --build backend --no-deps
```

### Option 3: Force rebuild từ đầu (chậm - chỉ khi cần)
```bash
docker-compose build --no-cache backend
docker-compose up -d backend
```

## Kiến thức Docker Layer Caching

Dockerfile được sắp xếp để:
1. **requirements.txt** → Copy và install TRƯỚC
2. **Source code** → Copy SAU

→ Khi sửa code: Chỉ rebuild layer cuối, không reinstall dependencies!

## Workflow Development

### 1. Lần đầu build (chậm - cài dependencies):
```bash
docker-compose up -d --build
```

### 2. Sửa code backend (nhanh):
```bash
# Option A: Chỉ restart (hot reload với volumes)
docker-compose restart backend

# Option B: Nếu cần rebuild
docker-compose up -d --build backend --no-deps
```

### 3. Sửa requirements.txt (phải rebuild dependencies):
```bash
docker-compose build --no-cache backend
docker-compose up -d backend
```

## Check logs

```bash
# Xem backend logs
docker-compose logs -f backend

# Xem code đang chạy
docker-compose exec backend ls -la /app
```

