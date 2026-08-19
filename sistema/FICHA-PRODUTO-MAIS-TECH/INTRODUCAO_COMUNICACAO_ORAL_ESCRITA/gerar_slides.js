const PptxGenJS = require("pptxgenjs");
const pptx = new PptxGenJS();

pptx.layout = "LAYOUT_16x9";

const AZUL = "004D5C";
const LARANJA = "FF6B35";
const FUNDO = "E0F7FA";
const BRANCO = "FFFFFF";
const CINZA_ESCURO = "1A2B2F";

const FOOTER_TEXT = "Rio do Sul Mais Tech · SENAI · UC: Comunicação Oral e Escrita";

function addFooter(slide) {
  slide.addText(FOOTER_TEXT, {
    x: 0, y: 6.8, w: "100%", h: 0.3,
    fontSize: 9, color: BRANCO,
    fill: { color: AZUL },
    align: "center", valign: "middle",
    fontFace: "Calibri"
  });
}

function addHeader(slide, titulo) {
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.65, fill: { color: AZUL } });
  slide.addText(titulo, {
    x: 0.2, y: 0, w: 9.2, h: 0.65,
    fontSize: 20, bold: true, color: BRANCO,
    fontFace: "Calibri", valign: "middle"
  });
}

function slideConteudo(titulo, bullets) {
  const slide = pptx.addSlide();
  slide.background = { color: FUNDO };
  addHeader(slide, titulo);
  const items = bullets.map(b => ({
    text: b,
    options: { bullet: { type: "bullet", indent: 15 }, fontSize: 16, color: CINZA_ESCURO, fontFace: "Calibri", paraSpaceAfter: 6 }
  }));
  slide.addText(items, { x: 0.4, y: 0.8, w: 9.2, h: 5.8, valign: "top" });
  addFooter(slide);
  return slide;
}

function slideSecao(titulo, subtitulo) {
  const slide = pptx.addSlide();
  slide.background = { color: AZUL };
  slide.addShape(pptx.ShapeType.rect, { x: 0.5, y: 2.8, w: 0.12, h: 1.5, fill: { color: LARANJA } });
  slide.addText(titulo, {
    x: 0.8, y: 2.5, w: 8.6, h: 1,
    fontSize: 32, bold: true, color: BRANCO, fontFace: "Calibri"
  });
  if (subtitulo) {
    slide.addText(subtitulo, {
      x: 0.8, y: 3.5, w: 8.6, h: 0.8,
      fontSize: 18, color: "A8D8E0", fontFace: "Calibri", italic: true
    });
  }
  addFooter(slide);
  return slide;
}

// ─── SLIDES 1–15: APRESENTAÇÃO ───────────────────────────────────────────────

// Slide 1 — Capa
{
  const slide = pptx.addSlide();
  slide.background = { color: AZUL };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 3.8, w: "100%", h: 0.06, fill: { color: LARANJA } });
  slide.addText("Rio do Sul Mais Tech", {
    x: 0.5, y: 0.8, w: 9, h: 0.6,
    fontSize: 18, color: "A8D8E0", fontFace: "Calibri", bold: false
  });
  slide.addText("Introdução à Comunicação\nOral e Escrita para o\nMundo do Trabalho", {
    x: 0.5, y: 1.4, w: 9, h: 2.2,
    fontSize: 34, bold: true, color: BRANCO, fontFace: "Calibri"
  });
  slide.addText("SENAI · Qualificação Profissional · 33 horas", {
    x: 0.5, y: 4.0, w: 9, h: 0.5,
    fontSize: 14, color: "A8D8E0", fontFace: "Calibri"
  });
  addFooter(slide);
}

// Slide 2 — Sobre o Programa
slideConteudo("Sobre o Programa Rio do Sul Mais Tech", [
  "Parceria entre SENAI e Prefeitura Municipal de Rio do Sul",
  "Público-alvo: alunos do 8° e 9° ano do Ensino Fundamental (12–15 anos)",
  "Objetivo: preparar jovens para o mundo do trabalho com competências técnicas e comportamentais",
  "UC: Introdução à Comunicação Oral e Escrita — 33 horas presenciais",
  "Encontros quinzenais/semanais com atividades práticas e teóricas"
]);

