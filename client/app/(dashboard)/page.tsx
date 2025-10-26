import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, TrendingUp, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang chủ - Nhận Diện Bệnh Lá Cây",
  description: "Tổng quan về hệ thống nhận diện bệnh lá cây",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trang chủ</h1>
        <p className="text-muted-foreground">
          Tổng quan về hệ thống nhận diện bệnh lá cây
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng lượt phân tích
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+23 hôm nay</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Độ chính xác</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95.8%</div>
            <p className="text-xs text-muted-foreground">+2.1% so với tháng trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Câu hỏi AI
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">856</div>
            <p className="text-xs text-muted-foreground">+45 hôm nay</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Người dùng
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">+12 mới</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hướng dẫn sử dụng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Badge className="mt-1">1</Badge>
                <div>
                  <h4 className="font-semibold">Chụp ảnh lá cây</h4>
                  <p className="text-sm text-muted-foreground">
                    Sử dụng camera hoặc chọn ảnh từ thư viện
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Badge className="mt-1">2</Badge>
                <div>
                  <h4 className="font-semibold">Xem kết quả</h4>
                  <p className="text-sm text-muted-foreground">
                    Nhận diện bệnh và xem độ tin cậy
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Badge className="mt-1">3</Badge>
                <div>
                  <h4 className="font-semibold">Tư vấn AI</h4>
                  <p className="text-sm text-muted-foreground">
                    Đặt câu hỏi để nhận tư vấn về bệnh
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bắt đầu nhanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="rounded-lg border p-4 hover:bg-accent cursor-pointer transition-colors">
                <h4 className="font-semibold mb-1">Nhận diện bệnh</h4>
                <p className="text-sm text-muted-foreground">
                  Chụp hoặc upload ảnh lá cây để kiểm tra
                </p>
              </div>
              <div className="rounded-lg border p-4 hover:bg-accent cursor-pointer transition-colors">
                <h4 className="font-semibold mb-1">Tư vấn AI</h4>
                <p className="text-sm text-muted-foreground">
                  Hỏi bất kỳ câu hỏi nào về nông nghiệp
                </p>
              </div>
              <div className="rounded-lg border p-4 hover:bg-accent cursor-pointer transition-colors">
                <h4 className="font-semibold mb-1">Xem thống kê</h4>
                <p className="text-sm text-muted-foreground">
                  Theo dõi biểu đồ và metrics
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

