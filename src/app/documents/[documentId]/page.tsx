import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { documentCenterItems, type DocumentsUiState } from "@/data/mock/documents";

const pageState: DocumentsUiState = "default";

export default async function DocumentDetailPage({ params }: { params: Promise<{ documentId: string }> }) {
  const { documentId } = await params;
  const document = documentCenterItems.find((item) => item.id === documentId);

  return (
    <DashboardShell active="Dashboard">
      <h1 className="text-2xl font-semibold text-slate-950">Detalhe do Documento</h1>
      <p className="mt-1 text-sm text-muted-foreground">Envelope documental e governança de assinatura com D4Sign.</p>

      {pageState === "loading" ? <p className="mt-6 text-sm text-muted-foreground">Carregando documento...</p> : null}
      {pageState === "empty" ? <p className="mt-6 text-sm text-muted-foreground">Documento não encontrado.</p> : null}
      {pageState === "error" ? <p className="mt-6 text-sm text-danger">Erro ao obter detalhe documental.</p> : null}
      {pageState === "forbidden" ? <p className="mt-6 text-sm text-danger">Acesso negado ao documento.</p> : null}

      {pageState === "default" && document ? (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{document.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p><span className="text-muted-foreground">Paciente:</span> {document.patientName}</p>
            <p><span className="text-muted-foreground">Criado em:</span> {document.createdAt}</p>
            <p><span className="text-muted-foreground">Assinantes:</span> {document.signerCount}</p>
            <p><span className="text-muted-foreground">Provider:</span> D4Sign ({document.providerMode})</p>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Status:</span>
              <Badge tone={document.status === "assinado" ? "success" : "warning"}>{document.status.replace("_", " ")}</Badge>
            </div>
            <p className="rounded-2xl bg-emerald-50 p-3 text-emerald-900">
              Este documento está em ambiente {document.providerMode} e não representa verificação real sem chaves válidas do provider.
            </p>
            <Link href={`/documents/${document.id}/evidence`} className="font-medium text-primary hover:underline">
              Abrir Dossiê de Evidência
            </Link>
          </CardContent>
        </Card>
      ) : null}
    </DashboardShell>
  );
}
