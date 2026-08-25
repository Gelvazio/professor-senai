# Completar Blocos do Plano de Ensino de Fundamentos

**Objetivo:** Completar e detalhar os blocos do plano de ensino com base na ementa e no percurso de aprendizagem já definido.

**Tech Stack:** Markdown

**Criado em:** 2026-08-25 14:51:00  
**Concluído em:** 2026-08-25 14:52:48  
**Tempo decorrido:** 01:48

---

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|---|---|---|---|---|---|
| 1 | Analisar ementa, apostila e plano atual | ✅ Concluído | 2026-08-25 14:51:00 | 2026-08-25 14:51:00 | 00:00 |
| 2 | Reestruturar os seis blocos e completar os campos | ✅ Concluído | 2026-08-25 14:51:00 | 2026-08-25 14:52:48 | 01:48 |
| 3 | Commit e publicação | ✅ Concluído | 2026-08-25 14:51:00 | 2026-08-25 14:52:48 | 01:48 |

---

### Passo 1: Analisar ementa, apostila e plano atual

**Status:** ✅ Concluído

**Arquivos:**

- `FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/ementa_Fundamentos_Tecnologia_Programacao.md`
- `FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/Apostila_Fundamentos_Tecnologia_Programacao.md`
- `FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/PLANO-ENSINO-V0.md`

**Ação:** Relacionar os seis blocos da ementa aos 17 encontros da apostila e distribuir as 33 horas.

**Verificação prevista (não executar por restrição do projeto):**

```powershell
Select-String -Path FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/ementa_Fundamentos_Tecnologia_Programacao.md -Pattern "Bloco"
```

Esperado: seis blocos curriculares.

---

### Passo 2: Reestruturar os seis blocos e completar os campos

**Status:** ✅ Concluído

**Arquivo:** Modificar `FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/PLANO-ENSINO-V0.md`

**Ação:** Substituir os três blocos incompletos por seis blocos detalhados, totalizando 33 horas.

**Verificação prevista (não executar por restrição do projeto):**

```powershell
Get-Content FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/PLANO-ENSINO-V0.md
```

Esperado: seis blocos com capacidades, conhecimentos, estratégias, recursos e avaliação.

---

### Passo 3: Commit e publicação

**Status:** ✅ Concluído

**Arquivo:** Versionar os arquivos desta tarefa.

**Ação:** Adicionar somente os arquivos alterados nesta tarefa, fazer commit e publicar no branch principal.

**Verificação prevista (não executar por restrição do projeto):**

```powershell
git status --short
```

Esperado: arquivos da tarefa versionados.
