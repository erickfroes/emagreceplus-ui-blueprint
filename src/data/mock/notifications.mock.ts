import type { NotificationListDto } from "@/contracts/notifications";

export type NotificationSeverity = "low" | "medium" | "high";
export type NotificationCategory = "documentos" | "agenda" | "chat" | "sistema";

export type NotificationFeedItem = NotificationListDto["items"][number] & {
  severity: NotificationSeverity;
  category: NotificationCategory;
  actionLabel: string;
};

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
      severity: "high",
      category: "documentos",
      actionLabel: "Revisar documento",
    },
    {
      id: "n-1002",
      title: "Nova mensagem da equipe clínica",
      body: "Dr. Henrique comentou no plano alimentar do paciente João Lima.",
      status: "unread",
      channel: "in_app",
      createdAt: "2026-05-02T08:42:00Z",
      severity: "medium",
      category: "chat",
      actionLabel: "Abrir conversa",
    },
    {
      id: "n-1003",
      title: "Consulta confirmada para hoje",
      body: "Maria Oliveira confirmou consulta às 16:30.",
      status: "read",
      channel: "email_simulated",
      createdAt: "2026-05-02T07:58:00Z",
      severity: "low",
      category: "agenda",
      actionLabel: "Ver agenda",
    },
  ],
  loading: [],
  empty: [],
  error: [],
  forbidden: [],
};
