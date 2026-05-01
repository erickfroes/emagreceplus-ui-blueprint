export function ForbiddenState({ title = "Acesso restrito", description = "Você não possui permissão para visualizar este conteúdo no momento." }: { title?: string; description?: string }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-warning/30 bg-warning/5 p-10 text-center">
      <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-warning/10 text-warning">🔒</div>
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
