/**
 * verify-uc.js
 *
 * Verificador de integridade de Unidades Curriculares (UCs/Matérias)
 * REGRA 02: Validar estrutura esperada de cada UC
 */

const fs = require('fs').promises;
const path = require('path');
const { ESTRUTURA_UC_OBRIGATORIA, PADROES_ARQUIVOS_UC, PADROES_GERAR_SLIDES, PADROES_ATIVIDADES, PADROES_SUBSTITUICOES } = require('./constants');

/**
 * Extrai a quantidade de horas do arquivo EMENTA
 * Procura por padrões como "40 horas", "Carga horária: 40h", etc
 */
async function extrairHorasEmenta(caminhoUC) {
  try {
    const itens = await fs.readdir(caminhoUC, { withFileTypes: true });

    for (const item of itens) {
      if (item.isFile() && PADROES_ARQUIVOS_UC.EMENTA.test(item.name)) {
        const caminhoEmenta = path.join(caminhoUC, item.name);
        const conteudo = await fs.readFile(caminhoEmenta, 'utf-8');

        // Procurar por padrões de horas:
        // "40 horas", "40h", "40 h", "Carga horária: 40", "Total: 40 horas", etc
        const regexHoras = /(\d+)\s*(?:horas|h|hora)/i;
        const match = conteudo.match(regexHoras);

        if (match) {
          return parseInt(match[1], 10);
        }
      }
    }
  } catch (erro) {
    // Se houver erro ao ler ementa, retorna null
    return null;
  }

  return null;
}

/**
 * Calcula número esperado de atividades baseado em horas de aula
 * Fórmula: Para cada 2 horas = 1 atividade
 */
function calcularAtividadesEsperadas(horas) {
  if (!horas || horas <= 0) return 0;
  return Math.ceil(horas / 2);
}

