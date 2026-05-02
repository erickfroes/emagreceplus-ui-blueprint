import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { NotificationsView } from "@/components/notifications/NotificationsView";
import { resolveUiState } from "@/data/mock/ui-states";

export default async function NotificationsPage({ searchParams }: { searchParams: Promise<{ state?: string }> }) {
  const params = await searchParams;
  const state = resolveUiState(params.state);

  return <DashboardShell active="Notificações">
    <PageHeader title="Notificações" description="Central de alertas e comunicações internas (UI simulada)." />
    <NotificationsView state={state === "coming-soon" ? "default" : state} />
  </DashboardShell>;
}
