# Plano de Desenvolvimento do Zero

## Fase 0 — Bootstrap técnico

- Criar Next.js App Router com TypeScript.
- Configurar Tailwind, `globals.css`, tokens e componentes UI.
- Configurar Supabase client server/browser.
- Criar `.env.example`.
- Criar CI: typecheck, build, lint, smoke local.
- Criar `AGENTS.md` com guardrails.

## Fase 1 — Auth, tenant e permissões

- Supabase Auth.
- Tenants, unidades, memberships, roles e permissions.
- Seleção de ambiente.
- Dashboard shell.
- RLS base.
- `api:smoke:local` e `api:smoke:real`.

## Fase 2 — CRM, pacientes, agenda e atendimento

- CRM Kanban e lead detail.
- Conversão lead → paciente.
- Paciente 360.
- Agenda e fila.
- Encounter/SOAP/anamnese.
- Plano alimentar e prescrição.

## Fase 3 — Documentos e D4Sign-ready

- Templates documentais.
- Printable artifacts.
- Centro documental.
- Detalhe documento.
- Dossiê jurídico.
- Pacote JSON de evidência.
- D4Sign unconfigured/simulated.
- Observabilidade documental.

## Fase 4 — Financeiro clínico + Asaas

- Catálogo de serviços.
- Pacotes e construtor.
- Venda de pacote.
- Contrato do pacote.
- Contas a receber.
- Baixa manual.
- Caixa da unidade.
- Inadimplência.
- Repasses.
- Adapter Asaas sandbox.
- Webhook Asaas.

## Fase 5 — Estoque e compras

- Itens, categorias e fornecedores.
- Lotes e validade.
- Entrada/saída/ajuste.
- Transferência entre unidades.
- Pedido de compra e recebimento.
- Relatórios de estoque.

## Fase 6 — Notificações, chat e comunidade

- Fundação de notificações.
- Chat foundation.
- UI equipe e paciente.
- Anexos privados.
- Community foundation.
- Moderação e denúncias.

## Fase 7 — Relatórios e BI

- Relatórios financeiros.
- Relatórios de pacotes.
- Relatórios de estoque.
- Visão executiva.
- Relatório do paciente.
- Exportação PDF/Excel.

## Fase 8 — Integrações reais e go-live

- D4Sign real sandbox.
- Asaas real sandbox.
- Homologação.
- Observabilidade/Sentry.
- Backup/restore.
- DR runbook.
- Go-live checklist.

## Sequência de implementação recomendada por telas

1. Layout + Design System.
2. Login + Unidade.
3. Dashboard.
4. CRM + Leads.
5. Pacientes + Paciente 360.
6. Agenda + Fila.
7. Atendimento + Anamnese + SOAP.
8. Nutrição + Prescrição.
9. Documentos + Evidência.
10. Financeiro + Pacotes.
11. Estoque + Compras.
12. Notificações + Chat.
13. Relatórios.
14. Integrações reais.
