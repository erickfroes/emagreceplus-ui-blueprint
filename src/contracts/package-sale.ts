import type { UiState } from "./common";

export type SaleStepKey = "patient" | "package" | "payment" | "contract" | "confirmation";

export interface SaleStep {
  key: SaleStepKey;
  label: string;
  description: string;
}

export interface PaymentCondition {
  label: string;
  value: string;
}

export interface SignableDocument {
  id: string;
  name: string;
  status: "pending" | "signed";
  provider: "d4sign_simulado";
}

export interface PackageSaleFlowDto {
  state: UiState;
  activeStep: SaleStepKey;
  patientName: string;
  packageName: string;
  packagePriceCents: number;
  paymentConditions: PaymentCondition[];
  signableDocuments: SignableDocument[];
  simulatedChargesCount: number;
}
