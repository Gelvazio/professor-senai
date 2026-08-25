# Avaliação de Comportamentos por Matéria

**Objetivo:** Adicionar a cada matéria um modal de avaliação comportamental com critérios ponderados, data da aula e histórico por data e horário.

**Tech Stack:** HTML, CSS, JavaScript, localStorage

**Criado em:** 2026-08-25 15:25:00  
**Concluído em:** 2026-08-25 15:37:30  
**Tempo decorrido:** 12:30

---

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|---|---|---|---|---|---|
| 1 | Mapear matérias, modais e persistência | ✅ Concluído | 2026-08-25 15:25:00 | 2026-08-25 15:25:00 | 00:00 |
| 2 | Criar modal e fluxo por matéria | ✅ Concluído | 2026-08-25 15:25:00 | 2026-08-25 15:37:30 | 12:30 |
| 3 | Armazenar histórico local por data e horário | ✅ Concluído | 2026-08-25 15:25:00 | 2026-08-25 15:37:30 | 12:30 |
| 4 | Commit e publicação | ✅ Concluído | 2026-08-25 15:25:00 | 2026-08-25 15:37:30 | 12:30 |

---

### Passo 1: Mapear matérias, modais e persistência

**Status:** ✅ Concluído

**Arquivo:** Ler `sistema/dashboard.html`.

**Ação:** Reutilizar o card de matéria, o padrão visual dos modais e o armazenamento local sem ampliar permissões do banco.

**Verificação prevista (não executar por restrição do projeto):**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "abrirAvaliacoesMateria"
```

Esperado: fluxo de matérias e avaliações localizado.

---

### Passo 2: Criar modal e fluxo por matéria

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Adicionar botão, modal, formulário tabular e cálculo ponderado da nota final.

**Verificação prevista (não executar por restrição do projeto):**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "Avaliação Comportamentos"
```

Esperado: interface e funções presentes no dashboard.

---

### Passo 3: Armazenar histórico local por data e horário

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Salvar registros no `localStorage` por matéria e reabri-los por um combobox com data e horário da aula.

**Verificação prevista (não executar por restrição do projeto):**

```javascript
localStorage.getItem("avaliacao_comportamentos_v1")
```

Esperado: histórico em JSON separado por matéria.

---

### Passo 4: Commit e publicação

**Status:** ✅ Concluído

**Arquivo:** Versionar os arquivos desta tarefa.

**Ação:** Fazer commit e publicar no branch principal.

**Verificação prevista (não executar por restrição do projeto):**

```powershell
git status --short
```

Esperado: arquivos da tarefa versionados.
