import { DashboardShell } from "@/components/layout/DashboardShell";

export default function DashboardPage() {
  return (
    <DashboardShell active="Dashboard">
      <h1 className="text-2xl font-semibold text-graphite">Dashboard</h1>
      <p className="mt-2 text-sm text-muted-foreground">Placeholder da tela principal com estrutura pronta para estados loading, empty, error e forbidden.</p>
    </DashboardShell>
  );
}
