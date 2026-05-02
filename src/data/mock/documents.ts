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

export type DocumentEvidenceEvent = {
  id: string;
  occurredAt: string;
  actor: string;
  action: string;
  channel: "web" | "api" | "worker";
  signatureHash: string;
};

export type DocumentEvidencePackage = {
  packageId: string;
  generatedAt: string;
  provider: "d4sign";
  providerMode: D4SignMode;
  statusLabel: "sem evidência" | "evidência parcial" | "evidência completa simulada";
  externalDocumentId: string;
  integrity: {
    artifactSha256: string;
    packageSha256: string;
    eventsCount: number;
  };
};

export type EvidenceTimelineStep = {
  step: "Documento gerado" | "Assinatura solicitada" | "Webhook recebido" | "Dossiê consolidado" | "Pacote gerado";
  occurredAt: string;
  status: "concluído" | "pendente";
};

export type EvidenceSigner = {
  name: string;
  email: string;
  role: "Profissional" | "Paciente" | "Testemunha";
};

export type ProviderEvent = {
  id: string;
  occurredAt: string;
  action: string;
  source: "D4Sign simulado" | "Webhook simulado";
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

export const evidenceEventsByDocumentId: Record<string, DocumentEvidenceEvent[]> = {
  "doc-ana-consentimento-2026": [
    {
      id: "ev-01",
      occurredAt: "2026-04-27 13:22",
      actor: "Nutricionista Juliana Freitas",
      action: "Documento gerado no centro documental",
      channel: "web",
      signatureHash: "6f9f88e1a4bf19d8c0e7314ab17",
    },
    {
      id: "ev-02",
      occurredAt: "2026-04-27 13:24",
      actor: "Serviço de assinatura (simulado)",
      action: "Assinatura solicitada para signatários",
      channel: "worker",
      signatureHash: "8adf130ab77be21cd90920eff44",
    },
    {
      id: "ev-03",
      occurredAt: "2026-04-27 13:29",
      actor: "Webhook simulado",
      action: "Dossiê consolidado com trilha de auditoria",
      channel: "api",
      signatureHash: "31bd09aa9200beef4456aacd222",
    },
  ],
};

export const evidencePackageByDocumentId: Record<string, DocumentEvidencePackage> = {
  "doc-ana-consentimento-2026": {
    packageId: "pkg-ev-2026-04-27-ana",
    generatedAt: "2026-04-27 13:30",
    provider: "d4sign",
    providerMode: "simulated",
    statusLabel: "evidência completa simulada",
    externalDocumentId: "d4s-doc-sim-009912",
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
    { name: "Juliana Freitas", email: "juliana@clinic.local", role: "Profissional" },
    { name: "Ana Paula Lima", email: "ana.paciente@demo.local", role: "Paciente" },
  ],
};

export const providerEventsByDocumentId: Record<string, ProviderEvent[]> = {
  "doc-ana-consentimento-2026": [
    { id: "pv-01", occurredAt: "2026-04-27 13:24", action: "Envelope criado", source: "D4Sign simulado" },
    { id: "pv-02", occurredAt: "2026-04-27 13:28", action: "Assinatura concluída", source: "D4Sign simulado" },
    { id: "pv-03", occurredAt: "2026-04-27 13:29", action: "Webhook recebido", source: "Webhook simulado" },
  ],
};

export const timelineByDocumentId: Record<string, EvidenceTimelineStep[]> = {
  "doc-ana-consentimento-2026": [
    { step: "Documento gerado", occurredAt: "2026-04-27 13:22", status: "concluído" },
    { step: "Assinatura solicitada", occurredAt: "2026-04-27 13:24", status: "concluído" },
    { step: "Webhook recebido", occurredAt: "2026-04-27 13:29", status: "concluído" },
    { step: "Dossiê consolidado", occurredAt: "2026-04-27 13:29", status: "concluído" },
    { step: "Pacote gerado", occurredAt: "2026-04-27 13:30", status: "concluído" },
  ],
  "doc-marcos-plano-2026": [
    { step: "Documento gerado", occurredAt: "2026-04-19 08:41", status: "concluído" },
    { step: "Assinatura solicitada", occurredAt: "2026-04-19 08:44", status: "concluído" },
    { step: "Webhook recebido", occurredAt: "2026-04-19 08:47", status: "pendente" },
    { step: "Dossiê consolidado", occurredAt: "—", status: "pendente" },
    { step: "Pacote gerado", occurredAt: "—", status: "pendente" },
  ],
};
