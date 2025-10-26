import { ChatResponse } from "@/types/api";
import { apiRequest } from "./client";

export interface ChatRequest {
  query: string;
  context?: string;
}

export async function sendChatMessage(
  request: ChatRequest
): Promise<ChatResponse> {
  return apiRequest<ChatResponse>("/chat", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

