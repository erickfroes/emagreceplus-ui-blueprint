import type { UiState } from "./common";

export type PrescriptionItemStatus = "draft" | "issued" | "updated" | "canceled";
export type PrescriptionType = "supplement" | "exam" | "guidance";

export interface PrescriptionItem {
  id: string;
  patientId: string;
  type: PrescriptionType;
  status: PrescriptionItemStatus;
  createdAt: string;
}

export interface PrescriptionListDto { state: UiState; items: PrescriptionItem[] }
export interface PrescriptionDetailDto { item: PrescriptionItem; entries: { id: string; label: string; instructions: string }[] }

export type PrescriptionAction = "issue" | "edit" | "cancel" | "print";
export type PrescriptionModal = "prescription_editor" | "confirm_cancel";
