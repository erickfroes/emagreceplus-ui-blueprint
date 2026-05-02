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

## Padrão adotado por domínio

Cada domínio define:
1. **Tipos principais** (entidades do domínio).
2. **Enums de status** (como unions de string).
3. **DTOs de listagem e detalhe**.
4. **Tipos de actions e modals**.
5. **UiState** aplicado em DTOs de listagem.
6. **Sem uso de `any`**.

## Estados de UI

Todos os DTOs de listagem usam `UiState` de `src/contracts/common.ts`, suportando:
- `default`
- `loading`
- `empty`
- `error`
- `forbidden`

## Export central

Todos os contratos são exportados em `src/contracts/index.ts` para consumo unificado.
