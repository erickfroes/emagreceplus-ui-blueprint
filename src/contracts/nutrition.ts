import type { UiState } from "./common";

export type NutritionPlanStatus = "draft" | "active" | "paused" | "completed";

export interface NutritionMeal {
  id: string;
  name: string;
  calories: number;
}

export interface NutritionPlan {
  id: string;
  patientId: string;
  goal: string;
  kcalTarget: number;
  status: NutritionPlanStatus;
}

export interface NutritionListDto {
  state: UiState;
  items: NutritionPlan[];
}

export interface NutritionDetailDto {
  plan: NutritionPlan;
  meals: NutritionMeal[];
}

export type NutritionAction = "activate_plan" | "pause_plan" | "duplicate_plan";
export type NutritionModal = "meal_editor" | "confirm_pause";
