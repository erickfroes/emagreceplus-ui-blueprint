"use client";

import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tabs, type TabsItem } from "@/components/ui/Tabs";
import type { PatientReportTab } from "@/contracts/patient-report";
import { patientReportMockByState } from "@/data/mock/patient-report.mock";

const tabs: TabsItem[] = [
  { id: "financial", label: "Financeiro" },
  { id: "packages", label: "Pacotes" },
  { id: "services", label: "Serviços" },
  { id: "documents", label: "Documentos" },
  { id: "adherence", label: "Adesão" },
  { id: "timeline", label: "Timeline" },
];

export default function PatientReportPage() {
  const { patientId } = useParams<{ patientId: string }>();
  const searchParams = useSearchParams();
  const mockState = searchParams.get("state") ?? "default";
  const report = patientReportMockByState[mockState] ?? patientReportMockByState.default;
  const [activeTab, setActiveTab] = useState<PatientReportTab>(report.defaultTab);

  const financialBlocked = report.financialState === "forbidden";

  const financeColumns = useMemo(() => [
    { key: "dueDate" as const, label: "Vencimento" },
    { key: "installment" as const, label: "Parcela" },
    { key: "amount" as const, label: "Valor" },
    { key: "status" as const, label: "Status" },
  ], []);

  const serviceColumns = useMemo(() => [
    { key: "date" as const, label: "Data" },
    { key: "service" as const, label: "Serviço" },
    { key: "consumed" as const, label: "Consumo" },
    { key: "status" as const, label: "Status" },
  ], []);

  const documentColumns = useMemo(() => [
    { key: "document" as const, label: "Documento" },
    { key: "provider" as const, label: "Provider" },
    { key: "updatedAt" as const, label: "Atualização" },
    { key: "status" as const, label: "Status" },
  ], []);

  const renderState = () => {
    if (report.state === "loading") return <LoadingState title="Carregando relatório do paciente" />;
    if (report.state === "error") return <ErrorState title="Falha ao montar relatório" description="Não foi possível carregar os dados simulados deste paciente." />;
    if (report.state === "forbidden") return <ForbiddenState title="Acesso negado ao relatório" description="Seu perfil não possui acesso a este relatório do paciente." />;
    if (report.state === "empty") return <EmptyState title="Relatório sem dados" description="Ainda não há informações consolidadas para este paciente." />;

    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="grid gap-3 p-4 text-sm md:grid-cols-3">
            <div className="rounded-2xl border p-3"><p className="text-muted-foreground">Nome</p><p className="font-semibold">{report.header.patientName}</p></div>
            <div className="rounded-2xl border p-3"><p className="text-muted-foreground">Idade</p><p className="font-semibold">{report.header.patientAge} anos</p></div>
            <div className="rounded-2xl border p-3"><p className="text-muted-foreground">Status</p><p className="font-semibold">{report.header.patientStatus}</p></div>
            <div className="rounded-2xl border p-3"><p className="text-muted-foreground">Pacote ativo</p><p className="font-semibold">{report.header.activePackage}</p></div>
            <div className="rounded-2xl border p-3"><p className="text-muted-foreground">Status financeiro</p><p className="font-semibold">{report.header.financialStatus}</p></div>
            <div className="rounded-2xl border p-3"><p className="text-muted-foreground">Status clínico</p><p className="font-semibold">{report.header.clinicalStatus}</p></div>
          </CardContent>
        </Card>

        <Tabs items={tabs} value={activeTab} onChange={(value) => setActiveTab(value as PatientReportTab)} className="w-full overflow-auto" />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {report.kpis.map((kpi) => (
            <Card key={kpi.id}><CardContent className="p-4"><p className="text-xs text-muted-foreground">{kpi.label}</p><p className="text-lg font-semibold">{kpi.value}</p></CardContent></Card>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {(activeTab === "financial" || activeTab === "packages") && (
              <Card>
                <CardHeader><CardTitle>Parcelas e pagamentos</CardTitle></CardHeader>
                <CardContent>
                  {financialBlocked ? <ForbiddenState title="Financeiro restrito" description="Dados financeiros ocultos por permissão simulada." /> : <DataTable columns={financeColumns} rows={report.installments} />}
                </CardContent>
              </Card>
            )}

            {(activeTab === "services" || activeTab === "packages") && (
              <Card>
                <CardHeader><CardTitle>Serviços consumidos</CardTitle></CardHeader>
                <CardContent><DataTable columns={serviceColumns} rows={report.consumedServices} /></CardContent>
              </Card>
            )}

            {activeTab === "documents" && (
              <Card>
                <CardHeader><CardTitle>Documentos do paciente</CardTitle></CardHeader>
                <CardContent><DataTable columns={documentColumns} rows={report.documents} /></CardContent>
              </Card>
            )}

            {activeTab === "adherence" && (
              <Card>
                <CardHeader><CardTitle>Adesão ao plano</CardTitle></CardHeader>
                <CardContent className="text-sm text-muted-foreground">Adesão consolidada em {report.kpis.find((k) => k.id === "adherence")?.value ?? "--"} com evolução estável nas últimas semanas.</CardContent>
              </Card>
            )}

            {activeTab === "timeline" && (
              <Card>
                <CardHeader><CardTitle>Timeline de acompanhamento</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">{report.timeline.map((item) => <div key={item.id} className="rounded-xl border p-3"><p className="text-xs text-muted-foreground">{item.date}</p><p className="font-medium">{item.title}</p><p>{item.description}</p></div>)}</CardContent>
              </Card>
            )}
          </div>

          <Card className="h-fit">
            <CardHeader><CardTitle>Painel lateral</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              {report.sidebar.map((alert) => (
                <div key={alert.id} className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-900">
                  <p className="font-medium">{alert.title}</p>
                  <p>{alert.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <DashboardShell active="Pacientes">
      <PageHeader title={`Relatório do paciente #${patientId}`} description="Resumo clínico-financeiro consolidado com dados simulados." />
      {renderState()}
    </DashboardShell>
  );
}
