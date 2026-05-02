import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { InventoryMovementActions } from "@/components/inventory/InventoryMovementActions";
import { inventoryItems, isExpired, resolveInventoryUiState } from "@/data/mock/inventory";

export default async function InventoryItemDetailPage({ params, searchParams }: { params: Promise<{ itemId: string }>; searchParams?: Promise<{ state?: string }> }) {
  const state = resolveInventoryUiState((await searchParams)?.state);
  const { itemId } = await params;
  if (state === "loading") return <DashboardShell active="Estoque"><LoadingState title="Carregando item de estoque" /></DashboardShell>;
  if (state === "empty") return <DashboardShell active="Estoque"><EmptyState title="Item sem dados" description="Nenhum dado do item foi encontrado para este cenário simulado." /></DashboardShell>;
  if (state === "error") return <DashboardShell active="Estoque"><ErrorState title="Falha ao carregar item de estoque" /></DashboardShell>;
  if (state === "forbidden") return <DashboardShell active="Estoque"><ForbiddenState title="Acesso negado ao item de estoque" /></DashboardShell>;
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
