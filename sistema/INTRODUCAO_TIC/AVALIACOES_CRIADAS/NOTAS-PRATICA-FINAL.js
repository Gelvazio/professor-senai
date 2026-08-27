/**
 * NOTAS DA PROVA PRÁTICA UC1 TIC - 26-08-2026
 * Estrutura de dados com notas automáticas do corretor
 */

const notasProvaPratica = {
  prova: {
    titulo: 'Avaliação Prática — Prova Simples UC1 TIC',
    data: '26-08-2026',
    turma: 'Turma PG',
    totalAlunos: 32,
    notaMaximaAutomatica: 7.0,
    notaMaximaDocente: 3.0,
    notaMaximaTotal: 10.0
  },
  criterios: {
    automaticos: [
      { nome: 'Organização e Entrega', peso: 1.0, descricao: 'Identificação da equipe, acessibilidade e formato dos arquivos' },
      { nome: 'Google Docs (Guia)', peso: 2.0, descricao: 'Conteúdo, estrutura, termos técnicos e fontes' },
      { nome: 'Google Sheets (Inventário)', peso: 2.0, descricao: 'Cabeçalhos, registros, fórmulas e formatação' },
      { nome: 'Google Slides (Apresentação)', peso: 1.5, descricao: 'Estrutura de slides, conteúdo e apresentação' },
      { nome: 'Segurança e Interpretação', peso: 0.5, descricao: 'Termos de segurança encontrados nos documentos' }
    ],
    docente: [
      { nome: 'Clareza e Linguagem', peso: 1.0, descricao: 'Clareza na comunicação escrita e oral' },
      { nome: 'Correção Técnica', peso: 1.0, descricao: 'Precisão dos conteúdos técnicos' },
      { nome: 'Apresentação e Cooperação', peso: 1.0, descricao: 'Qualidade da apresentação e trabalho em equipe' }
    ]
  },
  equipes: [
    {
      numero: 1,
      nomes: ['Heloísa', 'Emily Sofia', 'Kleiton'],
      notas: {
        organizacao: null,
        docs: null,
        sheets: null,
        slides: null,
        seguranca: null,
        notaAutomatica: null,
        status: 'Entregue — Aguardando correção automática',
        clareza: null,
        correcaoTecnica: null,
        apresentacao: null,
        notaDocente: null,
        notaFinal: null,
        feedback: 'Arquivos recebidos e validados. Análise automática em andamento.'
      },
      arquivos: {
        docs: 'GUIA_DA_EQUIPE_01.docx',
        sheets: 'INVENTARIO_DA_EQUIPE_01.xlsx',
        slides: 'APRESENTACAO_DA_EQUIPE_01.pptx'
      }
    },
    {
      numero: 2,
      nomes: ['Helisa', 'Mariana', 'Wagner', 'Maria Clara'],
      notas: {
        organizacao: null,
        docs: null,
        sheets: null,
        slides: null,
        seguranca: null,
        notaAutomatica: null,
        status: 'Entregue — Aguardando correção automática',
        clareza: null,
        correcaoTecnica: null,
        apresentacao: null,
        notaDocente: null,
        notaFinal: null,
        feedback: 'Apresentação PowerPoint entregue. Análise automática em andamento.'
      },
      arquivos: {
        docs: 'GUIA_DA_EQUIPE_02.docx',
        sheets: 'INVENTARIO_DA_EQUIPE_02.xlsx',
        slides: 'APRESENTAÇÃO_DA_EQUIPE_02.pptx'
      }
    },
    {
      numero: 3,
      nomes: ['Caio Cabral', 'Guilherme Francisco', 'Eduardo Cristiano'],
      notas: {
        organizacao: null,
        docs: null,
        sheets: null,
        slides: null,
        seguranca: null,
        notaAutomatica: null,
        status: 'Entregue — Aguardando correção automática',
        clareza: null,
        correcaoTecnica: null,
        apresentacao: null,
        notaDocente: null,
        notaFinal: null,
        feedback: 'Arquivos recebidos e validados. Análise automática em andamento.'
      },
      arquivos: {
        docs: 'GUIA_DA_EQUIPE_03.docx',
        sheets: 'INVENTARIO_DA_EQUIPE_03.xlsx',
        slides: 'APRESENTACAO_DA_EQUIPE_03.pptx'
      }
    },
    {
      numero: 4,
      nomes: ['Pablo', 'Kauã Henrique Ambos', 'Eduardo Kramer'],
      notas: {
        organizacao: null,
        docs: null,
        sheets: null,
        slides: null,
        seguranca: null,
        notaAutomatica: null,
        status: 'Entregue — Aguardando correção automática',
        clareza: null,
        correcaoTecnica: null,
        apresentacao: null,
        notaDocente: null,
        notaFinal: null,
        feedback: 'Arquivos recebidos e validados. Análise automática em andamento.'
      },
      arquivos: {
        docs: 'GUIA_DA_EQUIPE_04.docx',
        sheets: 'INVENTARIO_DA_EQUIPE_04.xlsx',
        slides: 'APRESENTACAO_DA_EQUIPE_04.pptx'
      }
    },
    {
      numero: 5,
      nomes: ['Flávia', 'Yorbelis', 'Ana Lívia'],
      notas: {
        organizacao: null,
        docs: null,
        sheets: null,
        slides: null,
        seguranca: null,
        notaAutomatica: null,
        status: 'Entregue — Aguardando correção automática',
        clareza: null,
        correcaoTecnica: null,
        apresentacao: null,
        notaDocente: null,
        notaFinal: null,
        feedback: 'Arquivos recebidos e validados. Análise automática em andamento.'
      },
      arquivos: {
        docs: 'GUIA_DA_EQUIPE_05.docx',
        sheets: 'INVENTARIO_DA_EQUIPE_05.xlsx',
        slides: 'APRESENTACAO_DA_EQUIPE_05.pptx'
      }
    },
    {
      numero: 6,
      nomes: ['Andriew', 'Luan Rocha', 'Victor Johancin Perez'],
      notas: {
        organizacao: null,
        docs: null,
        sheets: null,
        slides: null,
        seguranca: null,
        notaAutomatica: null,
        status: 'Entregue — Aguardando correção automática',
        clareza: null,
        correcaoTecnica: null,
        apresentacao: null,
        notaDocente: null,
        notaFinal: null,
        feedback: 'Guia e inventário entregues. Análise automática em andamento.'
      },
      arquivos: {
        docs: 'GUIA_DA_EQUIPE_06.docx',
        sheets: 'INVENTARIO_DA_EQUIPE_06.xlsx',
        slides: 'APRESENTACAO_DA_EQUIPE_06.pptx'
      }
    },
    {
      numero: 7,
      nomes: ['João Pedro', 'João Lucas', 'Anna Maria'],
      notas: {
        organizacao: null,
        docs: null,
        sheets: null,
        slides: null,
        seguranca: null,
        notaAutomatica: null,
        status: 'Entregue — Aguardando correção automática',
        clareza: null,
        correcaoTecnica: null,
        apresentacao: null,
        notaDocente: null,
        notaFinal: null,
        feedback: 'Guia entregue. Análise automática em andamento.'
      },
      arquivos: {
        docs: 'GUIA_DA_EQUIPE_07.docx',
        sheets: 'INVENTARIO_DA_EQUIPE_07.xlsx',
        slides: 'APRESENTACAO_DA_EQUIPE_07.pptx'
      }
    },
    {
      numero: 8,
      nomes: ['Antonio Vicente', 'Kaike Menegelli', 'Kauan Lucas', 'Isaque Cândido'],
      notas: {
        organizacao: null,
        docs: null,
        sheets: null,
        slides: null,
        seguranca: null,
        notaAutomatica: null,
        status: 'Entregue — Aguardando correção automática',
        clareza: null,
        correcaoTecnica: null,
        apresentacao: null,
        notaDocente: null,
        notaFinal: null,
        feedback: 'Arquivos recebidos e validados. Análise automática em andamento.'
      },
      arquivos: {
        docs: 'GUIA_DA_EQUIPE_08.docx',
        sheets: 'INVENTARIO_DA_EQUIPE_08.xlsx',
        slides: 'APRESENTACAO_DA_EQUIPE_08.pptx'
      }
    },
    {
      numero: 9,
      nomes: ['Gabriel Vitor', 'Emily Raissa', 'Mirela Kaele'],
      notas: {
        organizacao: null,
        docs: null,
        sheets: null,
        slides: null,
        seguranca: null,
        notaAutomatica: null,
        status: 'Entregue — Aguardando correção automática',
        clareza: null,
        correcaoTecnica: null,
        apresentacao: null,
        notaDocente: null,
        notaFinal: null,
        feedback: 'Arquivos recebidos e validados. Análise automática em andamento.'
      },
      arquivos: {
        docs: 'GUIA_DA_EQUIPE_09.docx',
        sheets: 'INVENTARIO_DA_EQUIPE_09.xlsx',
        slides: 'APRESENTACAO_DA_EQUIPE_09.pptx'
      }
    },
    {
      numero: 10,
      nomes: ['Jhiogo', 'André Henrique', 'Lucas Nascimento'],
      notas: {
        organizacao: null,
        docs: null,
        sheets: null,
        slides: null,
        seguranca: null,
        notaAutomatica: null,
        status: 'Entregue — Aguardando correção automática',
        clareza: null,
        correcaoTecnica: null,
        apresentacao: null,
        notaDocente: null,
        notaFinal: null,
        feedback: 'Arquivos recebidos e validados. Análise automática em andamento.'
      },
      arquivos: {
        docs: 'GUIA_DA_EQUIPE_10.docx',
        sheets: 'INVENTARIO_DA_EQUIPE_10.xlsx',
        slides: 'APRESENTACAO_DA_EQUIPE_10.pptx'
      }
    }
  ],
  resumo: {
    equipesEntregues: 10,
    equipesPendentes: 0,
    mediaNotaAutomatica: null,
    mediaNotaFinal: null,
    ultimaAtualizacao: new Date().toLocaleString('pt-BR')
  }
};

// Exportar para Node.js (se aplicável)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = notasProvaPratica;
}
