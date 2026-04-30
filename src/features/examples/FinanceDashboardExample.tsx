import { CreditCard, DollarSign, Gift, TriangleAlert, Wallet } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { FilterBar } from "@/components/ui/FilterBar";
import { Input } from "@/components/ui/Input";
import { SelectField } from "@/components/ui/SelectField";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function FinanceDashboardExample() {
  return (
    <DashboardShell active="Financeiro">
      <PageHeader title="Financeiro da Clínica" description="Acompanhe as finanças da sua clínica em tempo real." />
      <FilterBar>
        <Input label="Período" value="01/05/2025 - 31/05/2025" readOnly />
        <SelectField label="Unidade"><option>Todas as unidades</option></SelectField>
        <SelectField label="Profissional"><option>Todos os profissionais</option></SelectField>
        <SelectField label="Forma de pagamento"><option>Todas as formas</option></SelectField>
        <div className="flex items-end"><Button variant="outline" className="w-full">Filtros avançados</Button></div>
      </FilterBar>
      <div className="ep-kpi-grid">
        <StatCard title="Receita recebida" value="R$ 78.690,00" subtitle="vs. mês anterior" trend="18,6%" trendDirection="up" icon={<DollarSign />} />
        <StatCard title="A receber" value="R$ 24.580,00" subtitle="Parcelas pendentes" trend="12,4%" trendDirection="up" icon={<Wallet />} />
        <StatCard title="Inadimplência" value="R$ 4.860,00" subtitle="Atenção financeira" trend="5,7%" trendDirection="down" icon={<TriangleAlert />} />
        <StatCard title="Ticket médio" value="R$ 312,40" trend="6,2%" trendDirection="up" icon={<CreditCard />} />
        <StatCard title="Pacotes vendidos" value="42" trend="16,7%" trendDirection="up" icon={<Gift />} />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Últimos lançamentos</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                ["Consulta nutricional", "Juliana Pereira", "R$ 480,00", "Pago"],
                ["Pacote EmagrecePlus 3 meses", "Mariana Souza", "R$ 1.320,00", "Pago"],
                ["Consulta de retorno", "Fernanda Rocha", "R$ 280,00", "A receber"],
              ].map(([desc, patient, value, status]) => (
                <div key={desc} className="flex items-center justify-between rounded-xl border border-border p-4">
                  <div><p className="font-medium">{desc}</p><p className="text-sm text-muted-foreground">{patient}</p></div>
                  <div className="text-right"><p className="font-semibold">{value}</p><Badge tone={status === "Pago" ? "success" : "warning"}>{status}</Badge></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Resumo do período</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between"><span>Receita total</span><strong>R$ 103.150,00</strong></div>
            <div className="flex justify-between"><span>Descontos</span><span>- R$ 2.450,00</span></div>
            <div className="flex justify-between"><span>Taxas</span><span>- R$ 7.320,00</span></div>
            <div className="flex justify-between border-t pt-3 text-base"><span>Receita líquida</span><strong className="text-primary-700">R$ 93.380,00</strong></div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
