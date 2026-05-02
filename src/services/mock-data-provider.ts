import type {
  DataProvider,
  AuthRepository,
  TenantRepository,
  DashboardRepository,
  CrmRepository,
  SchedulingRepository,
  ClinicalRepository,
  NutritionRepository,
  PrescriptionRepository,
  DocumentRepository,
  FinanceRepository,
  PackageRepository,
  InventoryRepository,
  ReportRepository,
  NotificationRepository,
  ChatRepository,
} from "./data-provider";
import type { AuthSession } from "@/contracts/auth";
import type { TenantDetailDto, TenantListDto } from "@/contracts/tenant";
import type { CrmDetailDto, CrmListDto, LeadItem } from "@/contracts/crm";
import type {
  PatientDetail,
  PatientListResult,
  PatientRepository,
} from "@/contracts/patients";
import type {
  SchedulingDetailDto,
  SchedulingListDto,
} from "@/contracts/scheduling";
import type { ClinicalDetailDto, ClinicalListDto } from "@/contracts/clinical";
import type {
  NutritionDetailDto,
  NutritionListDto,
} from "@/contracts/nutrition";
import type {
  PrescriptionDetailDto,
  PrescriptionListDto,
} from "@/contracts/prescriptions";
import type { DocumentDetailDto, DocumentListDto } from "@/contracts/documents";
import type { FinanceDetailDto, FinanceListDto } from "@/contracts/finance";
import type { PackageDetailDto, PackageListDto } from "@/contracts/packages";
import type {
  InventoryDetailDto,
  InventoryListDto,
} from "@/contracts/inventory";
import type { ReportDetailDto, ReportListDto } from "@/contracts/reports";
import type {
  NotificationDetailDto,
  NotificationListDto,
} from "@/contracts/notifications";
import type { ChatDetailDto, ChatListDto } from "@/contracts/chat";
import { patientDetailsMock, patientsMock } from "@/data/mock/patients.mock";

const leadItems: LeadItem[] = [
  {
    id: "lead-1",
    name: "Marina Gomes",
    phone: "5511999999999",
    source: "instagram",
    status: "qualified",
    ownerId: "user-1",
  },
];

