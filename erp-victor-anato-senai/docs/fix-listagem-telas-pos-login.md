# Correção da Listagem de Telas Após o Login

**Objetivo:** Preservar as telas carregadas para o perfil durante a renovação da sessão e aplicá-las corretamente ao menu lateral.

**Tech Stack:** JavaScript, HTML, LocalStorage e Supabase REST.

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Rastrear o fluxo de telas entre login e menu | ✅ Concluído |
| 2 | Preservar `erp_telas` ao limpar a sessão anterior | ✅ Concluído |
| 3 | Centralizar o filtro de telas no carregamento da interface | ✅ Concluído |
| 4 | Commit e publicação | ✅ Concluído |

---

### Passo 1: Rastrear o fluxo de telas

**Status:** ✅ Concluído

**Arquivos:** Modificar `SUPABASE.js` e `menu.js`

**Ação:** Confirmar que o login consulta `perfil_sistema`, carrega as telas ativas e grava o resultado em `erp_telas`, que depois é consumido pelo menu.

**Verificação:**

```powershell
rg -n "sbLogin|erp_telas|sbFiltrarSidebar" SUPABASE.js menu.js
```

Esperado: o fluxo de escrita e leitura de `erp_telas` aparece nos dois componentes.

---

### Passo 2: Preservar as telas durante a troca de sessão

**Status:** ✅ Concluído

**Arquivo:** Modificar `SUPABASE.js`

**Ação:** Manter o resultado da consulta em memória, limpar os dados da sessão anterior e somente depois gravar a nova lista.

```javascript
let telasDoLogin = [];

// As consultas do perfil atribuem o resultado a telasDoLogin.

localStorage.removeItem('erp_telas');
localStorage.setItem('erp_telas', JSON.stringify(telasDoLogin));
```

**Verificação:**

```powershell
git diff -- SUPABASE.js
```

Esperado: `erp_telas` é gravado depois da limpeza da sessão.

---

### Passo 3: Centralizar o filtro do menu

**Status:** ✅ Concluído

**Arquivo:** Modificar `menu.js`

**Ação:** Gerar todos os links autorizados pelo módulo e deixar `sbFiltrarSidebar()` aplicar as telas específicas do perfil após o DOM estar pronto.

```javascript
function link(href, icon, label) {
  const active = pageFull === href || pageFull.endsWith('/' + href);
  return `<a class="sidebar-link${active ? ' ativo' : ''}" href="${base}${href}">` +
         `<span class="sidebar-icon">${icon}</span> ${label}</a>`;
}
```

**Verificação:**

```powershell
git diff -- menu.js
```

Esperado: a montagem não elimina links antes de `sbFiltrarSidebar()` processar `erp_telas`.

---

### Passo 4: Commit e publicação

**Status:** ✅ Concluído

**Arquivos:** Versionar `SUPABASE.js`, `menu.js` e este documento.

**Ação:** Criar commit descritivo e enviar para `origin/main`.

**Verificação:**

```powershell
git status --short
git log -1 --oneline
```

Esperado: commit da correção presente no histórico remoto.

> Testes e validações de execução não foram realizados por proibição expressa das regras do projeto.
