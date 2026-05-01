import { SettingsShell } from "@/components/layout/SettingsShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function SettingsBillingPage() {
  return (
    <SettingsShell active="Plano e Cobrança">
      <h1 className="text-2xl font-semibold text-slate-950">Plano e Cobrança da Plataforma</h1>
      <p className="mt-1 text-sm text-muted-foreground">Módulo administrativo SaaS separado do financeiro clínico. Integração de cobrança externa permanece não configurada nesta fase UI-only.</p>
      <Card className="mt-6">
        <CardHeader><CardTitle>Status de cobrança SaaS</CardTitle></CardHeader>
        <CardContent>
          Plano atual: Growth • Renovação: 15/05/2026 • Gateway de cobrança: <strong>não configurado (simulado)</strong>.
        </CardContent>
      </Card>
    </SettingsShell>
  );
}
