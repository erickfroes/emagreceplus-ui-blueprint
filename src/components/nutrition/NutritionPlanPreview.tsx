import { DocumentPreviewCard } from "@/components/nutrition/DocumentPreviewCard";
import type { NutritionPlan } from "@/data/mock/nutrition";

export function NutritionPlanPreview({ plan }: { plan: NutritionPlan }) {
  return (
    <DocumentPreviewCard
      title={`Plano alimentar - ${plan.patientName}`}
      subtitle={`Documento simulado • validade ${plan.validade}`}
      sections={plan.itens.map((item) => ({
        heading: `${item.horario} - ${item.refeicao}`,
        lines: [
          `Meta da refeição: ${item.metaRefeicao}`,
          `Fonte proteica: ${item.fonteProteica}`,
          `Carboidrato: ${item.carboidrato}`,
          `Gordura boa: ${item.gorduraBoa}`,
          `Fibra: ${item.fibra}`,
        ],
      }))}
    />
  );
}
