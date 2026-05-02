import Link from "next/link";
import { SoapSectionCard } from "@/components/clinical/SoapSectionCard";
import { type SoapSection } from "@/data/mock/encounters";

type SoapEditorProps = {
  encounterId: string;
  soap: SoapSection;
};

const STEPS = ["Subjetivo", "Objetivo", "Avaliação", "Plano"];

export function SoapEditor({ encounterId, soap }: SoapEditorProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {STEPS.map((step, index) => (
          <span key={step} className="rounded-full border border-border px-3 py-1 text-xs text-slate-600">
            {index + 1}. {step}
          </span>
        ))}
      </div>
      <SoapSectionCard title="Subjetivo" helper="Relatos e percepções da pessoa paciente." content={soap.subjective} />
      <SoapSectionCard title="Objetivo" helper="Dados observáveis coletados no atendimento." content={soap.objective} />
      <SoapSectionCard title="Avaliação" helper="Síntese clínica profissional sem promessas de resultado." content={soap.assessment} />
      <SoapSectionCard title="Plano" helper="Próximas condutas pactuadas para seguimento." content={soap.plan} />
      <Link href={`/encounters/${encounterId}/anamnesis`} className="text-sm font-medium text-primary-700 hover:underline">
        Abrir anamnese em etapas
      </Link>
    </div>
  );
}
