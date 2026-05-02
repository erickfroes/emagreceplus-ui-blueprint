import type { UiState } from "./common";

export type AppointmentStatus = "scheduled" | "confirmed" | "completed" | "canceled" | "no_show";
export type AppointmentChannel = "in_person" | "video" | "phone";

export interface AppointmentItem {
  id: string;
  patientId: string;
  professionalId: string;
  startsAt: string;
  endsAt: string;
  channel: AppointmentChannel;
  status: AppointmentStatus;
}

export interface SchedulingListDto {
  state: UiState;
  items: AppointmentItem[];
}

export interface SchedulingDetailDto {
  item: AppointmentItem;
  notes?: string;
  room?: string;
}

export type SchedulingAction = "confirm" | "cancel" | "reschedule" | "start_visit";
export type SchedulingModal = "reschedule" | "cancel_reason";
