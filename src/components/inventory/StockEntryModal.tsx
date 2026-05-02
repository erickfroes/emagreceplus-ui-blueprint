"use client";

import { useMemo, useState } from "react";
import { ShieldAlert, Upload } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { suppliers } from "@/data/mock/inventory";

type StockEntryModalProps = {
  itemName: string;
  unit: string;
  onClose?: () => void;
};

export function StockEntryModal({ itemName, unit, onClose }: StockEntryModalProps) {
  const [quantity, setQuantity] = useState("12");
  const [unitCost, setUnitCost] = useState("35.90");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const parsedQuantity = Number(quantity.replace(",", "."));
  const parsedUnitCost = Number(unitCost.replace(",", "."));
  const hasInvalidCosts = Number.isNaN(parsedQuantity) || Number.isNaN(parsedUnitCost) || parsedQuantity <= 0 || parsedUnitCost <= 0;

  const totalCost = useMemo(() => {
    const q = Number(quantity.replace(",", "."));
    const u = Number(unitCost.replace(",", "."));
    if (Number.isNaN(q) || Number.isNaN(u)) return "0,00";
    return (q * u).toFixed(2).replace(".", ",");
  }, [quantity, unitCost]);

  return (
    <>
      <Modal
        title="Entrada de estoque (simulada)"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button disabled={hasInvalidCosts} onClick={() => setConfirmOpen(true)}>{hasInvalidCosts ? "Ajuste os campos" : "Confirmar entrada"}</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="rounded-2xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            <p className="flex items-center gap-2 font-medium"><ShieldAlert className="h-4 w-4" /> Aviso de auditoria</p>
            <p>Ação somente visual para prototipação. Não registra estoque real, sem backend e sem integração externa.</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Input label="Item" defaultValue={itemName} />
            <Input label="Unidade" defaultValue={unit.toUpperCase()} />
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Fornecedor
              <select className="h-11 w-full rounded-2xl border border-input bg-white px-3 text-sm text-slate-900">
                {suppliers.map((supplier) => <option key={supplier.id}>{supplier.nome}</option>)}
              </select>
            </label>
            <Input label="Número da nota" placeholder="NF-000123" />
            <Input label="Lote" placeholder="L2026-05" />
            <Input label="Validade" type="date" />
            <Input label="Quantidade" value={quantity} onChange={(e) => setQuantity(e.target.value)} error={parsedQuantity <= 0 || Number.isNaN(parsedQuantity) ? "Informe uma quantidade válida." : undefined} />
            <Input label="Custo unitário (R$)" value={unitCost} onChange={(e) => setUnitCost(e.target.value)} error={parsedUnitCost <= 0 || Number.isNaN(parsedUnitCost) ? "Informe um custo unitário válido." : undefined} />
            <Input label="Custo total (R$)" value={totalCost} readOnly className="bg-slate-50" />
            <label className="flex items-center gap-2 rounded-xl border border-input px-3 py-2 text-sm text-slate-700">
              <input type="checkbox" className="h-4 w-4" /> Criar novo lote
            </label>
          </div>

          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
            <p className="mb-2 font-medium text-slate-800">Upload visual de nota</p>
            <p className="flex items-center gap-2"><Upload className="h-4 w-4" /> Arraste o arquivo aqui (simulado)</p>
          </div>

          <p className="text-xs text-slate-500">Estados LEEF do fluxo ficam disponíveis nas rotas de estoque com <code>?state=loading|empty|error|forbidden</code>.</p>

          <Textarea label="Observações" placeholder="Detalhes da entrada, conferência e responsável." />
        </div>
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        title="Confirmar entrada simulada"
        description="Deseja confirmar esta entrada para fins de prototipação visual? Nenhum dado real será persistido."
        confirmLabel="Confirmar"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => { setConfirmOpen(false); onClose?.(); }}
      />
    </>
  );
}
