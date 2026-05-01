import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { environmentSelectionMock } from "@/data/mock/auth";

export function EnvironmentSelectionView() {
  if (environmentSelectionMock.state !== "ready") return <EmptyState title="Ambientes indisponíveis" />;

  return (
    <div className="w-full max-w-3xl space-y-3">
      {environmentSelectionMock.items.map((item) => (
        <Card key={item.id}>
          <CardContent className="flex items-center justify-between gap-4">
            <div>
              <p className="text-base font-semibold text-slate-950">{item.clinicName}</p>
              <p className="text-sm text-slate-600">{item.role} • {item.location}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge tone={item.status === "ativo" ? "success" : item.status === "simulado" ? "warning" : "neutral"}>{item.status}</Badge>
              <Button variant="outline">Entrar</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
