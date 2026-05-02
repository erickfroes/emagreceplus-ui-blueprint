import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { resolveUiState } from "@/data/mock/ui-states";
import { overdue, webhookEvents } from "@/data/mock/finance";
export default async function OverduePage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const state = resolveUiState((await searchParams)?.state);
  return <DashboardShell active="Financeiro"><PageHeader title="Inadimplência" description="Monitoramento de atrasos atualizado por eventos simulados do Asaas." />
    {state === "loading" ? <LoadingState title="Carregando inadimplência" /> : null}
    {state === "empty" ? <EmptyState title="Sem pacientes em atraso" description="Não há cobranças vencidas no período simulado." /> : null}
    {state === "error" ? <ErrorState title="Falha ao carregar inadimplência" /> : null}
    {state === "forbidden" ? <ForbiddenState title="Acesso negado à inadimplência" /> : null}
    {state === "default" ? <>
    <Card><CardHeader><CardTitle>Pacientes em atraso</CardTitle></CardHeader><CardContent className="space-y-2">{overdue.map((o) => <p key={o.patient}>{o.patient} • {o.days} dias • {o.amount} • {o.plan}</p>)}</CardContent></Card>
    <Card className="mt-4"><CardHeader><CardTitle>Webhook e idempotência (simulado)</CardTitle></CardHeader><CardContent className="space-y-2">{webhookEvents.map((event) => <p key={event.idempotencyKey}>{event.event} • {event.behavior} • {event.payloadHash}</p>)}</CardContent></Card>
    </> : null}
  </DashboardShell>;
}
