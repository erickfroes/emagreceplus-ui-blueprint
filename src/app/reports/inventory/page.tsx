import { DashboardShell } from "@/components/layout/DashboardShell";
import { ReportChartCard } from "@/components/reports/ReportChartCard";
import { ReportStateSection } from "@/components/reports/ReportStateSection";
import { ReportToolbar } from "@/components/reports/ReportToolbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { inventoryReportMock } from "@/data/mock/reports";

export default function InventoryReportPage() {
  const { meta, chart, rows, consumptionKpis } = inventoryReportMock;
  return (
    <DashboardShell active="Relatórios">
      <PageHeader title={meta.title} description={meta.subtitle} actions={<ReportToolbar lastUpdated={meta.lastUpdated} />} />
      <ReportStateSection state={meta.state} entity="relatórios de estoque" />
      {meta.state === "default" ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {consumptionKpis.map((kpi) => (
              <Card key={kpi.id}>
                <CardHeader><CardTitle>{kpi.label}</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold text-slate-950">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground">{kpi.context}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <ReportChartCard title="Cobertura por categoria" subtitle="Percentual de estoque disponível" points={chart} />
            <Card>
              <CardHeader><CardTitle>Itens críticos</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                {rows.map((row) => <div key={row.id} className="flex items-center justify-between rounded-xl border border-border p-3"><span>{row.name}</span><span className="font-medium">{row.metric}</span><span className="text-danger">{row.variation}</span></div>)}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : null}
    </DashboardShell>
  );
}
