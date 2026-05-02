import { Droplets, Minus, Plus } from "lucide-react";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { StatePreview } from "@/components/patient-mobile/StatePreview";
import { resolveUiState } from "@/data/mock/ui-states";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";

export default async function WaterModalPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const state = resolveUiState((await searchParams)?.state);
  if (state === "loading") return <MobileAppShell active="Plano"><LoadingState title="Carregando registro de água" /></MobileAppShell>;
  if (state === "empty") return <MobileAppShell active="Plano"><EmptyState title="Sem metas de hidratação" /></MobileAppShell>;
  if (state === "error") return <MobileAppShell active="Plano"><ErrorState title="Falha ao carregar hidratação" /></MobileAppShell>;
  if (state === "forbidden") return <MobileAppShell active="Plano"><ForbiddenState title="Acesso negado à hidratação" /></MobileAppShell>;
  return (
    <MobileAppShell active="Plano">
      <Modal
        title="Registrar água"
        className="max-w-sm"
        footer={<Button className="w-full">Salvar consumo</Button>}
      >
        <div className="space-y-4">
          <div className="rounded-2xl bg-blue-50 p-4 text-center">
            <Droplets className="mx-auto h-7 w-7 text-blue-600" />
            <p className="mt-2 text-sm text-slate-600">Meta diária</p>
            <p className="text-2xl font-semibold text-slate-900">2,5 litros</p>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-border p-3">
            <Button variant="outline" size="icon"><Minus className="h-4 w-4" /></Button>
            <p className="text-lg font-semibold">300 ml</p>
            <Button variant="outline" size="icon"><Plus className="h-4 w-4" /></Button>
          </div>
          <p className="text-xs text-slate-500">Dica: hidratação regular ajuda na rotina de bem-estar ao longo do plano.</p>
        </div>
      </Modal>
      <StatePreview context="Modal água" />
    </MobileAppShell>
  );
}
