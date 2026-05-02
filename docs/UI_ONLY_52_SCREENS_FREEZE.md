# UI-ONLY 52 SCREENS FREEZE

Data: 2026-05-02  
Branch: `docs/ui-only-52-screens-freeze`

## 1) Lista final das 52 telas (com rota, status, componentes e mocks)

> Classificação de freeze:
> - **completa**: UI consolidada para protótipo funcional com estados visuais principais.
> - **parcial aceitável**: UI navegável e coerente para freeze, com melhorias incrementais mapeadas.
> - **planejada**: escopo mapeado, mas ainda não consolidado para uso principal.

| # | Tela | Rota final | Status | Componentes principais | Mocks usados |
|---:|---|---|---|---|---|
| 1 | Login | `/auth/login` | parcial aceitável | LoginView | `auth.mock` |
| 2 | Seleção unidade | `/auth/environment` | parcial aceitável | EnvironmentSelectionView | `tenants/auth` |
| 3 | Dashboard | `/dashboard/clinic` | parcial aceitável | ClinicDashboardView | `clinic-dashboard` |
| 4 | CRM Kanban | `/crm` | completa | Kanban board + filtros | `crm` |
| 5 | Detalhe Lead | `/crm/leads/[leadId]` | parcial aceitável | Lead detail view | `crm` |
| 6 | Pacientes | `/patients` | completa | Patient table/list | `patients` |
| 7 | Paciente 360 | `/patients/[patientId]` | parcial aceitável | PatientDetail + tabs | `patients/clinical` |
| 8 | Agenda | `/schedule` | completa | Agenda/grid + queue | `scheduling` |
| 9 | Fila | `/queue` | completa | Queue board | `scheduling` |
| 10 | SOAP | `/encounters/[encounterId]` | completa | SoapEditor + contexto + action bar | `encounters/clinical` |
| 11 | Anamnese | `/encounters/[encounterId]/anamnesis` | completa | Stepper + form + resumo | `encounters/clinical` |
| 12 | Plano Alimentar | `/nutrition/plans/[patientId]` | completa | MealCard + MacroSummary + preview | `nutrition` |
| 13 | Prescrições | `/prescriptions/[prescriptionId]` | completa | Tabs + preview + histórico | `prescriptions` |
| 14 | Centro Documental | `/documents` | completa | Document list view | `documents` |
| 15 | Detalhe Documento | `/documents/[documentId]` | completa | Document detail view | `documents` |
| 16 | Dossiê de evidência | `/documents/[documentId]/evidence` | completa | Evidence status + timeline | `documents` |
| 17 | Health Documental | `/documents/ops/health` | completa | Ops health view | `documents` |
| 18 | Notificações | `/notifications` | completa | NotificationsView | `notifications` |
| 19 | Chat Equipe | `/chat` | completa | StaffChatView | `chat` |
| 20 | Chat Mobile | `/app/chat` | parcial aceitável | Mobile chat page | `chat` |
| 21 | App Paciente | `/app` | parcial aceitável | MobileAppShell | `patients/reports` |
| 22 | Modal Água | `/app/water` | parcial aceitável | Water modal page | `patients` |
| 23 | Modal Refeição | `/app/meals` | parcial aceitável | Meals modal page | `patients/nutrition` |
| 24 | Modal Treino | `/app/workouts` | parcial aceitável | Workouts modal page | `patients` |
| 25 | Check-in | `/app/checkin` | parcial aceitável | Checkin page | `clinical/patients` |
| 26 | Config Clínica | `/settings/profile` | completa | SettingsShell + profile cards | `settings.mock` |
| 27 | Editor Documento | `/settings/documents/editor` | completa | Toolbox + canvas + properties | estado local UI-only |
| 28 | D4Sign Settings | `/settings/signature` | completa | Provider/status cards | `integrations/documents` (simulado) |
| 29 | Billing SaaS | `/settings/billing` | parcial aceitável | Billing settings page | `finance` |
| 30 | Analytics | `/reports/executive` | completa | Executive KPIs + alerts | `reports` |
| 31 | Financeiro | `/finance` | parcial aceitável | Finance dashboard | `finance` |
| 32 | Contas Receber | `/finance/receivables` | completa | Receivables table/KPIs | `finance` |
| 33 | Pagamento Modal | `/finance` e `/finance/receivables` | completa | PaymentRegistrationModal | `finance` |
| 34 | Caixa | `/finance/cash-register` | parcial aceitável | Cash register page | `finance` |
| 35 | Repasses | `/finance/payouts` | parcial aceitável | Payouts page | `finance` |
| 36 | Inadimplência | `/finance/overdue` | parcial aceitável | Overdue page | `finance` |
| 37 | Serviços | `/services` | parcial aceitável | Services page | `packages/finance` |
| 38 | Pacotes | `/packages` | parcial aceitável | Packages list page | `packages` |
| 39 | Criar Pacote | `/packages/new` | parcial aceitável | Package form page | `packages` |
| 40 | Vender Pacote | `/packages/sell` | completa | Sale stepper + summary | `package-sale` |
| 41 | Contrato Pacote | `/contracts/[contractId]` | parcial aceitável | Contract view | `packages/documents` |
| 42 | Estoque Dashboard | `/inventory` | parcial aceitável | Inventory dashboard | `inventory` |
| 43 | Itens Estoque | `/inventory/items` | parcial aceitável | Inventory items table | `inventory` |
| 44 | Detalhe Item | `/inventory/items/[itemId]` | parcial aceitável | Item detail page | `inventory` |
| 45 | Entrada Estoque | modal em `/inventory/items` e `/inventory/items/[itemId]` | completa | StockEntryModal + confirmação | `inventory` |
| 46 | Saída Estoque | modal em `/inventory/items` e `/inventory/items/[itemId]` | completa | StockOutputModal + confirmação | `inventory` |
| 47 | Compras | `/purchases` | parcial aceitável | Purchases page | `inventory` |
| 48 | Relatórios Financeiros | `/reports/finance` | completa | Finance reports + filtros/tabela | `reports` |
| 49 | Relatórios Pacotes | `/reports/packages` | completa | Package funnel/performance | `reports/packages` |
| 50 | Relatórios Estoque | `/reports/inventory` | completa | Inventory KPIs/reports | `reports/inventory` |
| 51 | Visão Executiva | `/reports/executive` | completa | Executive dashboard | `reports` |
| 52 | Relatório Paciente | `/patients/[patientId]/report` | completa | Patient report tabs/KPIs | `patient-report` |

