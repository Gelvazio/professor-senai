# Andamento — Módulo Compras

Arquivo de rastreamento de tarefas do módulo de Compras.

---

## Fluxo

```
Planejamento → Solicitação → Pedido → Recebimento → Conferência → Nota Fiscal
```

---

## Telas

| # | Tela | Status | Observação |
|---|------|--------|------------|
| 1 | `compras/planejamento.html` | ✅ Concluído | CRUD completo |
| 2 | `compras/solicitacoes.html` | ✅ Concluído | CRUD com numeração SC00001 |
| 3 | `compras/pedidos.html` | ✅ Concluído | CRUD com PDF e numeração PC00001 |
| 4 | `compras/recebimento.html` | ✅ Concluído | CRUD com numeração RC00001 |
| 5 | `compras/conferencia.html` | ✅ Concluído | CRUD completo |
| 6 | `compras/nota-fiscal.html` | ✅ Concluído | CRUD com atualização de estoque |

---

## Banco de Dados (Supabase)

| Tabela | Status |
|--------|--------|
| `compras_planejamento` | ❌ A criar |
| `compras_solicitacoes` | ❌ A criar |
| `compras_pedidos` | ❌ A criar |
| `compras_recebimentos` | ❌ A criar |
| `compras_conferencias` | ❌ A criar |
| `compras_notas_fiscais` | ❌ A criar |

---

## Legenda

- ✅ Concluído
- 🔄 Em andamento
- ❌ Não iniciado
