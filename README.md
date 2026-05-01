# emagreceplus-ui

Protótipo visual UI-only do EmagrecePlus com **Next.js (App Router)**, **TypeScript** e **Tailwind CSS**.

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- ESLint
- `lucide-react` (ícones)
- `recharts` (gráficos)

## Regras desta fase
- Sem integração real com Supabase, D4Sign ou Asaas.
- Sem backend, banco, migrations, secrets ou `service_role`.
- Dados mockados tipados.

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


## Modo Preview (Vercel)
- Defina `NEXT_PUBLIC_APP_MODE=mock` (recomendado para preview).
- A rota `/preview` lista as principais telas navegáveis do protótipo.
- O projeto não exige autenticação real nesta fase e usa apenas dados mockados.

### Publicar preview na Vercel
1. Importe o repositório na Vercel.
2. Em **Settings > Environment Variables**, adicione `NEXT_PUBLIC_APP_MODE=mock` para Preview/Production.
3. Faça deploy da branch de preview.
4. Acesse `/preview` para navegação das telas.
