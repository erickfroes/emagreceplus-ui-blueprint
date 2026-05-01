import { Paperclip, SendHorizontal, ShieldCheck } from "lucide-react";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { StatePreview } from "@/components/patient-mobile/StatePreview";

export default function PatientChatPage() {
  const messages = [
    { from: "Nutricionista", text: "Bom dia, Juliana! Como foi sua hidratação ontem?" },
    { from: "Você", text: "Consegui 2 litros. Hoje vou ajustar para bater a meta." },
    { from: "Nutricionista", text: "Ótimo caminho. Vamos revisar no check-in semanal." },
  ];

  return (
    <MobileAppShell active="Chat">
      <h1 className="text-xl font-semibold">Chat com equipe</h1>
      <p className="mt-1 text-xs text-slate-500">Mensagens protegidas em ambiente seguro.</p>

      <Card className="mt-4 rounded-2xl p-4">
        <div className="mb-3 flex items-center gap-2 rounded-xl bg-emerald-50 p-2 text-xs text-emerald-800">
          <ShieldCheck className="h-4 w-4" /> Canal assistencial para orientações do seu plano.
        </div>
        <div className="space-y-3">
          {messages.map((message, idx) => (
            <div key={idx} className={message.from === "Você" ? "ml-10 rounded-2xl bg-emerald-600 p-3 text-xs text-white" : "mr-10 rounded-2xl bg-slate-100 p-3 text-xs text-slate-700"}>
              <p className="mb-1 font-semibold">{message.from}</p>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-end gap-2">
          <Button variant="outline" size="icon"><Paperclip className="h-4 w-4" /></Button>
          <Input placeholder="Escreva sua mensagem" className="h-10" />
          <Button size="icon"><SendHorizontal className="h-4 w-4" /></Button>
        </div>
      </Card>

      <StatePreview context="Chat paciente" />
    </MobileAppShell>
  );
}
