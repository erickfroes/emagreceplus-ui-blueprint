import { SettingsShell } from "@/components/layout/SettingsShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { resolveUiState } from "@/data/mock/ui-states";

export default async function SettingsAuditLogsPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const s = resolveUiState((await searchParams)?.state);
  return <SettingsShell active="Logs de auditoria"><PageHeader title="Logs de auditoria" description="Rastreamento simulado de atividades administrativas." />{s==="loading"&&<LoadingState title="Carregando logs"/>}{s==="empty"&&<EmptyState title="Nenhum evento encontrado"/>}{s==="error"&&<ErrorState title="Falha ao carregar logs"/>}{s==="forbidden"&&<ForbiddenState title="Acesso restrito aos logs"/>}{s==="default"&&<Card><CardHeader><CardTitle>Últimos eventos (simulado)</CardTitle></CardHeader><CardContent className="text-sm">02/05/2026 09:13 • atualização de timezone • admin@emagreceplus.app</CardContent></Card>}</SettingsShell>;
}
