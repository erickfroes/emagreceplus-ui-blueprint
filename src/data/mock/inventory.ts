export type InventoryUiState = "default" | "loading" | "empty" | "error" | "forbidden";

export type InventoryItem = {
  id: string;
  nome: string;
  categoria: "Suplemento" | "Descartável" | "Equipamento";
  unidade: string;
  lote: string;
  quantidade: number;
  estoqueMinimo: number;
  validade: string;
  local: string;
  fornecedor: string;
  custoUnitario: number;
};

export type Supplier = {
  id: string;
  nome: string;
  leadTimeDias: number;
  contato: string;
  status: "ativo" | "em_analise";
};

export type PurchaseOrder = {
  id: string;
  fornecedorId: string;
  data: string;
  status: "recebida" | "em_transito" | "atrasada";
  total: number;
};

export type StockOutputReason = "Uso em atendimento" | "Venda" | "Perda" | "Vencimento" | "Ajuste de inventário";

export type InventoryEncounterLink = {
  id: string;
  label: string;
  patientName: string;
  status: "disponivel" | "loading" | "empty" | "error" | "forbidden";
};

export const inventoryItems: InventoryItem[] = [
  { id: "item-whey", nome: "Whey isolado sachê", categoria: "Suplemento", unidade: "sachê", lote: "WHI-092", quantidade: 42, estoqueMinimo: 30, validade: "2026-08-21", local: "Depósito A", fornecedor: "NutriLab", custoUnitario: 8.9 },
  { id: "item-luva", nome: "Luva nitrílica P", categoria: "Descartável", unidade: "caixa", lote: "LVP-331", quantidade: 18, estoqueMinimo: 25, validade: "2027-01-10", local: "Sala 2", fornecedor: "MediCore", custoUnitario: 21.5 },
  { id: "item-bio", nome: "Balança de bioimpedância", categoria: "Equipamento", unidade: "un", lote: "BIO-110", quantidade: 2, estoqueMinimo: 1, validade: "2025-12-01", local: "Consultório 1", fornecedor: "HealthTech", custoUnitario: 7800 },
  { id: "item-omega", nome: "Ômega 3 frasco", categoria: "Suplemento", unidade: "frasco", lote: "OMG-771", quantidade: 6, estoqueMinimo: 10, validade: "2026-03-12", local: "Depósito A", fornecedor: "NutriLab", custoUnitario: 31.9 },
];

export const suppliers: Supplier[] = [
  { id: "sup-nutrilab", nome: "NutriLab", leadTimeDias: 4, contato: "compras@nutrilab.com", status: "ativo" },
  { id: "sup-medicore", nome: "MediCore", leadTimeDias: 7, contato: "contato@medicore.com", status: "ativo" },
  { id: "sup-healthtech", nome: "HealthTech", leadTimeDias: 10, contato: "suporte@healthtech.com", status: "em_analise" },
];

export const purchaseOrders: PurchaseOrder[] = [
  { id: "PO-1045", fornecedorId: "sup-nutrilab", data: "2026-04-27", status: "recebida", total: 1280 },
  { id: "PO-1046", fornecedorId: "sup-medicore", data: "2026-04-29", status: "em_transito", total: 920 },
  { id: "PO-1047", fornecedorId: "sup-healthtech", data: "2026-04-20", status: "atrasada", total: 5400 },
];

export const stockOutputReasons: StockOutputReason[] = ["Uso em atendimento", "Venda", "Perda", "Vencimento", "Ajuste de inventário"];

export const encounterLinksMock: InventoryEncounterLink[] = [
  { id: "ENC-2026-114", label: "ENC-2026-114", patientName: "Maria Silva", status: "disponivel" },
  { id: "ENC-2026-121", label: "ENC-2026-121", patientName: "João Souza", status: "disponivel" },
];

export function resolveInventoryUiState(raw?: string): InventoryUiState {
  if (raw === "loading" || raw === "empty" || raw === "error" || raw === "forbidden") return raw;
  return "default";
}

export function isExpired(validadeISO: string) {
  return new Date(validadeISO) < new Date("2026-05-01T00:00:00.000Z");
}
