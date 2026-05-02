# Future Supabase Migration Plan

## 1) Estratégia de providers (UI-only -> provider real)
- `DataProvider` é o contrato central de leitura por domínio, com repositórios para: `auth`, `tenants`, `dashboard`, `crm`, `patients`, `scheduling`, `clinical`, `nutrition`, `prescriptions`, `documents`, `finance`, `packages`, `inventory`, `reports`, `notifications` e `chat`.
- `mockDataProvider` é a implementação ativa nesta fase, com dados simulados tipados por domínio e sem dependência externa real.
- `futureSupabaseProvider` permanece somente como stub de migração; todos os métodos lançam o erro explícito: `Supabase provider is not enabled in UI-only mode`.
- As telas devem depender somente da interface `DataProvider`, facilitando troca de provider sem refatoração ampla de UI.

## 2) Contratos -> futuras tabelas Supabase
- `auth`, `tenant`: `profiles`, `tenant_units`, `tenant_memberships`.
- `patients`, `clinical`, `nutrition`, `prescriptions`: patient care tables.
- `crm`, `scheduling`, `documents`, `finance`, `packages`, `inventory`, `reports`, `notifications`, `chat`: domain tables mirroring current TS contracts.

## 3) Módulos que exigirão migrações
Auth/multi-tenant, pacientes, serviços/pacotes, financeiro, agenda/atendimento, documentos, estoque, relatórios, chat/comunidade.

## 4) Módulos que exigirão RLS
Auth/multi-tenant, pacientes, clínico/nutrição, financeiro, documentos, chat e notificações.

## 5) Módulos que exigirão Storage privado
Documentos clínicos, anexos de prescrições e evidências contratuais.

## 6) Integrações futuras
- D4Sign (status atual: não configurado/simulado)
- Asaas (status atual: não configurado/simulado)

## 7) Ordem de migração sugerida
1. Auth/multi-tenant
2. Pacientes
3. Serviços/pacotes
4. Financeiro/Asaas
5. Agenda/atendimento
6. Documentos/D4Sign
7. Estoque
8. Relatórios
9. Chat/comunidade

## 8) O que NÃO deve ser feito agora
- Não criar migrations neste ciclo.
- Não instalar ou chamar Supabase.
- Não criar banco/Edge Functions/backend.
- Não integrar D4Sign ou Asaas reais.
- Não usar secrets ou `.env` real.
