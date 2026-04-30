# AGENTS.md

## Escopo
Este arquivo vale para todo o repositório.

## 1) Objetivo do repo
- Este repositório é **UI-only** do EmagrecePlus.
- Objetivo: construir e evoluir as **52 telas** do produto com foco em prototipação visual funcional, consistência de UX e arquitetura de front-end escalável.
- Não implementar backend real nesta fase.

## 2) Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Componentes reutilizáveis e tipados
- Dados mockados (sem dependência de serviços externos reais)

## 3) Regras de UI
- Visual moderno, minimalista, estilo SaaS clínico premium.
- Paleta base: **branco + emerald/teal + graphite**.
- Priorizar legibilidade, hierarquia clara e estados visuais consistentes.
- Cards com cantos arredondados (2xl) e sombras suaves.
- Toda tela/fluxo deve prever e implementar estados:
  - `loading`
  - `empty`
  - `error`
  - `forbidden`
- Textos de saúde **não podem prometer resultado garantido**.
- Não declarar “criptografia de ponta a ponta” sem implementação E2EE real comprovada.
- Não exibir medicamento de prescrição médica em telas destinadas ao papel de nutricionista.

## 4) Regras de segurança
- Não usar secrets, tokens reais, chaves privadas ou credenciais no código.
- Não criar integrações reais com provedores externos nesta fase.
- Não criar backend, banco de dados, migrations, policies, webhooks reais.
- Se necessário representar integrações, usar status explícito: `não configurado` ou `simulado`.

## 5) Regras para mocks
- Mocks devem ser tipados com TypeScript.
- Estruturar dados mockados por domínio (ex.: pacientes, planos, pagamentos, documentos).
- Criar adapters/interfaces para permitir troca futura de mock -> provider real sem refatoração ampla.
- Sempre incluir casos de mock para `loading`, `empty`, `error` e `forbidden`.
- D4Sign: usar como provider **planejado**, somente em estado `não configurado/simulado`.
- Asaas: usar apenas como integração **planejada**, sem chamadas reais.
- Supabase: não integrar nesta fase.

## 6) Regras de componentes
- Componentes devem ser reutilizáveis, pequenos e com responsabilidade única.
- Props sempre tipadas; evitar `any`.
- Separar componentes de apresentação de adapters/fonte de dados mock.
- Criar variações por estado (loading/empty/error/forbidden) quando aplicável.
- Evitar acoplamento direto do componente a serviço externo.

## 7) Regras de rotas
- Usar App Router do Next.js.
- Organizar rotas por domínio funcional para sustentar crescimento das 52 telas.
- Cada rota principal deve ter tratamento de acesso e estados de UI (incluindo `forbidden`).
- Não adicionar endpoints de API reais (`/api`) para integrações externas nesta fase, salvo mocks locais estritamente visuais.

## 8) Checks obrigatórios
Sempre executar antes de finalizar qualquer task:
- `git diff --check`
- `npm run build`

Se algum check falhar, corrigir antes de concluir.
