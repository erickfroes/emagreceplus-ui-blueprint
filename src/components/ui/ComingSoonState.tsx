export function ComingSoonState({ title = "Em breve", description = "Este módulo está em evolução e será disponibilizado nas próximas entregas." }: { title?: string; description?: string }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-border bg-white p-10 text-center">
      <div className="mb-4 text-3xl" aria-hidden>🚧</div>
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
