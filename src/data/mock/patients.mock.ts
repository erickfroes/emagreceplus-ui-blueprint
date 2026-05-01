import type { Patient, PatientDetail } from "@/contracts/patients";

export const patientsMock: Patient[] = [
  { id: "pat_001", nome: "Fernanda Souza", plano: "Premium", status: "em_tratamento", ultimaConsulta: "2026-04-25", proximaConsulta: "2026-05-06", adesaoPercentual: 84, metasAtivas: 3, pendencias: 1 },
  { id: "pat_002", nome: "Carlos Lima", plano: "Essential", status: "estavel", ultimaConsulta: "2026-04-18", proximaConsulta: "2026-05-10", adesaoPercentual: 72, metasAtivas: 2, pendencias: 0 },
  { id: "pat_003", nome: "Juliana Prado", plano: "Premium", status: "risco_aderencia", ultimaConsulta: "2026-04-12", proximaConsulta: "2026-05-03", adesaoPercentual: 51, metasAtivas: 4, pendencias: 2 },
];

export const patientDetailsMock: Record<string, PatientDetail> = {
  pat_001: {
    patient: patientsMock[0], resumoClinico: "Paciente com boa evolução de adesão ao plano alimentar e rotina de atividade física regular.",
    objetivos: ["Reduzir 4% de gordura corporal", "Aumentar ingestão hídrica diária", "Manter rotina de treino 4x/semana"],
    sinais: [{ label: "Peso", valor: "73,2 kg" }, { label: "IMC", valor: "27,1" }, { label: "Sono médio", valor: "7h12" }],
    timeline: [{ id: "ev1", data: "2026-04-25", titulo: "Consulta de retorno", descricao: "Ajuste de plano alimentar com foco em saciedade." }, { id: "ev2", data: "2026-04-20", titulo: "Check-in semanal", descricao: "Paciente reportou adesão de 90% durante a semana." }],
  },
};
