export type UiState = "ready" | "loading" | "empty" | "error" | "forbidden";

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

export type LoginScreenMock = {
  state: UiState;
  title: string;
  subtitle: string;
  providers: AuthProvider[];
};

export const loginScreenMock: LoginScreenMock = {
  state: "ready",
  title: "Acesse o EmagrecePlus",
  subtitle: "Entre com seu e-mail corporativo ou escolha um provedor de login.",
  providers: [
    { id: "google", label: "Continuar com Google", description: "Placeholder visual", enabled: true },
    { id: "microsoft", label: "Continuar com Microsoft", description: "Placeholder visual", enabled: true },
    { id: "magic-link", label: "Receber magic link", description: "Placeholder visual", enabled: true },
  ],
};

export const environmentSelectionMock: { state: UiState; items: ClinicEnvironment[] } = {
  state: "ready",
  items: [
    { id: "env-1", clinicName: "Clínica Centro", role: "Nutricionista", location: "São Paulo - SP", status: "ativo" },
    { id: "env-2", clinicName: "Unidade Jardins", role: "Coordenador(a)", location: "São Paulo - SP", status: "simulado" },
  ],
};
