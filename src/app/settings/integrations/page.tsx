import { SettingsShell } from "@/components/layout/SettingsShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { settingsIntegrationsMock } from "@/data/mock/settings.mock";
import { resolveUiState } from "@/data/mock/ui-states";

export default async function SettingsIntegrationsPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const s = resolveUiState((await searchParams)?.state);
  return <SettingsShell active="Integrações"><PageHeader title="Integrações" description="Integrações planejadas/simuladas sem chamadas externas reais." />{s==="loading"&&<LoadingState title="Carregando integrações"/>}{s==="empty"&&<EmptyState title="Sem integrações listadas"/>}{s==="error"&&<ErrorState title="Falha ao carregar integrações"/>}{s==="forbidden"&&<ForbiddenState title="Acesso restrito às integrações"/>}{s==="default"&&<div className="grid gap-4 md:grid-cols-3">{settingsIntegrationsMock.map((i)=><Card key={i.provider}><CardHeader className="flex-row items-center justify-between"><CardTitle>{i.provider}</CardTitle><Badge tone="info">UI-only</Badge></CardHeader><CardContent className="space-y-2 text-sm text-muted-foreground"><p>{i.purpose}</p><p>Status: <strong>{i.status}</strong></p></CardContent></Card>)}</div>}</SettingsShell>;
}
