export type UIState = "default" | "loading" | "empty" | "error" | "forbidden";

export type ProfessionalRole = "nutritionist" | "physician";

export type MealPlanItem = {
  id: string;
  horario: string;
  refeicao: string;
  metaRefeicao: string;
  fonteProteica: string;
  carboidrato: string;
  gorduraBoa: string;
  fibra: string;
  observacao?: string;
};

export type NutritionPlanHistory = {
  id: string;
  nome: string;
  data: string;
  status: "modelo" | "enviado" | "ajuste";
};

export type NutritionPlan = {
  id: string;
  patientId: string;
  patientName: string;
  objetivo: string;
  validade: string;
  role: ProfessionalRole;
  kcal: number;
  macroSplit: {
    proteinPct: number;
    carbPct: number;
    fatPct: number;
  };
  itens: MealPlanItem[];
  historico: NutritionPlanHistory[];
};

export const nutritionPlans: Record<string, NutritionPlan> = {
  pat_001: {
    id: "plan_001",
    patientId: "pat_001",
    patientName: "Fernanda Souza",
    objetivo: "Ajuste de composição corporal com foco em saciedade e constância.",
    validade: "2026-05-31",
    role: "nutritionist",
    kcal: 1850,
    macroSplit: { proteinPct: 30, carbPct: 40, fatPct: 30 },
    itens: [
      {
        id: "m1",
        horario: "07:30",
        refeicao: "Café da manhã",
        metaRefeicao: "Saciedade até o almoço com energia estável.",
        fonteProteica: "Iogurte natural + chia",
        carboidrato: "Aveia em flocos",
        gorduraBoa: "Pasta de amendoim",
        fibra: "Banana + canela",
      },
      {
        id: "m2",
        horario: "12:30",
        refeicao: "Almoço",
        metaRefeicao: "Volume alto de vegetais e digestão confortável.",
        fonteProteica: "Frango grelhado",
        carboidrato: "Arroz integral",
        gorduraBoa: "Azeite extra virgem",
        fibra: "Mix de folhas e legumes",
        observacao: "Priorizar prato com 50% de vegetais.",
      },
      {
        id: "m3",
        horario: "19:30",
        refeicao: "Jantar",
        metaRefeicao: "Leveza no período noturno sem longos jejuns.",
        fonteProteica: "Omelete com cottage",
        carboidrato: "Quinoa",
        gorduraBoa: "Abacate em cubos",
        fibra: "Brócolis no vapor",
      },
    ],
    historico: [
      { id: "h1", nome: "Plano Base Reeducação", data: "2026-03-10", status: "modelo" },
      { id: "h2", nome: "Plano Ajuste Abril", data: "2026-04-01", status: "enviado" },
      { id: "h3", nome: "Plano Atual", data: "2026-04-25", status: "ajuste" },
    ],
  },
};

export function getStateFromParam(stateParam: string | null): UIState {
  if (stateParam === "loading" || stateParam === "empty" || stateParam === "error" || stateParam === "forbidden") {
    return stateParam;
  }
  return "default";
}