// Slide 3 — Objetivo da UC
slideConteudo("Objetivo da Unidade Curricular", [
  "Desenvolver habilidades de comunicação oral e escrita essenciais para o ambiente profissional",
  "Preparar os alunos para interações no mundo do trabalho com clareza, respeito e assertividade",
  "Capacitar para a produção de textos técnicos e documentos profissionais",
  "Estimular a escuta ativa, o pensamento crítico e a expressão oral com segurança"
]);

// Slide 4 — Por que comunicar bem importa?
slideConteudo("Por que comunicar bem importa?", [
  "Falhas de comunicação causam erros, retrabalho e conflitos no ambiente de trabalho",
  "Profissionais que se comunicam bem se destacam em qualquer área",
  "A comunicação clara constrói confiança com colegas e clientes",
  "Comunicação é uma habilidade — pode ser aprendida e praticada!",
  "\"A forma como falamos e escrevemos revela nossa postura profissional.\""
]);

// Slide 5 — Capacidades da UC
slideConteudo("O que você vai desenvolver nesta UC", [
  "CB1 · Comunicar-se com clareza, objetividade e respeito em diferentes contextos",
  "CB2 · Produzir textos técnicos alinhados às exigências do mundo do trabalho",
  "CB3 · Aplicar técnicas de comunicação interpessoal e trabalho em equipe",
  "CB4 · Utilizar ferramentas digitais de comunicação com responsabilidade",
  "CT5 · Apresentar ideias oralmente com clareza, postura e adequação ao contexto"
]);

// Slide 6 — Percurso Formativo (parte 1)
slideConteudo("Percurso Formativo — 33 horas (Encontros 1–8)", [
  "Encontro 1 · O que é comunicação? Por que ela importa? (2h)",
  "Encontro 2 · Elementos do processo comunicativo e barreiras (2h)",
  "Encontro 3 · Comunicação verbal e não verbal (2h)",
  "Encontro 4 · Escuta ativa e empatia (2h)",
  "Encontro 5 · Comunicação assertiva (2h)",
  "Encontro 6 · Falar em público — técnicas e postura (2h)",
  "Encontro 7 · Falar em público — prática e feedback (2h)",
  "Encontro 8 · Reuniões e trabalho em equipe (2h)"
]);

// Slide 7 — Percurso Formativo (parte 2)
slideConteudo("Percurso Formativo — 33 horas (Encontros 9–16)", [
  "Encontro 9  · Atendimento ao cliente (2h)",
  "Encontro 10 · Introdução à redação profissional (2h)",
  "Encontro 11 · E-mail corporativo (2h)",
  "Encontro 12 · Comunicado, memorando e ata de reunião (2h)",
  "Encontro 13 · Relato de ocorrência e outros gêneros profissionais (2h)",
  "Encontro 14 · Ferramentas digitais e redes corporativas (2h)",
  "Encontro 15 · Netiqueta e segurança digital (2h)",
  "Encontro 16 · Revisão, apresentações finais e encerramento (3h)"
]);

// Slide 8 — Avaliação
slideConteudo("Como você será avaliado?", [
  "Participação e engajamento — postura comunicativa observada ao longo dos encontros",
  "Atividades escritas — produção de textos profissionais (e-mail, ata, comunicado...)",
  "Apresentação oral — prática de fala em público, individual ou em dupla",
  "Portfólio / pasta do aluno — compilação dos textos produzidos durante a UC",
  "Avaliação final — documento profissional + apresentação oral"
]);

// Slide 9 — Blocos de Conteúdo
slideConteudo("Blocos de Conteúdo da UC", [
  "BLOCO 1 · Fundamentos da Comunicação no Mundo do Trabalho",
  "BLOCO 2 · Técnicas de Comunicação Oral",
  "BLOCO 3 · Redação Técnica e Formal",
  "BLOCO 4 · Ferramentas Digitais para Comunicação",
  "Cada bloco combina teoria, exemplos práticos e atividades"
]);

