import * as React from "react";
import { Sidebar, type SidebarItem } from "@/components/layout/Sidebar";

const settingsMenu: SidebarItem[] = [
  { label: "Perfil da clínica", href: "/settings/profile" },
  { label: "Unidades", href: "/settings/units" },
  { label: "Equipe", href: "/settings/team" },
  { label: "Permissões", href: "/settings/permissions" },
  { label: "Documentos", href: "/settings/documents" },
  { label: "Editor de Documento", href: "/settings/documents/editor" },
  { label: "Assinatura Digital", href: "/settings/signature" },
  { label: "Plano e Cobrança", href: "/settings/billing" },
  { label: "Integrações", href: "/settings/integrations" },
  { label: "Logs de auditoria", href: "/settings/audit-logs" },
];

export function SettingsShell({ children, active = "Perfil da clínica" }: { children: React.ReactNode; active?: string }) {
  return (
    <div className="grid min-h-screen grid-cols-[280px_1fr] bg-background">
      <Sidebar
        brand={<div className="text-2xl font-semibold">Emagrece<span className="text-primary-600">Plus</span></div>}
        title="Configurações da Clínica"
        items={settingsMenu}
        activeLabel={active}
      />
      <main className="p-8">{children}</main>
    </div>
  );
}
