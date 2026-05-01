import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { asaasIntegrationPlan, auditTrail, financeKpis } from "@/data/mock/finance";

export default function FinancePage() {
  return <DashboardShell active="Financeiro"><PageHeader title="Financeiro da Clínica" description="Visão consolidada por unidade com fluxos financeiros simulados." />
    <div className="ep-kpi-grid">{financeKpis.map((kpi) => <StatCard key={kpi.label} title={kpi.label} value={kpi.value} />)}</div>
    <Card className="mt-4"><CardHeader><CardTitle>Conector Asaas (planejado)</CardTitle></CardHeader><CardContent className="space-y-2 text-sm text-slate-600"><p>Status: <strong>{asaasIntegrationPlan.status}</strong></p><p>Execução: server-side only</p><p>Chave API no browser: bloqueada</p><p>RLS: {asaasIntegrationPlan.rls}</p></CardContent></Card>
    <Card className="mt-4"><CardHeader><CardTitle>Auditoria financeira</CardTitle></CardHeader><CardContent className="space-y-2">{auditTrail.map((item) => <p key={item.at}>{item.at} • {item.action} • {item.detail}</p>)}</CardContent></Card>
  </DashboardShell>;
}
