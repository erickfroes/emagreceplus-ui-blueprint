import { CheckCircle2 } from "lucide-react";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Input } from "@/components/ui/Input";
import { StatePreview } from "@/components/patient-mobile/StatePreview";

export default function WeeklyCheckinPage() {
  const steps = ["Etapa 1: rotina", "Etapa 2: hábitos", "Etapa 3: percepção", "Etapa 4: revisão"];

  return (
    <MobileAppShell active="Plano">
      <h1 className="text-xl font-semibold">Check-in semanal</h1>
      <p className="mt-1 text-sm text-slate-500">Responda por etapas para que sua equipe ajuste o plano com segurança.</p>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {steps.map((step, index) => (
          <div key={step} className={`whitespace-nowrap rounded-full px-3 py-1 text-xs ${index === 0 ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
            {step}
          </div>
        ))}
      </div>

      <Card className="mt-4 rounded-2xl p-4 space-y-3">
        <Input label="Como foi seu nível de energia?" placeholder="Ex.: estável ao longo da semana" />
        <Input label="Quantas horas de sono por noite (média)?" placeholder="Ex.: 7h30" />
        <Textarea label="Algum ponto importante para sua nutricionista?" placeholder="Compartilhe sinais, dificuldades ou avanços." />
        <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-medium text-slate-700"><CheckCircle2 className="h-4 w-4 text-emerald-700" /> Privacidade</div>
          <p className="mt-1">Se desejar, anexe foto corporal. A imagem fica visível apenas para acompanhamento clínico em ambiente seguro.</p>
        </div>
        <Button className="w-full">Avançar etapa</Button>
      </Card>

      <StatePreview context="Check-in semanal" />
    </MobileAppShell>
  );
}
