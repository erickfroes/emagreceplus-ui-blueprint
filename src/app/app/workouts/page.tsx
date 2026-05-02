import { Clock3, Dumbbell } from "lucide-react";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { StatePreview } from "@/components/patient-mobile/StatePreview";
import { resolveUiState } from "@/data/mock/ui-states";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";

export default async function WorkoutsModalPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const state = resolveUiState((await searchParams)?.state);
  if (state === "loading") return <MobileAppShell active="Plano"><LoadingState title="Carregando treino" /></MobileAppShell>;
  if (state === "empty") return <MobileAppShell active="Plano"><EmptyState title="Sem treino planejado" /></MobileAppShell>;
  if (state === "error") return <MobileAppShell active="Plano"><ErrorState title="Falha ao carregar treino" /></MobileAppShell>;
  if (state === "forbidden") return <MobileAppShell active="Plano"><ForbiddenState title="Acesso negado ao treino" /></MobileAppShell>;
  return (
    <MobileAppShell active="Plano">
      <Modal title="Registrar treino" className="max-w-sm" footer={<Button className="w-full">Concluir treino</Button>}>
        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-100 p-4">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-emerald-700" />
              <p className="text-sm font-semibold">Treino do dia</p>
            </div>
            <p className="mt-2 text-xs text-slate-600">Circuito funcional leve com supervisão remota.</p>
          </div>
          <Input label="Duração" defaultValue="35 minutos" />
          <div className="rounded-2xl border border-border p-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Clock3 className="h-4 w-4" /> Intensidade percebida
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
              <button className="rounded-xl border border-border p-2">Leve</button>
              <button className="rounded-xl border border-emerald-600 bg-emerald-50 p-2 font-semibold text-emerald-700">Moderada</button>
              <button className="rounded-xl border border-border p-2">Alta</button>
            </div>
          </div>
        </div>
      </Modal>
      <StatePreview context="Modal treino" />
    </MobileAppShell>
  );
}
