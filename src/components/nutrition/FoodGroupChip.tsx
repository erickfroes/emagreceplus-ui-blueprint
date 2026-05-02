import { Badge } from "@/components/ui/Badge";

type FoodGroupChipProps = {
  label: string;
};

const toneByLabel: Record<string, "primary" | "info" | "success" | "warning"> = {
  "Fonte proteica": "primary",
  Carboidrato: "info",
  "Gordura boa": "success",
  Fibra: "warning",
};

export function FoodGroupChip({ label }: FoodGroupChipProps) {
  return <Badge tone={toneByLabel[label] ?? "primary"}>{label}</Badge>;
}
