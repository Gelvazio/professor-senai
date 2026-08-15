// ============================================================
//  ERP Senai — Configuração e Utilitários Supabase
//  Incluir em todas as páginas: <script src="../SUPABASE.js"></script>
//  (ajustar o caminho relativo conforme a pasta da página)
// ============================================================

'use strict';

// ── Credenciais ─────────────────────────────────────────────
const SUPABASE_URL = 'https://vdhahqicqlrdvcpesiwk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkaGFocWljcWxyZHZjcGVzaXdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MTI3OTYsImV4cCI6MjEwMjI4ODc5Nn0.7ACHuUUv6VMyy4-BbQcdAcmabMtqhiuVgrTGUUcV7RY';
const API         = `${SUPABASE_URL}/rest/v1`;
const DATABASE_PASS= 'QFWIOenjgvEJlNKy';

const HEADERS = {
  'apikey':        SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type':  'application/json',
  'Prefer':        'return=representation'
};

const HEADERS_READ = {
  'apikey':        SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type':  'application/json'
};

// ── Timeout padrão das requisições (10 segundos) ────────────
const REQUEST_TIMEOUT_MS = 10_000;

function fetchComTimeout(url, options = {}) {
  const ctrl = new AbortController();
  const tid  = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
  return fetch(url, { ...options, signal: ctrl.signal })
    .finally(() => clearTimeout(tid));
}


// ============================================================
//  CRUD GENÉRICO
// ============================================================

/**
 * Listar registros de uma tabela.
 * @param {string} tabela - Nome da tabela no Supabase.
 * @param {string} [query=''] - Query string adicional, ex: 'ativo=eq.true&order=nome.asc'
 * @returns {Promise<Array>}
 */
async function sbListar(tabela, query = '') {
  const sep = query ? '?' : '';
  const res = await fetchComTimeout(`${API}/${tabela}${sep}${query}`, {
    headers: HEADERS_READ
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`[sbListar] ${tabela}: ${err}`);
  }
  return res.json();
}

/**
 * Buscar um único registro pelo id.
 * @param {string} tabela
 * @param {string} id - UUID do registro.
 * @returns {Promise<Object|null>}
 */
async function sbBuscar(tabela, id) {
  const rows = await sbListar(tabela, `id=eq.${encodeURIComponent(id)}&limit=1`);
  return rows[0] ?? null;
}

/**
 * Inserir um novo registro.
 * @param {string} tabela
 * @param {Object} dados - Campos a inserir.
 * @returns {Promise<Object>} Registro inserido.
 */
async function sbInserir(tabela, dados) {
  const res = await fetchComTimeout(`${API}/${tabela}`, {
    method:  'POST',
    headers: HEADERS,
    body:    JSON.stringify(dados)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`[sbInserir] ${tabela}: ${err}`);
  }
  const result = await res.json();
  return Array.isArray(result) ? result[0] : result;
}

/**
 * Atualizar um registro pelo id.
 * @param {string} tabela
 * @param {string} id
 * @param {Object} dados - Campos a atualizar.
 * @returns {Promise<Object>} Registro atualizado.
 */
async function sbAtualizar(tabela, id, dados) {
  const res = await fetchComTimeout(`${API}/${tabela}?id=eq.${encodeURIComponent(id)}`, {
    method:  'PATCH',
    headers: HEADERS,
    body:    JSON.stringify(dados)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`[sbAtualizar] ${tabela}: ${err}`);
  }
  const result = await res.json();
  return Array.isArray(result) ? result[0] : result;
}

/**
 * Excluir um registro pelo id.
 * @param {string} tabela
 * @param {string} id
 * @returns {Promise<true>}
 */
async function sbExcluir(tabela, id) {
  const res = await fetchComTimeout(`${API}/${tabela}?id=eq.${encodeURIComponent(id)}`, {
    method:  'DELETE',
    headers: HEADERS_READ
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`[sbExcluir] ${tabela}: ${err}`);
  }
  return true;
}

/**
 * Contar registros de uma tabela (com filtro opcional).
 * @param {string} tabela
 * @param {string} [query='']
 * @returns {Promise<number>}
 */
async function sbContar(tabela, query = '') {
  const sep = query ? '&' : '?';
  const res = await fetchComTimeout(
    `${API}/${tabela}?select=id${sep}${query}`,
    { headers: HEADERS_READ }
  );
  if (!res.ok) throw new Error(`[sbContar] ${tabela}`);
  const rows = await res.json();
  return rows.length;
}


