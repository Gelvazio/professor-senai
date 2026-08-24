# Mover Critérios de Avaliação para o Final

**Objetivo:** Preservar a formatação da avaliação prática e posicionar os critérios de avaliação como último bloco do documento.

**Tech Stack:** Python e python-docx

---

## Status Geral

| Passo | Descrição | Status |
|---|---|---|
| 1 | Identificar a ordem atual das seções | ✅ Concluído |
| 2 | Reordenar autoavaliação e critérios | ✅ Concluído |
| 3 | Gerar novamente o DOCX | ✅ Concluído |
| 4 | Commit e push | 🔄 Em progresso |

---

### Passo 1: Identificar a ordem atual

**Status:** ✅ Concluído

**Arquivo:** Modificar `scripts/gerar_avaliacao_pratica_comunicacao.py`

**Ação:** Confirmar que a autoavaliação aparece depois da rubrica.

**Verificação:** Leitura do script, sem execução de testes.

---

### Passo 2: Reordenar as seções

**Status:** ✅ Concluído

**Arquivo:** Modificar `scripts/gerar_avaliacao_pratica_comunicacao.py`

**Ação:** Posicionar a autoavaliação antes dos critérios e manter a rubrica, nota e feedback no encerramento.

**Verificação:** Conferência do código, sem testes ou validação visual.

---

### Passo 3: Gerar novamente o documento

**Status:** ✅ Concluído

**Arquivo:** Modificar `INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/AVALIACOES/AVALIACAO_PRATICA_COMUNICACAO_ORAL_ESCRITA.docx`

**Ação:** Executar o gerador com a nova ordem das seções.

**Verificação:** Não executar testes, conforme regra do projeto.

---

### Passo 4: Commit e push

**Status:** 🔄 Em progresso

**Arquivo:** Todos os arquivos alterados nesta tarefa.

**Ação:** Versionar e enviar as alterações ao branch `main`.

**Verificação:** Conferir a saída dos comandos Git.
