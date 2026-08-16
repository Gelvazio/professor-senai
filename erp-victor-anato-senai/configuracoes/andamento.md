# Andamento — Módulo Configurações

Arquivo de rastreamento de tarefas do módulo de Configurações.

---

## Telas

| # | Tela | Status | Observação |
|---|------|--------|------------|
| 1 | `configuracoes/usuarios.html` | ✅ Concluído | CRUD com perfis Administrador/Usuário e permissões |
| 2 | `configuracoes/perfis.html` | ✅ Concluído | CRUD de perfis de acesso com telas vinculadas |
| 3 | `configuracoes/telas.html` | ✅ Concluído | Gerenciamento de telas do sistema |
| 4 | `configuracoes/regras-negocios.html` | ✅ Concluído | Documentação das regras de negócio |

---

## Funcionalidades de Infraestrutura (SUPABASE.js)

| Item | Status | Observação |
|------|--------|------------|
| Autenticação (login/sessão) | ✅ Concluído | SHA-256, localStorage, expiração 8h |
| Dropdown ⚙️ Configurações no header | ✅ Concluído | Visível apenas para Administradores |
| Filtro de sidebar por permissão | ✅ Concluído | `sbFiltrarSidebar()` corrigido para subpastas |
| Accordion da sidebar | ✅ Concluído | `sbInitSidebarAccordion()` com ACC_KEYS atualizado |
| Tema claro/escuro | ✅ Concluído | Persistido em `localStorage` |
| Modal Andamento Alterações | ✅ Concluído | Lê todos os `andamento.md` do projeto |

---

## Banco de Dados (Supabase)

| Tabela | Status |
|--------|--------|
| `erp_usuarios` | ✅ Criada |
| `sistema` | ✅ Criada |
| `tela` | ✅ Criada |
| `tela_sistema` | ✅ Criada |
| `perfil` | ✅ Criada |
| `perfil_sistema` | ✅ Criada |

---

## Legenda

- ✅ Concluído
- 🔄 Em andamento
- ❌ Não iniciado
