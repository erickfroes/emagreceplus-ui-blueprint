"use client";

import { useState } from "react";
import { chatMock } from "@/data/mock/chat.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import type { UiState } from "@/contracts/common";

export function StaffChatView({ state = "default" }: { state?: UiState }) {
  const [roomId, setRoomId] = useState(chatMock.rooms[0]?.id ?? "");
  if (state === "loading") return <LoadingState title="Carregando chat da equipe" />;
  if (state === "empty") return <EmptyState title="Sem conversas em andamento" />;
  if (state === "error") return <ErrorState title="Erro ao carregar chat" />;
  if (state === "forbidden") return <ForbiddenState title="Acesso negado ao chat da equipe" />;

  const messages = chatMock.messages.filter((m) => m.roomId === roomId);
  const context = chatMock.contexts.find((ctx) => ctx.roomId === roomId);

  return <div className="grid gap-4 xl:grid-cols-[300px_1fr_320px]">
    <Card><CardHeader><CardTitle>Salas da equipe</CardTitle></CardHeader><CardContent className="space-y-2">{chatMock.rooms.map((room) => <button key={room.id} className="w-full rounded-xl border border-border p-3 text-left" onClick={() => setRoomId(room.id)}><p className="font-medium">{room.patientName}</p><p className="text-xs text-muted-foreground">{room.program}</p><p className="text-sm">{room.lastMessage}</p><p className="text-xs text-muted-foreground">{room.unreadCount} não lidas • {room.status} • {new Date(room.lastMessageAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</p></button>)}</CardContent></Card>
    <Card><CardHeader><CardTitle>Conversa</CardTitle></CardHeader><CardContent className="space-y-3"><p className="rounded-xl bg-primary-50 p-2 text-sm text-primary-800">Atendimento via chat: seg-sex 08:00–18:00</p><p className="text-sm text-muted-foreground">Mensagens protegidas em ambiente seguro.</p>{messages.map((message) => <div key={message.id} className={`max-w-[80%] rounded-2xl p-3 text-sm ${message.mine ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"}`}><p className="font-medium">{message.senderName} · {message.senderRole}</p><p>{message.content}</p></div>)}<div className="mt-4 flex gap-2"><input className="w-full rounded-xl border border-border px-3 py-2 text-sm" placeholder="Digite uma mensagem (simulado)" /><Button>Enviar</Button></div></CardContent></Card>
    <Card><CardHeader><CardTitle>Contexto do paciente</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><p><strong>Paciente:</strong> {context?.patientName ?? "—"}</p><p><strong>Programa:</strong> {chatMock.rooms.find((r) => r.id === roomId)?.program ?? "—"}</p><p><strong>Próxima consulta:</strong> {context?.nextConsultation ?? "—"}</p><p><strong>Documentos pendentes:</strong> {context?.pendingDocuments.join(", ") ?? "Nenhum"}</p><div className="flex flex-wrap gap-2 pt-2">{context?.quickActions.map((action) => <Button key={action} variant="outline" size="sm">{action}</Button>)}</div></CardContent></Card>
  </div>;
}
