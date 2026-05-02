import { SettingsShell } from "@/components/layout/SettingsShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { resolveUiState } from "@/data/mock/ui-states";
import { d4SignSettingsMock } from "@/data/mock/integrations.mock";

export default async function SignatureSettingsPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const uiState = resolveUiState((await searchParams)?.state);
  const state = uiState === "coming-soon" ? "default" : uiState;

  return (
    <SettingsShell active="Assinatura Digital">
      <PageHeader title="Assinatura Digital" description="Configuração UI-only do provider D4Sign planejado, sem chamadas externas reais." actions={<><Button variant="outline">Testar webhook simulado</Button><Button variant="secondary">Validar configuração</Button><Button>Salvar</Button></>} />

      {state === "loading" && <LoadingState title="Carregando configurações D4Sign" />}
      {state === "empty" && <EmptyState title="Sem configuração de assinatura" description="Defina o modo visual para iniciar a operação simulada." actionLabel="Configurar provider" />}
      {state === "error" && <ErrorState title="Falha na leitura da configuração" description="Não foi possível carregar o estado simulado do provider." />}
      {state === "forbidden" && <ForbiddenState title="Acesso restrito à assinatura digital" />}

      {state === "default" ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-warning/30 bg-warning/5 px-4 py-3 text-sm font-medium text-warning-900">Credenciais pendentes — documentos não serão enviados para assinatura real.</div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Card><CardHeader><CardTitle>Provider</CardTitle></CardHeader><CardContent className="text-sm text-slate-700">{d4SignSettingsMock.provider}</CardContent></Card>
            <Card><CardHeader><CardTitle>Modo</CardTitle></CardHeader><CardContent className="text-sm text-slate-700">Não configurado / Simulado / Real bloqueado</CardContent></Card>
            <Card><CardHeader><CardTitle>Status atual</CardTitle></CardHeader><CardContent className="text-sm text-slate-700">{d4SignSettingsMock.mode}</CardContent></Card>
          </div>

          <Card>
            <CardHeader><CardTitle>Checklist de configuração</CardTitle></CardHeader>
            <CardContent className="grid gap-2 text-sm text-slate-700 md:grid-cols-2">
              {d4SignSettingsMock.credentials.map((credential) => (
                <p key={credential.field} className="rounded-lg border border-border px-3 py-2">{credential.label}: <strong>{credential.status}</strong></p>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Critérios para verificação real</CardTitle></CardHeader>
            <CardContent className="grid gap-2 text-sm text-slate-700 md:grid-cols-2">
              {d4SignSettingsMock.verificationCriteria.map((item) => <p key={item} className="rounded-lg border border-border px-3 py-2">{item}</p>)}
            </CardContent>
          </Card>
        </div>
      ) : null}
    </SettingsShell>
  );
}
