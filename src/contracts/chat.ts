import type { UiState } from "./common";

export type ChatRoomStatus = "active" | "muted" | "closed";
export type ChatMessageStatus = "sending" | "sent" | "delivered" | "read" | "failed";

export interface ChatRoom {
  id: string;
  participantIds: string[];
  status: ChatRoomStatus;
  lastMessageAt?: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  createdAt: string;
  status: ChatMessageStatus;
}

export interface ChatListDto { state: UiState; rooms: ChatRoom[] }
export interface ChatDetailDto { room: ChatRoom; messages: ChatMessage[] }

export type ChatAction = "send_message" | "close_room" | "mute_room";
export type ChatModal = "chat_room_info" | "confirm_close_room";
