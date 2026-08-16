# Gamificação — Andamento da Implementação

> Documento de acompanhamento do módulo de Gamificação do ERP Senai.
> Última atualização: 2026-08-16

---

## 1. Banco de Dados (Supabase)

| Item | Descrição | Status |
|------|-----------|--------|
| `gamificacao_sessoes` | Tabela de sessões de aula | ⚠️ Iniciado — SQL disponível em `DATABASE.sql`, mas precisa ser executado no Supabase |
| `gamificacao_equipes` | Tabela de equipes por sessão | ⚠️ Iniciado — SQL disponível em `DATABASE.sql` |
| `gamificacao_membros` | Tabela de membros das equipes | ⚠️ Iniciado — SQL disponível em `DATABASE.sql` |
| `gamificacao_eventos` | Tabela de eventos gerados pelo motor | ⚠️ Iniciado — SQL disponível em `DATABASE.sql` |
| `gamificacao_pontuacoes` | Histórico de pontuação por equipe | ⚠️ Iniciado — SQL disponível em `DATABASE.sql` |
| `gamificacao_config_motor` | Configurações do motor de simulação | ⚠️ Iniciado — SQL disponível em `DATABASE.sql` |
| RLS (Row Level Security) | Políticas permissivas para anon key | ⚠️ Iniciado — SQL disponível em `DATABASE.sql` |
| Seed de dados (exemplos) | Dados iniciais para teste | ⚠️ Iniciado — disponível em `DATABASE_SEED.sql` |

> **Ação necessária:** Executar `DATABASE.sql` no Supabase SQL Editor para criar as tabelas.

---

## 2. Arquivos HTML (Telas)

| Arquivo | Descrição | Status |
|---------|-----------|--------|
| `index.html` | Hub do usuário — XP, nível, badges e missões | ✅ Concluído |
| `ranking.html` | Leaderboard do grupo (sistema gamif antigo) | ✅ Concluído |
| `admin.html` | Painel administrativo da gamificação antiga | ✅ Concluído |
| `professor.html` | Dashboard do professor — Play/Pause, motor ao vivo, ranking, histórico | ✅ Concluído |
| `equipe.html` | View da equipe — eventos pendentes, countdown, botão resolver, link ERP | ✅ Concluído |
| `placar.html` | Placar fullscreen para projeção no telão — dark mode, auto-refresh 5s | ✅ Concluído |
| `config-sessao.html` | Criação/edição de sessão — equipes, membros, motor de simulação | ✅ Concluído |

---

## 3. Motor de Simulação (JavaScript)

| Item | Descrição | Status |
|------|-----------|--------|
| Tipos de evento definidos | 7 tipos: pedido_venda, solicitacao_compra, chegada_mercadoria, pedido_urgente, campanha_lead, conta_vencendo, ruptura_estoque | ✅ Concluído (em `professor.html`) |
| Loop do motor (`iniciarMotor`) | Gera eventos em intervalos configuráveis com setInterval | ✅ Concluído (em `professor.html`) |
| Controle Play / Pause | Atualiza status da sessão no banco e para/retoma o interval | ✅ Concluído |
| Seletor de velocidade 1× / 2× / 5× | Divide o intervalo pelo multiplicador | ✅ Concluído |
| Verificação de eventos expirados | Penaliza equipe em −5 pts automaticamente | ✅ Concluído |
| Geração de evento urgente | Chance configurável (%), prioridade 'urgente' | ✅ Concluído |
| Avançar rodada manualmente | Incrementa `rodada_atual` na sessão | ✅ Concluído |

---

## 4. Sistema de Pontuação

| Item | Descrição | Status |
|------|-----------|--------|
| Resolução dentro do prazo | +pontos_base | ✅ Concluído (em `equipe.html`) |
| Resolução em menos de 50% do prazo | +pontos_base × 1,5 (bônus velocidade) | ✅ Concluído |
| Evento expirado sem resolução | −5 pontos da equipe | ✅ Concluído |
| Registro em `gamificacao_pontuacoes` | Histórico detalhado por evento | ✅ Concluído |
| Primeiro a resolver urgente (+15 bônus) | Bônus especial para eventos urgentes | ❌ Não Iniciado |
| Zero erros de validação (+3 bônus) | Bônus por preenchimento correto no ERP | ❌ Não Iniciado |

