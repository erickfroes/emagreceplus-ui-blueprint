import { SettingsShell } from "@/components/layout/SettingsShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { PageHeader } from "@/components/ui/PageHeader";
import { settingsTeamInvitesMock, settingsTeamMembersMock } from "@/data/mock/settings.mock";
import { resolveUiState } from "@/data/mock/ui-states";

export default async function SettingsTeamPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) { const s=resolveUiState((await searchParams)?.state); return <SettingsShell active="Equipe"><PageHeader title="Equipe" description="Usuários, convites e papéis com dados simulados." />{s==="loading"&&<LoadingState title="Carregando equipe"/>}{s==="empty"&&<EmptyState title="Sem membros na equipe" actionLabel="Convidar membro"/>}{s==="error"&&<ErrorState title="Falha ao carregar equipe"/>}{s==="forbidden"&&<ForbiddenState title="Acesso restrito à equipe"/>}{s==="default"&&<div className="grid gap-4 lg:grid-cols-2"><Card><CardHeader><CardTitle>Usuários</CardTitle></CardHeader><CardContent className="space-y-2 text-sm">{settingsTeamMembersMock.map((m)=><p key={m.id}>{m.name} • {m.role} • <strong>{m.status}</strong></p>)}</CardContent></Card><Card><CardHeader><CardTitle>Convites</CardTitle></CardHeader><CardContent className="space-y-2 text-sm">{settingsTeamInvitesMock.map((i)=><p key={i.email}>{i.email} • {i.role} • <strong>{i.status}</strong></p>)}</CardContent></Card></div>}</SettingsShell>; }
