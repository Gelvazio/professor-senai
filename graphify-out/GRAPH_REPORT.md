# Graph Report - professor-senai  (2026-08-07)

## Corpus Check
- 8 files · ~92,338 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 106 nodes · 100 edges · 10 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `887981af`
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
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]

## God Nodes (most connected - your core abstractions)
1. `/graphify` - 15 edges
2. `What You Must Do When Invoked` - 14 edges
3. `Conhecimentos` - 10 edges
4. `Documentação Padrão` - 8 edges
5. `Unidade Curricular 1: Introdução à Tecnologia da Informação e Comunicação` - 8 edges
6. `Conhecimentos` - 7 edges
7. `SENAI — Projeto de Curso: Aprendizagem Industrial` - 6 edges
8. `Unidade Curricular 2: Saúde e Segurança no Trabalho` - 6 edges
9. `Global Constraints` - 5 edges
10. `Design: Botão "Analise Ementas" no Modal de Aulas` - 5 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (10 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.13
Nodes (15): 1. Comunicação em Equipes de Trabalho, 2. Segurança da Informação, 3. Internet (World Wide Web), 4.1. Editor de Textos, 4.2. Editor de Planilhas Eletrônicas, 4.3. Editor de Apresentações, 4. Software de Escritório, 5.1. Fundamentos de Hardware (+7 more)

### Community 1 - "Community 1"
Cohesion: 0.17
Nodes (12): 1. O Impacto da Falta de Ética nos Ambientes de Trabalho, 2. Código de Ética Profissional, 3. Acidentes do Trabalho e Doenças Ocupacionais, 4. Medidas de Controle, 5. Riscos Ocupacionais, 6. Segurança do Trabalho, Ambientes Pedagógicos e Recursos, Capacidades Básicas (+4 more)

### Community 2 - "Community 2"
Cohesion: 0.15
Nodes (12): Ambientes Pedagógicos e Recursos, Capacidades Básicas, Capacidades Socioemocionais, Carga Horária, ✅ Commit e Push obrigatórios, Eixo Estruturante BNCC / Competência Integradora, Ferramentas de Ensino, Módulo Educação para o Trabalho (+4 more)

### Community 3 - "Community 3"
Cohesion: 0.40
Nodes (5): Configuração Supabase, Controle de perfil (frontend), Estrutura `gabaritos` (coluna JSONB da tabela `curso`), Funções RPC disponíveis, Tabela `curso`

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (15): For --cluster-only, For git commit hook, For /graphify add, For /graphify explain, For /graphify path, For /graphify query, For native CLAUDE.md integration, For --update (incremental re-extraction) (+7 more)

### Community 5 - "Community 5"
Cohesion: 0.12
Nodes (17): Part A - Structural extraction for code files, Part B - Semantic extraction (parallel subagents), Part C - Merge AST + semantic into final extraction, Step 1 - Ensure graphify is installed, Step 2.5 - Transcribe video / audio files (only if video files detected), Step 2 - Detect files, Step 3 - Extract entities and relationships, Step 4 - Build graph, cluster, analyze, generate outputs (+9 more)

### Community 6 - "Community 6"
Cohesion: 0.22
Nodes (8): Documentação Padrão, Fluxo Obrigatório, Modelo do Arquivo, Overview, Red Flags — PARE e Corrija, Regras, Regras dos Passos, Ícones de Status

### Community 8 - "Community 8"
Cohesion: 0.20
Nodes (9): 1. Botão "Analise Ementas", 2. Modal `ementaAnaliseModal`, 3. Lógica de Matching, 4. Keywords por Tópico, Arquivos Modificados, Contexto, Design: Botão "Analise Ementas" no Modal de Aulas, Não está no escopo (+1 more)

### Community 9 - "Community 9"
Cohesion: 0.25
Nodes (7): Analise Ementas — Implementation Plan, Global Constraints, Self-Review, Task 1: CSS — Estilos do botão e do modal de análise, Task 2: HTML — Botão na toolbar e modal de análise, Task 3: JavaScript — Dicionário, matching e funções de abrir/fechar, Task 4: Commit e push

## Knowledge Gaps
- **82 isolated node(s):** `Overview`, `Fluxo Obrigatório`, `Regras`, `Ícones de Status`, `Modelo do Arquivo` (+77 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SENAI — Projeto de Curso: Aprendizagem Industrial` connect `Community 2` to `Community 1`, `Community 3`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `Unidade Curricular 1: Introdução à Tecnologia da Informação e Comunicação` connect `Community 2` to `Community 0`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Why does `Conhecimentos` connect `Community 0` to `Community 2`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **What connects `Overview`, `Fluxo Obrigatório`, `Regras` to the rest of the system?**
  _82 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Should `Community 5` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._