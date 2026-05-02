"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { MealCard } from "@/components/nutrition/MealCard";
import { MacroSummaryCard } from "@/components/nutrition/MacroSummaryCard";
import { NutritionPlanPreview } from "@/components/nutrition/NutritionPlanPreview";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { getStateFromParam, nutritionPlans } from "@/data/mock/nutrition";

export default function NutritionPlanPage() {
  const params = useParams<{ patientId: string }>();
  const searchParams = useSearchParams();
  const state = getStateFromParam(searchParams.get("state"));
  const plan = nutritionPlans[params.patientId];

  return (
    <DashboardShell active="Pacientes">
      <h1 className="text-2xl font-semibold text-slate-950">Plano alimentar</h1>
      <p className="mb-4 mt-1 text-sm text-muted-foreground">Plano nutricional visual com metas por refeição, histórico de modelos e envio simulado.</p>

      {state === "loading" ? <p className="text-sm text-muted-foreground">Carregando plano alimentar...</p> : null}
      {state === "error" ? <p className="text-sm text-danger">Erro ao carregar plano alimentar.</p> : null}
      {state === "forbidden" ? <p className="text-sm text-danger">Você não tem permissão para acessar este plano.</p> : null}
      {state === "empty" ? <EmptyState title="Sem plano alimentar" description="Ainda não existe plano ativo para este paciente." /> : null}

      {state === "default" && plan ? (
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>{plan.patientName}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Objetivo: {plan.objetivo}</p>
              <p className="text-sm text-muted-foreground">Válido até: {plan.validade}</p>
              <MacroSummaryCard kcal={plan.kcal} proteinPct={plan.macroSplit.proteinPct} carbPct={plan.macroSplit.carbPct} fatPct={plan.macroSplit.fatPct} />
              <div className="grid gap-3">{plan.itens.map((item) => <MealCard key={item.id} item={item} />)}</div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Salvar rascunho</Button>
                <Button size="sm" variant="outline">Gerar documento</Button>
                <Button size="sm" variant="secondary">Enviar ao paciente (simulado)</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Histórico e modelos</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-wrap gap-2 pb-2"><Button size="sm" variant="outline">Copiar plano anterior</Button><Button size="sm" variant="outline">Modelos</Button><Button size="sm" variant="secondary">Enviar ao paciente (simulado)</Button></div>{plan.historico.map((item) => (
                <div key={item.id} className="rounded-xl border border-border p-3 text-sm">
                  <p className="font-medium text-slate-900">{item.nome}</p>
                  <p className="text-muted-foreground">{item.data} • status: {item.status}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <NutritionPlanPreview plan={plan} />
        </div>
      ) : null}

      {state === "default" && !plan ? <EmptyState title="Paciente não encontrado" description="Nenhum plano vinculado no mock." /> : null}

      <div className="mt-4"><Link href="/patients" className="text-sm text-primary-700 hover:underline">← Voltar para pacientes</Link></div>
    </DashboardShell>
  );
}