/**
 * Verifica se uma pasta de UC tem a estrutura esperada
 * REGRA 02: Uma UC deve ter:
 *   - Pasta AULAS
 *   - Pasta AVALIACOES
 *   - Arquivo EMENTA_*.md (com qualquer sufixo)
 *   - Arquivo PLANO_ENSINO.md
 *   - Arquivo APOSTILA_*.md (com qualquer sufixo)
 * REGRA 04: Uma UC deve ter:
 *   - Pasta ATIVIDADES
 *   - Arquivo GERAR_ATIVIDADES.js
 *   - Número mínimo de ATIVIDADE_NN.md baseado em horas de aula
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
      APOSTILA: false,
      GERAR_SLIDES: false,            // REGRA 03
      ATIVIDADES: false,              // REGRA 04
      GERAR_ATIVIDADES: false,        // REGRA 04
      SUBSTITUICOES: false,           // REGRA 05
      SUBSTITUICOES_CLAUDE: false     // REGRA 05
    },
    arquivos_encontrados: {
      AULAS: null,
      AVALIACOES: null,
      EMENTA: null,
      PLANO_ENSINO: null,
      APOSTILA: null,
      GERAR_SLIDES: null,             // REGRA 03
      ATIVIDADES: null,               // REGRA 04
      GERAR_ATIVIDADES: null,         // REGRA 04
      ATIVIDADES_MD: [],              // Lista de ATIVIDADE_NN.md encontrados
      ATIVIDADES_PDF: [],             // Lista de ATIVIDADE_NN_VERSAO_IMPRESSA.pdf encontrados
      SUBSTITUICOES: null,            // REGRA 05
      SUBSTITUICOES_CLAUDE: null      // REGRA 05
    },
    horas_aula: null,
    atividades_esperadas: 0,
    atividades_encontradas: 0,
    pendencias: []
  };

  try {
    // Extrair horas da EMENTA
    resultado.horas_aula = await extrairHorasEmenta(caminhoUC);
    resultado.atividades_esperadas = calcularAtividadesEsperadas(resultado.horas_aula);

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
        } else if (item.name === 'ATIVIDADES') {
          resultado.estrutura.ATIVIDADES = true;
          resultado.arquivos_encontrados.ATIVIDADES = caminhoCompleto;

          // Procurar por atividades dentro da pasta ATIVIDADES
          try {
            const atividadesItens = await fs.readdir(caminhoCompleto, { withFileTypes: true });
            for (const atividadeItem of atividadesItens) {
              if (atividadeItem.isFile()) {
                const matchMD = atividadeItem.name.match(PADROES_ATIVIDADES.ATIVIDADE_MD);
                const matchPDF = atividadeItem.name.match(PADROES_ATIVIDADES.ATIVIDADE_PDF);

                if (matchMD) {
                  resultado.arquivos_encontrados.ATIVIDADES_MD.push(atividadeItem.name);
                  resultado.atividades_encontradas++;
                }
                if (matchPDF) {
                  resultado.arquivos_encontrados.ATIVIDADES_PDF.push(atividadeItem.name);
                }
              }
            }
          } catch (e) {
            console.warn(`⚠️  Erro ao ler pasta ATIVIDADES de ${nomeUC}:`, e.message);
          }
        } else if (item.name === 'SUBSTITUICOES') {
          resultado.estrutura.SUBSTITUICOES = true;
          resultado.arquivos_encontrados.SUBSTITUICOES = caminhoCompleto;

          // Procurar por arquivo CLAUDE.md dentro da pasta SUBSTITUICOES
          try {
            const substituicoeItens = await fs.readdir(caminhoCompleto, { withFileTypes: true });
            for (const subItem of substituicoeItens) {
              if (subItem.isFile() && PADROES_SUBSTITUICOES.CLAUDE.test(subItem.name)) {
                resultado.estrutura.SUBSTITUICOES_CLAUDE = true;
                resultado.arquivos_encontrados.SUBSTITUICOES_CLAUDE = subItem.name;
              }
            }
          } catch (e) {
            console.warn(`⚠️  Erro ao ler pasta SUBSTITUICOES de ${nomeUC}:`, e.message);
          }
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
        } else if (PADROES_GERAR_SLIDES.test(item.name)) {
          resultado.estrutura.GERAR_SLIDES = true;
          resultado.arquivos_encontrados.GERAR_SLIDES = item.name;
        } else if (PADROES_ATIVIDADES.GERAR.test(item.name)) {
          resultado.estrutura.GERAR_ATIVIDADES = true;
          resultado.arquivos_encontrados.GERAR_ATIVIDADES = item.name;
        }

        // Avisos: nomenclatura genérica ou incorreta
        if (item.name.match(/^EMENTA\.(md|txt)$/i)) {
          resultado.pendencias.push({
            tipo: 'AVISO',
            item: item.name,
            mensagem: 'EMENTA.md é muito genérico — renomear para EMENTA_<NOME_DA_UC>.md',
            prioridade: 'MEDIA'
          });
        }
        if (item.name.match(/^APOSTILA\.(md|txt|docx)$/i)) {
          resultado.pendencias.push({
            tipo: 'AVISO',
            item: item.name,
            mensagem: 'APOSTILA.md é muito genérico — renomear para APOSTILA_<NOME_DA_UC>.md',
            prioridade: 'MEDIA'
          });
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

    if (!resultado.estrutura.GERAR_SLIDES) {
      resultado.pendencias.push({
        tipo: 'SCRIPT',
        item: 'gerar_slides.js',
        mensagem: 'Script de geração de slides não encontrado (REGRA 03)',
        prioridade: 'MEDIA'
      });
    }

    // REGRA 04 — Verificações de atividades
    if (!resultado.estrutura.ATIVIDADES) {
      resultado.pendencias.push({
        tipo: 'PASTA',
        item: 'ATIVIDADES',
        mensagem: 'Pasta ATIVIDADES não encontrada (REGRA 04)',
        prioridade: 'MEDIA'
      });
    }

    if (!resultado.estrutura.GERAR_ATIVIDADES) {
      resultado.pendencias.push({
        tipo: 'SCRIPT',
        item: 'GERAR_ATIVIDADES.js',
        mensagem: 'Script de geração de atividades não encontrado (REGRA 04)',
        prioridade: 'MEDIA'
      });
    }

    if (resultado.estrutura.ATIVIDADES && resultado.horas_aula) {
      // Verificar número de atividades
      if (resultado.atividades_encontradas < resultado.atividades_esperadas) {
        resultado.pendencias.push({
          tipo: 'ARQUIVO',
          item: 'ATIVIDADE_NN.md',
          mensagem: `Faltam atividades: ${resultado.atividades_encontradas} encontradas, ${resultado.atividades_esperadas} esperadas (${resultado.horas_aula}h ÷ 2 = ${resultado.atividades_esperadas}) (REGRA 04)`,
          prioridade: 'MEDIA'
        });
      }

      // Verificar correspondência entre MD e PDF
      const mdSet = new Set(resultado.arquivos_encontrados.ATIVIDADES_MD.map(f => {
        const match = f.match(/ATIVIDADE_(\d+)\.md/);
        return match ? match[1] : null;
      }));

      const pdfSet = new Set(resultado.arquivos_encontrados.ATIVIDADES_PDF.map(f => {
        const match = f.match(/ATIVIDADE_(\d+)_VERSAO_IMPRESSA\.pdf/);
        return match ? match[1] : null;
      }));

      // Verificar PDFs faltantes
      for (const num of mdSet) {
        if (num && !pdfSet.has(num)) {
          resultado.pendencias.push({
            tipo: 'ARQUIVO',
            item: `ATIVIDADE_${num}_VERSAO_IMPRESSA.pdf`,
            mensagem: `Versão impressa não encontrada para ATIVIDADE_${num}.md (REGRA 04)`,
            prioridade: 'MEDIA'
          });
        }
      }
    }

    // REGRA 05 — Verificações de substituições
    if (!resultado.estrutura.SUBSTITUICOES) {
      resultado.pendencias.push({
        tipo: 'PASTA',
        item: 'SUBSTITUICOES',
        mensagem: 'Pasta SUBSTITUICOES não encontrada (REGRA 05)',
        prioridade: 'BAIXA'
      });
    }

    if (resultado.estrutura.SUBSTITUICOES && !resultado.estrutura.SUBSTITUICOES_CLAUDE) {
      resultado.pendencias.push({
        tipo: 'ARQUIVO',
        item: 'CLAUDE.md',
        mensagem: 'Arquivo SUBSTITUICOES/CLAUDE.md não encontrado (REGRA 05)',
        prioridade: 'BAIXA'
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
      SCRIPT: 0,
      AVISO: 0,
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
  relatorio += `  Scripts: ${verificacao.resumo.pendencias_por_tipo.SCRIPT}\n`;
  relatorio += `  Avisos: ${verificacao.resumo.pendencias_por_tipo.AVISO}\n`;
  relatorio += `  Erros: ${verificacao.resumo.pendencias_por_tipo.ERRO}\n\n`;

  relatorio += '🔍 DETALHES POR UC:\n';
  relatorio += '═'.repeat(70) + '\n\n';

  verificacao.resultados.forEach(resultado => {
    relatorio += `📚 ${resultado.uc}\n`;

    // Informações de horas de aula e atividades (se disponível)
    if (resultado.horas_aula) {
      relatorio += `  ⏱️  Horas de aula: ${resultado.horas_aula}h\n`;
      relatorio += `  📋 Atividades: ${resultado.atividades_encontradas}/${resultado.atividades_esperadas}\n`;
    }

    if (resultado.pendencias.length === 0) {
      relatorio += '  ✅ Estrutura completa\n\n';
      return;
    }

    relatorio += '\n';
    resultado.pendencias.forEach(p => {
      const emoji = p.tipo === 'PASTA' ? '📂' : p.tipo === 'ARQUIVO' ? '📄' : p.tipo === 'AVISO' ? '⚠️' : '❌';
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
  gerarRelatorioVerificacao,
  extrairHorasEmenta,
  calcularAtividadesEsperadas
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
