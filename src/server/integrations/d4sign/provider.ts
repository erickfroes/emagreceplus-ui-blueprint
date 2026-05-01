import { isMockMode } from "@/lib/app-mode";
export type D4SignMode = "unconfigured" | "simulated" | "real";

export type D4SignConfig = {
  mode: D4SignMode;
  env: "sandbox" | "production";
  baseUrl?: string;
  tokenApi?: string;
  cryptKey?: string;
  safeUuid?: string;
  webhookSecret?: string;
  hmacStrategy?: "uuid" | "raw_body";
};

export type SignatureDispatchInput = {
  documentId: string;
  artifactUrl: string;
  signer: { name: string; email: string; cpf?: string };
  webhookUrl: string;
};

export type SignatureDispatchResult =
  | { ok: true; provider: "d4sign"; externalDocumentId: string; mode: D4SignMode }
  | { ok: false; code: "provider_config_missing" | "not_implemented" | "provider_error"; message: string };

export function getD4SignConfigFromEnv(): D4SignConfig {
  if (isMockMode) {
    return {
      mode: "simulated",
      env: "sandbox",
      baseUrl: undefined,
      tokenApi: undefined,
      cryptKey: undefined,
      safeUuid: undefined,
      webhookSecret: undefined,
      hmacStrategy: "uuid",
    };
  }

  return {
    mode: (process.env.DOCUMENT_SIGNATURE_PROVIDER_MODE as D4SignMode) ?? "unconfigured",
    env: (process.env.D4SIGN_ENV as "sandbox" | "production") ?? "sandbox",
    baseUrl: process.env.D4SIGN_BASE_URL,
    tokenApi: process.env.D4SIGN_TOKEN_API,
    cryptKey: process.env.D4SIGN_CRYPT_KEY,
    safeUuid: process.env.D4SIGN_SAFE_UUID,
    webhookSecret: process.env.D4SIGN_WEBHOOK_SECRET,
    hmacStrategy: (process.env.D4SIGN_HMAC_STRATEGY as "uuid" | "raw_body") ?? "uuid",
  };
}

export async function dispatchD4Sign(input: SignatureDispatchInput, config = getD4SignConfigFromEnv()): Promise<SignatureDispatchResult> {
  if (config.mode === "unconfigured") {
    return { ok: false, code: "provider_config_missing", message: "D4Sign ainda nao configurado." };
  }

  if (config.mode === "simulated") {
    return { ok: true, provider: "d4sign", externalDocumentId: `sim-${input.documentId}`, mode: "simulated" };
  }

  if (!config.tokenApi || !config.safeUuid || !config.webhookSecret || !config.baseUrl) {
    return { ok: false, code: "provider_config_missing", message: "Credenciais D4Sign incompletas." };
  }

  // Implementar chamadas reais somente após confirmação oficial da conta D4Sign.
  return { ok: false, code: "not_implemented", message: "Adapter real D4Sign pendente de homologacao." };
}
