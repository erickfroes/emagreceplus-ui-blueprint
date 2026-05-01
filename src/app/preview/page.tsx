import Link from "next/link";
import { APP_MODE } from "@/lib/app-mode";

const routeGroups = [
  {
    title: "Núcleo",
    routes: ["/", "/preview", "/design-system", "/dashboard", "/dashboard/clinic", "/auth/login", "/auth/environment"],
  },
  {
    title: "Operação Clínica",
    routes: ["/crm", "/patients", "/schedule", "/queue", "/documents", "/documents/ops/health", "/settings/profile", "/settings/signature"],
  },
  {
    title: "Financeiro, Estoque e Relatórios",
    routes: ["/finance", "/finance/receivables", "/finance/overdue", "/inventory", "/suppliers", "/reports/finance", "/reports/executive"],
  },
  {
    title: "App do Paciente (mock)",
    routes: ["/app", "/app/checkin", "/app/meals", "/app/water", "/app/workouts", "/app/chat"],
  },
] as const;

export default function PreviewPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl space-y-6 bg-white px-6 py-8 text-slate-700">
      <header className="rounded-2xl border border-teal-100 bg-gradient-to-br from-white to-teal-50 p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wider text-teal-600">Preview navegável</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">EmagrecePlus UI (modo {APP_MODE})</h1>
        <p className="mt-2 text-sm text-slate-600">Todas as rotas abaixo funcionam com dados locais mockados e sem autenticação real.</p>
      </header>

      {routeGroups.map((group) => (
        <section key={group.title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">{group.title}</h2>
          <ul className="mt-3 grid gap-2 md:grid-cols-2">
            {group.routes.map((route) => (
              <li key={route}>
                <Link className="inline-flex w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-teal-300 hover:text-teal-700" href={route}>
                  {route}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
