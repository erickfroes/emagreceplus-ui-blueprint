import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { StaffChatView } from "@/components/staff-chat/StaffChatView";
import { resolveUiState } from "@/data/mock/ui-states";

export default async function StaffChatPage({ searchParams }: { searchParams: Promise<{ state?: string }> }) {
  const params = await searchParams;
  const state = resolveUiState(params.state);

  return <DashboardShell active="Mensagens">
    <PageHeader title="Chat da Equipe" description="Comunicação interna da equipe multidisciplinar com contexto clínico simulado." />
    <StaffChatView state={state === "coming-soon" ? "default" : state} />
  </DashboardShell>;
}
