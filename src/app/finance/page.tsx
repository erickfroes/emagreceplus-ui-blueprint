import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { financeKpis } from "@/data/mock/finance";

export default function FinancePage() {
  return <DashboardShell active="Financeiro"><PageHeader title="Financeiro da Clínica" description="Visão consolidada por unidade com dados simulados." />
    <div className="ep-kpi-grid">{financeKpis.map((kpi) => <StatCard key={kpi.label} title={kpi.label} value={kpi.value} />)}</div>
  </DashboardShell>;
}
