# REAL 52 Screen Coverage Audit

Data: 2026-05-02
Branch: `docs/real-52-screen-coverage-audit`

## Critério de classificação
- ✅ **completa**: rota existe + tela funcional com componente principal aderente + mock + contratos + estados LEEF evidentes.
- 🟡 **parcial**: rota existe, porém com lacunas de componente/estados/mock/contratos/escopo.
- 🔴 **planejada**: escopo mapeado, porém ainda não consolidado para uso principal.

## Auditoria das 52 telas

| # | Tela | Rota atual | Existe? | Componente principal | Mock disponível? | Contratos disponíveis? | L/E/E/F disponível? | Pendência de UI | Prioridade |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | Login | `/auth/login` | sim | `LoginView` | sim (`auth.mock`) | sim (`auth`) | parcial (erro) | Explicitar loading/empty/forbidden | M |
| 2 | Seleção unidade | `/auth/environment` | sim | `EnvironmentSelectionView` | sim (`tenants/auth`) | sim (`tenant/auth`) | não explícito | Padronizar LEEF | M |
| 3 | Dashboard | `/dashboard/clinic` | parcial | `ClinicDashboardView` | sim (`clinic-dashboard`) | parcial | parcial | Evidenciar estados e KPIs mapeados | M |
| 4 | CRM Kanban | `/crm` | sim | board em `page.tsx` | sim (`crm`) | sim (`crm`) | sim | Refinar componentes dedicados (KanbanBoard etc.) | M |
| 5 | Detalhe Lead | `/crm/leads/[leadId]` | parcial | detalhe em `page.tsx` | sim (`crm`) | sim (`crm`) | parcial | Falta timeline/quick actions estruturados | M |
| 6 | Pacientes | `/patients` | sim | tabela em `page.tsx` | sim (`patients`) | sim (`patients`) | sim | Extrair `PatientTable/Filters` dedicados | M |
| 7 | Paciente 360 | `/patients/[patientId]` | parcial | `PatientDetail` + `Tabs` | sim (`patients/clinical`) | sim (`patients/clinical`) | sim | Completar blocos 360 (timeline/alertas) | M |
| 8 | Agenda | `/schedule` | sim | agenda em `page.tsx` | sim (`scheduling`) | sim (`scheduling`) | sim | Componentização fina (CalendarGrid/QueuePanel) | M |
| 9 | Fila | `/queue` | sim | fila em `page.tsx` | sim (`scheduling`) | sim (`scheduling`) | sim | KPIs de espera dedicados | B |
| 10 | SOAP | `/encounters/[encounterId]` | completa | `SoapEditor` + `EncounterContextPanel` + `EncounterActionBar` | sim (`encounters/clinical`) | sim (`clinical`) | sim | Concluída com header de paciente, abas SOAP, painel clínico e barra fixa | A |
| 11 | Anamnese | `/encounters/[encounterId]/anamnesis` | completa | stepper + resumo em tempo real + sinais de atenção | sim (`encounters/clinical`) | sim (`clinical`) | sim | Concluída com 7 seções, botões de navegação e tooltip para siglas | A |
| 12 | Plano Alimentar | `/nutrition/plans/[patientId]` | completa | `MealCard` + `MacroSummary` + `FoodGroupChip` + `NutritionPlanPreview` | sim (`nutrition`) | sim (`nutrition`) | sim | Concluída com metas por refeição, histórico/modelos e envio simulado | A |
| 13 | Prescrições | `/prescriptions/[prescriptionId]` | completa | tabs + preview documental + histórico | sim (`prescriptions`) | sim (`prescriptions`) | sim | Concluída com tabs por tipo, status e ações simuladas | A |
| 14 | Centro Documental | `/documents` | sim | documents list view | sim (`documents`) | sim (`documents`) | sim | Consolidar filtros/KPIs dedicados | M |
| 15 | Detalhe Documento | `/documents/[documentId]` | sim | document detail view | sim (`documents`) | sim (`documents`) | sim | Expandir audit timeline visual | M |
| 16 | Dossiê de evidência | `/documents/[documentId]/evidence` | sim | evidence view | sim (`documents`) | sim (`documents`) | sim | Concluído em UI-only com hash/eventos/timeline simulados | A |
| 17 | Health Documental | `/documents/ops/health` | sim | ops health view | sim (`documents`) | sim (`documents`) | sim textual | Melhorar gráficos operacionais | M |
| 18 | Notificações | `/notifications` | sim | `NotificationsView` | sim (`notifications`) | sim (`notifications`) | sim | — | A |
| 19 | Chat Equipe | `/chat` | sim | `StaffChatView` | sim (`chat`) | sim (`chat`) | sim | — | A |
| 20 | Chat Mobile | `/app/chat` | sim | mobile chat page | sim (`chat`) | sim (`chat`) | parcial | Estados LEEF explícitos | M |
| 21 | App Paciente | `/app` | sim | `MobileAppShell` | sim (`patients/reports`) | sim (`patients`) | parcial | Cobrir estados globais da home mobile | M |
| 22 | Modal Água | `/app/water` | sim | modal em página | sim (`patients`) | parcial | parcial | Transformar em bottom-sheet real + LEEF | M |
| 23 | Modal Refeição | `/app/meals` | sim | modal em página | sim (`patients/nutrition`) | sim (`nutrition`) | parcial | Fluxo de upload/checklist mais completo | M |
| 24 | Modal Treino | `/app/workouts` | sim | modal em página | sim (`patients`) | parcial | parcial | Estados/validações e variações | M |
| 25 | Check-in | `/app/checkin` | sim | checkin page | sim (`clinical/patients`) | sim (`clinical/patients`) | parcial | Stepper e sinais clínicos mais ricos | M |
| 26 | Config Clínica | `/settings/profile` | completa | `SettingsShell` + cards de configuração clínica | sim (`settings.mock`) | sim (`settings`) | sim | Config clínica harmonizada com dados públicos/fiscais/branding/timezone/preview | A |
| 27 | Editor Documento | `/settings/documents/editor` | sim | editor page (toolbox/canvas/propriedades) | sim (estado UI-only local) | sim (`documents`) | sim | Expandir interações drag/drop no canvas | A |
| 28 | D4Sign Settings | `/settings/signature` | sim | d4sign settings page (cards/checklist/banner) | sim (status simulado) | sim (`integrations/documents`) | sim | Conectar adapters futuros sem provider real | A |
| 29 | Billing SaaS | `/settings/billing` | parcial | billing settings page | sim (`finance`) | sim (`finance`) | parcial | Completar plan/usage/invoice states | M |
| 30 | Analytics | `/reports/executive` | completa | executive analytics page + alerts table | sim (`reports`) | sim (`reports`) | sim (ReportStateSection + default completo) | Consolidado no hub executivo com alertas estratégicos | A |
| 31 | Financeiro | `/finance` | sim | finance dashboard page | sim (`finance`) | sim (`finance`) | parcial | Expandir estados em toda a página | M |
| 32 | Contas Receber | `/finance/receivables` | sim | receivables page | sim (`finance`) | sim (`finance`) | sim (via `UiStateView`) | Aprofundar ações de cobrança | B |
| 33 | Pagamento Modal | `/finance` + `/finance/receivables` | sim | `PaymentRegistrationModal` reutilizável + `ConfirmDialog` | sim (`finance`) | sim (`finance`) | sim (validação visual + confirmação) | Concluído em UI-only com auditoria simulada | A |
| 34 | Caixa | `/finance/cash-register` | parcial | cash register page | sim (`finance`) | sim (`finance`) | parcial | Falta bloco LEEF + fechamento detalhado | M |
| 35 | Repasses | `/finance/payouts` | parcial | payouts page | sim (`finance`) | sim (`finance`) | parcial | Completar resumo por profissional | M |
| 36 | Inadimplência | `/finance/overdue` | parcial | overdue page | sim (`finance`) | sim (`finance`) | parcial | Regras/timeline de cobrança | M |
| 37 | Serviços | `/services` | parcial | services page | sim (`packages/finance`) | sim (`packages/finance`) | parcial | Integration toggles e detalhes de serviço | M |
| 38 | Pacotes | `/packages` | parcial | packages list page | sim (`packages`) | sim (`packages`) | parcial | Grid/tabs com indicadores completos | M |
| 39 | Criar Pacote | `/packages/new` | parcial | package form page | sim (`packages`) | sim (`packages`) | parcial | Completar toggles de acesso/margem | M |
| 40 | Vender Pacote | `/packages/sell` | completa | fluxo de venda com stepper + resumo lateral | sim (`package-sale`) | sim (`package-sale`) | sim | Concluída com pagamento/contrato/assinatura/cobranças simuladas | A |
| 41 | Contrato Pacote | `/contracts/[contractId]` | parcial | contract view page | sim (`packages/documents`) | sim (`packages/documents`) | parcial | Preview/checklist/ações de contrato | M |
| 42 | Estoque Dashboard | `/inventory` | sim | inventory dashboard page | sim (`inventory`) | sim (`inventory`) | parcial (via state blocks) | Expandir card crítico e tendências | M |
| 43 | Itens Estoque | `/inventory/items` | sim | inventory items page | sim (`inventory`) | sim (`inventory`) | parcial (state block) | Bulk actions e filtros avançados | M |
| 44 | Detalhe Item | `/inventory/items/[itemId]` | sim | item detail page | sim (`inventory`) | sim (`inventory`) | parcial | Completar lotes e ações operacionais | M |
| 45 | Entrada Estoque | modal em `/inventory/items` e `/inventory/items/[itemId]` | completa | `StockEntryModal` + `ConfirmDialog` | sim (`inventory`) | sim (`inventory`) | sim | Concluída com campos completos, toggle de novo lote, upload visual de nota e aviso de auditoria | A |
| 46 | Saída Estoque | modal em `/inventory/items` e `/inventory/items/[itemId]` | completa | `StockOutputModal` + `ConfirmDialog` | sim (`inventory`) | sim (`inventory`) | sim | Concluída com motivos padronizados, vínculo opcional com atendimento/paciente e bloqueio visual por saldo | A |
| 47 | Compras | `/purchases` | parcial | purchases page | sim (`inventory`) | sim (`inventory`) | parcial | Tabs/painel fornecedor mais completos | M |
| 48 | Relatórios Financeiros | `/reports/finance` | completa | report page + toolbar + tabela por unidade | sim (`reports`) | sim (`reports`) | sim (LEEF + permissão financeira visual) | Concluída com visão por unidade e exportação visual desabilitada | A |
| 49 | Relatórios Pacotes | `/reports/packages` | completa | report page + funil + performance | sim (`reports/packages`) | sim (`reports/packages`) | sim (ReportStateSection + default completo) | Funil e performance de pacotes refinados | A |
| 50 | Relatórios Estoque | `/reports/inventory` | completa | report page + KPIs de consumo + críticos | sim (`reports/inventory`) | sim (`reports/inventory`) | sim (ReportStateSection + default completo) | KPIs de consumo e cobertura finalizados | A |
| 51 | Visão Executiva | `/reports/executive` | completa | analytics executivo + tabela de alertas | sim (`reports`) | sim (`reports`) | sim (ReportStateSection + default completo) | Alertas estratégicos consolidados | A |
| 52 | Relatório Paciente | `/patients/[patientId]/report` | completa | header + tabs + KPIs + tabelas + alertas | sim (`patient-report`) | sim (`patient-report`) | sim | Concluída com visão financeira, serviços, documentos e adesão | A |

