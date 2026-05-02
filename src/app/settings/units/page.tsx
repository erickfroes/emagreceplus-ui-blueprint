import { SettingsShell } from "@/components/layout/SettingsShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { PageHeader } from "@/components/ui/PageHeader";
import { settingsUnitsMock } from "@/data/mock/settings.mock";
import { resolveUiState } from "@/data/mock/ui-states";

export default async function SettingsUnitsPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const state = resolveUiState((await searchParams)?.state);
  return <SettingsShell active="Unidades"><PageHeader title="Unidades" description="Lista simulada de unidades, status operacional, profissionais e pacientes." />{state==="loading"&&<LoadingState title="Carregando unidades"/>}{state==="empty"&&<EmptyState title="Nenhuma unidade cadastrada" description="Cadastre unidades para escalar a operação." actionLabel="Adicionar unidade"/>}{state==="error"&&<ErrorState title="Falha ao carregar unidades"/>}{state==="forbidden"&&<ForbiddenState title="Acesso restrito às unidades"/>}{state==="default"&&<div className="grid gap-4 md:grid-cols-2">{settingsUnitsMock.map((u)=><Card key={u.id}><CardHeader><CardTitle>{u.name}</CardTitle></CardHeader><CardContent className="space-y-1 text-sm"><p><strong>Status:</strong> {u.status}</p><p><strong>Profissionais:</strong> {u.professionals}</p><p><strong>Pacientes:</strong> {u.patients}</p></CardContent></Card>)}</div>}</SettingsShell>;
}
