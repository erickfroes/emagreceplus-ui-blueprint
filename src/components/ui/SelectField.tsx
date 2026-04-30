import * as React from "react";
import { cn } from "@/lib/cn";

export function SelectField({ label, className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  return (
    <label className="block space-y-2">
      {label ? <span className="text-sm font-medium text-slate-700">{label}</span> : null}
      <select
        className={cn("h-11 w-full rounded-xl border border-input bg-white px-3 text-sm text-slate-700 ep-focus-ring", className)}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}
