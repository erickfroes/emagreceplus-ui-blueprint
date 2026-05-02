import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { createClient } from "@/lib/ui-only/server";
import { resolveUiState } from "@/data/mock/ui-states";

export default async function PackagesPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const state = resolveUiState((await searchParams)?.state);
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user || state === "forbidden") return <DashboardShell active="Planos e Pacotes"><PageHeader title="Planos e Pacotes" description="Gerencie ofertas e versões de pacotes." /><ForbiddenState title="Acesso negado a pacotes" /></DashboardShell>;
  if (state === "loading") return <DashboardShell active="Planos e Pacotes"><PageHeader title="Planos e Pacotes" description="Gerencie ofertas e versões de pacotes." /><LoadingState title="Carregando pacotes" /></DashboardShell>;
  if (state === "error") return <DashboardShell active="Planos e Pacotes"><PageHeader title="Planos e Pacotes" description="Gerencie ofertas e versões de pacotes." /><ErrorState title="Falha ao carregar pacotes" /></DashboardShell>;
  if (state === "empty") return <DashboardShell active="Planos e Pacotes"><PageHeader title="Planos e Pacotes" description="Gerencie ofertas e versões de pacotes." /><EmptyState title="Sem pacotes cadastrados" /></DashboardShell>;

  const { data: packagesData, error } = await supabase.from("packages").select("id,name,code,status,current_version").order("updated_at", { ascending: false });
  const data = (packagesData ?? []) as Array<{ id: string; name: string; code: string; current_version: string | number; status: string }>;

  return <DashboardShell active="Planos e Pacotes"><PageHeader title="Planos e Pacotes" description="Gerencie ofertas e versões de pacotes." />
    <Card><CardHeader><CardTitle>Pacotes cadastrados</CardTitle></CardHeader><CardContent className="space-y-2">
      {error ? <ErrorState title="Falha ao carregar pacotes" description={error.message} /> : !data?.length ? <EmptyState title="Sem pacotes cadastrados" /> : data.map((p) => <p key={p.id}>{p.name} • código {p.code} • v{p.current_version} • {p.status}</p>)}
    </CardContent></Card>
  </DashboardShell>;
}
