# Nhận Diện Bệnh Lá Cây - PWA

Ứng dụng Progressive Web App nhận diện bệnh lá cây với AI và dashboard thống kê đẹp mắt.

## Tính năng

- 📸 **Nhận diện bệnh**: Chụp hoặc upload ảnh lá cây để phát hiện bệnh
- 🤖 **Chatbot AI**: Tư vấn về bệnh cây và nông nghiệp
- 📊 **Dashboard**: Thống kê với biểu đồ đẹp (Recharts)
- 📱 **PWA**: Có thể cài đặt, offline support, notifications
- 🎨 **Modern UI**: Shadcn/ui + Tailwind CSS

## Công nghệ

- **Framework**: Next.js 16 (App Router)
- **UI**: Shadcn/ui + Tailwind CSS
- **Charts**: Recharts
- **PWA**: next-pwa + Workbox
- **Icons**: Lucide React
- **Notifications**: Sonner

## Cài đặt

```bash
# Cài dependencies
npm install

# Config environment variables
cp .env.local.example .env.local
# Sửa NEXT_PUBLIC_API_URL nếu cần

# Chạy dev server
npm run dev
```

Truy cập http://localhost:3000

## Cấu trúc dự án

```
client/
├── app/
│   ├── (dashboard)/       # Dashboard routes
│   │   ├── layout.tsx     # Dashboard layout với sidebar
│   │   ├── page.tsx       # Trang chủ
│   │   ├── predict/       # Nhận diện bệnh
│   │   ├── chat/          # Chatbot AI
│   │   └── statistics/    # Thống kê
│   └── layout.tsx         # Root layout
├── components/
│   ├── dashboard/         # Components dashboard
│   ├── predict/           # Components nhận diện
│   ├── chat/              # Components chatbot
│   ├── statistics/        # Components thống kê
│   ├── pwa/               # PWA components
│   └── ui/                # Shadcn UI components
├── lib/
│   ├── api/               # API client
│   ├── pwa/               # PWA utilities
│   └── hooks/             # Custom hooks
└── types/                 # TypeScript types
```

## API Endpoints

### Backend API cần có:

1. `POST /predict` - Nhận diện bệnh
2. `POST /chat` - Chatbot AI
3. `GET /statistics` - Thống kê
4. `GET /health` - Health check

Xem [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) để biết chi tiết.

## PWA Features

- ✅ Manifest config
- ✅ Install prompt
- ✅ Offline indicator
- ✅ Service worker ready
- ⏳ PWA icons (cần tạo thủ công)

## Tạo PWA Icons

1. Truy cập https://www.pwabuilder.com/imageGenerator
2. Upload logo hoặc tạo icon
3. Download và đặt vào `public/icons/`:
   - `icon-192x192.png`
   - `icon-512x512.png`

Xem `public/icons/README.md` để biết chi tiết.

## Build Production

```bash
# Build
npm run build

# Start production server
npm run start
```

## Environment Variables

- `NEXT_PUBLIC_API_URL`: URL của backend API (default: http://localhost:8000)

## License

MIT
