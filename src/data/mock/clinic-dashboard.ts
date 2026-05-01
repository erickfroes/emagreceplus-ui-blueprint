import type { UiState } from "./auth";

export type Kpi = {
  label: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down" | "neutral";
};

export type Appointment = {
  id: string;
  patient: string;
  time: string;
  professional: string;
  status: "confirmado" | "pendente" | "atrasado";
};

export type FunnelStage = { stage: string; count: number; conversion: string };
export type AlertItem = { id: string; title: string; tone: "warning" | "danger" | "info" };
export type Shortcut = { label: string; description: string };

export type ClinicDashboardMock = {
  state: UiState;
  kpis: Kpi[];
  agenda: Appointment[];
  funnel: FunnelStage[];
  alerts: AlertItem[];
  shortcuts: Shortcut[];
};

export const clinicDashboardMock: ClinicDashboardMock = {
  state: "ready",
  kpis: [
    { label: "Pacientes ativos", value: "248", trend: "+8% no mês", trendDirection: "up" },
    { label: "Consultas hoje", value: "31", trend: "+3 vs ontem", trendDirection: "up" },
    { label: "Taxa de no-show", value: "6.4%", trend: "-1.2 p.p.", trendDirection: "down" },
    { label: "MRR clínico", value: "R$ 84.200", trend: "estável", trendDirection: "neutral" },
  ],
  agenda: [
    { id: "a1", patient: "Marina Costa", time: "09:00", professional: "Dra. Paula", status: "confirmado" },
    { id: "a2", patient: "Lucas Prado", time: "10:30", professional: "Dr. Felipe", status: "pendente" },
    { id: "a3", patient: "Rita Menezes", time: "11:20", professional: "Dra. Paula", status: "atrasado" },
  ],
  funnel: [
    { stage: "Leads", count: 154, conversion: "100%" },
    { stage: "Triagem", count: 97, conversion: "63%" },
    { stage: "Avaliação", count: 61, conversion: "40%" },
    { stage: "Plano ativo", count: 42, conversion: "27%" },
  ],
  alerts: [
    { id: "al1", title: "3 pagamentos aguardando conciliação (simulado).", tone: "warning" },
    { id: "al2", title: "2 prontuários com assinatura pendente (D4Sign não configurado).", tone: "info" },
  ],
  shortcuts: [
    { label: "Novo paciente", description: "Cadastrar rapidamente um novo paciente" },
    { label: "Abrir agenda", description: "Visualizar encaixes e horários livres" },
    { label: "Criar plano", description: "Montar plano alimentar de acompanhamento" },
  ],
};
