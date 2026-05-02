import { DashboardShell } from "@/components/layout/DashboardShell";
import { ReportStateSection } from "@/components/reports/ReportStateSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { patientReportMockData } from "@/data/mock/patient-report.mock";

const tabs = ["Financeiro", "Pacotes", "Serviços", "Documentos", "Adesão", "Timeline"];

export default async function PatientReportPage({ params }: { params: Promise<{ patientId: string }> }) {
  const { patientId } = await params;
  const report = patientReportMockData;

  return (
    <DashboardShell active="Pacientes">
      <PageHeader
        title={`Relatório do paciente #${patientId}`}
        description={`${report.patientName} • Pacote ativo: ${report.activePackage}`}
      />
      <ReportStateSection state={report.state} entity="relatório do paciente" />

      {report.state === "default" ? (
        <div className="space-y-4">
          <Card>
            <CardContent className="grid gap-3 p-4 text-sm md:grid-cols-3">
              <div className="rounded-2xl border p-3"><p className="text-muted-foreground">Paciente</p><p className="font-semibold">{report.patientName}</p></div>
              <div className="rounded-2xl border p-3"><p className="text-muted-foreground">Status financeiro</p><p className="font-semibold">{report.financialStatus}</p></div>
              <div className="rounded-2xl border p-3"><p className="text-muted-foreground">Status clínico</p><p className="font-semibold">{report.clinicalStatus}</p></div>
            </CardContent>
          </Card>

          <div className="grid gap-2 md:grid-cols-6">{tabs.map((tab, i) => <div key={tab} className={`rounded-2xl border px-3 py-2 text-center text-sm ${i === 0 ? "border-primary-500" : ""}`}>{tab}</div>)}</div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {report.kpis.map((kpi) => <Card key={kpi.label}><CardContent className="p-4"><p className="text-xs text-muted-foreground">{kpi.label}</p><p className="text-lg font-semibold">{kpi.value}</p></CardContent></Card>)}
          </div>

          <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              <Card>
                <CardHeader><CardTitle>Parcelas e pagamentos</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">{report.installments.map((row) => <div key={row.id} className="grid grid-cols-4 rounded-xl border p-3"><span>{row.date}</span><span>{row.description}</span><span>{row.value}</span><span className="font-medium">{row.status}</span></div>)}</CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Serviços consumidos</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">{report.consumedServices.map((row) => <div key={row.id} className="grid grid-cols-4 rounded-xl border p-3"><span>{row.date}</span><span>{row.description}</span><span>{row.value}</span><span className="font-medium">{row.status}</span></div>)}</CardContent>
              </Card>
            </div>
            <Card className="h-fit">
              <CardHeader><CardTitle>Alertas laterais</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">{report.alerts.map((alert) => <p key={alert} className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-900">{alert}</p>)}</CardContent>
            </Card>
          </div>
        </div>
      ) : null}
    </DashboardShell>
  );
}
