import type { AuthSession } from "@/contracts/auth";
import type { TenantDetailDto, TenantListDto } from "@/contracts/tenant";
import type { CrmDetailDto, CrmListDto } from "@/contracts/crm";
import type { PatientDetail, PatientListResult, PatientRepository } from "@/contracts/patients";
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
import type { DataProvider, AuthRepository, TenantRepository, DashboardRepository, CrmRepository, SchedulingRepository, ClinicalRepository, NutritionRepository, PrescriptionRepository, DocumentRepository, FinanceRepository, PackageRepository, InventoryRepository, ReportRepository, NotificationRepository, ChatRepository } from "./data-provider";

const UI_ONLY_ERROR = "Supabase provider is not enabled in UI-only mode";
const throwUiOnly = (): never => { throw new Error(UI_ONLY_ERROR); };

class FutureSupabaseAuthRepository implements AuthRepository { async getSession(): Promise<AuthSession | null> { return throwUiOnly(); } }
class FutureSupabaseTenantRepository implements TenantRepository { async listTenants(): Promise<TenantListDto> { return throwUiOnly(); } async getTenantDetail(id: string): Promise<TenantDetailDto | null> { void id; return throwUiOnly(); } }
class FutureSupabaseDashboardRepository implements DashboardRepository { async getOverview(): Promise<{ state: "default" | "loading" | "empty" | "error" | "forbidden"; kpiIds: string[] }> { return throwUiOnly(); } }
class FutureSupabaseCrmRepository implements CrmRepository { async listLeads(): Promise<CrmListDto> { return throwUiOnly(); } async getLeadDetail(id: string): Promise<CrmDetailDto | null> { void id; return throwUiOnly(); } }
class FutureSupabasePatientRepository implements PatientRepository { async listPatients(): Promise<PatientListResult> { return throwUiOnly(); } async getPatientDetail(id: string): Promise<PatientDetail | null> { void id; return throwUiOnly(); } }
class FutureSupabaseSchedulingRepository implements SchedulingRepository { async listAppointments(): Promise<SchedulingListDto> { return throwUiOnly(); } async getAppointmentDetail(id: string): Promise<SchedulingDetailDto | null> { void id; return throwUiOnly(); } }
class FutureSupabaseClinicalRepository implements ClinicalRepository { async listRecords(): Promise<ClinicalListDto> { return throwUiOnly(); } async getRecordDetail(id: string): Promise<ClinicalDetailDto | null> { void id; return throwUiOnly(); } }
class FutureSupabaseNutritionRepository implements NutritionRepository { async listPlans(): Promise<NutritionListDto> { return throwUiOnly(); } async getPlanDetail(id: string): Promise<NutritionDetailDto | null> { void id; return throwUiOnly(); } }
class FutureSupabasePrescriptionRepository implements PrescriptionRepository { async listPrescriptions(): Promise<PrescriptionListDto> { return throwUiOnly(); } async getPrescriptionDetail(id: string): Promise<PrescriptionDetailDto | null> { void id; return throwUiOnly(); } }
class FutureSupabaseDocumentRepository implements DocumentRepository { async listDocuments(): Promise<DocumentListDto> { return throwUiOnly(); } async getDocumentDetail(id: string): Promise<DocumentDetailDto | null> { void id; return throwUiOnly(); } }
class FutureSupabaseFinanceRepository implements FinanceRepository { async listFinance(): Promise<FinanceListDto> { return throwUiOnly(); } async getFinanceDetail(id: string): Promise<FinanceDetailDto | null> { void id; return throwUiOnly(); } }
class FutureSupabasePackageRepository implements PackageRepository { async listPackages(): Promise<PackageListDto> { return throwUiOnly(); } async getPackageDetail(id: string): Promise<PackageDetailDto | null> { void id; return throwUiOnly(); } }
class FutureSupabaseInventoryRepository implements InventoryRepository { async listItems(): Promise<InventoryListDto> { return throwUiOnly(); } async getItemDetail(id: string): Promise<InventoryDetailDto | null> { void id; return throwUiOnly(); } }
class FutureSupabaseReportRepository implements ReportRepository { async listReports(): Promise<ReportListDto> { return throwUiOnly(); } async getReportDetail(id: string): Promise<ReportDetailDto | null> { void id; return throwUiOnly(); } }
class FutureSupabaseNotificationRepository implements NotificationRepository { async listNotifications(): Promise<NotificationListDto> { return throwUiOnly(); } async getNotificationDetail(id: string): Promise<NotificationDetailDto | null> { void id; return throwUiOnly(); } }
class FutureSupabaseChatRepository implements ChatRepository { async listRooms(): Promise<ChatListDto> { return throwUiOnly(); } async getRoomDetail(id: string): Promise<ChatDetailDto | null> { void id; return throwUiOnly(); } }

export const futureSupabaseProvider: DataProvider = {
  auth: new FutureSupabaseAuthRepository(),
  tenants: new FutureSupabaseTenantRepository(),
  dashboard: new FutureSupabaseDashboardRepository(),
  crm: new FutureSupabaseCrmRepository(),
  patients: new FutureSupabasePatientRepository(),
  scheduling: new FutureSupabaseSchedulingRepository(),
  clinical: new FutureSupabaseClinicalRepository(),
  nutrition: new FutureSupabaseNutritionRepository(),
  prescriptions: new FutureSupabasePrescriptionRepository(),
  documents: new FutureSupabaseDocumentRepository(),
  finance: new FutureSupabaseFinanceRepository(),
  packages: new FutureSupabasePackageRepository(),
  inventory: new FutureSupabaseInventoryRepository(),
  reports: new FutureSupabaseReportRepository(),
  notifications: new FutureSupabaseNotificationRepository(),
  chat: new FutureSupabaseChatRepository(),
};
