import { SettingsShell } from "@/components/layout/SettingsShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { resolveUiState } from "@/data/mock/ui-states";

export default async function SettingsIntegrationsPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const s = resolveUiState((await searchParams)?.state);
  return <SettingsShell active="Integrações"><PageHeader title="Integrações" description="Painel de integrações planejadas sem chamadas reais." />{s==="loading"&&<LoadingState title="Carregando integrações"/>}{s==="empty"&&<EmptyState title="Sem integrações listadas"/>}{s==="error"&&<ErrorState title="Falha ao carregar integrações"/>}{s==="forbidden"&&<ForbiddenState title="Acesso restrito às integrações"/>}{s==="default"&&<div className="grid gap-4 md:grid-cols-2"><Card><CardHeader><CardTitle>D4Sign</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Provider planejado para assinatura digital. Status atual: <strong>não configurado (simulado)</strong>.</CardContent></Card><Card><CardHeader><CardTitle>Asaas</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Integração planejada para cobrança SaaS. Status atual: <strong>não configurado (simulado)</strong>.</CardContent></Card></div>}</SettingsShell>;
}
