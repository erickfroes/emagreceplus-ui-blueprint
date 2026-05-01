import type { UiState } from "./common";

export interface AuthSession {
  id: string;
  userId: string;
  tenantId: string;
  role: "nutritionist" | "coordinator" | "reception";
  state: UiState;
}
