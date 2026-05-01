export type AppMode = "mock" | "live";

export const APP_MODE: AppMode = process.env.NEXT_PUBLIC_APP_MODE === "live" ? "live" : "mock";

export const isMockMode = APP_MODE === "mock";