class MockAuthRepository implements AuthRepository {
  async getSession(): Promise<AuthSession | null> {
    return {
      id: "sess-1",
      userId: "user-1",
      tenantId: "tenant-1",
      role: "nutritionist",
      state: "default",
    };
  }
}
class MockTenantRepository implements TenantRepository {
  async listTenants(): Promise<TenantListDto> {
    return {
      state: "default",
      items: [
        {
          id: "tenant-1",
          name: "Clínica Centro",
          slug: "clinica-centro",
          status: "simulated",
          timezone: "America/Sao_Paulo",
        },
      ],
    };
  }
  async getTenantDetail(tenantId: string): Promise<TenantDetailDto | null> {
    return tenantId === "tenant-1"
      ? {
          tenant: {
            id: "tenant-1",
            name: "Clínica Centro",
            slug: "clinica-centro",
            status: "simulated",
            timezone: "America/Sao_Paulo",
          },
          allowedRoles: ["nutritionist", "coordinator", "reception"],
        }
      : null;
  }
}
class MockDashboardRepository implements DashboardRepository {
  async getOverview() {
    return {
      state: "default" as const,
      kpiIds: ["active-patients", "appointments-today", "no-show"],
    };
  }
}
class MockCrmRepository implements CrmRepository {
  async listLeads(): Promise<CrmListDto> {
    return { state: "default", items: leadItems };
  }
  async getLeadDetail(leadId: string): Promise<CrmDetailDto | null> {
    const lead = leadItems.find((item) => item.id === leadId);
    return lead
      ? {
          lead,
          timeline: [
            {
              id: "evt-1",
              at: "2026-05-01T09:00:00Z",
              event: "Contato inicial",
            },
          ],
        }
      : null;
  }
}
class MockPatientRepository implements PatientRepository {
  async listPatients(): Promise<PatientListResult> {
    return { state: "default", items: patientsMock };
  }
  async getPatientDetail(patientId: string): Promise<PatientDetail | null> {
    return patientDetailsMock[patientId] ?? null;
  }
}
class MockSchedulingRepository implements SchedulingRepository {
  async listAppointments(): Promise<SchedulingListDto> {
    return {
      state: "default",
      items: [
        {
          id: "apt-1",
          patientId: "pat_001",
          professionalId: "user-1",
          startsAt: "2026-05-02T09:00:00Z",
          endsAt: "2026-05-02T09:40:00Z",
          channel: "in_person",
          status: "confirmed",
        },
      ],
    };
  }
  async getAppointmentDetail(
    appointmentId: string,
  ): Promise<SchedulingDetailDto | null> {
    return appointmentId === "apt-1"
      ? {
          item: {
            id: "apt-1",
            patientId: "pat_001",
            professionalId: "user-1",
            startsAt: "2026-05-02T09:00:00Z",
            endsAt: "2026-05-02T09:40:00Z",
            channel: "in_person",
            status: "confirmed",
          },
          notes: "Trazer diário alimentar",
          room: "Sala 2",
        }
      : null;
  }
}
class MockClinicalRepository implements ClinicalRepository {
  async listRecords(): Promise<ClinicalListDto> {
    return {
      state: "default",
      items: [
        {
          id: "rec-1",
          patientId: "pat_001",
          appointmentId: "apt-1",
          status: "in_progress",
          chiefComplaint: "Ajuste de composição corporal",
          updatedAt: "2026-05-01T12:00:00Z",
        },
      ],
    };
  }
  async getRecordDetail(recordId: string): Promise<ClinicalDetailDto | null> {
    return recordId === "rec-1"
      ? {
          record: {
            id: "rec-1",
            patientId: "pat_001",
            appointmentId: "apt-1",
            status: "in_progress",
            chiefComplaint: "Ajuste de composição corporal",
            updatedAt: "2026-05-01T12:00:00Z",
          },
          soap: {
            subjective: "Refere boa adesão semanal.",
            objective: "Sem intercorrências.",
            assessment: "Evolução favorável.",
            plan: "Manter plano e retorno em 15 dias.",
          },
        }
      : null;
  }
}
class MockNutritionRepository implements NutritionRepository {
  async listPlans(): Promise<NutritionListDto> {
    return {
      state: "default",
      items: [
        {
          id: "plan-1",
          patientId: "pat_001",
          goal: "Redução de gordura corporal",
          kcalTarget: 1800,
          status: "active",
        },
      ],
    };
  }
  async getPlanDetail(planId: string): Promise<NutritionDetailDto | null> {
    return planId === "plan-1"
      ? {
          plan: {
            id: "plan-1",
            patientId: "pat_001",
            goal: "Redução de gordura corporal",
            kcalTarget: 1800,
            status: "active",
          },
          meals: [
            { id: "meal-1", name: "Café da manhã", calories: 420 },
            { id: "meal-2", name: "Almoço", calories: 620 },
          ],
        }
      : null;
  }
}
class MockPrescriptionRepository implements PrescriptionRepository {
  async listPrescriptions(): Promise<PrescriptionListDto> {
    return {
      state: "default",
      items: [
        {
          id: "pres-1",
          patientId: "pat_001",
          type: "guidance",
          status: "issued",
          createdAt: "2026-05-01",
        },
      ],
    };
  }
  async getPrescriptionDetail(
    id: string,
  ): Promise<PrescriptionDetailDto | null> {
    return id === "pres-1"
      ? {
          item: {
            id: "pres-1",
            patientId: "pat_001",
            type: "guidance",
            status: "issued",
            createdAt: "2026-05-01",
          },
          entries: [
            {
              id: "entry-1",
              label: "Hidratação",
              instructions: "35 ml/kg/dia",
            },
          ],
        }
      : null;
  }
}
class MockDocumentRepository implements DocumentRepository {
  async listDocuments(): Promise<DocumentListDto> {
    return {
      state: "default",
      items: [
        {
          id: "doc-1",
          patientId: "pat_001",
          title: "Termo de consentimento",
          status: "pending_signature",
          provider: "d4sign_simulated",
          createdAt: "2026-04-30",
        },
      ],
    };
  }
  async getDocumentDetail(id: string): Promise<DocumentDetailDto | null> {
    return id === "doc-1"
      ? {
          item: {
            id: "doc-1",
            patientId: "pat_001",
            title: "Termo de consentimento",
            status: "pending_signature",
            provider: "d4sign_simulated",
            createdAt: "2026-04-30",
          },
          signers: [
            {
              id: "sig-1",
              name: "Fernanda Souza",
              email: "fernanda@example.com",
              status: "pending",
            },
          ],
        }
      : null;
  }
}
class MockFinanceRepository implements FinanceRepository {
  async listFinance(): Promise<FinanceListDto> {
    return {
      state: "default",
      filters: {},
      totalOpenCents: 25900,
      items: [
        {
          id: "fin-1",
          patientId: "pat_001",
          description: "Plano Premium mensal",
          amountCents: 25900,
          dueDate: "2026-05-10",
          status: "open",
          source: "subscription",
          method: "pix",
        },
      ],
    };
  }
  async getFinanceDetail(id: string): Promise<FinanceDetailDto | null> {
    return id === "fin-1"
      ? {
          item: {
            id: "fin-1",
            patientId: "pat_001",
            description: "Plano Premium mensal",
            amountCents: 25900,
            dueDate: "2026-05-10",
            status: "open",
            source: "subscription",
            method: "pix",
          },
          history: [
            {
              id: "h1",
              at: "2026-05-01T11:00:00Z",
              action: "Cobrança criada (simulada)",
              actor: "sistema",
            },
          ],
        }
      : null;
  }
}
class MockPackageRepository implements PackageRepository {
  async listPackages(): Promise<PackageListDto> {
    return {
      state: "default",
      items: [
        {
          id: "pkg-1",
          name: "Programa 12 semanas",
          sessions: 8,
          priceCents: 199000,
          status: "active",
          visibility: "public",
        },
      ],
    };
  }
  async getPackageDetail(id: string): Promise<PackageDetailDto | null> {
    return id === "pkg-1"
      ? {
          item: {
            id: "pkg-1",
            name: "Programa 12 semanas",
            sessions: 8,
            priceCents: 199000,
            status: "active",
            visibility: "public",
          },
          includedServices: ["Avaliação inicial", "Retornos quinzenais"],
          notes: "Oferta simulada",
        }
      : null;
  }
}
class MockInventoryRepository implements InventoryRepository {
  async listItems(): Promise<InventoryListDto> {
    return {
      state: "default",
      items: [
        {
          id: "inv-1",
          sku: "SUP-WHEY-001",
          name: "Whey isolado sachê",
          quantity: 42,
          minimumQuantity: 30,
          status: "in_stock",
        },
      ],
    };
  }
  async getItemDetail(id: string): Promise<InventoryDetailDto | null> {
    return id === "inv-1"
      ? {
          item: {
            id: "inv-1",
            sku: "SUP-WHEY-001",
            name: "Whey isolado sachê",
            quantity: 42,
            minimumQuantity: 30,
            status: "in_stock",
          },
          movements: [
            { id: "mv-1", date: "2026-04-29", type: "in", quantity: 20 },
          ],
        }
      : null;
  }
}
class MockReportRepository implements ReportRepository {
  async listReports(): Promise<ReportListDto> {
    return {
      state: "default",
      items: [
        {
          id: "rep-1",
          type: "operations",
          title: "Resumo mensal operacional",
          status: "ready",
          generatedAt: "2026-05-01T18:00:00Z",
        },
      ],
    };
  }
  async getReportDetail(id: string): Promise<ReportDetailDto | null> {
    return id === "rep-1"
      ? {
          item: {
            id: "rep-1",
            type: "operations",
            title: "Resumo mensal operacional",
            status: "ready",
            generatedAt: "2026-05-01T18:00:00Z",
          },
          downloadUrl: "/mock/reports/rep-1.pdf",
        }
      : null;
  }
}
class MockNotificationRepository implements NotificationRepository {
  async listNotifications(): Promise<NotificationListDto> {
    return {
      state: "default",
      items: [
        {
          id: "not-1",
          title: "Documento pendente",
          body: "Assinatura pendente no D4Sign simulado.",
          status: "unread",
          channel: "in_app",
          createdAt: "2026-05-01T09:30:00Z",
          severity: "warning",
          category: "documentos",
          cta: { label: "Ver documento", href: "/documents/doc-1" },
        },
      ],
    };
  }
  async getNotificationDetail(
    id: string,
  ): Promise<NotificationDetailDto | null> {
    return id === "not-1"
      ? {
          item: {
            id: "not-1",
            title: "Documento pendente",
            body: "Assinatura pendente no D4Sign simulado.",
            status: "unread",
            channel: "in_app",
            createdAt: "2026-05-01T09:30:00Z",
            severity: "warning",
            category: "documentos",
            cta: { label: "Ver documento", href: "/documents/doc-1" },
          },
        }
      : null;
  }
}
class MockChatRepository implements ChatRepository {
  async listRooms(): Promise<ChatListDto> {
    return {
      state: "default",
      rooms: [
        {
          id: "room-1",
          participantIds: ["user-1", "pat_001"],
          status: "active",
          lastMessageAt: "2026-05-01T13:00:00Z",
        },
      ],
    };
  }
  async getRoomDetail(id: string): Promise<ChatDetailDto | null> {
    return id === "room-1"
      ? {
          room: {
            id: "room-1",
            participantIds: ["user-1", "pat_001"],
            status: "active",
            lastMessageAt: "2026-05-01T13:00:00Z",
          },
          messages: [
            {
              id: "msg-1",
              roomId: "room-1",
              senderId: "user-1",
              content: "Olá! Como foi sua semana?",
              createdAt: "2026-05-01T13:00:00Z",
              status: "read",
            },
          ],
        }
      : null;
  }
}

export const mockDataProvider: DataProvider = {
  auth: new MockAuthRepository(),
  tenants: new MockTenantRepository(),
  dashboard: new MockDashboardRepository(),
  crm: new MockCrmRepository(),
  patients: new MockPatientRepository(),
  scheduling: new MockSchedulingRepository(),
  clinical: new MockClinicalRepository(),
  nutrition: new MockNutritionRepository(),
  prescriptions: new MockPrescriptionRepository(),
  documents: new MockDocumentRepository(),
  finance: new MockFinanceRepository(),
  packages: new MockPackageRepository(),
  inventory: new MockInventoryRepository(),
  reports: new MockReportRepository(),
  notifications: new MockNotificationRepository(),
  chat: new MockChatRepository(),
};
