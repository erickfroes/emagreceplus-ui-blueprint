import * as React from "react";
import { cn } from "@/lib/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export function Input({ label, hint, error, className, ...props }: InputProps) {
  return (
    <label className="block space-y-2">
      {label ? <span className="text-sm font-medium text-graphite">{label}</span> : null}
      <input
        className={cn(
          "h-11 w-full rounded-xl border border-input bg-white px-3 text-sm text-graphite placeholder:text-muted-foreground ep-focus-ring",
          error && "border-danger focus-visible:ring-danger",
          className,
        )}
        {...props}
      />
      {error ? <span className="text-xs text-danger">{error}</span> : hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  );
}
