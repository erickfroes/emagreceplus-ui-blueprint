export type AsaasConfig = {
  env: "sandbox" | "production";
  baseUrl: string;
  apiKey?: string;
  webhookToken?: string;
};

export type CreateChargeInput = {
  tenantId: string;
  patientId: string;
  customerId: string;
  value: number;
  dueDate: string;
  description: string;
  externalReference: string;
  billingType: "PIX" | "BOLETO" | "CREDIT_CARD" | "UNDEFINED";
};

export function getAsaasConfigFromEnv(): AsaasConfig {
  return {
    env: (process.env.ASAAS_ENV as "sandbox" | "production") ?? "sandbox",
    baseUrl: process.env.ASAAS_BASE_URL ?? "https://api-sandbox.asaas.com/v3",
    apiKey: process.env.ASAAS_API_KEY,
    webhookToken: process.env.ASAAS_WEBHOOK_TOKEN,
  };
}

export async function createAsaasCharge(_input: CreateChargeInput, config = getAsaasConfigFromEnv()) {
  if (!config.apiKey) {
    return { ok: false as const, code: "provider_config_missing", message: "ASAAS_API_KEY nao configurada." };
  }

  // Implementar chamada real server-side.
  // Nunca chamar Asaas diretamente do browser.
  return { ok: false as const, code: "not_implemented", message: "Adapter Asaas real pendente." };
}

export function verifyAsaasWebhookToken(receivedToken: string | null, config = getAsaasConfigFromEnv()) {
  if (!config.webhookToken || !receivedToken) return false;
  return receivedToken === config.webhookToken;
}
