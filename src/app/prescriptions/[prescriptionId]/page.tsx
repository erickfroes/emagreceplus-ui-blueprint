"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { DocumentPreviewCard } from "@/components/nutrition/DocumentPreviewCard";
import { getStateFromParam } from "@/data/mock/nutrition";
import { getVisibleItemsByRole, prescriptionDocuments } from "@/data/mock/prescriptions";

export default function PrescriptionsPage() {
  const params = useParams<{ prescriptionId: string }>();
  const searchParams = useSearchParams();
  const state = getStateFromParam(searchParams.get("state"));
  const doc = prescriptionDocuments[params.prescriptionId];

  const visibleItems = doc ? getVisibleItemsByRole(doc) : [];

  return (
    <DashboardShell active="Pacientes">
      <h1 className="text-2xl font-semibold text-slate-950">Prescrições e orientações</h1>
      <p className="mb-4 mt-1 text-sm text-muted-foreground">Separação entre prescrição médica e orientação nutricional.</p>

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
              {visibleItems.map((item) => (
                <div key={item.id} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.tipo === "prescricao_medica" ? "Prescrição médica" : "Orientação nutricional"}</p>
                  <p className="font-medium text-slate-900">{item.titulo}</p>
                  <p className="text-sm text-slate-700">{item.descricao}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <DocumentPreviewCard
            title={`Prescrições e orientações - ${doc.patientName}`}
            subtitle={`Documento simulado • ${doc.createdAt}`}
            sections={[
              {
                heading: "Orientação nutricional",
                lines: visibleItems.filter((i) => i.tipo === "orientacao_nutricional").map((i) => `${i.titulo}: ${i.descricao}`),
              },
              {
                heading: "Prescrição médica",
                lines: visibleItems.filter((i) => i.tipo === "prescricao_medica").map((i) => `${i.titulo}: ${i.descricao}`),
              },
            ]}
          />
        </div>
      ) : null}

      {state === "default" && !doc ? <EmptyState title="Documento não encontrado" description="ID inexistente no mock atual." /> : null}

      <div className="mt-4"><Link href="/patients" className="text-sm text-primary-700 hover:underline">← Voltar para pacientes</Link></div>
    </DashboardShell>
  );
}
