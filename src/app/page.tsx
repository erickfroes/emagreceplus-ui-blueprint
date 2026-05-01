import { ArrowRight, HeartPulse, LayoutDashboard } from 'lucide-react';

const modules = [
  { icon: LayoutDashboard, title: 'Dashboard Clínico', status: 'Em construção' },
  { icon: HeartPulse, title: 'Jornada do Paciente', status: 'Mock pronto' },
  { icon: LayoutDashboard, title: 'Preview de Telas', status: 'Navegável em /preview' }
] as const;

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white px-6 py-10 text-slate-700">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="rounded-2xl border border-teal-100 bg-gradient-to-br from-white to-teal-50 p-8 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-wider text-teal-600">EmagrecePlus</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">Protótipo visual UI-only</h1>
          <p className="mt-3 max-w-3xl text-base text-slate-600">
            Base inicial para desenvolver as 52 telas com App Router, TypeScript, Tailwind e dados 100% mockados.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {modules.map(({ icon: Icon, title, status }) => (
            <article key={title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <Icon className="h-6 w-6 text-teal-600" />
              <h2 className="mt-4 text-xl font-semibold text-slate-900">{title}</h2>
              <p className="mt-2 text-sm text-slate-500">{status}</p>
              <a href="/preview" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-700">
                Abrir preview
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
