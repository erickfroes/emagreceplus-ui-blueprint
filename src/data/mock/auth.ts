import type { UiState as BaseUiState, AuthContract, TenantUnitContract } from "@/contracts";

export type UiState = "ready" | Exclude<BaseUiState, "default">;

export type AuthProvider = {
  id: "google" | "microsoft" | "magic-link";
  label: string;
  description: string;
  enabled: boolean;
};

export type ClinicEnvironment = {
  id: string;
  clinicName: string;
  role: "Nutricionista" | "Coordenador(a)" | "Recepção";
  location: string;
  status: "ativo" | "simulado" | "não configurado";
};

export type LoginScreenMock = AuthContract & {
  title: string;
  subtitle: string;
  providers: AuthProvider[];
};

export const loginScreenMock: LoginScreenMock = {
  tela: "auth/login",
  fonteFutura: "supabase_future",
  status: "simulado",
  state: "default",
  title: "Acesse o EmagrecePlus",
  subtitle: "Entre com seu e-mail corporativo ou escolha um provedor de login.",
  providers: [
    { id: "google", label: "Continuar com Google", description: "Placeholder visual", enabled: true },
    { id: "microsoft", label: "Continuar com Microsoft", description: "Placeholder visual", enabled: true },
    { id: "magic-link", label: "Receber magic link", description: "Placeholder visual", enabled: true },
  ],
};

export const environmentSelectionMock: { state: UiState; items: (ClinicEnvironment & TenantUnitContract)[] } = {
  state: "ready",
  items: [
    { id: "env-1", clinicName: "Clínica Centro", role: "Nutricionista", location: "São Paulo - SP", status: "ativo", tela: "auth/environment", fonteFutura: "supabase_future", nome: "Clínica Centro" },
    { id: "env-2", clinicName: "Unidade Jardins", role: "Coordenador(a)", location: "São Paulo - SP", status: "simulado", tela: "auth/environment", fonteFutura: "supabase_future", nome: "Unidade Jardins" },
  ],
};
