import type {
  AuditLogEntry,
  BillingSettings,
  ClinicSettingsProfile,
  IntegrationStatus,
  PermissionMatrix,
  TeamInvitation,
  TeamMember,
  UnitSummary,
} from "@/contracts/settings";

export const clinicSettingsProfileMock: ClinicSettingsProfile = {
  publicInfo: {
    legalName: "Clínica EmagrecePlus Saúde Integrada LTDA",
    tradeName: "EmagrecePlus Centro Clínico",
    website: "https://emagreceplus.app",
    contactEmail: "contato@emagreceplus.app",
    contactPhone: "+55 11 4000-5522",
  },
  fiscalInfo: {
    cnpj: "00.000.000/0001-99",
    municipalRegistration: "123.456-7",
    address: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
  },
  branding: {
    logoUrl: "/brand/emagreceplus-logo.svg",
    primaryColor: "#10B981",
    secondaryColor: "#0F766E",
  },
  timezone: "America/Sao_Paulo",
  documentPreview: {
    title: "Termo de consentimento nutricional",
    updatedAt: "2026-05-01 09:40",
    status: "simulado",
  },
};

export const settingsUnitsMock: UnitSummary[] = [
  { id: "u1", name: "Matriz Paulista", status: "ativa", professionals: 14, patients: 380 },
  { id: "u2", name: "Unidade Campinas", status: "planejada", professionals: 6, patients: 122 },
  { id: "u3", name: "Unidade Moema", status: "inativa", professionals: 0, patients: 0 },
];

export const settingsTeamMembersMock: TeamMember[] = [
  { id: "t1", name: "Ana Lima", role: "Admin", status: "ativo" },
  { id: "t2", name: "Paulo Nunes", role: "Nutricionista", status: "ativo" },
  { id: "t3", name: "Marta Reis", role: "Recepção", status: "ativo" },
  { id: "t4", name: "Carlos Teixeira", role: "Financeiro", status: "inativo" },
];

export const settingsTeamInvitesMock: TeamInvitation[] = [
  { email: "novo.profissional@emagreceplus.app", role: "Nutricionista", status: "pendente" },
  { email: "financeiro@emagreceplus.app", role: "Financeiro", status: "expirado" },
  { email: "coord.unidade@emagreceplus.app", role: "Coordenador", status: "aceito" },
];

export const settingsPermissionsMock: PermissionMatrix[] = [
  { permission: "Pacientes", admin: true, nutricionista: true, recepcao: true },
  { permission: "Planos alimentares", admin: true, nutricionista: true, recepcao: false },
  { permission: "Financeiro", admin: true, nutricionista: false, recepcao: false },
  { permission: "Configurações", admin: true, nutricionista: false, recepcao: false },
  { permission: "Documentos", admin: true, nutricionista: true, recepcao: false },
];

export const settingsIntegrationsMock: IntegrationStatus[] = [
  { provider: "D4Sign", purpose: "Assinatura documental", status: "não configurado (simulado)" },
  { provider: "Asaas", purpose: "Cobrança SaaS", status: "planejado (simulado)" },
  { provider: "Supabase", purpose: "Infraestrutura de dados futura", status: "futuro/documentado" },
];

export const settingsAuditLogsMock: AuditLogEntry[] = [
  { id: "l1", at: "2026-05-02 09:13", actor: "admin@emagreceplus.app", action: "Atualizou timezone", module: "settings", severity: "info" },
  { id: "l2", at: "2026-05-02 08:21", actor: "coordenacao@emagreceplus.app", action: "Editou dados públicos", module: "settings", severity: "warning" },
  { id: "l3", at: "2026-05-01 18:47", actor: "admin@emagreceplus.app", action: "Revisou permissões", module: "team", severity: "critical" },
  { id: "l4", at: "2026-05-01 16:09", actor: "recepcao@emagreceplus.app", action: "Visualizou cadastro do paciente", module: "patients", severity: "info" },
];

export const settingsBillingMock: BillingSettings = {
  currentPlan: "Growth",
  renewalDate: "2026-05-15",
  gatewayStatus: "não configurado (simulado)",
};
