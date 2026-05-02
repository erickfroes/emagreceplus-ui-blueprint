import Link from "next/link";
import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import {
  documentCenterItems,
  evidenceDossierStateByDocumentId,
  evidencePackageByDocumentId,
  signersByDocumentId,
  timelineByDocumentId,
  trailEventsByDocumentId,
} from "@/data/mock/documents";

export default async function DocumentEvidencePage({ params }: { params: Promise<{ documentId: string }> }) {
  const { documentId } = await params;
  const document = documentCenterItems.find((item) => item.id === documentId);

  if (!document) notFound();

  const pageState = evidenceDossierStateByDocumentId[documentId] ?? "empty";
  const evidencePackage = evidencePackageByDocumentId[documentId];
  const signers = signersByDocumentId[documentId] ?? [];
  const timeline = timelineByDocumentId[documentId] ?? [];
  const trail = trailEventsByDocumentId[documentId] ?? [];

  const statusTone = {
    ausente: "warning",
    parcial: "warning",
    completa: "success",
    pendente_verificacao: "primary",
  } as const;

  return (
    <DashboardShell active="Dashboard">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">Dossiê de Evidência</h1>
          <p className="mt-1 text-sm text-muted-foreground">Documento: {document.title}</p>
          <p className="text-sm text-muted-foreground">Paciente: {document.patientName}</p>
        </div>
        <Badge tone={statusTone[evidencePackage?.dossierStatus ?? "ausente"]}>{evidencePackage?.dossierStatusLabel ?? "Ausente"}</Badge>
      </div>

      <div className="mt-6">
        {pageState === "loading" ? <LoadingState title="Carregando dossiê" description="Consolidando hashes, eventos e trilha de auditoria simulada." /> : null}
        {pageState === "empty" ? <EmptyState title="Pacote de evidência ausente" description="Este documento ainda não possui pacote JSON de evidência consolidado." /> : null}
        {pageState === "error" ? <ErrorState title="Falha ao montar dossiê" description="Não foi possível consolidar o pacote de evidência simulado." /> : null}
        {pageState === "forbidden" ? <ForbiddenState title="Acesso restrito ao dossiê" description="Seu perfil não possui acesso ao conteúdo de trilha de auditoria deste documento." /> : null}
      </div>

      {pageState === "default" && evidencePackage ? (
        <div className="mt-6 space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card><CardHeader><CardTitle>Hash do artefato</CardTitle></CardHeader><CardContent className="font-mono text-xs">{evidencePackage.integrity.artifactSha256}</CardContent></Card>
            <Card><CardHeader><CardTitle>Hash do pacote de evidência</CardTitle></CardHeader><CardContent className="font-mono text-xs">{evidencePackage.integrity.packageSha256}</CardContent></Card>
            <Card><CardHeader><CardTitle>Provedor</CardTitle></CardHeader><CardContent className="text-sm">D4Sign</CardContent></Card>
            <Card><CardHeader><CardTitle>Modo</CardTitle></CardHeader><CardContent className="text-sm">{evidencePackage.modeLabel}</CardContent></Card>
            <Card><CardHeader><CardTitle>External document id</CardTitle></CardHeader><CardContent className="font-mono text-xs">{evidencePackage.externalDocumentId}</CardContent></Card>
            <Card><CardHeader><CardTitle>Status de verificação</CardTitle></CardHeader><CardContent className="text-sm">{evidencePackage.verificationStatusLabel}</CardContent></Card>
            <Card className="lg:col-span-3"><CardHeader><CardTitle>Método de verificação</CardTitle></CardHeader><CardContent className="text-sm">{evidencePackage.verificationMethod}</CardContent></Card>
          </div>

          <Card>
            <CardHeader><CardTitle>Signatários</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              {signers.map((signer) => (
                <div key={signer.email} className="rounded-2xl border border-border p-3">
                  <p className="font-medium text-slate-900">{signer.name}</p>
                  <p className="text-xs text-muted-foreground">{signer.role} • {signer.statusLabel} • {signer.timestamp}</p>
                  <p className="text-xs text-muted-foreground">Método: {signer.method}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Timeline</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              {timeline.map((step) => (
                <div key={step.step} className="rounded-2xl border border-border p-3">
                  <p className="font-medium text-slate-900">{step.step}</p>
                  <p className="text-xs text-muted-foreground">{step.occurredAt} • {step.status}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Trilha de auditoria recente</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              {trail.map((event) => (
                <div key={event.id} className="rounded-2xl border border-border p-3">
                  <p className="font-medium text-slate-900">{event.action.replace("_", " ")}</p>
                  <p className="text-xs text-muted-foreground">{event.actor} • {event.occurredAt}</p>
                  <p className="text-xs text-muted-foreground">correlation id: <span className="font-mono">{event.correlationId}</span></p>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline">Baixar pacote JSON de evidência</Button>
            <Button variant="outline">Copiar hash</Button>
            <Link href={`/documents/${document.id}`}><Button variant="secondary">Ver documento</Button></Link>
            <Link href="/documents"><Button variant="ghost">Voltar ao detalhe</Button></Link>
          </div>
        </div>
      ) : null}
    </DashboardShell>
  );
}
