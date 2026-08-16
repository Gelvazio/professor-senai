# Graph Report - erp-victor-anato-senai  (2026-08-16)

## Corpus Check
- 14 files · ~258,564 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 120 nodes · 137 edges · 19 communities (17 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `12ea4cd6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 18|Community 18]]

## God Nodes (most connected - your core abstractions)
1. `Responsividade` - 10 edges
2. `sbListar()` - 8 edges
3. `Módulo 2 — COMPRAS` - 8 edges
4. `Módulo 4 — VENDAS E LOGÍSTICA` - 8 edges
5. `Supabase — Configuração e Uso da API` - 7 edges
6. `fetchComTimeout()` - 6 edges
7. `Regras Gerais de Interface` - 6 edges
8. `sbIsAdmin()` - 5 edges
9. `Módulo 1 — CADASTROS` - 5 edges
10. `Módulo 3 — ESTOQUE` - 5 edges

## Surprising Connections (you probably didn't know these)
- `sbListar()` --calls--> `fetchComTimeout()`  [EXTRACTED]
  SUPABASE.js → SUPABASE.js  _Bridges community 6 → community 7_
- `sbLogin()` --calls--> `sbListar()`  [EXTRACTED]
  SUPABASE.js → SUPABASE.js  _Bridges community 7 → community 18_
- `sbFiltrarSidebar()` --calls--> `sbIsAdmin()`  [EXTRACTED]
  SUPABASE.js → SUPABASE.js  _Bridges community 11 → community 7_

## Import Cycles
- None detected.

## Communities (19 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.14
Nodes (7): HEADERS, HEADERS_READ, Numerar, sbBindEstadoCidade(), sbCarregarCidades(), sbInitSidebarAccordion(), _tryInit()

### Community 1 - "Community 1"
Cohesion: 0.40
Nodes (5): 3.1 Armazenagem, 3.2 Controle de Estoque, 3.3 Movimentações, 3.4 Inventário, Módulo 3 — ESTOQUE

### Community 2 - "Community 2"
Cohesion: 0.18
Nodes (10): Arquivos Base, Passo 1 — Autenticação, Passo 2 — Dashboard (Visão Geral), Passo 3 — Módulo Cadastros, Passo 4 — Módulo Compras, Passo 5 — Módulo Estoque, Passo 6 — Módulo Vendas e Logística, Passo 7 — Módulo Configurações (+2 more)

### Community 3 - "Community 3"
Cohesion: 0.25
Nodes (8): 4.1 Pedido de Venda, 4.2 Nota Fiscal de Venda, 4.3 Romaneio, 4.4 Separação (Picking), 4.5 Expedição, 4.6 Entrega, Fluxo do Módulo de Vendas e Logística, Módulo 4 — VENDAS E LOGÍSTICA

### Community 4 - "Community 4"
Cohesion: 0.10
Nodes (20): 2.1 Planejamento, 2.2 Solicitação de Compras, 2.3 Pedido de Compras, 2.4 Recebimento, 2.5 Conferência, 2.6 Entrada de Nota Fiscal, 5.1 Usuários, Backend / Banco de Dados (+12 more)

### Community 5 - "Community 5"
Cohesion: 0.40
Nodes (5): 1.1 Clientes, 1.2 Fornecedores, 1.3 Produtos, 1.4 Transportadoras, Módulo 1 — CADASTROS

### Community 6 - "Community 6"
Cohesion: 0.29
Nodes (7): fetchComTimeout(), sbAtualizar(), sbContar(), sbExcluir(), sbInserir(), sbMovimentarEstoque(), sbUserNome()

### Community 7 - "Community 7"
Cohesion: 0.33
Nodes (7): sbBuscar(), _sbCarregarTelasJson(), sbFiltrarSidebar(), sbListar(), sbPopularSelect(), sbProximoNumero(), sbVerificarEstoque()

### Community 8 - "Community 8"
Cohesion: 0.13
Nodes (15): Autenticação, Breakpoints obrigatórios, CSS proibido em mobile, Formulários, Formulários, Header, Layout geral, Listagens (tabelas) (+7 more)

### Community 9 - "Community 9"
Cohesion: 0.29
Nodes (7): Autenticação do ERP, Credenciais, Esquema de tabelas do banco (PostgreSQL), Filtros e operadores da API REST Supabase, Padrão de CRUD — funções reutilizáveis, RLS (Row Level Security), Supabase — Configuração e Uso da API

### Community 10 - "Community 10"
Cohesion: 0.67
Nodes (3): sbData(), sbGerarPDFPedidoCompra(), sbMoeda()

### Community 11 - "Community 11"
Cohesion: 0.33
Nodes (6): _sbConfigPath(), sbExigirPermissao(), sbInjetarMenuConfiguracoes(), sbIsAdmin(), sbPerfil(), sbTemPermissao()

## Knowledge Gaps
- **64 isolated node(s):** `HEADERS`, `HEADERS_READ`, `Numerar`, `Graphify — Atualização obrigatória após cada tarefa`, `Princípios Fundamentais` (+59 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Regras Gerais de Interface` connect `Community 8` to `Community 4`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **What connects `HEADERS`, `HEADERS_READ`, `Numerar` to the rest of the system?**
  _64 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.14166666666666666 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `Community 8` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._