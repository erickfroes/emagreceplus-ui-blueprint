import { SettingsShell } from "@/components/layout/SettingsShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { PageHeader } from "@/components/ui/PageHeader";
import { settingsPermissionsMock } from "@/data/mock/settings.mock";
import { resolveUiState } from "@/data/mock/ui-states";

const accessBadge = (allowed: boolean) => <Badge tone={allowed ? "success" : "neutral"}>{allowed ? "Acesso" : "Sem acesso"}</Badge>;

export default async function SettingsPermissionsPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) { const s=resolveUiState((await searchParams)?.state); return <SettingsShell active="Permissões"><PageHeader title="Permissões" description="Matriz visual de permissões por papel com badges de acesso." />{s==="loading"&&<LoadingState title="Carregando permissões"/>}{s==="empty"&&<EmptyState title="Sem regras aplicadas" actionLabel="Aplicar política"/>}{s==="error"&&<ErrorState title="Falha ao carregar permissões"/>}{s==="forbidden"&&<ForbiddenState title="Acesso restrito às permissões"/>}{s==="default"&&<Card><CardHeader><CardTitle>Matriz de acesso</CardTitle></CardHeader><CardContent className="space-y-3 text-sm">{settingsPermissionsMock.map((p)=><div key={p.permission} className="grid items-center gap-2 rounded-2xl border border-border p-3 md:grid-cols-[1.2fr_1fr_1fr_1fr]"><p className="font-medium">{p.permission}</p>{accessBadge(p.admin)}{accessBadge(p.nutricionista)}{accessBadge(p.recepcao)}</div>)}<div className="grid gap-2 text-xs text-muted-foreground md:grid-cols-[1.2fr_1fr_1fr_1fr]"><span /> <span>Admin</span><span>Nutricionista</span><span>Recepção</span></div></CardContent></Card>}</SettingsShell>; }
