/**
 * SCRIPT GOOGLE APPS SCRIPT — FORMULÁRIO AULA 05
 * Tema: Google Docs — Editor de Textos
 * Curso: Introdução à Tecnologia da Informação e Comunicação — SENAI
 *
 * COMO USAR:
 * 1. Acesse script.google.com
 * 2. Crie um novo projeto
 * 3. Cole este código e salve
 * 4. Execute a função criarFormularioAula05()
 * 5. Autorize o script quando solicitado
 * 6. O link do formulário será exibido nos Logs (Ctrl+Enter)
 */

function criarFormularioAula05() {
  var form = FormApp.create('Avaliação — Aula 05 · Google Docs · SENAI TI01');

  form.setDescription(
    'Formulário de avaliação sobre Google Docs — Editor de Textos.\n' +
    'Aula 05 — 07/08/2026 · Turma TI01 · Professor Gelvazio\n' +
    'Preencha com sua conta Google SENAI.'
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

  // ── Seção 2: Tipos de Editores e Interface ──────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 1 — Tipos de Editores e Interface do Google Docs')
    .setHelpText('4 questões sobre editores de texto e a interface do Google Docs.');

  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('1. Qual é a principal diferença entre um editor de texto simples (ex: Bloco de Notas) e um editor rico (ex: Google Docs)?')
    .setChoices([
      q1.createChoice('O editor simples funciona online; o rico funciona offline'),
      q1.createChoice('O editor rico permite formatação avançada como fontes, cores, tabelas e imagens', true),
      q1.createChoice('O editor simples é pago; o rico é gratuito'),
      q1.createChoice('O editor rico salva em .txt; o simples salva em .docx')
    ])
    .setRequired(true);

  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('2. Como acessar o Google Docs pelo Google Drive?')
    .setChoices([
      q2.createChoice('Drive > Abrir > Documentos'),
      q2.createChoice('Drive > Novo > Documentos Google', true),
      q2.createChoice('Drive > Ferramentas > Google Docs'),
      q2.createChoice('Drive > Compartilhar > Documentos Google')
    ])
    .setRequired(true);

  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('3. Uma grande vantagem do Google Docs em relação ao Microsoft Word instalado é:')
    .setChoices([
      q3.createChoice('Ter mais recursos de formatação avançada'),
      q3.createChoice('Salvar automaticamente no Google Drive e permitir colaboração em tempo real', true),
      q3.createChoice('Funcionar sem acesso à internet em todos os recursos'),
      q3.createChoice('Ser compatível exclusivamente com arquivos .odt')
    ])
    .setRequired(true);

  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('4. O Google Docs faz parte de qual conjunto de ferramentas?')
    .setChoices([
      q4.createChoice('Microsoft 365'),
      q4.createChoice('LibreOffice Suite'),
      q4.createChoice('Google Workspace', true),
      q4.createChoice('Apple iWork')
    ])
    .setRequired(true);

  // ── Seção 3: Formatação e Configuração de Página ────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 2 — Formatação, Página e Parágrafos')
    .setHelpText('5 questões sobre formatação de texto e configuração de página.');

  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('5. Qual atalho de teclado aplica negrito no texto selecionado no Google Docs?')
    .setChoices([
      q5.createChoice('Ctrl+I'),
      q5.createChoice('Ctrl+U'),
      q5.createChoice('Ctrl+B', true),
      q5.createChoice('Ctrl+N')
    ])
    .setRequired(true);

  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('6. Segundo as normas ABNT, qual deve ser a margem esquerda de um documento?')
    .setChoices([
      q6.createChoice('2 cm'),
      q6.createChoice('2,5 cm'),
      q6.createChoice('3 cm', true),
      q6.createChoice('4 cm')
    ])
    .setRequired(true);

  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('7. Onde se configura o tamanho do papel e as margens no Google Docs?')
    .setChoices([
      q7.createChoice('Menu Editar > Configurações de página'),
      q7.createChoice('Menu Arquivo > Configurar página', true),
      q7.createChoice('Menu Formatar > Configurar página'),
      q7.createChoice('Menu Ver > Configurações de impressão')
    ])
    .setRequired(true);

  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('8. O espaçamento entre linhas recomendado pela ABNT para o corpo do texto é:')
    .setChoices([
      q8.createChoice('Simples (1,0)'),
      q8.createChoice('1,5', true),
      q8.createChoice('Duplo (2,0)'),
      q8.createChoice('2,5')
    ])
    .setRequired(true);

  var q9 = form.addMultipleChoiceItem();
  q9.setTitle('9. Qual atalho de teclado aplica alinhamento justificado ao parágrafo no Google Docs?')
    .setChoices([
      q9.createChoice('Ctrl+L'),
      q9.createChoice('Ctrl+E'),
      q9.createChoice('Ctrl+R'),
      q9.createChoice('Ctrl+J', true)
    ])
    .setRequired(true);

  // ── Seção 4: Recursos e Ferramentas ─────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 3 — Recursos, Tabelas e Colaboração')
    .setHelpText('4 questões sobre tabelas, imagens, colaboração e exportação.');

  var q10 = form.addMultipleChoiceItem();
  q10.setTitle('10. Como inserir uma tabela no Google Docs?')
    .setChoices([
      q10.createChoice('Menu Formatar > Tabela'),
      q10.createChoice('Menu Inserir > Tabela', true),
      q10.createChoice('Menu Arquivo > Novo > Tabela'),
      q10.createChoice('Menu Editar > Inserir tabela')
    ])
    .setRequired(true);

  var q11 = form.addMultipleChoiceItem();
  q11.setTitle('11. Qual atalho abre a ferramenta de ortografia e gramática no Google Docs?')
    .setChoices([
      q11.createChoice('F5'),
      q11.createChoice('F7', true),
      q11.createChoice('F9'),
      q11.createChoice('Ctrl+F')
    ])
    .setRequired(true);

  var q12 = form.addMultipleChoiceItem();
  q12.setTitle('12. Para ver o histórico de versões anteriores de um documento no Google Docs, acesse:')
    .setChoices([
      q12.createChoice('Menu Editar > Histórico de alterações'),
      q12.createChoice('Menu Ver > Versões anteriores'),
      q12.createChoice('Menu Arquivo > Histórico de versões > Ver histórico', true),
      q12.createChoice('Menu Ferramentas > Controle de versões')
    ])
    .setRequired(true);

  var q13 = form.addMultipleChoiceItem();
  q13.setTitle('13. Para exportar um documento do Google Docs como arquivo do Microsoft Word, vá em:')
    .setChoices([
      q13.createChoice('Menu Arquivo > Exportar > Word'),
      q13.createChoice('Menu Arquivo > Fazer download > Microsoft Word (.docx)', true),
      q13.createChoice('Menu Editar > Salvar como > .docx'),
      q13.createChoice('Menu Compartilhar > Download > Word')
    ])
    .setRequired(true);

  // ── Seção 5: Reflexão e Prática ─────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 4 — Reflexão e Prática')
    .setHelpText('2 questões sobre sua experiência com a atividade prática da Aula 05.');

  form.addParagraphTextItem()
    .setTitle('14. Descreva como você criou o documento profissional na atividade prática da Aula 05. Quais recursos do Google Docs você utilizou (formatação, tabela, lista, margens…)?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('15. Qual foi a maior dificuldade que você encontrou ao trabalhar com o Google Docs? Como você resolveu ou pretende resolver?')
    .setRequired(false);

  // ── Publicar ─────────────────────────────────────────────────────────────────
  Logger.log('✅ Formulário criado com sucesso!');
  Logger.log('🔗 Link para preencher: ' + form.getPublishedUrl());
  Logger.log('✏️  Link para editar: ' + form.getEditUrl());
}
