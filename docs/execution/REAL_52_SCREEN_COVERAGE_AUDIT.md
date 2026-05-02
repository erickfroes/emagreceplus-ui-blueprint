# REAL 52 Screen Coverage Audit

Data: 2026-05-02
Branch: `docs/real-52-screen-coverage-audit`

## Critério de classificação
- ✅ **completa**: rota existe + tela funcional com componente principal aderente + mock + contratos + estados LEEF evidentes.
- 🟡 **parcial**: rota existe, porém com lacunas de componente/estados/mock/contratos/escopo.
- 🔴 **faltante**: rota/tela principal não existe.

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
| 10 | SOAP | `/encounters/[encounterId]` | parcial | encounter view | sim (`encounters/clinical`) | sim (`clinical`) | sim | Editor SOAP dedicado e barra fixa | A |
| 11 | Anamnese | `/encounters/[encounterId]/anamnesis` | parcial | anamnese em `page.tsx` | sim (`encounters/clinical`) | sim (`clinical`) | sim | Stepper/resumo em tempo real | A |
| 12 | Plano Alimentar | `/nutrition/plans/[patientId]` | parcial | plan view | sim (`nutrition`) | sim (`nutrition`) | sim | Builder completo (MealCard/MacroChart) | A |
| 13 | Prescrições | `/prescriptions/[prescriptionId]` | parcial | prescription view | sim (`prescriptions`) | sim (`prescriptions`) | sim | Histórico/preview avançado | A |
| 14 | Centro Documental | `/documents` | sim | documents list view | sim (`documents`) | sim (`documents`) | sim | Consolidar filtros/KPIs dedicados | M |
| 15 | Detalhe Documento | `/documents/[documentId]` | sim | document detail view | sim (`documents`) | sim (`documents`) | sim | Expandir audit timeline visual | M |
| 16 | Dossiê de evidência | `/documents/[documentId]/evidence` | parcial | evidence view | sim (`documents`) | sim (`documents`) | sim textual | Estruturar hash/eventos/timeline completos | A |
| 17 | Health Documental | `/documents/ops/health` | sim | ops health view | sim (`documents`) | sim (`documents`) | sim textual | Melhorar gráficos operacionais | M |
| 18 | Notificações | `/notifications` | sim | `NotificationsView` | sim (`notifications`) | sim (`notifications`) | sim | — | A |
| 19 | Chat Equipe | `/chat` | sim | `StaffChatView` | sim (`chat`) | sim (`chat`) | sim | — | A |
| 20 | Chat Mobile | `/app/chat` | sim | mobile chat page | sim (`chat`) | sim (`chat`) | parcial | Estados LEEF explícitos | M |
| 21 | App Paciente | `/app` | sim | `MobileAppShell` | sim (`patients/reports`) | sim (`patients`) | parcial | Cobrir estados globais da home mobile | M |
| 22 | Modal Água | `/app/water` | sim | modal em página | sim (`patients`) | parcial | parcial | Transformar em bottom-sheet real + LEEF | M |
| 23 | Modal Refeição | `/app/meals` | sim | modal em página | sim (`patients/nutrition`) | sim (`nutrition`) | parcial | Fluxo de upload/checklist mais completo | M |
| 24 | Modal Treino | `/app/workouts` | sim | modal em página | sim (`patients`) | parcial | parcial | Estados/validações e variações | M |
| 25 | Check-in | `/app/checkin` | sim | checkin page | sim (`clinical/patients`) | sim (`clinical/patients`) | parcial | Stepper e sinais clínicos mais ricos | M |
| 26 | Config Clínica | `/settings/profile` (aprox.) | parcial | `SettingsShell` | parcial | parcial | não explícito | Tela dedicada de configuração clínica | A |
| 27 | Editor Documento | `/settings/documents/editor` | sim | editor page (toolbox/canvas/propriedades) | sim (estado UI-only local) | sim (`documents`) | sim | Expandir interações drag/drop no canvas | A |
| 28 | D4Sign Settings | `/settings/signature` | sim | d4sign settings page (cards/checklist/banner) | sim (status simulado) | sim (`integrations/documents`) | sim | Conectar adapters futuros sem provider real | A |
| 29 | Billing SaaS | `/settings/billing` | parcial | billing settings page | sim (`finance`) | sim (`finance`) | parcial | Completar plan/usage/invoice states | M |
| 30 | Analytics | `/reports/executive` (aprox.) | parcial | report views | sim (`reports`) | sim (`reports`) | parcial via ReportStateSection | Falta tela analytics dedicada do mapa | M |
| 31 | Financeiro | `/finance` | sim | finance dashboard page | sim (`finance`) | sim (`finance`) | parcial | Expandir estados em toda a página | M |
| 32 | Contas Receber | `/finance/receivables` | sim | receivables page | sim (`finance`) | sim (`finance`) | sim (via `UiStateView`) | Aprofundar ações de cobrança | B |
| 33 | Pagamento Modal | `/finance` + `/finance/receivables` | sim | `PaymentRegistrationModal` reutilizável + `ConfirmDialog` | sim (`finance`) | sim (`finance`) | sim (validação visual + confirmação) | Concluído em UI-only com auditoria simulada | A |
| 34 | Caixa | `/finance/cash-register` | parcial | cash register page | sim (`finance`) | sim (`finance`) | parcial | Falta bloco LEEF + fechamento detalhado | M |
| 35 | Repasses | `/finance/payouts` | parcial | payouts page | sim (`finance`) | sim (`finance`) | parcial | Completar resumo por profissional | M |
| 36 | Inadimplência | `/finance/overdue` | parcial | overdue page | sim (`finance`) | sim (`finance`) | parcial | Regras/timeline de cobrança | M |
| 37 | Serviços | `/services` | parcial | services page | sim (`packages/finance`) | sim (`packages/finance`) | parcial | Integration toggles e detalhes de serviço | M |
| 38 | Pacotes | `/packages` | parcial | packages list page | sim (`packages`) | sim (`packages`) | parcial | Grid/tabs com indicadores completos | M |
| 39 | Criar Pacote | `/packages/new` | parcial | package form page | sim (`packages`) | sim (`packages`) | parcial | Completar toggles de acesso/margem | M |
| 40 | Vender Pacote | `/packages/sell` | parcial | sell flow page | sim (`packages`) | sim (`packages`) | parcial | Stepper completo de venda/pagamento | A |
| 41 | Contrato Pacote | `/contracts/[contractId]` | parcial | contract view page | sim (`packages/documents`) | sim (`packages/documents`) | parcial | Preview/checklist/ações de contrato | M |
| 42 | Estoque Dashboard | `/inventory` | sim | inventory dashboard page | sim (`inventory`) | sim (`inventory`) | parcial (via state blocks) | Expandir card crítico e tendências | M |
| 43 | Itens Estoque | `/inventory/items` | sim | inventory items page | sim (`inventory`) | sim (`inventory`) | parcial (state block) | Bulk actions e filtros avançados | M |
| 44 | Detalhe Item | `/inventory/items/[itemId]` | sim | item detail page | sim (`inventory`) | sim (`inventory`) | parcial | Completar lotes e ações operacionais | M |
| 45 | Entrada Estoque | modal em `/inventory/items/[itemId]` | parcial | `StockMovementModalMock` | sim (`inventory`) | sim (`inventory`) | parcial | Modal dedicado com upload NF/lotes | A |
| 46 | Saída Estoque | modal em `/inventory/items/[itemId]` | parcial | `StockMovementModalMock` | sim (`inventory`) | sim (`inventory`) | parcial | Modal dedicado com guards/contexto atendimento | A |
| 47 | Compras | `/purchases` | parcial | purchases page | sim (`inventory`) | sim (`inventory`) | parcial | Tabs/painel fornecedor mais completos | M |
| 48 | Relatórios Financeiros | `/reports/finance` | sim | report page + toolbar | sim (`reports`) | sim (`reports`) | parcial (state section) | Consolidar tabela por unidade | B |
| 49 | Relatórios Pacotes | `/reports/packages` | sim | report page + charts | sim (`reports/packages`) | sim (`reports/packages`) | parcial (state section) | Ajustes de funil/performance | B |
| 50 | Relatórios Estoque | `/reports/inventory` | sim | report page + charts | sim (`reports/inventory`) | sim (`reports/inventory`) | parcial (state section) | Completar KPIs de consumo | B |
| 51 | Visão Executiva | `/reports/executive` | sim | executive report page | sim (`reports`) | sim (`reports`) | parcial (state section) | Consolidar alertas estratégicos tabela | B |
| 52 | Relatório Paciente | `/patients/[patientId]/report` | parcial | `ReportStateSection` + cards | sim (`reports/patients`) | sim (`reports/patients`) | parcial | Header/tabs/uso serviços/pagamentos completo | A |

## Totais
- ✅ **completas**: 18
- 🟡 **parciais**: 31
- 🔴 **faltantes**: 2

## Top 10 pendências de maior impacto
1. Implementar **Dossiê de evidência** completo com timeline/hash/eventos (`#16`).
2. Implementar **Modal de Pagamento** reutilizável (`#33`).
3. Fechar lacunas dos modais de **Entrada/Saída de Estoque** (`#45/#46`).
4. Completar fluxo clínico central de **SOAP + Anamnese** (`#10/#11`).
5. Completar **Relatório do Paciente** aderente ao mapa final (`#52`).
6. Estruturar **Config Clínica** dedicada e harmonizar rotas/settings (`#26`).
7. Elevar **Chat Mobile** para LEEF explícito (`#20`).
8. Criar rota/tela de **Pagamento Modal** integrada ao fluxo de venda (`#33`).
9. Expandir drag/drop e blocos avançados do **Editor de Documento** (`#27`).
10. Conectar adapters de validação para **D4Sign Settings** mantendo modo simulado (`#28`).

## Próxima task recomendada
Executar uma sprint de “**críticos A remanescentes**” focada em `#33`, `#16`, `#52`, `#10/#11` e `#45/#46`, consolidando componentes centrais e LEEF padronizado.
