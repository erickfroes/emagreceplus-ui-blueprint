import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { StaffChatMessage } from "@/data/mock/chat.mock";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { ChatComposer } from "./ChatComposer";

export function ChatThread({ messages }: { messages: StaffChatMessage[] }) {
  return <Card><CardHeader><CardTitle>Conversa</CardTitle></CardHeader><CardContent className="space-y-3"><p className="rounded-xl bg-primary-50 p-2 text-sm text-primary-800">SLA de resposta: até 15 minutos em horário comercial (seg-sex 08:00–18:00).</p><p className="text-sm text-muted-foreground">Mensagens protegidas em ambiente seguro.</p>{messages.map((m) => <ChatMessageBubble key={m.id} message={m} />)}<ChatComposer /></CardContent></Card>;
}
