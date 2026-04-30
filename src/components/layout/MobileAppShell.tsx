import * as React from "react";
import { CalendarCheck, FileText, Home, MessageCircle, UserCircle } from "lucide-react";

export function MobileAppShell({ children, active = "Início" }: { children: React.ReactNode; active?: string }) {
  const tabs = [
    { label: "Início", icon: Home },
    { label: "Plano", icon: CalendarCheck },
    { label: "Chat", icon: MessageCircle },
    { label: "Documentos", icon: FileText },
    { label: "Perfil", icon: UserCircle },
  ];
  return (
    <div className="mx-auto min-h-screen max-w-[430px] bg-white text-slate-950 shadow-card">
      <div className="px-5 pb-24 pt-6">{children}</div>
      <nav className="fixed bottom-0 left-1/2 z-20 grid w-full max-w-[430px] -translate-x-1/2 grid-cols-5 border-t border-border bg-white px-2 py-2">
        {tabs.map(({ label, icon: Icon }) => (
          <button key={label} className={active === label ? "text-primary-700" : "text-slate-500"}>
            <Icon className="mx-auto h-6 w-6" />
            <span className="mt-1 block text-xs">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
