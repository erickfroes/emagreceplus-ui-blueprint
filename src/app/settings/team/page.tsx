import { SettingsShell } from "@/components/layout/SettingsShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { PageHeader } from "@/components/ui/PageHeader";
import { resolveUiState } from "@/data/mock/ui-states";

export default async function SettingsTeamPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) { const s=resolveUiState((await searchParams)?.state); return <SettingsShell active="Equipe"><PageHeader title="Equipe" description="Membros e papéis clínicos em modo UI-only." />{s==="loading"&&<LoadingState title="Carregando equipe"/>}{s==="empty"&&<EmptyState title="Sem membros na equipe" actionLabel="Convidar membro"/>}{s==="error"&&<ErrorState title="Falha ao carregar equipe"/>}{s==="forbidden"&&<ForbiddenState title="Acesso restrito à equipe"/>}{s==="default"&&<Card><CardHeader><CardTitle>Equipe (simulado)</CardTitle></CardHeader><CardContent className="text-sm">3 nutricionistas • 1 recepção • 1 coordenação</CardContent></Card>}</SettingsShell>; }
