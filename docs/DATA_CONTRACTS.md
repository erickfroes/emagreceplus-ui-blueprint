# Data Contracts (UI-only)

Este documento define contratos de dados TypeScript para as telas principais, com foco em mocks tipados e futura troca para Supabase/API sem refatoração ampla.

## Local dos contratos
- `src/contracts/common.ts`
- `src/contracts/domains.ts`
- `src/contracts/index.ts`

## Contratos por domínio

| Domínio | Tipo | Campos obrigatórios | Campos opcionais | Enum de status | Tela que consome | Fonte futura |
|---|---|---|---|---|---|---|
| Auth | `AuthContract` | `tela`, `fonteFutura`, `state`, `status` | `sessionId`, `userId` | `AuthStatus` | `auth/login` | `supabase_future` |
| Tenants/unidades | `TenantUnitContract` | `id`, `nome`, `status`, `role`, `tela`, `fonteFutura` | `location` | `TenantStatus` | `auth/environment` | `supabase_future` |
| Dashboard | `DashboardContract` | `state`, `status`, `kpiIds`, `tela`, `fonteFutura` | - | `DashboardStatus` | `dashboard`, `dashboard/clinic` | `supabase_future` |
| CRM/leads | `CRMLeadContract` | `id`, `nome`, `stage`, `telefone`, `tela`, `fonteFutura` | `origem` | `CRMLeadStatus` | `crm`, `crm/leads/[leadId]` | `supabase_future` |
| Pacientes | `PatientContract` | `id`, `nome`, `status`, `plano`, `tela`, `fonteFutura` | - | `PatientStatus` | `patients`, `patients/[patientId]` | `supabase_future` |
| Agenda | `ScheduleContract` | `id`, `patientId`, `status`, `startTime`, `endTime`, `tela`, `fonteFutura` | - | `ScheduleStatus` | `schedule` | `supabase_future` |
| Atendimento | `EncounterContract` | `id`, `patientId`, `status`, `tela`, `fonteFutura` | `soapId` | `EncounterStatus` | `queue`, `encounters/[encounterId]` | `supabase_future` |
| Nutrição | `NutritionPlanContract` | `id`, `patientId`, `status`, `objetivo`, `tela`, `fonteFutura` | - | `NutritionStatus` | `nutrition/plans/[patientId]` | `supabase_future` |
| Prescrições | `PrescriptionContract` | `id`, `patientId`, `status`, `role`, `tela`, `fonteFutura` | - | `PrescriptionStatus` | `prescriptions/[prescriptionId]` | `supabase_future` |
| Documentos | `DocumentContract` | `id`, `patientId`, `status`, `provider`, `tela`, `fonteFutura` | - | `DocumentStatus` | `documents`, `documents/[documentId]` | `api_future` |
| D4Sign | `D4SignContract` | `mode`, `status`, `tela`, `fonteFutura` | `webhookStatus` | `D4SignStatus` | `documents/ops/health`, `settings/signature` | `api_future` |
| Financeiro | `FinancialContract` | `id`, `status`, `amount`, `tela`, `fonteFutura` | `patientId` | `FinancialStatus` | `finance/*` | `api_future` |
| Serviços | `ServiceContract` | `id`, `nome`, `status`, `preco`, `tela`, `fonteFutura` | - | `ServiceStatus` | `services` | `supabase_future` |
| Pacotes | `PackageContract` | `id`, `nome`, `status`, `preco`, `tela`, `fonteFutura` | - | `PackageStatus` | `packages/*` | `supabase_future` |
| Estoque | `InventoryContract` | `id`, `nome`, `status`, `quantidade`, `tela`, `fonteFutura` | - | `InventoryStatus` | `inventory/*` | `supabase_future` |
| Compras | `PurchaseContract` | `id`, `supplierId`, `status`, `total`, `tela`, `fonteFutura` | - | `PurchaseStatus` | `purchases`, `suppliers` | `supabase_future` |
| Relatórios | `ReportContract` | `id`, `status`, `state`, `tela`, `fonteFutura` | - | `ReportStatus` | `reports/*` | `api_future` |
| Notificações | `NotificationContract` | `id`, `status`, `title`, `tela`, `fonteFutura` | `body` | `NotificationStatus` | `dashboard`, `layout/topbar` | `supabase_future` |
| Chat | `ChatContract` | `roomId`, `status`, `tela`, `fonteFutura` | `lastMessageAt` | `ChatStatus` | `app/chat` | `supabase_future` |
| App paciente | `PatientAppContract` | `patientId`, `status`, `tela`, `fonteFutura` | `streakDays` | `PatientAppStatus` | `app/*` | `supabase_future` |

## Mocks ajustados
- `src/data/mock/auth.ts`: `LoginScreenMock` agora estende `AuthContract`; ambientes incluem `TenantUnitContract`.
- `src/data/mock/crm.ts`: `CRMLead` agora estende `CRMLeadContract`.