// Slide 10 — O que você vai aprender: visão geral
{
  const slide = pptx.addSlide();
  slide.background = { color: FUNDO };
  addHeader(slide, "Visão Geral — O que você vai aprender");
  const boxes = [
    { label: "Fundamentos", desc: "Elementos, barreiras, verbal/não verbal", x: 0.3, y: 1.0 },
    { label: "Oral", desc: "Falar em público, reuniões, atendimento", x: 5.0, y: 1.0 },
    { label: "Redação", desc: "E-mail, ata, comunicado, relato", x: 0.3, y: 4.0 },
    { label: "Digital", desc: "Netiqueta, redes corporativas, segurança", x: 5.0, y: 4.0 }
  ];
  boxes.forEach(b => {
    slide.addShape(pptx.ShapeType.roundRect, { x: b.x, y: b.y, w: 4.3, h: 2.5, fill: { color: AZUL }, rectRadius: 0.15 });
    slide.addText(b.label, { x: b.x + 0.2, y: b.y + 0.3, w: 3.9, h: 0.6, fontSize: 18, bold: true, color: LARANJA, fontFace: "Calibri" });
    slide.addText(b.desc, { x: b.x + 0.2, y: b.y + 0.9, w: 3.9, h: 1.4, fontSize: 14, color: BRANCO, fontFace: "Calibri" });
  });
  addFooter(slide);
}

// Slide 11 — Regras da sala / combinados
slideConteudo("Combinados da UC", [
  "Respeito mútuo: escutar é tão importante quanto falar",
  "Participe! Comunicação só se aprende na prática",
  "Celular com uso consciente — aqui ele pode ser um recurso de aprendizagem",
  "Traga suas dúvidas — não existe pergunta boba",
  "Guarde sua apostila — ela é o registro de toda a jornada"
]);

// Slide 12 — Conexão com o mercado de trabalho
slideConteudo("Comunicação e o Mercado de Trabalho", [
  "Toda vaga de emprego valoriza: comunicação, trabalho em equipe e proatividade",
  "Saber escrever um e-mail profissional já diferencia um candidato",
  "Comunicação é a habilidade mais citada em entrevistas de emprego",
  "Empresas de tecnologia buscam profissionais que comunicam ideias com clareza",
  "Esta UC te prepara para atuar em qualquer área com mais confiança"
]);

// Slide 13 — Perfil do profissional comunicador
slideConteudo("Perfil do Profissional Comunicador", [
  "Expressa-se com clareza — sem rodeios nem excesso de jargões",
  "Ouve antes de responder — a escuta ativa evita mal-entendidos",
  "Adapta a linguagem ao contexto — formal no trabalho, informal entre amigos",
  "Escreve com objetividade — vai direto ao ponto",
  "Usa a tecnologia com responsabilidade — respeita a netiqueta"
]);

// Slide 14 — Referências
slideConteudo("Referências e Materiais de Apoio", [
  "MEDEIROS, João Bosco · Redação Empresarial · São Paulo: Atlas",
  "POLITO, Reinaldo · Como Falar Corretamente e Sem Inibições · Saraiva",
  "GUIMARÃES, Elisa · A Articulação do Texto · Ática",
  "ABNT NBR 14724 — Informação e documentação: trabalhos acadêmicos",
  "Materiais e atividades disponibilizados pelo professor ao longo da UC"
]);

// Slide 15 — Motivação / abertura
{
  const slide = pptx.addSlide();
  slide.background = { color: AZUL };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 3.0, w: "100%", h: 0.06, fill: { color: LARANJA } });
  slide.addText("\"A comunicação é a habilidade\nque abre todas as outras portas.\"", {
    x: 0.5, y: 1.0, w: 9, h: 2.0,
    fontSize: 28, bold: true, color: BRANCO, fontFace: "Calibri", align: "center"
  });
  slide.addText("Vamos começar!", {
    x: 0.5, y: 3.4, w: 9, h: 0.8,
    fontSize: 22, color: LARANJA, fontFace: "Calibri", align: "center", bold: true
  });
  slide.addText("UC · Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho", {
    x: 0.5, y: 4.2, w: 9, h: 0.5,
    fontSize: 13, color: "A8D8E0", fontFace: "Calibri", align: "center"
  });
  addFooter(slide);
}

// ─── SLIDES 16+: CONTEÚDO ────────────────────────────────────────────────────

// ── BLOCO 1: Fundamentos da Comunicação ─────────────────────────────────────
slideSecao("BLOCO 1", "Fundamentos da Comunicação");

