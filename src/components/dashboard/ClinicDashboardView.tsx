import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatCard } from "@/components/ui/StatCard";
import { clinicDashboardMock } from "@/data/mock/clinic-dashboard";

export function ClinicDashboardView() {
  if (clinicDashboardMock.state !== "ready") {
    return (
      <DashboardShell active="Dashboard">
        <EmptyState title="Dashboard indisponível" />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell active="Dashboard">
      <h1 className="text-2xl font-semibold text-slate-950">Dashboard da clínica</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {clinicDashboardMock.kpis.map((kpi) => (
          <StatCard key={kpi.label} title={kpi.label} value={kpi.value} trend={kpi.trend} trendDirection={kpi.trendDirection} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Agenda de hoje</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {clinicDashboardMock.agenda.map((item) => <p key={item.id} className="text-sm">{item.time} • {item.patient} • {item.professional}</p>)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Funil de conversão</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {clinicDashboardMock.funnel.map((item) => <p key={item.stage} className="text-sm">{item.stage}: {item.count} ({item.conversion})</p>)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Alertas</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {clinicDashboardMock.alerts.map((item) => <Badge key={item.id} tone={item.tone}>{item.title}</Badge>)}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle>Atalhos rápidos</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {clinicDashboardMock.shortcuts.map((item) => <div key={item.label} className="rounded-xl border p-3"><p className="font-medium">{item.label}</p><p className="text-sm text-slate-600">{item.description}</p></div>)}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
