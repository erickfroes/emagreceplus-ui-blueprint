import type { UiState } from "./common";

export type PatientJourneyStatus = "em_tratamento" | "estavel" | "risco_aderencia";
export type PatientPlanTier = "Essential" | "Premium";

export interface Patient {
  id: string;
  nome: string;
  plano: PatientPlanTier;
  status: PatientJourneyStatus;
  ultimaConsulta: string;
  proximaConsulta: string;
  adesaoPercentual: number;
  metasAtivas: number;
  pendencias: number;
}

export interface PatientTimelineEvent {
  id: string;
  data: string;
  titulo: string;
  descricao: string;
}

export interface PatientListDto {
  state: UiState;
  items: Patient[];
}

export interface PatientDetailDto {
  patient: Patient;
  adesaoPercentual: number;
  metasAtivas: number;
  pendencias: number;
  timeline: PatientTimelineEvent[];
}

export type PatientAction = "open_chart" | "schedule_followup" | "archive_patient";
export type PatientModal = "patient_overview" | "confirm_archive_patient";

export interface PatientUiState {
  activeModal?: PatientModal;
  pendingAction?: PatientAction;
  selectedPatientId?: string;
}

// Compat para providers atuais
export interface PatientDetail {
  patient: Patient;
  resumoClinico: string;
  objetivos: string[];
  sinais: { label: string; valor: string }[];
  timeline: PatientTimelineEvent[];
}

export interface PatientListResult {
  state: UiState;
  items: Patient[];
}

export interface PatientRepository {
  listPatients(): Promise<PatientListResult>;
  getPatientDetail(patientId: string): Promise<PatientDetail | null>;
}
