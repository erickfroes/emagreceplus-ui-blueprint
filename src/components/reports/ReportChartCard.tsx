import { MetricChartCard, type MetricPoint } from "@/components/ui/MetricChartCard";

export function ReportChartCard({ title, subtitle, points }: { title: string; subtitle: string; points: MetricPoint[] }) {
  return <MetricChartCard title={title} subtitle={subtitle} points={points} />;
}
