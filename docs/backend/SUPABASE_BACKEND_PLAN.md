# Plano de Backend Supabase — Evolução do EmagrecePlus para SaaS Real

> **Status:** planejamento arquitetural (sem implementação nesta task).  
> **Objetivo:** definir um blueprint completo de backend para sair de UI-only e operar como SaaS multi-tenant seguro, auditável e escalável.

---

## 1) Schemas sugeridos

## `platform`
Responsável pelo núcleo multi-tenant, unidades, memberships, RBAC e configurações globais da operação.

## `auth` / `app`
- `auth`: gerenciado pelo Supabase Auth (usuários, identidades, sessões).
- `app`: projeções e preferências de aplicação ligadas ao usuário autenticado (perfil funcional, onboarding, feature flags por usuário).

## `crm`
Captação, funil comercial, leads, oportunidades, origem de aquisição e relacionamento pré-paciente.

## `patients`
Cadastro mestre de pacientes, dados demográficos, contatos, responsáveis, consentimentos e vínculos por unidade.

## `scheduling`
Agenda, disponibilidade, bloqueios, tipos de sessão, agendamentos, remarcações, no-show e ocupação.

## `clinical`
Prontuário clínico, anotações SOAP, evolução, diagnósticos, plano terapêutico, tarefas clínicas e anexos clínicos estruturados.

## `nutrition`
Anamnese nutricional, plano alimentar, metas, adesão, registros alimentares e evolução nutricional.

## `documents`
Gestão documental, templates, geração de arquivos, assinatura eletrônica (D4Sign planejado), versionamento e evidências legais.

## `finance`
Cobranças, faturas, assinaturas, repasses, conciliação, inadimplência, eventos de pagamento (Asaas planejado).

## `packages`
Pacotes comerciais e clínicos, regras de consumo, créditos/sessões, validade, upgrade/downgrade.

## `inventory`
Estoque de insumos e produtos, movimentações, lotes, validade, consumo em procedimentos.

## `notifications`
Notificações internas e externas (in-app, e-mail, WhatsApp futuro), preferências e fila de entrega.

## `communication`
Mensageria segura entre paciente e equipe, threads, mensagens, anexos, marcação de leitura e moderação.

## `reports`
Camada analítica operacional (KPIs por tenant/unidade/equipe), snapshots, métricas materializadas.

## `audit`
Trilha de auditoria imutável de operações sensíveis, segurança, acesso, mudanças clínicas e financeiras.

---

## 2) Tabelas por módulo

## `platform`
- `tenants`
- `tenant_settings`
- `units`
- `roles`
- `permissions`
- `role_permissions`
- `memberships`
- `membership_scopes` (escopo por unidade/carteira)
- `feature_flags`

## `app`
- `user_profiles`
- `user_preferences`
- `user_notification_preferences`
- `user_last_access`

## `crm`
- `leads`
- `lead_contacts`
- `lead_pipeline_stages`
- `lead_stage_history`
- `opportunities`
- `crm_activities`

## `patients`
- `patients`
- `patient_contacts`
- `patient_addresses`
- `patient_emergency_contacts`
- `patient_guardians`
- `patient_consents`
- `patient_tags`
- `patient_unit_links`

## `scheduling`
- `calendars`
- `availability_rules`
- `schedule_blocks`
- `appointment_types`
- `appointments`
- `appointment_participants`
- `appointment_status_history`
- `waitlist_entries`

## `clinical`
- `encounters`
- `encounter_notes`
- `soap_notes`
- `clinical_assessments`
- `care_plans`
- `care_plan_goals`
- `clinical_tasks`
- `clinical_attachments`

## `nutrition`
- `nutrition_intakes`
- `nutrition_plans`
- `nutrition_plan_meals`
- `nutrition_goals`
- `nutrition_progress_logs`
- `food_diary_entries`
- `supplement_protocols`

## `documents`
- `document_templates`
- `document_instances`
- `document_versions`
- `document_signers`
- `document_signature_requests`
- `document_signature_events`
- `document_storage_links`

## `finance`
- `customers`
- `billing_profiles`
- `invoices`
- `charges`
- `subscriptions`
- `payment_transactions`
- `refunds`
- `payouts`
- `finance_webhook_events`

## `packages`
- `service_packages`
- `package_items`
- `package_contracts`
- `package_consumptions`
- `package_balance_snapshots`

## `inventory`
- `inventory_items`
- `inventory_locations`
- `inventory_lots`
- `inventory_movements`
- `inventory_adjustments`

## `notifications`
- `notification_templates`
- `notification_events`
- `notification_deliveries`
- `notification_failures`

## `communication`
- `chat_threads`
- `chat_thread_members`
- `chat_messages`
- `chat_attachments`
- `chat_message_reads`

## `reports`
- `report_definitions`
- `report_runs`
- `metric_snapshots_daily`
- `metric_snapshots_monthly`

## `audit`
- `audit_events`
- `audit_event_payloads`
- `access_logs`
- `security_incidents`
- `data_change_ledger`

