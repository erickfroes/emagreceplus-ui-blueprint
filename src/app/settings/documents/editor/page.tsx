import { SettingsShell } from "@/components/layout/SettingsShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import { LoadingState } from "@/components/ui/LoadingState";
import { resolveUiState } from "@/data/mock/ui-states";
import { documentEditorMock } from "@/data/mock/documents.mock";

const blockLabels = {
  header: "Cabeçalho",
  patient_data: "Dados do paciente",
  free_text: "Texto livre",
  table: "Tabela",
  signature: "Assinatura",
  footer: "Rodapé"
} as const;

export default async function DocumentEditorPage({ searchParams }: { searchParams?: Promise<{ state?: string }> }) {
  const uiState = resolveUiState((await searchParams)?.state);
  const state = uiState === "coming-soon" ? "default" : uiState;

  return (
    <SettingsShell active="Editor de Documento">
      <PageHeader
        title="Editor de modelo documental"
        description="Construtor UI-only de templates em canvas A4 com versionamento planejado e variáveis tipadas."
        actions={<><Button variant="outline">Salvar rascunho</Button><Button variant="secondary">Pré-visualizar</Button><Button>Publicar versão</Button></>}
      />

      {state === "loading" && <LoadingState title="Carregando editor de documentos" />}
      {state === "empty" && <EmptyState title="Nenhum modelo disponível" description="Crie seu primeiro template para iniciar o versionamento." actionLabel="Criar modelo" />}
      {state === "error" && <ErrorState title="Falha ao carregar editor" description="O estado simulado de templates está indisponível no momento." />}
      {state === "forbidden" && <ForbiddenState title="Acesso restrito ao editor" description="Seu perfil não possui permissão para editar modelos documentais." />}

      {state === "default" && documentEditorMock.template ? (
        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
          <Card>
            <CardHeader><CardTitle>Toolbox</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {documentEditorMock.template.blocks.map((block) => (
                <button key={block} className="w-full rounded-xl border border-border bg-white px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-primary-50">{blockLabels[block]}</button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Canvas A4</CardTitle></CardHeader>
            <CardContent>
              <div className="mx-auto aspect-[1/1.414] w-full max-w-[680px] rounded-2xl border border-dashed border-border bg-white p-8 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Template ativo · Rascunho</p>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{documentEditorMock.template.title}</h3>
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
            <Card>
              <CardHeader><CardTitle>Variáveis disponíveis</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                {documentEditorMock.template.variables.map((variable) => (
                  <div key={variable.key} className={`rounded-lg border px-3 py-2 ${variable.sourceStatus === "missing" ? "border-warning/40 bg-warning/10 text-warning-900" : "border-primary-100 bg-primary-50 text-primary-800"}`}>
                    <p className="font-mono">{`{{${variable.key}}}`}</p>
                    {variable.sourceStatus === "missing" ? <p className="text-xs">Origem não configurada no mock atual.</p> : null}
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card><CardHeader><CardTitle>Status de versão</CardTitle></CardHeader><CardContent className="space-y-2 text-sm text-slate-700"><p>Rascunho</p><p>Publicado</p><p>{documentEditorMock.template.versionLabel}</p></CardContent></Card>
          </div>
        </div>
      ) : null}
    </SettingsShell>
  );
}
