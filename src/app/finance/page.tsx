"use client";

import { useMemo, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PaymentRegistrationModal } from "@/components/finance/PaymentRegistrationModal";
import { asaasIntegrationPlan, auditTrail, financeKpis, receivables } from "@/data/mock/finance";
import { resolveUiState } from "@/data/mock/ui-states";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";

export default function FinancePage() {
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const state = useMemo(() => {
    if (typeof window === "undefined") return "default";
    const params = new URLSearchParams(window.location.search);
    return resolveUiState(params.get("state") ?? undefined);
  }, []);
  const receivable = receivables[0];
  if (state === "loading") return <DashboardShell active="Financeiro"><LoadingState title="Carregando financeiro" /></DashboardShell>;
  if (state === "empty") return <DashboardShell active="Financeiro"><EmptyState title="Sem dados financeiros" /></DashboardShell>;
  if (state === "error") return <DashboardShell active="Financeiro"><ErrorState title="Falha ao carregar financeiro" /></DashboardShell>;
  if (state === "forbidden") return <DashboardShell active="Financeiro"><ForbiddenState title="Acesso negado ao financeiro" /></DashboardShell>;

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
        originalAmount: receivable.originalAmount,
        openAmount: receivable.openAmount,
      }}
      canSendReceiptToPatient={false}
    />
  </DashboardShell>;
}
