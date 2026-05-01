import { EmptyState } from "@/components/ui/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { type InventoryUiState } from "@/data/mock/inventory";

export function InventoryStateBlock({ state, entity }: { state: InventoryUiState; entity: string }) {
  if (state === "loading") return <p className="text-sm text-muted-foreground">Carregando {entity}...</p>;
  if (state === "error") return <p className="text-sm text-danger">Erro ao carregar {entity} simulados.</p>;
  if (state === "forbidden") return <p className="text-sm text-danger">Acesso negado para {entity}.</p>;
  if (state === "empty") {
    return (
      <Card>
        <CardHeader><CardTitle>{entity}</CardTitle></CardHeader>
        <CardContent><EmptyState title="Sem dados" description={`Nenhum registro de ${entity} encontrado.`} /></CardContent>
      </Card>
    );
  }
  return null;
}
