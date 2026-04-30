import * as React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { cn } from "@/lib/cn";

export type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  className?: string;
};

export function StatCard({ title, value, subtitle, trend, trendDirection = "neutral", icon, className }: StatCardProps) {
  const positive = trendDirection === "up";
  const negative = trendDirection === "down";
  return (
    <Card className={cn("p-5", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{value}</p>
          {subtitle ? <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p> : null}
        </div>
        {icon ? <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-50 text-primary-700">{icon}</div> : null}
      </div>
      {trend ? (
        <Badge tone={positive ? "success" : negative ? "danger" : "neutral"} className="mt-4">
          {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : negative ? <ArrowDownRight className="h-3.5 w-3.5" /> : null}
          {trend}
        </Badge>
      ) : null}
    </Card>
  );
}
