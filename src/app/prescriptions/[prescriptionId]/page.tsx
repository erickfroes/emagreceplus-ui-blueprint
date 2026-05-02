"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { DocumentPreviewCard } from "@/components/nutrition/DocumentPreviewCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Tabs } from "@/components/ui/Tabs";
import { getStateFromParam } from "@/data/mock/nutrition";
import { getVisibleItemsByRole, prescriptionDocuments, type PrescriptionStatus, type PrescriptionTab } from "@/data/mock/prescriptions";

const TAB_LABELS: Record<PrescriptionTab, string> = {
  prescricao_medica: "Prescrição médica",
  suplementacao: "Suplementação",
  orientacoes_nutricionais: "Orientações nutricionais",
  orientacoes_gerais: "Orientações gerais",
};

const STATUS_LABEL: Record<PrescriptionStatus, string> = {
  rascunho: "Rascunho",
  emitida: "Emitida",
  assinatura_pendente: "Assinatura pendente",
};

export default function PrescriptionsPage() {
  const params = useParams<{ prescriptionId: string }>();
  const searchParams = useSearchParams();
  const state = getStateFromParam(searchParams.get("state"));
  const doc = prescriptionDocuments[params.prescriptionId];
  const visibleItems = doc ? getVisibleItemsByRole(doc) : [];
  const availableTabs = Array.from(new Set(visibleItems.map((item) => item.tab)));
  const [activeTab, setActiveTab] = useState<PrescriptionTab>(availableTabs[0] ?? "orientacoes_nutricionais");

  return (
    <DashboardShell active="Pacientes">
      <h1 className="text-2xl font-semibold text-slate-950">Prescrições e orientações</h1>
      <p className="mb-4 mt-1 text-sm text-muted-foreground">Tela segmentada por tipo documental, histórico e assinatura simulada.</p>

      {state === "loading" ? <p className="text-sm text-muted-foreground">Carregando prescrições...</p> : null}
      {state === "error" ? <p className="text-sm text-danger">Erro ao carregar prescrições.</p> : null}
      {state === "forbidden" ? <p className="text-sm text-danger">Você não tem permissão para acessar este documento.</p> : null}
      {state === "empty" ? <EmptyState title="Sem prescrições" description="Não há documento emitido para este paciente." /> : null}

      {state === "default" && doc ? (
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>{doc.patientName}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Data do documento: {doc.createdAt}</p>
              <p className="text-sm text-muted-foreground">Profissional: {doc.professionalName} • {doc.professionalRegistry}</p>
              <Badge tone="info">Status atual: {STATUS_LABEL[doc.status]}</Badge>
              <Tabs
                items={(Object.keys(TAB_LABELS) as PrescriptionTab[]).map((tab) => ({ id: tab, label: TAB_LABELS[tab], disabled: !availableTabs.includes(tab) }))}
                value={activeTab}
                onChange={(value) => setActiveTab(value as PrescriptionTab)}
                className="w-full overflow-auto"
              />
              {visibleItems
                .filter((item) => item.tab === activeTab)
                .map((item) => (
                  <div key={item.id} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                    <p className="font-medium text-slate-900">{item.titulo}</p>
                    <p className="text-sm text-slate-700">{item.descricao}</p>
                  </div>
                ))}
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Salvar rascunho</Button>
                <Button size="sm" variant="outline">Gerar documento simulado</Button>
                <Button size="sm" variant="secondary">Enviar para assinatura simulada</Button>
              </div>
            </CardContent>
          </Card>

          <DocumentPreviewCard
            title={`Documento clínico - ${doc.patientName}`}
            subtitle={`Preview simulado • ${doc.createdAt}`}
            sections={(Object.keys(TAB_LABELS) as PrescriptionTab[])
              .filter((tab) => visibleItems.some((item) => item.tab === tab))
              .map((tab) => ({
                heading: TAB_LABELS[tab],
                lines: visibleItems.filter((item) => item.tab === tab).map((item) => `${item.titulo}: ${item.descricao}`),
              }))}
          />

          <Card>
            <CardHeader><CardTitle>Histórico de versões</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {doc.historico.map((entry) => (
                <div key={entry.id} className="rounded-xl border border-border p-3 text-sm">
                  <p className="font-medium text-slate-900">{entry.acao}</p>
                  <p className="text-muted-foreground">{entry.data} • {STATUS_LABEL[entry.status]}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ) : null}

      {state === "default" && !doc ? <EmptyState title="Documento não encontrado" description="ID inexistente no mock atual." /> : null}

      <div className="mt-4"><Link href="/patients" className="text-sm text-primary-700 hover:underline">← Voltar para pacientes</Link></div>
    </DashboardShell>
  );
}
