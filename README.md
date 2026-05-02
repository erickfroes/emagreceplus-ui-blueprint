# emagreceplus-ui

Protótipo visual **UI-only** do EmagrecePlus com **Next.js (App Router)**, **TypeScript** e **Tailwind CSS**.

## Escopo desta fase
- Produto focado em interface e experiência (52 telas), sem backend real ativo.
- Dados servidos por mocks tipados e adapters para futura troca de provider.
- Fluxos com estados visuais consistentes (`loading`, `empty`, `error`, `forbidden`).

## Integrações (status atual)
- **Supabase:** não integrado em runtime UI nesta fase; apenas material de referência em `docs/backend/reference-supabase-drafts/`.
- **D4Sign:** integração futura somente simulada/não configurada nesta fase.
- **Asaas:** integração futura somente simulada/não configurada nesta fase.

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- ESLint
- `lucide-react` (ícones)
- `recharts` (gráficos)

## Scripts
```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
```

## Estrutura inicial
```text
src/
  app/
  components/
  modules/
  lib/
  data/
```
