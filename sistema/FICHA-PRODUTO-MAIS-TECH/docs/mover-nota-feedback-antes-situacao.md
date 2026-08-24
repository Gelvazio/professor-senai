# Mover Nota e Feedback Antes da Situação-Problema

**Objetivo:** Posicionar os campos de nota final e feedback imediatamente antes da situação-problema, preservando o restante da avaliação.

**Tech Stack:** Python e python-docx

---

## Status Geral

| Passo | Descrição | Status |
|---|---|---|
| 1 | Reposicionar nota e feedback | ✅ Concluído |
| 2 | Gerar novamente o DOCX | ✅ Concluído |
| 3 | Commit e push | 🔄 Em progresso |

---

### Passo 1: Reposicionar nota e feedback

**Status:** ✅ Concluído

**Arquivo:** Modificar `scripts/gerar_avaliacao_pratica_comunicacao.py`

**Ação:** Mover `Nota final` e `Feedback do professor` para imediatamente antes de `1. Situação-problema`.

**Verificação:** Conferência do código, sem execução de testes.

---

### Passo 2: Gerar novamente o documento

**Status:** ✅ Concluído

**Arquivo:** Modificar `INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/AVALIACOES/AVALIACAO_PRATICA_COMUNICACAO_ORAL_ESCRITA.docx`

**Ação:** Executar o gerador preservando o estilo atual.

**Verificação:** Não executar testes nem validação visual, conforme regra do projeto.

---

### Passo 3: Commit e push

**Status:** 🔄 Em progresso

**Arquivo:** Todos os arquivos alterados nesta tarefa.

**Ação:** Versionar e enviar as alterações ao branch `main`.

**Verificação:** Conferir a saída dos comandos Git.
