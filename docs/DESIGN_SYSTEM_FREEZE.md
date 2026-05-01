# EmagrecePlus — Design System Freeze (v1)

> Status: **congelado para UI Blueprint**. Alterações só com revisão formal.

## 1) Tokens finais de cor

### 1.1 Base (HSL)
- `--background: 0 0% 100%`
- `--foreground: 217 33% 17%`
- `--graphite: 217 33% 17%`
- `--card: 0 0% 100%`
- `--card-foreground: 217 33% 17%`

### 1.2 Primários
- `--primary: 165 86% 33%`
- `--primary-foreground: 0 0% 100%`
- `--accent: 164 78% 94%`

### 1.3 Neutros de suporte
- `--muted: 210 40% 98%`
- `--muted-foreground: 215 16% 47%`
- `--border: 214 28% 89%`
- `--input: 214 28% 89%`
- `--ring: 165 86% 33%`

### 1.4 Status
- `--success: 158 82% 35%` / `--success-soft: 154 58% 94%`
- `--warning: 38 92% 50%` / `--warning-soft: 40 100% 95%`
- `--danger: 0 84% 60%` / `--danger-soft: 0 100% 96%`
- `--info: 198 89% 48%` / `--info-soft: 195 100% 95%`

## 2) Tipografia
- Família padrão: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`.
- Hierarquia mínima:
  - Título de página: `text-3xl` com peso `font-semibold`.
  - Título de card: `text-base` com `font-semibold`.
  - Corpo padrão: `text-sm`.
  - Texto auxiliar: `text-xs` / `text-sm` com `text-muted-foreground`.

## 3) Radius
- Superfícies principais (`card`): `rounded-2xl`.
- Inputs e botões padrão: `rounded-xl`.
- Modais: `rounded-3xl`.
- Pills/badges: `rounded-full`.

## 4) Shadows
- `shadow-soft`: sombra padrão de UI elevada.
- `shadow-modal`: sombra de destaque para camada de modal.
- `ep-card`: base de card com sombra suave consistente.

## 5) Botões e variantes
- Variantes oficiais: `primary`, `secondary`, `outline`, `ghost`, `danger`.
- Tamanhos oficiais: `sm`, `md`, `lg`, `icon`.
- Estados obrigatórios: normal, hover, disabled, loading.
- `primary` é a ação principal da tela.
- `danger` apenas para ações destrutivas/irreversíveis.

## 6) Badges e status
- Tons oficiais: `success`, `warning`, `danger`, `info`, `neutral`, `primary`.
- Badge é contextual e não substitui mensagem explicativa em erro crítico.
- `forbidden` deve usar tom de alerta/erro + texto claro de permissão.

## 7) Tabelas
- Usar `ep-table` como estilo único.
- Cabeçalho semântico em `thead`.
- Linhas com destaque suave em hover.
- Células com padding confortável e separadores por borda.

## 8) Modais
- Overlay escuro translúcido com blur.
- Container central com `rounded-3xl` e `shadow-modal`.
- Estrutura fixa: header (título + fechar), conteúdo, footer opcional.

## 9) Cards
- Base única: `ep-card`.
- Cabeçalho com borda inferior quando houver título/descrição.
- Conteúdo com padding interno padronizado.

## 10) Formulários
- Inputs, selects e textarea com borda `border-input`.
- Focus sempre com `ep-focus-ring`.
- Erro de campo: borda/feedback em `danger`.
- Label visível em todos os campos.

## 11) Estados loading/empty/error/forbidden
Todas as telas e blocos de domínio devem prever explicitamente:
- `loading`: feedback de processamento/carregamento.
- `empty`: ausência de dados com orientação de próximo passo.
- `error`: falha de leitura/processamento com texto acionável.
- `forbidden`: ausência de permissão com linguagem direta.

## 12) Regras de linguagem e microcopy
- Não prometer resultado garantido em contexto de saúde.
- Não declarar “criptografia de ponta a ponta” sem E2EE real.
- Em integrações planejadas, usar “não configurado” ou “simulado”.
- Mensagens devem ser curtas, claras e orientadas à ação.

## 13) O que não pode ser alterado sem revisão
1. Paleta de tokens base e de status.
2. Famílias/tamanhos tipográficos base da aplicação.
3. Radius oficial (`xl/2xl/3xl/full`) por categoria.
4. Variantes oficiais de botão e badge.
5. Estrutura padrão de modal, tabela e card.
6. Obrigatoriedade dos estados `loading/empty/error/forbidden`.
7. Regras de linguagem clínica e limitações de promessas.

---

## Escopo do congelamento
- Este freeze vale para todo o repositório UI do EmagrecePlus nesta fase sem backend real.
- Mudanças futuras devem passar por revisão de design + frontend para evitar regressão visual e de UX.
