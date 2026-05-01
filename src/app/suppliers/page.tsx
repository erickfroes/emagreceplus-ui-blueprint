import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { InventoryStateBlock } from "@/components/inventory/InventoryStateBlock";
import { resolveInventoryUiState, suppliers } from "@/data/mock/inventory";

export default function SuppliersPage({ searchParams }: { searchParams?: { state?: string } }) {
  const state = resolveInventoryUiState(searchParams?.state);

  return <DashboardShell active="Estoque">
    <h1 className="text-2xl font-semibold text-slate-950">Fornecedores</h1>
    <p className="mb-6 mt-1 text-sm text-muted-foreground">Gestão de parceiros homologados e planejados para compras.</p>
    {state === "default" ? <Card>
      <CardHeader><CardTitle>Base de fornecedores</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {suppliers.map((supplier) => <div key={supplier.id} className="rounded-2xl border border-border p-4 text-sm"><p className="font-medium text-slate-900">{supplier.nome}</p><p className="text-muted-foreground">Contato: {supplier.contato}</p><p>Lead time: {supplier.leadTimeDias} dias</p><p className="mt-2"><Badge tone={supplier.status === "ativo" ? "success" : "warning"}>{supplier.status === "ativo" ? "ativo" : "em análise"}</Badge></p></div>)}
      </CardContent>
    </Card> : <InventoryStateBlock state={state} entity="fornecedores" />}
  </DashboardShell>;
}
