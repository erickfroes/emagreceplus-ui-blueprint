import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/server";

export default async function PackagesPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) return <DashboardShell active="Planos e Pacotes"><PageHeader title="Planos e Pacotes" description="forbidden" /></DashboardShell>;

  const { data: packagesData, error } = await supabase.from("packages").select("id,name,code,status,current_version").order("updated_at", { ascending: false });
  const data = (packagesData ?? []) as Array<{ id: string; name: string; code: string; current_version: string | number; status: string }>;

  return <DashboardShell active="Planos e Pacotes"><PageHeader title="Planos e Pacotes" description="Gerencie ofertas e versões de pacotes." />
    <Card><CardHeader><CardTitle>Pacotes cadastrados</CardTitle></CardHeader><CardContent className="space-y-2">
      {error ? <p>error: {error.message}</p> : !data?.length ? <p>empty</p> : data.map((p) => <p key={p.id}>{p.name} • código {p.code} • v{p.current_version} • {p.status}</p>)}
    </CardContent></Card>
  </DashboardShell>;
}
