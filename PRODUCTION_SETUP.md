# Production Setup Guide

## Environment Files

### Client (`client/.env.production`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NODE_ENV=production
```

### Backend (`Alo_LeafDisease/.env.production`)
```env
GOOGLE_API_KEY=your_api_key
ENVIRONMENT=production
```

## Docker Compose Commands

### Build and Start (Production)
```bash
# Build all services
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Restart Specific Service
```bash
# Restart backend only
docker-compose restart backend

# Restart frontend only
docker-compose restart frontend

# Restart nginx only
docker-compose restart nginx
```

### Update Environment Variables

1. Edit `.env.production` files
2. Restart the service:
   ```bash
   docker-compose restart [service-name]
   ```

## Production URLs

- **Frontend**: http://localhost
- **Backend API**: http://localhost/api/v1
- **API Docs**: http://localhost/docs (or http://backend:8000/docs)
- **Health Check**: http://localhost/api/v1/health

## Security Notes

1. **Never commit `.env` files** with real credentials
2. Use `.env.example` as template
3. Set `GOOGLE_API_KEY` in `.env.production`
4. Use Docker secrets for sensitive data in production

## Troubleshooting

### Check Service Status
```bash
docker-compose ps
```

### View Service Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f nginx
```

### Restart Everything
```bash
docker-compose down
docker-compose up -d --build
```

### Check Nginx Configuration
```bash
# Test nginx config
docker-compose exec nginx nginx -t

# Reload nginx
docker-compose exec nginx nginx -s reload
```

