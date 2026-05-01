import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { anamnesisStepsByEncounterId, type UIState } from "@/data/mock/encounters";

type Props = { params: Promise<{ encounterId: string }> };
const pageState: UIState = "default";

export default async function AnamnesisPage({ params }: Props) {
  const { encounterId } = await params;
  const steps = anamnesisStepsByEncounterId[encounterId] ?? [];
  const stepIndex = 0;
  const activeStep = steps[stepIndex];

  return (
    <DashboardShell active="Atendimentos">
      <h1 className="text-2xl font-semibold text-slate-950">Anamnese em etapas</h1>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">Preenchimento progressivo para reduzir erro e manter contexto clínico.</p>

      {pageState === "loading" ? <p className="text-sm text-muted-foreground">Carregando anamnese...</p> : null}
      {pageState === "error" ? <p className="text-sm text-danger">Erro ao carregar anamnese.</p> : null}
      {pageState === "forbidden" ? <p className="text-sm text-danger">Acesso negado à anamnese.</p> : null}
      {pageState === "empty" || steps.length === 0 ? <EmptyState title="Anamnese indisponível" description="Nenhuma etapa configurada para este atendimento." /> : null}

      {pageState === "default" && activeStep ? (
        <Card>
          <CardHeader>
            <CardTitle>Etapa {stepIndex + 1} de {steps.length}: {activeStep.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{activeStep.description}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {steps.map((step, index) => (
                <span key={step.id} className="rounded-full border border-border px-3 py-1 text-xs text-slate-600">{index + 1}. {step.title}</span>
              ))}
            </div>
            {activeStep.fields.map((field) => (
              <div key={field.label} className="rounded-xl border border-border p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{field.label}</p>
                <p className="mt-1 text-sm text-slate-700">{field.value}</p>
              </div>
            ))}
            <div className="flex justify-between pt-2">
              <Button variant="outline" disabled>Etapa anterior</Button>
              <Button>Próxima etapa</Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </DashboardShell>
  );
}
