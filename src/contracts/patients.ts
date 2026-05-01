import type { UiState } from "./common";

export type PatientJourneyStatus = "em_tratamento" | "estavel" | "risco_aderencia";

export interface Patient {
  id: string;
  nome: string;
  plano: "Essential" | "Premium";
  status: PatientJourneyStatus;
  ultimaConsulta: string;
  proximaConsulta: string;
  adesaoPercentual: number;
  metasAtivas: number;
  pendencias: number;
}

export interface PatientTimelineEvent { id: string; data: string; titulo: string; descricao: string }

export interface PatientDetail {
  patient: Patient;
  resumoClinico: string;
  objetivos: string[];
  sinais: { label: string; valor: string }[];
  timeline: PatientTimelineEvent[];
}

export interface PatientListResult { state: UiState; items: Patient[] }

export interface PatientRepository {
  listPatients(): Promise<PatientListResult>;
  getPatientDetail(patientId: string): Promise<PatientDetail | null>;
}
