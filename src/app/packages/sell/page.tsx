import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";

const steps = ["Paciente", "Pacote", "Pagamento", "Contrato", "Confirmação"];
export default function SellPackagePage() {
  return <DashboardShell active="Planos e Pacotes"><PageHeader title="Vender Pacote" description="Fluxo em stepper: paciente → pacote → pagamento → contrato → confirmação." />
    <div className="grid gap-3 md:grid-cols-5">{steps.map((s, i) => <Card key={s} className={i === 0 ? "border-primary-500" : ""}><CardContent className="py-4 text-center text-sm">{i + 1}. {s}</CardContent></Card>)}</div>
  </DashboardShell>;
}
