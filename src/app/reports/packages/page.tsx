import { DashboardShell } from "@/components/layout/DashboardShell";
import { ReportChartCard } from "@/components/reports/ReportChartCard";
import { ReportStateSection } from "@/components/reports/ReportStateSection";
import { ReportToolbar } from "@/components/reports/ReportToolbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { packagesReportMock } from "@/data/mock/reports";

export default function PackagesReportPage() {
  const { meta, chart, rows } = packagesReportMock;

  return (
    <DashboardShell active="Relatórios">
      <PageHeader title={meta.title} description={meta.subtitle} actions={<ReportToolbar lastUpdated={meta.lastUpdated} />} />
      <ReportStateSection state={meta.state} entity="relatórios de planos e pacotes" />
      {meta.state === "default" ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <ReportChartCard title="Distribuição por produto" subtitle="Quantidade de assinaturas ativas" points={chart} />
          <Card>
            <CardHeader><CardTitle>Ranking de pacotes</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              {rows.map((row) => <div key={row.id} className="rounded-xl border border-border p-3"><p className="font-medium">{row.name}</p><p>{row.metric}</p><p className="text-muted-foreground">Variação: {row.variation}</p></div>)}
            </CardContent>
          </Card>
        </div>
      ) : null}
    </DashboardShell>
  );
}
