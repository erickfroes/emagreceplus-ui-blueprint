"use client";
import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export default function NewPackagePage() {
  const [open, setOpen] = useState(false);
  return <DashboardShell active="Planos e Pacotes"><PageHeader title="Criar Pacote" description="Criação de pacote com confirmação em ação crítica." />
    <Card><CardHeader><CardTitle>Configuração inicial</CardTitle></CardHeader><CardContent><p className="mb-4">Defina nome, período e regras comerciais (UI simulada).</p><Button onClick={() => setOpen(true)}>Publicar pacote</Button></CardContent></Card>
    <ConfirmDialog open={open} title="Confirmar publicação" description="Deseja publicar este pacote para venda interna?" onCancel={() => setOpen(false)} onConfirm={() => setOpen(false)} />
  </DashboardShell>;
}
