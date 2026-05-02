import { EncounterActionBar } from "@/components/clinical/EncounterActionBar";
import { EncounterContextPanel } from "@/components/clinical/EncounterContextPanel";
import { SoapEditor } from "@/components/clinical/SoapEditor";
import { DashboardShell } from "@/components/layout/DashboardShell";
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
      <div className="mb-6 rounded-2xl border border-border bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-950">Atendimento / SOAP</h1>
        <p className="mt-1 text-sm text-muted-foreground">Paciente: {soap?.patientName ?? "Não identificado"} • Registro clínico estruturado (simulado).</p>
      </div>

      {pageState === "loading" ? <p className="text-sm text-muted-foreground">Carregando atendimento...</p> : null}
      {pageState === "error" ? <p className="text-sm text-danger">Falha ao carregar dados do atendimento.</p> : null}
      {pageState === "forbidden" ? <p className="text-sm text-danger">Acesso negado ao atendimento.</p> : null}
      {pageState === "empty" || !hasData ? <EmptyState title="SOAP não encontrado" description="Não há conteúdo para este atendimento." /> : null}

      {pageState === "default" && soap ? (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <SoapEditor encounterId={encounterId} soap={soap} />
          <EncounterContextPanel alerts={soap.clinicalContext.alerts} metadata={soap.clinicalContext.metadata} />
        </div>
      ) : null}

      {pageState === "default" && soap ? <EncounterActionBar lastSavedAt={soap.lastEditedAt} professional={soap.professional} /> : null}
    </DashboardShell>
  );
}
