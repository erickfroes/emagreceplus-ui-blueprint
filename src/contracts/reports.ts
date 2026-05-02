import type { UiState } from "./common";

export type ReportItemStatus = "queued" | "processing" | "ready" | "failed";
export type ReportType = "clinical" | "finance" | "adherence" | "operations";

export interface ReportItem {
  id: string;
  type: ReportType;
  title: string;
  generatedAt?: string;
  status: ReportItemStatus;
}

export interface ReportListDto { state: UiState; items: ReportItem[] }
export interface ReportDetailDto { item: ReportItem; downloadUrl?: string; errorMessage?: string }

export type ReportAction = "generate" | "retry" | "download";
export type ReportModal = "report_filters" | "confirm_regeneration";
