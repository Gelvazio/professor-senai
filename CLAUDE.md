# update branch
# professor-senai — Regras do Projeto

## 🎯 CONTEXTO-PROJETO

⚠️ **ATUALIZAR ESTE CONTEXTO A CADA INTERAÇÃO COM O CHAT** — Este documento deve refletir sempre o estado mais recente do projeto.

**Data Última Atualização:** 02-09-2026 (Graphify atualizado e estrutura atual inventariada)  
**Objetivo Principal:** Implementar sistema de validação e sincronização de UCs (Unidades Curriculares) com dashboard interativo

### ✅ Implementações Realizadas

1. **REGRA 01**: Identificação de UCs e containers (FICHA-PRODUTO-MAIS-TECH)
2. **REGRA 02**: Verificação de estrutura obrigatória (AULAS, AVALIACOES, EMENTA, PLANO_ENSINO, APOSTILA)
3. **REGRA 04**: Pasta ATIVIDADES com validação automática (2 horas = 1 atividade de 15 min)
4. **REGRA 05**: Pasta SUBSTITUICOES com guia de SGN para substituição de aulas
5. **REGRA 06**: Arquivo CLAUDE.md obrigatório em cada UC para documentação
6. **REGRA 07**: Filtro de pendências — busca apenas matérias ATIVAS (ativo=1)
7. **REGRA 08**: Campo de status de matérias aceita 3 valores: 1 (Ativa), 0 (Inativa), 2 (Concluída)
8. **REGRA 09**: Campo visivel_alunos em tabela materia — Controla visibilidade (SIM=mostra para alunos | NAO=oculta) — Professor sempre vê tudo
9. **CORREÇÃO URLS VERCEL**: Funções `abrirApostilaMateria()` e `abrirEmentaMateria()` agora adicionam prefixo `sistema/` aos caminhos para URLs em produção

### 📋 Estrutura de Cursos e UCs Existentes

As seguintes UCs ou contêineres pedagógicos existem no projeto:

- `BANCO_DE_DADOS`
- `FICHA-PRODUTO-MAIS-TECH`
- `GESTAO_E_CONTROLE_MATERIAIS` — **curso/contêiner; não é matéria**
- `INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO`
- `INTRODUCAO_TIC`
- `LOGICA-PROGRAMACAO`
- `PENDENCIAS-PROFESSOR`
- `TECNICO-INFORMATICA-INTERNET` — **curso/contêiner; não é matéria**

⚠️ **Status da Estrutura Obrigatória:**
- **INTRODUCAO_TIC**: ✅ Completa (AULAS + MATERIAIS)
- **INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO**: ⚠️ Incompleta (tem AULAS, falta MATERIAIS)
- Demais UCs: ❌ Sem estrutura obrigatória (faltam AULAS e/ou MATERIAIS)

### 🔧 Ferramentas Criadas

- **syncdata/server.js**: ✅ API REST com endpoints para sincronização
- **dashboard.html**: ✅ Dashboard interativo com resumo de UCs, pendências e progresso
- **Dashboard Modal**: "Relatório SYNC" para visualizar status de sincronização

### ⏳ Ferramentas Planejadas (Não Implementadas)

- **syncdata/verify-uc.js**: Verificador de estrutura de UCs (pendente)
- **scripts/gerar_slides.js**: Script de geração de slides (pendente)
- **PLANO-AULAS.md**: Plano de aulas para "Testes de Frontend" (pendente)

### 📊 API Endpoints

- `POST /api/sync` - Sincroniza e gera relatório-pastas.json
- `GET /api/relatorio` - Retorna relatório de sincronização
- `GET /api/status` - Status do servidor
- `GET /api/aulas` - Lista de aulas escaneadas
- `GET /api/pendencias` - Lista de pendências

### 🚀 Como Usar

1. Servidor: `npm run dev` em `syncdata/` (porta 3333)
2. Dashboard: Clique em "📊 Relatório SYNC" para visualizar
3. Botão de atualizar no modal sincroniza tudo automaticamente

