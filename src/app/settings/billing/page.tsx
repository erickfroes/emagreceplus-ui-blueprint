import { SettingsShell } from "@/components/layout/SettingsShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { settingsBillingMock } from "@/data/mock/settings.mock";
import { resolveUiState } from "@/data/mock/ui-states";

export default async function SettingsBillingPage({
  searchParams,
}: {
  searchParams?: Promise<{ state?: string }>;
}) {
  const s = resolveUiState((await searchParams)?.state);
  return (
    <SettingsShell active="Cobrança">
      <PageHeader
        title="Plano e Cobrança"
        description="Módulo administrativo em UI-only com gateway planejado."
      />
      {s === "loading" && <LoadingState title="Carregando cobrança" />}
      {s === "empty" && (
        <EmptyState title="Sem plano ativo" actionLabel="Selecionar plano" />
      )}
      {s === "error" && <ErrorState title="Falha ao carregar cobrança" />}
      {s === "forbidden" && (
        <ForbiddenState title="Acesso restrito à cobrança" />
      )}
      {s === "default" && (
        <Card>
          <CardHeader>
            <CardTitle>Status de cobrança SaaS</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Plano atual: {settingsBillingMock.currentPlan} • Renovação:{" "}
            {settingsBillingMock.renewalDate} • Gateway:{" "}
            <strong>{settingsBillingMock.gatewayStatus}</strong>.
          </CardContent>
        </Card>
      )}
    </SettingsShell>
  );
}
