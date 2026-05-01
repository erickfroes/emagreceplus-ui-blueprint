import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { soapByEncounterId, type UIState } from "@/data/mock/encounters";

type Props = { params: Promise<{ encounterId: string }> };
const pageState: UIState = "default";

export default async function EncounterPage({ params }: Props) {
  const { encounterId } = await params;
  const soap = soapByEncounterId[encounterId];
  const hasData = Boolean(soap);

  return (
    <DashboardShell active="Atendimentos">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">Atendimento / SOAP</h1>
          <p className="mt-1 text-sm text-muted-foreground">Registro clínico estruturado em formato SOAP (simulado).</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Salvar e sair</Button>
          <Button>Concluir atendimento</Button>
        </div>
      </div>

      {pageState === "loading" ? <p className="text-sm text-muted-foreground">Carregando atendimento...</p> : null}
      {pageState === "error" ? <p className="text-sm text-danger">Falha ao carregar dados do atendimento.</p> : null}
      {pageState === "forbidden" ? <p className="text-sm text-danger">Acesso negado ao atendimento.</p> : null}
      {pageState === "empty" || !hasData ? <EmptyState title="SOAP não encontrado" description="Não há conteúdo para este atendimento." /> : null}

      {pageState === "default" && hasData ? (
        <div className="space-y-4">
          <Card><CardHeader><CardTitle>Subjective</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-700">{soap.subjective}</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Objective</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-700">{soap.objective}</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Assessment</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-700">{soap.assessment}</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Plan</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-700">{soap.plan}</p></CardContent></Card>
          <Link href={`/encounters/${encounterId}/anamnesis`} className="text-sm font-medium text-primary-700 hover:underline">Abrir anamnese em etapas</Link>
        </div>
      ) : null}
    </DashboardShell>
  );
}
