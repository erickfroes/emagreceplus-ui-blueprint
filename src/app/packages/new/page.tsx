import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createPackageAction } from "./actions";
import { createClient } from "@/lib/ui-only/server";

export default async function NewPackagePage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) return <DashboardShell active="Planos e Pacotes"><PageHeader title="Criar Pacote" description="forbidden" /></DashboardShell>;

  const { data: servicesData, error } = await supabase.from("services").select("id,name,status").eq("status", "active");
  const services = (servicesData ?? []) as Array<{ id: string; name: string }>;

  return <DashboardShell active="Planos e Pacotes"><PageHeader title="Criar Pacote" description="Criação de pacote com persistência em Supabase." />
    <Card><CardHeader><CardTitle>Configuração inicial</CardTitle></CardHeader><CardContent>
      {error ? <p>error: {error.message}</p> : !services?.length ? <p>empty</p> : <form action={createPackageAction} className="space-y-3">
        <input name="code" placeholder="Código" className="border rounded p-2 w-full" required />
        <input name="name" placeholder="Nome do pacote" className="border rounded p-2 w-full" required />
        <select name="serviceId" className="border rounded p-2 w-full" required>{services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
        <label className="block"><input type="checkbox" name="appEnabled" /> App</label>
        <label className="block"><input type="checkbox" name="chatEnabled" /> Chat</label>
        <label className="block"><input type="checkbox" name="documentsEnabled" /> Documentos</label>
        <label className="block"><input type="checkbox" name="checkinEnabled" /> Check-in</label>
        <Button type="submit">Publicar pacote</Button>
      </form>}
    </CardContent></Card>
  </DashboardShell>;
}
