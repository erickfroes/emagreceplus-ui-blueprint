import { SettingsShell } from "@/components/layout/SettingsShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  settingsTeamInvitesMock,
  settingsTeamMembersMock,
} from "@/data/mock/settings.mock";
import { resolveUiState } from "@/data/mock/ui-states";

const memberTone = { ativo: "success", inativo: "neutral" } as const;
const inviteTone = {
  pendente: "warning",
  expirado: "danger",
  aceito: "success",
} as const;

export default async function SettingsTeamPage({
  searchParams,
}: {
  searchParams?: Promise<{ state?: string }>;
}) {
  const s = resolveUiState((await searchParams)?.state);
  return (
    <SettingsShell active="Equipe">
      <PageHeader
        title="Equipe"
        description="Gestão visual de equipe, convites, papéis e status de convite."
      />
      {s === "loading" && <LoadingState title="Carregando equipe" />}
      {s === "empty" && (
        <EmptyState
          title="Sem membros na equipe"
          actionLabel="Convidar membro"
        />
      )}
      {s === "error" && <ErrorState title="Falha ao carregar equipe" />}
      {s === "forbidden" && <ForbiddenState title="Acesso restrito à equipe" />}
      {s === "default" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Equipe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {settingsTeamMembersMock.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between rounded-2xl border border-border p-3"
                >
                  <p>
                    {m.name} · {m.role}
                  </p>
                  <Badge tone={memberTone[m.status]}>{m.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Convites</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {settingsTeamInvitesMock.map((i) => (
                <div
                  key={i.email}
                  className="flex items-center justify-between rounded-2xl border border-border p-3"
                >
                  <p>
                    {i.email} · {i.role}
                  </p>
                  <Badge tone={inviteTone[i.status]}>{i.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </SettingsShell>
  );
}
