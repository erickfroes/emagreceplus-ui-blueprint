import { createHash } from "crypto";

export type AsaasConfig = {
  env: "sandbox" | "production";
  baseUrl: string;
  apiKey?: string;
  webhookToken?: string;
};

export type BillingType = "PIX" | "BOLETO" | "CREDIT_CARD";
export type AsaasChargeStatus = "PENDING" | "RECEIVED" | "OVERDUE" | "CANCELED" | "REFUNDED";
export type AsaasWebhookEvent = "PAYMENT_CONFIRMED" | "PAYMENT_OVERDUE" | "PAYMENT_CANCELED" | "PAYMENT_REFUNDED";

export type CreateCustomerInput = {
  tenantId: string;
  patientId: string;
  name: string;
  cpfCnpj: string;
  email?: string;
};

export type CreateChargeInput = {
  tenantId: string;
  patientId: string;
  customerId: string;
  receivableId: string;
  value: number;
  dueDate: string;
  description: string;
  externalReference: string;
  billingType: BillingType;
};

export type AsaasWebhookPayload = {
  id: string;
  event: AsaasWebhookEvent;
  payment: { id: string; externalReference: string; value: number; billingType: BillingType; dueDate: string };
  occurredAt: string;
};

const processedEvents = new Set<string>();
const receivableSettlement = new Set<string>();

export function getAsaasConfigFromEnv(): AsaasConfig {
  return {
    env: (process.env.ASAAS_ENV as "sandbox" | "production") ?? "sandbox",
    baseUrl: process.env.ASAAS_BASE_URL ?? "https://api-sandbox.asaas.com/v3",
    apiKey: process.env.ASAAS_API_KEY,
    webhookToken: process.env.ASAAS_WEBHOOK_TOKEN,
  };
}

export function getAsaasPublicConfig(config = getAsaasConfigFromEnv()) {
  return { env: config.env, baseUrl: config.baseUrl, providerStatus: "simulado" as const };
}

export async function createAsaasCustomer(input: CreateCustomerInput) {
  return { ok: true as const, providerStatus: "simulado" as const, customerId: `sim_customer_${input.patientId}` };
}

export async function createAsaasCharge(input: CreateChargeInput) {
  return {
    ok: true as const,
    providerStatus: "simulado" as const,
    chargeId: `sim_charge_${input.receivableId}`,
    status: "PENDING" as AsaasChargeStatus,
  };
}

export function verifyAsaasWebhookToken(receivedToken: string | null, config = getAsaasConfigFromEnv()) {
  if (!config.webhookToken || !receivedToken) return false;
  return receivedToken === config.webhookToken;
}

export function hashWebhookPayload(payload: AsaasWebhookPayload) {
  return createHash("sha256").update(JSON.stringify(payload)).digest("hex");
}

export function processAsaasWebhook(payload: AsaasWebhookPayload) {
  if (processedEvents.has(payload.id)) {
    return { ok: true as const, result: "duplicate_ignored" as const, payloadHash: hashWebhookPayload(payload) };
  }

  processedEvents.add(payload.id);
  const payloadHash = hashWebhookPayload(payload);
  const key = payload.payment.externalReference;

  if (payload.event === "PAYMENT_CONFIRMED") {
    if (receivableSettlement.has(key)) {
      return { ok: true as const, result: "already_settled" as const, payloadHash };
    }

    receivableSettlement.add(key);
    return { ok: true as const, result: "settled_once" as const, payloadHash };
  }

  if (payload.event === "PAYMENT_REFUNDED") {
    receivableSettlement.delete(key);
  }

  return { ok: true as const, result: "status_updated" as const, payloadHash };
}
