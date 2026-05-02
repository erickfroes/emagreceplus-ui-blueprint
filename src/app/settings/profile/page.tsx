import { SettingsShell } from "@/components/layout/SettingsShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { clinicSettingsProfileMock } from "@/data/mock/settings.mock";
import { resolveUiState } from "@/data/mock/ui-states";

export default async function SettingsProfilePage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const params = await searchParams;
  const state = resolveUiState(params?.state);

  return (
    <SettingsShell active="Perfil da clínica">
      <PageHeader title="Configuração clínica" description="Dados públicos, fiscais, identidade visual, timezone e preview documental em modo UI-only." />
      {state === "loading" ? <LoadingState title="Carregando configuração clínica" /> : null}
      {state === "empty" ? <EmptyState title="Sem dados clínicos configurados" description="Preencha os dados da clínica para publicar informações institucionais." actionLabel="Iniciar configuração" /> : null}
      {state === "error" ? <ErrorState title="Falha ao carregar perfil da clínica" description="Não foi possível recuperar os dados mockados da configuração clínica." /> : null}
      {state === "forbidden" ? <ForbiddenState title="Acesso restrito à configuração clínica" description="Somente administradores podem alterar dados institucionais." /> : null}
      {state === "default" ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card><CardHeader><CardTitle>Dados públicos</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><p><strong>Razão social:</strong> {clinicSettingsProfileMock.publicInfo.legalName}</p><p><strong>Nome fantasia:</strong> {clinicSettingsProfileMock.publicInfo.tradeName}</p><p><strong>Website:</strong> {clinicSettingsProfileMock.publicInfo.website}</p><p><strong>E-mail:</strong> {clinicSettingsProfileMock.publicInfo.contactEmail}</p><p><strong>Telefone:</strong> {clinicSettingsProfileMock.publicInfo.contactPhone}</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Dados fiscais</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><p><strong>Documento:</strong> {clinicSettingsProfileMock.fiscalInfo.document}</p><p><strong>Inscrição municipal:</strong> {clinicSettingsProfileMock.fiscalInfo.municipalRegistration}</p><p><strong>Endereço fiscal:</strong> {clinicSettingsProfileMock.fiscalInfo.address}</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Identidade visual</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><p><strong>Cor primária:</strong> {clinicSettingsProfileMock.branding.primaryColor}</p><p><strong>Cor secundária:</strong> {clinicSettingsProfileMock.branding.secondaryColor}</p><p><strong>Logo:</strong> {clinicSettingsProfileMock.branding.logoUrl} (simulado)</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Timezone & preview documental</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><p><strong>Timezone operacional:</strong> {clinicSettingsProfileMock.timezone}</p><p><strong>Template:</strong> {clinicSettingsProfileMock.documentPreview.title}</p><p><strong>Última atualização:</strong> {clinicSettingsProfileMock.documentPreview.updatedAt}</p><p><strong>Status:</strong> {clinicSettingsProfileMock.documentPreview.status}</p></CardContent></Card>
        </div>
      ) : null}
    </SettingsShell>
  );
}
