/**
 * verify-uc.js
 *
 * Verificador de integridade de Unidades Curriculares (UCs/Matérias)
 * REGRA 02: Validar estrutura esperada de cada UC
 */

const fs = require('fs').promises;
const path = require('path');
const { ESTRUTURA_UC_OBRIGATORIA, PADROES_ARQUIVOS_UC } = require('./constants');

/**
 * Verifica se uma pasta de UC tem a estrutura esperada
 * REGRA 02: Uma UC deve ter:
 *   - Pasta AULAS
 *   - Pasta AVALIACOES
 *   - Arquivo EMENTA_*.md (com qualquer sufixo)
 *   - Arquivo PLANO_ENSINO.md
 *   - Arquivo APOSTILA_*.md (com qualquer sufixo)
 */
async function verificarEstrutuaUC(caminhoUC, nomeUC) {
  console.log(`📋 Verificando UC: ${nomeUC}`);

  const resultado = {
    uc: nomeUC,
    caminho: caminhoUC,
    estrutura: {
      AULAS: false,
      AVALIACOES: false,
      EMENTA: false,
      PLANO_ENSINO: false,
      APOSTILA: false
    },
    arquivos_encontrados: {
      AULAS: null,
      AVALIACOES: null,
      EMENTA: null,
      PLANO_ENSINO: null,
      APOSTILA: null
    },
    pendencias: []
  };

  try {
    const itens = await fs.readdir(caminhoUC, { withFileTypes: true });

    for (const item of itens) {
      const caminhoCompleto = path.join(caminhoUC, item.name);

      // Verificar pastas
      if (item.isDirectory()) {
        if (item.name === 'AULAS') {
          resultado.estrutura.AULAS = true;
          resultado.arquivos_encontrados.AULAS = caminhoCompleto;
        } else if (item.name === 'AVALIACOES' || item.name === 'AVALIACOES_CRIADAS') {
          resultado.estrutura.AVALIACOES = true;
          resultado.arquivos_encontrados.AVALIACOES = caminhoCompleto;
        }
      }

      // Verificar arquivos
      if (item.isFile()) {
        if (PADROES_ARQUIVOS_UC.EMENTA.test(item.name)) {
          resultado.estrutura.EMENTA = true;
          resultado.arquivos_encontrados.EMENTA = item.name;
        } else if (PADROES_ARQUIVOS_UC.PLANO_ENSINO.test(item.name)) {
          resultado.estrutura.PLANO_ENSINO = true;
          resultado.arquivos_encontrados.PLANO_ENSINO = item.name;
        } else if (PADROES_ARQUIVOS_UC.APOSTILA.test(item.name)) {
          resultado.estrutura.APOSTILA = true;
          resultado.arquivos_encontrados.APOSTILA = item.name;
        }
      }
    }

    // Gerar pendências para itens faltantes
    if (!resultado.estrutura.AULAS) {
      resultado.pendencias.push({
        tipo: 'PASTA',
        item: 'AULAS',
        mensagem: 'Pasta AULAS não encontrada',
        prioridade: 'ALTA'
      });
    }

    if (!resultado.estrutura.AVALIACOES) {
      resultado.pendencias.push({
        tipo: 'PASTA',
        item: 'AVALIACOES',
        mensagem: 'Pasta AVALIACOES não encontrada',
        prioridade: 'ALTA'
      });
    }

    if (!resultado.estrutura.EMENTA) {
      resultado.pendencias.push({
        tipo: 'ARQUIVO',
        item: 'EMENTA_*.md',
        mensagem: 'Arquivo EMENTA não encontrado',
        prioridade: 'ALTA'
      });
    }

    if (!resultado.estrutura.PLANO_ENSINO) {
      resultado.pendencias.push({
        tipo: 'ARQUIVO',
        item: 'PLANO_ENSINO.md',
        mensagem: 'Arquivo PLANO_ENSINO.md não encontrado',
        prioridade: 'ALTA'
      });
    }

    if (!resultado.estrutura.APOSTILA) {
      resultado.pendencias.push({
        tipo: 'ARQUIVO',
        item: 'APOSTILA_*.md',
        mensagem: 'Arquivo APOSTILA não encontrado',
        prioridade: 'MEDIA'
      });
    }

    return resultado;

  } catch (erro) {
    console.error(`❌ Erro ao verificar UC ${nomeUC}:`, erro.message);
    resultado.pendencias.push({
      tipo: 'ERRO',
      item: 'LEITURA',
      mensagem: `Erro ao ler UC: ${erro.message}`,
      prioridade: 'ALTA'
    });
    return resultado;
  }
}

/**
 * Verifica múltiplas UCs e retorna relatório consolidado
 */
