export function LoadingState({ title = "Carregando dados", description = "Aguarde enquanto preparamos as informações desta tela." }: { title?: string; description?: string }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-border bg-white p-10 text-center">
      <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" aria-hidden />
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
