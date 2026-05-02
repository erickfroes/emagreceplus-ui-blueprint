import type { ChatMessageStatus, ChatRoomStatus } from "@/contracts/chat";

export interface StaffChatRoom {
  id: string;
  patientName: string;
  program: string;
  lastMessage: string;
  unreadCount: number;
  status: ChatRoomStatus;
  lastMessageAt: string;
}

export interface StaffChatMessage {
  id: string;
  roomId: string;
  senderName: string;
  senderRole: "Nutricionista" | "Médico" | "Enfermagem";
  content: string;
  createdAt: string;
  status: ChatMessageStatus;
  mine: boolean;
}

export interface StaffChatPatientContext {
  roomId: string;
  patientName: string;
  nextConsultation: string;
  pendingDocuments: string[];
  quickActions: string[];
}

export const chatMock = {
  rooms: [
    {
      id: "room-001",
      patientName: "Carla Souza",
      program: "Emagrecimento 12 semanas",
      lastMessage: "Vamos ajustar proteína no jantar.",
      unreadCount: 2,
      status: "active",
      lastMessageAt: "2026-05-02T09:25:00Z",
    },
    {
      id: "room-002",
      patientName: "João Lima",
      program: "Recomposição corporal",
      lastMessage: "Exames anexados no prontuário.",
      unreadCount: 0,
      status: "muted",
      lastMessageAt: "2026-05-02T08:15:00Z",
    },
  ] satisfies StaffChatRoom[],
  messages: [
    {
      id: "m-1",
      roomId: "room-001",
      senderName: "Dra. Camila",
      senderRole: "Nutricionista",
      content: "Paciente relata fome noturna recorrente.",
      createdAt: "2026-05-02T09:00:00Z",
      status: "read",
      mine: false,
    },
    {
      id: "m-2",
      roomId: "room-001",
      senderName: "Dr. Pedro",
      senderRole: "Médico",
      content: "Sugiro priorizar ceia com fibras e proteína.",
      createdAt: "2026-05-02T09:10:00Z",
      status: "delivered",
      mine: true,
    },
  ] satisfies StaffChatMessage[],
  contexts: [
    {
      roomId: "room-001",
      patientName: "Carla Souza",
      nextConsultation: "2026-05-05 16:30",
      pendingDocuments: ["Termo LGPD", "Checklist de adesão"],
      quickActions: ["Abrir prontuário", "Ver plano alimentar", "Ir para documentos"],
    },
  ] satisfies StaffChatPatientContext[],
};
