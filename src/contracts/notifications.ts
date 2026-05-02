import type { UiState } from "./common";

export type NotificationItemStatus = "unread" | "read" | "archived";
export type NotificationChannel = "in_app" | "email_simulated" | "sms_simulated";
export type NotificationSeverity = "info" | "warning" | "critical";
export type NotificationCategory = "documentos" | "agenda" | "chat" | "sistema";

export interface NotificationCta {
  label: string;
  href: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  status: NotificationItemStatus;
  channel: NotificationChannel;
  createdAt: string;
  severity: NotificationSeverity;
  category: NotificationCategory;
  cta?: NotificationCta;
}

export interface NotificationListDto {
  state: UiState;
  items: NotificationItem[];
}

export interface NotificationDetailDto {
  item: NotificationItem;
}

export type NotificationAction = "mark_as_read" | "archive" | "open_cta";
export type NotificationModal = "notification_center";
