import { CalendarCheck, FileText, Home, MessageCircle, UserCircle } from "lucide-react";

const mobileTabs = [
  { label: "Início", icon: Home },
  { label: "Plano", icon: CalendarCheck },
  { label: "Chat", icon: MessageCircle },
  { label: "Documentos", icon: FileText },
  { label: "Perfil", icon: UserCircle },
];

export function MobileBottomNav({ active = "Início" }: { active?: string }) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 grid w-full max-w-[430px] -translate-x-1/2 grid-cols-5 border-t border-border bg-white px-2 py-2">
      {mobileTabs.map(({ label, icon: Icon }) => (
        <button key={label} className={active === label ? "text-primary-700" : "text-slate-500"}>
          <Icon className="mx-auto h-6 w-6" />
          <span className="mt-1 block text-xs">{label}</span>
        </button>
      ))}
    </nav>
  );
}
