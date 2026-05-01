import { DashboardShell } from "@/components/layout/DashboardShell";
import { ReportChartCard } from "@/components/reports/ReportChartCard";
import { ReportStateSection } from "@/components/reports/ReportStateSection";
import { ReportToolbar } from "@/components/reports/ReportToolbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { financeReportMock } from "@/data/mock/reports";

export default function FinanceReportPage() {
  const { meta, kpis, chart, hasFinancialPermission } = financeReportMock;

  return (
    <DashboardShell active="Relatórios">
      <PageHeader title={meta.title} description={meta.subtitle} actions={<ReportToolbar lastUpdated={meta.lastUpdated} />} />
      <ReportStateSection state={meta.state} entity="relatórios financeiros" />

      {meta.state === "default" ? (
        hasFinancialPermission ? (
          <div className="grid gap-4 md:grid-cols-3">
            {kpis.map((kpi) => (
              <Card key={kpi.label}>
                <CardHeader><CardTitle>{kpi.label}</CardTitle></CardHeader>
                <CardContent className="text-2xl font-semibold text-slate-950">{kpi.value}</CardContent>
              </Card>
            ))}
            <ReportChartCard title="Receita por mês" subtitle="Valores simulados para prototipação" points={chart} />
          </div>
        ) : (
          <Card>
            <CardHeader><CardTitle>Dados financeiros protegidos</CardTitle></CardHeader>
            <CardContent className="text-sm text-danger">Seu perfil não possui permissão para visualizar números financeiros.</CardContent>
          </Card>
        )
      ) : null}
    </DashboardShell>
  );
}
