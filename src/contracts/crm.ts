import type { UiState } from "./common";

export type LeadStatus = "new" | "qualified" | "scheduled" | "proposal_sent" | "won" | "lost";
export type LeadSource = "instagram" | "referral" | "website" | "walk_in";

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  ownerId: string;
}

export interface LeadTimelineEvent {
  id: string;
  at: string;
  event: string;
}

export interface CrmListDto {
  state: UiState;
  items: LeadItem[];
}

export interface CrmDetailDto {
  lead: LeadItem;
  timeline: LeadTimelineEvent[];
}

export type CrmAction = "move_stage" | "assign_owner" | "convert_to_patient";
export type CrmModal = "lead_details" | "confirm_conversion";
