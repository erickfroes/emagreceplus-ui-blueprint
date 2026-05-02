import type { UiState } from "./common";

export type DocumentItemStatus = "draft" | "pending_signature" | "signed" | "expired";
export type SignatureProvider = "d4sign_simulated" | "not_configured";

export interface DocumentItem {
  id: string;
  patientId: string;
  title: string;
  status: DocumentItemStatus;
  provider: SignatureProvider;
  createdAt: string;
}

export interface DocumentListDto { state: UiState; items: DocumentItem[] }
export interface DocumentDetailDto { item: DocumentItem; signers: { id: string; name: string; email: string; status: "pending" | "signed" }[] }

export type DocumentAction = "create" | "send_for_signature" | "void" | "download";
export type DocumentModal = "new_document" | "signature_status" | "confirm_void";
