import { AlertTriangle, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function StockMovementModalMock({
  title,
  currentStock,
  requested,
}: {
  title: string;
  currentStock: number;
  requested: number;
}) {
  const blocked = requested > currentStock;

  return (
    <Card className="border-dashed border-primary-200">
      <CardHeader>
        <CardTitle>{title} (modal visual)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">Movimento simulado para prototipação, sem integração backend.</p>
        <div className="rounded-2xl bg-slate-50 p-4 text-sm">
          <p>Estoque atual: <strong>{currentStock}</strong></p>
          <p>Quantidade solicitada: <strong>{requested}</strong></p>
          <p>Status: {blocked ? <Badge tone="danger">bloqueado por saldo insuficiente</Badge> : <Badge tone="success">pronto para registrar</Badge>}</p>
        </div>
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          <div className="flex items-center gap-2 font-medium"><ShieldAlert className="h-4 w-4" /> Aviso de auditoria</div>
          Todo movimento de entrada/saída deve manter trilha de aprovação, responsável e justificativa.
        </div>
        {blocked ? (
          <div className="rounded-2xl border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
            <div className="flex items-center gap-2 font-medium"><AlertTriangle className="h-4 w-4" /> Saída indisponível</div>
            A quantidade solicitada excede o estoque disponível e foi bloqueada visualmente.
          </div>
        ) : null}
        <div className="flex gap-2">
          <Button variant="outline">Cancelar</Button>
          <Button disabled={blocked}>{blocked ? "Bloqueado" : "Confirmar movimento"}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
