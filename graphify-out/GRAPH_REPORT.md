# Graph Report - professor-senai  (2026-08-06)

## Corpus Check
- 4 files · ~66,507 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 46 nodes · 44 edges · 8 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `682371c6`
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

## God Nodes (most connected - your core abstractions)
1. `Conhecimentos` - 10 edges
2. `Unidade Curricular 1: Introdução à Tecnologia da Informação e Comunicação` - 8 edges
3. `Conhecimentos` - 7 edges
4. `SENAI — Projeto de Curso: Aprendizagem Industrial` - 6 edges
5. `Unidade Curricular 2: Saúde e Segurança no Trabalho` - 6 edges
6. `Configuração Supabase` - 5 edges
7. `4. Software de Escritório` - 4 edges
8. `5. Informática` - 3 edges
9. `Regras de Trabalho — Claude` - 3 edges
10. `Módulo Educação para o Trabalho` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (8 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.18
Nodes (11): 1. Comunicação em Equipes de Trabalho, 2. Segurança da Informação, 3. Internet (World Wide Web), 5.1. Fundamentos de Hardware, 5.2. Sistema Operacional, 5. Informática, 6. Textos Técnicos, 7. Comunicação (+3 more)

### Community 1 - "Community 1"
Cohesion: 0.29
Nodes (7): 1. O Impacto da Falta de Ética nos Ambientes de Trabalho, 2. Código de Ética Profissional, 3. Acidentes do Trabalho e Doenças Ocupacionais, 4. Medidas de Controle, 5. Riscos Ocupacionais, 6. Segurança do Trabalho, Conhecimentos

### Community 2 - "Community 2"
Cohesion: 0.29
Nodes (7): Ambientes Pedagógicos e Recursos, Capacidades Básicas, Capacidades Socioemocionais, Carga Horária, Eixo Estruturante BNCC / Competência Integradora, Ferramentas de Ensino, Unidade Curricular 1: Introdução à Tecnologia da Informação e Comunicação

### Community 3 - "Community 3"
Cohesion: 0.33
Nodes (5): ✅ Commit e Push obrigatórios, Módulo Educação para o Trabalho, Regras de Trabalho — Claude, SENAI — Projeto de Curso: Aprendizagem Industrial, ✅ Slides devem ter no mínimo 15 slides

### Community 4 - "Community 4"
Cohesion: 0.40
Nodes (5): Ambientes Pedagógicos e Recursos, Capacidades Básicas, Capacidades Socioemocionais, Eixo Estruturante BNCC / Competência Integradora, Unidade Curricular 2: Saúde e Segurança no Trabalho

### Community 5 - "Community 5"
Cohesion: 0.40
Nodes (5): Configuração Supabase, Controle de perfil (frontend), Estrutura `gabaritos` (coluna JSONB da tabela `curso`), Funções RPC disponíveis, Tabela `curso`

### Community 6 - "Community 6"
Cohesion: 0.50
Nodes (4): 4.1. Editor de Textos, 4.2. Editor de Planilhas Eletrônicas, 4.3. Editor de Apresentações, 4. Software de Escritório

## Knowledge Gaps
- **35 isolated node(s):** `Módulo Educação para o Trabalho`, `Carga Horária`, `Capacidades Básicas`, `1. Comunicação em Equipes de Trabalho`, `2. Segurança da Informação` (+30 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SENAI — Projeto de Curso: Aprendizagem Industrial` connect `Community 3` to `Community 2`, `Community 4`, `Community 5`?**
  _High betweenness centrality (0.642) - this node is a cross-community bridge._
- **Why does `Unidade Curricular 1: Introdução à Tecnologia da Informação e Comunicação` connect `Community 2` to `Community 0`, `Community 3`?**
  _High betweenness centrality (0.594) - this node is a cross-community bridge._
- **Why does `Conhecimentos` connect `Community 0` to `Community 2`, `Community 6`?**
  _High betweenness centrality (0.507) - this node is a cross-community bridge._
- **What connects `Módulo Educação para o Trabalho`, `Carga Horária`, `Capacidades Básicas` to the rest of the system?**
  _35 weakly-connected nodes found - possible documentation gaps or missing edges._