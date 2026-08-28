/**
 * utils.js
 *
 * Funções utilitárias reutilizáveis
 */

const fs = require('fs').promises;
const path = require('path');

/**
 * Garante que um diretório existe, criando se necessário
 */
async function garantirDiretorio(caminho) {
  try {
    await fs.mkdir(caminho, { recursive: true });
    return true;
  } catch (erro) {
    console.error(`❌ Erro ao criar diretório ${caminho}:`, erro.message);
    throw erro;
  }
}

/**
 * Salva dados em arquivo JSON
 */
async function salvarJSON(caminho, dados) {
  try {
    await garantirDiretorio(path.dirname(caminho));
    await fs.writeFile(caminho, JSON.stringify(dados, null, 2), 'utf-8');
    console.log(`💾 Dados salvos em ${caminho}`);
    return true;
  } catch (erro) {
    console.error(`❌ Erro ao salvar JSON:`, erro.message);
    throw erro;
  }
}

/**
 * Carrega dados de arquivo JSON
 */
async function carregarJSON(caminho) {
  try {
    const conteudo = await fs.readFile(caminho, 'utf-8');
    return JSON.parse(conteudo);
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      console.warn(`⚠️  Arquivo não encontrado: ${caminho}`);
      return null;
    }
    console.error(`❌ Erro ao carregar JSON:`, erro.message);
    throw erro;
  }
}

/**
 * Formata timestamp para log
 */
function formatarTimestamp() {
  return new Date().toISOString().replace('T', ' ').split('.')[0];
}

/**
 * Escreve em arquivo de log
 */
async function escreverLog(arquivo, mensagem) {
  try {
    const timestamp = formatarTimestamp();
    const linha = `[${timestamp}] ${mensagem}\n`;
    await fs.appendFile(arquivo, linha, 'utf-8');
  } catch (erro) {
    console.error(`❌ Erro ao escrever log:`, erro.message);
  }
}

/**
 * Conta extensões de arquivos em um diretório
 */
async function contarPorExtensao(diretorio) {
  const extensoes = {};

  try {
    const arquivos = await fs.readdir(diretorio);

    for (const arquivo of arquivos) {
      const ext = path.extname(arquivo) || '.sem-extensao';
      extensoes[ext] = (extensoes[ext] || 0) + 1;
    }

    return extensoes;
  } catch (erro) {
    console.error(`❌ Erro ao contar extensões:`, erro.message);
    return {};
  }
}

/**
 * Encontra arquivos recursivamente que combinam com um padrão
 */
async function encontrarArquivos(diretorio, padrao) {
  const resultados = [];

  try {
    const itens = await fs.readdir(diretorio, { withFileTypes: true });

    for (const item of itens) {
      const caminhoCompleto = path.join(diretorio, item.name);

      if (item.isDirectory()) {
        const subResultados = await encontrarArquivos(caminhoCompleto, padrao);
        resultados.push(...subResultados);
      } else if (padrao.test(item.name)) {
        resultados.push(caminhoCompleto);
      }
    }
  } catch (erro) {
    console.error(`❌ Erro ao encontrar arquivos em ${diretorio}:`, erro.message);
  }

  return resultados;
}

/**
 * Limpa objeto removendo propriedades vazias
 */
function limparObjeto(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined && v !== '')
  );
}

/**
 * Ordena array de objetos por propriedade
 */
function ordenarPor(array, propriedade, descendente = false) {
  return array.sort((a, b) => {
    const valA = a[propriedade];
    const valB = b[propriedade];

    if (typeof valA === 'string') {
      return descendente
        ? valB.localeCompare(valA)
        : valA.localeCompare(valB);
    }

    return descendente ? valB - valA : valA - valB;
  });
}

module.exports = {
  garantirDiretorio,
  salvarJSON,
  carregarJSON,
  formatarTimestamp,
  escreverLog,
  contarPorExtensao,
  encontrarArquivos,
  limparObjeto,
  ordenarPor
};
