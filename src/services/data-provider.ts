import type { AuthSession } from "@/contracts/auth";
import type { TenantDetailDto, TenantListDto } from "@/contracts/tenant";
import type { CrmDetailDto, CrmListDto } from "@/contracts/crm";
import type { PatientRepository } from "@/contracts/patients";
import type { SchedulingDetailDto, SchedulingListDto } from "@/contracts/scheduling";
import type { ClinicalDetailDto, ClinicalListDto } from "@/contracts/clinical";
import type { NutritionDetailDto, NutritionListDto } from "@/contracts/nutrition";
import type { PrescriptionDetailDto, PrescriptionListDto } from "@/contracts/prescriptions";
import type { DocumentDetailDto, DocumentListDto } from "@/contracts/documents";
import type { FinanceDetailDto, FinanceListDto } from "@/contracts/finance";
import type { PackageDetailDto, PackageListDto } from "@/contracts/packages";
import type { InventoryDetailDto, InventoryListDto } from "@/contracts/inventory";
import type { ReportDetailDto, ReportListDto } from "@/contracts/reports";
import type { NotificationDetailDto, NotificationListDto } from "@/contracts/notifications";
import type { ChatDetailDto, ChatListDto } from "@/contracts/chat";
import type { UiState } from "@/contracts/common";

export interface AuthRepository { getSession(): Promise<AuthSession | null>; }
export interface DashboardRepository { getOverview(): Promise<{ state: UiState; kpiIds: string[] }>; }
export interface TenantRepository { listTenants(): Promise<TenantListDto>; getTenantDetail(tenantId: string): Promise<TenantDetailDto | null>; }
export interface CrmRepository { listLeads(): Promise<CrmListDto>; getLeadDetail(leadId: string): Promise<CrmDetailDto | null>; }
export interface SchedulingRepository { listAppointments(): Promise<SchedulingListDto>; getAppointmentDetail(appointmentId: string): Promise<SchedulingDetailDto | null>; }
export interface ClinicalRepository { listRecords(): Promise<ClinicalListDto>; getRecordDetail(recordId: string): Promise<ClinicalDetailDto | null>; }
export interface NutritionRepository { listPlans(): Promise<NutritionListDto>; getPlanDetail(planId: string): Promise<NutritionDetailDto | null>; }
export interface PrescriptionRepository { listPrescriptions(): Promise<PrescriptionListDto>; getPrescriptionDetail(prescriptionId: string): Promise<PrescriptionDetailDto | null>; }
export interface DocumentRepository { listDocuments(): Promise<DocumentListDto>; getDocumentDetail(documentId: string): Promise<DocumentDetailDto | null>; }
export interface FinanceRepository { listFinance(): Promise<FinanceListDto>; getFinanceDetail(financeId: string): Promise<FinanceDetailDto | null>; }
export interface PackageRepository { listPackages(): Promise<PackageListDto>; getPackageDetail(packageId: string): Promise<PackageDetailDto | null>; }
export interface InventoryRepository { listItems(): Promise<InventoryListDto>; getItemDetail(itemId: string): Promise<InventoryDetailDto | null>; }
export interface ReportRepository { listReports(): Promise<ReportListDto>; getReportDetail(reportId: string): Promise<ReportDetailDto | null>; }
export interface NotificationRepository { listNotifications(): Promise<NotificationListDto>; getNotificationDetail(notificationId: string): Promise<NotificationDetailDto | null>; }
export interface ChatRepository { listRooms(): Promise<ChatListDto>; getRoomDetail(roomId: string): Promise<ChatDetailDto | null>; }

export interface DataProvider {
  auth: AuthRepository;
  tenants: TenantRepository;
  dashboard: DashboardRepository;
  crm: CrmRepository;
  patients: PatientRepository;
  scheduling: SchedulingRepository;
  clinical: ClinicalRepository;
  nutrition: NutritionRepository;
  prescriptions: PrescriptionRepository;
  documents: DocumentRepository;
  finance: FinanceRepository;
  packages: PackageRepository;
  inventory: InventoryRepository;
  reports: ReportRepository;
  notifications: NotificationRepository;
  chat: ChatRepository;
}
