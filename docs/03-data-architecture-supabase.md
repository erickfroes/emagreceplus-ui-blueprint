# Arquitetura de Dados Supabase

## Princípios

- Supabase é o runtime final.
- Regras críticas em SQL/RPC/Edge Functions.
- RLS em todas as tabelas de negócio.
- `service_role` somente em servidor/Edge Function.
- Browser nunca acessa storage sensível diretamente sem broker/signed URL temporária.
- Migrations imutáveis: criar nova migration para correções.

## Schemas sugeridos

| Schema | Responsabilidade |
|---|---|
| `platform` | tenants, unidades, usuários, memberships, permissões |
| `crm` ou `commercial` | leads, funis, estágios, propostas |
| `patients` | pacientes, perfis, timeline longitudinal |
| `scheduling` | agenda, tipos de atendimento, fila |
| `clinical` | encounters, SOAP, anamnese, plano, prescrições |
| `docs` | documentos, artefatos, assinatura, evidência, pacotes |
| `finance` | cobranças, pagamentos, caixa, repasses, inadimplência |
| `catalog` | serviços, pacotes, itens comerciais |
| `inventory` | estoque, lotes, movimentações, compras, fornecedores |
| `notifications` | eventos e entregas internas |
| `communication` | chat rooms, members, messages, attachments |
| `community` | posts, comments, reactions, moderation |
| `audit` | eventos auditáveis |
| `api` | RPCs públicas controladas via PostgREST/server |
| `private` | helpers internos e funções privilegiadas |

## Tabelas fundamentais por módulo

### Financeiro

- `finance.charges`
- `finance.charge_installments`
- `finance.payments`
- `finance.cash_registers`
- `finance.cash_movements`
- `finance.professional_payouts`
- `finance.debt_collection_events`
- `finance.receipts`
- `finance.asaas_webhook_events`

### Serviços e pacotes

- `catalog.services`
- `catalog.service_categories`
- `catalog.packages`
- `catalog.package_versions`
- `catalog.package_services`
- `catalog.package_entitlements`
- `catalog.patient_package_contracts`

### Estoque

- `inventory.items`
- `inventory.item_categories`
- `inventory.lots`
- `inventory.stock_movements`
- `inventory.suppliers`
- `inventory.purchase_orders`
- `inventory.purchase_order_items`
- `inventory.stock_adjustments`

### Comunicação

- `communication.chat_rooms`
- `communication.chat_members`
- `communication.chat_messages`
- `communication.chat_read_receipts`
- `communication.chat_attachments`

### Documentos

- `docs.patient_documents`
- `docs.document_versions`
- `docs.printable_artifacts`
- `docs.signature_requests`
- `docs.signature_events`
- `docs.document_legal_evidence`
- `docs.document_legal_evidence_packages`
- `docs.document_access_events`
- `docs.document_operational_events`

## RPCs por domínio

### Financeiro

- `api.create_charge_from_package_sale`
- `api.register_payment`
- `api.open_cash_register`
- `api.close_cash_register`
- `api.calculate_professional_payouts`
- `api.mark_payout_paid`
- `api.list_receivables`
- `api.list_debt_collection`

### Catálogo/Pacotes

- `api.create_service`
- `api.update_service`
- `api.create_package_version`
- `api.publish_package_version`
- `api.sell_package_to_patient`
- `api.generate_package_contract`

### Estoque

- `api.create_inventory_item`
- `api.register_stock_entry`
- `api.register_stock_output`
- `api.transfer_stock_between_units`
- `api.adjust_stock`
- `api.create_purchase_order`
- `api.receive_purchase_order`

### Chat

- `api.create_patient_chat_room`
- `api.list_chat_rooms`
- `api.list_chat_messages`
- `api.send_chat_message`
- `api.mark_chat_room_read`

## Storage

Buckets privados sugeridos:

- `patient-documents`
- `chat-attachments`
- `inventory-documents`
- `financial-receipts`
- `clinic-branding`

Padrão de path:

```txt
tenants/{tenantId}/units/{unitId}/patients/{patientId}/documents/{documentId}/...
tenants/{tenantId}/inventory/{itemId}/invoices/{fileId}
tenants/{tenantId}/chat/{roomId}/{attachmentId}
```

Nunca retornar `storageObjectPath` em payload público. Usar broker server-side para signed URL temporária.

## RLS básico

- Toda tabela carrega `tenant_id`.
- Quando aplicável, `unit_id`, `patient_id`, `created_by`.
- Políticas usam helpers como:
  - `private.current_tenant_id()`
  - `private.current_user_id()`
  - `private.can_access_patient(patient_id)`
  - `private.has_permission('clinical:view')`
- RPCs sensíveis devem ter `SECURITY DEFINER` e `search_path=''`.
- Wrappers `public.*`, se usados, devem ser `SECURITY INVOKER` e service_role-only quando forem ponte server-side.
