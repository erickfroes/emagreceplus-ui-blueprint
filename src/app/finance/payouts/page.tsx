import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
export default function PayoutsPage() { return <DashboardShell active="Financeiro"><PageHeader title="Repasses de Profissionais" description="Controle de repasses e conferências sem integração externa." /><Card><CardHeader><CardTitle>Próximos repasses</CardTitle></CardHeader><CardContent>Dr. Lucas: R$ 4.320,00 • Dra. Paula: R$ 3.860,00 • Status: aguardando confirmação.</CardContent></Card></DashboardShell>; }
