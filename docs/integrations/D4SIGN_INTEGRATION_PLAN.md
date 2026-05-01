# Plano de Integração Futura — D4Sign

> Escopo: provedor de assinatura eletrônica como integração **planejada**. Nesta fase, status deve permanecer `não configurado`/`simulado`.

## 1) Objetivo

Definir como o módulo de documentos do EmagrecePlus evoluirá para suportar assinatura eletrônica com D4Sign sem acoplamento direto da UI ao provedor.

## 2) Rotas impactadas

- `/documents`
- `/documents/templates`
- `/patients/[id]/documents`
- `/patients/[id]/timeline`

Comportamento planejado:

- UI chama adapters de domínio (`documentsAdapter`).
- Adapter futuro delega para backend seguro (RPC/Edge Function), nunca diretamente para D4Sign no browser.
- Estados de integração na UI:
  - `não configurado`
  - `simulado`
  - `ativo`

## 3) Tabelas futuras

Schema `docs`:

- `docs.signature_providers` (configuração por tenant/unidade)
- `docs.signature_requests`
- `docs.signature_signers`
- `docs.signature_events`
- `docs.signature_artifacts`
- `docs.document_legal_evidence`

Campos-chave:

- `tenant_id`, `unit_id`
- `provider` (`d4sign`)
- `provider_envelope_id`
- `status` (draft/sent/viewed/signed/expired/cancelled)
- `external_payload` (jsonb)

## 4) RPCs futuras

- `api.create_signature_request`
- `api.add_signature_signer`
- `api.send_signature_request`
- `api.cancel_signature_request`
- `api.refresh_signature_status`
- `api.get_signature_timeline`

Regras:

- escrita concentrada em RPCs transacionais
- validação de permissões por papel clínico/administrativo
- vedar prescrição médica em fluxos de papel nutricionista

## 5) Edge Functions futuras

- `d4sign-dispatch-envelope`
- `d4sign-sync-envelope-status`
- `d4sign-webhook-ingest`
- `d4sign-generate-evidence-package`

Responsabilidades:

- mapear payload D4Sign -> modelo canônico interno
- idempotência por `provider_event_id`
- retries e DLQ lógica (tabela de falhas)

## 6) Webhooks

Fluxo recomendado:

1. validar assinatura/HMAC do provedor
2. persistir evento bruto (`docs.signature_events_raw`)
3. deduplicar
4. atualizar `docs.signature_requests` e `docs.signature_events`
5. emitir evento interno para timeline do paciente

## 7) Segurança

- credenciais D4Sign em secret manager (nunca no client)
- criptografia em repouso para metadados sensíveis
- trilha de auditoria para envio, assinatura, cancelamento, download
- segregação de acesso por tenant e por unidade

## 8) RLS

- RLS em todas as tabelas `docs.*`
- leitura permitida apenas para membros com permissão documental
- escrita apenas via RPC/Edge com checagem explícita de papel
- política especial para visualização por paciente, quando aplicável

## 9) Storage privado

Buckets planejados:

- `patient-documents`
- `legal-evidence`

Artefatos:

- PDF original
- PDF assinado
- comprovantes de assinatura
- hash/evidência técnica

Acesso somente por signed URL temporária, emitida server-side.

## 10) Variáveis de ambiente (futuras)

- `D4SIGN_BASE_URL`
- `D4SIGN_API_KEY`
- `D4SIGN_SECRET`
- `D4SIGN_WEBHOOK_SECRET`
- `D4SIGN_TIMEOUT_MS`

Observação: em UI-only, representar como `não configurado`/`simulado`.

## 11) Ordem de implementação sugerida

1. Modelo de dados `docs.signature_*` + RLS.
2. RPC de criação/envio/cancelamento.
3. Edge Function de despacho para D4Sign.
4. Webhook ingest + sincronização de status.
5. Pacote de evidências jurídicas.
6. Observabilidade e alertas de falha.
7. Migração progressiva de mocks para provider real.
