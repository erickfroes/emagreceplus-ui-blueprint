export type SettingsUiState = "default" | "loading" | "empty" | "error" | "forbidden";

export interface ClinicPublicInfo {
  legalName: string;
  tradeName: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
}

export interface ClinicFiscalInfo {
  cnpj: string;
  municipalRegistration: string;
  address: string;
}

export interface ClinicBranding {
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface ClinicSettingsProfile {
  publicInfo: ClinicPublicInfo;
  fiscalInfo: ClinicFiscalInfo;
  branding: ClinicBranding;
  timezone: string;
  documentPreview: {
    title: string;
    updatedAt: string;
    status: "simulado" | "não configurado";
  };
}

export interface UnitSummary {
  id: string;
  name: string;
  status: "ativa" | "inativa" | "planejada";
  professionals: number;
  patients: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: "ativo" | "inativo";
}

export interface TeamInvitation {
  email: string;
  role: string;
  status: "pendente" | "expirado" | "aceito";
}

export interface PermissionMatrix {
  permission: string;
  admin: boolean;
  nutricionista: boolean;
  recepcao: boolean;
}

export interface IntegrationStatus {
  provider: "D4Sign" | "Asaas";
  purpose: string;
  status: string;
}

export interface AuditLogEntry {
  at: string;
  actor: string;
  action: string;
}

export interface BillingSettings {
  currentPlan: string;
  renewalDate: string;
  gatewayStatus: string;
}
