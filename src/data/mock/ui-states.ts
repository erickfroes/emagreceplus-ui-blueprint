export type GlobalUiState = "default" | "loading" | "empty" | "error" | "forbidden" | "coming-soon";

export function resolveUiState(state?: string): GlobalUiState {
  const valid: GlobalUiState[] = ["default", "loading", "empty", "error", "forbidden", "coming-soon"];
  return valid.includes(state as GlobalUiState) ? (state as GlobalUiState) : "default";
}