---

## Commit e Push obrigatórios

⚠️ **APÓS QUALQUER INTERAÇÃO NO CHAT que resulte em alteração de arquivo, faça commit e push IMEDIATAMENTE, sem perguntar e sem pedir confirmação.**

1. `git add` dos arquivos alterados
2. `git commit -m "mensagem descritiva"`
3. `git push origin main`

Isso vale para qualquer mudança, por menor que seja. Nunca questionar, nunca pedir aprovação — apenas executar.

## Graphify

Após commitar, executar:

```
graphify update .
```

O Graphify está instalado como executável do `uv` em `C:\Users\gelva\.local\bin\graphify.exe`. O módulo não está disponível no interpretador `C:\Python314\python.exe`.

**Última atualização do grafo (02-09-2026):** 198 arquivos analisados, aproximadamente 511.414 palavras, 3.759 nós, 3.873 relações e 366 comunidades.

**Exclusões do corpus:** O arquivo `.graphifyignore` impede a leitura de `sistema/PENDENCIAS-PROFESSOR/node_modules/`, pois essa pasta contém dependências geradas e não código autoral do projeto.

### Inventário atual da raiz

- Pastas principais: `.agents`, `.claude`, `.superpowers`, `.vscode`, `docs`, `graphify-out`, `scripts` e `sistema`.
- Arquivos operacionais principais: `AGENTS.md`, `CLAUDE.md`, `dashboard.html`, `PLATAFORMA_DE_IA.md`, `GEMINI.bat` e `ALIBABA_IA_OPEN_CLAUDE.bat`.
- A pasta `sistema/` concentra o conteúdo pedagógico e as aplicações do projeto.

### Inventário atual de `sistema/`

- Conteúdo pedagógico: `BANCO_DE_DADOS`, `FICHA-PRODUTO-MAIS-TECH`, `GESTAO_E_CONTROLE_MATERIAIS`, `INTRODUCAO_TIC`, `LOGICA-PROGRAMACAO` e `TECNICO-INFORMATICA-INTERNET`.
- Aplicações e apoio: `GERADOR-AULAS`, `PENDENCIAS-PROFESSOR`, `PROFESSOR`, `scripts` e `graphify-out`.
- Páginas centrais: `dashboard.html`, `index.html`, `uc.html`, `validacao.html`, `questionarios.html`, `backfill-ids.html` e `visualizador-central-aulas-pendentes.html`.
- Banco e integração: `database.sql`, `pendencias.js` e três scripts SQL em `sistema/scripts/`.

⚠️ **NUNCA perguntar se deve executar o graphify ou dar push — executar diretamente, sem confirmar, sem perguntar.**

## Nunca perguntar — sempre executar

⚠️ **NUNCA faça perguntas antes de executar uma tarefa.** Sempre execute diretamente, sem pedir confirmação, sem perguntar se deve prosseguir, sem listar opções e aguardar resposta.

Se houver ambiguidade, escolha a opção mais razoável e execute. Ajustes podem ser feitos depois.

## Slides

Todo arquivo de slide HTML deve ter **no mínimo 15 slides**.

## Estrutura de Unidades Curriculares

Em regra, cada subpasta pedagógica dentro de `sistema/` representa uma **Unidade Curricular (UC)**, salvo as pastas explicitamente classificadas como cursos ou áreas de apoio. As pastas de UC existentes são:

- `BANCO_DE_DADOS`
- `FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO`
- `INTRODUCAO_A_COMUNICACAO_ORAL_E_ESCRITA_PARA_O_MUNDO_DO_TRABALHO`
- `INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO`
- `LOGICA-PROGRAMACAO`

### Curso Gestão e Controle de Materiais

**Gestão e Controle de Materiais:** a pasta `sistema/GESTAO_E_CONTROLE_MATERIAIS/` é um **curso/contêiner de matérias**. Ela **não deve ser tratada como matéria ou UC**.

