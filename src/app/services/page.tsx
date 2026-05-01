import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { services } from "@/data/mock/finance";

export default function ServicesPage() {
  return <DashboardShell active="Planos e Pacotes"><PageHeader title="Catálogo de Serviços" description="Tabela de serviços com ações de acesso seguras." />
    <Card><CardHeader><CardTitle>Serviços ativos</CardTitle></CardHeader><CardContent className="space-y-2">{services.map((s) => <p key={s.code}>{s.name} • {s.price} • {s.category} • ação: {s.accessAction}</p>)}</CardContent></Card>
  </DashboardShell>;
}
