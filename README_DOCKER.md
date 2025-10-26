# Docker Setup cho PWA Nhận Diện Bệnh Lá Cây

## Cấu trúc

```
.
├── docker-compose.yml      # Docker Compose config
├── nginx/
│   ├── nginx.conf         # Nginx config chính
│   └── default.conf       # Reverse proxy config
├── Alo_LeafDisease/
│   └── Dockerfile         # Backend Docker
└── client/
    └── Dockerfile         # Frontend Docker
```

## Services

1. **Backend** - Python FastAPI (port 8000)
2. **Frontend** - Next.js (port 3000)
3. **Nginx** - Reverse Proxy (port 80)

## Cách chạy

### Build và start tất cả services:

```bash
docker-compose up -d --build
```

### Xem logs:

```bash
# All services
docker-compose logs -f

# Backend only
docker-compose logs -f backend

# Frontend only
docker-compose logs -f frontend

# Nginx only
docker-compose logs -f nginx
```

### Stop services:

```bash
docker-compose down
```

### Rebuild (khi có thay đổi code):

```bash
docker-compose up -d --build --force-recreate
```

## URLs

- **Frontend**: http://localhost
- **Backend API**: http://localhost/api/
- **Direct Backend**: http://localhost/predict, /chat, /statistics, etc.

## Cấu hình Zero Trust Tunnel

Nginx chạy trên port 80 (không cần 443 vì dùng Zero Trust Tunnel).

### Tailscale Funnel hoặc Cloudflare Tunnel:

```bash
# Tailscale
tailscale funnel 80

# Cloudflare
cloudflared tunnel run --url http://localhost:80
```

## Troubleshooting

### 1. Backend không start

```bash
# Check logs
docker-compose logs backend

# Rebuild
docker-compose up -d --build backend
```

### 2. Frontend build failed

```bash
# Check Next.js build
docker-compose logs frontend

# Rebuild
docker-compose up -d --build frontend
```

### 3. Connection refused

```bash
# Check if services are running
docker-compose ps

# Restart specific service
docker-compose restart backend
docker-compose restart frontend
```

### 4. Clear everything và rebuild

```bash
# Stop và remove volumes
docker-compose down -v

# Remove images
docker rmi pwa-backend pwa-frontend

# Rebuild from scratch
docker-compose up -d --build
```

## Production

### 1. Update environment variables:

```bash
# Backend
cd Alo_LeafDisease
cp .env.example .env
# Edit .env với values của bạn

# Frontend
cd client
cp .env.local.example .env.local
# Edit .env.local với API URL
```

### 2. Build production:

```bash
docker-compose -f docker-compose.yml up -d --build
```

### 3. Với Zero Trust Tunnel:

```bash
# Expose port 80
tailscale funnel 80

# Hoặc Cloudflare
cloudflared tunnel --url http://localhost:80
```

## File Volumes

- `./Alo_LeafDisease` - Backend code (mounted for dev)
- `./client` - Frontend code (mounted for dev)
- `model_cache` - Model files (persistent volume)

## Health Checks

- Backend: `curl http://localhost:8000/health`
- Frontend: Auto-check trong Next.js
- Nginx: Auto check process

## Network

- All services trong same Docker network
- Backend: `backend:8000` (internal)
- Frontend: `frontend:3000` (internal)
- Nginx reverse proxy tất cả

