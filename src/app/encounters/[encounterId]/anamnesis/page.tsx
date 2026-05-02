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
      <p className="mb-6 mt-1 text-sm text-muted-foreground">Fluxo visual com stepper, sinais de atenção e resumo em tempo real (simulado).</p>

      {pageState === "loading" ? <p className="text-sm text-muted-foreground">Carregando anamnese...</p> : null}
      {pageState === "error" ? <p className="text-sm text-danger">Erro ao carregar anamnese.</p> : null}
      {pageState === "forbidden" ? <p className="text-sm text-danger">Acesso negado à anamnese.</p> : null}
      {pageState === "empty" || steps.length === 0 ? <EmptyState title="Anamnese indisponível" description="Nenhuma etapa configurada para este atendimento." /> : null}

      {pageState === "default" && activeStep ? (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Etapa {stepIndex + 1} de {steps.length}: {activeStep.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{activeStep.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="grid gap-2 sm:grid-cols-2">
                {steps.map((step, index) => (
                  <li key={step.id} className={`rounded-xl border px-3 py-2 text-xs ${index === stepIndex ? "border-primary-300 bg-primary-50 text-primary-700" : "border-border text-slate-600"}`}>
                    {index + 1}. {step.title}
                  </li>
                ))}
              </ol>

              {activeStep.fields.map((field) => (
                <div key={field.label} className="rounded-xl border border-border p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{field.label}</p>
                  <p className="mt-1 text-sm text-slate-700">{field.value}</p>
                </div>
              ))}

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                <p className="font-medium">Sinais de atenção</p>
                <ul className="mt-1 list-disc pl-5">
                  <li>Investigar rotina de fim de semana e impacto metabólico percebido.</li>
                  <li>Registrar histórico familiar e monitorar risco cardiometabólico.</li>
                  <li>Siglas: <span title="Síndrome dos Ovários Policísticos">SOP</span> deve ser contextualizada no prontuário quando aplicável.</li>
                </ul>
              </div>

              <div className="flex flex-wrap justify-between gap-2 pt-2">
                <Button variant="outline" disabled>Voltar</Button>
                <div className="flex gap-2">
                  <Button variant="outline">Gerar resumo clínico</Button>
                  <Button>Próxima seção</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="h-fit rounded-2xl shadow-sm">
            <CardHeader><CardTitle>Resumo em tempo real</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <p>Consulta em progresso com foco em adesão alimentar sustentável, sem promessa de resultado garantido.</p>
              <p>Etapa atual: <strong>{activeStep.title}</strong>.</p>
              <p>Profissional responsável: <strong>Dra. Mariana Costa</strong>.</p>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </DashboardShell>
  );
}
