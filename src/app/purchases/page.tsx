import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { InventoryStateBlock } from "@/components/inventory/InventoryStateBlock";
import { purchaseOrders, resolveInventoryUiState, suppliers } from "@/data/mock/inventory";

export default async function PurchasesPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const state = resolveInventoryUiState(resolvedSearchParams?.state);
  const supplierMap = new Map(suppliers.map((s) => [s.id, s.nome]));

  return <DashboardShell active="Estoque">
    <h1 className="text-2xl font-semibold text-slate-950">Compras</h1>
    <p className="mb-6 mt-1 text-sm text-muted-foreground">Pedidos e recebimentos simulados de suprimentos.</p>
    {state === "default" ? <Card>
      <CardHeader><CardTitle>Ordens de compra</CardTitle></CardHeader>
      <CardContent><table className="w-full text-left text-sm"><thead className="text-slate-500"><tr><th>Pedido</th><th>Fornecedor</th><th>Data</th><th>Total</th><th>Status</th></tr></thead><tbody>
        {purchaseOrders.map((order) => <tr key={order.id} className="border-t border-border"><td className="py-3 font-medium">{order.id}</td><td>{supplierMap.get(order.fornecedorId)}</td><td>{order.data}</td><td>R$ {order.total.toFixed(2)}</td><td><Badge tone={order.status === "atrasada" ? "danger" : order.status === "em_transito" ? "warning" : "success"}>{order.status.replace("_", " ")}</Badge></td></tr>)}
      </tbody></table></CardContent>
    </Card> : <InventoryStateBlock state={state} entity="pedidos de compras" />}
  </DashboardShell>;
}
