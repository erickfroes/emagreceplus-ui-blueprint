import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { patients, type UIState } from "@/data/mock/patients";

const statusTone = {
  em_tratamento: "info",
  estavel: "success",
  risco_aderencia: "warning",
} as const;

const pageState: UIState = "default";

export default function PatientsPage() {
  return (
    <DashboardShell active="Pacientes">
      <h1 className="text-2xl font-semibold text-graphite">Lista de pacientes</h1>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">Pacientes ativos e indicadores de acompanhamento nutricional.</p>

      {pageState === "loading" ? <p className="text-sm text-muted-foreground">Carregando pacientes...</p> : null}
      {pageState === "error" ? <p className="text-sm text-danger">Não foi possível carregar pacientes.</p> : null}
      {pageState === "forbidden" ? <p className="text-sm text-danger">Acesso negado para pacientes.</p> : null}

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
