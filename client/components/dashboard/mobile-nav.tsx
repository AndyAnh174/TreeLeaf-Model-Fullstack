"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Camera,
  MessageSquare,
  BarChart3,
} from "lucide-react";

const navigation = [
  { name: "Trang chủ", href: "/", icon: LayoutDashboard },
  { name: "Nhận diện", href: "/predict", icon: Camera },
  { name: "Tư vấn AI", href: "/chat", icon: MessageSquare },
  { name: "Thống kê", href: "/statistics", icon: BarChart3 },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t bg-background md:hidden">
      {navigation.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-4 py-3 transition-colors",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

