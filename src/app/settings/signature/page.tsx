import { SettingsShell } from "@/components/layout/SettingsShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { ComingSoonState } from "@/components/ui/ComingSoonState";

export default function SignatureSettingsPage() {
  return (
    <SettingsShell active="Assinatura Digital">
      <PageHeader
        title="Assinatura Digital"
        description="Configuração de assinatura digital em fase UI-only / integração futura."
      />
      <ComingSoonState description="Este módulo de assinatura está disponível como protótipo UI-only / integração futura." />
    </SettingsShell>
  );
}
