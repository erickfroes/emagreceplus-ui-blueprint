import * as React from "react";
import { cn } from "@/lib/cn";

export type TabsItem = {
  id: string;
  label: string;
  disabled?: boolean;
};

type TabsProps = {
  items: TabsItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function Tabs({ items, value, onChange, className }: TabsProps) {
  return (
    <div className={cn("inline-flex rounded-2xl border border-border bg-white p-1", className)} role="tablist" aria-label="Tabs">
      {items.map((item) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={item.disabled}
            onClick={() => onChange(item.id)}
            className={cn(
              "rounded-xl px-3 py-2 text-sm font-medium transition ep-focus-ring disabled:cursor-not-allowed disabled:opacity-50",
              active ? "bg-primary-600 text-white" : "text-slate-600 hover:bg-slate-100",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
