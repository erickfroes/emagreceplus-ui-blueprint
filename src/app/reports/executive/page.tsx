import { DashboardShell } from "@/components/layout/DashboardShell";
import { ReportChartCard } from "@/components/reports/ReportChartCard";
import { ReportStateSection } from "@/components/reports/ReportStateSection";
import { ReportToolbar } from "@/components/reports/ReportToolbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { executiveReportMock } from "@/data/mock/reports";

export default function ExecutiveReportPage() {
  const { meta, cards, chart, strategicAlerts } = executiveReportMock;
  return (
    <DashboardShell active="Relatórios">
      <PageHeader title={meta.title} description={meta.subtitle} actions={<ReportToolbar lastUpdated={meta.lastUpdated} />} />
      <ReportStateSection state={meta.state} entity="analytics executivo" />
      {meta.state === "default" ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {cards.map((card) => (
              <Card key={card.label}>
                <CardHeader><CardTitle>{card.label}</CardTitle></CardHeader>
                <CardContent className="text-2xl font-semibold">{card.value}</CardContent>
              </Card>
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <ReportChartCard title="Índice consolidado" subtitle="Score por frente estratégica" points={chart} />
            <DataTable
              columns={[
                { key: "title", label: "Alerta estratégico" },
                { key: "owner", label: "Responsável" },
                {
                  key: "severity",
                  label: "Severidade",
                  render: (row) => (
                    <span className={row.severity === "alta" ? "font-semibold text-danger" : "text-slate-700"}>{row.severity}</span>
                  ),
                },
                { key: "status", label: "Status" },
              ]}
              rows={strategicAlerts}
            />
          </div>
        </div>
      ) : null}
    </DashboardShell>
  );
}
