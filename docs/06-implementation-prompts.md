# Prompts de Implementação

## Prompt A — Design system e layout

```text
Implemente o design system EmagrecePlus com Tailwind.
Use tailwind.config.ts, globals.css, Button, Card, Badge, Input, SelectField, StatCard, DataTable, Modal, Sidebar/Topbar e DashboardShell.
Não implemente regra de negócio.
Rode typecheck/build.
```

## Prompt B — Auth e unidade

```text
Implemente login, seleção de unidade e shell de dashboard.
Supabase Auth como fonte de sessão.
RLS/tenant isolation desde o início.
Estados: loading, sem unidade, sem permissão.
```

## Prompt C — Financeiro clínico

```text
Implemente finance foundation com Supabase-first:
finance.charges, installments, payments, cash_registers, cash_movements, payouts.
Criar Contas a Receber, Registrar Pagamento, Caixa e Repasses.
Não integrar Asaas real ainda; criar provider unconfigured/simulated.
```

## Prompt D — Asaas readiness

```text
Preparar integração Asaas sem chamar API real.
Criar adapter contract, modes unconfigured/simulated/real stub, webhook token validator, fixtures de pagamento, idempotência.
Atualizar .env.example sem secrets.
```

## Prompt E — Serviços e pacotes

```text
Implementar catálogo de serviços e pacotes.
Criar builder de pacote com serviços, preço, parcelamento, acessos do paciente e limites.
Criar fluxo vender pacote: paciente, pacote, pagamento, contrato, confirmação.
```

## Prompt F — Estoque

```text
Implementar inventory foundation:
items, lots, movements, suppliers, purchase_orders.
Criar dashboard estoque, lista de itens, detalhe, entrada e saída.
Garantir RLS, auditoria e bloqueio de saída acima do saldo.
```

## Prompt G — Relatórios

```text
Criar relatórios financeiros, pacotes, estoque, visão executiva e relatório do paciente.
Começar com read models/RPCs Supabase e UI.
Exportações podem ser stub até provider de PDF/Excel ser definido.
```

## Prompt H — D4Sign real

```text
Implementar D4Sign real somente com credenciais sandbox e estratégia HMAC confirmada.
Não promover verified sem HMAC + consulta oficial + hashes + dossiê + pacote.
```
