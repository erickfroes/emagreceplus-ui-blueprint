import { ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { NotificationItem } from "@/contracts/notifications";

export function NotificationSummaryPanel({ items }: { items: NotificationItem[] }) {
  const unread = items.filter((i) => i.status === "unread").length;
  const critical = items.filter((i) => i.severity === "critical").length;
  const today = items.filter((i) => i.createdAt.startsWith("2026-05-02")).length;
  return <Card>
    <CardHeader><CardTitle>Resumo</CardTitle></CardHeader>
    <CardContent className="space-y-3 text-sm">
      <p><strong>Não lidas:</strong> {unread}</p><p><strong>Críticas:</strong> {critical}</p><p><strong>Hoje:</strong> {today}</p>
      <p className="rounded-xl bg-primary-50 p-3 text-primary-800"><ShieldAlert className="mr-2 inline h-4 w-4" />Mensagens protegidas em ambiente seguro.</p>
    </CardContent>
  </Card>;
}