slideConteudo("O que é comunicação?", [
  "Comunicação é o processo de transmitir uma mensagem entre pessoas",
  "Pode acontecer de muitas formas: falando, escrevendo, gesticulando, em silêncio",
  "Elementos do processo comunicativo:",
  "  · Emissor — quem envia a mensagem",
  "  · Receptor — quem recebe a mensagem",
  "  · Mensagem — o conteúdo transmitido",
  "  · Canal — o meio utilizado (voz, e-mail, telefone...)",
  "  · Código — a linguagem compartilhada (português, libras...)",
  "  · Ruído — qualquer interferência que distorce a mensagem",
  "  · Feedback — a resposta do receptor ao emissor"
]);

slideConteudo("Ruídos na Comunicação — Exemplos do Trabalho", [
  "O que são ruídos? Tudo que interfere e distorce a mensagem enviada",
  "Ruídos físicos: barulho no ambiente, má conexão de internet, microfone com falha",
  "Ruídos semânticos: uso de termos técnicos que o receptor não conhece",
  "Ruídos psicológicos: preconceitos, ansiedade, desatenção, falta de empatia",
  "Ruídos de canal: e-mail enviado para destinatário errado, mensagem não lida",
  "Exemplo prático: chefe passa instrução rápida no corredor → funcionário entende errado → retrabalho",
  "Como reduzir ruídos? Confirme o entendimento, use linguagem clara, escolha o canal certo"
]);

slideConteudo("Registro Adequado — Formal vs. Informal", [
  "Registro é a forma como adaptamos nossa linguagem ao contexto e ao interlocutor",
  "Registro informal: usado com amigos, família — gírias, abreviações, linguagem relaxada",
  "Registro formal: usado no trabalho, com clientes, em documentos — norma culta, cortesia",
  "No ambiente profissional, o registro formal demonstra respeito e profissionalismo",
  "Atenção: informalidade excessiva pode ser interpretada como descuido ou falta de seriedade",
  "Exemplo: 'Oi, o relatório tá pronto?' (informal) × 'Bom dia, o relatório está disponível.' (formal)",
  "Regra de ouro: observe o ambiente e espelhe o tom adotado pela equipe ou cliente"
]);

slideConteudo("Escuta Ativa — O que é e como praticar", [
  "Escuta ativa é ouvir com atenção plena — não apenas aguardar a vez de falar",
  "Envolve: prestar atenção, demonstrar interesse, fazer perguntas e confirmar o entendimento",
  "Benefícios: evita mal-entendidos, fortalece relações, melhora o trabalho em equipe",
  "Como praticar:",
  "  · Mantenha contato visual com quem fala",
  "  · Não interrompa — deixe a pessoa concluir o raciocínio",
  "  · Repita com suas palavras o que entendeu: 'Então, você quer dizer que...'",
  "  · Faça perguntas para esclarecer dúvidas",
  "  · Evite distrações: celular guardado, olhar de lado, pensar em outra coisa"
]);

slideConteudo("Comunicação Não-Verbal", [
  "Mais de 60% do que comunicamos não vem das palavras, mas do corpo",
  "Elementos da comunicação não-verbal:",
  "  · Gestos — reforçam ou contradizem o que está sendo dito",
  "  · Postura — postura ereta transmite confiança; postura curvada, insegurança",
  "  · Expressão facial — um sorriso, uma sobrancelha franzida, um olhar direto",
  "  · Tom de voz — velocidade, volume e entonação mudam completamente o significado",
  "  · Distância física — respeitar o espaço pessoal é uma forma de respeito",
  "No trabalho: aparência cuidada, postura aberta e expressão atenta passam profissionalismo"
]);

// ── BLOCO 2: Comunicação Oral ─────────────────────────────────────────────────
slideSecao("BLOCO 2", "Comunicação Oral");

slideConteudo("Falar em Público — Técnicas Básicas", [
  "O medo de falar em público é um dos mais comuns — e pode ser superado com prática",
  "Técnicas essenciais:",
  "  · Prepare-se: conheça bem o conteúdo antes de falar",
  "  · Organize as ideias: início (contexto), meio (desenvolvimento), fim (conclusão)",
  "  · Fale devagar — a ansiedade acelera a fala",
  "  · Use pausas estratégicas para dar ênfase e respirar",
  "  · Olhe para o público — não fique de costas ou olhando para o chão",
  "  · Use linguagem simples e exemplos concretos",
  "Prática: falar em público melhora com cada tentativa!"
]);

