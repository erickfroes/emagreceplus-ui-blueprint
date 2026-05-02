import { SettingsShell } from "@/components/layout/SettingsShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function SettingsBillingPage() {
  return (
    <SettingsShell active="Plano e Cobrança">
      <PageHeader
        title="Plano e Cobrança"
        description="Módulo administrativo em fase UI-only / integração futura."
      />
      <Card>
        <CardHeader>
          <CardTitle>Status de cobrança SaaS</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Plano atual simulado: Growth • Renovação simulada: 15/05/2026 • Gateway de cobrança: <strong>não configurado (simulado)</strong>.
        </CardContent>
      </Card>
    </SettingsShell>
  );
}
