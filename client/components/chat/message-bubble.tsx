"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export function MessageBubble({ message, isUser, timestamp }: MessageBubbleProps) {
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} w-full`}>
      {/* Avatar */}
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>

      {/* Message Content */}
      <div className={`flex-1 min-w-0 ${isUser ? "flex justify-end" : "flex justify-start"}`}>
        <div className={`w-full max-w-[85%] ${isUser ? "text-right" : "text-left"}`}>
          <div className={`rounded-2xl px-4 py-3 ${
            isUser 
              ? "bg-primary text-primary-foreground ml-auto" 
              : "bg-muted"
          }`}>
            {isUser ? (
              <p className="text-sm whitespace-pre-wrap break-words">{message}</p>
            ) : (
              <div className="text-sm prose prose-sm max-w-none break-words">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc pl-6 mb-2">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-6 mb-2">{children}</ol>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                    em: ({ children }) => <em className="italic">{children}</em>,
                    code: ({ children, className }) => {
                      const isInline = !className;
                      return isInline ? (
                        <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>
                      ) : (
                        <code className="block bg-muted p-3 rounded text-xs font-mono overflow-x-auto">{children}</code>
                      );
                    },
                    h3: ({ children }) => <h3 className="font-semibold text-base mt-4 mb-2 first:mt-0">{children}</h3>,
                    h4: ({ children }) => <h4 className="font-semibold text-sm mt-3 mb-1 first:mt-0">{children}</h4>,
                  }}
                >
                  {message}
                </ReactMarkdown>
              </div>
            )}
          </div>
          <p className={`text-xs mt-1 px-2 ${isUser ? "text-right" : "text-left"} text-muted-foreground`}>
            {timestamp.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      </div>
    </div>
  );
}
