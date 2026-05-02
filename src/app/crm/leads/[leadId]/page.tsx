import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { crmLeads } from "@/data/mock/crm";

export default async function LeadDetailPage({ params }: { params: Promise<{ leadId: string }> }) {
  const { leadId } = await params;
  const lead = crmLeads.find((item) => item.id === leadId);

  if (!lead) notFound();

  return (
    <DashboardShell active="CRM">
      <PageHeader title="Detalhe do lead" description="Visão comercial, timeline e ações rápidas de qualificação." />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>{lead.nome}</CardTitle><Badge tone="primary">{lead.stage}</Badge></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p><span className="font-medium">Objetivo:</span> {lead.objetivo}</p>
            <p><span className="font-medium">Origem:</span> {lead.origem}</p>
            <p><span className="font-medium">Responsável:</span> {lead.responsavel}</p>
            <p><span className="font-medium">Telefone:</span> {lead.telefone}</p>
            <p><span className="font-medium">Observações:</span> {lead.observacoes}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Quick actions</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm"><p>Próximo contato: até 24h</p><p>Canal preferencial: WhatsApp</p><div className="flex flex-wrap gap-2">{lead.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div></CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
