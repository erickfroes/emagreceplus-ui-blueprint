# Design System EmagrecePlus

## Personalidade visual

- Clínico, premium, calmo e operacional.
- Minimalista, com muito espaço em branco.
- Verde/teal como cor de ação e confiança.
- Cinzas frios para texto e estrutura.
- Status em tons suaves: verde, amarelo, vermelho, azul e roxo.

## Tokens principais

| Token | Valor sugerido | Uso |
|---|---:|---|
| Primary 500 | `#0EA37A` | Botões, links, foco, destaques |
| Primary 50 | `#EEFDF8` | Cards ativos e fundos suaves |
| Foreground | `#0F172A` | Títulos e texto principal |
| Muted | `#64748B` | Texto secundário |
| Border | `#E2E8F0` | Divisores e bordas |
| Background | `#F8FAFC` | Fundo de página |
| Card | `#FFFFFF` | Superfícies principais |
| Danger | `#EF4444` | Erros, inadimplência crítica |
| Warning | `#F59E0B` | Pendências, atenção |
| Info | `#3B82F6` | Informativo |

## Componentes visuais recorrentes

### Sidebar
- Largura: 240–280px desktop.
- Logo fixo no topo.
- Menu principal com item ativo em fundo verde claro e barra lateral verde.
- Card de suporte no rodapé.

### Topbar
- Unidade atual.
- Busca global.
- Ícone de notificações.
- Avatar/usuário/perfil.

### PageHeader
- Título grande.
- Descrição curta.
- Ações à direita.

### KPI cards
- Ícone circular.
- Label pequeno.
- Valor grande.
- Variação com badge contextual.

### Tabelas
- Cabeçalho leve.
- Linhas com altura confortável.
- Ações por menu `...`.
- Badges de status.
- Paginação no rodapé.

### Modais
- Overlay escuro com blur.
- Card central `rounded-3xl`.
- Título claro.
- Rodapé com ações primária/secundária.
- Aviso de auditoria quando for financeiro/estoque/documento.

### Bottom sheets mobile
- Usados para água/refeição/treino.
- Handle superior.
- CTA primário full-width.
- Inputs grandes e tocáveis.

## Regras de copy

- Evitar promessa de resultado: trocar “os resultados virão” por “continue acompanhando sua evolução”.
- Evitar “criptografia de ponta a ponta” se o backend não for E2EE real.
- Usar “Ambiente seguro” e “dados protegidos em trânsito e em repouso” quando aplicável.
- Em financeiro, ações críticas sempre com confirmação e auditoria.
- Em saúde, mostrar avisos informativos sem prescrição indevida.

## Estados obrigatórios por tela

- Loading.
- Empty.
- Error.
- Sem permissão.
- Sem configuração, quando integração externa estiver pendente.
- Erro de integração, quando provider falhar.

## Acessibilidade

- Contraste AA mínimo.
- Botões com labels, não somente ícones.
- Focus visible em todos os controles.
- Tabelas com cabeçalho semântico.
- Modais com foco preso.
- Inputs com label visível.
