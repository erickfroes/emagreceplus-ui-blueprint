export type UiState = "default" | "loading" | "empty" | "error" | "forbidden";

export const financeKpis = [
  { label: "Receita recebida", value: "R$ 128.400,00" },
  { label: "Contas a receber", value: "R$ 36.240,00" },
  { label: "Inadimplência", value: "R$ 8.920,00" },
  { label: "Repasses pendentes", value: "R$ 15.780,00" },
];

export const receivables = [
  { id: "REC-1044", patient: "Aline Costa", service: "Pacote Vital 90 dias", dueDate: "2026-05-12", amount: "R$ 890,00", status: "Pendente" },
  { id: "REC-1045", patient: "Marcos Freitas", service: "Consulta retorno", dueDate: "2026-05-14", amount: "R$ 320,00", status: "Vencendo" },
];

export const services = [
  { code: "SRV-01", name: "Consulta inicial", price: "R$ 420,00", category: "Consultas", accessAction: "Revisar acesso" },
  { code: "SRV-02", name: "Bioimpedância premium", price: "R$ 190,00", category: "Exames", accessAction: "Restringir recursos" },
];

export const packages = [
  { id: "PKG-01", name: "Shape 12 Semanas", sessions: 8, price: "R$ 2.490,00", status: "Ativo", action: "Editar nova versão" },
  { id: "PKG-02", name: "Reset Metabólico", sessions: 6, price: "R$ 1.690,00", status: "Em revisão", action: "Editar" },
];

export const overdue = [
  { patient: "Patrícia Ramos", days: 17, amount: "R$ 640,00", plan: "Pacote Shape 12 Semanas" },
  { patient: "Igor Nunes", days: 31, amount: "R$ 1.180,00", plan: "Plano anual" },
];
