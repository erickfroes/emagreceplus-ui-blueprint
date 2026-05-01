import { NotificationBell } from "@/components/layout/NotificationBell";
import { UnitSwitcher } from "@/components/layout/UnitSwitcher";
import { UserMenu } from "@/components/layout/UserMenu";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-border bg-white/90 px-8 backdrop-blur">
      <UnitSwitcher />
      <input
        className="h-11 w-[460px] rounded-xl border border-border bg-white px-4 text-sm"
        placeholder="Buscar pacientes, atendimentos, documentos..."
      />
      <div className="flex items-center gap-4">
        <NotificationBell />
        <UserMenu />
      </div>
    </header>
  );
}
