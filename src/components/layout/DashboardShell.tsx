import * as React from "react";
import { Bell, Building2, Calendar, ClipboardList, FileText, Home, Package, Settings, Stethoscope, Users, Wallet, Warehouse } from "lucide-react";
import { cn } from "@/lib/cn";

const nav = [
  { label: "Dashboard", icon: Home, href: "/dashboard" },
  { label: "CRM", icon: Users, href: "/crm" },
  { label: "Pacientes", icon: Users, href: "/patients" },
  { label: "Agenda", icon: Calendar, href: "/schedule" },
  { label: "Atendimentos", icon: Stethoscope, href: "/clinical" },
  { label: "Documentos", icon: FileText, href: "/documents" },
  { label: "Planos e Pacotes", icon: Package, href: "/packages" },
  { label: "Financeiro", icon: Wallet, href: "/finance" },
  { label: "Estoque", icon: Warehouse, href: "/inventory" },
  { label: "Relatórios", icon: ClipboardList, href: "/reports" },
  { label: "Configurações", icon: Settings, href: "/settings" },
];

export function DashboardShell({ children, active = "Dashboard" }: { children: React.ReactNode; active?: string }) {
  return (
    <div className="ep-page grid min-h-screen grid-cols-[260px_1fr]">
      <aside className="sticky top-0 h-screen border-r border-border bg-white p-6">
        <div className="mb-8 flex items-center gap-3 text-2xl font-semibold text-slate-950">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary-50 text-primary-700">◆</span>
          Emagrece<span className="text-primary-600">Plus</span>
        </div>
        <nav className="space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const isActive = item.label === active;
            return (
              <a key={item.label} href={item.href} className={cn("flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition", isActive ? "bg-primary-50 text-primary-700" : "text-slate-600 hover:bg-slate-50") }>
                <Icon className="h-5 w-5" />
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-border bg-white p-4 shadow-soft">
          <p className="font-medium text-slate-950">Precisa de ajuda?</p>
          <p className="mt-2 text-sm text-muted-foreground">Nossa equipe está pronta para te apoiar.</p>
        </div>
      </aside>
      <main>
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-border bg-white/90 px-8 backdrop-blur">
          <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-white px-4 text-sm text-slate-700">
            <Building2 className="h-4 w-4 text-primary-700" /> Clínica Matriz
          </button>
          <input className="h-11 w-[460px] rounded-xl border border-border bg-white px-4 text-sm" placeholder="Buscar pacientes, atendimentos, documentos..." />
          <div className="flex items-center gap-4">
            <Bell className="h-5 w-5 text-slate-500" />
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-200" />
              <div>
                <p className="text-sm font-medium text-slate-950">Dra. Fernanda Lima</p>
                <p className="text-xs text-muted-foreground">Administradora</p>
              </div>
            </div>
          </div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
