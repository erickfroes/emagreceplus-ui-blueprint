import { SettingsShell } from "@/components/layout/SettingsShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { settingsAuditLogsMock } from "@/data/mock/settings.mock";
import { resolveUiState } from "@/data/mock/ui-states";

const severityTone = {
  info: "info",
  warning: "warning",
  critical: "danger",
} as const;

export default async function SettingsAuditLogsPage({
  searchParams,
}: {
  searchParams?: Promise<{ state?: string }>;
}) {
  const s = resolveUiState((await searchParams)?.state);
  return (
    <SettingsShell active="Logs de auditoria">
      <PageHeader
        title="Logs de auditoria"
        description="Rastreabilidade simulada com filtros visuais por módulo, usuário e severidade."
      />
      {s === "loading" && <LoadingState title="Carregando logs" />}
      {s === "empty" && <EmptyState title="Nenhum evento encontrado" />}
      {s === "error" && <ErrorState title="Falha ao carregar logs" />}
      {s === "forbidden" && <ForbiddenState title="Acesso restrito aos logs" />}
      {s === "default" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filtros (visual)</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 text-sm">
              <Badge tone="neutral">Módulo: Todos</Badge>
              <Badge tone="neutral">Usuário: Todos</Badge>
              <Badge tone="neutral">Severidade: Todas</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Eventos recentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {settingsAuditLogsMock.map((l) => (
                <div
                  key={l.id}
                  className="grid gap-1 rounded-2xl border border-border p-3 md:grid-cols-[180px_1fr_1fr_auto] md:items-center"
                >
                  <span className="text-muted-foreground">{l.at}</span>
                  <span>{l.actor}</span>
                  <span>
                    {l.module} · {l.action}
                  </span>
                  <Badge tone={severityTone[l.severity]}>{l.severity}</Badge>
                </div>
              ))}
              <p className="text-xs text-muted-foreground">
                Aviso: tela em modo UI-only com dados simulados, sem trilha real
                de auditoria.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </SettingsShell>
  );
}