---

## 5. Dashboard do Professor (`professor.html`)

| Item | Descrição | Status |
|------|-----------|--------|
| Seletor de sessão | Carrega sessões do banco, auto-seleciona a ativa | ✅ Concluído |
| Botão Play / Pause | Controla o motor em tempo real | ✅ Concluído |
| Seletor de velocidade | 1× / 2× / 5× | ✅ Concluído |
| Painel de eventos ativos | Lista com countdown colorido (verde/amarelo/vermelho) | ✅ Concluído |
| Ranking de equipes ao vivo | Atualiza a cada 5 segundos | ✅ Concluído |
| Histórico de eventos | Últimos 40 eventos com status | ✅ Concluído |
| Botão Avançar Rodada | Incrementa rodada e gera evento imediato | ✅ Concluído |
| KPIs (Ativos / Resolvidos / Expirados / Equipes) | Cards de resumo | ✅ Concluído |
| Botão Abrir Placar | Abre `placar.html` em nova aba com a sessão atual | ✅ Concluído |
| Exportar relatório PDF | PDF com ranking final, KPIs e histórico | ❌ Não Iniciado |

---

## 6. View da Equipe (`equipe.html`)

| Item | Descrição | Status |
|------|-----------|--------|
| Seletor de equipe | Carrega equipes da sessão ativa | ✅ Concluído |
| Parâmetro `?equipe=uuid` na URL | Acesso direto via link | ✅ Concluído |
| Header da equipe (nome, setor, pontos, posição) | Mostra dados da equipe no topo | ✅ Concluído |
| Eventos filtrados por setor | Mostra apenas eventos do setor da equipe | ✅ Concluído |
| Countdown visual por evento | Verde → Amarelo → Vermelho com animação pulse | ✅ Concluído |
| Bônus de velocidade exibido | Mostra "+X pts bônus rápido!" se estiver em tempo | ✅ Concluído |
| Botão "Marcar Resolvido" | Calcula pontos, atualiza banco e exibe confirmação | ✅ Concluído |
| Link para tela ERP correspondente | Abre o módulo ERP correto do setor em nova aba | ✅ Concluído |
| Auto-refresh a cada 10s | Verifica novos eventos automaticamente | ✅ Concluído |
| Histórico de eventos resolvidos/expirados | Lista na parte inferior | ✅ Concluído |
| Detecção automática de resolução via polling | Detecta quando o aluno salvou no ERP sem clicar no botão | ❌ Não Iniciado |

---

## 7. Placar (`placar.html`)

| Item | Descrição | Status |
|------|-----------|--------|
| Layout fullscreen dark mode | Fundo escuro, fontes grandes, ideal para telão | ✅ Concluído |
| Ranking animado com barras de progresso | Barras relativas ao líder, com cor da equipe | ✅ Concluído |
| Auto-refresh a cada 5 segundos | Com contador regressivo no rodapé | ✅ Concluído |
| Status da sessão (ativa/pausada) | Indicador com dot piscando quando ativa | ✅ Concluído |
| Destaque para eventos urgentes | Cards vermelhos com animação shake | ✅ Concluído |
| Parâmetro `?sessao=uuid` na URL | Acesso direto a uma sessão específica | ✅ Concluído |
| Relógio em tempo real | Exibido no header | ✅ Concluído |
| Botão tela cheia (fullscreen API) | Entra em modo fullscreen nativo | ✅ Concluído |
| Medalhas 🥇🥈🥉 para top 3 | Visual destacado para as primeiras posições | ✅ Concluído |

---

## 8. Configuração de Sessão (`config-sessao.html`)

