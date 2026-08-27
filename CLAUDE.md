# update branch
# professor-senai — Regras do Projeto

## Commit e Push obrigatórios

⚠️ **APÓS QUALQUER INTERAÇÃO NO CHAT que resulte em alteração de arquivo, faça commit e push IMEDIATAMENTE, sem perguntar e sem pedir confirmação.**

1. `git add` dos arquivos alterados
2. `git commit -m "mensagem descritiva"`
3. `git push origin main`

Isso vale para qualquer mudança, por menor que seja. Nunca questionar, nunca pedir aprovação — apenas executar.

## Graphify

Após commitar, executar:

```
C:\Python314\python.exe -m graphify update .
```

⚠️ **NUNCA perguntar se deve executar o graphify ou dar push — executar diretamente, sem confirmar, sem perguntar.**

## Nunca perguntar — sempre executar

⚠️ **NUNCA faça perguntas antes de executar uma tarefa.** Sempre execute diretamente, sem pedir confirmação, sem perguntar se deve prosseguir, sem listar opções e aguardar resposta.

Se houver ambiguidade, escolha a opção mais razoável e execute. Ajustes podem ser feitos depois.

## Slides

Todo arquivo de slide HTML deve ter **no mínimo 15 slides**.

## Estrutura de Unidades Curriculares

Cada subpasta dentro de `sistema/` representa uma **Unidade Curricular (UC)**. As pastas existentes são:

- `BANCO_DE_DADOS`
- `FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO`
- `INTRODUCAO_A_COMUNICACAO_ORAL_E_ESCRITA_PARA_O_MUNDO_DO_TRABALHO`
- `INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO`
- `LOGICA-PROGRAMACAO`
- `TECNICO DE INFORMATICA PARA INTERNET`

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

### ✅ Checklist de implementação

Ao implementar pendências em qualquer página:
1. ✅ Buscar tabelas `cursomateria`, `materia`, `avaliacao` do Supabase
2. ✅ Filtrar **apenas matérias ensaladas** (`ensalado === true`)
3. ✅ Contar campos com status "PENDENTE" em todos os 3 locais
4. ✅ INSERIR automaticamente pendências encontradas na tabela `pendencias`
5. ✅ CONCLUIR automaticamente pendências quando matérias/avaliações não forem mais PENDENTE
6. ✅ Agregar pendências por curso/matéria
7. ✅ Cachear resultados com timeout (ex: 5 minutos)
8. ✅ Mostrar badge com total de pendências nos cards
