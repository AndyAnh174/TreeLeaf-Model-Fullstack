"use client";

import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WifiOff } from "lucide-react";

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <Alert className="fixed top-16 left-4 right-4 z-50 md:left-auto md:right-4 md:w-auto md:max-w-md">
      <WifiOff className="h-4 w-4" />
      <AlertDescription>
        Không có kết nối mạng. Một số tính năng có thể không hoạt động.
      </AlertDescription>
    </Alert>
  );
}

