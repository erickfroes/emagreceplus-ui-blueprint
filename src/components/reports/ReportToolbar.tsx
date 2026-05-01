import { Button } from "@/components/ui/Button";

export function ReportToolbar({ lastUpdated }: { lastUpdated: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs text-muted-foreground">Última atualização: {lastUpdated}</span>
      <Button variant="secondary">Exportar PDF</Button>
      <Button variant="secondary">Exportar Excel</Button>
    </div>
  );
}
