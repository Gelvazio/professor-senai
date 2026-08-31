# Graph Report - BANCO_DE_DADOS  (2026-08-31)

## Corpus Check
- 3 files · ~7,746 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 23 nodes · 21 edges · 5 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0920043e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]

## God Nodes (most connected - your core abstractions)
1. `AVALIAÇÃO PRÁTICA` - 8 edges
2. `LISTAS DE VERIFICAÇÃO` - 7 edges
3. `RESULTADOS E ENTREGAS` - 4 edges
4. `CAPACIDADES DA MATRIZ DE REFERÊNCIA` - 3 edges
5. `Capacidades do Itinerário` - 3 edges
6. `Serviço Nacional de Aprendizagem Industrial - Santa Catarina` - 1 edges
7. `Capacidades SAEP` - 1 edges
8. `Capacidades Técnicas:` - 1 edges
9. `Capacidades Socioemocionais:` - 1 edges
10. `CONTEXTUALIZAÇÃO` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (5 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.29
Nodes (7): ATIVIDADE 01: Levantamento conceitual e justificativa para escolha do SGBD, ATIVIDADE 02: Diagrama Entidade-Relacionamento (DER) revisado e validado, ATIVIDADE 03: Script SQL de criação e manipulação de dados (DDL e DML), ATIVIDADE 04: Consultas SQL (relatórios e operações), ATIVIDADE 05: Aplicação de normalização até a 3ª forma normal, ATIVIDADE 06: Entrega final da Situação de Aprendizagem - Documento técnico, LISTAS DE VERIFICAÇÃO

### Community 1 - "Community 1"
Cohesion: 0.33
Nodes (5): AVALIAÇÃO PRÁTICA, CONTEXTUALIZAÇÃO, DESAFIO, Serviço Nacional de Aprendizagem Industrial - Santa Catarina, TOTAL

### Community 2 - "Community 2"
Cohesion: 0.40
Nodes (5): CAPACIDADES DA MATRIZ DE REFERÊNCIA, Capacidades do Itinerário, Capacidades SAEP, Capacidades Socioemocionais:, Capacidades Técnicas:

### Community 3 - "Community 3"
Cohesion: 0.50
Nodes (4): Aplicação funcional documentada, composta por:, Apresentação à banca técnica (Próxima semana), Contribuições da UC:, RESULTADOS E ENTREGAS

## Knowledge Gaps
- **16 isolated node(s):** `Serviço Nacional de Aprendizagem Industrial - Santa Catarina`, `Capacidades SAEP`, `Capacidades Técnicas:`, `Capacidades Socioemocionais:`, `CONTEXTUALIZAÇÃO` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AVALIAÇÃO PRÁTICA` connect `Community 1` to `Community 0`, `Community 2`, `Community 3`?**
  _High betweenness centrality (0.749) - this node is a cross-community bridge._
- **Why does `LISTAS DE VERIFICAÇÃO` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.455) - this node is a cross-community bridge._
- **Why does `CAPACIDADES DA MATRIZ DE REFERÊNCIA` connect `Community 2` to `Community 1`?**
  _High betweenness centrality (0.307) - this node is a cross-community bridge._
- **What connects `Serviço Nacional de Aprendizagem Industrial - Santa Catarina`, `Capacidades SAEP`, `Capacidades Técnicas:` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._