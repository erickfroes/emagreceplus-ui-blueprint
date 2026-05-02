import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { createClient } from "@/lib/ui-only/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) redirect("/auth/login");

  const unitId = (await cookies()).get("active_unit_id")?.value;
  if (!unitId) return <main className="ep-page grid min-h-screen place-items-center p-6"><EmptyState title="Acesso negado" description="Selecione uma unidade para continuar." /></main>;

  const { data: membership } = await supabase.from("memberships").select("id").eq("user_id", authData.user.id).eq("unit_id", unitId).eq("status", "active").maybeSingle();
  if (!membership) return <main className="ep-page grid min-h-screen place-items-center p-6"><EmptyState title="Acesso negado" description="Você não possui acesso a esta unidade." /></main>;

  return (
    <DashboardShell active="Dashboard">
      <h1 className="text-3xl font-semibold text-slate-950">Dashboard</h1>
      <p className="mt-2 text-sm text-muted-foreground">Sessão real ativa com isolamento por unidade.</p>
    </DashboardShell>
  );
}
