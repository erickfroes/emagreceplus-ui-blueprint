"use client";

import { useEffect, useMemo, useState } from "react";
import { ShieldAlert, Upload } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

type PaymentMethod = "Pix" | "Boleto" | "Cartão" | "Dinheiro" | "Transferência";

type PaymentRegistrationModalProps = {
  open: boolean;
  onClose: () => void;
  receivable: {
    id: string;
    patient: string;
    description: string;
    originalAmount: number;
    openAmount: number;
  };
  canSendReceiptToPatient?: boolean;
};

const paymentMethods: PaymentMethod[] = ["Pix", "Boleto", "Cartão", "Dinheiro", "Transferência"];

const cashAccounts = ["Caixa principal", "Conta operacional", "Conta digital (simulada)"];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export function PaymentRegistrationModal({
  open,
  onClose,
  receivable,
  canSendReceiptToPatient = true,
}: PaymentRegistrationModalProps) {
  const [receivedAmount, setReceivedAmount] = useState(String(receivable.openAmount));
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Pix");
  const [cashAccount, setCashAccount] = useState(cashAccounts[0]);
  const [notes, setNotes] = useState("");
  const [partialPayment, setPartialPayment] = useState(false);
  const [generateReceipt, setGenerateReceipt] = useState(true);
  const [sendProofToPatient, setSendProofToPatient] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setReceivedAmount(String(receivable.openAmount));
    setPaymentDate(new Date().toISOString().slice(0, 10));
    setPaymentMethod("Pix");
    setCashAccount(cashAccounts[0]);
    setNotes("");
    setPartialPayment(false);
    setGenerateReceipt(true);
    setSendProofToPatient(false);
    setFormError(null);
    setConfirmOpen(false);
  }, [open, receivable]);

  const receivedValueNumber = Number(receivedAmount.replace(",", "."));
  const remainingAmount = useMemo(() => Math.max(receivable.openAmount - receivedValueNumber, 0), [receivable.openAmount, receivedValueNumber]);
  const overpayment = receivedValueNumber > receivable.openAmount;

  useEffect(() => {
    if (receivedValueNumber >= receivable.openAmount) {
      setPartialPayment(false);
    }
  }, [receivedValueNumber, receivable.openAmount]);

  const validate = () => {
    if (!receivedAmount || Number.isNaN(receivedValueNumber) || receivedValueNumber <= 0) {
      setFormError("Informe um valor recebido válido para prosseguir.");
      return false;
    }

    if (partialPayment && receivedValueNumber >= receivable.openAmount) {
      setFormError("Pagamento parcial ativo: o valor recebido deve ser menor que o valor em aberto.");
      return false;
    }

    if (overpayment) {
      setFormError("O valor recebido não pode ser maior que o valor em aberto.");
      return false;
    }

    if (!partialPayment && receivedValueNumber !== receivable.openAmount) {
      setFormError("Para baixa total, o valor recebido deve ser igual ao valor em aberto.");
      return false;
    }

    setFormError(null);
    return true;
  };

  const handleConfirmClick = () => {
    if (!validate()) return;
    setConfirmOpen(true);
  };

  const handleFinalConfirm = () => {
    setConfirmOpen(false);
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <Modal
        title="Registrar pagamento"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button onClick={handleConfirmClick}>Confirmar baixa</Button>
          </div>
        }
      >
        <div className="space-y-4 text-sm">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-amber-900">
            <div className="mb-1 flex items-center gap-2 font-medium"><ShieldAlert className="h-4 w-4" /> Aviso de auditoria</div>
            <p>Esta ação será registrada na auditoria financeira.</p>
            <p className="mt-1 text-xs">Baixa simulada (UI-only), sem integração real com Asaas e sem persistência em backend nesta fase.</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="space-y-1"><span className="text-xs text-slate-600">Paciente</span><input className="w-full rounded-xl border px-3 py-2" value={receivable.patient} disabled /></label>
            <label className="space-y-1"><span className="text-xs text-slate-600">Descrição da cobrança</span><input className="w-full rounded-xl border px-3 py-2" value={receivable.description} disabled /></label>
            <label className="space-y-1"><span className="text-xs text-slate-600">Valor original</span><input className="w-full rounded-xl border px-3 py-2" value={formatCurrency(receivable.originalAmount)} disabled /></label>
            <label className="space-y-1"><span className="text-xs text-slate-600">Valor em aberto</span><input className="w-full rounded-xl border px-3 py-2" value={formatCurrency(receivable.openAmount)} disabled /></label>
            <label className="space-y-1"><span className="text-xs text-slate-600">Valor recebido</span><input className="w-full rounded-xl border px-3 py-2" value={receivedAmount} onChange={(e) => setReceivedAmount(e.target.value)} /></label>
            <label className="space-y-1"><span className="text-xs text-slate-600">Data do pagamento</span><input type="date" className="w-full rounded-xl border px-3 py-2" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} /></label>
            <label className="space-y-1"><span className="text-xs text-slate-600">Forma de pagamento</span><select className="w-full rounded-xl border px-3 py-2" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}>{paymentMethods.map((method) => <option key={method}>{method}</option>)}</select></label>
            <label className="space-y-1"><span className="text-xs text-slate-600">Conta/Caixa</span><select className="w-full rounded-xl border px-3 py-2" value={cashAccount} onChange={(e) => setCashAccount(e.target.value)}>{cashAccounts.map((account) => <option key={account}>{account}</option>)}</select></label>
            <label className="space-y-1 md:col-span-2"><span className="text-xs text-slate-600">Comprovante (upload visual)</span><button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed px-3 py-4 text-slate-600"><Upload className="h-4 w-4" /> Selecionar arquivo (simulado)</button></label>
            <label className="space-y-1 md:col-span-2"><span className="text-xs text-slate-600">Observações</span><textarea className="w-full rounded-xl border px-3 py-2" rows={3} placeholder="Ex.: pagamento em duas partes, recebido no balcão." value={notes} onChange={(e) => setNotes(e.target.value)} /></label>
          </div>

          <div className="rounded-2xl border p-3">
            <label className="flex items-center gap-2"><input type="checkbox" checked={partialPayment} disabled={receivedValueNumber >= receivable.openAmount} onChange={(e) => setPartialPayment(e.target.checked)} /><span>Pagamento parcial</span></label>
            <p className="mt-2 text-xs text-slate-600">Valor restante: <strong>{formatCurrency(remainingAmount)}</strong></p>
          </div>

          <div className="space-y-2 rounded-2xl border p-3">
            <label className="flex items-center gap-2"><input type="checkbox" checked={generateReceipt} onChange={(e) => setGenerateReceipt(e.target.checked)} /><span>Gerar recibo após confirmar baixa</span></label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={sendProofToPatient} disabled={!canSendReceiptToPatient} onChange={(e) => setSendProofToPatient(e.target.checked)} /><span>Enviar comprovante ao paciente</span></label>
            {!canSendReceiptToPatient ? <p className="text-xs text-amber-700">Envio automático indisponível no perfil atual (visualmente bloqueado).</p> : null}
          </div>

          {overpayment ? <div className="rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-red-700">Valor recebido acima do valor em aberto.</div> : null}
          {formError ? <div className="rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-red-700">{formError}</div> : null}
        </div>
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        title="Confirmar baixa de pagamento"
        description="Esta ação crítica será registrada na trilha de auditoria simulada. Deseja confirmar a baixa agora?"
        confirmLabel="Sim, confirmar baixa"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleFinalConfirm}
      />
    </>
  );
}
