import type { ProfessionalRole } from "./nutrition";

export type PrescriptionTab = "prescricao_medica" | "suplementacao" | "orientacoes_nutricionais" | "orientacoes_gerais";
export type PrescriptionStatus = "rascunho" | "emitida" | "assinatura_pendente";

export type GuidanceItem = {
  id: string;
  tab: PrescriptionTab;
  titulo: string;
  descricao: string;
};

export type PrescriptionHistoryEntry = {
  id: string;
  data: string;
  status: PrescriptionStatus;
  acao: string;
};

export type PrescriptionDocument = {
  id: string;
  patientName: string;
  createdAt: string;
  professionalRole: ProfessionalRole;
  professionalName: string;
  professionalRegistry: string;
  status: PrescriptionStatus;
  itens: GuidanceItem[];
  historico: PrescriptionHistoryEntry[];
};

export const prescriptionDocuments: Record<string, PrescriptionDocument> = {
  presc_001: {
    id: "presc_001",
    patientName: "Fernanda Souza",
    createdAt: "2026-04-28",
    professionalRole: "nutritionist",
    professionalName: "Dra. Camila Nogueira",
    professionalRegistry: "CRN 12345",
    status: "assinatura_pendente",
    itens: [
      { id: "g1", tab: "orientacoes_nutricionais", titulo: "Hidratação estruturada", descricao: "Consumir água ao longo do dia em momentos distribuídos." },
      { id: "g2", tab: "suplementacao", titulo: "Whey protein", descricao: "1 porção após treino conforme tolerância alimentar." },
      { id: "g3", tab: "orientacoes_gerais", titulo: "Organização de rotina", descricao: "Planejar compras e preparo semanal para facilitar adesão." },
    ],
    historico: [
      { id: "p1", data: "2026-04-25", status: "rascunho", acao: "Rascunho inicial salvo" },
      { id: "p2", data: "2026-04-28", status: "emitida", acao: "Documento gerado" },
      { id: "p3", data: "2026-04-28", status: "assinatura_pendente", acao: "Enviado para assinatura simulada" },
    ],
  },
};

export function getVisibleItemsByRole(document: PrescriptionDocument): GuidanceItem[] {
  if (document.professionalRole === "nutritionist") {
    return document.itens.filter((item) => item.tab !== "prescricao_medica");
  }
  return document.itens;
}
