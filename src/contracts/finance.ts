import type { UiState } from "./common";

export type FinanceStatus = "open" | "paid" | "overdue" | "canceled";
export type PaymentMethod = "credit_card" | "pix" | "bank_slip" | "cash";

export interface FinanceItem {
  id: string;
  patientId: string;
  description: string;
  amountCents: number;
  dueDate: string;
  status: FinanceStatus;
  method?: PaymentMethod;
}

export interface FinanceListDto {
  state: UiState;
  items: FinanceItem[];
  totalOpenCents: number;
}

export interface FinanceDetailDto {
  item: FinanceItem;
  history: { id: string; at: string; action: string; actor: string }[];
}

export type FinanceAction = "mark_as_paid" | "send_reminder" | "cancel_charge";
export type FinanceModal = "confirm_payment" | "confirm_cancel" | "payment_proof";
