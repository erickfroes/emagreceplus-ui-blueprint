import { SettingsShell } from "@/components/layout/SettingsShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { settingsIntegrationsMock } from "@/data/mock/settings.mock";
import { resolveUiState } from "@/data/mock/ui-states";

export default async function SettingsIntegrationsPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const s = resolveUiState((await searchParams)?.state);
  return <SettingsShell active="Integrações"><PageHeader title="Integrações" description="D4Sign e Asaas planejados com status simulado, sem chamadas reais." />{s==="loading"&&<LoadingState title="Carregando integrações"/>}{s==="empty"&&<EmptyState title="Sem integrações listadas"/>}{s==="error"&&<ErrorState title="Falha ao carregar integrações"/>}{s==="forbidden"&&<ForbiddenState title="Acesso restrito às integrações"/>}{s==="default"&&<div className="grid gap-4 md:grid-cols-2">{settingsIntegrationsMock.map((i)=><Card key={i.provider}><CardHeader><CardTitle>{i.provider}</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">{i.purpose}. Status atual: <strong>{i.status}</strong>.</CardContent></Card>)}</div>}</SettingsShell>;
}
