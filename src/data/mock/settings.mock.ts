import type { ClinicSettingsProfile } from "@/contracts/settings";

export const clinicSettingsProfileMock: ClinicSettingsProfile = {
  publicInfo: {
    legalName: "Clínica EmagrecePlus Saúde Integrada LTDA",
    tradeName: "EmagrecePlus Centro Clínico",
    website: "https://emagreceplus.app",
    contactEmail: "contato@emagreceplus.app",
    contactPhone: "+55 11 4000-5522",
  },
  fiscalInfo: {
    document: "CNPJ 00.000.000/0001-99",
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
