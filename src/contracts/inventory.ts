import type { UiState } from "./common";

export type InventoryItemStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  minimumQuantity: number;
  status: InventoryItemStatus;
}

export interface InventoryListDto { state: UiState; items: InventoryItem[] }
export interface InventoryDetailDto { item: InventoryItem; movements: { id: string; date: string; type: "in" | "out"; quantity: number }[] }

export type InventoryAction = "adjust_stock" | "register_entry" | "register_output";
export type InventoryModal = "stock_adjustment" | "movement_details";
