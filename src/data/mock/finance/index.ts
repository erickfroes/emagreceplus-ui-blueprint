export type UiState = "default" | "loading" | "empty" | "error" | "forbidden";
export type BillingType = "PIX" | "BOLETO" | "CREDIT_CARD";
export type ReceivableStatus = "Pendente" | "Vencendo" | "Recebido" | "Vencido" | "Cancelado" | "Estornado";

export const asaasIntegrationPlan = {
  status: "simulado",
  serverSideOnly: true,
  apiKeyExposure: "bloqueado_no_browser",
  rls: "planejado",
  audit: "habilitado_simulado",
};

export const financeKpis = [
  { label: "Receita recebida", value: "R$ 128.400,00" },
  { label: "Contas a receber", value: "R$ 36.240,00" },
  { label: "Inadimplência", value: "R$ 8.920,00" },
  { label: "Repasses pendentes", value: "R$ 15.780,00" },
];

export const receivables = [
  { id: "REC-1044", patient: "Aline Costa", service: "Pacote Vital 90 dias", dueDate: "2026-05-12", amount: "R$ 890,00", status: "Pendente" as ReceivableStatus, externalReference: "invoice_rec_1044", allowedBillingTypes: ["PIX", "BOLETO", "CREDIT_CARD"] as BillingType[] },
  { id: "REC-1045", patient: "Marcos Freitas", service: "Consulta retorno", dueDate: "2026-05-14", amount: "R$ 320,00", status: "Vencendo" as ReceivableStatus, externalReference: "invoice_rec_1045", allowedBillingTypes: ["PIX", "BOLETO"] as BillingType[] },
];

export const webhookEvents = [
  { event: "PAYMENT_CONFIRMED", behavior: "baixa única", idempotencyKey: "asaas_evt_001", payloadHash: "sha256:simulado_001" },
  { event: "PAYMENT_OVERDUE", behavior: "atualiza inadimplência", idempotencyKey: "asaas_evt_002", payloadHash: "sha256:simulado_002" },
  { event: "PAYMENT_CANCELED", behavior: "marca cancelado", idempotencyKey: "asaas_evt_003", payloadHash: "sha256:simulado_003" },
  { event: "PAYMENT_REFUNDED", behavior: "marca estornado", idempotencyKey: "asaas_evt_004", payloadHash: "sha256:simulado_004" },
] as const;

export const auditTrail = [
  { at: "2026-04-28T09:11:00Z", action: "charge.created", detail: "Cobrança Pix simulada para REC-1044", actor: "financeiro@clinica" },
  { at: "2026-04-29T13:02:00Z", action: "webhook.processed", detail: "Evento PAYMENT_CONFIRMED processado com idempotência", actor: "asaas-webhook" },
];

export const overdue = [
  { patient: "Patrícia Ramos", days: 17, amount: "R$ 640,00", plan: "Pacote Shape 12 Semanas", origin: "PAYMENT_OVERDUE" },
  { patient: "Igor Nunes", days: 31, amount: "R$ 1.180,00", plan: "Plano anual", origin: "PAYMENT_OVERDUE" },
];
