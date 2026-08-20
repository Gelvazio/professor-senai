/**
 * menu.js — Sidebar centralizada do ERP
 * Detecta automaticamente o caminho relativo, filtra por permissões,
 * gera accordion e marca o link ativo.
 * A ordem das seções segue o sisordem da tabela sistema (erp_sistemas no localStorage).
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

  const arquivosComCaminhoObrigatorio = new Set(['dashboard.html']);

  // VALIDE A REGRA DAS TELAS DO PERFIL, SEMPRE AQUI
  let telasDoPerfil = [];
  try {
    const telasSalvas = JSON.parse(localStorage.getItem('erp_telas') || '[]');
    telasDoPerfil = Array.isArray(telasSalvas) ? telasSalvas : [];
  } catch {
    telasDoPerfil = [];
  }
  const telasPermitidas = new Set(
    telasDoPerfil
      .map((tela) => String(tela?.nome_html || '').replace(/^\.\.\//, '').replace(/^\//, ''))
      .filter(Boolean)
  );

  console.log('TELAS DO PERFIL:', telasPermitidas);

  function link(href, icon, label) {
    const caminho = href.replace(/^\.\.\//, '').replace(/^\//, '');
    const arquivo = caminho.split('/').pop();
    const permitidoPorCaminho = telasPermitidas.has(caminho);
    const permitidoPorArquivo = !arquivosComCaminhoObrigatorio.has(arquivo) &&
      telasPermitidas.has(arquivo);
    if (!permitidoPorCaminho && !permitidoPorArquivo) return null;
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

  // Mapa siscodigo → função(ões) que produzem seção(ões) HTML
  // Cada entrada pode retornar uma string (section única) ou um array de strings.
  const SECAO_POR_SISCODIGO = {
    1: () => section('principal', 'Principal', [
      link('dashboard.html', '🏠', 'Visão Geral'),
    ]),
    2: () => section('cadastros', 'Cadastros', [
      link('cadastros/clientes.html',       '👥', 'Clientes'),
      link('cadastros/fornecedores.html',   '🏭', 'Fornecedores'),
      link('cadastros/produtos.html',       '📦', 'Produtos'),
      link('cadastros/transportadoras.html','🚚', 'Transportadoras'),
    ]),
    3: () => section('compras', 'Compras', [
      link('compras/planejamento.html', '📋', 'Planejamento'),
      link('compras/pipeline.html',     '🗂️', 'Pipeline'),
      link('compras/solicitacoes.html', '📝', 'Solicitações'),
      link('compras/pedidos.html',      '🛒', 'Pedidos'),
      link('compras/recebimento.html',  '📥', 'Recebimento'),
      link('compras/conferencia.html',  '✅', 'Conferência'),
      link('compras/nota-fiscal.html',  '🧾', 'Nota Fiscal'),
    ]),
    4: () => section('estoque', 'Estoque', [
      link('estoque/controle.html',      '📊', 'Controle'),
      link('estoque/movimentacoes.html', '🔄', 'Movimentações'),
      link('estoque/armazenagem.html',   '🏪', 'Armazenagem'),
      link('estoque/inventario.html',    '🔍', 'Inventário'),
    ]),
    5: () => [
      section('vendas', 'Vendas', [
        link('vendas/pedidos-venda.html',     '🛍️', 'Pedidos de Venda'),
        link('vendas/nota-fiscal-venda.html', '📄', 'NF de Venda'),
        link('vendas/televendas.html',        '📞', 'Tele Vendas'),
      ]),
      section('logistica', 'Logística', [
        link('vendas/logistica.html', '🗺️', 'Pipeline'),
        link('vendas/separacao.html', '📤', 'Separação'),
        link('vendas/romaneio.html',  '📃', 'Romaneio'),
        link('vendas/expedicao.html', '🚀', 'Expedição'),
        link('vendas/entrega.html',   '📍', 'Entrega'),
      ]),
    ],
    7: () => section('financeiro', 'Financeiro', [
      link('financeiro/contas-pagar.html',   '💸', 'Contas a Pagar'),
      link('financeiro/contas-receber.html', '💰', 'Contas a Receber'),
      link('financeiro/balancete.html',      '📊', 'Balancete Gerencial'),
      link('financeiro/analisecredito.html', '🔎', 'Análise de Crédito'),
      link('financeiro/fila-credito.html',   '⏳', 'Fila de Crédito'),
    ]),
    9: () => section('marketing', 'Marketing', [
      link('marketing/campanhas.html', '📣', 'Campanhas'),
      link('marketing/retornos.html',  '📈', 'Retornos'),
    ]),
    10: () => section('gamificacao', 'Gamificação', [
      link('gamificacao/index.html',        '🎮', 'Minha Jornada'),
      link('gamificacao/ranking.html',      '🏆', 'Ranking'),
      link('gamificacao/equipe.html',       '👥', 'Minha Equipe'),
      link('gamificacao/professor.html',    '🎓', 'Professor'),
      link('gamificacao/placar.html',       '📺', 'Placar'),
      link('gamificacao/config-sessao.html','⚙️', 'Config Sessão'),
      link('gamificacao/admin.html',        '🛠️', 'Admin Gamif.'),
    ]),
    11: () => section('rh', 'Recursos Humanos', [
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
  };

  // Ordem dos sistemas: usa erp_sistemas do localStorage (populado no login pelo sbLogin),
  // com fallback para a ordem natural das chaves do mapa.
  let sistemasOrdenados = [];
  try {
    sistemasOrdenados = JSON.parse(localStorage.getItem('erp_sistemas') || '[]');
  } catch {
    sistemasOrdenados = [];
  }

  const codigosOrdenados = sistemasOrdenados.length
    ? sistemasOrdenados.map((s) => s.siscodigo)
    : Object.keys(SECAO_POR_SISCODIGO).map(Number);

  const secoesDinamicas = codigosOrdenados.flatMap((cod) => {
    const fn = SECAO_POR_SISCODIGO[cod];
    if (!fn) return [];
    const resultado = fn();
    return Array.isArray(resultado) ? resultado : [resultado];
  });

  // Configurações sempre ao final (não faz parte do sistema ordenado)
  const secaoConfiguracoes = section('configuracoes', 'Configurações', [
    link('configuracoes/usuarios.html',        '👤', 'Usuários'),
    link('configuracoes/perfis.html',          '🛡️', 'Perfis'),
    link('configuracoes/telas.html',           '🖥️', 'Telas'),
    link('configuracoes/regras-negocios.html', '📚', 'Regras de Negócio'),
  ]);

  const html = [
    ...secoesDinamicas,
    secaoConfiguracoes,
    '<div style="height:24px"></div>',
  ].join('');

  sidebar.innerHTML = html;

  // Inicializa accordion: toggle ao clicar no label
  sidebar.querySelectorAll('.sidebar-section-label').forEach(lbl => {
    lbl.addEventListener('click', () => {
      lbl.closest('.sidebar-section').classList.toggle('open');
    });
  });
})();
