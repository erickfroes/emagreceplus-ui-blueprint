import { SettingsShell } from "@/components/layout/SettingsShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { PageHeader } from "@/components/ui/PageHeader";
import { resolveUiState } from "@/data/mock/ui-states";

export default async function SettingsPermissionsPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) { const s=resolveUiState((await searchParams)?.state); return <SettingsShell active="Permissões"><PageHeader title="Permissões" description="Matriz de acesso por função em estado simulado." />{s==="loading"&&<LoadingState title="Carregando permissões"/>}{s==="empty"&&<EmptyState title="Sem regras aplicadas" actionLabel="Aplicar política"/>}{s==="error"&&<ErrorState title="Falha ao carregar permissões"/>}{s==="forbidden"&&<ForbiddenState title="Acesso restrito às permissões"/>}{s==="default"&&<Card><CardHeader><CardTitle>Matriz (simulada)</CardTitle></CardHeader><CardContent className="text-sm">Admin: total • Nutricionista: pacientes e planos • Recepção: agenda e check-in</CardContent></Card>}</SettingsShell>; }
