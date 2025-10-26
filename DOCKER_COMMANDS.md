# Docker Commands - PWA Nhận Diện Bệnh Lá Cây

## 📦 Build và Start

```bash
# Build và start tất cả services
docker-compose up -d --build

# Start services (đã build)
docker-compose up -d

# Build lại với force
docker-compose up -d --build --force-recreate
```

## 🔄 Restart Services

```bash
# Restart chỉ backend
docker-compose restart backend

# Restart chỉ frontend
docker-compose restart frontend

# Restart nginx
docker-compose restart nginx

# Restart tất cả
docker-compose restart
```

## 🛑 Stop Services

```bash
# Stop tất cả
docker-compose down

# Stop nhưng giữ volumes
docker-compose down
```

## 📋 Xem Logs

```bash
# Tất cả services
docker-compose logs -f

# Chỉ backend
docker-compose logs -f backend

# Chỉ frontend
docker-compose logs -f frontend

# Chỉ nginx
docker-compose logs -f nginx
```

## 🎯 Useful Commands

```bash
# Xem status services
docker-compose ps

# Rebuild backend
docker-compose up -d --build backend

# Rebuild frontend
docker-compose up -d --build frontend

# Vào container backend
docker-compose exec backend bash

# Vào container frontend
docker-compose exec frontend sh

# Vào container nginx
docker-compose exec nginx sh

# Xóa tất cả và rebuild
docker-compose down -v
docker-compose up -d --build
```

## 🐛 Troubleshooting

```bash
# Check logs của service bị lỗi
docker-compose logs backend | tail -50

# Restart service cụ thể
docker-compose restart backend

# Xem health check
docker-compose ps

# Check network
docker network ls
docker network inspect pwa-nhan-dien-benh-la-cay_default
```

