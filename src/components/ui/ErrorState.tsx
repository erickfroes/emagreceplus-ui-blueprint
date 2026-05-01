import { Button } from "./Button";

export function ErrorState({ title = "Não foi possível carregar", description = "Ocorreu uma falha no estado simulado desta tela.", actionLabel = "Tentar novamente" }: { title?: string; description?: string; actionLabel?: string }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-danger/30 bg-danger/5 p-10 text-center">
      <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-danger/10 text-danger">!</div>
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      <Button className="mt-5" variant="outline">{actionLabel}</Button>
    </div>
  );
}
