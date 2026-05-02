import { DashboardShell } from "@/components/layout/DashboardShell";
import { ReportChartCard } from "@/components/reports/ReportChartCard";
import { ReportStateSection } from "@/components/reports/ReportStateSection";
import { ReportToolbar } from "@/components/reports/ReportToolbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { packagesReportMock } from "@/data/mock/reports";

export default function PackagesReportPage() {
  const { meta, chart, rows, funnelRows } = packagesReportMock;

  return (
    <DashboardShell active="Relatórios">
      <PageHeader title={meta.title} description={meta.subtitle} actions={<ReportToolbar lastUpdated={meta.lastUpdated} />} />
      <ReportStateSection state={meta.state} entity="relatórios de planos e pacotes" />
      {meta.state === "default" ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <ReportChartCard title="Funil de pacotes" subtitle="Leads, propostas e fechamento" points={chart} />
          <DataTable
            columns={[
              { key: "stage", label: "Etapa" },
              { key: "volume", label: "Volume" },
              { key: "conversion", label: "Conversão" },
              { key: "cycle", label: "Ciclo médio" },
            ]}
            rows={funnelRows}
          />
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Performance por pacote</CardTitle></CardHeader>
            <CardContent className="grid gap-3 text-sm md:grid-cols-3">
              {rows.map((row) => (
                <div key={row.id} className="rounded-xl border border-border p-3">
                  <p className="font-medium">{row.name}</p>
                  <p>{row.metric}</p>
                  <p className="text-muted-foreground">Variação: {row.variation}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ) : null}
    </DashboardShell>
  );
}
