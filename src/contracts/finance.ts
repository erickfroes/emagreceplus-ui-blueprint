import type { UiState } from "./common";

export type FinanceStatus = "open" | "paid" | "overdue" | "canceled";
export type PaymentMethod = "credit_card" | "pix" | "bank_slip" | "cash";
export type FinanceSource = "manual" | "package_sale" | "subscription";

export interface FinanceItem {
  id: string;
  patientId: string;
  description: string;
  amountCents: number;
  dueDate: string;
  status: FinanceStatus;
  method?: PaymentMethod;
  source: FinanceSource;
}

export interface FinanceListFilters {
  status?: FinanceStatus;
  method?: PaymentMethod;
  search?: string;
}

export interface FinanceListDto {
  state: UiState;
  filters: FinanceListFilters;
  items: FinanceItem[];
  totalOpenCents: number;
}

export interface FinanceHistoryEntry {
  id: string;
  at: string;
  action: string;
  actor: string;
}

export interface FinanceDetailDto {
  item: FinanceItem;
  history: FinanceHistoryEntry[];
}

export type FinanceAction = "mark_as_paid" | "send_reminder" | "cancel_charge";
export type FinanceModal = "confirm_payment" | "confirm_cancel" | "payment_proof";

export interface FinanceUiState {
  selectedItemId?: string;
  activeModal?: FinanceModal;
  pendingAction?: FinanceAction;
}

export interface ReceivablePaymentRegistration {
  receivableId: string;
  patient: string;
  description: string;
  originalAmountCents: number;
  openAmountCents: number;
  receivedAmountCents: number;
  paymentDate: string;
  paymentMethod: "pix" | "bank_slip" | "credit_card" | "cash" | "bank_transfer";
  cashAccountLabel: string;
  receiptUploadStatus: "simulado" | "nao_configurado";
  notes?: string;
  partialPayment: boolean;
  shouldGenerateReceipt: boolean;
  shouldSendProofToPatient: boolean;
}
