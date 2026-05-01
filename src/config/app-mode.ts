export type AppMode = "mock" | "prod";
const mode = process.env.NEXT_PUBLIC_APP_MODE;
export const APP_MODE: AppMode = mode === "prod" ? "prod" : "mock";
export const IS_MOCK_MODE = APP_MODE === "mock";
