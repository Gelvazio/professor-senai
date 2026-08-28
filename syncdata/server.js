#!/usr/bin/env node

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SYNCDATA SERVER — API REST para sincronização de aulas e pendências
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Exponha endpoints para:
 *   POST /api/sync          - Executar sincronização completa
 *   GET  /api/aulas         - Listar aulas escaneadas
 *   GET  /api/pendencias    - Listar pendências geradas
 *   GET  /api/status        - Status do servidor
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const { scanearAulas } = require('./src/scan-aulas');
const { gerarPendencias, salvarPendencias } = require('./src/generate-pendencias');
const { garantirDiretorio, salvarJSON, carregarJSON } = require('./src/utils');
const { EMOJIS } = require('./src/constants');

// Configuração
const PROJETO_ROOT = path.resolve(__dirname, '../..');
const SISTEMA_DIR = path.resolve(PROJETO_ROOT, 'sistema');
const DATA_DIR = path.join(__dirname, 'data');
const PORT = process.env.PORT || 3333;

// Cache global
let cache = {
  aulas: null,
  pendencias: null,
  ultimaAtualizacao: null
};

// Criar aplicação Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ═══════════════════════════════════════════════════════════════════════════════
// ROTAS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * GET /api/status
 * Retorna status do servidor
 */
app.get('/api/status', (req, res) => {
  res.json({
    sucesso: true,
    servidor: 'SYNCDATA v1.0.0',
    tempo: new Date().toISOString(),
    cache: {
      aulasCacheadas: cache.aulas?.length || 0,
      pendenciasCacheadas: cache.pendencias?.length || 0,
      ultimaAtualizacao: cache.ultimaAtualizacao
    }
  });
});

/**
 * POST /api/sync
 * Executa sincronização completa
 */
app.post('/api/sync', async (req, res) => {
  console.log(`\n${EMOJIS.SINCRONIZANDO} Sincronização iniciada via API...\n`);

  try {
    // Escanear aulas
    console.log(`${EMOJIS.PROCURANDO} Escaneando aulas...`);
    const aulas = await scanearAulas(SISTEMA_DIR);
    cache.aulas = aulas;

    console.log(`${EMOJIS.SUCESSO} ${aulas.length} aulas encontradas`);

    // Gerar pendências
    console.log(`${EMOJIS.PENDENCIA} Gerando pendências...`);
    const pendencias = await gerarPendencias(SISTEMA_DIR, aulas);
    cache.pendencias = pendencias;

    console.log(`${EMOJIS.SUCESSO} ${pendencias.length} pendências identificadas`);

    // Salvar cache
    await garantirDiretorio(DATA_DIR);
    await salvarJSON(path.join(DATA_DIR, 'aulas.json'), aulas);
    await salvarJSON(path.join(DATA_DIR, 'pendencias.json'), pendencias);

    cache.ultimaAtualizacao = new Date().toISOString();

    res.json({
      sucesso: true,
      mensagem: 'Sincronização concluída',
      dados: {
        totalAulas: aulas.length,
        totalPendencias: pendencias.length,
        timestamp: cache.ultimaAtualizacao
      }
    });

    console.log(`\n${EMOJIS.SUCESSO} Sincronização concluída!\n`);

  } catch (erro) {
    console.error(`${EMOJIS.ERRO} Erro na sincronização:`, erro.message);
    res.status(500).json({
      sucesso: false,
      erro: erro.message
    });
  }
});

/**
 * GET /api/aulas
 * Retorna aulas cacheadas
 */
app.get('/api/aulas', async (req, res) => {
  try {
    if (!cache.aulas) {
      const aulas = await carregarJSON(path.join(DATA_DIR, 'aulas.json'));
      cache.aulas = aulas || [];
    }

    res.json({
      sucesso: true,
      total: cache.aulas.length,
      aulas: cache.aulas
    });
  } catch (erro) {
    console.error(`${EMOJIS.ERRO} Erro ao listar aulas:`, erro.message);
    res.status(500).json({
      sucesso: false,
      erro: erro.message
    });
  }
});

/**
 * GET /api/pendencias
 * Retorna pendências cacheadas
 */
app.get('/api/pendencias', async (req, res) => {
  try {
    if (!cache.pendencias) {
      const pendencias = await carregarJSON(path.join(DATA_DIR, 'pendencias.json'));
      cache.pendencias = pendencias || [];
    }

    // Filtrar por status se solicitado
    let resultado = cache.pendencias;
    if (req.query.status) {
      resultado = resultado.filter(p => p.status === req.query.status.toUpperCase());
    }

    res.json({
      sucesso: true,
      total: resultado.length,
      pendencias: resultado
    });
  } catch (erro) {
    console.error(`${EMOJIS.ERRO} Erro ao listar pendências:`, erro.message);
    res.status(500).json({
      sucesso: false,
      erro: erro.message
    });
  }
});

/**
 * GET /api/resumo
 * Retorna resumo da sincronização
 */
app.get('/api/resumo', async (req, res) => {
  try {
    const aulas = cache.aulas || [];
    const pendencias = cache.pendencias || [];

    const porUC = {};
    const porStatus = {};

    aulas.forEach(a => {
      const uc = a.unidade_curricular || 'SEM UC';
      porUC[uc] = (porUC[uc] || 0) + 1;
    });

    pendencias.forEach(p => {
      porStatus[p.status] = (porStatus[p.status] || 0) + 1;
    });

    res.json({
      sucesso: true,
      resumo: {
        totalAulas: aulas.length,
        totalPendencias: pendencias.length,
        aulaPorUC: porUC,
        pendenciasPorStatus: porStatus,
        ultimaAtualizacao: cache.ultimaAtualizacao
      }
    });
  } catch (erro) {
    console.error(`${EMOJIS.ERRO} Erro ao gerar resumo:`, erro.message);
    res.status(500).json({
      sucesso: false,
      erro: erro.message
    });
  }
});

/**
 * Health check
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    sucesso: false,
    erro: 'Rota não encontrada'
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// INICIALIZAÇÃO
// ═══════════════════════════════════════════════════════════════════════════════

async function iniciar() {
  try {
    // Verificar se Express está instalado
    if (!require.resolve('express')) {
      console.error(`${EMOJIS.ERRO} Express não está instalado!`);
      console.log('Execute: npm install express cors');
      process.exit(1);
    }
  } catch (e) {
    // Express não está instalado
  }

  server = app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════════════╗
║              SYNCDATA SERVER INICIADO v1.0.0                    ║
╚═══════════════════════════════════════════════════════════════════╝
🌐 Servidor: http://localhost:${PORT}
📊 Status: http://localhost:${PORT}/api/status
🔄 Sincronizar: POST http://localhost:${PORT}/api/sync
📋 Aulas: http://localhost:${PORT}/api/aulas
📋 Pendências: http://localhost:${PORT}/api/pendencias
📊 Resumo: http://localhost:${PORT}/api/resumo

⏹️  Para parar: CTRL+C
`);
  });
}

// Iniciar servidor se chamado diretamente
if (require.main === module) {
  iniciar();
}

module.exports = { app, cache };
