// Classe para gerenciar pendências
class PendenciaManager {
  constructor() {
    this.pendencias = this.carregarDoDados();
    this.pendenciaEmEdicao = null;
    this.pendenciaParaDelecao = null;
    this.init();
  }

  init() {
    this.vincularEventos();
    this.renderizarPendencias();
  }

  carregarDoDados() {
    const dados = localStorage.getItem('pendencias');
    if (dados) {
      return JSON.parse(dados);
    }

    // Dados iniciais - matérias padrão
    return [
      {
        id: Date.now().toString() + '1',
        descricao: 'BANCO DE DADOS - Preparar aulas e materiais',
        status: 'PENDENTE',
        prioridade: 'ALTA',
        categoria: 'Matéria',
        data: new Date().toISOString().split('T')[0],
        datavencimento: '',
        total_horas: 0,
        horas_ministradas: 0,
        criado_em: new Date().toISOString(),
        atualizado_em: new Date().toISOString(),
      },
      {
        id: Date.now().toString() + '2',
        descricao: 'Fundamentos da Tecnologia e Programação - Estruturar conteúdo',
        status: 'PENDENTE',
        prioridade: 'ALTA',
        categoria: 'Matéria',
        data: new Date().toISOString().split('T')[0],
        datavencimento: '',
        total_horas: 0,
        horas_ministradas: 0,
        criado_em: new Date().toISOString(),
        atualizado_em: new Date().toISOString(),
      },
      {
        id: Date.now().toString() + '3',
        descricao: 'REFORÇO MATEMATICA E RACIOCINIO LOGICO - Preparar exercícios',
        status: 'PENDENTE',
        prioridade: 'ALTA',
        categoria: 'Matéria',
        data: new Date().toISOString().split('T')[0],
        datavencimento: '',
        total_horas: 0,
        horas_ministradas: 0,
        criado_em: new Date().toISOString(),
        atualizado_em: new Date().toISOString(),
      },
      {
        id: Date.now().toString() + '4',
        descricao: 'INTRODUCAO A COMUNICACAO ORAL E ESCRITA - Definir plano de aulas',
        status: 'PENDENTE',
        prioridade: 'NORMAL',
        categoria: 'Matéria',
        data: new Date().toISOString().split('T')[0],
        datavencimento: '',
        total_horas: 0,
        horas_ministradas: 0,
        criado_em: new Date().toISOString(),
        atualizado_em: new Date().toISOString(),
      },
      {
        id: Date.now().toString() + '5',
        descricao: 'ANALISE DE DADOS APLICADA A GESTAO - Preparar bases de dados',
        status: 'PENDENTE',
        prioridade: 'NORMAL',
        categoria: 'Matéria',
        data: new Date().toISOString().split('T')[0],
        datavencimento: '',
        total_horas: 0,
        horas_ministradas: 0,
        criado_em: new Date().toISOString(),
        atualizado_em: new Date().toISOString(),
      },
      {
        id: Date.now().toString() + '6',
        descricao: 'TESTES DE FRONTEND - Documentar estratégia de testes',
        status: 'PENDENTE',
        prioridade: 'NORMAL',
        categoria: 'Matéria',
        data: new Date().toISOString().split('T')[0],
        datavencimento: '',
        total_horas: 0,
        horas_ministradas: 0,
        criado_em: new Date().toISOString(),
        atualizado_em: new Date().toISOString(),
      },
    ];
  }

  salvarNoDados() {
    localStorage.setItem('pendencias', JSON.stringify(this.pendencias));
  }

  vincularEventos() {
    // Botão nova pendência
    document.getElementById('btnNewPendencia').addEventListener('click', () => {
      this.abrirFormularioNova();
    });

    // Fechar modal
    document.getElementById('closeModal').addEventListener('click', () => {
      this.fecharFormulario();
    });

    document.getElementById('cancelBtn').addEventListener('click', () => {
      this.fecharFormulario();
    });

    // Enviar formulário
    document.getElementById('pendenciaForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.salvarPendencia();
    });

    // Busca
    document.getElementById('searchInput').addEventListener('input', (e) => {
      this.aplicarFiltros();
    });

    // Filtro de status
    document.getElementById('filterStatus').addEventListener('change', () => {
      this.aplicarFiltros();
    });

