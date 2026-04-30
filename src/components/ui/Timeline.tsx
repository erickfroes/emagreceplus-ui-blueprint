export type TimelineItem = { title: string; description?: string; time?: string; status?: string };

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="space-y-0">
      {items.map((item, index) => (
        <div key={index} className="relative flex gap-4 pb-6 last:pb-0">
          <div className="flex flex-col items-center">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary-50 text-primary-700">✓</span>
            {index < items.length - 1 ? <span className="mt-2 h-full w-px bg-border" /> : null}
          </div>
          <div className="pt-1">
            <p className="font-medium text-slate-950">{item.title}</p>
            {item.description ? <p className="mt-1 text-sm text-muted-foreground">{item.description}</p> : null}
            {item.time ? <p className="mt-1 text-xs text-slate-400">{item.time}</p> : null}
          </div>
        </div>
      ))}
    </div>
  );
}
