# UI Blueprint Index — EmagrecePlus

## 1) Arquivos encontrados no blueprint

Fonte analisada em `docs/`:

- `docs/00-product-map.md` — mapa do produto e lista oficial das 52 telas.
- `docs/01-design-system.md` — tokens visuais, padrões de UI, copy e acessibilidade.
- `docs/02-component-architecture.md` — arquitetura por camadas e catálogo de componentes base/domínio.
- `docs/03-data-architecture-supabase.md` — referência de dados futura (runtime final), útil para modelar mocks e adapters.
- `docs/04-integrations-d4sign-asaas.md` — integração planejada (D4Sign/Asaas), modos e critérios de verificação.
- `docs/05-development-plan.md` — fases e sequência macro de implementação.
- `docs/06-implementation-prompts.md` — prompts operacionais por fase/módulo.
- `docs/07-screen-to-component-map.md` — mapeamento tela → componentes sugeridos.

Arquivos complementares lidos para contexto de implementação:

- `AGENTS.md`
- `README.md`
- `package.json`
- `src/app/*`
- `src/components/**/*`

---

## 2) Tokens visuais

Tokens base recomendados:

- `Primary 500`: `#0EA37A`
- `Primary 50`: `#EEFDF8`
- `Foreground`: `#0F172A`
- `Muted`: `#64748B`
- `Border`: `#E2E8F0`
- `Background`: `#F8FAFC`
- `Card`: `#FFFFFF`
- `Danger`: `#EF4444`
- `Warning`: `#F59E0B`
- `Info`: `#3B82F6`

Diretrizes de estilo:

- Estética SaaS clínico premium (moderna, minimalista, muito espaço em branco).
- Paleta dominante branco + emerald/teal + graphite.
- Cards com `rounded-2xl` e sombra suave.
- Contraste AA, foco visível, labels textuais e semântica de tabela/modal.

Estados obrigatórios por tela/fluxo:

- `loading`
- `empty`
- `error`
- `forbidden`
- `unconfigured`/`simulated` (quando integração externa ainda não configurada)
- `provider_error` (quando aplicável)

---

## 3) Componentes sugeridos

### 3.1 Base (reutilizáveis)

- `Button`
- `Card` (+ subcomponentes)
- `Badge`
- `Input`
- `SelectField`
- `StatCard`
- `FilterBar`
- `DataTable`
- `Modal`
- `ProgressRing`
- `Timeline`
- `EmptyState`
- `PageHeader`

### 3.2 Layout/Shell

- `DashboardShell`
- `SettingsShell`
- `MobileAppShell`
- Sidebar (desktop)
- Topbar (desktop)
- Bottom sheet (mobile)

### 3.3 Domínio (catálogo inicial)

- CRM: `LeadKanban`, `LeadCard`, `LeadTimeline`, `LeadQuickActions`
- Pacientes: `PatientHeader`, `PatientTimeline`, `PatientHealthSummary`
- Agenda/Atendimento: `ScheduleCalendar`, `QueueBoard`, `EncounterShell`, `SoapEditor`, `AnamnesisStepper`
- Documentos: `DocumentCenterTable`, `DocumentDetailTabs`, `EvidenceDossierCards`
- Financeiro: `FinanceKpiGrid`, `ReceivablesTable`, `PaymentModal`, `CashRegisterPanel`
- Serviços/Pacotes: `ServiceCatalogTable`, `PackageBuilder`, `PackageSaleStepper`, `PackageContractPreview`
- Estoque: `InventoryKpiGrid`, `InventoryItemTable`, `StockEntryModal`, `StockOutputModal`, `PurchaseOrderTable`
- Relatórios: `ReportFilterBar`, `ChartCard`, `ExecutiveKpiGrid`, `StrategicAlertsTable`

---

## 4) Layouts sugeridos

### Desktop administrativo

- `DashboardShell` com Sidebar fixa + Topbar + conteúdo principal por grid responsivo.
- Padrão de página:
  1. `PageHeader`
  2. `FilterBar`
  3. `KPI grid` (`StatCard`)
  4. área principal com gráficos/tabelas/cards
  5. ações críticas com `Modal` e auditoria contextual

### Configurações

- `SettingsShell` com navegação lateral de seções e formulário/preview no conteúdo.

### Mobile paciente

- `MobileAppShell` com header curto, cards compactos e CTAs tácteis.
- Bottom sheets para água/refeição/treino com CTA full-width.

---

## 5) Lista das 52 telas