As subpastas pedagógicas dentro desse curso representam suas matérias. Atualmente, `ANALISE_DADOS_APLICADA_GESTAO/` é uma matéria identificada diretamente no curso, e agrupamentos de turma, como `TURMA_SALETE_2026_02/`, podem conter matérias adicionais.

Ao listar, validar ou acessar matérias desse curso, o sistema deve navegar dentro de `GESTAO_E_CONTROLE_MATERIAIS/` e aplicar as regras de UC às pastas de matérias, não à pasta do curso.

### Curso Técnico de Informática para Internet

**Técnico de Informática para Internet:** a pasta `sistema/TECNICO-INFORMATICA-INTERNET/` é um **curso/contêiner de matérias**. Ela **não deve ser tratada como matéria ou UC**.

As subpastas pedagógicas dentro desse curso representam suas matérias. Atualmente, `TESTES DE FRONTEND/` é uma matéria identificada no curso. A pasta `MATERIAIS-EXISTENTES/` é uma área de materiais de referência e não deve ser listada como matéria.

Ao listar, validar ou acessar matérias desse curso, o sistema deve navegar dentro de `TECNICO-INFORMATICA-INTERNET/` e aplicar as regras de UC às pastas de matérias, não à pasta do curso nem à área `MATERIAIS-EXISTENTES/`.

## Pasta PROFESSOR

A pasta `PROFESSOR/` (dentro de `sistema/`) **NÃO é uma Unidade Curricular (matéria)**. Ela contém:
- Configurações e dados de aulas para edição pelo professor
- Trabalhos e arquivos de uso exclusivo do professor

Não aplicar a ela a estrutura obrigatória de UC (`AULAS/`, `MATERIAIS/`), nem listá-la como matéria no sistema.

### Estrutura obrigatória de cada UC

Toda UC **deve conter** as subpastas:
- `AULAS/` — aulas da unidade curricular
- `MATERIAIS/` — materiais de apoio

Se uma dessas pastas não existir ao tentar acessar a UC no sistema (`uc.html`), deve ser exibido um **alerta visual** informando quais pastas estão faltando.

Ao criar ou mencionar arquivos de uma UC, use sempre o caminho `sistema/<NOME_DA_PASTA_UC>/AULAS/` ou `sistema/<NOME_DA_PASTA_UC>/MATERIAIS/`.

### Organização das provas teóricas

**Prova Teórica:** sempre em `AVALIACOES_CRIADAS/PROVA_TEORICA/`.

Todos os dados e artefatos relacionados a provas teóricas devem usar esse caminho dentro da respectiva UC, incluindo provas, recuperações, gabaritos, formulários, notas, instruções, corretores e arquivos auxiliares.

## Organização das provas práticas de Introdução à TIC

Todos os dados e artefatos de **prova prática** da UC `INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO` devem ficar em:

`sistema/INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO/AVALIACOES_CRIADAS/PROVA_PRATICA/`

Essa regra abrange provas, recuperações, corretores automáticos, gabaritos, formulários, notas, instruções e arquivos auxiliares relacionados à prova prática. Ao criar, editar, regenerar ou mencionar qualquer desses artefatos, usar sempre esse caminho e não a raiz de `AVALIACOES_CRIADAS/`.

## 🔔 Sistema de Pendências — Regra Crítica

⚠️ **EXTREMAMENTE IMPORTANTE**: O sistema de pendências **SEMPRE** deve buscar dados do **Supabase**, NUNCA apenas de localStorage ou dados locais.

### Definição de Pendências

Pendências são contadas a partir de **3 fontes** no Supabase:

1. **Campos de status nas matérias** (`materia` table):
   - `status_criacao_avaliacao` = "PENDENTE"
   - `status_plano_aula` = "PENDENTE"
   - `status_plano_ensino` = "PENDENTE"

2. **Campos de status nas avaliações** (`avaliacao` table):
   - `status_avaliacao` = "PENDENTE"
   - `status_gabarito` = "PENDENTE"
   - `status_revisao` = "PENDENTE"
   - `status_cadastro_sgn` = "PENDENTE"
   - `acompanhamento_pedagogico_sgn` = "PENDENTE"