---

## 3) Relações principais

- `platform.tenants` 1:N `platform.units`.
- `platform.tenants` 1:N em praticamente todas tabelas de negócio (`tenant_id` obrigatório).
- `auth.users` 1:N `platform.memberships`.
- `platform.memberships` N:N `platform.roles` (direto ou via tabela pivot, conforme granularidade).
- `patients.patients` 1:N `clinical.encounters`, `nutrition.nutrition_plans`, `documents.document_instances`, `scheduling.appointments`, `finance.charges`.
- `scheduling.appointments` 1:1 ou 1:N `clinical.encounters` (dependendo de reavaliações por sessão).
- `documents.document_instances` 1:N `documents.document_versions` e 1:N `documents.document_signers`.
- `finance.charges` 1:N `finance.payment_transactions`.
- `packages.package_contracts` 1:N `packages.package_consumptions`, com consumo disparado por eventos de atendimento.
- `communication.chat_threads` N:N `platform.memberships` via `chat_thread_members`.
- `audit.audit_events` referenciam entidades por `entity_type` + `entity_id` (modelo polimórfico).

---

## 4) Estratégia RLS por tenant/unidade/paciente

## Princípios
- Toda tabela de domínio com `tenant_id` e `created_by_membership_id`.
- Quando aplicável, adicionar `unit_id` para segmentação operacional.
- Para dados clínicos/nutricionais, incluir `patient_id` e políticas específicas por papel.

## Helpers recomendados (schema privado)
- `private.current_user_id()`
- `private.current_membership_id()`
- `private.current_tenant_id()`
- `private.is_active_membership()`
- `private.has_permission(permission_key text)`
- `private.can_access_patient(patient_id uuid)`
- `private.can_access_unit(unit_id uuid)`

## Padrões de policy
- **Leitura geral por tenant:** somente quando `tenant_id = private.current_tenant_id()` e membership ativa.
- **Filtro por unidade:** exigir `private.can_access_unit(unit_id)` para tabelas operacionais.
- **Prontuário/paciente:** exigir `private.can_access_patient(patient_id)` + permissão clínica específica.
- **Financeiro sensível:** permitir leitura/escrita apenas para papéis administrativos/financeiros.
- **Audit:** leitura restrita (compliance/admin), escrita apenas via funções/RPC.

---

## 5) Storage privado

## Buckets privados sugeridos
- `patient-documents-private`
- `clinical-attachments-private`
- `chat-attachments-private`
- `finance-receipts-private`
- `audit-evidence-private`

## Convenção de path
`tenants/{tenant_id}/units/{unit_id}/patients/{patient_id}/{module}/{entity_id}/{file_name}`

## Regras
- Buckets **sempre privados**.
- Upload/download mediado por RPC/Edge Function (com validação de escopo).
- Geração de signed URL com TTL curto (ex.: 60–300s).
- Antivírus e validação MIME em pipeline assíncrona.
- Registro obrigatório de acesso/baixar arquivo em `audit.access_logs`.

---

## 6) RPCs necessárias

## Núcleo de acesso/segurança
- `api.switch_active_unit(unit_id)`
- `api.list_my_permissions()`
- `api.validate_patient_access(patient_id)`

## Pacientes/CRM
- `api.create_patient_with_initial_record(payload)`
- `api.convert_lead_to_patient(lead_id, payload)`
- `api.merge_patients(source_patient_id, target_patient_id)`

## Agenda/Clínico/Nutrição
- `api.create_appointment(payload)`
- `api.reschedule_appointment(appointment_id, payload)`
- `api.complete_appointment_and_open_encounter(appointment_id)`
- `api.save_soap_note(encounter_id, payload)`
- `api.publish_nutrition_plan(patient_id, payload)`

## Documentos
- `api.create_document_instance(template_id, patient_id, payload)`
- `api.request_document_signature(document_instance_id)`
- `api.refresh_document_signature_status(document_instance_id)`

## Financeiro/Pacotes
- `api.create_charge_for_patient(patient_id, payload)`
- `api.apply_payment_event(charge_id, payload)`
- `api.consume_package_credit(contract_id, reference_event)`

## Comunicação/Notificação
- `api.send_chat_message(thread_id, payload)`
- `api.enqueue_notification(payload)`

## Auditoria
- `api.append_audit_event(payload)` (interna, uso controlado)

---

## 7) Edge Functions necessárias

- `fn-asaas-webhook-receiver`: validar assinatura, persistir bruto, normalizar evento e despachar interno.
- `fn-d4sign-webhook-receiver`: validar callback, atualizar status de assinatura, registrar evidências.
- `fn-document-renderer`: gerar PDF a partir de template + dados consolidados.
- `fn-storage-signed-url-broker`: emitir URL assinada com validação RLS adicional.
- `fn-notification-dispatcher`: consumir fila de notificações e executar entregas por canal.
- `fn-internal-event-bus`: processar eventos canônicos e disparar projeções entre módulos.
- `fn-nightly-report-snapshots`: consolidar métricas diárias/mensais em `reports`.
- `fn-audit-integrity-check`: rotina de verificação de integridade da trilha de auditoria.

