import { Bell, Calendar, CheckCircle2, Droplets, Dumbbell, Salad } from "lucide-react";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Card } from "@/components/ui/Card";
import { StatePreview } from "@/components/patient-mobile/StatePreview";

export default function MobilePatientDashboardPage() {
  const actions = [
    { icon: Droplets, label: "Água", value: "1,8L" },
    { icon: Salad, label: "Refeições", value: "3 de 5" },
    { icon: Dumbbell, label: "Treino", value: "35 min" },
    { icon: CheckCircle2, label: "Check-in", value: "Semanal" },
  ];

  return (
    <MobileAppShell active="Início">
      <header className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Paciente</p>
          <h1 className="text-2xl font-semibold">Olá, Juliana 👋</h1>
        </div>
        <Bell className="h-5 w-5 text-slate-500" />
      </header>

      <Card className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-5 text-white">
        <p className="text-sm">Seu progresso é construído com consistência e acompanhamento profissional.</p>
        <div className="mt-3 flex items-end justify-between">
          <p className="text-3xl font-semibold">72%</p>
          <p className="text-sm">Semana 8 de 12</p>
        </div>
      </Card>

      <section className="mt-4 grid grid-cols-2 gap-3">
        {actions.map(({ icon: Icon, label, value }) => (
          <Card key={label} className="rounded-2xl p-4">
            <Icon className="h-5 w-5 text-emerald-700" />
            <p className="mt-2 text-sm font-semibold">{label}</p>
            <p className="text-xs text-slate-500">{value}</p>
          </Card>
        ))}
      </section>

      <Card className="mt-4 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-emerald-700" />
          <div>
            <p className="text-sm font-semibold">Próxima consulta</p>
            <p className="text-xs text-slate-500">12 de maio de 2026 · 08:30</p>
          </div>
        </div>
      </Card>

      <StatePreview context="Dashboard paciente" />
    </MobileAppShell>
  );
}
