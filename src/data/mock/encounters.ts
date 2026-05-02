export type UIState = "default" | "loading" | "empty" | "error" | "forbidden";

export type ScheduleItem = {
  id: string;
  patientName: string;
  startTime: string;
  endTime: string;
  type: "Primeira consulta" | "Retorno" | "Teleconsulta";
  status: "confirmado" | "aguardando" | "cancelado";
  professional: string;
};

export type QueueColumnId = "aguardando" | "triagem" | "em_atendimento" | "finalizado";
export type QueueItem = { id: string; patientName: string; checkInAt: string; reason: string; priority: "normal" | "alta" };
export type QueueColumn = { id: QueueColumnId; title: string; actions: string[]; items: QueueItem[] };

export type SoapSection = {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  draftSavedAt: string;
  lastEditedAt: string;
  professional: string;
  patientName: string;
  clinicalContext: { alerts: string[]; metadata: Array<{ label: string; value: string }> };
};

export type AnamnesisStep = { id: string; title: string; description: string; fields: Array<{ label: string; value: string }> };

export const scheduleItems: ScheduleItem[] = [
  { id: "sch_001", patientName: "Fernanda Souza", startTime: "08:30", endTime: "09:10", type: "Retorno", status: "confirmado", professional: "Dra. Mariana Costa" },
  { id: "sch_002", patientName: "Carlos Lima", startTime: "09:20", endTime: "10:00", type: "Primeira consulta", status: "aguardando", professional: "Dra. Mariana Costa" },
  { id: "sch_003", patientName: "Juliana Prado", startTime: "10:20", endTime: "11:00", type: "Teleconsulta", status: "confirmado", professional: "Dra. Renato Alves" },
];

export const queueColumns: QueueColumn[] = [
  { id: "aguardando", title: "Aguardando", actions: ["Chamar para triagem", "Priorizar", "Cancelar check-in"], items: [{ id: "q_01", patientName: "Carlos Lima", checkInAt: "09:12", reason: "Revisão de plano", priority: "normal" }, { id: "q_02", patientName: "Ana Ribeiro", checkInAt: "09:25", reason: "Avaliação inicial", priority: "alta" }] },
  { id: "triagem", title: "Triagem", actions: ["Mover para atendimento", "Solicitar sinais vitais"], items: [{ id: "q_03", patientName: "Roberto Dias", checkInAt: "09:05", reason: "Retorno quinzenal", priority: "normal" }] },
  { id: "em_atendimento", title: "Em atendimento", actions: ["Abrir SOAP", "Pausar atendimento"], items: [{ id: "q_04", patientName: "Fernanda Souza", checkInAt: "08:58", reason: "Ajuste nutricional", priority: "normal" }] },
  { id: "finalizado", title: "Finalizado", actions: ["Ver resumo", "Agendar retorno"], items: [{ id: "q_05", patientName: "Marcos Teixeira", checkInAt: "08:20", reason: "Encerramento mensal", priority: "normal" }] },
];

export const soapByEncounterId: Record<string, SoapSection> = {
  enc_001: {
    patientName: "Fernanda Souza",
    subjective: "Paciente relata melhora de energia e adesão de 80% ao plano alimentar.",
    objective: "Peso 73,2kg, circunferência abdominal -1,2cm, sinais estáveis.",
    assessment: "Evolução positiva, manter progressão gradual para evitar efeito rebote.",
    plan: "Ajustar distribuição de proteínas, reforçar hidratação e manter treino 4x/semana.",
    draftSavedAt: "2026-05-02 10:42",
    lastEditedAt: "2026-05-02 11:08",
    professional: "Dra. Mariana Costa",
    clinicalContext: {
      alerts: ["Oscilação de sono em dias de plantão.", "Histórico familiar para diabetes tipo 2."],
      metadata: [
        { label: "Motivo", value: "Ajuste nutricional no retorno de 30 dias." },
        { label: "Status da evolução", value: "Em andamento (simulado)." },
      ],
    },
  },
};

export const anamnesisStepsByEncounterId: Record<string, AnamnesisStep[]> = {
  enc_001: [
    { id: "dados-gerais", title: "Dados gerais", description: "Dados de identificação e contexto inicial da consulta.", fields: [{ label: "Queixa principal", value: "Dificuldade para manter rotina alimentar aos fins de semana." }, { label: "Objetivo atual", value: "Melhorar composição corporal com foco em hábitos sustentáveis." }] },
    { id: "historia-clinica", title: "História clínica", description: "Condições prévias, medicações e histórico familiar relevante.", fields: [{ label: "Condições relevantes", value: "Sem comorbidades ativas reportadas no momento." }, { label: "Histórico familiar", value: "Pai com diabetes tipo 2; mãe com hipertensão controlada." }] },
    { id: "habitos", title: "Hábitos", description: "Rotina diária, hidratação e fatores de adesão.", fields: [{ label: "Hidratação", value: "~1,8L/dia, com meta de progressão para 2,2L." }, { label: "Rotina", value: "Maior dificuldade de adesão em fins de semana." }] },
    { id: "alimentacao", title: "Alimentação", description: "Padrões alimentares e distribuição atual das refeições.", fields: [{ label: "Padrão atual", value: "3 refeições principais + 1 lanche, com lapsos no jantar." }, { label: "Preferências", value: "Boa aceitação de preparações simples e planejamento semanal." }] },
    { id: "sono", title: "Sono", description: "Qualidade e consistência do sono na semana.", fields: [{ label: "Sono médio", value: "7 horas/noite, com variação em dias de plantão." }, { label: "Qualidade percebida", value: "Regular, com despertares ocasionais." }] },
    { id: "atividade-fisica", title: "Atividade física", description: "Frequência, intensidade e limitações percebidas.", fields: [{ label: "Frequência", value: "Musculação 3x/semana e caminhada leve 2x/semana." }, { label: "Barreiras", value: "Conciliação de horário em semanas mais intensas de trabalho." }] },
    { id: "objetivos", title: "Objetivos", description: "Metas terapêuticas negociadas para o próximo ciclo.", fields: [{ label: "Meta de 30 dias", value: "Consolidar rotina alimentar em 5 de 7 dias da semana." }, { label: "Indicadores", value: "Aderência ao plano, energia diária e medidas antropométricas." }] },
  ],
};
