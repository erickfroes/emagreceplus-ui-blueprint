import type { D4SignMode } from "@/server/integrations/d4sign/provider";

export type DocumentsUiState = "default" | "loading" | "empty" | "error" | "forbidden";

export type DocumentLifecycleStatus = "rascunho" | "assinatura_pendente" | "assinado" | "expirado";

export type DocumentCenterItem = {
  id: string;
  patientName: string;
  title: string;
  templateName: string;
  createdAt: string;
  dueDate: string;
  status: DocumentLifecycleStatus;
  signerCount: number;
  provider: "d4sign";
  providerMode: D4SignMode;
};

export type DocumentEvidenceTrailEvent = {
  id: string;
  occurredAt: string;
  actor: string;
  action: "open" | "download" | "evidence_access";
  correlationId: string;
};

export type DocumentEvidencePackage = {
  packageId: string;
  generatedAt: string;
  provider: "d4sign";
  providerMode: D4SignMode;
  modeLabel: "Simulado" | "Não configurado" | "Real bloqueado";
  dossierStatus: "ausente" | "parcial" | "completa" | "pendente_verificacao";
  dossierStatusLabel: "Ausente" | "Parcial" | "Completa" | "Pendente de verificação";
  externalDocumentId: string;
  verificationStatusLabel: "Não verificado (simulado)" | "Pendente";
  verificationMethod: string;
  integrity: {
    artifactSha256: string;
    packageSha256: string;
    eventsCount: number;
  };
};

export type EvidenceTimelineStep = {
  step: "Documento gerado" | "Artefato criado" | "Assinatura solicitada" | "Webhook simulado recebido" | "Pacote de evidência gerado" | "Acesso/download auditado";
  occurredAt: string;
  status: "concluído" | "pendente";
};

export type EvidenceSigner = {
  name: string;
  email: string;
  role: "Profissional" | "Paciente" | "Testemunha";
  statusLabel: "Pendente" | "Assinado";
  timestamp: string;
  method: string;
};

export type DocumentOperationalHealth = {
  provider: "d4sign";
  mode: D4SignMode;
  status: "saudavel" | "degradado" | "indisponivel";
  lastSyncAt: string;
  pendingQueue: number;
  failedLast24h: number;
  webhookStatus: "não configurado" | "simulado" | "ativo";
};

export const documentsUiScenarios: Record<DocumentsUiState, { label: string; description: string }> = {
  default: { label: "Operação padrão", description: "Listagem e detalhes disponíveis com dados simulados." },
  loading: { label: "Carregando", description: "Sincronizando dados documentais com provider D4Sign." },
  empty: { label: "Sem documentos", description: "Nenhum documento encontrado para os filtros atuais." },
  error: { label: "Erro", description: "Falha ao obter dados documentais no momento." },
  forbidden: { label: "Acesso negado", description: "Permissão insuficiente para visualizar documentos." },
};

export const documentCenterItems: DocumentCenterItem[] = [
  {
    id: "doc-ana-consentimento-2026",
    patientName: "Ana Paula Lima",
    title: "Termo de Consentimento Nutricional",
    templateName: "consentimento_v4",
    createdAt: "2026-04-27 13:22",
    dueDate: "2026-05-04",
    status: "assinatura_pendente",
    signerCount: 2,
    provider: "d4sign",
    providerMode: "simulated",
  },
  {
    id: "doc-marcos-plano-2026",
    patientName: "Marcos Souza",
    title: "Plano Alimentar - Abril",
    templateName: "plano_alimentar_v2",
    createdAt: "2026-04-19 08:41",
    dueDate: "2026-05-03",
    status: "assinado",
    signerCount: 1,
    provider: "d4sign",
    providerMode: "simulated",
  },
];

export const evidenceDossierStateByDocumentId: Record<string, DocumentsUiState> = {
  "doc-ana-consentimento-2026": "default",
  "doc-marcos-plano-2026": "loading",
  "doc-sem-evidencia": "empty",
  "doc-com-erro": "error",
  "doc-restrito": "forbidden",
};