slideConteudo("Como Participar de uma Reunião Profissional", [
  "Antes da reunião: leia a pauta, prepare suas ideias e chegue no horário",
  "Durante a reunião:",
  "  · Preste atenção — tome notas dos pontos importantes",
  "  · Espere sua vez de falar — não interrompa",
  "  · Fale de forma objetiva — seja breve e claro",
  "  · Questione com respeito: 'Posso fazer uma pergunta?' ou 'Tenho uma sugestão...'",
  "  · Evite o celular — demonstra desrespeito aos presentes",
  "Após a reunião: cumpra os compromissos assumidos e registre as decisões tomadas"
]);

slideConteudo("Atendimento ao Cliente — Linguagem e Postura", [
  "O primeiro contato define a impressão que o cliente terá da empresa",
  "Linguagem no atendimento:",
  "  · Use 'bom dia/boa tarde', 'por favor', 'obrigado(a)' — sempre",
  "  · Evite gírias e palavrões",
  "  · Fale com calma, mesmo diante de clientes agitados",
  "  · Use frases afirmativas: 'Posso verificar para você' em vez de 'Não sei'",
  "Postura no atendimento:",
  "  · Sorriso (inclusive no telefone — a voz muda!), postura ereta, olhar atento",
  "  · Nunca discuta com o cliente — busque a solução",
  "  · Encerre sempre com: 'Posso ajudar em mais alguma coisa?'"
]);

slideConteudo("Comunicação Assertiva — Dizer o que pensa com respeito", [
  "Assertividade é expressar sua opinião, necessidade ou limite com clareza e respeito",
  "Três estilos de comunicação:",
  "  · Passivo: cala o que pensa, evita conflito, gera ressentimento interno",
  "  · Agressivo: impõe a opinião, desrespeita o outro, gera conflito externo",
  "  · Assertivo: expressa com clareza e respeito — o ponto de equilíbrio",
  "Como ser assertivo:",
  "  · Use 'eu' em vez de 'você': 'Eu me sinto sobrecarregado' em vez de 'Você me sobrecarrega'",
  "  · Seja específico: diga o que quer, não apenas o que não quer",
  "  · Mantenha tom calmo e postura aberta"
]);

slideConteudo("Retorno Construtivo (Feedback) — Como dar e receber", [
  "Feedback é uma ferramenta essencial de crescimento no trabalho",
  "Como dar um feedback construtivo:",
  "  · Escolha um momento adequado — em privado, sem pressão",
  "  · Seja específico: descreva o comportamento, não a pessoa",
  "  · Use a estrutura: situação → comportamento → impacto",
  "  · Sugira uma alternativa: 'Da próxima vez, que tal...'",
  "  · Finalize com encorajamento",
  "Como receber feedback:",
  "  · Ouça sem se defender imediatamente",
  "  · Agradeça — mesmo que doa",
  "  · Reflita antes de responder",
  "  · Use o feedback como oportunidade de melhoria"
]);

// ── BLOCO 3: Redação Técnica ──────────────────────────────────────────────────
slideSecao("BLOCO 3", "Redação Técnica");

slideConteudo("Princípios da Redação Técnica", [
  "Redação técnica é a escrita objetiva e padronizada usada no ambiente profissional",
  "Os quatro princípios fundamentais:",
  "  · Clareza — o texto deve ser facilmente compreendido pelo leitor",
  "  · Objetividade — vá direto ao ponto, sem rodeios",
  "  · Correção — respeite a gramática, a ortografia e a norma culta",
  "  · Coesão e coerência — as ideias devem estar conectadas e fazer sentido",
  "Evite: palavras desnecessárias, jargões sem explicação, frases longas e confusas",
  "Lembre-se: quem lê não tem tempo a perder — facilite a leitura!"
]);

slideConteudo("Estrutura de um E-mail Profissional", [
  "Assunto: claro e específico — 'Solicitação de reunião — Projeto X'",
  "Saudação: 'Bom dia, [Nome],' ou 'Prezado(a) [Nome],'",
  "Introdução: identifique-se (se necessário) e contextualize o motivo do e-mail",
  "Desenvolvimento: exponha sua solicitação, informação ou resposta com clareza",
  "Conclusão: agradeça, indique próximos passos ou coloque-se à disposição",
  "Despedida: 'Atenciosamente,' ou 'Cordialmente,'",
  "Assinatura: nome completo, cargo, empresa, contato",
  "Atenção: revise antes de enviar — erros de português são imperdoáveis em e-mails profissionais!"
]);

