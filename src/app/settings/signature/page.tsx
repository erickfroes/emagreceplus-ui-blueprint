import { SettingsShell } from "@/components/layout/SettingsShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";

type UiState = "default" | "loading" | "empty" | "error" | "forbidden";
const uiState: UiState = "default";

function SignatureStateView() {
  if (uiState === "loading") return <LoadingState title="Carregando configurações D4Sign" />;
  if (uiState === "empty") return <EmptyState title="Sem configuração de assinatura" description="Defina o modo visual para iniciar a operação simulada." actionLabel="Configurar provider" />;
  if (uiState === "error") return <ErrorState title="Falha na leitura da configuração" description="Não foi possível carregar o estado simulado do provider." />;
  if (uiState === "forbidden") return <ForbiddenState title="Acesso restrito à assinatura digital" />;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-warning/30 bg-warning/5 px-4 py-3 text-sm font-medium text-warning-900">Modo real bloqueado até credenciais e validações oficiais serem concluídas.</div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[["Provider", "D4Sign"],["Modo", "Simulado (real bloqueado)"],["Ambiente", "Sandbox"],["Webhook URL", "https://emagreceplus.local/webhooks/d4sign (simulado)"],["Status credenciais", "Configurado · Pendente · Atualizar"]].map(([k,v]) => <Card key={k}><CardHeader><CardTitle>{k}</CardTitle></CardHeader><CardContent className="text-sm text-slate-700">{v}</CardContent></Card>)}
      </div>
      <Card>
        <CardHeader><CardTitle>Critérios para verificação real</CardTitle></CardHeader>
        <CardContent className="grid gap-2 text-sm text-slate-700 md:grid-cols-2">
          {[
            "HMAC válido",
            "status oficial confirmado",
            "externalDocumentId salvo",
            "payload hash salvo",
            "dossiê consolidado",
            "pacote de evidência regenerado"
          ].map((item) => <p key={item} className="rounded-lg border border-border px-3 py-2">{item}</p>)}
        </CardContent>
      </Card>
    </div>
  );
}

export default function SignatureSettingsPage() {
  return (
    <SettingsShell active="Assinatura Digital">
      <PageHeader title="Assinatura Digital" description="Configuração UI-only do provider D4Sign planejado, sem chamadas externas reais." actions={<><Button variant="outline">Testar webhook simulado</Button><Button variant="secondary">Validar configuração</Button><Button>Salvar</Button></>} />
      <SignatureStateView />
    </SettingsShell>
  );
}
