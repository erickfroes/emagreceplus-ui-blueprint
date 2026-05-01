import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { overdue, webhookEvents } from "@/data/mock/finance";
export default function OverduePage() {
  return <DashboardShell active="Financeiro"><PageHeader title="Inadimplência" description="Monitoramento de atrasos atualizado por eventos simulados do Asaas." />
    <Card><CardHeader><CardTitle>Pacientes em atraso</CardTitle></CardHeader><CardContent className="space-y-2">{overdue.map((o) => <p key={o.patient}>{o.patient} • {o.days} dias • {o.amount} • {o.plan}</p>)}</CardContent></Card>
    <Card className="mt-4"><CardHeader><CardTitle>Webhook e idempotência (simulado)</CardTitle></CardHeader><CardContent className="space-y-2">{webhookEvents.map((event) => <p key={event.idempotencyKey}>{event.event} • {event.behavior} • {event.payloadHash}</p>)}</CardContent></Card>
  </DashboardShell>;
}
