import type { PatientReportDto } from "@/contracts/patient-report";

const defaultPatientReport: PatientReportDto = {
  state: "default",
  financialState: "default",
  header: {
    patientName: "Mariana Rocha",
    patientAge: 34,
    patientStatus: "Em acompanhamento",
    activePackage: "Programa Metabólico 12 semanas",
    financialStatus: "Adimplente com 1 parcela a vencer",
    clinicalStatus: "Boa adesão, sem alertas críticos",
  },
  defaultTab: "financial",
  kpis: [
    { id: "total", label: "Total contratado", value: "R$ 2.890,00" },
    { id: "paid", label: "Pago", value: "R$ 2.167,50" },
    { id: "open", label: "Em aberto", value: "R$ 722,50" },
    { id: "services", label: "Serviços utilizados", value: "8 de 12" },
    { id: "docs", label: "Documentos assinados", value: "2 de 3" },
    { id: "adherence", label: "Adesão ao plano", value: "86%" },
  ],
  installments: [
    { id: "parc-1", dueDate: "10/02/2026", installment: "Parcela 1/4", amount: "R$ 722,50", status: "Paga" },
    { id: "parc-2", dueDate: "10/03/2026", installment: "Parcela 2/4", amount: "R$ 722,50", status: "Paga" },
    { id: "parc-3", dueDate: "10/04/2026", installment: "Parcela 3/4", amount: "R$ 722,50", status: "Paga" },
    { id: "parc-4", dueDate: "10/05/2026", installment: "Parcela 4/4", amount: "R$ 722,50", status: "Pendente" },
  ],
  consumedServices: [
    { id: "srv-1", date: "01/04/2026", service: "Consulta de retorno", consumed: "1 sessão", status: "Realizado" },
    { id: "srv-2", date: "15/04/2026", service: "Ajuste de plano alimentar", consumed: "1 entrega", status: "Realizado" },
    { id: "srv-3", date: "22/04/2026", service: "Check-in de adesão", consumed: "1 sessão", status: "Realizado" },
  ],
  documents: [
    { id: "doc-1", document: "Contrato do programa", provider: "interno", updatedAt: "08/02/2026", status: "Assinado" },
    { id: "doc-2", document: "Consentimento de acompanhamento", provider: "d4sign", updatedAt: "08/02/2026", status: "Assinado" },
    { id: "doc-3", document: "Termo de atualização clínica", provider: "d4sign", updatedAt: "29/04/2026", status: "Pendente" },
  ],
  timeline: [
    { id: "tl-1", date: "29/04/2026", title: "Avaliação física", description: "Paciente manteve tendência de melhora da composição corporal." },
    { id: "tl-2", date: "15/04/2026", title: "Revisão alimentar", description: "Ajustado plano com foco em rotina de trabalho híbrida." },
  ],
  sidebar: [
    { id: "a-1", title: "Pagamento atrasado", description: "Sem atrasos atualmente. Próxima parcela vence em 8 dias." },
    { id: "a-2", title: "Pacote perto do fim", description: "Restam 4 serviços no pacote ativo." },
    { id: "a-3", title: "Documento pendente", description: "Termo de atualização clínica aguardando assinatura (simulado)." },
    { id: "a-4", title: "Próxima consulta", description: "Retorno nutricional em 06/05/2026 às 09:00." },
  ],
};

export const patientReportMockByState: Record<string, PatientReportDto> = {
  default: defaultPatientReport,
  loading: { ...defaultPatientReport, state: "loading" },
  empty: { ...defaultPatientReport, state: "empty", kpis: [], installments: [], consumedServices: [], documents: [], timeline: [], sidebar: [] },
  error: { ...defaultPatientReport, state: "error" },
  forbidden: { ...defaultPatientReport, state: "forbidden" },
  forbidden_financial: { ...defaultPatientReport, financialState: "forbidden" },
};

export const patientReportMockData = patientReportMockByState.default;
