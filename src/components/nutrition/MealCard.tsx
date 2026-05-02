import { Card, CardContent } from "@/components/ui/Card";
import { FoodGroupChip } from "@/components/nutrition/FoodGroupChip";
import type { MealPlanItem } from "@/data/mock/nutrition";

type MealCardProps = {
  item: MealPlanItem;
};

export function MealCard({ item }: MealCardProps) {
  return (
    <Card className="rounded-2xl border border-border bg-white shadow-sm">
      <CardContent className="space-y-2 p-4">
        <p className="text-xs text-muted-foreground">{item.horario} • {item.refeicao}</p>
        <div className="grid gap-2 text-sm">
          <p><FoodGroupChip label="Fonte proteica" /> <span className="ml-2">{item.fonteProteica}</span></p>
          <p><FoodGroupChip label="Carboidrato" /> <span className="ml-2">{item.carboidrato}</span></p>
          <p><FoodGroupChip label="Gordura boa" /> <span className="ml-2">{item.gorduraBoa}</span></p>
          <p><FoodGroupChip label="Fibra" /> <span className="ml-2">{item.fibra}</span></p>
        </div>
        <p className="text-xs text-muted-foreground">Meta da refeição: {item.metaRefeicao}</p>
        {item.observacao ? <p className="text-xs text-slate-600">{item.observacao}</p> : null}
      </CardContent>
    </Card>
  );
}
