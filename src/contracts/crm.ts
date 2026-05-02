import type { UiState } from "./common";

export type LeadStatus = "new" | "qualified" | "scheduled" | "proposal_sent" | "won" | "lost";

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  source: "instagram" | "referral" | "website" | "walk_in";
  status: LeadStatus;
  ownerId: string;
}

export interface CrmListDto { state: UiState; items: LeadItem[] }
export interface CrmDetailDto { lead: LeadItem; timeline: { id: string; at: string; event: string }[] }

export type CrmAction = "move_stage" | "assign_owner" | "convert_to_patient";
export type CrmModal = "lead_details" | "confirm_conversion";