// ============================================================
//  NUMERAÇÃO AUTOMÁTICA
// ============================================================

/**
 * Gera o próximo número sequencial para uma tabela.
 * Exemplos: proximoNumero('produtos','codigo','P') → 'P00001'
 *
 * @param {string} tabela  - Nome da tabela.
 * @param {string} campo   - Nome da coluna com o número (ex: 'numero', 'codigo').
 * @param {string} prefixo - Prefixo do número (ex: 'P', 'SC', 'PC', 'PV').
 * @param {number} [digitos=5] - Total de dígitos numéricos.
 * @returns {Promise<string>}
 */
async function sbProximoNumero(tabela, campo, prefixo, digitos = 5) {
  const rows = await sbListar(
    tabela,
    `select=${campo}&order=${campo}.desc&limit=1`
  );
  const ultimo = rows.length
    ? parseInt(rows[0][campo].replace(prefixo, ''), 10)
    : 0;
  return prefixo + String(ultimo + 1).padStart(digitos, '0');
}

// Atalhos por entidade
const Numerar = {
  produto:        () => sbProximoNumero('produtos',              'codigo', 'P'),
  solicitacao:    () => sbProximoNumero('compras_solicitacoes',  'numero', 'SC'),
  pedidoCompra:   () => sbProximoNumero('compras_pedidos',       'numero', 'PC'),
  recebimento:    () => sbProximoNumero('compras_recebimentos',  'numero', 'RC'),
  inventario:     () => sbProximoNumero('estoque_inventarios',   'numero', 'INV'),
  movimentacao:   () => sbProximoNumero('estoque_movimentacoes', 'numero', 'MV'),
  pedidoVenda:    () => sbProximoNumero('vendas_pedidos',        'numero', 'PV'),
  romaneio:       () => sbProximoNumero('vendas_romaneios',      'numero', 'ROM'),
  separacao:      () => sbProximoNumero('vendas_separacoes',     'numero', 'SEP'),
  expedicao:      () => sbProximoNumero('vendas_expedicoes',     'numero', 'EXP'),
  entrega:        () => sbProximoNumero('vendas_entregas',        'numero', 'ENT'),
};


// ============================================================
//  AUTENTICAÇÃO
// ============================================================

/** SHA-256 de uma string (Web Crypto API). */
async function sha256(text) {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(text)
  );
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Autenticar usuário do ERP.
 * @param {string} email
 * @param {string} senha - Senha em texto puro (será hasheada).
 * @returns {Promise<Object>} Dados do usuário logado.
 * @throws {Error} Se as credenciais forem inválidas.
 */
async function sbLogin(email, senha) {
  const hash = await sha256(senha);
  const rows = await sbListar(
    'erp_usuarios',
    `email=eq.${encodeURIComponent(email)}&senha_hash=eq.${hash}&status=eq.true` +
    `&select=id,nome,email,cargo,perfil_id,permissoes,perfil(descricao,telas)`
  );
  if (!rows.length) throw new Error('E-mail ou senha incorretos.');

  const user = rows[0];
  const descricaoPerfil = (user.perfil && user.perfil.descricao) || 'Usuário';
  localStorage.setItem('erp_role',       descricaoPerfil);
  localStorage.setItem('erp_perfil_id',  String(user.perfil_id));
  localStorage.setItem('erp_telas',      JSON.stringify((user.perfil && user.perfil.telas) || []));
  localStorage.setItem('erp_user_id',    user.id);
  localStorage.setItem('erp_user_nome',  user.nome);
  localStorage.setItem('erp_user_email', user.email);
  localStorage.setItem('erp_permissoes', JSON.stringify(user.permissoes));
  localStorage.setItem('erp_login',      String(Date.now()));
  return user;
}

/** Encerrar sessão e redirecionar para o login. */
function sbLogout(paginaLogin = '/index.html') {
  localStorage.removeItem('erp_role');
  localStorage.removeItem('erp_perfil_id');
  localStorage.removeItem('erp_telas');
  localStorage.removeItem('erp_user_id');
  localStorage.removeItem('erp_user_nome');
  localStorage.removeItem('erp_user_email');
  localStorage.removeItem('erp_permissoes');
  localStorage.removeItem('erp_login');
  window.location.href = paginaLogin;
}

/** Duração máxima da sessão: 8 horas. */
const SESSAO_MAX_MS = 8 * 60 * 60 * 1000;

/**
 * Verificar se há sessão válida. Redireciona para o login se inválida.
 * Chamar no topo de toda página protegida.
 * @param {string} [paginaLogin='../index.html']
 */
