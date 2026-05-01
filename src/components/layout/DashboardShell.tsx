import * as React from "react";
import { BellRing, Calendar, ClipboardList, FileText, Home, Package, Settings, Stethoscope, Users, Wallet, Warehouse } from "lucide-react";
import { Sidebar, type SidebarItem } from "@/components/layout/Sidebar";
import { SupportCard } from "@/components/layout/SupportCard";
import { Topbar } from "@/components/layout/Topbar";

const dashboardMenu: SidebarItem[] = [
  { label: "Dashboard", icon: Home, href: "/dashboard" },
  { label: "CRM", icon: Users, href: "/crm" },
  { label: "Pacientes", icon: Users, href: "/patients" },
  { label: "Agenda", icon: Calendar, href: "/schedule" },
  { label: "Atendimentos", icon: Stethoscope, href: "/clinical" },
  { label: "Documentos", icon: FileText, href: "/documents" },
  { label: "Financeiro", icon: Wallet, href: "/finance" },
  { label: "Estoque", icon: Warehouse, href: "/inventory" },
  { label: "Planos e Pacotes", icon: Package, href: "/packages" },
  { label: "Notificações", icon: BellRing, href: "/notifications" },
  { label: "Relatórios", icon: ClipboardList, href: "/reports" },
  { label: "Configurações", icon: Settings, href: "/settings/profile" },
];

export function DashboardShell({ children, active = "Dashboard" }: { children: React.ReactNode; active?: string }) {
  return (
    <div className="ep-page grid min-h-screen grid-cols-[260px_1fr]">
      <Sidebar
        brand={<div className="text-2xl font-semibold text-slate-950">Emagrece<span className="text-primary-600">Plus</span></div>}
        items={dashboardMenu}
        activeLabel={active}
        footer={<SupportCard />}
      />
      <main>
        <Topbar />
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
