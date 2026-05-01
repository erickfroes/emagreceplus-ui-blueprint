import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { documentOpsHealth, type DocumentsUiState } from "@/data/mock/documents";

const pageState: DocumentsUiState = "default";

export default function DocumentOpsHealthPage() {
  return (
    <DashboardShell active="Dashboard">
      <h1 className="text-2xl font-semibold text-slate-950">Saúde Operacional Documental</h1>
      <p className="mt-1 text-sm text-muted-foreground">Monitoramento de filas, sincronização e webhooks do provider D4Sign.</p>

      {pageState === "loading" ? <p className="mt-6 text-sm text-muted-foreground">Carregando saúde operacional...</p> : null}
      {pageState === "empty" ? <p className="mt-6 text-sm text-muted-foreground">Sem dados operacionais disponíveis.</p> : null}
      {pageState === "error" ? <p className="mt-6 text-sm text-danger">Erro ao consultar saúde operacional.</p> : null}
      {pageState === "forbidden" ? <p className="mt-6 text-sm text-danger">Acesso negado ao monitoramento operacional.</p> : null}

      {pageState === "default" ? (
        <Card className="mt-6">
          <CardHeader><CardTitle>Painel do provider documental</CardTitle></CardHeader>
          <CardContent className="grid gap-4 text-sm md:grid-cols-2">
            <p><span className="text-muted-foreground">Provider:</span> D4Sign</p>
            <p><span className="text-muted-foreground">Modo:</span> {documentOpsHealth.mode}</p>
            <p><span className="text-muted-foreground">Última sincronização:</span> {documentOpsHealth.lastSyncAt}</p>
            <p><span className="text-muted-foreground">Fila pendente:</span> {documentOpsHealth.pendingQueue}</p>
            <p><span className="text-muted-foreground">Falhas (24h):</span> {documentOpsHealth.failedLast24h}</p>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Status:</span>
              <Badge tone={documentOpsHealth.status === "saudavel" ? "success" : "warning"}>{documentOpsHealth.status}</Badge>
            </div>
            <p><span className="text-muted-foreground">Webhook:</span> {documentOpsHealth.webhookStatus}</p>
          </CardContent>
        </Card>
      ) : null}
    </DashboardShell>
  );
}