function sbVerificarSessao(paginaLogin = '../index.html') {
  const role  = localStorage.getItem('erp_role');
  const login = parseInt(localStorage.getItem('erp_login') || '0', 10);
  if (!role || Date.now() - login > SESSAO_MAX_MS) {
    localStorage.clear();
    window.location.replace(paginaLogin);
  }
}

/** Retorna o perfil do usuário logado ('Administrador' | 'Usuário'). */
function sbPerfil() {
  return localStorage.getItem('erp_role') ?? null;
}

/** Retorna true se o usuário logado é Administrador. */
function sbIsAdmin() {
  return sbPerfil() === 'Administrador';
}

/**
 * Verifica se o usuário tem permissão para um módulo.
 * Administradores têm acesso a tudo.
 * @param {'visao_geral'|'cadastros'|'compras'|'estoque'|'vendas'} modulo
 * @returns {boolean}
 */
function sbTemPermissao(modulo) {
  if (sbIsAdmin()) return true;
  const perms = JSON.parse(localStorage.getItem('erp_permissoes') || '{}');
  return perms[modulo] === true;
}

/** Redireciona para o dashboard se o usuário não tiver permissão. */
function sbExigirPermissao(modulo, paginaDashboard = '../dashboard.html') {
  if (!sbTemPermissao(modulo)) {
    alert('Você não tem permissão para acessar este módulo.');
    window.location.replace(paginaDashboard);
  }
}

/** Retorna o nome do usuário logado. */
function sbUserNome() {
  return localStorage.getItem('erp_user_nome') ?? 'Usuário';
}


// ============================================================
//  TEMA (claro / escuro)
// ============================================================

/** Aplicar o tema salvo antes do render (evita flash). Chamar no <head>. */
function sbAplicarTema() {
  const t = localStorage.getItem('senai_tema') || 'light';
  document.documentElement.setAttribute('data-theme', t);
}

/** Alternar entre claro e escuro. */
function sbToggleTema() {
  const atual = document.documentElement.getAttribute('data-theme');
  const novo  = atual === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', novo);
  localStorage.setItem('senai_tema', novo);
  return novo;
}

/** Inicializar botão de tema após DOMContentLoaded.
 *  @param {string} btnId - ID do botão de toggle.
 */
function sbIniciarBtnTema(btnId = 'btnTema') {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  const t = localStorage.getItem('senai_tema') || 'light';
  btn.textContent = t === 'dark' ? '☀️ Claro' : '🌙 Escuro';
  btn.addEventListener('click', () => {
    const novo = sbToggleTema();
    btn.textContent = novo === 'dark' ? '☀️ Claro' : '🌙 Escuro';
  });
}


// ============================================================
//  SIDEBAR ACCORDION
// ============================================================

/**
 * Transforma as seções do sidebar em accordion (Cadastros, Compras, Estoque, Vendas e Logística).
 * Chamada automaticamente quando o DOM estiver pronto e houver um .sidebar na página.
 */
function sbInitSidebarAccordion() {
  const ACC_KEYS = ['cadastros', 'compras', 'estoque', 'vendas'];

  document.querySelectorAll('.sidebar-section').forEach(section => {
    const labelEl = section.querySelector('.sidebar-section-label');
    if (!labelEl) return;

    const labelKey = labelEl.textContent.trim().toLowerCase();
    if (!ACC_KEYS.some(k => labelKey.startsWith(k))) return;

    const labelText = labelEl.textContent.trim();
    const hasActive = !!section.querySelector('.sidebar-link.ativo');

    // Botão de toggle
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sidebar-acc-btn';
    btn.innerHTML =
      `<span>${labelText}</span>` +
      `<span class="sidebar-acc-arrow">${hasActive ? '▲' : '▼'}</span>`;

    // Corpo colapsável
    const body = document.createElement('div');
    body.className = 'sidebar-acc-body' + (hasActive ? ' open' : '');

    // Move links para o corpo (mantém labelEl no lugar por enquanto)
    Array.from(section.children).forEach(child => {
      if (child !== labelEl) body.appendChild(child);
    });

    labelEl.replaceWith(btn);
    section.appendChild(body);

    btn.addEventListener('click', () => {
      const open = body.classList.toggle('open');
      btn.querySelector('.sidebar-acc-arrow').textContent = open ? '▲' : '▼';
    });
  });
}

