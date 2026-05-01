import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { InventoryStateBlock } from "@/components/inventory/InventoryStateBlock";
import { inventoryItems, isExpired, resolveInventoryUiState } from "@/data/mock/inventory";

export default async function InventoryItemsPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const state = resolveInventoryUiState(resolvedSearchParams?.state);

  return <DashboardShell active="Estoque">
    <h1 className="text-2xl font-semibold text-slate-950">Itens do estoque</h1>
    <p className="mb-6 mt-1 text-sm text-muted-foreground">Catálogo com controle visual de saldo, validade e risco.</p>
    {state === "default" ? <Card>
      <CardHeader><CardTitle>Itens ativos ({inventoryItems.length})</CardTitle></CardHeader>
      <CardContent><table className="w-full text-left text-sm"><thead className="text-slate-500"><tr><th>Item</th><th>Saldo</th><th>Validade</th><th>Status</th></tr></thead><tbody>
        {inventoryItems.map((item) => {
          const expired = isExpired(item.validade);
          const low = item.quantidade < item.estoqueMinimo;
          return <tr key={item.id} className="border-t border-border"><td className="py-3"><Link href={`/inventory/items/${item.id}`} className="font-medium hover:underline">{item.nome}</Link></td><td>{item.quantidade} {item.unidade}</td><td>{item.validade}</td><td className="space-x-2">{expired ? <Badge tone="danger">validade vencida</Badge> : null}{low ? <Badge tone="warning">abaixo do mínimo</Badge> : <Badge tone="success">estável</Badge>}</td></tr>;
        })}
      </tbody></table></CardContent>
    </Card> : <InventoryStateBlock state={state} entity="itens de estoque" />}
  </DashboardShell>;
}
