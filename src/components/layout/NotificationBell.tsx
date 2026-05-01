import { Bell } from "lucide-react";

export function NotificationBell() {
  return (
    <button aria-label="Notificações" className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100">
      <Bell className="h-5 w-5" />
    </button>
  );
}
