import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { documentCenterItems, documentsUiScenarios, type DocumentsUiState } from "@/data/mock/documents";

const pageState: DocumentsUiState = "default";

const statusTone = {
  rascunho: "neutral",
  assinatura_pendente: "warning",
  assinado: "success",
  expirado: "danger",
} as const;

export default function DocumentsCenterPage() {
  return (
    <DashboardShell active="Dashboard">
      <h1 className="text-2xl font-semibold text-graphite">Centro Documental</h1>
      <p className="mt-1 text-sm text-muted-foreground">Gestão de documentos, assinatura digital e evidências do provider D4Sign.</p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Estado da tela</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p className="font-medium text-graphite">{documentsUiScenarios[pageState].label}</p>
          <p>{documentsUiScenarios[pageState].description}</p>
        </CardContent>
      </Card>

      {pageState === "loading" ? <p className="mt-6 text-sm text-muted-foreground">Carregando documentos...</p> : null}
      {pageState === "empty" ? <p className="mt-6 text-sm text-muted-foreground">Nenhum documento encontrado.</p> : null}
      {pageState === "error" ? <p className="mt-6 text-sm text-danger">Falha ao carregar Centro Documental.</p> : null}
      {pageState === "forbidden" ? <p className="mt-6 text-sm text-danger">Acesso negado ao Centro Documental.</p> : null}

      {pageState === "default" ? (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Documentos ativos ({documentCenterItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-muted-foreground">
                  <tr>
                    <th>Documento</th>
                    <th>Paciente</th>
                    <th>Status</th>
                    <th>Provider</th>
                    <th>Prazo</th>
                  </tr>
                </thead>
                <tbody>
                  {documentCenterItems.map((document) => (
                    <tr key={document.id} className="border-t border-border">
                      <td className="py-3">
                        <Link href={`/documents/${document.id}`} className="font-medium text-graphite hover:underline">
                          {document.title}
                        </Link>
                        <p className="text-xs text-muted-foreground">Template: {document.templateName}</p>
                      </td>
                      <td>{document.patientName}</td>
                      <td><Badge tone={statusTone[document.status]}>{document.status.replace("_", " ")}</Badge></td>
                      <td>
                        <span className="font-medium uppercase">{document.provider}</span>
                        <p className="text-xs text-muted-foreground">modo: {document.providerMode}</p>
                      </td>
                      <td>{document.dueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </DashboardShell>
  );
}
