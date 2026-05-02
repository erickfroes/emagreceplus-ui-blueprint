import type { ChatMessageStatus, ChatRoomStatus } from "@/contracts/chat";

export type StaffChatRoomKind = "patient" | "internal";

export interface StaffChatRoom {
  id: string;
  patientName: string;
  program: string;
  lastMessage: string;
  unreadCount: number;
  status: ChatRoomStatus;
  kind: StaffChatRoomKind;
  archived: boolean;
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
  activePackage: string;
  nextConsultation: string;
  pendingDocuments: string[];
  alerts: string[];
}

export const chatMock = {
  rooms: [
    { id: "room-001", patientName: "Carla Souza", program: "Emagrecimento 12 semanas", lastMessage: "Vamos ajustar proteína no jantar.", unreadCount: 2, status: "active", kind: "patient", archived: false, lastMessageAt: "2026-05-02T09:25:00Z" },
    { id: "room-002", patientName: "João Lima", program: "Recomposição corporal", lastMessage: "Exames anexados no prontuário.", unreadCount: 0, status: "muted", kind: "patient", archived: false, lastMessageAt: "2026-05-02T08:15:00Z" },
    { id: "room-003", patientName: "Discussão interna", program: "Round clínico", lastMessage: "Confirmado plano de follow-up de sábado.", unreadCount: 1, status: "active", kind: "internal", archived: false, lastMessageAt: "2026-05-02T07:20:00Z" },
    { id: "room-004", patientName: "Paula Mendes", program: "Manutenção", lastMessage: "Conversa arquivada após alta.", unreadCount: 0, status: "closed", kind: "patient", archived: true, lastMessageAt: "2026-04-29T17:10:00Z" },
  ] satisfies StaffChatRoom[],
  messages: [
    { id: "m-1", roomId: "room-001", senderName: "Dra. Camila", senderRole: "Nutricionista", content: "Paciente relata fome noturna recorrente.", createdAt: "2026-05-02T09:00:00Z", status: "read", mine: false },
    { id: "m-2", roomId: "room-001", senderName: "Dr. Pedro", senderRole: "Médico", content: "Sugiro priorizar ceia com fibras e proteína.", createdAt: "2026-05-02T09:10:00Z", status: "delivered", mine: true },
    { id: "m-3", roomId: "room-001", senderName: "Enf. Laura", senderRole: "Enfermagem", content: "Sinais vitais estáveis no último check-in.", createdAt: "2026-05-02T09:18:00Z", status: "sent", mine: false },
  ] satisfies StaffChatMessage[],
  contexts: [
    { roomId: "room-001", patientName: "Carla Souza", activePackage: "Premium Metabólico", nextConsultation: "2026-05-05 16:30", pendingDocuments: ["Termo LGPD", "Checklist de adesão"], alerts: ["Alergia a crustáceos", "Baixa adesão hídrica"] },
  ] satisfies StaffChatPatientContext[],
};
