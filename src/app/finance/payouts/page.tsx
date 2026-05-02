import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { resolveUiState } from "@/data/mock/ui-states";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";

const payouts = [
  { professional: "Dr. Lucas", amount: "R$ 4.320,00", status: "aguardando" },
  { professional: "Dra. Paula", amount: "R$ 3.860,00", status: "conferido" },
] as const;

export default async function PayoutsPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const params = searchParams ? await searchParams : undefined;
  const state = resolveUiState(params?.state);

  return <DashboardShell active="Financeiro"><PageHeader title="Repasses de Profissionais" description="Conferência e liberação de repasses com fluxo apenas simulado." />
    {state === "loading" ? <LoadingState title="Carregando repasses" /> : null}
    {state === "empty" ? <EmptyState title="Sem repasses pendentes" description="Não há repasses para o período selecionado." /> : null}
    {state === "error" ? <ErrorState title="Falha ao carregar repasses" /> : null}
    {state === "forbidden" ? <ForbiddenState title="Acesso negado aos repasses" /> : null}

    {state === "default" ? <Card><CardHeader><CardTitle>Próximos repasses</CardTitle></CardHeader><CardContent className="space-y-3">{payouts.map((item) => <div key={item.professional} className="flex items-center justify-between rounded-2xl border border-border p-4"><div><p className="font-medium text-graphite">{item.professional}</p><p className="text-sm text-muted-foreground">Competência mensal</p></div><div className="flex items-center gap-3"><span className="font-semibold">{item.amount}</span><Badge tone={item.status === "conferido" ? "success" : "warning"}>{item.status}</Badge></div></div>)}</CardContent></Card> : null}
  </DashboardShell>;
}
