"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Camera,
  MessageSquare,
  BarChart3,
  Settings,
  Leaf,
} from "lucide-react";

const navigation = [
  {
    name: "Trang chủ",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Nhận diện bệnh",
    href: "/predict",
    icon: Camera,
  },
  {
    name: "Tư vấn AI",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    name: "Thống kê",
    href: "/statistics",
    icon: BarChart3,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Leaf className="h-6 w-6" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Nhận Diện Bệnh</span>
          <span className="text-xs text-muted-foreground">Lá Cây</span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-3">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <Settings className="h-5 w-5 shrink-0" />
          Cài đặt
        </Link>
      </div>
    </div>
  );
}

