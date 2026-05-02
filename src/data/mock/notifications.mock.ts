import type { NotificationListDto } from "@/contracts/notifications";

export type NotificationFeedItem = NotificationListDto["items"][number];

export interface NotificationFeedMock {
  default: NotificationFeedItem[];
  loading: NotificationFeedItem[];
  empty: NotificationFeedItem[];
  error: NotificationFeedItem[];
  forbidden: NotificationFeedItem[];
}

export const notificationsMock: NotificationFeedMock = {
  default: [
    {
      id: "n-1001",
      title: "Assinatura pendente do termo nutricional",
      body: "Paciente Carla Souza ainda não assinou o documento de adesão.",
      status: "unread",
      channel: "in_app",
      createdAt: "2026-05-02T09:10:00Z",
      severity: "critical",
      category: "documentos",
      cta: { label: "Ver documento", href: "/documents" },
    },
    {
      id: "n-1002",
      title: "Nova mensagem da equipe clínica",
      body: "Dr. Henrique comentou no plano alimentar do paciente João Lima.",
      status: "unread",
      channel: "in_app",
      createdAt: "2026-05-02T08:42:00Z",
      severity: "warning",
      category: "chat",
      cta: { label: "Abrir chat", href: "/chat" },
    },
    {
      id: "n-1003",
      title: "Consulta confirmada para hoje",
      body: "Maria Oliveira confirmou consulta às 16:30.",
      status: "read",
      channel: "email_simulated",
      createdAt: "2026-05-02T07:58:00Z",
      severity: "info",
      category: "agenda",
      cta: { label: "Abrir agenda", href: "/schedule" },
    },
    {
      id: "n-1004",
      title: "Falha de sincronização de anexos simulados",
      body: "Revise o lote de anexos do dia para evitar atraso na assinatura.",
      status: "unread",
      channel: "in_app",
      createdAt: "2026-05-02T06:40:00Z",
      severity: "critical",
      category: "sistema",
      cta: { label: "Investigar", href: "/documents/ops/health" },
    },
  ],
  loading: [],
  empty: [],
  error: [],
  forbidden: [],
};
