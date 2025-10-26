"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatInterface } from "@/components/chat/chat-interface";
import { sendChatMessage } from "@/lib/api/chat";
import { toast } from "sonner";
import { MessageSquare } from "lucide-react";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const disease = searchParams.get("disease");
  const confidence = searchParams.get("confidence");

  const handleSendMessage = async (query: string) => {
    try {
      const context =
        disease && confidence
          ? `Lá cây bị bệnh: ${disease.replace(/_/g, " ")} (độ tin cậy: ${confidence})`
          : undefined;

      const response = await sendChatMessage({ query, context });

      if (response.success) {
        return response.response;
      } else {
        throw new Error("Không thể nhận phản hồi từ AI");
      }
    } catch (error) {
      console.error("Chat error:", error);
      
      const errorMessage = error instanceof Error ? error.message : "Không thể gửi tin nhắn. Vui lòng thử lại.";
      toast.error(errorMessage);
      
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <MessageSquare className="h-8 w-8" />
          Tư vấn AI
        </h1>
        <p className="text-muted-foreground">
          Đặt câu hỏi để nhận tư vấn về bệnh lá cây và nông nghiệp
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chat với AI</CardTitle>
        </CardHeader>
        <ChatInterface
          context={disease ? `bệnh: ${disease} (độ tin cậy: ${confidence})` : undefined}
          onSendMessage={handleSendMessage}
          isLoading={false}
        />
      </Card>
    </div>
  );
}

