import type { UiState } from "./common";

export type DocumentItemStatus = "draft" | "pending_signature" | "signed" | "expired";
export type SignatureProvider = "d4sign_simulated" | "not_configured";
export type SignerStatus = "pending" | "signed";

export interface DocumentItem {
  id: string;
  patientId: string;
  title: string;
  status: DocumentItemStatus;
  provider: SignatureProvider;
  createdAt: string;
}

export interface DocumentSigner {
  id: string;
  name: string;
  email: string;
  status: SignerStatus;
}

export interface DocumentListDto {
  state: UiState;
  items: DocumentItem[];
}

export interface DocumentDetailDto {
  item: DocumentItem;
  signers: DocumentSigner[];
}

export type DocumentAction = "create" | "send_for_signature" | "void" | "download";
export type DocumentModal = "new_document" | "signature_status" | "confirm_void";
