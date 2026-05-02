import { Tabs } from "@/components/ui/Tabs";

const items = [
  { id: "todas", label: "Todas" },
  { id: "nao-lidas", label: "Não lidas" },
  { id: "criticas", label: "Críticas" },
  { id: "documentos", label: "Documentos" },
  { id: "agenda", label: "Agenda" },
  { id: "chat", label: "Chat" },
];

export function NotificationTabs({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  return <Tabs items={items} value={value} onChange={onChange} />;
}
