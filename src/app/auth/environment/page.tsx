import { redirect } from "next/navigation";
import { EnvironmentSelectionView } from "@/components/auth/EnvironmentSelectionView";
import { createClient } from "@/lib/ui-only/server";
import { selectUnit } from "./actions";

type MembershipRow = {
  unit_id: string;
  role: { name: string }[] | null;
  unit: { name: string; city: string; state: string }[] | null;
  status: string;
};

export default async function EnvironmentPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) redirect("/auth/login");

  const { data } = await supabase
    .from("memberships")
    .select("unit_id, role:roles(name), unit:units(name,city,state), status")
    .eq("user_id", authData.user.id)
    .eq("status", "active");

  const items = ((data ?? []) as MembershipRow[]).map((row) => ({
    id: row.unit_id,
    clinicName: row.unit?.[0]?.name ?? "Unidade",
    role: row.role?.[0]?.name ?? "Membro",
    location: `${row.unit?.[0]?.city ?? "-"} - ${row.unit?.[0]?.state ?? "-"}`,
    status: row.status === "active" ? "ativo" as const : "inativo" as const,
  }));

  return (
    <main className="ep-page min-h-screen p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-2xl font-semibold text-slate-950">Selecionar unidade</h1>
        <form action={selectUnit}><EnvironmentSelectionView items={items} /></form>
      </div>
    </main>
  );
}
