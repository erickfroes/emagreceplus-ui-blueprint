import { SettingsShell } from "@/components/layout/SettingsShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { ComingSoonState } from "@/components/ui/ComingSoonState";

export default function SettingsDocumentsPage() {
  return (
    <SettingsShell active="Documentos">
      <PageHeader
        title="Documentos"
        description="Templates e políticas documentais em fase UI-only / integração futura."
      />
      <ComingSoonState description="Este módulo de documentos está disponível como protótipo UI-only / integração futura." />
    </SettingsShell>
  );
}
