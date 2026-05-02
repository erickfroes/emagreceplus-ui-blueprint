"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PaymentRegistrationModal } from "@/components/finance/PaymentRegistrationModal";
import { asaasIntegrationPlan, auditTrail, financeKpis, receivables } from "@/data/mock/finance";

export default function FinancePage() {
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const receivable = receivables[0];

  return <DashboardShell active="Financeiro"><PageHeader title="Financeiro da Clínica" description="Visão consolidada por unidade com fluxos financeiros simulados." />
    <div className="ep-kpi-grid">{financeKpis.map((kpi) => <StatCard key={kpi.label} title={kpi.label} value={kpi.value} />)}</div>
    <Card className="mt-4"><CardHeader><CardTitle>Conector Asaas (planejado)</CardTitle></CardHeader><CardContent className="space-y-2 text-sm text-slate-600"><p>Status: <strong>{asaasIntegrationPlan.status}</strong></p><p>Execução: server-side only</p><p>Chave API no browser: bloqueada</p><p>RLS: {asaasIntegrationPlan.rls}</p><Button className="mt-2" onClick={() => setOpenPaymentModal(true)}>Registrar pagamento</Button></CardContent></Card>
    <Card className="mt-4"><CardHeader><CardTitle>Auditoria financeira</CardTitle></CardHeader><CardContent className="space-y-2">{auditTrail.map((item) => <p key={item.at}>{item.at} • {item.action} • {item.detail}</p>)}</CardContent></Card>

    <PaymentRegistrationModal
      open={openPaymentModal}
      onClose={() => setOpenPaymentModal(false)}
      receivable={{
        id: receivable.id,
        patient: receivable.patient,
        description: receivable.service,
        openAmount: Number(receivable.amount.replace(/[R$ .]/g, "").replace(",", ".")),
      }}
      canSendReceiptToPatient={false}
    />
  </DashboardShell>;
}
