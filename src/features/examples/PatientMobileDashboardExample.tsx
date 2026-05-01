import { Bell, Calendar, CheckCircle2, Droplets, Dumbbell, Salad } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type QuickActionItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};


export default function PatientMobileDashboardExample() {
  const quickActions: QuickActionItem[] = [
    { icon: Droplets, title: "Água", description: "Registrar" },
    { icon: Salad, title: "Refeições", description: "Ver plano" },
    { icon: Dumbbell, title: "Treino", description: "Iniciar" },
    { icon: CheckCircle2, title: "Check-in", description: "Diário" },
  ];

  return (
    <MobileAppShell active="Início">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-2xl font-semibold">Emagrece<span className="text-primary-600">Plus</span></div>
        <Bell className="h-6 w-6 text-slate-500" />
      </div>
      <div className="mb-6 flex items-center gap-4">
        <div className="h-20 w-20 rounded-full bg-slate-200" />
        <div>
          <h1 className="text-2xl font-semibold">Olá, Juliana 👋</h1>
          <p className="mt-1 text-sm text-muted-foreground">Continue seguindo seu plano, um passo de cada vez.</p>
        </div>
      </div>
      <ProgressRing value={33} label="4 de 12" sublabel="Semana" />
      <div className="mt-6 grid grid-cols-4 gap-3">
        {quickActions.map(({ icon: Icon, title, description }) => (
          <Card key={title} className="p-4 text-center">
            <Icon className="mx-auto h-7 w-7 text-primary-700" />
            <p className="mt-3 text-sm font-semibold">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3"><Droplets className="h-8 w-8 text-blue-500" /><div><p className="font-semibold">Água</p><p className="text-sm text-muted-foreground">1,5 / 2,5 L</p></div></div>
          <div className="mt-4 h-2 rounded-full bg-slate-100"><div className="h-2 w-[60%] rounded-full bg-blue-500" /></div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3"><Calendar className="h-8 w-8 text-primary-700" /><div><p className="font-semibold">Próxima consulta</p><p className="text-sm text-muted-foreground">24 MAI 2025 · 09:00</p></div></div>
          <Button variant="outline" className="mt-4 w-full">Ver detalhes</Button>
        </Card>
      </div>
    </MobileAppShell>
  );
}
