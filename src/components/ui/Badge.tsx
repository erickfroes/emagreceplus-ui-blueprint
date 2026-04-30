import * as React from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "success" | "warning" | "danger" | "info" | "neutral" | "primary";

const tones: Record<BadgeTone, string> = {
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-amber-700",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
  neutral: "bg-slate-100 text-slate-600",
  primary: "bg-primary-50 text-primary-700",
};

export function Badge({ tone = "neutral", className, ...props }: React.HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium", tones[tone], className)} {...props} />;
}
