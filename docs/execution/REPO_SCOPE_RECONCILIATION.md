# REPO_SCOPE_RECONCILIATION

## 1) Escopo declarado no README/AGENTS

### README.md
O README declara explicitamente que o repositório é um **"Protótipo visual UI-only"** e lista regras da fase com:
- sem integração real com Supabase, D4Sign ou Asaas;
- sem backend, banco, migrations, secrets ou `service_role`;
- uso de dados mockados tipados.

### AGENTS.md
O AGENTS reforça que:
- o objetivo é **UI-only** com foco em prototipação das telas;
- não deve haver backend real;
- não criar banco/migrations/policies/webhooks reais;
- Supabase, D4Sign e Asaas ficam como planejados/simulados nesta fase.

**Conclusão do escopo declarado:** o repositório, nesta etapa, deveria conter somente camada de interface + mocks tipados e contratos/adapters para evolução futura.

---

## 2) Arquivos que contradizem o escopo

A base atual contém artefatos de stack full-stack/DB que entram em conflito direto com o posicionamento UI-only:

### Dependências e tooling
- `package.json`
  - Dependências runtime: `@supabase/ssr`, `@supabase/supabase-js`
  - Dependência de desenvolvimento: `supabase` (CLI)

### Estrutura e artefatos de banco
- `supabase/migrations/20260501090000_platform_foundation.sql`
- `supabase/migrations/20260501100000_catalog_packages_backend.sql`
- `supabase/migrations/20260501113000_package_sales_flow.sql`
- `supabase/seed/20260501090500_platform_seed.sql`

Esses arquivos representam modelagem e evolução real de banco, o que contradiz a regra de "sem backend/banco/migrations reais" para esta fase.

---

## 3) Riscos de manter migrations reais no repo UI-only

1. **Risco de desalinhamento de produto e engenharia**
   - A mensagem "UI-only" perde credibilidade interna; times diferentes passam a assumir escopos diferentes.

2. **Risco de execução acidental de infraestrutura**
   - Presença de migrations/seed e CLI facilita execução involuntária de fluxo de banco, mesmo quando não deveria existir backend ativo.

3. **Risco de acoplamento prematuro da UI ao modelo de dados**
   - Decisões de UX podem ser dirigidas por schema ainda volátil, reduzindo liberdade de prototipação.

4. **Risco de dívida de governança**
   - Sem decisão explícita, o repositório vira híbrido (UI + backend parcial), dificultando review, ownership e critérios de done.

5. **Risco de compliance/comunicação externa**
   - Repositório declarado como visual pode aparentar maturidade de backend/integrações que não está operacionalmente validada.

---

## 4) Recomendação: Opção A (UI-only puro) vs Opção B (full-stack)

### Opção A — UI-only puro (recomendada para o estado atual declarado)
**Quando escolher:** quando o foco imediato continua sendo velocidade de design/UX e entrega das 52 telas sem compromisso operacional de backend.

**Prós**
- Coerência total com README/AGENTS.
- Menor complexidade operacional.
- Evita acoplamento prematuro da UI com persistência real.

**Contras**
- Artefatos de backend precisam ser movidos para outro local/repositório.
- Decisões de schema ficam desacopladas do ciclo da UI.

### Opção B — full-stack
**Quando escolher:** quando já existe decisão formal de evoluir este mesmo repo para produto com backend ativo.

**Prós**
- Fonte única para UI + dados + evolução de schema.
- Facilita rastreabilidade ponta a ponta.

**Contras**
- Exige revisão completa de README/AGENTS e regras de segurança.
- Aumenta custo de CI/CD, revisão, governança e responsabilidades do time.

---

## 5) Arquivos a remover/mover se escolher UI-only

> Nesta task **não remover nada**; apenas recomendação de destino.

### Candidatos a mover para repositório full-stack/backend (preferencial)
- `supabase/migrations/20260501090000_platform_foundation.sql`
- `supabase/migrations/20260501100000_catalog_packages_backend.sql`
- `supabase/migrations/20260501113000_package_sales_flow.sql`
- `supabase/seed/20260501090500_platform_seed.sql`

### Candidatos a retirar do repo UI (em PR dedicado)
- Dependências Supabase em `package.json`:
  - `@supabase/ssr`
  - `@supabase/supabase-js`
  - `supabase` (devDependency)

### Alternativa se não puder mover imediatamente
- Isolar tudo sob uma pasta de quarentena/documentação (ex.: `docs/archived-backend-drafts/`) com aviso explícito de **não executável nesta fase**.

---

## 6) Arquivos a manter/endurecer se escolher full-stack

Se a decisão for full-stack, manter os arquivos atuais, porém com endurecimento obrigatório:

1. **Governança de ambiente e segurança**
   - Formalizar variáveis por ambiente, política de segredo, e bloqueios para impedir uso indevido em produção.

2. **Padrão de migrations/seed**
   - Definir convenção de versionamento, rollback, idempotência e revisão técnica obrigatória.

3. **Documentação de arquitetura**
   - Atualizar README e AGENTS removendo ambiguidade UI-only.
   - Criar ADR de transição (UI-only -> full-stack) com data, responsáveis e impactos.

4. **Guardrails de CI**
   - Jobs explícitos para validar SQL/migrations e separar pipeline de UI e backend.

5. **Fronteira de integrações externas**
   - D4Sign/Asaas/Supabase com status por ambiente (simulado, staging, prod) e contratos claros para evitar chamada real indevida.

---

## 7) Próximo plano recomendado

### Plano recomendado: seguir **Opção A (UI-only puro)** agora

1. **Decisão formal (D0)**
   - Registrar decisão de escopo em ADR curta: repo atual permanece UI-only até conclusão da fase de 52 telas.

2. **PR de reconciliação documental (D0-D1)**
   - Ajustar README/AGENTS com seção "Limites do repositório" e referência de onde ficará backend.

3. **PR de limpeza controlada (D1-D2)**
   - Mover `supabase/migrations` e `supabase/seed` para repositório backend (ou arquivar fora da raiz operacional da UI).
   - Remover dependências Supabase do `package.json` (em task separada, não nesta).

4. **PR de blindagem de UI mocks (D1-D3)**
   - Consolidar adapters/interfaces e fixtures tipadas por domínio com estados `loading/empty/error/forbidden`.

5. **Checklist de saída da reconciliação (D3)**
   - Confirmar que não há migrations, seeds, CLI de banco nem integrações reais no repo UI-only.
   - CI focada em lint/typecheck/build da UI.

---

## Parecer final

Há inconsistência objetiva entre o escopo declarado (UI-only) e os artefatos atuais (dependências/CLI Supabase + migrations/seed reais). A recomendação mais coerente com os documentos vigentes é **Opção A: UI-only puro**, com plano de transição controlado dos artefatos de backend para outro repositório/escopo.
