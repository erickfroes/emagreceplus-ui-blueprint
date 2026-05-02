"use client";
import { useParams } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function ContractPage() {
  const params = useParams<{ contractId: string }>();
  return <DashboardShell active="Planos e Pacotes"><PageHeader title={`Contrato do Pacote #${params.contractId}`} description="Checklist contratual com provider D4Sign em modo não configurado." />
    <Card className="mb-4"><CardHeader><CardTitle>Status contratual</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><p><strong>Provider:</strong> D4Sign</p><p><strong>Modo:</strong> não configurado/simulado</p><p><strong>Armazenamento:</strong> Supabase Storage privado (planejado)</p><Badge tone="warning">assinatura pendente</Badge></CardContent></Card>
    <Card><CardHeader><CardTitle>Checklist rápido</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><p>• Revisão jurídica interna concluída</p><p>• Validação de cláusulas LGPD pendente</p><p>• Envio para assinatura digital simulado</p></CardContent></Card>
  </DashboardShell>;
}
