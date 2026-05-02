import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { createClient } from "@/lib/ui-only/server";
import { resolveUiState } from "@/data/mock/ui-states";

export default async function DashboardPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const params = searchParams ? await searchParams : undefined;
  const pageState = resolveUiState(params?.state);
  if (pageState === "loading") return <main className="ep-page grid min-h-screen place-items-center p-6"><LoadingState title="Carregando dashboard" /></main>;
  if (pageState === "error") return <main className="ep-page grid min-h-screen place-items-center p-6"><ErrorState title="Falha ao carregar dashboard" /></main>;
  if (pageState === "forbidden") return <main className="ep-page grid min-h-screen place-items-center p-6"><ForbiddenState title="Acesso negado ao dashboard" /></main>;
  if (pageState === "empty") return <main className="ep-page grid min-h-screen place-items-center p-6"><EmptyState title="Dashboard sem dados" description="Nenhum indicador foi consolidado para a unidade selecionada." /></main>;

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
