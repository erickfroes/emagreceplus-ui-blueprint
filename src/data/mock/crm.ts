import type { UiState as UIState, CRMLeadContract } from "@/contracts";

export type CRMStage = "novo" | "qualificado" | "consulta_agendada" | "proposta_enviada" | "perdido" | "arquivado";

export type CRMLead = CRMLeadContract & {
  id: string;
  nome: string;
  objetivo: string;
  origem: "Instagram" | "Indicação" | "Google" | "Site";
  stage: CRMStage;
  responsavel: string;
  telefone: string;
  ultimaInteracaoEm: string;
  tags: string[];
  observacoes: string;
};

export type CRMStageColumn = {
  id: CRMStage;
  label: string;
};

export type { UIState };

export const crmStages: CRMStageColumn[] = [
  { id: "novo", label: "Novo" },
  { id: "qualificado", label: "Qualificado" },
  { id: "consulta_agendada", label: "Consulta agendada" },
  { id: "proposta_enviada", label: "Proposta enviada" },
  { id: "perdido", label: "Perdido" },
  { id: "arquivado", label: "Arquivado" },
];

export const crmLeads: CRMLead[] = [
  {
    id: "lead_001",
    tela: "crm/leads",
    fonteFutura: "supabase_future",
    nome: "Marina Gomes",
    objetivo: "Emagrecimento pós-parto",
    origem: "Instagram",
    stage: "novo",
    responsavel: "Dra. Julia",
    telefone: "(11) 99999-8888",
    ultimaInteracaoEm: "2026-04-29",
    tags: ["alto interesse", "retorno rápido"],
    observacoes: "Busca plano com acompanhamento semanal.",
  },
  {
    id: "lead_002",
    tela: "crm/leads",
    fonteFutura: "supabase_future",
    nome: "André Barros",
    objetivo: "Controle glicêmico",
    origem: "Google",
    stage: "qualificado",
    responsavel: "Dra. Julia",
    telefone: "(11) 98888-7777",
    ultimaInteracaoEm: "2026-04-30",
    tags: ["pré-diabetes"],
    observacoes: "Prefere consultas online no período noturno.",
  },
  {
    id: "lead_003",
    tela: "crm/leads",
    fonteFutura: "supabase_future",
    nome: "Livia Prado",
    objetivo: "Reeducação alimentar",
    origem: "Indicação",
    stage: "consulta_agendada",
    responsavel: "Dr. Caio",
    telefone: "(11) 97777-6666",
    ultimaInteracaoEm: "2026-04-28",
    tags: ["família", "plano premium"],
    observacoes: "Primeira consulta confirmada para próxima semana.",
  },
  {
    id: "lead_004",
    tela: "crm/leads",
    fonteFutura: "supabase_future",
    nome: "Rafael Dias",
    objetivo: "Hipertrofia com redução de gordura",
    origem: "Site",
    stage: "proposta_enviada",
    responsavel: "Dr. Caio",
    telefone: "(11) 96666-5555",
    ultimaInteracaoEm: "2026-04-27",
    tags: ["academia"],
    observacoes: "Aguardando aprovação da proposta de 12 semanas.",
  },
  {
    id: "lead_005",
    tela: "crm/leads",
    fonteFutura: "supabase_future",
    nome: "Camila Nunes",
    objetivo: "Perda de peso",
    origem: "Instagram",
    stage: "perdido",
    responsavel: "Dra. Julia",
    telefone: "(11) 95555-4444",
    ultimaInteracaoEm: "2026-04-20",
    tags: ["sem retorno"],
    observacoes: "Não respondeu após envio de proposta inicial.",
  },
];
