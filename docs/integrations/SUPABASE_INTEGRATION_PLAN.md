# Plano de Integração Futura — Supabase

> Escopo: documento de planejamento para evolução do **UI-only** para arquitetura com Supabase. Sem implementação de backend nesta fase.

## 1) Objetivo

Definir um blueprint técnico para conectar as telas do EmagrecePlus a Supabase com segurança, isolamento por tenant e previsibilidade de evolução.

## 2) Rotas (App Router) e padrão de integração

### Rotas de aplicação (front-end)

- Manter App Router por domínio (`/patients`, `/agenda`, `/finance`, `/documents`, etc.).
- Cada rota principal deve prever estados: `loading`, `empty`, `error`, `forbidden`.
- Cada rota passará a consumir um **adapter de dados** (ex.: `src/adapters/patientsAdapter.ts`) com duas implementações futuras:
  - `mock provider` (atual)
  - `supabase provider` (futuro)

### Rotas server-side internas (BFF opcional)

- Caso necessário para dados sensíveis, usar Route Handlers do Next.js (`app/**/route.ts`) como broker:
  - assinam URLs temporárias de Storage
  - chamam RPCs privilegiadas
  - evitam exposição de credenciais no browser
- Não criar `/api` externo para terceiros nesta etapa de UI-only; apenas planejamento.

## 3) Tabelas futuras (planejamento)

## Schemas sugeridos

- `platform`: tenants, memberships, perfis, permissões
- `patients`: cadastro e perfil longitudinal
- `clinical`: evolução clínica, SOAP, planos
- `scheduling`: agenda, slots, atendimentos
- `docs`: documentos e assinaturas
- `finance`: cobranças, pagamentos, repasses
- `communication`: chat e anexos
- `audit`: trilha de auditoria
- `private`: funções auxiliares internas
- `api`: superfície de RPC pública controlada

### Núcleo mínimo inicial

- `platform.tenants`
- `platform.users`
- `platform.memberships`
- `patients.patients`
- `scheduling.appointments`
- `clinical.encounters`
- `docs.patient_documents`
- `finance.charges`
- `finance.payments`
- `audit.events`

## 4) RPCs futuras

Criar RPCs versionadas no schema `api`, priorizando escrita transacional:

- `api.create_patient`
- `api.update_patient_profile`
- `api.create_appointment`
- `api.complete_encounter`
- `api.create_charge`
- `api.register_payment`
- `api.request_document_signature`
- `api.list_patient_timeline`

Diretrizes:

- `SECURITY DEFINER` apenas quando estritamente necessário.
- `search_path=''` em funções privilegiadas.
- Preferir funções pequenas e compostas por domínio.

## 5) Edge Functions futuras

Uso recomendado para casos de integração e processos assíncronos:

- `sync-signature-status` (orquestrar status de assinatura)
- `process-payment-webhook` (normalização de eventos financeiros)
- `generate-legal-evidence-package` (pacote de evidências)
- `notify-domain-events` (fan-out de notificações internas)

Diretrizes:

- Idempotência por `event_id`.
- Retry com backoff.
- Logs estruturados + correlação por `tenant_id`.

## 6) Webhooks (entrada de eventos)

- Endpoint receptor por Edge Function ou broker server-side.
- Tabela de eventos brutos por provedor (ex.: `finance.asaas_webhook_events`, `docs.signature_events_raw`).
- Pipeline:
  1. validar assinatura do webhook
  2. persistir payload bruto
  3. deduplicar por `external_event_id`
  4. transformar para evento canônico interno
  5. atualizar projeções de leitura

## 7) Segurança

- Autenticação via Supabase Auth (futuro), com associação a `platform.memberships`.
- Autorização orientada a permissões por papel (RBAC por tenant/unidade).
- Nunca expor `service_role` no front-end.
- Operações críticas apenas via RPC/Edge Function.
- Auditoria obrigatória para eventos sensíveis (documentos, financeiro, prontuário).

## 8) RLS (Row Level Security)

Princípios:

- Toda tabela de negócio com `tenant_id`.
- Sempre habilitar RLS em tabelas de domínio.
- Políticas baseadas em helpers internos (`private.current_tenant_id()`, `private.has_permission(...)`).
- Leituras/escritas condicionadas a vínculo ativo em `platform.memberships`.

## 9) Storage privado

Buckets privados planejados:

- `patient-documents`
- `chat-attachments`
- `financial-receipts`
- `legal-evidence`

Padrão de path:

```txt
tenants/{tenantId}/units/{unitId}/patients/{patientId}/documents/{documentId}/{fileName}
```

Regras:

- acesso somente por signed URL temporária
- URL assinada com TTL curto
- sem exposição de paths internos em payload público

## 10) Variáveis de ambiente (futuras)

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (somente backend seguro)
- `SUPABASE_JWT_SECRET` (quando aplicável)
- `APP_ENV`
- `APP_REGION`

Boas práticas:

- separar variáveis por ambiente (`dev`, `staging`, `prod`)
- rotação periódica de chaves
- validação em bootstrap de runtime

## 11) Ordem de implementação sugerida

1. Modelagem de schemas + migrations iniciais.
2. Auth + memberships + helpers de autorização.
3. RLS base em tabelas críticas.
4. RPCs do núcleo clínico/agenda/pacientes.
5. Storage privado com broker e signed URLs.
6. Webhooks + Edge Functions com idempotência.
7. Observabilidade, auditoria e hardening.
8. Troca gradual dos adapters mock -> supabase provider por domínio.

## 12) Critérios de pronto por etapa

- Zero uso de credencial privilegiada no browser.
- RLS ativa em 100% das tabelas de negócio publicadas.
- Toda integração externa com trilha de auditoria.
- Fluxos de UI mantendo estados `loading`, `empty`, `error`, `forbidden`.
