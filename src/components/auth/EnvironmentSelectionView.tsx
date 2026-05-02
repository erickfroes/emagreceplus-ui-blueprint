import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";

type EnvironmentItem = { id: string; clinicName: string; role: string; location: string; status: "ativo" | "inativo" | "simulado" };

export function EnvironmentSelectionView({ items, state = "default" }: { items: EnvironmentItem[]; state?: "default" | "loading" | "empty" | "error" | "forbidden" }) {
  if (state === "loading") return <LoadingState title="Carregando unidades" />;
  if (state === "error") return <ErrorState title="Falha ao carregar unidades" />;
  if (state === "forbidden") return <ForbiddenState title="Acesso bloqueado às unidades" />;
  if (state === "empty" || !items.length) return <EmptyState title="Ambientes indisponíveis" />;

  return (
    <div className="w-full max-w-3xl space-y-3">
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="flex items-center justify-between gap-4">
            <div>
              <p className="text-base font-semibold text-slate-950">{item.clinicName}</p>
              <p className="text-sm text-slate-600">{item.role} • {item.location}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge tone={item.status === "ativo" ? "success" : item.status === "simulado" ? "warning" : "neutral"}>{item.status}</Badge>
              <Button type="submit" name="unitId" value={item.id} variant="outline">Entrar</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
