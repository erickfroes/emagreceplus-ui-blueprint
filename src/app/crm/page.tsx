"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { crmLeads, crmStages, type CRMStage, type UIState } from "@/data/mock/crm";

type StageFilter = CRMStage | "todos";
const pageState: UIState = "default";

export default function CRMPage() {
  const [stageFilter, setStageFilter] = useState<StageFilter>("todos");

  const visibleLeads = useMemo(() => {
    if (stageFilter === "todos") return crmLeads;
    return crmLeads.filter((lead) => lead.stage === stageFilter);
  }, [stageFilter]);

  return (
    <DashboardShell active="CRM">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">CRM Kanban</h1>
          <p className="mt-1 text-sm text-muted-foreground">Pipeline visual com estágios de conversão, perdido e arquivado.</p>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          Filtrar etapa
          <select
            aria-label="Filtrar etapa do CRM"
            className="rounded-xl border border-border bg-white px-3 py-2 text-sm"
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value as StageFilter)}
          >
            <option value="todos">Todos os estágios</option>
            {crmStages.map((stage) => (
              <option key={stage.id} value={stage.id}>{stage.label}</option>
            ))}
          </select>
        </label>
      </div>

      {pageState === "loading" ? <p className="text-sm text-muted-foreground">Carregando leads...</p> : null}
      {pageState === "error" ? <p className="text-sm text-danger">Erro ao carregar o funil simulado.</p> : null}
      {pageState === "forbidden" ? <p className="text-sm text-danger">Acesso negado ao CRM.</p> : null}

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
                        className="block rounded-xl border border-border p-3 hover:bg-slate-50"
                      >
                        <p className="font-medium text-slate-900">{lead.nome}</p>
                        <p className="text-sm text-muted-foreground">{lead.objetivo}</p>
                        <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
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
