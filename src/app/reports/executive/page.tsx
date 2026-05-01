import { DashboardShell } from "@/components/layout/DashboardShell";
import { ReportChartCard } from "@/components/reports/ReportChartCard";
import { ReportStateSection } from "@/components/reports/ReportStateSection";
import { ReportToolbar } from "@/components/reports/ReportToolbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { executiveReportMock } from "@/data/mock/reports";

export default function ExecutiveReportPage() {
  const { meta, cards, chart } = executiveReportMock;
  return (
    <DashboardShell active="Relatórios">
      <PageHeader title={meta.title} description={meta.subtitle} actions={<ReportToolbar lastUpdated={meta.lastUpdated} />} />
      <ReportStateSection state={meta.state} entity="visão executiva" />
      {meta.state === "default" ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">{cards.map((card) => <Card key={card.label}><CardHeader><CardTitle>{card.label}</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{card.value}</CardContent></Card>)}</div>
          <ReportChartCard title="Índice consolidado" subtitle="Score por frente estratégica" points={chart} />
        </div>
      ) : null}
    </DashboardShell>
  );
}
