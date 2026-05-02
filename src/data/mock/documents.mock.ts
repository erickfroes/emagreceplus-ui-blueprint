import type { DocumentEditorDto } from "@/contracts/documents";

export const documentEditorMock: DocumentEditorDto = {
  state: "default",
  template: {
    id: "tpl-001",
    title: "Termo de acompanhamento nutricional",
    status: "draft",
    versionLabel: "Versão 1.0",
    blocks: ["header", "patient_data", "free_text", "table", "signature", "footer"],
    variables: [
      { key: "patient.name", label: "Nome do paciente", sourceStatus: "configured" },
      { key: "patient.cpf", label: "CPF do paciente", sourceStatus: "configured" },
      { key: "professional.name", label: "Nome do profissional", sourceStatus: "configured" },
      { key: "clinic.name", label: "Nome da clínica", sourceStatus: "configured" },
      { key: "document.date", label: "Data do documento", sourceStatus: "missing" }
    ]
  }
};
