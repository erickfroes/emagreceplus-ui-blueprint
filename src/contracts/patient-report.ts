import type { UiState } from "./common";

export interface PatientReportKpi { label: string; value: string; }
export interface PatientReportRow { id: string; date: string; description: string; value: string; status: string; }

export interface PatientReportDto {
  state: UiState;
  patientName: string;
  activePackage: string;
  financialStatus: string;
  clinicalStatus: string;
  kpis: PatientReportKpi[];
  installments: PatientReportRow[];
  consumedServices: PatientReportRow[];
  alerts: string[];
}
