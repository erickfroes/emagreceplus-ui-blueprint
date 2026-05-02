import type { UiState } from "./common";

export type PackageItemStatus = "draft" | "active" | "archived";

export interface PackageItem {
  id: string;
  name: string;
  sessions: number;
  priceCents: number;
  status: PackageItemStatus;
}

export interface PackageListDto { state: UiState; items: PackageItem[] }
export interface PackageDetailDto { item: PackageItem; includedServices: string[]; notes?: string }

export type PackageAction = "activate" | "archive" | "duplicate";
export type PackageModal = "edit_package" | "confirm_archive";
