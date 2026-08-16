# Andamento — Módulo Vendas e Logística

Arquivo de rastreamento de tarefas do módulo de Vendas e Logística.

---

## Fluxo

```
Pedido de Venda → NF Venda → Separação → Romaneio → Expedição → Entrega
```

---

## Telas

| # | Tela | Status | Observação |
|---|------|--------|------------|
| 1 | `vendas/pedidos-venda.html` | ✅ Concluído | CRUD com numeração PV00001 |
| 2 | `vendas/nota-fiscal-venda.html` | ✅ Concluído | CRUD completo com campos fiscais |
| 3 | `vendas/televendas.html` | ✅ Concluído | CRUD com pipeline de status |
| 4 | `vendas/logistica.html` | ✅ Concluído | Painel pipeline logístico |
| 5 | `vendas/separacao.html` | ✅ Concluído | CRUD com numeração SEP00001 |
| 6 | `vendas/romaneio.html` | ✅ Concluído | CRUD com numeração ROM00001 |
| 7 | `vendas/expedicao.html` | ✅ Concluído | CRUD com numeração EXP00001 |
| 8 | `vendas/entrega.html` | ✅ Concluído | CRUD com numeração ENT00001 |

---

## Banco de Dados (Supabase)

| Tabela | Status |
|--------|--------|
| `vendas_pedidos` | ❌ A criar |
| `vendas_notas_fiscais` | ❌ A criar |
| `vendas_separacoes` | ❌ A criar |
| `vendas_romaneios` | ❌ A criar |
| `vendas_expedicoes` | ❌ A criar |
| `vendas_entregas` | ❌ A criar |
| `televendas` | ❌ A criar |

---

## Legenda

- ✅ Concluído
- 🔄 Em andamento
- ❌ Não iniciado
