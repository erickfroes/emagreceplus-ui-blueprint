export type UIState = "default" | "loading" | "empty" | "error" | "forbidden";

export type ProfessionalRole = "nutritionist" | "physician";

export type MealPlanItem = {
  id: string;
  horario: string;
  refeicao: string;
  fonteProteica: string;
  carboidrato: string;
  gorduraBoa: string;
  observacao?: string;
};

export type NutritionPlan = {
  id: string;
  patientId: string;
  patientName: string;
  objetivo: string;
  validade: string;
  role: ProfessionalRole;
  itens: MealPlanItem[];
};

export const nutritionPlans: Record<string, NutritionPlan> = {
  pat_001: {
    id: "plan_001",
    patientId: "pat_001",
    patientName: "Fernanda Souza",
    objetivo: "Ajuste de composição corporal com foco em saciedade e constância.",
    validade: "2026-05-31",
    role: "nutritionist",
    itens: [
      {
        id: "m1",
        horario: "07:30",
        refeicao: "Café da manhã",
        fonteProteica: "Iogurte natural + chia",
        carboidrato: "Aveia em flocos",
        gorduraBoa: "Pasta de amendoim",
      },
      {
        id: "m2",
        horario: "12:30",
        refeicao: "Almoço",
        fonteProteica: "Frango grelhado",
        carboidrato: "Arroz integral",
        gorduraBoa: "Azeite extra virgem",
        observacao: "Priorizar prato com 50% de vegetais.",
      },
    ],
  },
};

export function getStateFromParam(stateParam: string | null): UIState {
  if (stateParam === "loading" || stateParam === "empty" || stateParam === "error" || stateParam === "forbidden") {
    return stateParam;
  }
  return "default";
}
