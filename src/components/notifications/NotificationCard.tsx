import { BellRing, Calendar, FileText, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import type { NotificationItem } from "@/contracts/notifications";

const severityLabel = { info: "Info", warning: "Alerta", critical: "Crítica" } as const;

export function NotificationCard({ item }: { item: NotificationItem }) {
  const icon = item.category === "documentos" ? <FileText className="h-5 w-5" /> : item.category === "agenda" ? <Calendar className="h-5 w-5" /> : item.category === "chat" ? <MessageSquare className="h-5 w-5" /> : <BellRing className="h-5 w-5" />;
  return <Card>
    <CardContent className="flex items-start justify-between gap-4 p-5">
      <div className="flex gap-3">
        <div className="mt-1 text-primary-700">{icon}</div>
        <div className="space-y-1">
          <h3 className="font-semibold text-slate-900">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.body}</p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge tone={item.severity === "critical" ? "danger" : item.severity === "warning" ? "warning" : "info"}>{severityLabel[item.severity]}</Badge>
            <span>{new Date(item.createdAt).toLocaleString("pt-BR")}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {item.cta ? <Button variant="outline" size="sm">{item.cta.label}</Button> : null}
        <Button size="sm">Marcar como lida</Button>
      </div>
    </CardContent>
  </Card>;
}
