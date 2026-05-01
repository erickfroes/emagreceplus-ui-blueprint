"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Tabs } from "@/components/ui/Tabs";
import { patientDetails, type PatientDetail, type UIState } from "@/data/mock/patients";

const tabItems = [
  { id: "resumo", label: "Resumo" },
  { id: "metas", label: "Metas" },
  { id: "timeline", label: "Timeline" },
];

const pageState: UIState = "default";

function PatientPanels({ detail, tab }: { detail: PatientDetail; tab: string }) {
  if (tab === "resumo") {
    return (
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>{detail.patient.nome}</CardTitle></CardHeader>
          <CardContent>{detail.resumoClinico}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Sinais</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {detail.sinais.map((sinal) => (
              <p key={sinal.label}><span className="font-medium">{sinal.label}:</span> {sinal.valor}</p>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (tab === "metas") {
    return (
      <Card>
        <CardHeader><CardTitle>Metas ativas</CardTitle></CardHeader>
        <CardContent className="space-y-2">{detail.objetivos.map((item) => <p key={item}>• {item}</p>)}</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader><CardTitle>Timeline de acompanhamento</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {detail.timeline.map((evento) => (
          <div key={evento.id} className="rounded-xl border border-border p-3">
            <p className="text-xs text-slate-500">{evento.data}</p>
            <p className="font-medium">{evento.titulo}</p>
            <p className="text-sm text-muted-foreground">{evento.descricao}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function Patient360Page({ params }: { params: { patientId: string } }) {
  const [tab, setTab] = useState("resumo");
  const detail = patientDetails[params.patientId];

  return (
    <DashboardShell active="Pacientes">
      <h1 className="text-2xl font-semibold text-slate-950">Paciente 360</h1>
      <p className="mb-4 mt-1 text-sm text-muted-foreground">Visão centralizada do cuidado e evolução clínica.</p>

      {pageState === "loading" ? <p className="text-sm text-muted-foreground">Carregando perfil do paciente...</p> : null}
      {pageState === "error" ? <p className="text-sm text-danger">Erro ao carregar dados do paciente.</p> : null}
      {pageState === "forbidden" ? <p className="text-sm text-danger">Você não tem permissão para acessar este perfil.</p> : null}
      {pageState === "empty" ? <EmptyState title="Sem dados clínicos" description="Nenhum dado de acompanhamento disponível." /> : null}

      {pageState === "default" ? (
        detail ? (
          <>
            <Tabs items={tabItems} value={tab} onChange={setTab} className="mb-6" />
            <PatientPanels detail={detail} tab={tab} />
          </>
        ) : (
          <EmptyState
            title="Paciente não encontrado"
            description="Esse paciente não existe na base simulada atual."
            actionLabel="Voltar para lista"
          />
        )
      ) : null}

      <div className="mt-4">
        <Link href="/patients" className="text-sm text-primary-700 hover:underline">← Voltar para pacientes</Link>
      </div>
    </DashboardShell>
  );
}
