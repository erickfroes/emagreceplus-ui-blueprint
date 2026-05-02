import { SettingsShell } from "@/components/layout/SettingsShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { PageHeader } from "@/components/ui/PageHeader";
import { settingsUnitsMock } from "@/data/mock/settings.mock";
import { resolveUiState } from "@/data/mock/ui-states";

const statusTone = {
  ativa: "success",
  planejada: "warning",
  inativa: "neutral",
} as const;

export default async function SettingsUnitsPage({
  searchParams,
}: {
  searchParams?: Promise<{ state?: string }>;
}) {
  const state = resolveUiState((await searchParams)?.state);
  return (
    <SettingsShell active="Unidades">
      <PageHeader
        title="Unidades"
        description="Lista simulada de unidades, status operacional, profissionais e pacientes."
      />
      {state === "loading" && <LoadingState title="Carregando unidades" />}
      {state === "empty" && (
        <EmptyState
          title="Nenhuma unidade cadastrada"
          description="Cadastre unidades para escalar a operação."
          actionLabel="Nova unidade"
        />
      )}
      {state === "error" && <ErrorState title="Falha ao carregar unidades" />}
      {state === "forbidden" && (
        <ForbiddenState title="Acesso restrito às unidades" />
      )}
      {state === "default" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button>Nova unidade</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {settingsUnitsMock.map((u) => (
              <Card key={u.id}>
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle>{u.name}</CardTitle>
                  <Badge tone={statusTone[u.status]}>{u.status}</Badge>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 text-sm">
                  <p>
                    <strong>Profissionais:</strong> {u.professionals}
                  </p>
                  <p>
                    <strong>Pacientes:</strong> {u.patients}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </SettingsShell>
  );
}
