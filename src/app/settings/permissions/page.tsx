import { SettingsShell } from "@/components/layout/SettingsShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { PageHeader } from "@/components/ui/PageHeader";
import { settingsPermissionsMock } from "@/data/mock/settings.mock";
import { resolveUiState } from "@/data/mock/ui-states";

export default async function SettingsPermissionsPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) { const s=resolveUiState((await searchParams)?.state); return <SettingsShell active="Permissões"><PageHeader title="Permissões" description="Matriz simulada de papéis e permissões." />{s==="loading"&&<LoadingState title="Carregando permissões"/>}{s==="empty"&&<EmptyState title="Sem regras aplicadas" actionLabel="Aplicar política"/>}{s==="error"&&<ErrorState title="Falha ao carregar permissões"/>}{s==="forbidden"&&<ForbiddenState title="Acesso restrito às permissões"/>}{s==="default"&&<Card><CardHeader><CardTitle>Matriz de acesso</CardTitle></CardHeader><CardContent className="space-y-2 text-sm">{settingsPermissionsMock.map((p)=><p key={p.permission}>{p.permission} • Admin {p.admin?"✅":"—"} • Nutri {p.nutricionista?"✅":"—"} • Recepção {p.recepcao?"✅":"—"}</p>)}</CardContent></Card>}</SettingsShell>; }
