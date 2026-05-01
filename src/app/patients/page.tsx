import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import type { UIState } from "@/data/mock/patients";
import { resolveUiState } from "@/data/mock/ui-states";
import { mockDataProvider } from "@/services/mock-data-provider";

const statusTone = {
  em_tratamento: "info",
  estavel: "success",
  risco_aderencia: "warning",
} as const;

export default async function PatientsPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const params = searchParams ? await searchParams : undefined;
  const pageState = resolveUiState(params?.state) as UIState;
  const { items: patients } = await mockDataProvider.patients.listPatients();
  return (
    <DashboardShell active="Pacientes">
      <h1 className="text-2xl font-semibold text-graphite">Lista de pacientes</h1>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">Pacientes ativos e indicadores de acompanhamento nutricional.</p>

      {pageState === "loading" ? <LoadingState title="Carregando pacientes" /> : null}
      {pageState === "error" ? <ErrorState title="Falha ao carregar pacientes" /> : null}
      {pageState === "forbidden" ? <ForbiddenState title="Acesso negado para pacientes" /> : null}
      {pageState === "empty" ? <EmptyState title="Sem pacientes ativos" description="Ainda não há pacientes cadastrados para esta unidade no mock." /> : null}

      {pageState === "default" ? (
        <Card>
          <CardHeader><CardTitle>Pacientes ativos ({patients.length})</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-muted-foreground"><tr><th>Paciente</th><th>Plano</th><th>Status</th><th>Adesão</th><th>Próxima consulta</th></tr></thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id} className="border-t border-border">
                      <td className="py-3"><Link href={`/patients/${patient.id}`} className="font-medium text-graphite hover:underline">{patient.nome}</Link></td>
                      <td>{patient.plano}</td>
                      <td><Badge tone={statusTone[patient.status]}>{patient.status.replace("_", " ")}</Badge></td>
                      <td>{patient.adesaoPercentual}%</td>
                      <td>{patient.proximaConsulta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </DashboardShell>
  );
}
