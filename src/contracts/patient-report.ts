import type { UiState } from "./common";

export type PatientReportTab = "financial" | "packages" | "services" | "documents" | "adherence" | "timeline";

export interface PatientReportHeader {
  patientName: string;
  patientAge: number;
  patientStatus: string;
  activePackage: string;
  financialStatus: string;
  clinicalStatus: string;
}

export interface PatientReportKpi {
  id: string;
  label: string;
  value: string;
}

export interface PatientReportInstallmentRow {
  id: string;
  dueDate: string;
  installment: string;
  amount: string;
  status: string;
}

export interface PatientReportServiceRow {
  id: string;
  date: string;
  service: string;
  consumed: string;
  status: string;
}

export interface PatientReportDocumentRow {
  id: string;
  document: string;
  provider: "d4sign" | "interno";
  updatedAt: string;
  status: string;
}

export interface PatientReportSidebarAlert {
  id: string;
  title: string;
  description: string;
}

export interface PatientReportDto {
  state: UiState;
  financialState: UiState;
  header: PatientReportHeader;
  defaultTab: PatientReportTab;
  kpis: PatientReportKpi[];
  installments: PatientReportInstallmentRow[];
  consumedServices: PatientReportServiceRow[];
  documents: PatientReportDocumentRow[];
  timeline: Array<{ id: string; date: string; title: string; description: string }>;
  sidebar: PatientReportSidebarAlert[];
}
