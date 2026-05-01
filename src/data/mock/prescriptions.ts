import type { ProfessionalRole } from "./nutrition";

export type GuidanceType = "orientacao_nutricional" | "prescricao_medica";

export type GuidanceItem = {
  id: string;
  tipo: GuidanceType;
  titulo: string;
  descricao: string;
  medicamento?: string;
};

export type PrescriptionDocument = {
  id: string;
  patientName: string;
  createdAt: string;
  professionalRole: ProfessionalRole;
  itens: GuidanceItem[];
};

export const prescriptionDocuments: Record<string, PrescriptionDocument> = {
  presc_001: {
    id: "presc_001",
    patientName: "Fernanda Souza",
    createdAt: "2026-04-28",
    professionalRole: "nutritionist",
    itens: [
      {
        id: "g1",
        tipo: "orientacao_nutricional",
        titulo: "Hidratação estruturada",
        descricao: "Consumir 35 ml/kg/dia e distribuir em 6 momentos ao longo do dia.",
      },
      {
        id: "g2",
        tipo: "prescricao_medica",
        titulo: "Uso de metformina",
        descricao: "Avaliar continuidade conforme médico assistente.",
        medicamento: "Metformina 500mg",
      },
    ],
  },
};

export function getVisibleItemsByRole(document: PrescriptionDocument): GuidanceItem[] {
  if (document.professionalRole === "nutritionist") {
    return document.itens.filter((item) => item.tipo !== "prescricao_medica" && item.medicamento?.toLowerCase().includes("metformina") !== true);
  }
  return document.itens;
}
