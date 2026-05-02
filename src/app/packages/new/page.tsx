import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { resolveUiState } from "@/data/mock/ui-states";

const services = [
  { id: "srv-1", name: "Consulta nutricional" },
  { id: "srv-2", name: "Acompanhamento mensal" },
] as const;

export default async function NewPackagePage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const params = searchParams ? await searchParams : undefined;
  const state = resolveUiState(params?.state);

  return <DashboardShell active="Planos e Pacotes"><PageHeader title="Criar Pacote" description="Montagem de pacote com dados mockados e publicação simulada." />
    {state === "loading" ? <LoadingState title="Carregando formulário" /> : null}
    {state === "empty" ? <EmptyState title="Sem serviços disponíveis" description="Cadastre serviços simulados para montar novos pacotes." /> : null}
    {state === "error" ? <ErrorState title="Falha ao abrir criação de pacote" /> : null}
    {state === "forbidden" ? <ForbiddenState title="Acesso negado para criar pacotes" /> : null}

    {state === "default" ? <Card><CardHeader><CardTitle>Configuração inicial</CardTitle></CardHeader><CardContent>
      <form className="space-y-3">
        <input name="code" placeholder="Código" className="w-full rounded-xl border border-border p-2" required />
        <input name="name" placeholder="Nome do pacote" className="w-full rounded-xl border border-border p-2" required />
        <select name="serviceId" className="w-full rounded-xl border border-border p-2" required>{services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
        <label className="block text-sm"><input type="checkbox" name="appEnabled" className="mr-2" />App</label>
        <label className="block text-sm"><input type="checkbox" name="chatEnabled" className="mr-2" />Chat</label>
        <label className="block text-sm"><input type="checkbox" name="documentsEnabled" className="mr-2" />Documentos</label>
        <label className="block text-sm"><input type="checkbox" name="checkinEnabled" className="mr-2" />Check-in</label>
        <Button type="button">Publicar pacote (simulado)</Button>
      </form>
    </CardContent></Card> : null}
  </DashboardShell>;
}
