import * as React from "react";
import { cn } from "@/lib/cn";

export interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface SidebarProps {
  brand?: React.ReactNode;
  title?: string;
  items: SidebarItem[];
  activeLabel?: string;
  footer?: React.ReactNode;
}

export function Sidebar({ brand, title, items, activeLabel, footer }: SidebarProps) {
  return (
    <aside className="sticky top-0 h-screen border-r border-border bg-white p-6 shadow-soft">
      {brand ? <div className="mb-8">{brand}</div> : null}
      {title ? <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p> : null}
      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeLabel === item.label;
          return (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition",
                isActive ? "bg-accent text-primary font-semibold" : "text-muted-foreground hover:bg-muted",
              )}
            >
              {Icon ? <Icon className="h-5 w-5" /> : null}
              {item.label}
            </a>
          );
        })}
      </nav>
      {footer ? <div className="absolute bottom-6 left-6 right-6">{footer}</div> : null}
    </aside>
  );
}
