import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

type EncounterContextPanelProps = {
  alerts: string[];
  metadata: Array<{ label: string; value: string }>;
};

export function EncounterContextPanel({ alerts, metadata }: EncounterContextPanelProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Contexto clínico</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sinais de atenção</p>
          {alerts.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">Sem alertas no momento.</p>
          ) : (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {alerts.map((alert) => (
                <li key={alert}>{alert}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="space-y-2">
          {metadata.map((item) => (
            <div key={item.label} className="rounded-xl border border-border p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</p>
              <p className="mt-1 text-sm text-slate-700">{item.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
