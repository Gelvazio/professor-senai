# Acompanhamentos Pedagógicos SGN nas Avaliações

**Objetivo:** Adicionar às avaliações o campo Acompanhamentos Pedagógicos (SGN), com os estados Sem alunos, Pendente e Concluído.

**Tech Stack:** HTML, JavaScript, Supabase REST e PostgreSQL

---

## Status Geral

| Passo | Descrição | Status |
|---|---|---|
| 1 | Atualizar estrutura SQL | ✅ Concluído |
| 2 | Adicionar campo ao formulário | ✅ Concluído |
| 3 | Integrar carregamento, edição e salvamento | ✅ Concluído |
| 4 | Exibir o status no cartão | ✅ Concluído |
| 5 | Commit e push | 🔄 Em progresso |

---

### Passo 1: Atualizar estrutura SQL

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/supabase-avaliacoes.sql`

**Ação:** Criar a coluna `acompanhamento_pedagogico_sgn`, com padrão `PENDENTE` e restrição para `SEM_ALUNOS`, `PENDENTE` e `CONCLUIDO`.

**Verificação:** Revisão estática do SQL, sem execução no banco.

---

### Passo 2: Adicionar campo ao formulário

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Adicionar um seletor com as três opções solicitadas.

**Verificação:** Revisão estática do HTML, sem navegador.

---

### Passo 3: Integrar os dados

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Definir valor inicial, carregar valor existente na edição e enviar o campo ao Supabase.

**Verificação:** Revisão estática do JavaScript, sem testes.

---

### Passo 4: Exibir no cartão

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Mostrar Acompanhamentos Pedagógicos (SGN) junto às etapas da avaliação.

**Verificação:** Revisão estática do template, sem validação visual.

---

### Passo 5: Commit e push

**Status:** 🔄 Em progresso

**Arquivo:** Todos os arquivos alterados nesta tarefa.

**Ação:** Versionar e enviar as alterações ao branch `main`.

**Verificação:** Conferir a saída dos comandos Git.
