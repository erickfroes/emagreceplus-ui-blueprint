import { Camera, Salad } from "lucide-react";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { StatePreview } from "@/components/patient-mobile/StatePreview";

export default function MealsModalPage() {
  return (
    <MobileAppShell active="Plano">
      <Modal title="Registrar refeição" className="max-w-sm" footer={<Button className="w-full">Enviar refeição</Button>}>
        <div className="space-y-4">
          <div className="rounded-2xl bg-emerald-50 p-4">
            <div className="flex items-center gap-2">
              <Salad className="h-5 w-5 text-emerald-700" />
              <p className="text-sm font-semibold">Almoço planejado</p>
            </div>
            <p className="mt-2 text-xs text-slate-600">Proteína magra + vegetais + carboidrato integral.</p>
          </div>
          <button className="w-full rounded-2xl border border-dashed border-border p-4 text-left">
            <Camera className="h-5 w-5 text-slate-500" />
            <p className="mt-2 text-sm font-semibold">Adicionar foto</p>
            <p className="text-xs text-slate-500">Sua foto é usada somente para avaliação nutricional em ambiente seguro.</p>
          </button>
          <Textarea label="Observações" placeholder="Como foi sua refeição?" />
        </div>
      </Modal>
      <StatePreview context="Modal refeição" />
    </MobileAppShell>
  );
}
