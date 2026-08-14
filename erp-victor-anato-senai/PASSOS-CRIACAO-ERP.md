# Passos de Criação — ERP Victor Anato

> Arquivo de controle de progresso. Atualizado ao final de cada passo.
> A cada passo concluído, solicitar permissão antes de prosseguir ao próximo.

---

## Arquivos Base

| # | Passo | Status |
|---|-------|--------|
| 0.1 | Criar `CLAUDE.md` com orientações detalhadas do ERP | ✅ CONCLUIDO |
| 0.2 | Criar `styles.css` com design system completo (tema SENAI) | ✅ CONCLUIDO |
| 0.3 | Criar `DATABASE.sql` com todas as tabelas, índices e triggers | ✅ CONCLUIDO |
| 0.4 | Criar `SUPABASE.js` com configurações e utilitários da API | ✅ CONCLUIDO |
| 0.5 | Criar `PASSOS-CRIACAO-ERP.md` (este arquivo) | ✅ CONCLUIDO |

---

## Passo 1 — Autenticação

| # | Tarefa | Status |
|---|--------|--------|
| 1.1 | Criar `index.html` — tela de login (e-mail + senha, tema claro/escuro) | ✅ CONCLUIDO |
| 1.2 | Implementar lógica de login via `SUPABASE.js` (`sbLogin`) | ✅ CONCLUIDO |
| 1.3 | Implementar redirecionamento pós-login para `dashboard.html` | ✅ CONCLUIDO |
| 1.4 | Implementar logout e verificação de sessão (`sbVerificarSessao`) | ✅ CONCLUIDO |

---

## Passo 2 — Dashboard (Visão Geral)

| # | Tarefa | Status |
|---|--------|--------|
| 2.1 | Criar `dashboard.html` com header, sidebar e área de conteúdo | 🔄 INICIADO |
| 2.2 | Exibir cards de totais: Clientes, Fornecedores, Produtos com estoque crítico | 🔄 INICIADO |
| 2.3 | Exibir cards de totais: Pedidos de Compra em aberto, Pedidos de Venda em aberto | 🔄 INICIADO |
| 2.4 | Exibir tabela de últimas 5 movimentações de estoque | 🔄 INICIADO |
| 2.5 | Implementar menu lateral com links para todos os módulos | 🔄 INICIADO |

---

## Passo 3 — Módulo Cadastros

| # | Tarefa | Status |
|---|--------|--------|
| 3.1 | Criar `cadastros/clientes.html` — CRUD completo de clientes | ⬜ NAO INICIADO |
| 3.2 | Criar `cadastros/fornecedores.html` — CRUD completo de fornecedores | ⬜ NAO INICIADO |
| 3.3 | Criar `cadastros/produtos.html` — CRUD completo de produtos (código automático P00001) | ⬜ NAO INICIADO |
| 3.4 | Criar `cadastros/transportadoras.html` — CRUD completo de transportadoras | ⬜ NAO INICIADO |
| 3.5 | Implementar integração ViaCEP nos formulários de clientes e fornecedores | ⬜ NAO INICIADO |
| 3.6 | Implementar alerta visual de estoque crítico na listagem de produtos | ⬜ NAO INICIADO |

---

## Passo 4 — Módulo Compras

| # | Tarefa | Status |
|---|--------|--------|
| 4.1 | Criar `compras/planejamento.html` — CRUD de planejamento de compras | ⬜ NAO INICIADO |
| 4.2 | Criar `compras/solicitacoes.html` — CRUD de solicitações (número SC00001 automático) | ⬜ NAO INICIADO |
| 4.3 | Criar `compras/pedidos.html` — CRUD de pedidos (número PC00001 automático) | ⬜ NAO INICIADO |
| 4.4 | Implementar botão "Salvar como PDF" no Pedido de Compras (`sbGerarPDFPedidoCompra`) | ⬜ NAO INICIADO |
| 4.5 | Criar `compras/recebimento.html` — CRUD de recebimentos | ⬜ NAO INICIADO |
| 4.6 | Criar `compras/conferencia.html` — CRUD de conferências | ⬜ NAO INICIADO |
| 4.7 | Criar `compras/nota-fiscal.html` — CRUD de entrada de notas fiscais | ⬜ NAO INICIADO |
| 4.8 | Ao lançar NF (status=Lançada), gerar movimentação de entrada no estoque | ⬜ NAO INICIADO |

