# Future Supabase Migration Plan

## 1) Contracts -> future Supabase tables
- `auth`, `tenant`: `profiles`, `tenant_units`, `tenant_memberships`.
- `patients`, `clinical`, `nutrition`, `prescriptions`: patient care tables.
- `crm`, `scheduling`, `documents`, `finance`, `packages`, `inventory`, `reports`, `notifications`, `chat`: domain tables mirroring current TS contracts.

## 2) Modules that will need migrations
Auth/multi-tenant, pacientes, serviços/pacotes, financeiro, agenda/atendimento, documentos, estoque, relatórios, chat/comunidade.

## 3) Modules that will need RLS
Auth/multi-tenant, pacientes, clínico/nutrição, financeiro, documentos, chat e notificações.

## 4) Modules that will need private Storage
Documentos clínicos, anexos de prescrições e evidências contratuais.

## 5) Future integrations
- D4Sign (status atual: não configurado/simulado)
- Asaas (status atual: não configurado/simulado)

## 6) Migration order
1. Auth/multi-tenant
2. Pacientes
3. Serviços/pacotes
4. Financeiro/Asaas
5. Agenda/atendimento
6. Documentos/D4Sign
7. Estoque
8. Relatórios
9. Chat/comunidade

## 7) What must NOT be done now in this repo
- Não criar migrations neste ciclo.
- Não instalar ou chamar Supabase.
- Não criar banco/Edge Functions/backend.
- Não integrar D4Sign ou Asaas reais.
- Não usar secrets ou `.env` real.
