# Graph Report - erp-victor-anato-senai  (2026-08-14)

## Corpus Check
- 5 files · ~15,622 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 96 nodes · 111 edges · 12 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6dddcb5e`
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

## God Nodes (most connected - your core abstractions)
1. `ERP Victor Anato — Orientações de Desenvolvimento` - 12 edges
2. `Passos de Criação — ERP Victor Anato` - 11 edges
3. `Módulo 2 — COMPRAS` - 8 edges
4. `Módulo 4 — VENDAS E LOGÍSTICA` - 8 edges
5. `Supabase — Configuração e Uso da API` - 7 edges
6. `fetchComTimeout()` - 6 edges
7. `sbListar()` - 6 edges
8. `Regras Gerais de Interface` - 6 edges
9. `Módulo 1 — CADASTROS` - 5 edges
10. `Módulo 3 — ESTOQUE` - 5 edges

## Surprising Connections (you probably didn't know these)
- `sbListar()` --calls--> `fetchComTimeout()`  [EXTRACTED]
  SUPABASE.js → SUPABASE.js  _Bridges community 6 → community 7_

## Import Cycles
- None detected.

## Communities (12 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.16
Nodes (6): HEADERS, HEADERS_READ, Numerar, sbData(), sbGerarPDFPedidoCompra(), sbMoeda()

### Community 1 - "Community 1"
Cohesion: 0.15
Nodes (12): 3.1 Armazenagem, 3.2 Controle de Estoque, 3.3 Movimentações, 3.4 Inventário, 5.1 Usuários, ERP Victor Anato — Orientações de Desenvolvimento, Módulo 3 — ESTOQUE, Módulo 5 — CONFIGURAÇÕES (+4 more)

### Community 2 - "Community 2"
Cohesion: 0.17
Nodes (11): Arquivos Base, Passo 1 — Autenticação, Passo 2 — Dashboard (Visão Geral), Passo 3 — Módulo Cadastros, Passo 4 — Módulo Compras, Passo 5 — Módulo Estoque, Passo 6 — Módulo Vendas e Logística, Passo 7 — Módulo Configurações (+3 more)

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
Cohesion: 0.33
Nodes (6): Autenticação, Formulários, Listagens (tabelas), Numeração Automática, Regras Gerais de Interface, Responsividade

### Community 9 - "Community 9"
Cohesion: 0.40
Nodes (5): 1.1 Clientes, 1.2 Fornecedores, 1.3 Produtos, 1.4 Transportadoras, Módulo 1 — CADASTROS

### Community 10 - "Community 10"
Cohesion: 0.40
Nodes (5): Backend / Banco de Dados, Estrutura de arquivos HTML (uma por tela/módulo), Frontend — Vanilla JS (obrigatório), Padrões JavaScript obrigatórios, Tecnologias

### Community 11 - "Community 11"
Cohesion: 0.50
Nodes (4): sbExigirPermissao(), sbIsAdmin(), sbPerfil(), sbTemPermissao()

## Knowledge Gaps
- **54 isolated node(s):** `HEADERS`, `HEADERS_READ`, `Numerar`, `Princípios Fundamentais`, `1.1 Clientes` (+49 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ERP Victor Anato — Orientações de Desenvolvimento` connect `Community 1` to `Community 3`, `Community 4`, `Community 5`, `Community 8`, `Community 9`, `Community 10`?**
  _High betweenness centrality (0.258) - this node is a cross-community bridge._
- **Why does `Módulo 2 — COMPRAS` connect `Community 3` to `Community 1`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Why does `Módulo 4 — VENDAS E LOGÍSTICA` connect `Community 4` to `Community 1`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **What connects `HEADERS`, `HEADERS_READ`, `Numerar` to the rest of the system?**
  _54 weakly-connected nodes found - possible documentation gaps or missing edges._