export type SettingsUiState = "default" | "loading" | "empty" | "error" | "forbidden";

export interface ClinicPublicInfo {
  legalName: string;
  tradeName: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
}

export interface ClinicFiscalInfo {
  document: string;
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
