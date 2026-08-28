/**
 * generate-pendencias.js
 *
 * Gerador de pendências — analisa aulas e cria pendências automáticas
 */

const fs = require('fs').promises;
const path = require('path');

/**
 * Analisa uma aula e identifica pendências
 */
function analisarAula(aula) {
  const pendencias = [];
  const id_base = aula.numero * 1000;

  // Verificar se tem slides
  if (!aula.arquivos.some(f => /^SLIDE_/.test(f.nome))) {
    pendencias.push({
      id: id_base + 1,
      titulo: `Preparar slides — AULA ${aula.numero}`,
      unidade_curricular: aula.unidade_curricular,
      tipo: 'AULA',
      status: 'PENDENTE',
      prioridade: aula.data ? 'ALTA' : 'MEDIA',
      data_vencimento: aula.data,
      observacoes: `Aula encontrada em ${aula.nome}, mas sem slides`
    });
  }

  // Verificar se tem material complementar
  if (aula.arquivos.length === 0) {
    pendencias.push({
      id: id_base + 2,
      titulo: `Criar material complementar — AULA ${aula.numero}`,
      unidade_curricular: aula.unidade_curricular,
      tipo: 'MATERIAL',
      status: 'PENDENTE',
      prioridade: 'MEDIA',
      data_vencimento: aula.data,
      observacoes: `Aula ${aula.numero} não tem material complementar`
    });
  }

  // Verificar se tem atividade
  if (!aula.arquivos.some(f => /atividade|exercicio|lista/i.test(f.nome))) {
    pendencias.push({
      id: id_base + 3,
      titulo: `Criar atividade prática — AULA ${aula.numero}`,
      unidade_curricular: aula.unidade_curricular,
      tipo: 'ATIVIDADE',
      status: 'PENDENTE',
      prioridade: 'MEDIA',
      data_vencimento: aula.data,
      observacoes: `Aula ${aula.numero} não tem atividade associada`
    });
  }

  return pendencias;
}

/**
 * Gera pendências a partir da lista de aulas
 */
async function gerarPendencias(sistemaDir, aulas) {
  console.log(`\n📋 Gerando pendências a partir de ${aulas.length} aulas...\n`);

  try {
    const todasPendencias = [];

    // Analisar cada aula
    aulas.forEach(aula => {
      const pendenciasAula = analisarAula(aula);
      todasPendencias.push(...pendenciasAula);
    });

    // Remover duplicatas por título
    const titulos = new Set();
    const pendenciasUnicas = todasPendencias.filter(p => {
      if (titulos.has(p.titulo)) return false;
      titulos.add(p.titulo);
      return true;
    });

    console.log(`✅ ${pendenciasUnicas.length} pendências identificadas\n`);

    return pendenciasUnicas;
  } catch (erro) {
    console.error('❌ Erro ao gerar pendências:', erro.message);
    throw erro;
  }
}

/**
 * Formata pendências para inserir no arquivo pendencias.js
 */
function formatarPendenciasParaJS(pendencias) {
  const linhas = pendencias.map(p => {
    return `  {
    id: ${p.id},
    titulo: "${p.titulo.replace(/"/g, '\\"')}",
    unidade_curricular: "${p.unidade_curricular || 'SEM UC'}",
    tipo: "${p.tipo}",
    status: "${p.status}",
    prioridade: "${p.prioridade}",
    ${p.data_vencimento ? `data_vencimento: "${p.data_vencimento}",` : ''}
    observacoes: "${p.observacoes?.replace(/"/g, '\\"') || ''}"
  }`;
  });

  return linhas.join(',\n');
}

/**
 * Salva pendências no arquivo pendencias.js
 */
async function salvarPendencias(pendencias, arquivoDestino) {
  console.log(`💾 Salvando pendências em ${arquivoDestino}...\n`);

  try {
    // Ler arquivo atual
    let conteudo = await fs.readFile(arquivoDestino, 'utf-8');

    // Encontrar a seção de pendências
    const regex = /pendencias:\s*\[([\s\S]*?)\]/;
    const match = conteudo.match(regex);

    if (!match) {
      throw new Error('Formato inválido do arquivo pendencias.js');
    }

    // Substituir pendências
    const novasLinhas = formatarPendenciasParaJS(pendencias);
    conteudo = conteudo.replace(regex, `pendencias: [\n${novasLinhas}\n  ]`);

    // Salvar
    await fs.writeFile(arquivoDestino, conteudo, 'utf-8');
    console.log(`✅ Pendências salvas com sucesso!\n`);

    return true;
  } catch (erro) {
    console.error('❌ Erro ao salvar pendências:', erro.message);
    throw erro;
  }
}

/**
 * Gera relatório formatado de pendências
 */
function gerarRelatorioPendencias(pendencias) {
  const porStatus = {};
  const porUC = {};
  const porTipo = {};

  pendencias.forEach(p => {
    porStatus[p.status] = (porStatus[p.status] || 0) + 1;
    porUC[p.unidade_curricular] = (porUC[p.unidade_curricular] || 0) + 1;
    porTipo[p.tipo] = (porTipo[p.tipo] || 0) + 1;
  });

  let relatorio = '📊 RELATÓRIO DE PENDÊNCIAS\n';
  relatorio += '═'.repeat(60) + '\n\n';

  relatorio += '📈 Resumo Geral:\n';
  relatorio += `  Total: ${pendencias.length}\n`;
  relatorio += `  Pendentes: ${porStatus['PENDENTE'] || 0}\n`;
  relatorio += `  Em Progresso: ${porStatus['EM_PROGRESSO'] || 0}\n`;
  relatorio += `  Bloqueadas: ${porStatus['BLOQUEADA'] || 0}\n`;
  relatorio += `  Concluídas: ${porStatus['CONCLUIDA'] || 0}\n\n`;

  relatorio += '📚 Por Unidade Curricular:\n';
  Object.entries(porUC).forEach(([uc, count]) => {
    relatorio += `  ${uc}: ${count}\n`;
  });
  relatorio += '\n';

  relatorio += '🏷️  Por Tipo:\n';
  Object.entries(porTipo).forEach(([tipo, count]) => {
    relatorio += `  ${tipo}: ${count}\n`;
  });

  return relatorio;
}

module.exports = {
  gerarPendencias,
  analisarAula,
  salvarPendencias,
  formatarPendenciasParaJS,
  gerarRelatorioPendencias
};
