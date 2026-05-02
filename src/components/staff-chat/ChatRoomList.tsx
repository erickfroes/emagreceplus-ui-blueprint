import { Input } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { StaffChatRoom } from "@/data/mock/chat.mock";

export function ChatRoomList({
  rooms,
  roomId,
  onSelect,
  filter,
  onFilter,
}: {
  rooms: StaffChatRoom[];
  roomId: string;
  onSelect: (id: string) => void;
  filter: string;
  onFilter: (value: string) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas e conversas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input placeholder="Buscar por paciente" />
        <Tabs
          items={[
            { id: "nao-lidas", label: "Não lidas" },
            { id: "pacientes", label: "Pacientes" },
            { id: "internas", label: "Internas" },
            { id: "arquivadas", label: "Arquivadas" },
          ]}
          value={filter}
          onChange={onFilter}
        />
        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => onSelect(room.id)}
            className={`w-full rounded-2xl border p-3 text-left ${roomId === room.id ? "border-primary" : "border-border"}`}
          >
            <p className="font-medium">{room.patientName}</p>
            <p className="text-xs text-muted-foreground">{room.program}</p>
            <p className="text-sm">{room.lastMessage}</p>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
