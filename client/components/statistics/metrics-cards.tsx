"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { StatisticsResponse } from "@/types/api";

interface MetricsCardsProps {
  metrics: StatisticsResponse["metrics"];
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  const accuracyDeltaPositive = metrics.accuracy_delta > 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Tổng phân tích
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.total_analysis.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            +{metrics.total_analysis_today} hôm nay
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Độ chính xác</CardTitle>
          {accuracyDeltaPositive ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.accuracy.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            {accuracyDeltaPositive ? "+" : ""}
            {metrics.accuracy_delta.toFixed(1)}% so với tháng trước
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Câu hỏi AI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.chatbot_questions.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            +{metrics.chatbot_questions_today} hôm nay
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Người dùng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.total_users.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            +{metrics.new_users} mới
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

