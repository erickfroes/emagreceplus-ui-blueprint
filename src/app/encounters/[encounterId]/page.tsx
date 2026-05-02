import { EncounterActionBar } from "@/components/clinical/EncounterActionBar";
import { ClinicalContextPanel } from "@/components/clinical/ClinicalContextPanel";
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
          <ClinicalContextPanel alerts={soap.clinicalContext.alerts} metadata={soap.clinicalContext.metadata} evolutionNotes={["Último retorno com melhor adesão alimentar.", "Sono em monitoramento por oscilação semanal."]} pendingDocuments={["Assinatura do termo de acompanhamento nutricional (simulado).", "Checklist de diário alimentar da semana atual."]} />
        </div>
      ) : null}

      {pageState === "default" && soap ? <EncounterActionBar lastSavedAt={soap.lastEditedAt} professional={soap.professional} /> : null}
    </DashboardShell>
  );
}
