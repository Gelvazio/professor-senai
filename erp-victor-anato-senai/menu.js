/**
 * menu.js — Sidebar centralizada do ERP
 * Detecta automaticamente o caminho relativo, filtra por permissões,
 * gera accordion e marca o link ativo.
 */
(function () {
  'use strict';

  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  // Calcula o base path relativo ao root do ERP
  const scriptSrc = document.currentScript ? document.currentScript.src : '';
  const pageHref  = window.location.href;
  const pageDir   = pageHref.substring(0, pageHref.lastIndexOf('/') + 1);
  const menuDir   = scriptSrc.substring(0, scriptSrc.lastIndexOf('/') + 1);
  const base      = (pageDir === menuDir) ? '' : '../';

  // Página atual relativa ao root (ex: 'gamificacao/admin.html')
  const pageFull = pageDir.replace(menuDir, '') + pageHref.replace(pageDir, '');

  const role  = localStorage.getItem('erp_role') || '';
  const isAdmin = role === 'Administrador';

  function link(href, icon, label) {
    const caminho = href.replace(/^\.\.\//, '').replace(/^\//, '');
    if (!telasPermitidas.has(caminho)) return null;
    const active = pageFull === href || pageFull.endsWith('/' + href);
    return `<a class="sidebar-link${active ? ' ativo' : ''}" href="${base}${href}">` +
           `<span class="sidebar-icon">${icon}</span> ${label}</a>`;
  }

  function section(chave, label, links) {
    const content = links.filter(Boolean).join('');
    if (!content) return '';
    return `<div class="sidebar-section open">` +
           `<div class="sidebar-section-label">${label}</div>` +
           `<div class="sidebar-section-links">${content}</div>` +
           `</div>`;
  }

  // VALIDE A REGRA DAS TELAS DO PERFIL, SEMPRE AQUI
  let telasDoPerfil = [];
  try {
    telasDoPerfil = JSON.parse(localStorage.getItem('erp_telas') || '[]');
  } catch {
    telasDoPerfil = [];
  }
  const telasPermitidas = new Set(
    telasDoPerfil
      .map((tela) => String(tela.nome_html || '').replace(/^\.\.\//, '').replace(/^\//, ''))
      .filter(Boolean)
  );

  const html = [
    // Dashboard — sempre visível
    `<div class="sidebar-section open">` +
    `<div class="sidebar-section-label">Principal</div>` +
    `<div class="sidebar-section-links">` +
    link('dashboard.html', '🏠', 'Visão Geral') +
    `</div></div>`,

    section('cadastros', 'Cadastros', [
      link('cadastros/clientes.html',       '👥', 'Clientes'),
      link('cadastros/fornecedores.html',   '🏭', 'Fornecedores'),
      link('cadastros/produtos.html',       '📦', 'Produtos'),
      link('cadastros/transportadoras.html','🚚', 'Transportadoras'),
    ]),

    section('compras', 'Compras', [
      link('compras/planejamento.html', '📋', 'Planejamento'),
      link('compras/solicitacoes.html', '📝', 'Solicitações'),
      link('compras/pedidos.html',      '🛒', 'Pedidos'),
      link('compras/recebimento.html',  '📥', 'Recebimento'),
      link('compras/conferencia.html',  '✅', 'Conferência'),
      link('compras/nota-fiscal.html',  '🧾', 'Nota Fiscal'),
    ]),

    section('vendas', 'Vendas', [
      link('vendas/pedidos-venda.html',     '🛍️', 'Pedidos de Venda'),
      link('vendas/nota-fiscal-venda.html', '📄', 'NF de Venda'),
      link('vendas/televendas.html',        '📞', 'Tele Vendas'),
    ]),

    section('vendas', 'Logística', [
      link('vendas/logistica.html', '🗺️', 'Pipeline'),
      link('vendas/separacao.html', '📤', 'Separação'),
      link('vendas/romaneio.html',  '📃', 'Romaneio'),
      link('vendas/expedicao.html', '🚀', 'Expedição'),
      link('vendas/entrega.html',   '📍', 'Entrega'),
    ]),

    section('estoque', 'Estoque', [
      link('estoque/controle.html',      '📊', 'Controle'),
      link('estoque/movimentacoes.html', '🔄', 'Movimentações'),
      link('estoque/armazenagem.html',   '🏪', 'Armazenagem'),
      link('estoque/inventario.html',    '🔍', 'Inventário'),
    ]),

    section('financeiro', 'Financeiro', [
      link('financeiro/contas-pagar.html',   '💸', 'Contas a Pagar'),
      link('financeiro/contas-receber.html', '💰', 'Contas a Receber'),
      link('financeiro/balancete.html',      '📊', 'Balancete Gerencial'),
      link('financeiro/analisecredito.html', '🔎', 'Análise de Crédito'),
      link('financeiro/fila-credito.html',   '⏳', 'Fila de Crédito'),
    ]),

    section('marketing', 'Marketing', [
      link('marketing/campanhas.html', '📣', 'Campanhas'),
      link('marketing/retornos.html',  '📈', 'Retornos'),
    ]),

    section('rh', 'Recursos Humanos', [
      link('rh/dashboard.html',       '📊', 'Painel RH'),
      link('rh/departamentos.html',   '🏢', 'Departamentos'),
      link('rh/cargos.html',          '💼', 'Cargos'),
      link('rh/funcionarios.html',    '👤', 'Funcionários'),
      link('rh/beneficios.html',      '🎁', 'Benefícios'),
      link('rh/jornadas.html',        '⏰', 'Jornadas'),
      link('rh/ponto.html',           '🕐', 'Ponto Eletrônico'),
      link('rh/apuracao-ponto.html',  '📋', 'Apuração'),
      link('rh/folha.html',           '💰', 'Folha'),
      link('rh/decimo-terceiro.html', '🎄', '13º Salário'),
      link('rh/ferias.html',          '🏖️', 'Férias'),
      link('rh/afastamentos.html',    '🏥', 'Afastamentos'),
      link('rh/treinamentos.html',    '🎓', 'Treinamentos'),
      link('rh/participacoes.html',   '✅', 'Participações'),
      link('rh/admissao.html',        '📝', 'Admissão'),
      link('rh/desligamento.html',    '🚪', 'Desligamento'),
    ]),

    section('gamificacao', 'Gamificação', [
      link('gamificacao/index.html',        '🎮', 'Minha Jornada'),
      link('gamificacao/ranking.html',      '🏆', 'Ranking'),
      link('gamificacao/professor.html',    '🎓', 'Professor'),
      link('gamificacao/placar.html',       '📺', 'Placar'),
      link('gamificacao/config-sessao.html','⚙️', 'Config Sessão'),
      link('gamificacao/admin.html',        '🛠️', 'Admin Gamif.'),
    ]),

    isAdmin ? section('configuracoes', 'Configurações', [
      link('configuracoes/usuarios.html', '⚙️', 'Usuários'),
    ]) : '',

    '<div style="height:24px"></div>',
  ].join('');

  sidebar.innerHTML = html;

  // 
  // Inicializa accordion: toggle ao clicar no label
  sidebar.querySelectorAll('.sidebar-section-label').forEach(lbl => {
    lbl.addEventListener('click', () => {
      lbl.closest('.sidebar-section').classList.toggle('open');
    });
  });
})();
