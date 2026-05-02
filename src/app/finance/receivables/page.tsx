"use client";
import { useMemo, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { UiStateView } from "@/components/finance/UiStateView";
import { PaymentRegistrationModal } from "@/components/finance/PaymentRegistrationModal";
import { asaasIntegrationPlan, receivables, type UiState } from "@/data/mock/finance";

export default function ReceivablesPage() {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [selectedReceivableId, setSelectedReceivableId] = useState(receivables[0]?.id ?? "");
  const uiState: UiState = "default";
  const billingLabels = useMemo(() => ({ PIX: "Pix", BOLETO: "Boleto", CREDIT_CARD: "Cartão" }), []);
  const selectedReceivable = receivables.find((item) => item.id === selectedReceivableId) ?? receivables[0];

  return <DashboardShell active="Financeiro"><PageHeader title="Contas a Receber" description="Gestão visual de recebimentos com integração Asaas simulada e server-side planejada." />
    <UiStateView state={uiState} title="Lançamentos pendentes">
      <Card><CardHeader><CardTitle>Lançamentos pendentes</CardTitle></CardHeader><CardContent className="space-y-3">
        {receivables.map((item) => <div key={item.id} className="space-y-2 rounded-2xl border p-4"><div className="flex items-center justify-between"><div><p className="font-semibold">{item.patient}</p><p className="text-sm text-slate-500">{item.service} • vence em {item.dueDate}</p></div><div className="text-right"><p>{item.amount}</p><Badge tone="warning">{item.status}</Badge></div></div>
          <p className="text-xs text-slate-500">Cobrança: {item.allowedBillingTypes.map((type) => billingLabels[type]).join(" / ")} • ref {item.externalReference}</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => { setSelectedReceivableId(item.id); setOpen(true); }}>Registrar pagamento desta cobrança</Button>
            <Button variant="ghost" onClick={() => { setSelectedReceivableId(item.id); setOpen(true); }}>Ações da linha: registrar pagamento</Button>
          </div>
        </div>)}
        <div className="flex gap-2"><Button onClick={() => setOpen(true)}>Registrar pagamento</Button><Button variant="outline" onClick={() => setConfirm(true)}>Confirmar baixa em lote</Button></div>
        <p className="text-xs text-slate-500">Fluxo Asaas em modo <strong>{asaasIntegrationPlan.status}</strong>. Sem chave no browser, webhook idempotente e sem baixa dupla.</p>
      </CardContent></Card>
    </UiStateView>

    {selectedReceivable ? <PaymentRegistrationModal
      open={open}
      onClose={() => setOpen(false)}
        receivable={{
        id: selectedReceivable.id,
        patient: selectedReceivable.patient,
        description: selectedReceivable.service,
        originalAmount: selectedReceivable.originalAmount,
        openAmount: selectedReceivable.openAmount,
      }}
      canSendReceiptToPatient={false}
    /> : null}

    <ConfirmDialog open={confirm} title="Confirmar ação crítica" description="Deseja marcar os itens selecionados como pagos?" confirmLabel="Sim, confirmar" onCancel={() => setConfirm(false)} onConfirm={() => setConfirm(false)} />

  </DashboardShell>;
}
