"use client";

import { useState, useEffect } from "react";
import { Bell, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { BeforeInstallPromptEvent } from "@/types/pwa";
import { toast } from "sonner";

export function Header() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback if no prompt
      toast.info("Vui lòng sử dụng menu trình duyệt để cài đặt ứng dụng");
      return;
    }

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    
    if (result.outcome === 'accepted') {
      toast.success("Đã cài đặt ứng dụng thành công!");
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* PWA Install Button - chỉ hiện trên mobile và khi chưa cài */}
        {!isStandalone && (
          <Button 
            onClick={handleInstallClick}
            variant="default" 
            size="sm"
            className="md:hidden"
          >
            <Download className="h-4 w-4 mr-2" />
            Tải App
          </Button>
        )}

        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Thông báo</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 rounded-full hidden md:flex">
              <Avatar className="h-10 w-10">
                <AvatarFallback>ND</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Tài khoản</DropdownMenuItem>
            <DropdownMenuItem>Cài đặt</DropdownMenuItem>
            <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

