import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

export type ActionMenuItem = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

export function ActionMenu({ items, className }: { items: ActionMenuItem[]; className?: string }) {
  return (
    <details className={cn("relative", className)}>
      <summary className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg border border-border bg-white text-slate-600 marker:content-none hover:bg-slate-50 ep-focus-ring">
        <MoreHorizontal className="h-4 w-4" />
      </summary>
      <div className="absolute right-0 z-10 mt-2 min-w-44 rounded-xl border border-border bg-white p-1 shadow-soft">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            disabled={item.disabled}
            onClick={item.onClick}
            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {item.label}
          </button>
        ))}
      </div>
    </details>
  );
}
