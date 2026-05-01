import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { queueColumns, type UIState } from "@/data/mock/encounters";

const pageState: UIState = "default";

export default function QueuePage() {
  return (
    <DashboardShell active="Atendimentos">
      <h1 className="text-2xl font-semibold text-slate-950">Fila de atendimento</h1>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">Kanban operacional com ações por coluna para organizar o fluxo clínico.</p>

      {pageState === "loading" ? <p className="text-sm text-muted-foreground">Carregando fila...</p> : null}
      {pageState === "error" ? <p className="text-sm text-danger">Erro ao carregar fila de atendimento.</p> : null}
      {pageState === "forbidden" ? <p className="text-sm text-danger">Você não tem acesso à fila de atendimento.</p> : null}
      {pageState === "empty" ? <EmptyState title="Fila vazia" description="Nenhum paciente em fluxo no momento." /> : null}

      {pageState === "default" ? (
        <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
          {queueColumns.map((column) => (
            <Card key={column.id}>
              <CardHeader>
                <CardTitle>{column.title}</CardTitle>
                <Badge tone="neutral">{column.items.length}</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-xl border border-dashed border-border p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Ações da coluna</p>
                  <ul className="space-y-1 text-sm text-slate-700">
                    {column.actions.map((action) => (<li key={action}>• {action}</li>))}
                  </ul>
                </div>
                {column.items.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-border p-3">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-900">{item.patientName}</p>
                      {item.priority === "alta" ? <Badge tone="danger">Alta</Badge> : null}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.reason}</p>
                    <p className="mt-1 text-xs text-slate-500">Check-in: {item.checkInAt}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
    </DashboardShell>
  );
}
