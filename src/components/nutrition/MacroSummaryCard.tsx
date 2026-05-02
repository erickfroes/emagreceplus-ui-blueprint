import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

type MacroSummaryCardProps = {
  kcal: number;
  proteinPct: number;
  carbPct: number;
  fatPct: number;
};

export function MacroSummaryCard({ kcal, proteinPct, carbPct, fatPct }: MacroSummaryCardProps) {
  return (
    <Card>
      <CardHeader><CardTitle>Resumo de metas do plano</CardTitle></CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl border p-3"><p className="text-xs text-muted-foreground">Kcal diária</p><p className="text-lg font-semibold">{kcal} kcal</p></div>
        <div className="rounded-2xl border p-3"><p className="text-xs text-muted-foreground">Fonte proteica</p><p className="text-lg font-semibold">{proteinPct}%</p></div>
        <div className="rounded-2xl border p-3"><p className="text-xs text-muted-foreground">Carboidrato</p><p className="text-lg font-semibold">{carbPct}%</p></div>
        <div className="rounded-2xl border p-3"><p className="text-xs text-muted-foreground">Gordura boa</p><p className="text-lg font-semibold">{fatPct}%</p></div>
      </CardContent>
    </Card>
  );
}
