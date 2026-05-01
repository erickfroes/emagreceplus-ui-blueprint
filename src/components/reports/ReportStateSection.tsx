import { EmptyState } from "@/components/ui/EmptyState";
import type { ReportUiState } from "@/data/mock/reports";

export function ReportStateSection({ state, entity }: { state: ReportUiState; entity: string }) {
  if (state === "loading") return <p className="text-sm text-muted-foreground">Carregando {entity}...</p>;
  if (state === "error") return <p className="text-sm text-danger">Erro ao carregar {entity}.</p>;
  if (state === "forbidden") return <p className="text-sm text-danger">Acesso negado para {entity}.</p>;
  if (state === "empty") return <EmptyState title="Sem dados para exibir" description="Ajuste filtros para gerar o relatório visual." />;
  return null;
}
