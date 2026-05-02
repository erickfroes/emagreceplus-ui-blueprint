"use client";

import { useState } from "react";
import { chatMock } from "@/data/mock/chat.mock";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import type { UiState } from "@/contracts/common";
import { ChatRoomList } from "./ChatRoomList";
import { ChatThread } from "./ChatThread";
import { ChatPatientContextPanel } from "./ChatPatientContextPanel";

export function StaffChatView({ state = "default" }: { state?: UiState }) {
  const [roomId, setRoomId] = useState(chatMock.rooms[0]?.id ?? "");
  const [filter, setFilter] = useState("nao-lidas");
  if (state === "loading") return <LoadingState title="Carregando chat da equipe" />;
  if (state === "empty") return <EmptyState title="Sem conversas em andamento" />;
  if (state === "error") return <ErrorState title="Erro ao carregar chat" />;
  if (state === "forbidden") return <ForbiddenState title="Acesso negado ao chat da equipe" />;

  const rooms = chatMock.rooms.filter((room) => {
    if (filter === "nao-lidas") return room.unreadCount > 0;
    if (filter === "pacientes") return room.kind === "patient" && !room.archived;
    if (filter === "internas") return room.kind === "internal";
    if (filter === "arquivadas") return room.archived;
    return true;
  });
  const selectedRoomId = rooms.some((room) => room.id === roomId) ? roomId : rooms[0]?.id ?? "";
  const messages = chatMock.messages.filter((m) => m.roomId === selectedRoomId);
  const context = chatMock.contexts.find((ctx) => ctx.roomId === selectedRoomId);
  const selectedRoom = chatMock.rooms.find((room) => room.id === selectedRoomId);

  return <div className="grid gap-4 xl:grid-cols-[320px_1fr_320px]"><ChatRoomList rooms={rooms} roomId={selectedRoomId} onSelect={setRoomId} filter={filter} onFilter={setFilter} /><ChatThread messages={messages} /><ChatPatientContextPanel context={context} room={selectedRoom} /></div>;
}
