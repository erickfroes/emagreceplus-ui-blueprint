# EmagrecePlus UI Blueprint

Este pacote transforma o conjunto de 52 telas aprovadas em um **blueprint de implementação UI** para um SaaS clínico moderno usando **Next.js App Router + Tailwind CSS + Supabase + D4Sign + Asaas**.

O objetivo não é substituir o repositório final, mas entregar uma base de design system, componentes, arquitetura visual, mapa de telas e plano de desenvolvimento para construir o produto do zero seguindo o padrão visual das imagens.

## Conteúdo

- `docs/00-product-map.md` — mapa dos 52 fluxos/telas.
- `docs/01-design-system.md` — tokens visuais, padrões de layout, estados e acessibilidade.
- `docs/02-component-architecture.md` — componentes Tailwind reutilizáveis e composição por tela.
- `docs/03-data-architecture-supabase.md` — módulos, schemas, RLS e storage.
- `docs/04-integrations-d4sign-asaas.md` — desenho de integração D4Sign e Asaas.
- `docs/05-development-plan.md` — plano de implementação por fases.
- `docs/06-implementation-prompts.md` — prompts para Codex/ChatGPT implementar por etapas.
- `docs/07-screen-to-component-map.md` — cada uma das 52 telas mapeada para componentes.
- `tailwind.config.ts` — tokens Tailwind sugeridos.
- `src/app/globals.css` — CSS global com design tokens.
- `src/components/ui/*` — componentes base em Tailwind.
- `src/components/layout/*` — shells de dashboard/settings/mobile.
- `src/features/examples/*` — exemplos de composição de tela.
- `src/server/integrations/*` — contratos/stubs para D4Sign e Asaas.

## Stack recomendada

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- Supabase Auth, Postgres, Storage, Edge Functions e RLS.
- D4Sign para assinatura documental.
- Asaas para financeiro clínico e cobranças.
- React Query ou Server Actions para orquestração UI/API.
- Zod + React Hook Form para formulários.
- Recharts para gráficos.
- Lucide React para ícones.

## Princípios visuais

- Interface branca, limpa e premium.
- Verde/teal como cor primária.
- Cards `rounded-2xl`, bordas suaves e sombras discretas.
- Densidade controlada: tabelas amplas no desktop e cards no mobile.
- Estados sempre explícitos: loading, vazio, erro, sem permissão, bloqueado por integração.
- Segurança visível: auditoria, LGPD, links temporários, storage privado, permissões.

## Como usar

1. Copie `tailwind.config.ts` e `src/app/globals.css` para o projeto Next.js.
2. Copie os componentes de `src/components/ui` e `src/components/layout`.
3. Use `docs/07-screen-to-component-map.md` para montar as telas.
4. Implemente cada fase do plano em `docs/05-development-plan.md`.
5. Nunca exponha secrets no browser; D4Sign e Asaas devem rodar em server/Edge Function.
