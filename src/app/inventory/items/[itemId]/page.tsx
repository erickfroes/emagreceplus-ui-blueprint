import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { InventoryMovementActions } from "@/components/inventory/InventoryMovementActions";
import { inventoryItems, isExpired } from "@/data/mock/inventory";

export default async function InventoryItemDetailPage({ params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params;
  const item = inventoryItems.find((i) => i.id === itemId);
  if (!item) return notFound();
  const expired = isExpired(item.validade);

  return <DashboardShell active="Estoque">
    <h1 className="text-2xl font-semibold text-slate-950">Detalhe do item</h1>
    <p className="mb-6 mt-1 text-sm text-muted-foreground">Visão de lote, validade e movimentos simulados para auditoria.</p>
    <Card className="mb-6"><CardHeader><CardTitle>{item.nome}</CardTitle></CardHeader><CardContent className="grid gap-2 text-sm md:grid-cols-2">
      <p>Lote: <strong>{item.lote}</strong></p><p>Local: <strong>{item.local}</strong></p><p>Saldo: <strong>{item.quantidade} {item.unidade}</strong></p><p>Estoque mínimo: <strong>{item.estoqueMinimo}</strong></p><p>Fornecedor: <strong>{item.fornecedor}</strong></p><p>Validade: <strong>{item.validade}</strong> {expired ? <Badge tone="danger">vencida</Badge> : <Badge tone="success">ok</Badge>}</p>
    </CardContent></Card>

    <InventoryMovementActions itemName={item.nome} unit={item.unidade} lot={item.lote} currentStock={item.quantidade} />
  </DashboardShell>;
}
