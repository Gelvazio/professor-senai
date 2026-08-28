/**
 * constants.js
 *
 * Constantes do projeto SYNCDATA
 */

// Versão
const VERSION = '1.0.0';

// Status de pendências
const STATUS_PENDENCIA = {
  PENDENTE: 'PENDENTE',
  EM_PROGRESSO: 'EM_PROGRESSO',
  BLOQUEADA: 'BLOQUEADA',
  CONCLUIDA: 'CONCLUIDA'
};

// Prioridades
const PRIORIDADES = {
  ALTA: 'ALTA',
  MEDIA: 'MEDIA',
  BAIXA: 'BAIXA'
};

// Tipos de pendência
const TIPOS_PENDENCIA = {
  AULA: 'AULA',
  MATERIAL: 'MATERIAL',
  ATIVIDADE: 'ATIVIDADE',
  AVALIACAO: 'AVALIAÇÃO',
  OUTRO: 'OUTRO'
};

// Padrões de busca
const PADROES_BUSCA = {
  AULA: /AULA/i,
  SLIDE: /^SLIDE_/i,
  ATIVIDADE: /atividade|exercicio|lista/i,
  MATERIAL: /material|conteudo|apostila/i,
  AVALIACAO: /prova|teste|avaliacao|quiz/i
};

// Extensões válidas
const EXTENSOES_VALIDAS = [
  '.html',
  '.md',
  '.pdf',
  '.docx',
  '.xlsx',
  '.pptx',
  '.txt'
];

// ── REGRA 01 ──
// Ler TODAS as pastas dentro de C:\fontes\professor-senai\sistema
// com EXCEÇÃO para: PROFESSOR, .claude, graphify-out, scripts
// Pastas ignoradas
const PASTAS_IGNORADAS = [
  'PROFESSOR',        // Pasta do professor (não é UC)
  '.claude',          // Configurações Claude Code
  'graphify-out',     // Output do graphify
  'scripts',          // Scripts auxiliares
  'syncdata',         // Próprio projeto syncdata
  '.git',
  '.gitignore',
  'node_modules',
  '.DS_Store',
  'Thumbs.db',
  '.vscode',
  '.idea'
];

// Nomes de unidades curriculares conhecidas
const UNIDADES_CURRICULARESCONHECIDAS = [
  'INTRODUÇÃO À TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÃO',
  'FUNDAMENTOS DA TECNOLOGIA E PROGRAMAÇÃO',
  'BANCO DE DADOS',
  'LÓGICA PROGRAMAÇÃO',
  'TÉCNICO DE INFORMÁTICA PARA INTERNET',
  'INTRODUÇÃO À COMUNICAÇÃO ORAL E ESCRITA PARA O MUNDO DO TRABALHO',
  'REFORÇO MATEMÁTICA E RACIOCÍNIO LÓGICO'
];

// Configurações de processamento
const CONFIG = {
  TIMEOUT_ARQUIVO: 5000, // ms
  MAX_AULAS_POR_CHUNK: 100,
  LOG_VERBOSE: process.env.VERBOSE === 'true',
  CACHE_ENABLED: process.env.CACHE === 'true'
};

// Emojis para logs
const EMOJIS = {
  PROCURANDO: '🔍',
  LENDO: '📝',
  SALVANDO: '💾',
  SUCESSO: '✅',
  ERRO: '❌',
  AVISO: '⚠️',
  RELATORIO: '📊',
  SINCRONIZANDO: '🔄',
  PASTA: '📂',
  ARQUIVO: '📄',
  AULA: '🎓',
  PENDENCIA: '📋',
  SINO: '🔔'
};

module.exports = {
  VERSION,
  STATUS_PENDENCIA,
  PRIORIDADES,
  TIPOS_PENDENCIA,
  PADROES_BUSCA,
  EXTENSOES_VALIDAS,
  PASTAS_IGNORADAS,
  UNIDADES_CURRICULARESCONHECIDAS,
  CONFIG,
  EMOJIS
};
