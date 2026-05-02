import type { UiState } from "./common";

export interface IntegrationProviderStatus {
  provider: "d4sign" | "asaas";
  status: "não configurado" | "simulado";
}

export type D4SignMode = "não configurado" | "simulado" | "real bloqueado";

export interface D4SignCredentialStatus {
  field:
    | "apiToken"
    | "cryptKey"
    | "safeVault"
    | "webhookSecret"
    | "webhookUrl"
    | "hmacStrategy";
  label: string;
  status: "Configurado" | "Pendente";
}

export interface D4SignSettingsDto {
  state: UiState;
  provider: "D4Sign";
  mode: D4SignMode;
  credentials: D4SignCredentialStatus[];
  checklist: string[];
  verificationCriteria: string[];
}