1. Login
2. Seleção de ambiente/unidade
3. Dashboard da clínica
4. CRM Kanban
5. Detalhe do lead
6. Lista de pacientes
7. Paciente 360
8. Agenda
9. Fila de atendimento
10. Atendimento/SOAP
11. Anamnese inicial
12. Plano alimentar
13. Prescrições
14. Centro documental
15. Detalhe do documento
16. Dossiê de evidência
17. Saúde operacional documental
18. Notificações
19. Chat equipe
20. Chat paciente mobile
21. App paciente dashboard
22. Modal água
23. Modal refeição
24. Modal treino
25. Check-in semanal
26. Configurações da clínica
27. Editor de modelo de documento
28. D4Sign settings
29. Billing SaaS
30. Analytics executivo
31. Financeiro da clínica
32. Contas a receber
33. Modal registrar pagamento
34. Caixa da unidade
35. Repasses de profissionais
36. Inadimplência
37. Catálogo de serviços
38. Planos e pacotes
39. Criar pacote
40. Vender pacote
41. Contrato do pacote
42. Estoque dashboard
43. Itens do estoque
44. Detalhe do item
45. Registrar entrada de estoque
46. Registrar saída de estoque
47. Compras e fornecedores
48. Relatórios financeiros
49. Relatórios de planos e pacotes
50. Relatórios de estoque
51. Visão executiva
52. Relatório do paciente

---

## 6) Agrupamento por módulo

- **Autenticação e base**: 1–3
- **CRM e pacientes**: 4–7
- **Agenda e atendimento**: 8–13
- **Documentos e compliance**: 14–17
- **Comunicação e paciente**: 18–25
- **Configurações e assinatura**: 26–28
- **Billing e analytics conceituais**: 29–30
- **Financeiro clínico**: 31–36
- **Serviços e pacotes**: 37–41
- **Estoque e compras**: 42–47
- **Relatórios**: 48–52

---

## 7) Ordem recomendada de implementação

### Macro (por fases)

1. **Fundação UI**: Design system + shells + componentes base
2. **Entrada do sistema**: Login + seleção de unidade
3. **Visão inicial**: Dashboard
4. **Comercial e prontuário inicial**: CRM + Pacientes + Paciente 360
5. **Operação clínica**: Agenda + Fila + Atendimento/SOAP + Anamnese
6. **Nutrição clínica**: Plano alimentar + Prescrições
7. **Documentos**: centro/detalhe/dossiê/health + settings D4Sign (simulado)
8. **Financeiro e comercialização**: financeiro + serviços + pacotes + contrato + cobrança
9. **Estoque**: dashboard/itens/detalhe/movimentações/compras
10. **Comunicação**: notificações + chats + app paciente + modais + check-in
11. **Relatórios**: 48–52
12. **Readiness de integrações reais** (sem ativar produção nesta fase)

### Dependências críticas

- `DashboardShell`, `PageHeader`, `FilterBar`, `StatCard`, `DataTable`, `Modal` devem ser estabilizados antes dos módulos densos.
- Estados `loading/empty/error/forbidden` devem existir como variações de componentes antes de escalar rotas.

---

## 8) Quais telas devem usar mocks

**Conclusão:** nesta fase, **todas as 52 telas** devem operar com mocks tipados.

Priorização de mocks por domínio:

- **Imediato (primeiras entregas):** 1–13
- **Com integração planejada/simulada:**
  - Documentos/D4Sign: 14–17, 27, 28
  - Financeiro/Asaas: 31–36, 40, 41, 48
- **Operacional com alto volume de dados simulados:** 37–47, 49–52
- **Mobile paciente com jornadas curtas:** 20–25

Requisitos de mock obrigatórios por tela:

- cenário normal (happy path)
- `loading`
- `empty`
- `error`
- `forbidden`

---

## 9) Quais futuras integrações serão necessárias

### Integrações planejadas no blueprint

1. **D4Sign (assinatura digital)**
   - Uso principal: telas 14–17, 27, 28, 41
   - Modos: `unconfigured`, `simulated`, `real`
   - Critérios de verificação para `verified` já definidos no blueprint

2. **Asaas (cobrança/pagamentos)**
   - Uso principal: telas 31–36, 40, 48
   - Modos: sandbox/produção no futuro, sem chamadas reais nesta fase
   - Eventos planejados: cobrança criada, pagamento confirmado, vencido, estornado/cancelado

3. **Supabase (runtime final de dados e auth)**
   - Não integrar agora; usar como referência arquitetural para schemas/RPCs/adapters
   - Impacta praticamente todos os módulos no roadmap de transição mock → provider real

### Estratégia de transição recomendada

- Criar interfaces/adapters por domínio (`crm`, `patients`, `clinical`, `docs`, `finance`, `catalog`, `inventory`, `reports`).
- Implementar provider `mock` primeiro e manter `real` como stub tipado.
- Preservar contratos de dados estáveis para trocar backend sem refatoração ampla de componentes.
