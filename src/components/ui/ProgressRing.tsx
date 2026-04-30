export function ProgressRing({ value, label, sublabel }: { value: number; label: string; sublabel?: string }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.max(0, Math.min(value, 100)) / 100) * circumference;
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4 shadow-soft">
      <svg width="104" height="104" viewBox="0 0 104 104">
        <circle cx="52" cy="52" r={radius} stroke="#E5E7EB" strokeWidth="10" fill="none" />
        <circle cx="52" cy="52" r={radius} stroke="#0EA37A" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} transform="rotate(-90 52 52)" />
      </svg>
      <div>
        <p className="text-sm text-muted-foreground">{sublabel}</p>
        <p className="text-2xl font-semibold text-slate-950">{label}</p>
        <p className="text-sm text-muted-foreground">{value}% concluído</p>
      </div>
    </div>
  );
}
