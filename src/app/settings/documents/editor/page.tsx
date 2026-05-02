import { SettingsShell } from "@/components/layout/SettingsShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";

type UiState = "default" | "loading" | "empty" | "error" | "forbidden";
const uiState: UiState = "default";

const blocks = ["Cabeçalho", "Dados do paciente", "Texto livre", "Tabela", "Assinatura", "Rodapé"];
const variables = ["patient.name", "patient.cpf", "clinic.name", "professional.name", "document.date"];

function EditorStateView() {
  if (uiState === "loading") return <LoadingState title="Carregando editor de documentos" />;
  if (uiState === "empty") return <EmptyState title="Nenhum modelo disponível" description="Crie seu primeiro template para iniciar o versionamento." actionLabel="Criar modelo" />;
  if (uiState === "error") return <ErrorState title="Falha ao carregar editor" description="O estado simulado de templates está indisponível no momento." />;
  if (uiState === "forbidden") return <ForbiddenState title="Acesso restrito ao editor" description="Seu perfil não possui permissão para editar modelos documentais." />;

  return (
    <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
      <Card>
        <CardHeader><CardTitle>Toolbox</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {blocks.map((b) => (
            <button key={b} className="w-full rounded-xl border border-border bg-white px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-primary-50">{b}</button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Canvas A4</CardTitle></CardHeader>
        <CardContent>
          <div className="mx-auto aspect-[1/1.414] w-full max-w-[680px] rounded-2xl border border-dashed border-border bg-white p-8 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Template ativo · Rascunho</p>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">Termo de acompanhamento nutricional</h3>
            <p className="mt-3 text-sm text-slate-700">Paciente: <span className="font-medium">{"{{patient.name}}"}</span> · CPF: <span className="font-medium">{"{{patient.cpf}}"}</span></p>
            <p className="mt-4 text-sm text-slate-700">Clínica: {"{{clinic.name}}"} · Profissional: {"{{professional.name}}"}</p>
            <div className="mt-6 rounded-xl border border-border p-4 text-sm text-slate-600">[Tabela de condutas e evolução]</div>
            <div className="mt-12 border-t border-border pt-4 text-sm text-slate-600">Assinatura digital planejada (provider D4Sign)</div>
            <p className="mt-4 text-xs text-muted-foreground">Documento gerado em {"{{document.date}}"}</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card><CardHeader><CardTitle>Propriedades</CardTitle></CardHeader><CardContent className="space-y-3 text-sm text-slate-700"><p><span className="font-medium">Fonte:</span> Inter / 14px</p><p><span className="font-medium">Espaçamento:</span> 1.5</p><p><span className="font-medium">Visibilidade:</span> Campos clínicos ativos</p><p><span className="font-medium">Variáveis:</span> Inserção assistida</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Variáveis disponíveis</CardTitle></CardHeader><CardContent className="space-y-2 text-sm">{variables.map((v) => <p key={v} className="rounded-lg bg-primary-50 px-3 py-1.5 font-mono text-primary-800">{`{{${v}}}`}</p>)}</CardContent></Card>
        <Card><CardHeader><CardTitle>Versionamento</CardTitle></CardHeader><CardContent className="space-y-2 text-sm text-slate-700"><p>Versão atual: <span className="font-semibold">v1.8</span></p><p>Rascunho: <span className="font-semibold">v1.9-draft</span></p><p>Última publicação: <span className="font-semibold">2026-04-30 18:20</span></p></CardContent></Card>
      </div>
    </div>
  );
}

export default function DocumentEditorPage() {
  return <SettingsShell active="Editor de Documento"><PageHeader title="Editor de Documento" description="Construtor UI-only de templates com canvas A4 e suporte a versionamento simulado." actions={<><Button variant="outline">Salvar modelo</Button><Button variant="secondary">Pré-visualizar</Button><Button>Publicar versão</Button></>} /><EditorStateView /></SettingsShell>;
}
