import { Button } from "@/components/ui/Button";

type EncounterActionBarProps = {
  lastSavedAt: string;
  professional: string;
};

export function EncounterActionBar({ lastSavedAt, professional }: EncounterActionBarProps) {
  return (
    <div className="sticky bottom-0 z-20 mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-white/95 p-4 shadow-lg backdrop-blur">
      <p className="text-xs text-muted-foreground">
        Rascunho salvo • Última edição: {lastSavedAt} • Responsável: {professional}
      </p>
      <div className="flex gap-2">
        <Button variant="outline">Salvar e sair</Button>
        <Button>Concluir atendimento</Button>
      </div>
    </div>
  );
}
