import { SettingsShell } from "@/components/layout/SettingsShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { d4signConfigMock, type DocumentsUiState } from "@/data/mock/documents";

const pageState: DocumentsUiState = "default";

export default function SignatureSettingsPage() {
  return (
    <SettingsShell active="Integrações">
      <h1 className="text-2xl font-semibold text-slate-950">Configuração D4Sign</h1>
      <p className="mt-1 text-sm text-muted-foreground">Configuração do provider de assinatura em modo não configurado, simulado ou real.</p>

      {pageState === "loading" ? <p className="mt-6 text-sm text-muted-foreground">Carregando configuração...</p> : null}
      {pageState === "empty" ? <p className="mt-6 text-sm text-muted-foreground">Nenhuma configuração encontrada.</p> : null}
      {pageState === "error" ? <p className="mt-6 text-sm text-danger">Erro ao carregar configuração D4Sign.</p> : null}
      {pageState === "forbidden" ? <p className="mt-6 text-sm text-danger">Acesso negado à configuração de assinatura.</p> : null}

      {pageState === "default" ? (
        <Card className="mt-6">
          <CardHeader><CardTitle>Provider documental principal</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Provider:</span>
              <Badge tone="info">D4Sign</Badge>
            </div>
            <p><span className="text-muted-foreground">Modo:</span> {d4signConfigMock.mode}</p>
            <p><span className="text-muted-foreground">Ambiente:</span> {d4signConfigMock.environment}</p>
            <p><span className="text-muted-foreground">Status:</span> {d4signConfigMock.integrationStatus}</p>
            <p><span className="text-muted-foreground">Token API:</span> {d4signConfigMock.apiToken}</p>
            <p><span className="text-muted-foreground">Crypt Key:</span> {d4signConfigMock.cryptKey}</p>
            <p><span className="text-muted-foreground">Safe UUID:</span> {d4signConfigMock.safeUuid}</p>
            <p><span className="text-muted-foreground">Webhook Secret:</span> {d4signConfigMock.webhookSecret}</p>
            <p className="rounded-2xl bg-amber-50 p-3 text-xs text-amber-900">
              Em modo real, a validação de assinatura só pode ser considerada verificada após configuração completa das chaves e webhooks.
            </p>
          </CardContent>
        </Card>
      ) : null}
    </SettingsShell>
  );
}
