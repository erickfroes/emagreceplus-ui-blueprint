import { SettingsShell } from "@/components/layout/SettingsShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { ComingSoonState } from "@/components/ui/ComingSoonState";

export default function SettingsTeamPage() {
  return (
    <SettingsShell active="Equipe">
      <PageHeader
        title="Equipe"
        description="Configuração de membros e papéis em fase UI-only / integração futura."
      />
      <ComingSoonState description="Este módulo de equipe está disponível como protótipo UI-only / integração futura." />
    </SettingsShell>
  );
}
