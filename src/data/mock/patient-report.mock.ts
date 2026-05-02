import type { PatientReportDto } from "@/contracts/patient-report";

export const patientReportMockData: PatientReportDto = {
  state: "default",
  patientName: "Mariana Rocha",
  activePackage: "Programa Metabólico 12 semanas",
  financialStatus: "Adimplente com 1 parcela a vencer",
  clinicalStatus: "Boa adesão, sem alertas críticos",
  kpis: [
    { label: "Total contratado", value: "R$ 2.890,00" },
    { label: "Pago", value: "R$ 2.167,50" },
    { label: "Em aberto", value: "R$ 722,50" },
    { label: "Serviços utilizados", value: "8 de 12" },
    { label: "Documentos assinados", value: "2 de 2" },
    { label: "Adesão", value: "86%" },
  ],
  installments: [
    { id: "parc-1", date: "10/02/2026", description: "Parcela 1/4", value: "R$ 722,50", status: "paga" },
    { id: "parc-2", date: "10/03/2026", description: "Parcela 2/4", value: "R$ 722,50", status: "paga" },
    { id: "parc-3", date: "10/04/2026", description: "Parcela 3/4", value: "R$ 722,50", status: "paga" },
    { id: "parc-4", date: "10/05/2026", description: "Parcela 4/4", value: "R$ 722,50", status: "pendente" },
  ],
  consumedServices: [
    { id: "srv-1", date: "01/04/2026", description: "Consulta de retorno", value: "1 sessão", status: "realizado" },
    { id: "srv-2", date: "15/04/2026", description: "Ajuste de plano alimentar", value: "1 entrega", status: "realizado" },
  ],
  alerts: ["Última avaliação antropométrica há 28 dias.", "Parcela 4/4 vence em 8 dias."],
};
