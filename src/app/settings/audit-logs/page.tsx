import { SettingsShell } from "@/components/layout/SettingsShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { ComingSoonState } from "@/components/ui/ComingSoonState";

export default function SettingsAuditLogsPage() {
  return (
    <SettingsShell active="Logs de auditoria">
      <PageHeader
        title="Logs de auditoria"
        description="Rastreamento de atividades em fase UI-only / integração futura."
      />
      <ComingSoonState description="Este módulo de auditoria está disponível como protótipo UI-only / integração futura." />
    </SettingsShell>
  );
}
