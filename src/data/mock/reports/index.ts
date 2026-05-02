export type ReportUiState = "default" | "loading" | "empty" | "error" | "forbidden";

export interface ReportMeta {
  title: string;
  subtitle: string;
  lastUpdated: string;
  state: ReportUiState;
}

export interface ChartDatum {
  label: string;
  value: number;
}

export interface TableRow {
  id: string;
  name: string;
  metric: string;
  variation: string;
}

export interface StrategicAlert {
  id: string;
  title: string;
  owner: string;
  severity: "alta" | "media" | "baixa";
  status: string;
}

export interface FinancialUnitRow {
  id: string;
  unit: string;
  revenue: string;
  margin: string;
  delinquency: string;
  variation: string;
}

export interface PackageFunnelRow {
  id: string;
  stage: string;
  volume: string;
  conversion: string;
  cycle: string;
}

export interface InventoryConsumptionKpi {
  id: string;
  label: string;
  value: string;
  context: string;
}

export const financeReportMock = {
  meta: {
    title: "Relatórios Financeiros",
    subtitle: "Acompanhe faturamento, inadimplência e margem operacional por unidade.",
    lastUpdated: "2026-05-02 08:40",
    state: "default",
  } as ReportMeta,
  hasFinancialPermission: true,
  kpis: [
    { label: "Receita mensal", value: "R$ 128.500" },
    { label: "Ticket médio", value: "R$ 1.240" },
    { label: "Inadimplência", value: "4,2%" },
  ],
  chart: [
    { label: "Jan", value: 78 },
    { label: "Fev", value: 92 },
    { label: "Mar", value: 88 },
    { label: "Abr", value: 100 },
  ] as ChartDatum[],
  unitRows: [
    { id: "fin-unit-1", unit: "Unidade Centro", revenue: "R$ 58.400", margin: "29%", delinquency: "3,1%", variation: "+6,4%" },
    { id: "fin-unit-2", unit: "Unidade Norte", revenue: "R$ 41.900", margin: "24%", delinquency: "4,7%", variation: "+3,8%" },
    { id: "fin-unit-3", unit: "Unidade Sul", revenue: "R$ 28.200", margin: "22%", delinquency: "5,2%", variation: "-1,4%" },
  ] as FinancialUnitRow[],
};

export const packagesReportMock = {
  meta: {
    title: "Relatórios de Planos e Pacotes",
    subtitle: "Desempenho comercial por funil, conversão e recorrência.",
    lastUpdated: "2026-05-02 08:15",
    state: "default",
  } as ReportMeta,
  chart: [
    { label: "Leads", value: 210 },
    { label: "Propostas", value: 148 },
    { label: "Vendas", value: 67 },
  ] as ChartDatum[],
  rows: [
    { id: "pkg-1", name: "Plano Premium 6 meses", metric: "48 ativos", variation: "+12%" },
    { id: "pkg-2", name: "Pacote Intensivo 90 dias", metric: "19 ativos", variation: "+4%" },
    { id: "pkg-3", name: "Plano Essencial 3 meses", metric: "33 ativos", variation: "+8%" },
  ] as TableRow[],
  funnelRows: [
    { id: "funnel-1", stage: "Contato qualificado", volume: "210", conversion: "100%", cycle: "—" },
    { id: "funnel-2", stage: "Proposta enviada", volume: "148", conversion: "70%", cycle: "2,1 dias" },
    { id: "funnel-3", stage: "Fechamento", volume: "67", conversion: "45%", cycle: "4,8 dias" },
  ] as PackageFunnelRow[],
};

export const inventoryReportMock = {
  meta: {
    title: "Relatórios de Estoque",
    subtitle: "Itens críticos, giro e consumo médio por categoria e unidade.",
    lastUpdated: "2026-05-02 07:55",
    state: "default",
  } as ReportMeta,
  chart: [
    { label: "Suplementos", value: 67 },
    { label: "Materiais", value: 43 },
    { label: "Descartáveis", value: 29 },
  ] as ChartDatum[],
  rows: [
    { id: "inv-1", name: "Ômega 3", metric: "12 unidades", variation: "-18%" },
    { id: "inv-2", name: "Vitamina D", metric: "8 unidades", variation: "-25%" },
    { id: "inv-3", name: "Whey sachê", metric: "16 unidades", variation: "-11%" },
  ] as TableRow[],
  consumptionKpis: [
    { id: "cons-1", label: "Consumo médio diário", value: "34 un/dia", context: "últimos 30 dias" },
    { id: "cons-2", label: "Cobertura projetada", value: "22 dias", context: "mix atual" },
    { id: "cons-3", label: "Rupturas evitáveis", value: "5 itens", context: "reposição sugerida" },
  ] as InventoryConsumptionKpi[],
};

export const executiveReportMock = {
  meta: {
    title: "Analytics Executivo",
    subtitle: "Panorama consolidado de operação, pacientes e performance estratégica.",
    lastUpdated: "2026-05-02 09:00",
    state: "default",
  } as ReportMeta,
  cards: [
    { label: "Pacientes ativos", value: "412" },
    { label: "Consultas no mês", value: "286" },
    { label: "Satisfação (NPS)", value: "74" },
  ],
  chart: [
    { label: "Operação", value: 82 },
    { label: "Financeiro", value: 76 },
    { label: "Clínico", value: 88 },
  ] as ChartDatum[],
  strategicAlerts: [
    { id: "alert-1", title: "Queda de conversão em pacotes premium", owner: "Comercial", severity: "alta", status: "Ação imediata" },
    { id: "alert-2", title: "Aumento de faltas no turno da manhã", owner: "Operações", severity: "media", status: "Monitorando" },
    { id: "alert-3", title: "Estoque crítico de suplementação", owner: "Suprimentos", severity: "alta", status: "Reposição em andamento" },
  ] as StrategicAlert[],
};

export const patientReportMock = {
  meta: {
    title: "Relatório do Paciente",
    subtitle: "Resumo visual da evolução clínica e aderência do plano.",
    lastUpdated: "2026-04-30 16:45",
    state: "default",
  } as ReportMeta,
  chart: [
    { label: "Aderência alimentar", value: 78 },
    { label: "Sono", value: 64 },
    { label: "Atividade física", value: 71 },
  ] as ChartDatum[],
  rows: [
    { id: "pat-1", name: "Peso", metric: "-3,2 kg", variation: "Últimos 60 dias" },
    { id: "pat-2", name: "Circunferência abdominal", metric: "-4,0 cm", variation: "Últimos 60 dias" },
  ] as TableRow[],
};