---

## Passo 5 — Módulo Estoque

| # | Tarefa | Status |
|---|--------|--------|
| 5.1 | Criar `estoque/controle.html` — painel de visão geral do estoque por produto | ⬜ NAO INICIADO |
| 5.2 | Criar `estoque/movimentacoes.html` — histórico de todas as movimentações | ⬜ NAO INICIADO |
| 5.3 | Criar `estoque/armazenagem.html` — registro de movimentações físicas | ⬜ NAO INICIADO |
| 5.4 | Criar `estoque/inventario.html` — CRUD de inventário (número INV00001 automático) | ⬜ NAO INICIADO |
| 5.5 | Ao marcar inventário como Ajustado, gerar movimentação de ajuste no estoque | ⬜ NAO INICIADO |

---

## Passo 6 — Módulo Vendas e Logística

| # | Tarefa | Status |
|---|--------|--------|
| 6.1 | Criar `vendas/pedidos-venda.html` — CRUD de pedidos de venda (PV00001) | ⬜ NAO INICIADO |
| 6.2 | Validar disponibilidade de estoque ao confirmar pedido de venda | ⬜ NAO INICIADO |
| 6.3 | Criar `vendas/nota-fiscal-venda.html` — CRUD de NF de venda | ⬜ NAO INICIADO |
| 6.4 | Criar `vendas/separacao.html` — CRUD de separação/picking (SEP00001) | ⬜ NAO INICIADO |
| 6.5 | Criar `vendas/romaneio.html` — CRUD de romaneio (ROM00001) | ⬜ NAO INICIADO |
| 6.6 | Criar `vendas/expedicao.html` — CRUD de expedição (EXP00001) | ⬜ NAO INICIADO |
| 6.7 | Ao marcar Expedição como Expedido, baixar estoque do produto | ⬜ NAO INICIADO |
| 6.8 | Criar `vendas/entrega.html` — CRUD de entregas com rastreio (ENT00001) | ⬜ NAO INICIADO |

---

## Passo 7 — Módulo Configurações

| # | Tarefa | Status |
|---|--------|--------|
| 7.1 | Criar `configuracoes/usuarios.html` — CRUD de usuários | ⬜ NAO INICIADO |
| 7.2 | Implementar envio de convite por e-mail (ou cadastro direto pelo Administrador) | ⬜ NAO INICIADO |
| 7.3 | Implementar controle de permissões por módulo (checkboxes por usuário) | ⬜ NAO INICIADO |
| 7.4 | Impedir exclusão do último Administrador ativo | ⬜ NAO INICIADO |

---

## Passo 8 — Ajustes Finais e Testes

| # | Tarefa | Status |
|---|--------|--------|
| 8.1 | Validar responsividade em todas as telas (mobile, tablet, desktop) | ⬜ NAO INICIADO |
| 8.2 | Verificar tema escuro em todos os módulos | ⬜ NAO INICIADO |
| 8.3 | Testar fluxo completo: Solicitação → Pedido → Recebimento → NF → Estoque | ⬜ NAO INICIADO |
| 8.4 | Testar fluxo completo: Pedido de Venda → Separação → Expedição → Entrega | ⬜ NAO INICIADO |
| 8.5 | Testar geração de PDF do Pedido de Compras | ⬜ NAO INICIADO |
| 8.6 | Revisar mensagens de erro, validações obrigatórias e feedback de sucesso | ⬜ NAO INICIADO |

---

## Resumo de Progresso

| Módulo | Total | Concluídos | Progresso |
|--------|-------|------------|-----------|
| Arquivos Base | 5 | 5 | 100% |
| Autenticação | 4 | 4 | 100% |
| Dashboard | 5 | 0 | 0% |
| Cadastros | 6 | 0 | 0% |
| Compras | 8 | 0 | 0% |
| Estoque | 5 | 0 | 0% |
| Vendas e Logística | 8 | 0 | 0% |
| Configurações | 4 | 0 | 0% |
| Ajustes Finais | 6 | 0 | 0% |
| **TOTAL** | **51** | **9** | **18%** |

---

> **Legenda:** ✅ CONCLUIDO &nbsp;·&nbsp; 🔄 INICIADO &nbsp;·&nbsp; ⬜ NAO INICIADO
