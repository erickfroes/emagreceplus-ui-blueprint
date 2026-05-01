import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { crmLeads, crmStages, type CRMStage, type UIState } from "@/data/mock/crm";
import { resolveUiState } from "@/data/mock/ui-states";

type StageFilter = CRMStage | "todos";
export default async function CRMPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const params = searchParams ? await searchParams : undefined;
  const pageState = resolveUiState(params?.state) as UIState;
  const stageFilter: StageFilter = "todos";
  const visibleLeads = crmLeads;

  return (
    <DashboardShell active="CRM">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-graphite">CRM Kanban</h1>
          <p className="mt-1 text-sm text-muted-foreground">Pipeline visual com estágios de conversão, perdido e arquivado.</p>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          Filtrar etapa
          <select
            aria-label="Filtrar etapa do CRM"
            className="rounded-xl border border-border bg-white px-3 py-2 text-sm ep-focus-ring"
            value={stageFilter}
            disabled
          >
            <option value="todos">Todos os estágios</option>
            {crmStages.map((stage) => (
              <option key={stage.id} value={stage.id}>{stage.label}</option>
            ))}
          </select>
        </label>
      </div>

      {pageState === "loading" ? <LoadingState title="Carregando leads" description="Buscando pipeline comercial simulado." /> : null}
      {pageState === "error" ? <ErrorState title="Falha no funil" description="Não foi possível renderizar os estágios do CRM no mock atual." /> : null}
      {pageState === "forbidden" ? <ForbiddenState title="Acesso negado ao CRM" description="Seu perfil não possui permissão para visualizar este funil." /> : null}

      {pageState === "empty" ? (
        <EmptyState title="CRM vazio" description="Ainda não existem leads no funil comercial." />
      ) : null}

      {pageState === "default" ? (
        visibleLeads.length === 0 ? (
          <EmptyState title="Nenhum lead para o filtro aplicado" description="Ajuste os filtros para visualizar oportunidades." />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {crmStages.map((stage) => {
              const leads = visibleLeads.filter((lead) => lead.stage === stage.id);
              return (
                <Card key={stage.id}>
                  <CardHeader>
                    <CardTitle>{stage.label}</CardTitle>
                    <Badge tone="neutral">{leads.length}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {leads.length === 0 ? (
                      <p className="text-sm text-muted-foreground">Sem leads neste estágio.</p>
                    ) : leads.map((lead) => (
                      <Link
                        key={lead.id}
                        href={`/crm/leads/${lead.id}`}
                        className="block rounded-xl border border-border p-3 hover:bg-accent"
                      >
                        <p className="font-medium text-graphite">{lead.nome}</p>
                        <p className="text-sm text-muted-foreground">{lead.objetivo}</p>
                        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                          <span>{lead.origem}</span>
                          <span>{lead.ultimaInteracaoEm}</span>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )
      ) : null}
    </DashboardShell>
  );
}
