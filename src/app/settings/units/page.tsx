import { SettingsShell } from "@/components/layout/SettingsShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { PageHeader } from "@/components/ui/PageHeader";
import { resolveUiState } from "@/data/mock/ui-states";

export default async function SettingsUnitsPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const params = await searchParams;
  const state = resolveUiState(params?.state);
  return <SettingsShell active="Unidades"><PageHeader title="Unidades" description="Cadastro mockado de unidades e cobertura operacional." />{state==="loading"&&<LoadingState title="Carregando unidades"/>}{state==="empty"&&<EmptyState title="Nenhuma unidade cadastrada" description="Crie a primeira unidade clínica." actionLabel="Adicionar unidade"/>}{state==="error"&&<ErrorState title="Falha ao carregar unidades"/>}{state==="forbidden"&&<ForbiddenState title="Acesso restrito às unidades"/>}{state==="default"&&<Card><CardHeader><CardTitle>Unidades (simulado)</CardTitle></CardHeader><CardContent className="text-sm">Matriz • São Paulo (ativa) | Filial • Campinas (planejada)</CardContent></Card>}</SettingsShell>;
}
