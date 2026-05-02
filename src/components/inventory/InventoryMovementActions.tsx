"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { StockEntryModal } from "@/components/inventory/StockEntryModal";
import { StockOutputModal } from "@/components/inventory/StockOutputModal";

type InventoryMovementActionsProps = {
  itemName: string;
  unit: string;
  lot: string;
  currentStock: number;
};

export function InventoryMovementActions({ itemName, unit, lot, currentStock }: InventoryMovementActionsProps) {
  const [active, setActive] = useState<"entry" | "output" | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Movimentações de estoque (UI simulada)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">Ações sem persistência real, usadas para validar fluxos de entrada e saída.</p>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setActive("entry")}>Abrir entrada</Button>
          <Button variant="outline" onClick={() => setActive("output")}>Abrir saída</Button>
        </div>
      </CardContent>

      {active === "entry" ? <StockEntryModal itemName={itemName} unit={unit} onClose={() => setActive(null)} /> : null}
      {active === "output" ? <StockOutputModal itemName={itemName} unit={unit} defaultLot={lot} currentStock={currentStock} onClose={() => setActive(null)} /> : null}
    </Card>
  );
}