---

## 8) Webhooks externos

## Asaas
Fluxo planejado:
1. Receber webhook em `fn-asaas-webhook-receiver`.
2. Validar autenticidade + idempotência (`external_event_id`).
3. Persistir payload em `finance.finance_webhook_events`.
4. Traduzir para evento canônico (`payment_confirmed`, `payment_overdue`, etc.).
5. Atualizar `finance.charges` / `finance.payment_transactions`.
6. Gerar auditoria e notificação.

## D4Sign
Fluxo planejado:
1. Receber webhook em `fn-d4sign-webhook-receiver`.
2. Validar autenticidade e vincular ao `document_signature_request`.
3. Persistir payload bruto em `documents.document_signature_events`.
4. Atualizar estado de assinatura em `documents.document_instances`.
5. Gerar evidência legal (hash, timestamp, signatários) e auditoria.

> Nesta fase, ambos providers permanecem em estado **planejado/simulado** até habilitação real.

---

## 9) Eventos internos entre módulos

Modelo sugerido: tabela de outbox + processador assíncrono.

## Eventos de domínio (exemplos)
- `crm.lead_converted`
- `patients.patient_created`
- `scheduling.appointment_booked`
- `scheduling.appointment_completed`
- `clinical.encounter_closed`
- `nutrition.plan_published`
- `documents.signature_completed`
- `finance.charge_paid`
- `packages.credit_consumed`
- `inventory.item_low_stock`

## Encadeamentos relevantes
- `appointment_completed` -> cria/fecha encounter + consome crédito de pacote.
- `charge_paid` -> libera documento/plano pendente + notifica paciente.
- `signature_completed` -> marca termo válido + atualiza compliance do paciente.
- `patient_created` -> cria trilha inicial em CRM/Notificações/Auditoria.

---

## 10) Ordem de implementação recomendada

1. **Fundação de plataforma:** `platform`, vínculo com `auth`, memberships, RBAC base.
2. **Segurança estrutural:** helpers privados + RLS baseline + auditoria mínima.
3. **Módulos core assistenciais:** `patients`, `scheduling`, `clinical`, `nutrition`.
4. **Documentos + storage privado:** templates, instâncias, assinatura simulada, signed URLs.
5. **Financeiro + pacotes:** cobranças, pagamentos, consumo de créditos.
6. **Comunicação + notificações:** chat seguro e fila de notificações.
7. **Integrações externas reais:** webhooks Asaas/D4Sign com idempotência e observabilidade.
8. **Relatórios + hardening:** snapshots analíticos, monitoramento, performance e revisão de políticas.

---

## 11) Estratégia de testes e seeds

## Seeds
- Seed por tenant demo com 2 unidades e perfis (admin, nutricionista, recepção, financeiro).
- Massa de pacientes com casos: ativo, inativo, menor com responsável.
- Cenários de agenda: livre, lotada, no-show, remarcação.
- Cenários financeiros: pago, pendente, vencido, estornado.
- Cenários documentais: pendente assinatura, assinado, rejeitado.

## Testes obrigatórios de backend (quando iniciar implementação)
- **RLS tests:** garantir isolamento entre tenants/unidades/pacientes.
- **RPC tests:** validação de permissão, idempotência e transação.
- **Webhook tests:** assinatura inválida, duplicidade, ordem invertida de eventos.
- **Storage tests:** acesso indevido, URL expirada, MIME inválido.
- **Audit tests:** toda operação sensível gera trilha consistente.
- **Load tests:** fluxos críticos (agenda + cobrança + assinatura) sob concorrência.

## Critérios de pronto por etapa
- 100% das tabelas de negócio com RLS ativa.
- Zero operação privilegiada exposta ao client browser.
- Integrações externas com idempotência comprovada.
- Eventos críticos com observabilidade e auditoria ponta a ponta.

---

## Riscos principais

- Complexidade elevada de RLS multi-escopo (tenant + unidade + paciente) se não houver convenção rígida.
- Acoplamento excessivo entre módulos sem estratégia de eventos/outbox.
- Falhas de idempotência em webhooks gerando inconsistência financeira/documental.
- Crescimento de custo/performance sem política de particionamento, índices e retenção de auditoria.
- Exposição indevida de arquivos sensíveis se fluxo de signed URL não for centralizado.

---

## Próxima task recomendada

Criar o **data contract técnico** para implementação inicial (sem migrations), contendo:
1. Dicionário de dados do módulo `platform` + `patients` (campos, tipos, constraints).
2. Matriz de permissões (papéis x ações x módulo).
3. Especificação de policies RLS por tabela core.
4. Contrato JSON dos eventos internos (`event_name`, `version`, `payload`, `metadata`).
5. Lista priorizada das primeiras 10 RPCs com assinatura e regras de erro.
