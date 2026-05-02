import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { packageSaleFlowMock, packageSaleStepsMock } from "@/data/mock/package-sale.mock";
import { ReportStateSection } from "@/components/reports/ReportStateSection";

export default function SellPackagePage() {
  const flow = packageSaleFlowMock;

  return (
    <DashboardShell active="Planos e Pacotes">
      <PageHeader title="Vender Pacote" description="Fluxo UI-only completo com pagamento, contrato e confirmação simulados (sem cobrança/contrato real)." />
      <ReportStateSection state={flow.state} entity="venda de pacote" />

      {flow.state === "default" ? (
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-5">
              {packageSaleStepsMock.map((step, index) => (
                <Card key={step.key} className={flow.activeStep === step.key ? "border-primary-500" : ""}>
                  <CardContent className="space-y-1 py-4 text-center">
                    <p className="text-xs text-muted-foreground">{index + 1}</p>
                    <p className="text-sm font-semibold">{step.label}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader><CardTitle>3. Pagamento • salvar condições</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                {flow.paymentConditions.map((condition) => (
                  <div key={condition.label} className="flex items-center justify-between rounded-2xl border border-border bg-background p-3">
                    <span className="text-muted-foreground">{condition.label}</span>
                    <span className="font-medium">{condition.value}</span>
                  </div>
                ))}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button type="button">Salvar condições</Button>
                  <Button type="button" variant="outline">Continuar para contrato</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>4. Contrato • gerar e enviar assinatura simulada</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-800">Contrato visual gerado em modo simulado. Provider planejado: D4Sign (não configurado).</p>
                <div className="space-y-2">
                  {flow.signableDocuments.map((document) => (
                    <div key={document.id} className="flex items-center justify-between rounded-2xl border border-border p-3">
                      <div>
                        <p className="font-medium">{document.name}</p>
                        <p className="text-xs text-muted-foreground">Assinatura: {document.provider.replace("_", " ")}</p>
                      </div>
                      <span className="text-xs font-medium text-amber-700">pendente</span>
                    </div>
                  ))}
                </div>
                <Button type="button" variant="outline">Enviar para assinatura simulada</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>5. Confirmação • concluir venda</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>Ao confirmar, a UI registra a venda e cria {flow.simulatedChargesCount} cobranças simuladas (sem integração real com Asaas).</p>
                <Button type="button">Confirmar venda e criar cobranças simuladas</Button>
              </CardContent>
            </Card>
          </div>

          <Card className="h-fit sticky top-4">
            <CardHeader><CardTitle>Resumo lateral</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-2xl border border-border p-3">
                <p className="text-muted-foreground">Paciente</p>
                <p className="font-semibold">{flow.patientName}</p>
              </div>
              <div className="rounded-2xl border border-border p-3">
                <p className="text-muted-foreground">Pacote</p>
                <p className="font-semibold">{flow.packageName}</p>
                <p>R$ {(flow.packagePriceCents / 100).toFixed(2)}</p>
              </div>
              <div className="rounded-2xl border border-border p-3">
                <p className="text-muted-foreground">Documentos a assinar</p>
                <p className="font-semibold">{flow.signableDocuments.length} pendentes</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </DashboardShell>
  );
}
