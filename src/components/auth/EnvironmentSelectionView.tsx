import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";

type EnvironmentItem = { id: string; clinicName: string; role: string; location: string; status: "ativo" | "inativo" | "simulado" };

export function EnvironmentSelectionView({ items }: { items: EnvironmentItem[] }) {
  if (!items.length) return <EmptyState title="Ambientes indisponíveis" />;

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
