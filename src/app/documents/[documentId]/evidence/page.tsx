import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  documentCenterItems,
  evidenceDossierStateByDocumentId,
  evidenceEventsByDocumentId,
  evidencePackageByDocumentId,
  providerEventsByDocumentId,
  signersByDocumentId,
  timelineByDocumentId,
  type DocumentsUiState,
} from "@/data/mock/documents";

const stateLabel: Record<DocumentsUiState, string> = {
  default: "evidência completa simulada",
  loading: "carregando",
  empty: "sem evidência",
  error: "erro",
  forbidden: "sem permissão",
};

export default async function DocumentEvidencePage({ params }: { params: Promise<{ documentId: string }> }) {
  const { documentId } = await params;
  const document = documentCenterItems.find((item) => item.id === documentId);

  if (!document) {
    notFound();
  }

  const pageState = evidenceDossierStateByDocumentId[documentId] ?? "empty";
  const events = evidenceEventsByDocumentId[documentId] ?? [];
  const timeline = timelineByDocumentId[documentId] ?? [];
  const providerEvents = providerEventsByDocumentId[documentId] ?? [];
  const signers = signersByDocumentId[documentId] ?? [];
  const evidencePackage = evidencePackageByDocumentId[documentId];

  return (
    <DashboardShell active="Dashboard">
      <h1 className="text-2xl font-semibold text-slate-950">Dossiê de Evidência</h1>
      <p className="mt-1 text-sm text-muted-foreground">Pacote JSON de evidência com trilha de auditoria, hash e eventos simulados.</p>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Estado:</span>
        <Badge tone={pageState === "default" ? "success" : pageState === "error" || pageState === "forbidden" ? "danger" : "warning"}>{stateLabel[pageState]}</Badge>
      </div>

      {pageState === "loading" ? <p className="mt-6 text-sm text-muted-foreground">Gerando pacote de evidência...</p> : null}
      {pageState === "empty" ? <p className="mt-6 text-sm text-muted-foreground">Este documento ainda está sem evidência consolidada.</p> : null}
      {pageState === "error" ? <p className="mt-6 text-sm text-danger">Falha ao consolidar o pacote de evidência simulado.</p> : null}
      {pageState === "forbidden" ? <p className="mt-6 text-sm text-danger">Sem permissão para visualizar trilha de auditoria deste documento.</p> : null}

      {evidencePackage && pageState !== "forbidden" ? (
        <div className="mt-6 space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card><CardHeader><CardTitle>Status da evidência</CardTitle></CardHeader><CardContent className="text-sm">{evidencePackage.statusLabel}</CardContent></Card>
            <Card><CardHeader><CardTitle>Hash do artefato</CardTitle></CardHeader><CardContent className="font-mono text-xs">{evidencePackage.integrity.artifactSha256}</CardContent></Card>
            <Card><CardHeader><CardTitle>Hash do pacote</CardTitle></CardHeader><CardContent className="font-mono text-xs">{evidencePackage.integrity.packageSha256}</CardContent></Card>
            <Card><CardHeader><CardTitle>Provedor</CardTitle></CardHeader><CardContent className="text-sm">D4Sign (planejado)</CardContent></Card>
            <Card><CardHeader><CardTitle>Modo</CardTitle></CardHeader><CardContent className="text-sm">{evidencePackage.providerMode}</CardContent></Card>
            <Card><CardHeader><CardTitle>External Document ID</CardTitle></CardHeader><CardContent className="font-mono text-xs">{evidencePackage.externalDocumentId}</CardContent></Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Signatários</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                {signers.length === 0 ? <p className="text-muted-foreground">Sem signatários vinculados.</p> : signers.map((signer) => (
                  <div key={signer.email} className="rounded-2xl border border-border p-3">
                    <p className="font-medium text-slate-900">{signer.name}</p>
                    <p className="text-xs text-muted-foreground">{signer.role} • {signer.email}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Eventos do provedor</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                {providerEvents.length === 0 ? <p className="text-muted-foreground">Sem eventos do provedor para este estado.</p> : providerEvents.map((event) => (
                  <div key={event.id} className="rounded-2xl border border-border p-3">
                    <p className="font-medium text-slate-900">{event.action}</p>
                    <p className="text-xs text-muted-foreground">{event.occurredAt} • {event.source}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle>Auditoria recente</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              {events.map((event) => (
                <div key={event.id} className="rounded-2xl border border-border p-3">
                  <p className="font-medium text-slate-900">{event.action}</p>
                  <p className="text-xs text-muted-foreground">{event.occurredAt} • {event.actor} • canal {event.channel}</p>
                  <p className="font-mono text-xs text-slate-600">hash: {event.signatureHash}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Timeline do dossiê</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              {timeline.map((step) => (
                <div key={step.step} className="rounded-2xl border border-border p-3">
                  <p className="font-medium text-slate-900">{step.step}</p>
                  <p className="text-xs text-muted-foreground">{step.occurredAt} • {step.status}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <p className="rounded-2xl bg-slate-100 p-3 text-xs text-slate-700">
            Pacote de evidência em modo UI-only: dados simulados, sem verificação real de assinatura e sem exposição de storageObjectPath.
          </p>
        </div>
      ) : null}
    </DashboardShell>
  );
}
