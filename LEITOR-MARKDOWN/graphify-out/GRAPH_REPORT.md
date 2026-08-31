# Graph Report - LEITOR-MARKDOWN  (2026-08-31)

## Corpus Check
- 1 files · ~2,647 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 12 nodes · 11 edges · 2 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8d974242`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]

## God Nodes (most connected - your core abstractions)
1. `Conhecimentos` - 7 edges
2. `EMENTA — FUNDAMENTOS DA TECNOLOGIA E PROGRAMAÇÃO` - 5 edges
3. `Identificação da Unidade Curricular` - 1 edges
4. `Objetivo Geral` - 1 edges
5. `Capacidades Básicas e Técnicas` - 1 edges
6. `Bloco 1 — Tecnologia e Mundo Digital` - 1 edges
7. `Bloco 2 — Hardware, Software e Sistema Operacional` - 1 edges
8. `Bloco 3 — Produtividade Digital` - 1 edges
9. `Bloco 4 — Internet e Uso Seguro` - 1 edges
10. `Bloco 5 — Pensamento Computacional e Algoritmos` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (2 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.29
Nodes (7): Bloco 1 — Tecnologia e Mundo Digital, Bloco 2 — Hardware, Software e Sistema Operacional, Bloco 3 — Produtividade Digital, Bloco 4 — Internet e Uso Seguro, Bloco 5 — Pensamento Computacional e Algoritmos, Bloco 6 — Programação em Blocos (Scratch), Conhecimentos

### Community 1 - "Community 1"
Cohesion: 0.40
Nodes (4): Capacidades Básicas e Técnicas, EMENTA — FUNDAMENTOS DA TECNOLOGIA E PROGRAMAÇÃO, Identificação da Unidade Curricular, Objetivo Geral

## Knowledge Gaps
- **9 isolated node(s):** `Identificação da Unidade Curricular`, `Objetivo Geral`, `Capacidades Básicas e Técnicas`, `Bloco 1 — Tecnologia e Mundo Digital`, `Bloco 2 — Hardware, Software e Sistema Operacional` (+4 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Conhecimentos` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.818) - this node is a cross-community bridge._
- **Why does `EMENTA — FUNDAMENTOS DA TECNOLOGIA E PROGRAMAÇÃO` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.618) - this node is a cross-community bridge._
- **What connects `Identificação da Unidade Curricular`, `Objetivo Geral`, `Capacidades Básicas e Técnicas` to the rest of the system?**
  _9 weakly-connected nodes found - possible documentation gaps or missing edges._