    // Modal de exclusão
    document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
      this.fecharModalDelecao();
    });

    document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
      this.confirmarDelecao();
    });

    // Fechar modais ao clicar fora
    document.getElementById('formModal').addEventListener('click', (e) => {
      if (e.target.id === 'formModal') {
        this.fecharFormulario();
      }
    });

    document.getElementById('deleteConfirmModal').addEventListener('click', (e) => {
      if (e.target.id === 'deleteConfirmModal') {
        this.fecharModalDelecao();
      }
    });
  }

  abrirFormularioNova() {
    this.pendenciaEmEdicao = null;
    document.getElementById('modalTitle').textContent = 'Nova Pendência';
    document.getElementById('pendenciaForm').reset();
    this.abrirFormulario();
  }

  abrirFormularioEdicao(id) {
    const pendencia = this.pendencias.find((p) => p.id === id);
    if (!pendencia) return;

    this.pendenciaEmEdicao = id;
    document.getElementById('modalTitle').textContent = 'Editar Pendência';

    // Preencher formulário
    document.getElementById('descricao').value = pendencia.descricao;
    document.getElementById('status').value = pendencia.status;
    document.getElementById('prioridade').value = pendencia.prioridade;
    document.getElementById('data').value = pendencia.data || '';
    document.getElementById('datavencimento').value = pendencia.datavencimento || '';
    document.getElementById('total_horas').value = pendencia.total_horas || '';
    document.getElementById('horas_ministradas').value = pendencia.horas_ministradas || '';
    document.getElementById('categoria').value = pendencia.categoria || '';

    this.abrirFormulario();
  }

  abrirFormulario() {
    document.getElementById('formModal').classList.remove('hidden');
  }

  fecharFormulario() {
    document.getElementById('formModal').classList.add('hidden');
    this.pendenciaEmEdicao = null;
  }

  salvarPendencia() {
    const descricao = document.getElementById('descricao').value;
    const status = document.getElementById('status').value;
    const prioridade = document.getElementById('prioridade').value;
    const data = document.getElementById('data').value;
    const datavencimento = document.getElementById('datavencimento').value;
    const total_horas = parseFloat(document.getElementById('total_horas').value) || 0;
    const horas_ministradas = parseFloat(document.getElementById('horas_ministradas').value) || 0;
    const categoria = document.getElementById('categoria').value;

    if (!descricao.trim()) {
      alert('Descrição é obrigatória!');
      return;
    }

    if (this.pendenciaEmEdicao) {
      // Editar existente
      const index = this.pendencias.findIndex((p) => p.id === this.pendenciaEmEdicao);
      if (index !== -1) {
        this.pendencias[index] = {
          ...this.pendencias[index],
          descricao: descricao.trim(),
          status,
          prioridade,
          data,
          datavencimento,
          total_horas,
          horas_ministradas,
          categoria,
          atualizado_em: new Date().toISOString(),
        };
      }
    } else {
      // Criar nova
      const novaPendencia = {
        id: Date.now().toString(),
        descricao: descricao.trim(),
        status,
        prioridade,
        data,
        datavencimento,
        total_horas,
        horas_ministradas,
        categoria,
        criado_em: new Date().toISOString(),
        atualizado_em: new Date().toISOString(),
      };
      this.pendencias.push(novaPendencia);
    }

    this.salvarNoDados();
    this.renderizarPendencias();
    this.fecharFormulario();
  }

  abrirModalDelecao(id) {
    this.pendenciaParaDelecao = id;
    const pendencia = this.pendencias.find((p) => p.id === id);
    if (pendencia) {
      document.getElementById('deleteMessage').textContent =
        `Tem certeza que deseja excluir: "${pendencia.descricao}"?`;
    }
    document.getElementById('deleteConfirmModal').classList.remove('hidden');
  }

  fecharModalDelecao() {
    document.getElementById('deleteConfirmModal').classList.add('hidden');
    this.pendenciaParaDelecao = null;
  }

  confirmarDelecao() {
    if (this.pendenciaParaDelecao) {
      this.pendencias = this.pendencias.filter((p) => p.id !== this.pendenciaParaDelecao);
      this.salvarNoDados();
      this.renderizarPendencias();
      this.fecharModalDelecao();
    }
  }

  togglePendencia(id) {
    const pendencia = this.pendencias.find((p) => p.id === id);
    if (pendencia) {
      pendencia.status = pendencia.status === 'PENDENTE' ? 'CONCLUIDA' : 'PENDENTE';
      pendencia.atualizado_em = new Date().toISOString();
      this.salvarNoDados();
      this.renderizarPendencias();
    }
  }

  aplicarFiltros() {
    const busca = document.getElementById('searchInput').value.toLowerCase();
    const statusFiltro = document.getElementById('filterStatus').value;

    const pendenciasFiltradas = this.pendencias.filter((p) => {
      const matchBusca =
        p.descricao.toLowerCase().includes(busca) ||
        p.categoria.toLowerCase().includes(busca);
      const matchStatus = !statusFiltro || p.status === statusFiltro;
      return matchBusca && matchStatus;
    });

    this.renderizarPendenciasCustomizadas(pendenciasFiltradas);
  }

  renderizarPendencias() {
    this.atualizarEstatisticas();
    this.renderizarPendenciasCustomizadas(this.pendencias);
  }

  atualizarEstatisticas() {
    const total = this.pendencias.length;
    const pendentes = this.pendencias.filter((p) => p.status === 'PENDENTE').length;
    const concluidas = this.pendencias.filter((p) => p.status === 'CONCLUIDA').length;

    document.getElementById('totalCount').textContent = total;
    document.getElementById('pendingCount').textContent = pendentes;
    document.getElementById('completedCount').textContent = concluidas;
  }

  renderizarPendenciasCustomizadas(pendencias) {
    const lista = document.getElementById('pendenciasList');

    if (pendencias.length === 0) {
      lista.innerHTML = `
        <div class="empty-state">
          <p>📭 Nenhuma pendência encontrada</p>
          <p class="empty-hint">Clique em "Nova Pendência" para começar</p>
        </div>
      `;
      return;
    }

    // Ordenar por data de vencimento e prioridade
    const ordenadas = [...pendencias].sort((a, b) => {
      const prioridades = { ALTA: 0, NORMAL: 1, BAIXA: 2 };
      if (a.status !== b.status) {
        return a.status === 'PENDENTE' ? -1 : 1;
      }
      if ((a.datavencimento || '') !== (b.datavencimento || '')) {
        return (a.datavencimento || '').localeCompare(b.datavencimento || '');
      }
      return (prioridades[a.prioridade] || 1) - (prioridades[b.prioridade] || 1);
    });

    lista.innerHTML = ordenadas
      .map((p) => this.criarCardPendencia(p))
      .join('');

    // Vincular eventos dos checkboxes
    ordenadas.forEach((p) => {
      const checkbox = lista.querySelector(`[data-id="${p.id}"] .pendencia-checkbox`);
      if (checkbox) {
        checkbox.addEventListener('change', () => this.togglePendencia(p.id));
      }

      const btnEditar = lista.querySelector(`[data-id="${p.id}"] .btn-edit`);
      if (btnEditar) {
        btnEditar.addEventListener('click', () => this.abrirFormularioEdicao(p.id));
      }

      const btnDeleta = lista.querySelector(`[data-id="${p.id}"] .btn-delete`);
      if (btnDeleta) {
        btnDeleta.addEventListener('click', () => this.abrirModalDelecao(p.id));
      }
    });
  }

  criarCardPendencia(p) {
    const statusClass = p.status === 'CONCLUIDA' ? 'completed' : '';
    const dataFormatada = p.data ? new Date(p.data).toLocaleDateString('pt-BR') : '';
    const dataVencimentoFormatada = p.datavencimento
      ? new Date(p.datavencimento).toLocaleDateString('pt-BR')
      : '';

    const percentualHoras =
      p.total_horas > 0 ? Math.round((p.horas_ministradas / p.total_horas) * 100) : 0;

    return `
      <div class="pendencia-card ${statusClass}" data-id="${p.id}">
        <input
          type="checkbox"
          class="pendencia-checkbox"
          ${p.status === 'CONCLUIDA' ? 'checked' : ''}
        />
        <div class="pendencia-content">
          <div class="pendencia-header">
            <div class="pendencia-title">${this.escaparHtml(p.descricao)}</div>
          </div>
          <div class="pendencia-badges">
            <span class="badge badge-status ${p.status}">${p.status}</span>
            <span class="badge badge-prioridade ${p.prioridade}">${p.prioridade}</span>
            ${p.categoria ? `<span class="badge">${this.escaparHtml(p.categoria)}</span>` : ''}
          </div>
          <div class="pendencia-meta">
            ${p.data ? `<div class="meta-item">📅 ${dataFormatada}</div>` : ''}
            ${
              p.datavencimento
                ? `<div class="meta-item">⏰ Vence: ${dataVencimentoFormatada}</div>`
                : ''
            }
            ${
              p.total_horas > 0
                ? `<div class="meta-item">⏱️ ${p.horas_ministradas}/${p.total_horas}h (${percentualHoras}%)</div>`
                : ''
            }
          </div>
        </div>
        <div class="pendencia-actions">
          <button class="action-btn btn-edit" title="Editar">✏️</button>
          <button class="action-btn btn-delete delete" title="Excluir">🗑️</button>
        </div>
      </div>
    `;
  }

  escaparHtml(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
  }
}

// Iniciar aplicação
const app = new PendenciaManager();
