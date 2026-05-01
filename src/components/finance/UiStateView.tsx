import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { UiState } from "@/data/mock/finance";

export function UiStateView({ state, children, title }: { state: UiState; children: React.ReactNode; title: string }) {
  if (state === "loading") return <Card><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent>Carregando dados financeiros simulados...</CardContent></Card>;
  if (state === "empty") return <Card><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent>Nenhum dado encontrado para os filtros aplicados.</CardContent></Card>;
  if (state === "error") return <Card><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent>Erro ao carregar mocks. Tente novamente.</CardContent></Card>;
  if (state === "forbidden") return <Card><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent>Você não tem acesso a este módulo.</CardContent></Card>;
  return <>{children}</>;
}
