import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { resolveUiState } from "@/data/mock/ui-states";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";

const shifts = [
  {
    id: "cx-01",
    operator: "Ana Carla",
    opening: "08:00",
    closing: "17:00",
    status: "fechado",
    expected: "R$ 6.820,00",
    settled: "R$ 6.790,00",
  },
  {
    id: "cx-02",
    operator: "Ricardo Alves",
    opening: "17:00",
    closing: "22:00",
    status: "aberto",
    expected: "R$ 1.240,00",
    settled: "R$ 1.240,00",
  },
] as const;

export default async function CashRegisterPage({
  searchParams,
}: {
  searchParams?: Promise<{ state?: string }>;
}) {
  const params = searchParams ? await searchParams : undefined;
  const state = resolveUiState(params?.state);

  return (
    <DashboardShell active="Financeiro">
      <PageHeader
        title="Caixa da Unidade"
        description="Abertura e fechamento diário com auditoria visual simulada."
      />
      {state === "loading" ? <LoadingState title="Carregando caixa" /> : null}
      {state === "empty" ? (
        <EmptyState
          title="Sem turnos de caixa"
          description="Não existem turnos registrados para o período selecionado."
        />
      ) : null}
      {state === "error" ? (
        <ErrorState title="Falha ao carregar caixa" />
      ) : null}
      {state === "forbidden" ? (
        <ForbiddenState title="Acesso negado ao caixa" />
      ) : null}

      {state === "default" ? (
        <Card>
          <CardHeader>
            <CardTitle>Turnos do caixa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {shifts.map((shift) => (
              <div
                key={shift.id}
                className="rounded-2xl border border-border p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-graphite">{shift.operator}</p>
                  <Badge
                    tone={shift.status === "fechado" ? "success" : "warning"}
                  >
                    {shift.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {shift.opening} - {shift.closing}
                </p>
                <p className="mt-2 text-sm">
                  Previsto: <strong>{shift.expected}</strong> • Conferido:{" "}
                  <strong>{shift.settled}</strong>
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}
    </DashboardShell>
  );
}