3. **Tabela de pendências** (`pendencias` table):
   - Registros com `status` = "PENDENTE" e associados a matérias/cursos

### Implementação Obrigatória

- **uc.html**: Deve chamar função `carregarPendenciasCursos()` (ou equivalente) que busca do Supabase
- **dashboard.html**: Já implementa corretamente com `carregarPendenciasCursos()`
- **Novos componentes**: SEMPRE integrar com Supabase para pendências

### ❌ O que NÃO fazer

- ❌ Contar apenas itens de checklist local (localStorage)
- ❌ Usar dados hardcoded ou em memória
- ❌ Ignorar campos de avaliação e matérias do Supabase
- ❌ Criar sistema de pendências sem buscar do banco

### Fluxo Automático de Pendências

Quando usuário clica "Atualizar Pendências" no dashboard:

1. **BUSCA**: Procura por campos PENDENTE em matérias e avaliações
2. **INSERE**: Adiciona automaticamente registros na tabela `pendencias`
3. **CONCLUI**: Marca como "CONCLUIDA" se o status da matéria/avaliação não for mais PENDENTE
4. **LISTA**: Exibe todas as pendências na tela

Exemplo:
- Matéria tem `status_criacao_avaliacao = "PENDENTE"` → Cria pendência automaticamente
- Usuário muda para `status_criacao_avaliacao = "CONCLUIDO"` → Ao clicar "Atualizar", pendência é marcada como CONCLUIDA automaticamente

### 📊 Estrutura da Tabela "pendencias"

⚠️ **CRÍTICO**: A tabela `pendencias` deve ter SEMPRE as seguintes colunas:

**Para registros de MATÉRIAS:**
```
materia_id         (FK para tabela materia)
status_criacao_avaliacao  (VARCHAR: "PENDENTE" ou NULL)
status_plano_aula         (VARCHAR: "PENDENTE" ou NULL)
status_plano_ensino       (VARCHAR: "PENDENTE" ou NULL)
```

**Para registros de AVALIAÇÕES:**
```
materia_id                        (FK para tabela materia)
avaliacao_id                      (FK para tabela avaliacao)
status_avaliacao                  (VARCHAR: "PENDENTE" ou NULL)
status_gabarito                   (VARCHAR: "PENDENTE" ou NULL)
status_revisao                    (VARCHAR: "PENDENTE" ou NULL)
status_cadastro_sgn               (VARCHAR: "PENDENTE" ou NULL)
acompanhamento_pedagogico_sgn     (VARCHAR: "PENDENTE" ou NULL)
```

### 🔄 Fluxo de Inserção de Pendências

1. **UM registro por matéria** — não múltiplos registros
   - Se matéria tem 3 campos PENDENTE → 1 registro com os 3 campos marcados como "PENDENTE"
   - Campos não PENDENTE → NULL

2. **UM registro por avaliação** — não múltiplos registros
   - Se avaliação tem 5 campos PENDENTE → 1 registro com os 5 campos marcados como "PENDENTE"
   - Campos não PENDENTE → NULL

3. **Nenhuma duplicata**
   - Verificar se já existe registro antes de inserir
   - Se existe e tem campos não PENDENTE agora, pode ser atualizado

### ✅ Checklist de implementação

Ao implementar pendências em qualquer página:
1. ✅ Percorrer TODAS as matérias (sem filtro)
2. ✅ Percorrer TODAS as avaliações (sem filtro)
3. ✅ Para cada matéria com pelo menos 1 campo PENDENTE → inserir 1 registro em `pendencias`
4. ✅ Para cada avaliação com pelo menos 1 campo PENDENTE → inserir 1 registro em `pendencias`
5. ✅ Manter TODAS as colunas de status no registro (PENDENTE ou NULL)
6. ✅ Verificar por `materia_id` ou `avaliacao_id` para evitar duplicatas
7. ✅ CONCLUIR automaticamente pendências quando matérias/avaliações não forem mais PENDENTE
8. ✅ Mostrar badge com total de pendências nos cards

