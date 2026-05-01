import { MobileAppShell } from "@/components/layout/MobileAppShell";

export default function MobileAppPage() {
  return (
    <MobileAppShell active="Início">
      <h1 className="text-xl font-semibold text-slate-950">Início</h1>
      <p className="mt-2 text-sm text-muted-foreground">Placeholder da experiência mobile com bottom navigation.</p>
    </MobileAppShell>
  );
}