// Auto-init em páginas que possuem sidebar
(function () {
  function _tryInit() {
    if (document.querySelector('.sidebar')) sbInitSidebarAccordion();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _tryInit);
  } else {
    _tryInit();
  }
})();


// ============================================================
//  AUXILIARES DE UI
// ============================================================

/**
 * Exibir mensagem de feedback (sucesso, erro, alerta).
 * @param {string} elId - ID do elemento de mensagem.
 * @param {string} texto
 * @param {'ok'|'err'|'warn'} tipo
 * @param {number} [ms=3000] - Duração antes de ocultar (0 = não ocultar).
 */
function sbMensagem(elId, texto, tipo = 'ok', ms = 3000) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = texto;
  el.className   = `crud-msg ${tipo}`;
  el.style.display = 'block';
  if (ms > 0) setTimeout(() => { el.style.display = 'none'; }, ms);
}

/**
 * Formatar valor monetário brasileiro.
 * @param {number|string} valor
 * @returns {string} ex: 'R$ 1.234,56'
 */
function sbMoeda(valor) {
  return Number(valor || 0).toLocaleString('pt-BR', {
    style:    'currency',
    currency: 'BRL'
  });
}

/**
 * Formatar data ISO para DD/MM/AAAA.
 * @param {string} iso - ex: '2026-08-14'
 * @returns {string} ex: '14/08/2026'
 */
function sbData(iso) {
  if (!iso) return '—';
  const [a, m, d] = iso.split('-');
  return `${d}/${m}/${a}`;
}

/**
 * Preencher um <select> com opções vindas do Supabase.
 * @param {string} selectId - ID do elemento <select>.
 * @param {string} tabela   - Tabela a consultar.
 * @param {string} query    - Query adicional (ex: 'ativo=eq.true&order=nome.asc').
 * @param {string} campoValor  - Campo usado como value da option (geralmente 'id').
 * @param {string} campoTexto  - Campo exibido como label (geralmente 'nome').
 * @param {string} [placeholderTexto='Selecione...']
 */
async function sbPopularSelect(
  selectId, tabela, query,
  campoValor = 'id', campoTexto = 'nome',
  placeholderTexto = 'Selecione...'
) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = `<option value="">— ${placeholderTexto} —</option>`;
  try {
    const rows = await sbListar(tabela, query);
    rows.forEach(r => {
      const opt = document.createElement('option');
      opt.value       = r[campoValor];
      opt.textContent = r[campoTexto];
      sel.appendChild(opt);
    });
  } catch (e) {
    console.error('[sbPopularSelect]', e);
  }
}

/**
 * Integração com ViaCEP — preenche campos de endereço ao sair do CEP.
 * @param {string} cepInputId - ID do input de CEP.
 * @param {{ endereco, cidade, estado }} campos - IDs dos campos a preencher.
 */
function sbViaCEP(cepInputId, campos = {}) {
  const inp = document.getElementById(cepInputId);
  if (!inp) return;
  inp.addEventListener('blur', async () => {
    const cep = inp.value.replace(/\D/g, '');
    if (cep.length !== 8) return;
    try {
      const res  = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (data.erro) return;
      if (campos.endereco) {
        const el = document.getElementById(campos.endereco);
        if (el) el.value = data.logradouro || '';
      }
      if (campos.cidade) {
        const el = document.getElementById(campos.cidade);
        if (el) el.value = data.localidade || '';
      }
      if (campos.estado) {
        const el = document.getElementById(campos.estado);
        if (el) el.value = data.uf || '';
      }
    } catch { /* silencioso */ }
  });
}


// ============================================================
//  ESTOQUE — helpers específicos
// ============================================================

/**
 * Registrar uma movimentação de estoque (Entrada, Saída, Ajuste, Transferência).
 * O trigger do banco atualiza produtos.estoque_atual automaticamente.
 *
 * @param {'Entrada'|'Saída'|'Ajuste'|'Transferência'} tipo
 * @param {string} produtoId
 * @param {number} quantidade
 * @param {Object} [extra={}] - origem, destino, referencia, observacoes, usuario
 * @returns {Promise<Object>} Movimentação criada.
 */
async function sbMovimentarEstoque(tipo, produtoId, quantidade, extra = {}) {
  const numero = await Numerar.movimentacao();
  return sbInserir('estoque_movimentacoes', {
    numero,
    produto_id: produtoId,
    tipo,
    quantidade,
    origem:      extra.origem      ?? null,
    destino:     extra.destino     ?? null,
    referencia:  extra.referencia  ?? null,
    observacoes: extra.observacoes ?? null,
    usuario:     extra.usuario     ?? sbUserNome(),
    data:        new Date().toISOString().split('T')[0],
    hora:        new Date().toTimeString().slice(0, 8)
  });
}

