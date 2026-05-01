"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { DocumentPreviewCard } from "@/components/nutrition/DocumentPreviewCard";
import { getStateFromParam, nutritionPlans } from "@/data/mock/nutrition";

export default function NutritionPlanPage() {
  const params = useParams<{ patientId: string }>();
  const searchParams = useSearchParams();
  const state = getStateFromParam(searchParams.get("state"));
  const plan = nutritionPlans[params.patientId];

  return (
    <DashboardShell active="Pacientes">
      <h1 className="text-2xl font-semibold text-slate-950">Plano alimentar</h1>
      <p className="mb-4 mt-1 text-sm text-muted-foreground">Plano nutricional estruturado por refeição e objetivo clínico.</p>

      {state === "loading" ? <p className="text-sm text-muted-foreground">Carregando plano alimentar...</p> : null}
      {state === "error" ? <p className="text-sm text-danger">Erro ao carregar plano alimentar.</p> : null}
      {state === "forbidden" ? <p className="text-sm text-danger">Você não tem permissão para acessar este plano.</p> : null}
      {state === "empty" ? <EmptyState title="Sem plano alimentar" description="Ainda não existe plano ativo para este paciente." /> : null}

      {state === "default" && plan ? (
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>{plan.patientName}</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Objetivo: {plan.objetivo}</p>
              <p className="text-sm text-muted-foreground">Válido até: {plan.validade}</p>
              <div className="mt-4 grid gap-3">
                {plan.itens.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                    <p className="text-xs text-muted-foreground">{item.horario} • {item.refeicao}</p>
                    <p className="text-sm"><span className="font-medium">Fonte proteica:</span> {item.fonteProteica}</p>
                    <p className="text-sm"><span className="font-medium">Carboidrato:</span> {item.carboidrato}</p>
                    <p className="text-sm"><span className="font-medium">Gordura boa:</span> {item.gorduraBoa}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <DocumentPreviewCard
            title={`Plano alimentar - ${plan.patientName}`}
            subtitle={`Documento simulado • validade ${plan.validade}`}
            sections={plan.itens.map((item) => ({
              heading: `${item.horario} - ${item.refeicao}`,
              lines: [
                `Fonte proteica: ${item.fonteProteica}`,
                `Carboidrato: ${item.carboidrato}`,
                `Gordura boa: ${item.gorduraBoa}`,
              ],
            }))}
          />
        </div>
      ) : null}

      {state === "default" && !plan ? <EmptyState title="Paciente não encontrado" description="Nenhum plano vinculado no mock." /> : null}

      <div className="mt-4"><Link href="/patients" className="text-sm text-primary-700 hover:underline">← Voltar para pacientes</Link></div>
    </DashboardShell>
  );
}
