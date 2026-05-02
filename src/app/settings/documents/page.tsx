import Link from "next/link";
import { SettingsShell } from "@/components/layout/SettingsShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { resolveUiState } from "@/data/mock/ui-states";

export default async function SettingsDocumentsPage({
  searchParams,
}: {
  searchParams?: Promise<{ state?: string }>;
}) {
  const s = resolveUiState((await searchParams)?.state);
  return (
    <SettingsShell active="Documentos">
      <PageHeader
        title="Documentos"
        description="Templates e políticas documentais em fase UI-only / integração futura."
        actions={
          <Link href="/settings/documents/editor">
            <Button variant="outline">Abrir editor de documento</Button>
          </Link>
        }
      />
      {s === "loading" && <LoadingState title="Carregando documentos" />}
      {s === "empty" && (
        <EmptyState
          title="Nenhum template disponível"
          actionLabel="Criar template"
        />
      )}
      {s === "error" && <ErrorState title="Falha ao carregar documentos" />}
      {s === "forbidden" && (
        <ForbiddenState title="Acesso restrito aos documentos" />
      )}
      {s === "default" && (
        <Card>
          <CardHeader>
            <CardTitle>Gestão de templates documentais</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Fluxo visual habilitado em{" "}
            <strong>/settings/documents/editor</strong> com toolbox, canvas A4,
            propriedades e versionamento simulado.
          </CardContent>
        </Card>
      )}
    </SettingsShell>
  );
}
