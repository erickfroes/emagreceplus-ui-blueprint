"use client";
import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { receivables } from "@/data/mock/finance";

export default function ReceivablesPage() {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  return <DashboardShell active="Financeiro"><PageHeader title="Contas a Receber" description="Gestão visual de recebimentos com dados mockados." />

      <Card><CardHeader><CardTitle>Lançamentos pendentes</CardTitle></CardHeader><CardContent className="space-y-3">
        {receivables.map((item) => <div key={item.id} className="flex items-center justify-between rounded-2xl border p-4"><div><p className="font-semibold">{item.patient}</p><p className="text-sm text-slate-500">{item.service} • vence em {item.dueDate}</p></div><div className="text-right"><p>{item.amount}</p><Badge tone="warning">{item.status}</Badge></div></div>)}
        <div className="flex gap-2"><Button onClick={() => setOpen(true)}>Registrar pagamento</Button><Button variant="outline" onClick={() => setConfirm(true)}>Confirmar baixa em lote</Button></div>
      </CardContent></Card>
      {open ? <Modal title="Registrar pagamento" footer={<div className="flex justify-end"><Button onClick={() => setOpen(false)}>Salvar (simulado)</Button></div>}><p className="text-sm">Pagamento registrado localmente. Integração Asaas: <strong>não configurado</strong>.</p></Modal> : null}
      <ConfirmDialog open={confirm} title="Confirmar ação crítica" description="Deseja marcar os itens selecionados como pagos?" confirmLabel="Sim, confirmar" onCancel={() => setConfirm(false)} onConfirm={() => setConfirm(false)} />

  </DashboardShell>;
}
