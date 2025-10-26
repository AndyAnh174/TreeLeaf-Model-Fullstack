"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/predict/image-uploader";
import { ResultCard } from "@/components/predict/result-card";
import { predictDisease } from "@/lib/api/predict";
import type { PredictResponse } from "@/types/api";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PredictPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    setResult(null);
  };

  const handlePredict = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    try {
      const data = await predictDisease(selectedFile);
      setResult(data);
      toast.success("Nhận diện thành công!");
    } catch (error) {
      console.error("Predict error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Không thể nhận diện bệnh. Vui lòng thử lại."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatWithContext = () => {
    if (!result) return;
    router.push(`/chat?disease=${encodeURIComponent(result.disease)}&confidence=${result.confidence_percent}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nhận diện bệnh lá cây</h1>
        <p className="text-muted-foreground">
          Chụp hoặc upload ảnh lá cây để phát hiện bệnh
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <ImageUploader
            onImageSelect={handleImageSelect}
            isLoading={isLoading}
          />
          {selectedFile && !isLoading && (
            <Button
              onClick={handlePredict}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Phân tích bệnh
                </>
              )}
            </Button>
          )}
        </div>

        {result && (
          <div className="space-y-4">
            <ResultCard result={result} />
            <Button
              onClick={handleChatWithContext}
              variant="outline"
              className="w-full"
            >
              Tư vấn AI về bệnh này
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

