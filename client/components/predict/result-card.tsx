"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import type { PredictResponse } from "@/types/api";

interface ResultCardProps {
  result: PredictResponse;
}

export function ResultCard({ result }: ResultCardProps) {
  const confidence = result.confidence * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {result.success ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          )}
          Kết quả nhận diện
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-sm font-medium">Bệnh phát hiện</span>
            <Badge variant="outline" className="text-sm px-3 py-1 w-fit break-words">
              {result.disease.replace(/_/g, " ").toUpperCase()}
            </Badge>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Độ tin cậy</span>
            <span className="text-sm font-semibold">{result.confidence_percent}</span>
          </div>
          <Progress value={confidence} className="h-3" />
        </div>

        <div className="rounded-lg bg-muted p-4">
          <h4 className="font-semibold mb-2">Khuyến nghị</h4>
          <p className="text-sm text-muted-foreground break-words overflow-wrap-anywhere">
            Dựa trên kết quả phân tích, bạn có thể nhận tư vấn chi tiết từ AI
            chatbot về cách xử lý và phòng ngừa bệnh này.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

