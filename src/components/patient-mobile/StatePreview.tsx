import { AlertCircle, Ban, Loader2, SearchX } from "lucide-react";
import { Card } from "@/components/ui/Card";

type Props = {
  context: string;
};

const stateItems = [
  { key: "loading", label: "Carregando", description: "Sincronizando dados simulados.", icon: Loader2 },
  { key: "empty", label: "Sem dados", description: "Nenhum registro encontrado por enquanto.", icon: SearchX },
  { key: "error", label: "Erro", description: "Não foi possível atualizar. Tente novamente.", icon: AlertCircle },
  { key: "forbidden", label: "Acesso restrito", description: "Você não tem permissão para este conteúdo.", icon: Ban },
] as const;

export function StatePreview({ context }: Props) {
  return (
    <Card className="mt-5 rounded-2xl border-dashed p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Estados de interface · {context}</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {stateItems.map(({ key, label, description, icon: Icon }) => (
          <div key={key} className="rounded-xl border border-border bg-slate-50 p-2.5">
            <Icon className="h-4 w-4 text-slate-500" />
            <p className="mt-1 text-xs font-semibold text-slate-800">{label}</p>
            <p className="text-[11px] leading-tight text-slate-500">{description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
