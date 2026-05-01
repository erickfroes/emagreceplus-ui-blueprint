import { Building2 } from "lucide-react";

export function UnitSwitcher() {
  return (
    <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-white px-4 text-sm text-slate-700">
      <Building2 className="h-4 w-4 text-primary-700" /> Clínica Matriz
    </button>
  );
}
