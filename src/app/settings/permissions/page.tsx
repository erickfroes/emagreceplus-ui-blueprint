import { SettingsShell } from "@/components/layout/SettingsShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { ComingSoonState } from "@/components/ui/ComingSoonState";

export default function SettingsPermissionsPage() {
  return (
    <SettingsShell active="Permissões">
      <PageHeader
        title="Permissões"
        description="Matriz de permissões em fase UI-only / integração futura."
      />
      <ComingSoonState description="Este módulo de permissões está disponível como protótipo UI-only / integração futura." />
    </SettingsShell>
  );
}
