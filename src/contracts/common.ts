export type UiState = "default" | "loading" | "empty" | "error" | "forbidden";

export type ContractSource = "mock" | "supabase_future" | "api_future";

export interface ContractMeta {
  tela: string;
  fonteFutura: ContractSource;
}
