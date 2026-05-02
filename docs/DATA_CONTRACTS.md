# Data Contracts (UI-only)

Contratos TypeScript dos domínios principais para sustentar as 52 telas com mocks tipados.

## Domínios cobertos

- `finance.ts`
- `packages.ts`
- `inventory.ts`
- `reports.ts`
- `documents.ts`
- `scheduling.ts`
- `clinical.ts`
- `nutrition.ts`
- `prescriptions.ts`
- `notifications.ts`
- `chat.ts`
- `tenant.ts`
- `crm.ts`
- `patients.ts`

## Estrutura padrão por domínio

Cada domínio passou a expor um contrato consistente com:
1. **Tipos principais** das entidades.
2. **Enums de status** (string unions).
3. **DTOs de listagem e detalhe**.
4. **Tipos de actions/modals** para fluxos de UI.
5. **UiState** aplicado em listagem e, quando relevante, **estado de tela** (`*UiState`).
6. **Sem `any`**.

## Estados de UI

Todos os DTOs de listagem usam `UiState` de `src/contracts/common.ts`:
- `default`
- `loading`
- `empty`
- `error`
- `forbidden`

## Observações de integração

- Contratos seguem o escopo **UI-only**, sem backend real.
- Providers externos permanecem simulados/não configurados (ex.: assinatura digital).
- Export central mantido em `src/contracts/index.ts`.
