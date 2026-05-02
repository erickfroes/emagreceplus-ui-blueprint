"use client";

import { useState } from "react";
import { AlertTriangle, ShieldAlert } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { SelectField } from "@/components/ui/SelectField";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

type StockOutputModalProps = {
  itemName: string;
  unit: string;
  currentStock: number;
  defaultLot: string;
  onClose?: () => void;
};

export function StockOutputModal({ itemName, unit, currentStock, defaultLot, onClose }: StockOutputModalProps) {
  const [quantity, setQuantity] = useState(String(currentStock + 2));
  const [confirmOpen, setConfirmOpen] = useState(false);
  const requested = Number(quantity);
  const blocked = Number.isNaN(requested) || requested > currentStock || requested <= 0;

  return (
    <>
      <Modal
        title="Saída de estoque (simulada)"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button disabled={blocked} onClick={() => setConfirmOpen(true)}>{blocked ? "Bloqueado" : "Confirmar saída"}</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="rounded-2xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            <p className="flex items-center gap-2 font-medium"><ShieldAlert className="h-4 w-4" /> Aviso de auditoria</p>
            <p>Ação simulada para auditoria de fluxo. Não altera saldo real e não possui backend nesta fase.</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-3 text-sm">
            Estoque atual: <strong>{currentStock} {unit}</strong>
            {blocked ? <Badge tone="danger" className="ml-2">saída bloqueada</Badge> : <Badge tone="success" className="ml-2">apto para simulação</Badge>}
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Input label="Item" defaultValue={itemName} />
            <Input label="Unidade" defaultValue={unit.toUpperCase()} />
            <Input label="Lote" defaultValue={defaultLot} />
            <Input label="Quantidade" value={quantity} onChange={(e) => setQuantity(e.target.value)} error={blocked ? "Quantidade acima do estoque disponível." : undefined} />
            <SelectField label="Motivo" defaultValue="Uso em atendimento">
              <option>Uso em atendimento</option>
              <option>Venda</option>
              <option>Perda</option>
              <option>Vencimento</option>
              <option>Ajuste</option>
            </SelectField>
            <Input label="Vínculo opcional (atendimento/paciente)" placeholder="Ex.: Atend. ENC-2026-114 / Paciente Maria" />
            <Input label="Responsável" placeholder="Profissional responsável" />
          </div>

          {blocked ? (
            <div className="rounded-2xl border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
              <p className="flex items-center gap-2 font-medium"><AlertTriangle className="h-4 w-4" /> Saída indisponível</p>
              A quantidade solicitada excede o saldo disponível e foi bloqueada visualmente.
            </div>
          ) : null}

          <Textarea label="Observações" placeholder="Contexto da saída, justificativa e conferência." />
        </div>
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        title="Confirmar saída simulada"
        description="Deseja confirmar esta saída para validação visual do fluxo? Nenhum movimento real será registrado."
        confirmLabel="Confirmar"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => { setConfirmOpen(false); onClose?.(); }}
      />
    </>
  );
}
