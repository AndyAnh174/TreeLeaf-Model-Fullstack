"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Loader2, Bot as BotIconLucide } from "lucide-react";
import { MessageBubble } from "./message-bubble";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  context?: string;
  onSendMessage: (message: string) => Promise<string>;
  isLoading: boolean;
}

export function ChatInterface({
  context,
  onSendMessage,
  isLoading: externalLoading,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoSentRef = useRef<string | null>(null);
  
  const handleSendAuto = async (query: string) => {
    setMessages((prev) => [
      ...prev,
      { text: query, isUser: true, timestamp: new Date() },
    ]);
    
    setIsLoading(true);
    try {
      const response = await onSendMessage(query);
      if (response) {
        // Add AI response with typing effect
        setMessages((prev) => [
          ...prev,
          { text: "", isUser: false, timestamp: new Date() },
        ]);
        
        const words = response.split(' ');
        let currentText = "";
        
        for (let i = 0; i < words.length; i++) {
          currentText += (i > 0 ? ' ' : '') + words[i];
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              text: currentText,
              isUser: false,
              timestamp: new Date(),
            };
            return newMessages;
          });
          // Auto scroll during typing
          scrollToBottom();
          await new Promise(resolve => setTimeout(resolve, 30));
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: error instanceof Error ? error.message : "Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (context && autoSentRef.current !== context) {
      autoSentRef.current = context;
      
      // Tự động gửi câu hỏi về bệnh ngay lập tức, không hiển thị message bubble
      const autoQuestion = `Giải thích cho tôi về bệnh này: ${context}`;
      handleSendAuto(autoQuestion);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  useEffect(() => {
    if (messages.length > 0) {
      // Auto scroll to bottom when new messages arrive
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 100);
    }
  }, [messages.length]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || externalLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    setMessages((prev) => [
      ...prev,
      { text: userMessage, isUser: true, timestamp: new Date() },
    ]);

    setIsLoading(true);
    try {
      const response = await onSendMessage(userMessage);
      // Add AI response to messages
      if (response) {
        // Simulate typing effect - display in chunks for better performance
        setMessages((prev) => [
          ...prev,
          { text: "", isUser: false, timestamp: new Date() },
        ]);
        
        // Type out the response word by word for faster display
        const words = response.split(' ');
        let currentText = "";
        
        for (let i = 0; i < words.length; i++) {
          currentText += (i > 0 ? ' ' : '') + words[i];
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              text: currentText,
              isUser: false,
              timestamp: new Date(),
            };
            return newMessages;
          });
          // Reduced delay for faster typing
          await new Promise(resolve => setTimeout(resolve, 30));
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: error instanceof Error ? error.message : "Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto scroll function
  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  };

  return (
    <div className="flex flex-col h-[600px] max-h-[600px] bg-background">
      <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
        <div className="space-y-4 pb-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
              <p className="text-lg mb-2">Chào mừng!</p>
              <p className="text-sm">Tôi có thể giúp bạn tư vấn về bệnh lá cây</p>
            </div>
          )}
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} message={msg.text} isUser={msg.isUser} timestamp={msg.timestamp} />
          ))}
          {(isLoading || externalLoading) && (
            <div className="flex gap-2 items-center">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback>
                  <BotIconLucide className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="rounded-2xl bg-muted px-4 py-3 animate-pulse">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">Đang suy nghĩ...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </div>

      <div className="border-t bg-background p-4 shrink-0">
        <div className="flex gap-2 max-w-5xl mx-auto">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Nhập câu hỏi của bạn..."
            className="resize-none"
            rows={2}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading || externalLoading}
            size="icon"
            className="shrink-0"
          >
            {isLoading || externalLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}


