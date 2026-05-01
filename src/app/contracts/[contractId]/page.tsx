"use client";
import { useParams } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function ContractPage() {
  const params = useParams<{ contractId: string }>();
  return <DashboardShell active="Planos e Pacotes"><PageHeader title={`Contrato do Pacote #${params.contractId}`} description="Documento contratual em estado simulado com assinatura planejada (não configurado)." />
    <Card><CardHeader><CardTitle>Status contratual</CardTitle></CardHeader><CardContent>D4Sign: não configurado. Documento pronto para revisão jurídica antes da assinatura.</CardContent></Card>
  </DashboardShell>;
}
