import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/server";

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) return <DashboardShell active="Planos e Pacotes"><PageHeader title="Catálogo de Serviços" description="forbidden" /></DashboardShell>;

  const { data: servicesData, error } = await supabase.from("services").select("id,name,code,price_cents,status,service_categories(name)").order("created_at", { ascending: false });
  const data = (servicesData ?? []) as Array<{ id: string; name: string; price_cents: number; status: string; service_categories?: Array<{name?: string}> }>;

  return <DashboardShell active="Planos e Pacotes"><PageHeader title="Catálogo de Serviços" description="Tabela de serviços com ações de acesso seguras." />
    <Card><CardHeader><CardTitle>Serviços ativos</CardTitle></CardHeader><CardContent className="space-y-2">
      {error ? <p>error: {error.message}</p> : !data?.length ? <p>empty</p> : data.map((s) => <p key={s.id}>{s.name} • R$ {(s.price_cents / 100).toFixed(2)} • {Array.isArray(s.service_categories) ? s.service_categories[0]?.name ?? "sem categoria" : "sem categoria"} • {s.status}</p>)}
    </CardContent></Card>
  </DashboardShell>;
}
