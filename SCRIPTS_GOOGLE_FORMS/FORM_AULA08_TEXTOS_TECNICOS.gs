/**
 * SCRIPT GOOGLE APPS SCRIPT — FORMULÁRIO AULA 08
 * Tema: Textos Técnicos e Revisão Geral
 * Curso: Introdução à Tecnologia da Informação e Comunicação — SENAI
 *
 * COMO USAR:
 * 1. Acesse script.google.com
 * 2. Crie um novo projeto
 * 3. Cole este código e salve
 * 4. Execute a função criarFormularioAula08()
 * 5. Autorize o script quando solicitado
 * 6. O link do formulário será exibido nos Logs (Ctrl+Enter)
 */

function criarFormularioAula08() {
  var form = FormApp.create('Avaliação — Aula 08 · Textos Técnicos e Revisão · SENAI TI01');

  form.setDescription(
    'Formulário de avaliação sobre Textos Técnicos e Revisão Geral do módulo de TIC.\n' +
    'Aula 08 — 12/08/2026 · Turma TI01 · Professor Gelvazio\n' +
    'Esta é a última aula antes das avaliações. Preencha com atenção!'
  );
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setProgressBar(true);

  // ── Seção 1: Identificação ──────────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Identificação do Aluno')
    .setHelpText('Preencha seus dados antes de responder.');

  form.addTextItem()
    .setTitle('Nome completo')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Número de matrícula / RA')
    .setRequired(false);

  // ── Seção 2: Textos Técnicos ────────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 1 — Textos Técnicos')
    .setHelpText('5 questões sobre conceitos, tipos e características de textos técnicos.');

  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('1. Qual das seguintes características NÃO pertence a um texto técnico?')
    .setChoices([
      q1.createChoice('Clareza e objetividade'),
      q1.createChoice('Uso de metáforas e figuras de linguagem', true),
      q1.createChoice('Impessoalidade'),
      q1.createChoice('Precisão e formalidade')
    ])
    .setRequired(true);

  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('2. Um documento que registra oficialmente o que foi decidido e discutido em uma reunião é chamado de:')
    .setChoices([
      q2.createChoice('Relatório'),
      q2.createChoice('Memorando'),
      q2.createChoice('Ata', true),
      q2.createChoice('Laudo')
    ])
    .setRequired(true);

  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('3. Qual é a estrutura correta de um relatório técnico?')
    .setChoices([
      q3.createChoice('Introdução → Resultados → Desenvolvimento → Conclusão'),
      q3.createChoice('Capa → Introdução → Desenvolvimento → Resultados → Conclusão → Referências', true),
      q3.createChoice('Resumo → Problema → Solução → Apêndice'),
      q3.createChoice('Objetivo → Metodologia → Glossário → Índice')
    ])
    .setRequired(true);

  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('4. O memorando é utilizado para:')
    .setChoices([
      q4.createChoice('Comunicação formal entre empresas diferentes'),
      q4.createChoice('Publicar resultados de pesquisa científica'),
      q4.createChoice('Comunicação interna entre departamentos da mesma empresa', true),
      q4.createChoice('Registrar o resultado de um processo judicial')
    ])
    .setRequired(true);

  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('5. A norma ABNT NBR 6023 trata de:')
    .setChoices([
      q5.createChoice('Formatação de trabalhos acadêmicos (margens, fonte, espaçamento)'),
      q5.createChoice('Referências bibliográficas — como citar fontes consultadas', true),
      q5.createChoice('Normas de segurança para equipamentos elétricos'),
      q5.createChoice('Procedimentos para auditorias ISO 9001')
    ])
    .setRequired(true);

  // ── Seção 3: Revisão de TIC ─────────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 2 — Revisão do Módulo de TIC')
    .setHelpText('6 questões cobrindo os principais conteúdos das Aulas 01 a 07.');

  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('6. Os três pilares da Segurança da Informação são:')
    .setChoices([
      q6.createChoice('Credibilidade, Integridade e Disponibilidade'),
      q6.createChoice('Confidencialidade, Integridade e Disponibilidade (CID)', true),
      q6.createChoice('Confiança, Identidade e Digitalização'),
      q6.createChoice('Criptografia, Instalação e Detecção')
    ])
    .setRequired(true);

  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('7. Phishing é um tipo de ataque que:')
    .setChoices([
      q7.createChoice('Danifica fisicamente o hardware do computador'),
      q7.createChoice('Infecta arquivos de sistema e os apaga permanentemente'),
      q7.createChoice('Engana o usuário para que forneça dados pessoais ou clique em links maliciosos', true),
      q7.createChoice('Bloqueia o processador e exige reinicialização do sistema')
    ])
    .setRequired(true);

  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('8. No Google Docs, qual atalho ativa a revisão ortográfica?')
    .setChoices([
      q8.createChoice('Ctrl+R'),
      q8.createChoice('F7', true),
      q8.createChoice('Ctrl+O'),
      q8.createChoice('F5')
    ])
    .setRequired(true);

  var q9 = form.addMultipleChoiceItem();
  q9.setTitle('9. O componente do computador responsável por processar os cálculos e instruções é:')
    .setChoices([
      q9.createChoice('HD (Disco Rígido)'),
      q9.createChoice('RAM (Memória de Acesso Aleatório)'),
      q9.createChoice('CPU (Processador)', true),
      q9.createChoice('GPU (Placa de Vídeo)')
    ])
    .setRequired(true);

  var q10 = form.addMultipleChoiceItem();
  q10.setTitle('10. Qual é o elemento da comunicação responsável por captar a mensagem enviada?')
    .setChoices([
      q10.createChoice('Emissor'),
      q10.createChoice('Canal'),
      q10.createChoice('Receptor', true),
      q10.createChoice('Ruído')
    ])
    .setRequired(true);

  var q11 = form.addMultipleChoiceItem();
  q11.setTitle('11. No Google Sheets, a fórmula =SOMASE(A1:A20;"Norte";B1:B20) serve para:')
    .setChoices([
      q11.createChoice('Contar quantas células do intervalo A1:A20 contêm "Norte"'),
      q11.createChoice('Somar os valores de B1:B20 apenas onde A1:A20 contém "Norte"', true),
      q11.createChoice('Somar todos os valores do intervalo A1:A20 e B1:B20'),
      q11.createChoice('Classificar os dados por "Norte" em ordem crescente')
    ])
    .setRequired(true);

  // ── Seção 4: Linguagem Técnica e Profissional ────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 3 — Linguagem Técnica e Redação')
    .setHelpText('2 questões discursivas sobre linguagem e comunicação profissional.');

  form.addParagraphTextItem()
    .setTitle('12. Reescreva a frase a seguir de forma técnica e profissional, adequada para um relatório:\n\n"O programa travou todo e eu não consegui salvar nada que tinha feito."')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('13. Cite 3 termos técnicos de TIC que você aprendeu neste módulo e escreva a definição de cada um com suas próprias palavras.')
    .setRequired(true);

  // ── Seção 5: Autoavaliação ──────────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 4 — Autoavaliação')
    .setHelpText('2 questões para você refletir sobre seu aprendizado.');

  var q14 = form.addScaleItem();
  q14.setTitle('14. Em uma escala de 1 a 5, como você avalia seu domínio dos conteúdos do módulo de TIC até agora?')
    .setBounds(1, 5)
    .setLabels('Muito inseguro(a)', 'Muito seguro(a)')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('15. Qual conteúdo do módulo de TIC você sente mais necessidade de revisar antes das avaliações? Por quê?')
    .setRequired(false);

  // ── Publicar ─────────────────────────────────────────────────────────────────
  Logger.log('✅ Formulário criado com sucesso!');
  Logger.log('🔗 Link para preencher: ' + form.getPublishedUrl());
  Logger.log('✏️  Link para editar: ' + form.getEditUrl());
}
