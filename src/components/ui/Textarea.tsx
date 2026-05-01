import * as React from "react";
import { cn } from "@/lib/cn";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export function Textarea({ label, hint, error, className, ...props }: TextareaProps) {
  return (
    <label className="block space-y-2">
      {label ? <span className="text-sm font-medium text-slate-700">{label}</span> : null}
      <textarea
        className={cn(
          "min-h-28 w-full rounded-xl border border-input bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 ep-focus-ring disabled:cursor-not-allowed disabled:opacity-60",
          error && "border-danger focus-visible:ring-danger",
          className,
        )}
        {...props}
      />
      {error ? <span className="text-xs text-danger">{error}</span> : hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  );
}