## 🎯 Implementação Completa do Sistema de Pendências (26-08-2026)

### ✅ Funcionalidades Implementadas

#### 1. **Criação Automática de Pendências**
- Função `carregarPendenciasSupabase()` busca TODAS as matérias e avaliações
- Cria automaticamente registros na tabela `pendencias` para cada campo PENDENTE
- APENAS campos com valor são inseridos (sem NULLs desnecessários)
- Campo `materia_descricao` preenchido automaticamente com `materia.descricao` (não `nome`)

#### 2. **Descrições Automáticas**
Pendências são criadas com descrições claras:

**MATÉRIAS:**
- `status_criacao_avaliacao` → "Criar avaliação"
- `status_plano_aula` → "Criar plano de aula"
- `status_plano_ensino` → "Criar plano de ensino"
- Formato final: `"Descrição — Nome da Matéria"`

**AVALIAÇÕES:**
- `status_avaliacao` → "Completar avaliação"
- `status_gabarito` → "Criar gabarito"
- `status_revisao` → "Revisar avaliação"
- `status_cadastro_sgn` → "Cadastrar no SGN"
- `acompanhamento_pedagogico_sgn` → "Acompanhamento pedagógico"
- Formato final: `"Descrição — Nome da Avaliação"`

#### 3. **Sincronização Bidirecional**
Quando pendência está com status = 'CONCLUIDO':
- Busca o campo correspondente na tabela de origem (materia ou avaliacao)
- **APENAS marca como CONCLUIDO o campo específico que estava PENDENTE**
- Não toca em campos NULL ou com outros valores

#### 4. **Interface de Pendências**
- **Botão Toggle (✓)**: Marcar pendência como CONCLUIDO/PENDENTE
  - Cinza quando PENDENTE
  - Verde quando CONCLUIDO
  - Primeiro botão em cada linha
- **Botão Editar (✏️)**: Editar descrição, datas, horas
- **Botão Excluir (🗑️)**: Remover pendência individual
- **Botão Excluir Todas (🗑️)**: Deleta TODAS as pendências com confirmação dupla

#### 5. **Campos da Tabela `pendencias`**
```sql
id (PK)
materia_id (FK não-nulo)
avaliacao_id (FK nulo se apenas matéria)
materia_descricao (VARCHAR)
descricao (TEXT)
status (VARCHAR: PENDENTE, CONCLUIDA, CANCELADA)
data (DATE)
datavencimento (DATE)
total_horas (NUMERIC)
horas_ministradas (NUMERIC)
status_criacao_avaliacao (VARCHAR: PENDENTE ou NULL)
status_plano_aula (VARCHAR: PENDENTE ou NULL)
status_plano_ensino (VARCHAR: PENDENTE ou NULL)
status_avaliacao (VARCHAR: PENDENTE ou NULL)
status_gabarito (VARCHAR: PENDENTE ou NULL)
status_revisao (VARCHAR: PENDENTE ou NULL)
status_cadastro_sgn (VARCHAR: PENDENTE ou NULL)
acompanhamento_pedagogico_sgn (VARCHAR: PENDENTE ou NULL)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### 📋 Scripts SQL Necessários

1. **Criar tabela**: `sistema/scripts/001_criar_tabela_pendencias.sql`
2. **Adicionar colunas faltantes**: `sistema/scripts/003_add_columns_pendencias.sql`

Certifique-se de executar os scripts no Supabase SQL Editor!

### ⚡ Fluxo de Atualização Obrigatório

⚠️ **REGRA CRÍTICA**: A cada interação com o usuário, SEMPRE:
1. Executar `C:\Python314\python.exe -m graphify update .`
2. Atualizar este arquivo `CLAUDE.md` com:
   - Novas regras implementadas
   - Mudanças no estado do projeto
   - Estrutura de UCs
   - Status de ferramentas
3. Fazer commit de todas as alterações

Isso garante que futuras interações saibam das mudanças feitas e o projeto sempre esteja documentado corretamente.
