import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { cn } from "@/lib/cn";

export type MetricPoint = { label: string; value: number };

type MetricChartCardProps = {
  title: string;
  subtitle?: string;
  points: MetricPoint[];
  loading?: boolean;
  error?: string;
  className?: string;
};

export function MetricChartCard({ title, subtitle, points, loading, error, className }: MetricChartCardProps) {
  const max = Math.max(...points.map((point) => point.value), 1);

  return (
    <Card className={className}>
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? <p className="text-sm text-muted-foreground">Carregando dados do gráfico...</p> : null}
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        {!loading && !error ? (
          <div className="space-y-3">
            {points.map((point) => (
              <div key={point.label}>
                <div className="mb-1 flex items-center justify-between text-xs text-slate-600">
                  <span>{point.label}</span>
                  <span>{point.value}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className={cn("h-2 rounded-full bg-primary-600")} style={{ width: `${(point.value / max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
