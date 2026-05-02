"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { Tabs } from "@/components/ui/Tabs";
import type { PatientDetail, UIState } from "@/data/mock/patients";
import { mockDataProvider } from "@/services/mock-data-provider";
import { resolveUiState } from "@/data/mock/ui-states";

const tabItems = [
  { id: "resumo", label: "Resumo" },
  { id: "metas", label: "Metas" },
  { id: "timeline", label: "Timeline" },
];

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

export default function Patient360Page() {
  const [tab, setTab] = useState("resumo");
  const params = useParams<{ patientId: string }>();
  const searchParams = useSearchParams();
  const pageState = resolveUiState(searchParams.get("state") ?? undefined) as UIState;
  const [detail, setDetail] = useState<PatientDetail | null | undefined>(undefined);

  useEffect(() => {
    mockDataProvider.patients.getPatientDetail(params.patientId).then(setDetail);
  }, [params.patientId]);

  return (
    <DashboardShell active="Pacientes">
      <h1 className="text-2xl font-semibold text-slate-950">Paciente 360</h1>
      <p className="mb-4 mt-1 text-sm text-muted-foreground">Visão centralizada do cuidado e evolução clínica.</p>

      {pageState === "loading" || detail === undefined ? <LoadingState title="Carregando perfil do paciente" /> : null}
      {pageState === "error" ? <ErrorState title="Erro ao carregar dados do paciente" /> : null}
      {pageState === "forbidden" ? <ForbiddenState title="Você não tem permissão para acessar este perfil" /> : null}
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