async function verificarTodasUCs(ucsArray) {
  console.log(`\n📊 Verificando estrutura de ${ucsArray.length} UCs...\n`);

  const resultados = [];
  const resumo = {
    total_ucs: ucsArray.length,
    ucs_completas: 0,
    ucs_incompletas: 0,
    total_pendencias: 0,
    pendencias_por_tipo: {
      PASTA: 0,
      ARQUIVO: 0,
      ERRO: 0
    }
  };

  for (const uc of ucsArray) {
    const resultado = await verificarEstrutuaUC(uc.caminho, uc.nome);
    resultados.push(resultado);

    // Atualizar resumo
    if (resultado.pendencias.length === 0) {
      resumo.ucs_completas++;
      console.log(`  ✅ ${uc.nome} — Completa`);
    } else {
      resumo.ucs_incompletas++;
      console.log(`  ⚠️  ${uc.nome} — ${resultado.pendencias.length} pendência(s)`);
    }

    resumo.total_pendencias += resultado.pendencias.length;
    resultado.pendencias.forEach(p => {
      resumo.pendencias_por_tipo[p.tipo]++;
    });
  }

  return { resultados, resumo };
}

/**
 * Gera relatório formatado de verificação
 */
function gerarRelatorioVerificacao(verificacao) {
  let relatorio = '📋 RELATÓRIO DE VERIFICAÇÃO DE ESTRUTURA DE UCs\n';
  relatorio += '═'.repeat(70) + '\n\n';

  relatorio += '📊 RESUMO GERAL:\n';
  relatorio += `  Total de UCs: ${verificacao.resumo.total_ucs}\n`;
  relatorio += `  UCs Completas: ${verificacao.resumo.ucs_completas} ✅\n`;
  relatorio += `  UCs Incompletas: ${verificacao.resumo.ucs_incompletas} ⚠️\n`;
  relatorio += `  Total de Pendências: ${verificacao.resumo.total_pendencias}\n\n`;

  relatorio += '📈 PENDÊNCIAS POR TIPO:\n';
  relatorio += `  Pastas: ${verificacao.resumo.pendencias_por_tipo.PASTA}\n`;
  relatorio += `  Arquivos: ${verificacao.resumo.pendencias_por_tipo.ARQUIVO}\n`;
  relatorio += `  Erros: ${verificacao.resumo.pendencias_por_tipo.ERRO}\n\n`;

  relatorio += '🔍 DETALHES POR UC:\n';
  relatorio += '═'.repeat(70) + '\n\n';

  verificacao.resultados.forEach(resultado => {
    relatorio += `📚 ${resultado.uc}\n`;

    if (resultado.pendencias.length === 0) {
      relatorio += '  ✅ Estrutura completa\n\n';
      return;
    }

    resultado.pendencias.forEach(p => {
      const emoji = p.tipo === 'PASTA' ? '📂' : p.tipo === 'ARQUIVO' ? '📄' : '❌';
      const prioridade = p.prioridade === 'ALTA' ? '🔴' : '🟡';
      relatorio += `  ${emoji} ${prioridade} [${p.item}] ${p.mensagem}\n`;
    });
    relatorio += '\n';
  });

  return relatorio;
}

module.exports = {
  verificarEstrutuaUC,
  verificarTodasUCs,
  gerarRelatorioVerificacao
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXECUTAR COMO SCRIPT
// ═══════════════════════════════════════════════════════════════════════════════

if (require.main === module) {
  const { SISTEMA_DIR } = require('./constants');

  (async function() {
    console.log(`
╔═══════════════════════════════════════════════════════════════════╗
║            VERIFICADOR DE ESTRUTURA DE UCs v1.0                  ║
║          Validando conformidade com REGRA 02                     ║
╚═══════════════════════════════════════════════════════════════════╝
`);

    try {
      // Escanear UCs no diretório sistema
      console.log(`🔍 Lendo UCs em ${SISTEMA_DIR}...\n`);
      const itens = await fs.readdir(SISTEMA_DIR, { withFileTypes: true });

      const ucsArray = itens
        .filter(item => item.isDirectory() && !['PROFESSOR', '.claude', 'graphify-out', 'scripts', 'syncdata'].includes(item.name))
        .map(item => ({
          nome: item.name.toUpperCase().replace(/_/g, ' '),
          caminho: path.join(SISTEMA_DIR, item.name)
        }));

      if (ucsArray.length === 0) {
        console.log('⚠️  Nenhuma UC encontrada no diretório sistema');
        process.exit(0);
      }

      // Verificar todas as UCs
      const verificacao = await verificarTodasUCs(ucsArray);

      // Gerar e exibir relatório
      const relatorio = gerarRelatorioVerificacao(verificacao);
      console.log('\n' + relatorio);

      // Resumo final
      console.log(`\n✅ Verificação concluída!\n`);

    } catch (erro) {
      console.error('❌ Erro durante verificação:', erro.message);
      process.exit(1);
    }
  })();
}