/**
 * Verificar se há estoque suficiente para uma venda.
 * @param {string} produtoId
 * @param {number} qtdNecessaria
 * @returns {Promise<{ok:boolean, atual:number}>}
 */
async function sbVerificarEstoque(produtoId, qtdNecessaria) {
  const prod = await sbBuscar('produtos', produtoId);
  if (!prod) return { ok: false, atual: 0 };
  return { ok: prod.estoque_atual >= qtdNecessaria, atual: prod.estoque_atual };
}


// ============================================================
//  GERAÇÃO DE PDF — Pedido de Compras
// ============================================================

/**
 * Gerar e imprimir o PDF de um Pedido de Compras.
 * Usa window.print() com CSS @media print.
 * @param {Object} pedido - Dados completos do pedido.
 * @param {Object} fornecedor - Dados do fornecedor.
 * @param {Object} produto - Dados do produto.
 */
function sbGerarPDFPedidoCompra(pedido, fornecedor, produto) {
  const win = window.open('', '_blank');
  win.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Pedido de Compras — ${pedido.numero}</title>
      <style>
        body{font-family:Arial,sans-serif;margin:40px;color:#202124}
        h1{color:#004384;font-size:20px;margin-bottom:4px}
        .sub{color:#666;font-size:12px;margin-bottom:24px}
        table{width:100%;border-collapse:collapse;font-size:13px;margin:16px 0}
        th{background:#004384;color:#fff;padding:8px 12px;text-align:left}
        td{padding:8px 12px;border-bottom:1px solid #e0e0e0}
        .valor{font-size:18px;font-weight:700;color:#004384;margin-top:12px}
        .rodape{margin-top:40px;font-size:11px;color:#aaa;border-top:1px solid #e0e0e0;padding-top:12px}
        @media print{body{margin:20px}}
      </style>
    </head>
    <body>
      <h1>📦 Pedido de Compras</h1>
      <div class="sub">${pedido.numero} &nbsp;·&nbsp; Emitido em ${sbData(pedido.data)}</div>
      <table>
        <tr><th colspan="2">Fornecedor</th></tr>
        <tr><td>Razão Social</td><td>${fornecedor.nome}</td></tr>
        <tr><td>CNPJ</td><td>${fornecedor.cnpj ?? '—'}</td></tr>
        <tr><td>Contato</td><td>${fornecedor.contato ?? '—'}</td></tr>
        <tr><td>E-mail</td><td>${fornecedor.email ?? '—'}</td></tr>
        <tr><td>Telefone</td><td>${fornecedor.telefone ?? '—'}</td></tr>
      </table>
      <table>
        <tr><th>Produto</th><th>Qtd</th><th>Unidade</th><th>Preço Unit.</th><th>Valor Total</th></tr>
        <tr>
          <td>${produto.nome} (${produto.codigo})</td>
          <td>${pedido.quantidade}</td>
          <td>${produto.unidade ?? '—'}</td>
          <td>${sbMoeda(pedido.preco_unitario)}</td>
          <td>${sbMoeda(pedido.valor_total)}</td>
        </tr>
      </table>
      <div class="valor">Total: ${sbMoeda(pedido.valor_total)}</div>
      <table>
        <tr><th>Data do Pedido</th><th>Entrega Prevista</th><th>Status</th></tr>
        <tr>
          <td>${sbData(pedido.data)}</td>
          <td>${sbData(pedido.data_prevista) ?? '—'}</td>
          <td>${pedido.status}</td>
        </tr>
      </table>
      ${pedido.observacoes ? `<p><strong>Observações:</strong> ${pedido.observacoes}</p>` : ''}
      <div class="rodape">ERP Senai &nbsp;·&nbsp; Gerado em ${new Date().toLocaleString('pt-BR')}</div>
    </body>
    </html>
  `);
  win.document.close();
  win.focus();
  win.print();
}


// ============================================================
//  INICIALIZAÇÃO AUTOMÁTICA
// ============================================================

// Aplicar tema assim que o script carregar (antes do DOMContentLoaded)
sbAplicarTema();

// Quando o DOM estiver pronto, inicializar o botão de tema (se existir)
document.addEventListener('DOMContentLoaded', () => {
  sbIniciarBtnTema('btnTema');
});
