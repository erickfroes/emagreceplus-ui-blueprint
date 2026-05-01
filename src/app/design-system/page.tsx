"use client";

import * as React from "react";
import { Home, Users, Wallet } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { ActionMenu } from "@/components/ui/ActionMenu";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterBar } from "@/components/ui/FilterBar";
import { Input } from "@/components/ui/Input";
import { MetricChartCard } from "@/components/ui/MetricChartCard";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { SelectField } from "@/components/ui/SelectField";
import { StatCard } from "@/components/ui/StatCard";
import { Tabs } from "@/components/ui/Tabs";
import { Textarea } from "@/components/ui/Textarea";
import { Timeline } from "@/components/ui/Timeline";

const rows = [
  { id: 1, nome: "Ana Souza", plano: "Premium", status: "Ativo" },
  { id: 2, nome: "Carla Lima", plano: "Essencial", status: "Pendente" },
];

export default function DesignSystemPage() {
  const [tab, setTab] = React.useState("overview");
  const [showModal, setShowModal] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  return (
    <main className="mx-auto max-w-7xl space-y-6 p-6">
      <PageHeader title="Design System" description="Catálogo visual com acentos emerald/teal do EmagrecePlus." actions={<Button>Nova ação</Button>} />
      <Tabs items={[{ id: "overview", label: "Visão geral" }, { id: "forms", label: "Formulários" }]} value={tab} onChange={setTab} />
      <Card><CardHeader><CardTitle>Button, Badge e CTA</CardTitle></CardHeader><CardContent className="flex flex-wrap items-center gap-3"><Button>Primário</Button><Button variant="secondary">Secundário</Button><Button variant="outline">Outline</Button><Badge tone="success">Ativo</Badge><ActionMenu items={[{ label: "Editar" }, { label: "Arquivar" }]} /></CardContent></Card>
      <FilterBar><Input label="Buscar" placeholder="Nome do paciente" /><SelectField label="Status" defaultValue="todos"><option value="todos">Todos</option><option value="ativo">Ativo</option></SelectField><Textarea label="Observação" placeholder="Notas internas" /></FilterBar>
      <div className="grid gap-4 md:grid-cols-3"><StatCard title="Pacientes ativos" value="124" trend="+8%" trendDirection="up" /><ProgressRing value={72} label="72%" sublabel="Aderência média" /><MetricChartCard title="Evolução semanal" points={[{ label: "Seg", value: 14 }, { label: "Ter", value: 18 }, { label: "Qua", value: 11 }]} /></div>
      <DataTable columns={[{ key: "nome", label: "Nome" }, { key: "plano", label: "Plano" }, { key: "status", label: "Status" }]} rows={rows} />
      <div className="grid gap-4 lg:grid-cols-2"><Card><CardHeader><CardTitle>Progress + estados</CardTitle></CardHeader><CardContent className="space-y-3"><div className="h-3 w-full rounded-full bg-muted"><div className="h-3 rounded-full bg-primary" style={{ width: "68%" }} /></div><div className="flex flex-wrap gap-2"><Badge tone="success">loading</Badge><Badge tone="neutral">empty</Badge><Badge tone="danger">error</Badge><Badge tone="warning">forbidden</Badge></div></CardContent></Card><Card><CardHeader><CardTitle>Sidebar preview</CardTitle></CardHeader><CardContent><div className="overflow-hidden rounded-2xl border border-border"><Sidebar title="menu" activeLabel="Dashboard" items={[{ label: "Dashboard", href: "#", icon: Home }, { label: "Pacientes", href: "#", icon: Users }, { label: "Financeiro", href: "#", icon: Wallet }]} /></div></CardContent></Card></div>
      <Card><CardHeader><CardTitle>Timeline + Empty/Error</CardTitle></CardHeader><CardContent className="space-y-4"><Timeline items={[{ title: "Cadastro criado", time: "08:30" }, { title: "Plano atualizado", time: "09:15" }]} /><EmptyState title="Sem registros" description="Quando não houver dados, este estado orienta o próximo passo." actionLabel="Criar registro" /><p className="text-sm text-danger">Erro simulado para validação visual.</p><div className="flex gap-2"><Button variant="secondary" onClick={() => setShowModal(true)}>Abrir Modal</Button><Button variant="danger" onClick={() => setShowConfirm(true)}>Abrir ConfirmDialog</Button></div></CardContent></Card>
      {showModal ? <Modal title="Modal de exemplo" footer={<Button onClick={() => setShowModal(false)}>Fechar</Button>}><p className="text-sm text-muted-foreground">Conteúdo de demonstração do componente Modal.</p></Modal> : null}
      <ConfirmDialog open={showConfirm} title="Excluir item" description="Esta ação não pode ser desfeita. Deseja continuar?" onCancel={() => setShowConfirm(false)} onConfirm={() => setShowConfirm(false)} />
    </main>
  );
}
