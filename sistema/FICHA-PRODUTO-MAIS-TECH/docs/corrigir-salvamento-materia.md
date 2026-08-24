# Corrigir Salvamento de Matéria

**Objetivo:** Corrigir o cadastro de matéria quando o banco ainda não possui a coluna `ementa_caminho` e impedir registros órfãos se o vínculo com o curso falhar.

**Tech Stack:** HTML, JavaScript e Supabase REST

---

## Status Geral

| Passo | Descrição | Status |
|---|---|---|
| 1 | Rastrear a origem da mensagem | ✅ Concluído |
| 2 | Identificar a incompatibilidade de esquema | ✅ Concluído |
| 3 | Implementar salvamento compatível | ✅ Concluído |
| 4 | Commit e push | 🔄 Em progresso |

---

### Passo 1: Rastrear a origem

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Localizar `salvarMateriaCurso()` e as chamadas REST realizadas no cadastro.

**Verificação:** Inspeção estática do código, sem execução de testes.

---

### Passo 2: Identificar a causa

**Status:** ✅ Concluído

**Arquivo:** Consultar `sistema/supabase-materias-mais-tech.sql`

**Ação:** Comparar o payload do formulário com a migração que adiciona `ementa_caminho`.

**Verificação:** Confirmar que a coluna foi introduzida depois do fluxo original de matérias.

---

### Passo 3: Implementar a correção

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Repetir a gravação sem `ementa_caminho` apenas quando o Supabase informar que essa coluna não existe; remover a matéria recém-criada se o vínculo com o curso falhar; apresentar mensagem de erro mais útil.

**Verificação:** Revisão estática do fluxo, sem testes, navegador ou servidor.

---

### Passo 4: Commit e push

**Status:** 🔄 Em progresso

**Arquivo:** Todos os arquivos alterados nesta tarefa.

**Ação:** Versionar e enviar as alterações ao branch `main`.

**Verificação:** Conferir a saída dos comandos Git.
