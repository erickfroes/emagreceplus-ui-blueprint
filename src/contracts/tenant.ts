import type { UiState } from "./common";

export type TenantUnitStatus = "active" | "inactive" | "simulated";

export interface TenantUnit {
  id: string;
  name: string;
  slug: string;
  status: TenantUnitStatus;
  timezone: string;
}

export interface TenantListDto {
  state: UiState;
  items: TenantUnit[];
}

export interface TenantDetailDto {
  tenant: TenantUnit;
  allowedRoles: string[];
}

export type TenantAction = "switch_unit" | "edit_unit" | "deactivate_unit";
export type TenantModal = "switch_unit" | "unit_settings";
