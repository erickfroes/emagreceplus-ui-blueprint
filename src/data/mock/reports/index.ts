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

export const financeReportMock = {
  meta: {
    title: "Relatórios Financeiros",
    subtitle: "Acompanhe faturamento, inadimplência e margem operacional.",
    lastUpdated: "2026-04-30 18:40",
    state: "default",
  } as ReportMeta,
  hasFinancialPermission: false,
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
};

export const packagesReportMock = {
  meta: {
    title: "Relatórios de Planos e Pacotes",
    subtitle: "Desempenho comercial por tipo de plano e recorrência.",
    lastUpdated: "2026-04-30 18:20",
    state: "default",
  } as ReportMeta,
  chart: [
    { label: "Starter", value: 32 },
    { label: "Premium", value: 54 },
    { label: "Intensivo", value: 21 },
  ] as ChartDatum[],
  rows: [
    { id: "pkg-1", name: "Plano Premium 6 meses", metric: "48 ativos", variation: "+12%" },
    { id: "pkg-2", name: "Pacote Intensivo 90 dias", metric: "19 ativos", variation: "+4%" },
  ] as TableRow[],
};

export const inventoryReportMock = {
  meta: {
    title: "Relatórios de Estoque",
    subtitle: "Itens críticos, giro e cobertura estimada por categoria.",
    lastUpdated: "2026-04-30 17:55",
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
  ] as TableRow[],
};

export const executiveReportMock = {
  meta: {
    title: "Visão Executiva",
    subtitle: "Panorama consolidado de operação, pacientes e performance.",
    lastUpdated: "2026-04-30 19:00",
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
