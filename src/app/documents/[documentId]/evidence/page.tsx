import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { evidenceEventsByDocumentId, evidencePackageByDocumentId, type DocumentsUiState } from "@/data/mock/documents";

const pageState: DocumentsUiState = "default";

export default async function DocumentEvidencePage({ params }: { params: Promise<{ documentId: string }> }) {
  const { documentId } = await params;
  const events = evidenceEventsByDocumentId[documentId] ?? [];
  const evidencePackage = evidencePackageByDocumentId[documentId];

  return (
    <DashboardShell active="Dashboard">
      <h1 className="text-2xl font-semibold text-slate-950">Dossiê de Evidência</h1>
      <p className="mt-1 text-sm text-muted-foreground">Pacote JSON de trilha de auditoria para governança documental.</p>

      {pageState === "loading" ? <p className="mt-6 text-sm text-muted-foreground">Gerando pacote de evidência...</p> : null}
      {pageState === "empty" ? <p className="mt-6 text-sm text-muted-foreground">Sem evidências para este documento.</p> : null}
      {pageState === "error" ? <p className="mt-6 text-sm text-danger">Não foi possível gerar o dossiê.</p> : null}
      {pageState === "forbidden" ? <p className="mt-6 text-sm text-danger">Acesso negado às evidências.</p> : null}

      {pageState === "default" && evidencePackage ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Pacote de evidência</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><span className="text-muted-foreground">ID:</span> {evidencePackage.packageId}</p>
              <p><span className="text-muted-foreground">Gerado em:</span> {evidencePackage.generatedAt}</p>
              <p><span className="text-muted-foreground">Provider:</span> D4Sign ({evidencePackage.providerMode})</p>
              <p><span className="text-muted-foreground">Armazenamento:</span> {evidencePackage.storageVisibility}</p>
              <p><span className="text-muted-foreground">Manifest SHA256:</span> {evidencePackage.integrity.manifestSha256}</p>
              <p className="rounded-2xl bg-slate-100 p-3 text-xs text-slate-700">
                O pacote JSON expõe apenas metadados seguros. Caminhos internos de storage privado não são exibidos nesta UI.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Eventos de auditoria ({events.length})</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              {events.map((event) => (
                <div key={event.id} className="rounded-2xl border border-border p-3">
                  <p className="font-medium text-slate-900">{event.action}</p>
                  <p className="text-xs text-muted-foreground">{event.occurredAt} • {event.actor} • canal {event.channel}</p>
                  <p className="text-xs text-slate-600">hash: {event.signatureHash}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ) : null}
    </DashboardShell>
  );
}