## 2) Limitações conhecidas
- Parte das telas em status **parcial aceitável** ainda precisa explicitar melhor todos os estados LEEF em blocos dedicados.
- Alguns fluxos são representados por modal/página simulada (sem persistência real).
- Exportações, assinaturas e cobranças estão em modo visual/simulado.

## 3) O que é UI-only neste freeze
- Sem backend real, sem banco real, sem webhooks, sem integrações ativas com terceiros.
- Navegação, estados, componentes e dados mockados tipados para validação de UX e arquitetura frontend.
- Contratos e adapters preparados para troca posterior de provider.

## 4) O que fica para backend futuro
- Autenticação/autorizações reais com política por tenant e perfil.
- Persistência e auditoria em banco de dados.
- Integrações reais de cobrança/assinatura/documentos.
- Rotinas assíncronas (fila, notificações, retries, observabilidade).

## 5) Próxima fase sugerida
- Criar repositório (ou mono-repo) **full-stack** com boundary claro entre UI e domínio.
- Adotar **Supabase** como backend base (auth, db, storage, policies) na fase de integração real.
- Integrar **Asaas** para billing/cobrança (status real, conciliação e webhook).
- Integrar **D4Sign** para ciclo documental/assinatura com trilha de evidências real.

## 6) Critérios para não alterar design system sem revisão
- Não alterar tokens de cor, tipografia, espaçamento e raio base sem aprovação de UX/Produto.
- Não quebrar consistência entre shells (`DashboardShell`, `SettingsShell`, `MobileAppShell`).
- Não remover estados LEEF de componentes/fluxos já cobertos.
- Não introduzir textos com promessa de resultado em saúde.
- Não introduzir claims técnicos não implementados (ex.: E2EE).
- Mudanças visuais sistêmicas exigem PR dedicado com comparação antes/depois.

## 7) Totais finais de freeze (52 telas)
- **completas:** 28
- **parciais aceitáveis:** 24
- **planejadas:** 0

## 8) Consistência com auditoria real
- Documento reconciliado com `docs/execution/REAL_52_SCREEN_COVERAGE_AUDIT.md` na data de **2026-05-02**.
- Nenhuma tela permanece como `planejada`; backlog remanescente está classificado como **parcial aceitável** (freeze) vs **melhoria futura** (pós-freeze).
- Itens antes listados como pendência crítica (Pagamento Modal, SOAP/Anamnese, Relatório Paciente, Notificações, Chat Equipe, Editor Documental, D4Sign Settings e modais de estoque) constam como concluídos no freeze UI-only.

## 9) Parecer final UI-only
O escopo de **52 telas UI-only está congelado** para a fase atual: experiência navegável, coerente e apta para validação funcional de produto/UX, com integrações e backend explicitamente planejados para a próxima etapa.