## Totais
- ✅ **completas**: 28
- 🟡 **parciais aceitáveis**: 24
- 🔴 **planejadas**: 0

## Pendências reais de maior impacto (freeze UI-only)
1. Explicitar estados LEEF completos em **Chat Mobile** (`#20`).
2. Harmonizar estados globais da home em **App Paciente** (`#21`).
3. Evoluir fluxos de modal mobile (**Água/Refeição/Treino/Check-in**) com variações de validação e feedback (`#22/#23/#24/#25`).
4. Consolidar estados de plano/uso/faturas em **Billing SaaS** (`#29`).
5. Expandir estados em **Financeiro clínico** (`#31`).
6. Completar bloco LEEF e fechamento detalhado em **Caixa** (`#34`).
7. Completar resumo operacional em **Repasses** (`#35`).
8. Estruturar regras/timeline de cobrança em **Inadimplência** (`#36`).
9. Completar indicadores e toggles em **Serviços/Pacotes/Criar Pacote/Contrato** (`#37/#38/#39/#41`).
10. Aprofundar operações de **Estoque/Compras** (bulk actions, filtros avançados, lotes e fornecedor) (`#42/#43/#44/#47`).

> Nota de reconciliação: pendências antes atribuídas a Notificações, Chat Equipe, Editor Documental, D4Sign Settings, Pagamento Modal, modais de estoque e Relatório Paciente foram removidas por estarem concluídas na auditoria atual de 2026-05-02.

## Parciais aceitáveis (freeze aprovado)
As 24 telas classificadas como **parcial aceitável** permanecem dentro do critério de freeze UI-only: navegação funcional, coerência de UX e mocks tipados.

### Lista das 24 parciais aceitáveis
`#1 #2 #3 #5 #7 #20 #21 #22 #23 #24 #25 #29 #31 #34 #35 #36 #37 #38 #39 #41 #42 #43 #44 #47`

## Melhorias futuras (pós-freeze)
- Refinar componentização interna em páginas já funcionais para reduzir lógica inline.
- Evoluir microinterações (drag/drop avançado, confirmações e feedback contextual).
- Ampliar cobertura visual de estados para cenários técnicos secundários.
- Tratar as 24 telas parciais como backlog incremental (sem reclassificar freeze aprovado).

## Próxima task recomendada
Executar uma sprint de **refinamento pós-freeze** focada nos parciais aceitáveis de prioridade M para elevar cobertura LEEF e detalhamento operacional sem alterar o escopo UI-only.
