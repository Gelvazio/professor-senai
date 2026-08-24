# Ajustar Autoavaliação do Estudante

**Objetivo:** Exibir cada alternativa da autoavaliação em uma linha e solicitar justificativa para respostas parciais ou negativas.

**Tech Stack:** Python e python-docx

---

## Status Geral

| Passo | Descrição | Status |
|---|---|---|
| 1 | Ajustar alternativas da autoavaliação | ✅ Concluído |
| 2 | Gerar novamente o DOCX | ✅ Concluído |
| 3 | Commit e push | 🔄 Em progresso |

---

### Passo 1: Ajustar alternativas

**Status:** ✅ Concluído

**Arquivo:** Modificar `scripts/gerar_avaliacao_pratica_comunicacao.py`

**Ação:** Exibir Sim, Parcialmente e Não em linhas separadas e adicionar `Justifique: __________` às duas últimas opções.

**Verificação:** Conferência do código, sem execução de testes.

---

### Passo 2: Gerar novamente o documento

**Status:** ✅ Concluído

**Arquivo:** Modificar `INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/AVALIACOES/AVALIACAO_PRATICA_COMUNICACAO_ORAL_ESCRITA.docx`

**Ação:** Executar o gerador com a autoavaliação revisada.

**Verificação:** Não executar testes nem validação visual, conforme regra do projeto.

---

### Passo 3: Commit e push

**Status:** 🔄 Em progresso

**Arquivo:** Todos os arquivos alterados nesta tarefa.

**Ação:** Versionar e enviar as alterações ao branch `main`.

**Verificação:** Conferir a saída dos comandos Git.
