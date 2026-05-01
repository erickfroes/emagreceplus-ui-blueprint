import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { scheduleItems, type UIState } from "@/data/mock/encounters";
import { resolveUiState } from "@/data/mock/ui-states";

const statusTone = {
  confirmado: "success",
  aguardando: "warning",
  cancelado: "danger",
} as const;

export default async function SchedulePage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const params = searchParams ? await searchParams : undefined;
  const pageState = resolveUiState(params?.state) as UIState;
  return (
    <DashboardShell active="Agenda">
      <h1 className="text-2xl font-semibold text-slate-950">Agenda do dia</h1>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">Visualização de consultas com status e profissional responsável.</p>

      {pageState === "loading" ? <LoadingState title="Carregando agenda" /> : null}
      {pageState === "error" ? <ErrorState title="Erro ao carregar agenda" /> : null}
      {pageState === "forbidden" ? <ForbiddenState title="Acesso negado à agenda" /> : null}
      {pageState === "empty" ? <EmptyState title="Sem consultas agendadas" description="Nenhum horário foi reservado para hoje." /> : null}

      {pageState === "default" ? (
        <Card>
          <CardHeader><CardTitle>Consultas de hoje ({scheduleItems.length})</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scheduleItems.map((item) => (
                <div key={item.id} className="rounded-2xl border border-border bg-white p-4 shadow-soft">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-slate-900">{item.patientName}</p>
                      <p className="text-sm text-muted-foreground">{item.type} • {item.professional}</p>
                    </div>
                    <Badge tone={statusTone[item.status]}>{item.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{item.startTime} - {item.endTime}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}
    </DashboardShell>
  );
}
