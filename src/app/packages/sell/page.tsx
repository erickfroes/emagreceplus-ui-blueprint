import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";
import { createPackageSaleAction } from "./actions";

const steps = ["Paciente/Lead", "Pacote", "Pagamento", "Contrato", "Confirmação"];

export default async function SellPackagePage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) return <DashboardShell active="Planos e Pacotes"><PageHeader title="Vender Pacote" description="forbidden" /></DashboardShell>;

  const [{ data: packages, error: packageError }, { data: patients, error: patientError }, { data: sales, error: salesError }] = await Promise.all([
    supabase.from("packages").select("id,name,current_version,status").eq("status", "published").order("updated_at", { ascending: false }),
    supabase.from("users").select("id,full_name").eq("status", "active").order("full_name", { ascending: true }),
    supabase.from("package_sales").select("id,sale_reference,status,total_cents,entitlements_released,created_at").order("created_at", { ascending: false }).limit(8),
  ]);

  return <DashboardShell active="Planos e Pacotes"><PageHeader title="Vender Pacote" description="Fluxo conectado: paciente/lead → pacote → pagamento → contrato pendente → parcelas pendentes → entitlements." />
    <div className="grid gap-3 md:grid-cols-5">{steps.map((s, i) => <Card key={s} className={i === 0 ? "border-primary-500" : ""}><CardContent className="py-4 text-center text-sm">{i + 1}. {s}</CardContent></Card>)}</div>

    <Card className="mt-4"><CardHeader><CardTitle>Nova venda de pacote</CardTitle></CardHeader><CardContent>
      {packageError || patientError ? <p>error: {packageError?.message ?? patientError?.message}</p> : !packages?.length ? <p>empty</p> : <form action={createPackageSaleAction} className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm">Paciente (opcional)</label>
          <select name="patientId" className="w-full rounded border p-2">
            <option value="">Selecionar paciente</option>
            {patients?.map((patient) => <option key={patient.id} value={patient.id}>{patient.full_name}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm">Lead (opcional)</label>
          <input name="leadId" placeholder="ID do lead no CRM" className="w-full rounded border p-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm">Pacote publicado</label>
          <select name="packageId" className="w-full rounded border p-2" required>
            {packages.map((pkg) => <option key={pkg.id} value={pkg.id}>{pkg.name} • v{pkg.current_version}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm">Parcelas</label>
          <input type="number" name="installments" className="w-full rounded border p-2" defaultValue={3} min={1} max={24} required />
        </div>
        <div>
          <label className="mb-1 block text-sm">Primeiro vencimento</label>
          <input type="date" name="firstDueDate" className="w-full rounded border p-2" required />
        </div>
        <div>
          <label className="mb-1 block text-sm">Regra de ativação do pacote</label>
          <select name="releaseRule" className="w-full rounded border p-2" defaultValue="after_first_payment">
            <option value="after_first_payment">Após confirmação da 1ª parcela</option>
            <option value="after_all_payments">Após confirmação de todas as parcelas</option>
          </select>
        </div>
        <div className="md:col-span-2"><Button type="submit">Gerar contrato e cobranças pendentes</Button></div>
      </form>}
    </CardContent></Card>

    <Card className="mt-4"><CardHeader><CardTitle>Últimas vendas</CardTitle></CardHeader><CardContent className="space-y-2">
      {salesError ? <p>error: {salesError.message}</p> : !sales?.length ? <p>empty</p> : sales.map((sale) => <p key={sale.id}>{sale.sale_reference} • {sale.status} • R$ {(sale.total_cents / 100).toFixed(2)} • entitlements: {sale.entitlements_released ? "liberados" : "pendentes"}</p>)}
    </CardContent></Card>
  </DashboardShell>;
}
