import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
export default function CashRegisterPage() { return <DashboardShell active="Financeiro"><PageHeader title="Caixa da Unidade" description="Abertura, fechamento e conferência diária (mock)." /><Card><CardHeader><CardTitle>Resumo de caixa</CardTitle></CardHeader><CardContent>Saldo inicial: R$ 1.200,00 • Entradas: R$ 6.740,00 • Saídas: R$ 1.120,00 • Saldo final: R$ 6.820,00</CardContent></Card></DashboardShell>; }
