# Integrações: D4Sign e Asaas

## D4Sign — assinatura digital

### Variáveis

```env
DOCUMENT_SIGNATURE_PROVIDER=d4sign
DOCUMENT_SIGNATURE_PROVIDER_MODE=unconfigured|simulated|real
D4SIGN_ENV=sandbox|production
D4SIGN_BASE_URL=
D4SIGN_TOKEN_API=
D4SIGN_CRYPT_KEY=
D4SIGN_SAFE_UUID=
D4SIGN_WEBHOOK_SECRET=
D4SIGN_WEBHOOK_URL=
D4SIGN_HMAC_STRATEGY=uuid|raw_body
```

### Modos

- `unconfigured`: sem chamada externa; retorna `provider_config_missing`.
- `simulated`: sem rede externa; simula dispatch/webhook/HMAC local.
- `real`: chamadas reais D4Sign; só ativar após credenciais e estratégia HMAC oficial confirmadas.

### Fluxo real

1. Gerar documento/artefato no EmagrecePlus.
2. Enviar documento para D4Sign.
3. Adicionar signatário(s).
4. Cadastrar webhook.
5. Enviar para assinatura.
6. Receber webhook.
7. Validar HMAC oficial.
8. Consultar status oficial D4Sign.
9. Persistir `externalDocumentId`, `providerEventHash`, `providerPayloadHash`, `verificationStatus`.
10. Consolidar dossiê jurídico.
11. Regenerar pacote de evidência.

### Regra para `verified`

Somente promover `verificationStatus=verified` quando:

- HMAC válido.
- Estratégia HMAC confirmada oficialmente.
- Status oficial consultado na API D4Sign.
- Documento/status coerente com o artefato esperado.
- Hashes e ids externos persistidos.
- Dossiê e pacote de evidência atualizados.

## Asaas — financeiro clínico

### Variáveis

```env
ASAAS_ENV=sandbox|production
ASAAS_BASE_URL=https://api-sandbox.asaas.com/v3
ASAAS_API_KEY=
ASAAS_WEBHOOK_TOKEN=
ASAAS_WEBHOOK_URL=
```

### Fluxos

#### Criar cobrança

1. Venda de pacote ou serviço avulso.
2. Criar/associar cliente Asaas.
3. Criar cobrança com vencimento, valor, descrição e referência externa.
4. Persistir `asaasPaymentId`/`externalChargeId`.
5. Criar parcelas em `finance.charge_installments`.

#### Receber webhook

1. Asaas envia evento para Edge Function/API server-side.
2. Validar token do webhook.
3. Persistir payload hash e idempotency key.
4. Consultar status oficial se necessário.
5. Atualizar cobrança, pagamento e caixa.
6. Gerar notificação interna.
7. Atualizar relatórios.

### Eventos úteis

- Cobrança criada.
- Pagamento confirmado.
- Pagamento vencido.
- Pagamento estornado/cancelado.
- Boleto/Pix gerado.

## Segurança comum

- Nunca chamar D4Sign/Asaas do browser.
- Nunca logar API key, service role, cryptKey, webhook secret.
- Webhooks idempotentes.
- Persistir `event_hash` e `raw_payload_hash`.
- Assinar/validar callbacks com token/HMAC quando disponível.
- Separar sandbox e produção.
