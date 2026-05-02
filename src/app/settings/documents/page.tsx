import Link from "next/link";
import { SettingsShell } from "@/components/layout/SettingsShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function SettingsDocumentsPage() {
  return (
    <SettingsShell active="Documentos">
      <PageHeader title="Documentos" description="Templates e políticas documentais em fase UI-only / integração futura." actions={<Link href="/settings/documents/editor"><Button variant="outline">Abrir editor de documento</Button></Link>} />
      <Card>
        <CardHeader><CardTitle>Gestão de templates documentais</CardTitle></CardHeader>
        <CardContent className="text-sm text-muted-foreground">Fluxo visual habilitado em <strong>/settings/documents/editor</strong> com toolbox, canvas A4, propriedades e versionamento simulado.</CardContent>
      </Card>
    </SettingsShell>
  );
}
