# Plano de Integração Futura — Asaas

> Escopo: integração de pagamentos **planejada**. Nesta fase não realizar chamadas reais ao Asaas.

## 1) Objetivo

Descrever o desenho técnico para conectar os fluxos financeiros (cobranças, pagamentos, inadimplência e repasses) ao Asaas mantendo segurança, rastreabilidade e isolamento por tenant.

## 2) Rotas impactadas

- `/finance/dashboard`
- `/finance/charges`
- `/finance/payments`
- `/finance/cash`
- `/finance/payouts`
- `/patients/[id]/financial`

Padrão:

- UI usa `financeAdapter` com provider mock (atual) e provider asaas (futuro).
- A UI nunca chama Asaas diretamente.
- Operações críticas passam por RPC/Edge Function.

## 3) Tabelas futuras

Schema `finance`:

- `finance.customers`
- `finance.charges`
- `finance.charge_installments`
- `finance.payments`
- `finance.refunds`
- `finance.professional_payouts`
- `finance.debt_collection_events`
- `finance.asaas_links`
- `finance.asaas_webhook_events`

Campos de integração:

- `provider` (`asaas`)
- `provider_customer_id`
- `provider_charge_id`
- `provider_payment_id`
- `provider_status`
- `last_provider_sync_at`

## 4) RPCs futuras

- `api.create_finance_customer`
- `api.create_charge`
- `api.create_installment_plan`
- `api.cancel_charge`
- `api.register_manual_payment`
- `api.request_refund`
- `api.reconcile_provider_payment`
- `api.calculate_professional_payouts`

Regras:

- consistência transacional entre cobrança e projeções locais
- suporte a idempotência por `idempotency_key`
- evitar lógica financeira crítica apenas no client

## 5) Edge Functions futuras

- `asaas-create-customer`
- `asaas-create-charge`
- `asaas-cancel-charge`
- `asaas-webhook-ingest`
- `asaas-reconciliation-job`

Diretrizes:

- retries com backoff e circuit breaker
- rastreamento por correlation id
- normalização de erros por categoria (negócio, autenticação, rate limit)

## 6) Webhooks

Eventos esperados:

- cobrança criada/atualizada/cancelada
- pagamento confirmado/estornado
- vencimento e inadimplência

Pipeline:

1. validar assinatura do webhook
2. persistir evento bruto em `finance.asaas_webhook_events`
3. deduplicar por `external_event_id`
4. aplicar transição de estado em `finance.charges`/`finance.payments`
5. registrar evento de auditoria

## 7) Segurança

- token Asaas em secret manager
- rotação periódica de credenciais
- princípio do menor privilégio
- logs sem dados sensíveis completos (mascaramento de PII)
- segregação por tenant para toda leitura e escrita

## 8) RLS

- RLS em todo schema `finance`
- política por `tenant_id` e permissões financeiras
- escrita manual sensível apenas por perfis autorizados
- acesso de leitura limitado por escopo (clínica/unidade/profissional)

## 9) Storage privado

Buckets planejados:

- `financial-receipts`
- `billing-artifacts`

Conteúdo:

- comprovantes
- boletos/PDFs
- recibos de estorno

Acesso por signed URL temporária com TTL curto.

## 10) Variáveis de ambiente (futuras)

- `ASAAS_BASE_URL`
- `ASAAS_API_KEY`
- `ASAAS_WEBHOOK_SECRET`
- `ASAAS_TIMEOUT_MS`
- `ASAAS_RETRY_MAX`

Em UI-only: manter integração como `planejada/simulada`.

## 11) Ordem de implementação sugerida

1. Modelo financeiro base + RLS.
2. RPCs de cobrança e pagamento.
3. Edge Functions de criação/cancelamento.
4. Webhook ingest e reconciliação.
5. Fechamento de caixa e repasses automatizados.
6. Hardening, observabilidade e playbooks operacionais.
