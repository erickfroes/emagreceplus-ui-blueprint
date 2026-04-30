# Arquitetura de Componentes

## Camadas

```txt
src/components/ui        -> componentes atômicos reutilizáveis
src/components/layout    -> shells e navegação
src/modules/<dominio>    -> componentes de domínio
src/app/(dashboard)      -> rotas Next.js de dashboard
src/app/app              -> app do paciente/mobile
src/server/integrations  -> adapters server-side
```

## Componentes base

- `Button`
- `Card`, `CardHeader`, `CardTitle`, `CardContent`
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
- `DashboardShell`
- `SettingsShell`
- `MobileAppShell`

## Componentes de domínio sugeridos

### CRM
- `LeadKanban`
- `LeadCard`
- `LeadTimeline`
- `LeadQuickActions`
- `PackageOfferSelector`

### Pacientes
- `PatientHeader`
- `PatientTimeline`
- `PatientHealthSummary`
- `PatientAlertCard`
- `PatientQuickActions`

### Agenda/Atendimento
- `ScheduleCalendar`
- `QueueBoard`
- `EncounterShell`
- `SoapEditor`
- `AnamnesisStepper`

### Documentos
- `DocumentCenterTable`
- `DocumentDetailTabs`
- `EvidenceDossierCards`
- `DocumentAuditTimeline`
- `DocumentHealthDashboard`

### Financeiro
- `FinanceKpiGrid`
- `ReceivablesTable`
- `PaymentModal`
- `CashRegisterPanel`
- `ProfessionalPayoutTable`
- `DebtCollectionTimeline`

### Serviços/Pacotes
- `ServiceCatalogTable`
- `ServiceDetailPanel`
- `PackageCard`
- `PackageBuilder`
- `PackageSaleStepper`
- `PackageContractPreview`

### Estoque
- `InventoryKpiGrid`
- `InventoryItemTable`
- `StockEntryModal`
- `StockOutputModal`
- `PurchaseOrderTable`
- `SupplierPanel`

### Relatórios
- `ReportFilterBar`
- `ChartCard`
- `ExecutiveKpiGrid`
- `StrategicAlertsTable`

## Padrão de composição de página

```tsx
<DashboardShell active="Financeiro">
  <PageHeader title="Financeiro da Clínica" actions={<Button>Exportar</Button>} />
  <FilterBar>...</FilterBar>
  <KpiGrid>...</KpiGrid>
  <MainGrid>
    <ChartCard />
    <DataTable />
  </MainGrid>
</DashboardShell>
```

## Padrão para integração externa pendente

Sempre mostrar estados claros:

- `unconfigured`: provider selecionado, credenciais ausentes.
- `simulated`: ambiente de teste sem efeito real.
- `real`: provider real configurado.
- `provider_error`: erro externo.
- `verification_pending`: validação ainda não conclusiva.
- `verified`: apenas após validação oficial e persistência de evidência.
