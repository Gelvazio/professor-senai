# Graph Report - erp-victor-anato-senai  (2026-08-15)

## Corpus Check
- 7 files · ~61,912 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 103 nodes · 118 edges · 11 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bc6b0fbb`
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
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]

## God Nodes (most connected - your core abstractions)
1. `Responsividade` - 10 edges
2. `Módulo 2 — COMPRAS` - 8 edges
3. `Módulo 4 — VENDAS E LOGÍSTICA` - 8 edges
4. `Supabase — Configuração e Uso da API` - 7 edges
5. `fetchComTimeout()` - 6 edges
6. `sbListar()` - 6 edges
7. `Regras Gerais de Interface` - 6 edges
8. `Módulo 1 — CADASTROS` - 5 edges
9. `Módulo 3 — ESTOQUE` - 5 edges
10. `Tecnologias` - 5 edges

## Surprising Connections (you probably didn't know these)
- `sbListar()` --calls--> `fetchComTimeout()`  [EXTRACTED]
  SUPABASE.js → SUPABASE.js  _Bridges community 6 → community 7_

## Import Cycles
- None detected.

## Communities (11 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.16
Nodes (6): HEADERS, HEADERS_READ, Numerar, sbData(), sbGerarPDFPedidoCompra(), sbMoeda()

### Community 1 - "Community 1"
Cohesion: 0.12
Nodes (16): 1.1 Clientes, 1.2 Fornecedores, 1.3 Produtos, 1.4 Transportadoras, 5.1 Usuários, Backend / Banco de Dados, Estrutura de arquivos HTML (uma por tela/módulo), Frontend — Vanilla JS (obrigatório) (+8 more)

### Community 2 - "Community 2"
Cohesion: 0.18
Nodes (10): Arquivos Base, Passo 1 — Autenticação, Passo 2 — Dashboard (Visão Geral), Passo 3 — Módulo Cadastros, Passo 4 — Módulo Compras, Passo 5 — Módulo Estoque, Passo 6 — Módulo Vendas e Logística, Passo 7 — Módulo Configurações (+2 more)

### Community 3 - "Community 3"
Cohesion: 0.25
Nodes (8): 2.1 Planejamento, 2.2 Solicitação de Compras, 2.3 Pedido de Compras, 2.4 Recebimento, 2.5 Conferência, 2.6 Entrada de Nota Fiscal, Fluxo do Módulo de Compras, Módulo 2 — COMPRAS

### Community 4 - "Community 4"
Cohesion: 0.25
Nodes (8): 4.1 Pedido de Venda, 4.2 Nota Fiscal de Venda, 4.3 Romaneio, 4.4 Separação (Picking), 4.5 Expedição, 4.6 Entrega, Fluxo do Módulo de Vendas e Logística, Módulo 4 — VENDAS E LOGÍSTICA

### Community 5 - "Community 5"
Cohesion: 0.29
Nodes (7): Autenticação do ERP, Credenciais, Esquema de tabelas do banco (PostgreSQL), Filtros e operadores da API REST Supabase, Padrão de CRUD — funções reutilizáveis, RLS (Row Level Security), Supabase — Configuração e Uso da API

### Community 6 - "Community 6"
Cohesion: 0.29
Nodes (7): fetchComTimeout(), sbAtualizar(), sbContar(), sbExcluir(), sbInserir(), sbMovimentarEstoque(), sbUserNome()

### Community 7 - "Community 7"
Cohesion: 0.29
Nodes (7): sbBuscar(), sbListar(), sbLogin(), sbPopularSelect(), sbProximoNumero(), sbVerificarEstoque(), sha256()

### Community 8 - "Community 8"
Cohesion: 0.13
Nodes (15): Autenticação, Breakpoints obrigatórios, CSS proibido em mobile, Formulários, Formulários, Header, Layout geral, Listagens (tabelas) (+7 more)

### Community 10 - "Community 10"
Cohesion: 0.40
Nodes (5): 3.1 Armazenagem, 3.2 Controle de Estoque, 3.3 Movimentações, 3.4 Inventário, Módulo 3 — ESTOQUE

### Community 11 - "Community 11"
Cohesion: 0.50
Nodes (4): sbExigirPermissao(), sbIsAdmin(), sbPerfil(), sbTemPermissao()

## Knowledge Gaps
- **62 isolated node(s):** `HEADERS`, `HEADERS_READ`, `Numerar`, `Princípios Fundamentais`, `1.1 Clientes` (+57 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Regras Gerais de Interface` connect `Community 8` to `Community 1`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **Why does `Módulo 2 — COMPRAS` connect `Community 3` to `Community 1`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **What connects `HEADERS`, `HEADERS_READ`, `Numerar` to the rest of the system?**
  _62 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `Community 8` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._