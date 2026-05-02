import type { D4SignSettingsDto } from "@/contracts/integrations";

export const d4SignSettingsMock: D4SignSettingsDto = {
  state: "default",
  provider: "D4Sign",
  mode: "real bloqueado",
  credentials: [
    { field: "apiToken", label: "Token da API", status: "Pendente" },
    { field: "cryptKey", label: "cryptKey", status: "Pendente" },
    { field: "safeVault", label: "Cofre D4Sign", status: "Configurado" },
    { field: "webhookSecret", label: "Segredo do webhook", status: "Pendente" },
    { field: "webhookUrl", label: "URL do webhook", status: "Configurado" },
    { field: "hmacStrategy", label: "Estratégia HMAC", status: "Pendente" }
  ],
  checklist: [
    "Token da API",
    "cryptKey",
    "Cofre D4Sign",
    "Segredo do webhook",
    "URL do webhook",
    "Estratégia HMAC"
  ],
  verificationCriteria: [
    "HMAC válido",
    "status oficial consultado",
    "hashes persistidos",
    "pacote de evidência atualizado"
  ]
};
