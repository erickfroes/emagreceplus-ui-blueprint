import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { packages } from "@/data/mock/finance";

export default function PackagesPage() {
  return <DashboardShell active="Planos e Pacotes"><PageHeader title="Planos e Pacotes" description="Gerencie ofertas e versões de pacotes." />
    <Card><CardHeader><CardTitle>Pacotes cadastrados</CardTitle></CardHeader><CardContent className="space-y-2">{packages.map((p) => <p key={p.id}>{p.name} • {p.sessions} sessões • {p.price} • {p.status} • {p.action}</p>)}</CardContent></Card>
  </DashboardShell>;
}
