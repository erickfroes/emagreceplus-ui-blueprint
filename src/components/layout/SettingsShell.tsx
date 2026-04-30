import * as React from "react";
import { cn } from "@/lib/cn";

const settings = ["Perfil da clínica", "Unidades", "Equipe", "Permissões", "Documentos", "Assinatura Digital", "Plano e Cobrança", "Integrações", "Logs de auditoria"];

export function SettingsShell({ children, active = "Perfil da clínica" }: { children: React.ReactNode; active?: string }) {
  return (
    <div className="grid min-h-screen grid-cols-[280px_1fr] bg-background">
      <aside className="border-r border-border bg-white p-8">
        <div className="mb-10 text-2xl font-semibold">Emagrece<span className="text-primary-600">Plus</span></div>
        <p className="mb-5 text-sm font-semibold uppercase tracking-wide text-slate-500">Configurações da Clínica</p>
        <nav className="space-y-1">
          {settings.map((item) => <a key={item} className={cn("block rounded-xl px-4 py-3 text-sm", active === item ? "bg-primary-50 text-primary-700" : "text-slate-600 hover:bg-slate-50")}>{item}</a>)}
        </nav>
      </aside>
      <main className="p-8">{children}</main>
    </div>
  );
}
