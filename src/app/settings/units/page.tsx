import { SettingsShell } from "@/components/layout/SettingsShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { ComingSoonState } from "@/components/ui/ComingSoonState";

export default function SettingsUnitsPage() {
  return (
    <SettingsShell active="Unidades">
      <PageHeader
        title="Unidades"
        description="Gestão de unidades da clínica em fase UI-only / integração futura."
      />
      <ComingSoonState description="Este módulo de unidades está disponível como protótipo UI-only / integração futura." />
    </SettingsShell>
  );
}