slideConteudo("Como Escrever um Comunicado", [
  "Comunicado é um documento simples para informar algo a um grupo ou equipe",
  "Estrutura básica:",
  "  · Cabeçalho: empresa/setor + data",
  "  · Título: COMUNICADO (em destaque)",
  "  · Destinatário: 'A todos os colaboradores do setor X'",
  "  · Corpo: informação clara, objetiva, sem excesso de detalhes",
  "  · Assinatura: nome e cargo de quem emite",
  "Use quando: avisar sobre mudança de horário, reunião, nova política, evento",
  "Evite: linguagem informal, informações desnecessárias, erros de digitação",
  "Exemplo de início: 'Comunicamos que, a partir de [data], o horário de atendimento será...'"
]);

slideConteudo("Ata de Reunião — Estrutura e Exemplo", [
  "Ata é o registro oficial do que foi discutido e decidido em uma reunião",
  "Estrutura da ata:",
  "  · Cabeçalho: data, horário, local, participantes",
  "  · Abertura: quem presidiu a reunião e qual foi o objetivo",
  "  · Pauta: tópicos discutidos, em ordem",
  "  · Deliberações: decisões tomadas e responsáveis por cada ação",
  "  · Encerramento: horário de encerramento e assinaturas",
  "Características essenciais: linguagem formal, impessoal, verbo no passado",
  "Exemplo: 'Deliberou-se que a entrega do relatório será realizada até...'",
  "Importante: a ata deve ser lavrada durante ou logo após a reunião"
]);

slideConteudo("Relato de Ocorrência — Quando usar e como escrever", [
  "Relato de ocorrência é um registro formal de um evento ou incidente no ambiente de trabalho",
  "Quando usar: acidentes, falhas de equipamento, conflitos, situações incomuns",
  "Estrutura do relato:",
  "  · Data, horário e local do ocorrido",
  "  · Descrição objetiva dos fatos (sem julgamento, sem emoção)",
  "  · Pessoas envolvidas ou testemunhas",
  "  · Consequências ou danos identificados",
  "  · Medidas tomadas imediatamente",
  "  · Assinatura de quem relata",
  "Regra de ouro: relatar FATOS, não opiniões — 'O equipamento parou às 14h' (fato) × 'Foi descuido' (opinião)"
]);

slideConteudo("Revisão e Reescrita de Textos", [
  "Revisar é tão importante quanto escrever — nenhum texto profissional deve ser enviado sem revisão",
  "O que revisar:",
  "  · Ortografia: palavras escritas corretamente",
  "  · Gramática: concordância verbal e nominal, regência, pontuação",
  "  · Clareza: o texto está compreensível para quem vai ler?",
  "  · Coerência: as ideias fazem sentido e estão na ordem certa?",
  "  · Formatação: o documento está apresentável?",
  "Dica: leia em voz alta — os erros ficam mais evidentes",
  "Dica 2: leia uma vez para conteúdo e outra vez só para erros de português",
  "Ferramentas: corretor do Word, Grammarly (inglês), leitura por outra pessoa"
]);

// ── BLOCO 4: Ferramentas Digitais ────────────────────────────────────────────
slideSecao("BLOCO 4", "Ferramentas Digitais de Comunicação");

slideConteudo("E-mail Profissional — Boas Práticas", [
  "Assunto sempre preenchido e específico — e-mail sem assunto pode ser ignorado",
  "Responda em até 24h — em ambiente profissional, agilidade é respeito",
  "Nunca envie em maiúsculas — equivale a GRITAR",
  "Cuidado com 'Responder a todos' — verifique se todos realmente precisam receber",
  "Arquivos em anexo: avise no corpo do e-mail o que está sendo enviado",
  "Assinatura profissional: nome, cargo, empresa, telefone e e-mail",
  "Evite emojis, gírias e abreviações em e-mails formais",
  "Revise antes de enviar — você não pode 'desfazer' um e-mail enviado!"
]);

