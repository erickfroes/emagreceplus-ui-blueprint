import { Button } from "./Button";

export function EmptyState({ title, description, actionLabel }: { title: string; description?: string; actionLabel?: string }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-white p-10 text-center">
      <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-primary-50 text-primary-700">◇</div>
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      {description ? <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p> : null}
      {actionLabel ? <Button className="mt-5" variant="outline">{actionLabel}</Button> : null}
    </div>
  );
}