| Item | Descrição | Status |
|------|-----------|--------|
| Formulário de criação de sessão | Campo título | ✅ Concluído |
| Edição de sessão existente via `?sessao=uuid` | Carrega dados existentes | ✅ Concluído |
| Motor: intervalo entre eventos (range slider) | 10s a 300s | ✅ Concluído |
| Motor: máximo de eventos simultâneos | 1 a 15 | ✅ Concluído |
| Motor: chance de evento urgente (%) | 0% a 50% | ✅ Concluído |
| Adicionar equipes com nome, setor e cor | Interface dinâmica com add/remove | ✅ Concluído |
| Campo de membros por equipe | Nomes separados por vírgula | ✅ Concluído |
| Salvar equipes e membros no banco | Grava em `gamificacao_equipes` e `gamificacao_membros` | ✅ Concluído |
| Equipes padrão pré-preenchidas | 6 equipes (Compras, Estoque, Vendas, Logística, Financeiro, Marketing) | ✅ Concluído |
| Salvar template de configuração | Reutilizar configs entre aulas | ❌ Não Iniciado |
| Selecionar produtos/clientes/fornecedores específicos para a simulação | Limitar o motor a um subset do cadastro | ❌ Não Iniciado |

---

## 9. Integração com o Sistema ERP

| Item | Descrição | Status |
|------|-----------|--------|
| Links para telas ERP nos eventos da equipe | Cada setor abre a tela correta do ERP | ✅ Concluído |
| Gamificação no sidebar de todos os HTMLs do ERP | Links para professor, equipe, placar nas 4 novas telas | ✅ Concluído |
| Gamificação no sidebar das telas antigas (index, ranking, admin) | Links para professor, equipe, placar | ⚠️ Iniciado — apenas as telas novas foram atualizadas |
| SQL de registro no banco (sistema + telas) | INSERT em `sistema`, `tela`, `tela_sistema` | ❌ Não Iniciado |
| Motor criando registros reais no ERP | Evento "Pedido de Venda" cria `vendas_pedidos` no banco | ❌ Não Iniciado — motor gera evento mas não cria o registro ERP vinculado |
| Detecção automática de resolução por status ERP | Polling verifica se o aluno alterou o status no módulo | ❌ Não Iniciado |

---

## 10. JavaScript Compartilhado (`gamif.js`)

| Item | Descrição | Status |
|------|-----------|--------|
| Sistema de XP e níveis (individual) | Níveis Iniciante → Master ERP | ✅ Concluído |
| Sistema de badges/conquistas | 7 badges com lógica de desbloqueio | ✅ Concluído |
| Missões gamificadas | Missões vinculadas a ações no ERP | ✅ Concluído |
| Integração gamif.js com as novas telas de equipe | gamif.js não é usado nas novas telas — sistema separado | ⚠️ Iniciado — dois sistemas paralelos, não unificados |

---

## Resumo Geral

| Categoria | Concluído | Iniciado | Não Iniciado | Total |
|-----------|:---------:|:--------:|:------------:|:-----:|
| Banco de dados | 0 | 8 | 0 | 8 |
| Telas HTML | 7 | 0 | 0 | 7 |
| Motor de simulação | 7 | 0 | 0 | 7 |
| Sistema de pontuação | 4 | 0 | 2 | 6 |
| Dashboard Professor | 9 | 0 | 1 | 10 |
| View da Equipe | 10 | 0 | 1 | 11 |
| Placar | 9 | 0 | 0 | 9 |
| Config Sessão | 9 | 0 | 2 | 11 |
| Integração ERP | 2 | 1 | 3 | 6 |
| gamif.js | 3 | 1 | 0 | 4 |
| **Total** | **60** | **10** | **9** | **79** |

---

## Próximos Passos Prioritários

1. **Executar `DATABASE.sql` no Supabase** — sem isso, nenhuma tela de gamificação funciona
2. **Motor criar registros reais no ERP** — hoje o motor só cria o evento, não o pedido/SC no banco
3. **Detecção automática de resolução** — polling que verifica status no módulo ERP sem precisar do botão manual
4. **Atualizar sidebar das telas antigas** (`index.html`, `ranking.html`, `admin.html`) com links para professor/equipe/placar
5. **Exportar relatório PDF** no final da sessão
6. **Selecionar produtos/clientes/fornecedores** específicos na config-sessao

---

*Atualizado em 2026-08-16 após criação das telas professor.html, equipe.html, placar.html e config-sessao.html.*
