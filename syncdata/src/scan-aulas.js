/**
 * scan-aulas.js
 *
 * Scanner de aulas — percorre as pastas e identifica aulas, materiais e atividades
 */

const fs = require('fs').promises;
const path = require('path');
const { PASTAS_IGNORADAS, SISTEMA_DIR } = require('./constants');

// Padrões de nomes de aulas
const PADROES_AULA = [
  /^AULA-(\d+)-(\d{2})-(\d{2})-(\d{4})/i, // AULA-01-03-08-2026
  /^AULA-(\d+)/i,                         // AULA-01
  /^AULA(\d+)/i,                          // AULA01
];

const EXTENSOES_AULA = ['.html', '.md', '.pdf'];

/**
 * Verifica se uma pasta é uma aula baseado em seu nome
 */
function ehAula(nomePasta) {
  return PADROES_AULA.some(padrao => padrao.test(nomePasta));
}

/**
 * Extrai número da aula do nome
 */
function extrairNumeroAula(nomePasta) {
  for (const padrao of PADROES_AULA) {
    const match = nomePasta.match(padrao);
    if (match) {
      return parseInt(match[1], 10);
    }
  }
  return null;
}

/**
 * Extrai data da aula do nome (se disponível)
 */
function extrairDataAula(nomePasta) {
  const match = nomePasta.match(/(\d{2})-(\d{2})-(\d{4})/);
  if (match) {
    return `${match[3]}-${match[2]}-${match[1]}`; // YYYY-MM-DD
  }
  return null;
}

/**
 * Verifica se arquivo é relacionado a aula
 */
function ehArquivoAula(nomeArquivo) {
  const ext = path.extname(nomeArquivo).toLowerCase();
  const temExtensaoValida = EXTENSOES_AULA.includes(ext);
  const ehSlide = /^SLIDE_/i.test(nomeArquivo);
  const temPalavraAula = /aula|atividade|conteudo|exercicio/i.test(nomeArquivo);

  return temExtensaoValida && (ehSlide || temPalavraAula);
}

/**
 * Processa recursivamente uma pasta procurando por aulas
 */
async function processarPasta(diretorio, uc = null) {
  console.log(`📂 Processando ${diretorio}...`);

  const aulas = [];

  try {
    const itens = await fs.readdir(diretorio, { withFileTypes: true });

    for (const item of itens) {
      // Ignorar pastas específicas
      if (PASTAS_IGNORADAS.includes(item.name)) continue;

      const caminhoCompleto = path.join(diretorio, item.name);

      if (item.isDirectory()) {
        // Verificar se é uma aula
        if (ehAula(item.name)) {
          const aula = {
            numero: extrairNumeroAula(item.name),
            nome: item.name,
            caminho: caminhoCompleto,
            data: extrairDataAula(item.name),
            unidade_curricular: uc,
            arquivos: [],
            status: 'ENCONTRADA'
          };

          // Procurar arquivos dentro da aula
          try {
            const arquivosAula = await fs.readdir(caminhoCompleto);
            aula.arquivos = arquivosAula
              .filter(f => ehArquivoAula(f))
              .map(f => ({
                nome: f,
                caminho: path.join(caminhoCompleto, f)
              }));
          } catch (e) {
            console.warn(`⚠️  Erro ao ler aula ${item.name}:`, e.message);
          }

          aulas.push(aula);
        } else {
          // Recursivamente processar subpastas
          const uc_novo = item.name.toUpperCase().replace(/_/g, ' ');
          const subAulas = await processarPasta(caminhoCompleto, uc_novo);
          aulas.push(...subAulas);
        }
      }
    }
  } catch (erro) {
    console.error(`❌ Erro ao processar ${diretorio}:`, erro.message);
  }

  return aulas;
}

/**
 * Função principal — scaneia aulas a partir de uma raiz
 */
async function scanearAulas(sistemaDir = SISTEMA_DIR) {
  // Se não fornecido, usa a constante SISTEMA_DIR automaticamente
  console.log(`\n🔍 Iniciando scan de aulas em ${sistemaDir}...\n`);

  try {
    const aulas = await processarPasta(sistemaDir);

    // Ordenar por número
    aulas.sort((a, b) => (a.numero || 999) - (b.numero || 999));

    console.log(`\n✅ Scan completo! Encontradas ${aulas.length} aulas\n`);

    return aulas;
  } catch (erro) {
    console.error('❌ Erro durante scan:', erro.message);
    throw erro;
  }
}

/**
 * Gera relatório formatado das aulas
 */
function gerarRelatoriAulas(aulas) {
  const porUC = {};

  aulas.forEach(aula => {
    const uc = aula.unidade_curricular || 'SEM UC';
    if (!porUC[uc]) porUC[uc] = [];
    porUC[uc].push(aula);
  });

  let relatorio = '📊 RELATÓRIO DE AULAS\n';
  relatorio += '═'.repeat(60) + '\n\n';

  Object.entries(porUC).forEach(([uc, aulasUC]) => {
    relatorio += `📚 ${uc}\n`;
    aulasUC.forEach(aula => {
      relatorio += `  └─ [${aula.numero}] ${aula.nome}`;
      if (aula.data) relatorio += ` (${aula.data})`;
      if (aula.arquivos.length > 0) relatorio += ` (${aula.arquivos.length} arquivo${aula.arquivos.length !== 1 ? 's' : ''})`;
      relatorio += '\n';
    });
    relatorio += '\n';
  });

  return relatorio;
}

module.exports = {
  scanearAulas,
  processarPasta,
  gerarRelatoriAulas,
  ehAula,
  extrairNumeroAula,
  extrairDataAula,
  ehArquivoAula
};
