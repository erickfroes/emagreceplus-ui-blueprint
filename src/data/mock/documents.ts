type D4SignMode = "unconfigured" | "simulated" | "real";

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
  storageVisibility: "private_supabase_storage" | "private_secure_bucket";
  integrity: {
    manifestSha256: string;
    eventsCount: number;
  };
  files: Array<{
    fileName: string;
    mimeType: string;
    sizeKb: number;
    accessLevel: "privado";
  }>;
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

export const evidenceEventsByDocumentId: Record<string, DocumentEvidenceEvent[]> = {
  "doc-ana-consentimento-2026": [
    {
      id: "ev-01",
      occurredAt: "2026-04-27 13:22",
      actor: "Nutricionista Juliana Freitas",
      action: "Criou documento no centro documental",
      channel: "web",
      signatureHash: "6f9f88e1a4b...",
    },
    {
      id: "ev-02",
      occurredAt: "2026-04-27 13:24",
      actor: "D4Sign (simulado)",
      action: "Gerou envelope de assinatura",
      channel: "worker",
      signatureHash: "8adf130ab77...",
    },
  ],
};

export const evidencePackageByDocumentId: Record<string, DocumentEvidencePackage> = {
  "doc-ana-consentimento-2026": {
    packageId: "pkg-ev-2026-04-27-ana",
    generatedAt: "2026-04-27 13:30",
    provider: "d4sign",
    providerMode: "simulated",
    storageVisibility: "private_supabase_storage",
    integrity: {
      manifestSha256: "bd13cd8af0e7b7fa...",
      eventsCount: 2,
    },
    files: [
      { fileName: "termo-consentimento.pdf", mimeType: "application/pdf", sizeKb: 412, accessLevel: "privado" },
      { fileName: "audit-log.json", mimeType: "application/json", sizeKb: 54, accessLevel: "privado" },
    ],
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
