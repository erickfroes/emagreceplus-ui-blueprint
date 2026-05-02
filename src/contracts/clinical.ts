import type { UiState } from "./common";

export type ClinicalRecordStatus = "open" | "in_progress" | "signed" | "closed";

export interface ClinicalRecord {
  id: string;
  patientId: string;
  appointmentId?: string;
  status: ClinicalRecordStatus;
  chiefComplaint: string;
  updatedAt: string;
}

export interface ClinicalListDto { state: UiState; items: ClinicalRecord[] }
export interface ClinicalDetailDto {
  record: ClinicalRecord;
  soap: { subjective: string; objective: string; assessment: string; plan: string };
}

export type ClinicalAction = "start_record" | "save_draft" | "sign_record" | "close_record";
export type ClinicalModal = "clinical_history" | "confirm_close";
