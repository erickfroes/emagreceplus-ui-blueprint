import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { createClient } from "@/lib/ui-only/server";
import { resolveUiState } from "@/data/mock/ui-states";

export default async function ServicesPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const state = resolveUiState((await searchParams)?.state);
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user || state === "forbidden") return <DashboardShell active="Planos e Pacotes"><PageHeader title="Catálogo de Serviços" description="Tabela de serviços com ações de acesso seguras." /><ForbiddenState title="Acesso negado ao catálogo de serviços" /></DashboardShell>;
  if (state === "loading") return <DashboardShell active="Planos e Pacotes"><PageHeader title="Catálogo de Serviços" description="Tabela de serviços com ações de acesso seguras." /><LoadingState title="Carregando serviços" /></DashboardShell>;
  if (state === "error") return <DashboardShell active="Planos e Pacotes"><PageHeader title="Catálogo de Serviços" description="Tabela de serviços com ações de acesso seguras." /><ErrorState title="Falha ao carregar serviços" /></DashboardShell>;
  if (state === "empty") return <DashboardShell active="Planos e Pacotes"><PageHeader title="Catálogo de Serviços" description="Tabela de serviços com ações de acesso seguras." /><EmptyState title="Sem serviços disponíveis" description="Nenhum serviço foi cadastrado no mock atual." /></DashboardShell>;

  const { data: servicesData, error } = await supabase.from("services").select("id,name,code,price_cents,status,service_categories(name)").order("created_at", { ascending: false });
  const data = (servicesData ?? []) as Array<{ id: string; name: string; price_cents: number; status: string; service_categories?: Array<{name?: string}> }>;

  return <DashboardShell active="Planos e Pacotes"><PageHeader title="Catálogo de Serviços" description="Tabela de serviços com ações de acesso seguras." />
    <Card><CardHeader><CardTitle>Serviços ativos</CardTitle></CardHeader><CardContent className="space-y-2">
      {error ? <ErrorState title="Falha ao carregar serviços" description={error.message} /> : !data?.length ? <EmptyState title="Sem serviços disponíveis" description="Nenhum serviço foi cadastrado no mock atual." /> : data.map((s) => <p key={s.id}>{s.name} • R$ {(s.price_cents / 100).toFixed(2)} • {Array.isArray(s.service_categories) ? s.service_categories[0]?.name ?? "sem categoria" : "sem categoria"} • {s.status}</p>)}
    </CardContent></Card>
  </DashboardShell>;
}