export const trailEventsByDocumentId: Record<string, DocumentEvidenceTrailEvent[]> = {
  "doc-ana-consentimento-2026": [
    {
      id: "ev-01",
      occurredAt: "2026-04-27 13:22",
      actor: "Nutricionista Juliana Freitas",
      action: "open",
      correlationId: "corr-evd-7ab21f",
    },
    {
      id: "ev-02",
      occurredAt: "2026-04-27 13:24",
      actor: "Paciente Ana Paula Lima",
      action: "download",
      correlationId: "corr-evd-a901ce",
    },
    {
      id: "ev-03",
      occurredAt: "2026-04-27 13:29",
      actor: "Auditoria interna",
      action: "evidence_access",
      correlationId: "corr-evd-ffe130",
    },
  ],
};

export const evidencePackageByDocumentId: Record<string, DocumentEvidencePackage> = {
  "doc-ana-consentimento-2026": {
    packageId: "pkg-ev-2026-04-27-ana",
    generatedAt: "2026-04-27 13:30",
    provider: "d4sign",
    providerMode: "simulated",
    modeLabel: "Simulado",
    dossierStatus: "completa",
    dossierStatusLabel: "Completa",
    externalDocumentId: "d4s-doc-sim-009912",
    verificationStatusLabel: "Não verificado (simulado)",
    verificationMethod: "Comparação de hash SHA-256 e trilha de eventos simulada (UI-only).",
    integrity: {
      artifactSha256: "8f96d082fa5a20e956f4a67f0a992d094fb6f870f59cda71a8197b7265a99c1a",
      packageSha256: "a3fb42d6f6ed6f5f1c1b35df9870fbe1a9fa0107ee1d51e6ad3a8fd8b20afe45",
      eventsCount: 3,
    },
  },
};

export const documentOpsHealth: DocumentOperationalHealth = {
  provider: "d4sign",
  mode: "simulated",
  status: "saudavel",
  lastSyncAt: "2026-05-01 09:15",
  pendingQueue: 3,
  failedLast24h: 0,
  webhookStatus: "simulado",
};

export const d4signConfigMock = {
  provider: "d4sign" as const,
  mode: "unconfigured" as D4SignMode,
  environment: "sandbox" as const,
  integrationStatus: "não configurado" as const,
  apiToken: "não configurado",
  cryptKey: "não configurado",
  safeUuid: "não configurado",
  webhookSecret: "não configurado",
};


export const signersByDocumentId: Record<string, EvidenceSigner[]> = {
  "doc-ana-consentimento-2026": [
    { name: "Juliana Freitas", email: "juliana@clinic.local", role: "Profissional", statusLabel: "Assinado", timestamp: "2026-04-27 13:28", method: "Assinatura eletrônica simulada" },
    { name: "Ana Paula Lima", email: "ana.paciente@demo.local", role: "Paciente", statusLabel: "Pendente", timestamp: "2026-04-27 13:29", method: "Link seguro simulado" },
  ],
};


export const timelineByDocumentId: Record<string, EvidenceTimelineStep[]> = {
  "doc-ana-consentimento-2026": [
    { step: "Documento gerado", occurredAt: "2026-04-27 13:22", status: "concluído" },
    { step: "Artefato criado", occurredAt: "2026-04-27 13:23", status: "concluído" },
    { step: "Assinatura solicitada", occurredAt: "2026-04-27 13:24", status: "concluído" },
    { step: "Webhook simulado recebido", occurredAt: "2026-04-27 13:29", status: "concluído" },
    { step: "Pacote de evidência gerado", occurredAt: "2026-04-27 13:30", status: "concluído" },
    { step: "Acesso/download auditado", occurredAt: "2026-04-27 13:36", status: "concluído" },
  ],
  "doc-marcos-plano-2026": [
    { step: "Documento gerado", occurredAt: "2026-04-19 08:41", status: "concluído" },
    { step: "Artefato criado", occurredAt: "2026-04-19 08:42", status: "concluído" },
    { step: "Assinatura solicitada", occurredAt: "2026-04-19 08:44", status: "concluído" },
    { step: "Webhook simulado recebido", occurredAt: "2026-04-19 08:47", status: "pendente" },
    { step: "Pacote de evidência gerado", occurredAt: "—", status: "pendente" },
    { step: "Acesso/download auditado", occurredAt: "—", status: "pendente" },
  ],
};
