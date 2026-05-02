import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type {
  StaffChatPatientContext,
  StaffChatRoom,
} from "@/data/mock/chat.mock";

export function ChatPatientContextPanel({
  context,
  room,
}: {
  context?: StaffChatPatientContext;
  room?: StaffChatRoom;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contexto do paciente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p>
          <strong>Paciente:</strong>{" "}
          {context?.patientName ?? room?.patientName ?? "—"}
        </p>
        <p>
          <strong>Pacote ativo:</strong> {context?.activePackage ?? "—"}
        </p>
        <p>
          <strong>Próxima consulta:</strong> {context?.nextConsultation ?? "—"}
        </p>
        <p>
          <strong>Documentos pendentes:</strong>{" "}
          {context?.pendingDocuments.join(", ") ?? "Nenhum"}
        </p>
        <p>
          <strong>Alertas:</strong>{" "}
          {context?.alerts.join(", ") ?? "Sem alertas"}
        </p>
      </CardContent>
    </Card>
  );
}
