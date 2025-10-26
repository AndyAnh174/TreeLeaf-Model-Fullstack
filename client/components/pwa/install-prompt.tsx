"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, X } from "lucide-react";
import type { BeforeInstallPromptEvent } from "@/types/pwa";

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstallable(false);
    }

    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsInstallable(false);
    setDeferredPrompt(null);
  };

  if (!isInstallable) return null;

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 p-4 shadow-lg md:left-auto md:right-4 md:w-80">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-primary/10 p-2">
          <Download className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">Cài đặt ứng dụng</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Cài đặt để sử dụng nhanh hơn và truy cập offline
          </p>
          <div className="flex gap-2">
            <Button onClick={handleInstall} size="sm">
              Cài đặt
            </Button>
            <Button
              onClick={handleDismiss}
              variant="outline"
              size="sm"
            >
              Bỏ qua
            </Button>
          </div>
        </div>
        <Button
          onClick={handleDismiss}
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}

