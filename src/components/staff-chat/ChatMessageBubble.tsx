import type { StaffChatMessage } from "@/data/mock/chat.mock";

export function ChatMessageBubble({ message }: { message: StaffChatMessage }) {
  return <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${message.mine ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"}`}>
    <p className="font-medium">{message.senderName} · {message.senderRole}</p>
    <p>{message.content}</p>
  </div>;
}
