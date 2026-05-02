import { SettingsShell } from "@/components/layout/SettingsShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function SettingsIntegrationsPage() {
  return (
    <SettingsShell active="Integrações">
      <PageHeader
        title="Integrações"
        description="Painel de integrações em fase UI-only / integração futura."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>D4Sign</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Provider planejado para assinatura digital. Status atual: <strong>não configurado (simulado)</strong>.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Asaas</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Integração planejada para cobrança SaaS. Status atual: <strong>não configurado (simulado)</strong>.
          </CardContent>
        </Card>
      </div>
    </SettingsShell>
  );
}
