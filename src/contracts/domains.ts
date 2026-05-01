import type { ContractMeta, UiState } from "./common";

export type AuthStatus = "ativo" | "simulado" | "não configurado";
export interface AuthContract extends ContractMeta { state: UiState; sessionId?: string; userId?: string; status: AuthStatus }

export type TenantStatus = "ativo" | "inativo" | "simulado";
export interface TenantUnitContract extends ContractMeta { id: string; nome: string; status: TenantStatus; role: "Nutricionista" | "Coordenador(a)" | "Recepção"; location?: string }

export type DashboardStatus = "ok" | "alerta" | "crítico";
export interface DashboardContract extends ContractMeta { state: UiState; status: DashboardStatus; kpiIds: string[] }

export type CRMLeadStatus = "novo" | "qualificado" | "consulta_agendada" | "proposta_enviada" | "perdido" | "arquivado";
export interface CRMLeadContract extends ContractMeta { id: string; nome: string; stage: CRMLeadStatus; telefone: string; origem?: string }

export type PatientStatus = "em_tratamento" | "estavel" | "risco_aderencia";
export interface PatientContract extends ContractMeta { id: string; nome: string; status: PatientStatus; plano: "Essential" | "Premium" }

export type ScheduleStatus = "confirmado" | "aguardando" | "cancelado";
export interface ScheduleContract extends ContractMeta { id: string; patientId: string; status: ScheduleStatus; startTime: string; endTime: string }

export type EncounterStatus = "triagem" | "em_atendimento" | "finalizado";
export interface EncounterContract extends ContractMeta { id: string; patientId: string; status: EncounterStatus; soapId?: string }

export type NutritionStatus = "rascunho" | "ativo" | "encerrado";
export interface NutritionPlanContract extends ContractMeta { id: string; patientId: string; status: NutritionStatus; objetivo: string }

export type PrescriptionStatus = "emitida" | "revisao" | "arquivada";
export interface PrescriptionContract extends ContractMeta { id: string; patientId: string; status: PrescriptionStatus; role: "nutritionist" | "physician" }

export type DocumentStatus = "rascunho" | "assinatura_pendente" | "assinado" | "expirado";
export interface DocumentContract extends ContractMeta { id: string; patientId: string; status: DocumentStatus; provider: "d4sign" }

export type D4SignStatus = "não configurado" | "simulado" | "ativo";
export interface D4SignContract extends ContractMeta { mode: "unconfigured" | "simulated" | "live"; status: D4SignStatus; webhookStatus?: D4SignStatus }

export type FinancialStatus = "adimplente" | "pendente" | "inadimplente";
export interface FinancialContract extends ContractMeta { id: string; patientId?: string; status: FinancialStatus; amount: string }

export type ServiceStatus = "ativo" | "em_revisao" | "inativo";
export interface ServiceContract extends ContractMeta { id: string; nome: string; status: ServiceStatus; preco: string }

export type PackageStatus = "ativo" | "em_revisao" | "inativo";
export interface PackageContract extends ContractMeta { id: string; nome: string; status: PackageStatus; preco: string }

export type InventoryStatus = "saudavel" | "baixo" | "critico";
export interface InventoryContract extends ContractMeta { id: string; nome: string; status: InventoryStatus; quantidade: number }

export type PurchaseStatus = "recebida" | "em_transito" | "atrasada";
export interface PurchaseContract extends ContractMeta { id: string; supplierId: string; status: PurchaseStatus; total: number }

export type ReportStatus = "gerado" | "processando" | "falhou";
export interface ReportContract extends ContractMeta { id: string; status: ReportStatus; state: UiState }

export type NotificationStatus = "não lida" | "lida" | "arquivada";
export interface NotificationContract extends ContractMeta { id: string; status: NotificationStatus; title: string; body?: string }

export type ChatStatus = "online" | "offline" | "encerrado";
export interface ChatContract extends ContractMeta { roomId: string; status: ChatStatus; lastMessageAt?: string }

export type PatientAppStatus = "ativo" | "inativo" | "bloqueado";
export interface PatientAppContract extends ContractMeta { patientId: string; status: PatientAppStatus; streakDays?: number }