slideConteudo("Mensagens em Redes Corporativas (Teams, Slack, WhatsApp Business)", [
  "Redes corporativas são extensões do ambiente profissional — mantenha o tom adequado",
  "Microsoft Teams e Slack:",
  "  · Use os canais corretos para cada tipo de assunto",
  "  · Marque a pessoa com @nome apenas quando necessário",
  "  · Prefira mensagens diretas para assuntos individuais",
  "WhatsApp Business / grupos de trabalho:",
  "  · Respeite horários — evite mensagens fora do horário comercial",
  "  · Seja breve e objetivo — não mande áudios longos",
  "  · Nunca compartilhe informações confidenciais por grupos",
  "Regra geral: se não diria em uma reunião formal, não envie em canal corporativo"
]);

slideConteudo("Netiqueta — Regras de Etiqueta Digital", [
  "Netiqueta = etiqueta na internet — conjunto de boas práticas na comunicação online",
  "Regras essenciais:",
  "  · Leia antes de responder — entenda o contexto da mensagem",
  "  · Não compartilhe notícias sem verificar a fonte (não alimente fake news)",
  "  · Respeite a privacidade — não reencaminhe mensagens privadas sem permissão",
  "  · Em videoconferências: câmera ligada, fundo neutro, microfone mudo quando não está falando",
  "  · Não use redes corporativas para assuntos pessoais",
  "  · Responda todas as mensagens — ignorar é falta de educação também online",
  "Lembre-se: tudo que você escreve online pode ser lido, copiado e compartilhado"
]);

slideConteudo("Segurança Digital na Comunicação", [
  "A segurança digital é responsabilidade de todos no ambiente de trabalho",
  "Senhas seguras:",
  "  · Use senhas longas com letras, números e símbolos",
  "  · Nunca compartilhe sua senha com colegas",
  "  · Troque senhas periodicamente e use diferentes senhas para cada conta",
  "Cuidado com phishing:",
  "  · Phishing = e-mails/mensagens falsas para roubar dados",
  "  · Desconfie de links suspeitos, urgência excessiva ou remetentes desconhecidos",
  "  · Nunca clique em links de e-mails não solicitados",
  "Privacidade de dados:",
  "  · Não compartilhe dados de clientes ou colegas sem autorização",
  "  · Conheça a LGPD — Lei Geral de Proteção de Dados (Lei 13.709/2018)"
]);

// ── SLIDE FINAL: Síntese ─────────────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.background = { color: AZUL };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0.6, w: "100%", h: 0.06, fill: { color: LARANJA } });
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 6.2, w: "100%", h: 0.06, fill: { color: LARANJA } });
  slide.addText("Síntese Final", {
    x: 0.5, y: 0.7, w: 9, h: 0.7,
    fontSize: 14, color: "A8D8E0", fontFace: "Calibri", bold: false
  });
  slide.addText("Comunicar bem é\numa competência profissional", {
    x: 0.5, y: 1.4, w: 9, h: 1.6,
    fontSize: 32, bold: true, color: BRANCO, fontFace: "Calibri", align: "center"
  });
  const pontos = [
    "Entenda o processo comunicativo e elimine os ruídos",
    "Pratique a escuta ativa — ouça de verdade",
    "Adapte sua linguagem ao contexto: formal no trabalho",
    "Produza documentos claros, objetivos e corretos",
    "Use as ferramentas digitais com responsabilidade e segurança"
  ];
  slide.addText(pontos.map(p => ({ text: "✔  " + p + "\n", options: { color: "A8D8E0", fontSize: 14 } })), {
    x: 0.8, y: 3.2, w: 8.4, h: 2.8, fontFace: "Calibri", valign: "top"
  });
  addFooter(slide);
}

// ── Salvar ────────────────────────────────────────────────────────────────────
const outputPath = "C:\\fontes\\professor-senai\\sistema\\FICHA-PRODUTO-MAIS-TECH\\INTRODUCAO_COMUNICACAO_ORAL_ESCRITA\\Slides_Introducao_Comunicacao_Oral_Escrita.pptx";
pptx.writeFile({ fileName: outputPath })
  .then(() => console.log("PPTX gerado com sucesso:", outputPath))
  .catch(err => { console.error("Erro ao gerar PPTX:", err); process.exit(1); });
