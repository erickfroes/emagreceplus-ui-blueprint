import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { InventoryStateBlock } from "@/components/inventory/InventoryStateBlock";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { inventoryItems, isExpired, resolveInventoryUiState } from "@/data/mock/inventory";

export default function InventoryDashboardPage({ searchParams }: { searchParams?: { state?: string } }) {
  const state = resolveInventoryUiState(searchParams?.state);
  const expired = inventoryItems.filter((i) => isExpired(i.validade)).length;
  const lowStock = inventoryItems.filter((i) => i.quantidade < i.estoqueMinimo).length;

  return (
    <DashboardShell active="Estoque">
      <PageHeader title="Dashboard de estoque" description="Resumo operacional de itens, validade e risco de ruptura (dados simulados)." />
      {state === "default" ? (
        <>
          <div className="ep-kpi-grid mb-6">
            <StatCard title="Itens monitorados" value={String(inventoryItems.length)} />
            <StatCard title="Abaixo do mínimo" value={String(lowStock)} />
            <StatCard title="Com validade vencida" value={String(expired)} />
          </div>
          <div className="text-sm text-muted-foreground">
            Acesse <Link className="text-primary-700 underline" href="/inventory/items">Itens do estoque</Link>, <Link className="text-primary-700 underline" href="/purchases">Compras</Link> e <Link className="text-primary-700 underline" href="/suppliers">Fornecedores</Link>.
          </div>
        </>
      ) : <InventoryStateBlock state={state} entity="dados de estoque" />}
    </DashboardShell>
  );
}
