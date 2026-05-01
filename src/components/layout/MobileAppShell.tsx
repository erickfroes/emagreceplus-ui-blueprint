import * as React from "react";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export function MobileAppShell({ children, active = "Início" }: { children: React.ReactNode; active?: string }) {
  return (
    <div className="mx-auto min-h-screen max-w-[430px] bg-white text-slate-950 shadow-card">
      <div className="px-5 pb-24 pt-6">{children}</div>
      <MobileBottomNav active={active} />
    </div>
  );
}
