import { DashboardShell } from "@/components/layout/DashboardShell";
import { ReportChartCard } from "@/components/reports/ReportChartCard";
import { ReportStateSection } from "@/components/reports/ReportStateSection";
import { ReportToolbar } from "@/components/reports/ReportToolbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { patientReportMock } from "@/data/mock/reports";

export default async function PatientReportPage({ params }: { params: Promise<{ patientId: string }> }) {
  const { patientId } = await params;
  const { meta, chart, rows } = patientReportMock;

  return (
    <DashboardShell active="Pacientes">
      <PageHeader title={`${meta.title} #${patientId}`} description={meta.subtitle} actions={<ReportToolbar lastUpdated={meta.lastUpdated} />} />
      <ReportStateSection state={meta.state} entity="relatório do paciente" />
      {meta.state === "default" ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <ReportChartCard title="Aderência por pilar" subtitle="Escala percentual simulada" points={chart} />
          <Card>
            <CardHeader><CardTitle>Evolução resumida</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">{rows.map((row) => <div key={row.id} className="rounded-xl border border-border p-3"><p className="font-medium">{row.name}</p><p>{row.metric}</p><p className="text-muted-foreground">{row.variation}</p></div>)}</CardContent>
          </Card>
        </div>
      ) : null}
    </DashboardShell>
  );
}
