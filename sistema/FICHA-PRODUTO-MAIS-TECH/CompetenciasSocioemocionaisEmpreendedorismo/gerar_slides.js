const pptxgen = require('pptxgenjs');

const OUTPUT = 'C:\\fontes\\professor-senai\\sistema\\FICHA-PRODUTO-MAIS-TECH\\CompetenciasSocioemocionaisEmpreendedorismo\\Slides_Competencias_Socioemocionais_Empreendedorismo.pptx';

const VERDE = '1A4731';
const AMARELO = 'F5C518';
const FUNDO = 'F0FFF4';
const BRANCO = 'FFFFFF';
const TEXTO = '1A2E1A';

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

const FOOTER_TEXT = 'Rio do Sul Mais Tech · SENAI · UC: Competências Socioemocionais';

function addFooter(slide) {
  slide.addText(FOOTER_TEXT, {
    x: 0.3, y: 5.2, w: 9.4, h: 0.3,
    fontSize: 9, color: '888888', align: 'center', italic: true
  });
}

function addTitleSlide(slide, title, subtitle) {
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: VERDE } });
  slide.addText(title, {
    x: 0.5, y: 1.5, w: 9, h: 1.5,
    fontSize: 36, bold: true, color: BRANCO, align: 'center', fontFace: 'Calibri'
  });
  slide.addText(subtitle, {
    x: 0.5, y: 3.2, w: 9, h: 0.6,
    fontSize: 20, color: AMARELO, align: 'center', fontFace: 'Calibri'
  });
}

// Slide 1 — Capa
const s1 = pres.addSlide();
addTitleSlide(s1, 'Competências Socioemocionais\ne Empreendedorismo', 'Rio do Sul Mais Tech · SENAI');

// Slide 2 — Visual decorativo
const s2 = pres.addSlide();
s2.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: VERDE } });
s2.addText('RIO DO SUL MAIS TECH', {
  x: 0.5, y: 2.0, w: 9, h: 1,
  fontSize: 40, bold: true, color: BRANCO, align: 'center', fontFace: 'Cambria'
});
s2.addText('SENAI · Prefeitura Municipal de Rio do Sul', {
  x: 0.5, y: 3.2, w: 9, h: 0.6,
  fontSize: 18, color: AMARELO, align: 'center', fontFace: 'Calibri'
});
s2.addShape(pres.ShapeType.rect, { x: 2, y: 4.0, w: 6, h: 0.08, fill: { color: AMARELO } });

// Slide 3 — Identificação da UC
const s3 = pres.addSlide();
s3.background = { color: FUNDO };
s3.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s3.addText('Unidade Curricular', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 28, bold: true, color: BRANCO, fontFace: 'Calibri' });
const uc3 = [
  { text: 'UC: Competências Socioemocionais e Empreendedorismo', options: { bullet: true, fontSize: 16, color: TEXTO, bold: true, breakLine: true } },
  { text: 'Carga Horária: 36h presenciais', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: 'Modalidade: Presencial', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: 'Programa: Rio do Sul Mais Tech — SENAI', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: false } },
];
s3.addText(uc3, { x: 0.5, y: 1.3, w: 9, h: 3.5, fontFace: 'Calibri', paraSpaceAfter: 10 });
addFooter(s3);

// Slide 4 — Apresentação do Professor
const s4 = pres.addSlide();
s4.background = { color: FUNDO };
s4.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s4.addText('Seu Professor(a)', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 28, bold: true, color: BRANCO, fontFace: 'Calibri' });
s4.addShape(pres.ShapeType.rect, { x: 0.5, y: 1.3, w: 9, h: 3.5, fill: { color: BRANCO }, line: { color: VERDE, width: 1.5 } });
const prof4 = [
  { text: 'Nome: ___________________________', options: { bullet: false, fontSize: 16, color: TEXTO, breakLine: true } },
  { text: 'Formação: _______________________', options: { bullet: false, fontSize: 16, color: TEXTO, breakLine: true } },
  { text: 'Experiência: _____________________', options: { bullet: false, fontSize: 16, color: TEXTO, breakLine: true } },
  { text: 'Contato: ________________________', options: { bullet: false, fontSize: 16, color: TEXTO, breakLine: false } },
];
s4.addText(prof4, { x: 0.8, y: 1.5, w: 8.5, h: 3, fontFace: 'Calibri', paraSpaceAfter: 14 });
addFooter(s4);

// Slide 5 — Dinâmica: Avião de Papel
const s5 = pres.addSlide();
s5.background = { color: FUNDO };
s5.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s5.addText('✈ Dinâmica: Avião de Papel', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 26, bold: true, color: BRANCO, fontFace: 'Calibri' });
const din5 = [
  { text: '1. Pegue um papel e escreva seu NOME e uma PALAVRA que te descreve', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: '2. Dobre o papel em formato de avião', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: '3. Lance o avião pela sala ao sinal do professor', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: '4. Pegue o avião que parar perto de você', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: '5. Apresente o colega cujo avião você pegou!', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: false } },
];
s5.addText(din5, { x: 0.5, y: 1.3, w: 9, h: 3.8, fontFace: 'Calibri', paraSpaceAfter: 8 });
addFooter(s5);

// Slide 6 — Plano de Ensino
const s6 = pres.addSlide();
s6.background = { color: FUNDO };
s6.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s6.addText('Plano de Ensino', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 28, bold: true, color: BRANCO, fontFace: 'Calibri' });
const items6 = [
  { label: 'Carga Horária:', value: '36 horas presenciais' },
  { label: 'Encontros:', value: '18 encontros de 2 horas' },
  { label: 'Dias:', value: 'Segunda a sexta-feira' },
  { label: 'Local:', value: 'LabTEC (CEPLAS / Roberto Machado / Aníbal de Barba)' },
];
items6.forEach((item, i) => {
  s6.addShape(pres.ShapeType.rect, { x: 0.5, y: 1.35 + i * 0.85, w: 2.8, h: 0.65, fill: { color: VERDE } });
  s6.addText(item.label, { x: 0.5, y: 1.35 + i * 0.85, w: 2.8, h: 0.65, fontSize: 13, bold: true, color: BRANCO, align: 'center', valign: 'middle', fontFace: 'Calibri' });
  s6.addShape(pres.ShapeType.rect, { x: 3.4, y: 1.35 + i * 0.85, w: 6.1, h: 0.65, fill: { color: BRANCO }, line: { color: VERDE, width: 1 } });
  s6.addText(item.value, { x: 3.5, y: 1.35 + i * 0.85, w: 5.9, h: 0.65, fontSize: 13, color: TEXTO, valign: 'middle', fontFace: 'Calibri' });
});
addFooter(s6);

// Slide 7 — Capacidades Técnicas
const s7 = pres.addSlide();
s7.background = { color: FUNDO };
s7.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s7.addText('Capacidades Técnicas', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 28, bold: true, color: BRANCO, fontFace: 'Calibri' });
const ct7 = [
  { text: 'Identificar tipos de negócios e formas de empreendedorismo', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: 'Identificar o perfil empreendedor e suas características', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: 'Adotar comportamento ético nas relações profissionais', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: 'Reconhecer virtudes do empreendedor de sucesso', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: 'Aplicar conceitos de sustentabilidade e os 5R\'s no cotidiano', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: false } },
];
s7.addText(ct7, { x: 0.5, y: 1.3, w: 9, h: 3.8, fontFace: 'Calibri', paraSpaceAfter: 10 });
addFooter(s7);

// Slide 8 — Capacidades Socioemocionais
const s8 = pres.addSlide();
s8.background = { color: FUNDO };
s8.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s8.addText('Capacidades Socioemocionais', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 26, bold: true, color: BRANCO, fontFace: 'Calibri' });
const cs8 = ['Autoconhecimento', 'Inteligência emocional', 'Comunicação assertiva', 'Trabalho em equipe e colaboração', 'Ética e responsabilidade social', 'Resiliência e persistência'];
cs8.forEach((item, i) => {
  const col = i < 3 ? 0 : 1;
  const row = i % 3;
  s8.addShape(pres.ShapeType.rect, { x: 0.5 + col * 4.8, y: 1.3 + row * 1.2, w: 4.4, h: 1.0, fill: { color: VERDE } });
  s8.addText(item, { x: 0.5 + col * 4.8, y: 1.3 + row * 1.2, w: 4.4, h: 1.0, fontSize: 14, bold: true, color: BRANCO, align: 'center', valign: 'middle', fontFace: 'Calibri' });
});
addFooter(s8);

// Slide 9 — Conhecimentos parte 1
const s9 = pres.addSlide();
s9.background = { color: FUNDO };
s9.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s9.addText('Conteúdo Programático — I', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 26, bold: true, color: BRANCO, fontFace: 'Calibri' });
const c9 = [
  { text: '5R\'s da Sustentabilidade (Reduzir, Reutilizar, Reciclar, Recusar, Reparar)', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: 'Sustentabilidade e meio ambiente', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: 'Coleta seletiva — cores das lixeiras e materiais recicláveis', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: 'Ciclo da água e importância da preservação hídrica', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: 'Legislação ambiental básica e responsabilidade coletiva', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: false } },
];
s9.addText(c9, { x: 0.5, y: 1.3, w: 9, h: 3.8, fontFace: 'Calibri', paraSpaceAfter: 10 });
addFooter(s9);

// Slide 10 — Conhecimentos parte 2
const s10 = pres.addSlide();
s10.background = { color: FUNDO };
s10.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s10.addText('Conteúdo Programático — II', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 26, bold: true, color: BRANCO, fontFace: 'Calibri' });
const c10 = [
  { text: 'O que é um empreendedor e o que o define', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: 'Tipos de empreendimentos: produto, serviço, digital, social', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: 'Plano de negócios: estrutura e importância', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: 'Identificando oportunidades de negócio no cotidiano', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: false } },
];
s10.addText(c10, { x: 0.5, y: 1.3, w: 9, h: 3.8, fontFace: 'Calibri', paraSpaceAfter: 10 });
addFooter(s10);

// Slide 11 — Conhecimentos parte 3
const s11 = pres.addSlide();
s11.background = { color: FUNDO };
s11.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s11.addText('Conteúdo Programático — III', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 26, bold: true, color: BRANCO, fontFace: 'Calibri' });
const c11 = [
  { text: 'Micro e pequenas empresas: conceito, porte e relevância', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: 'Planejamento e empreendedorismo: da ideia à ação', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: 'Intraempreendedorismo: inovar dentro de uma organização', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: 'Competências socioemocionais aplicadas ao mundo do trabalho', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: false } },
];
s11.addText(c11, { x: 0.5, y: 1.3, w: 9, h: 3.8, fontFace: 'Calibri', paraSpaceAfter: 10 });
addFooter(s11);

// Slide 12 — Combinados e Regras
const s12 = pres.addSlide();
s12.background = { color: FUNDO };
s12.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s12.addText('Combinados da Turma', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 28, bold: true, color: BRANCO, fontFace: 'Calibri' });
const comb12 = ['Respeito a todos os colegas e ao professor', 'Pontualidade nos encontros', 'Celular no modo silencioso durante as aulas', 'Participação ativa nas atividades', 'Colaboração e espírito de equipe'];
comb12.forEach((item, i) => {
  s12.addShape(pres.ShapeType.rect, { x: 0.5, y: 1.3 + i * 0.75, w: 0.5, h: 0.6, fill: { color: AMARELO } });
  s12.addText((i + 1).toString(), { x: 0.5, y: 1.3 + i * 0.75, w: 0.5, h: 0.6, fontSize: 14, bold: true, color: VERDE, align: 'center', valign: 'middle', fontFace: 'Calibri' });
  s12.addShape(pres.ShapeType.rect, { x: 1.1, y: 1.3 + i * 0.75, w: 8.4, h: 0.6, fill: { color: BRANCO }, line: { color: VERDE, width: 1 } });
  s12.addText(item, { x: 1.2, y: 1.3 + i * 0.75, w: 8.2, h: 0.6, fontSize: 13, color: TEXTO, valign: 'middle', fontFace: 'Calibri' });
});
addFooter(s12);

// Slide 13 — Sistema de Avaliação
const s13 = pres.addSlide();
s13.background = { color: FUNDO };
s13.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s13.addText('Como Você Será Avaliado', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 26, bold: true, color: BRANCO, fontFace: 'Calibri' });
const av13 = [
  { text: 'Nota de 1 a 4 em cada atividade realizada', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: 'Frequência mínima obrigatória: 75%', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: 'Nota mínima para aprovação: 7,0', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: 'Atividades práticas, apresentações e participação', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: true } },
  { text: 'Avaliação contínua ao longo de todos os encontros', options: { bullet: true, fontSize: 15, color: TEXTO, breakLine: false } },
];
s13.addText(av13, { x: 0.5, y: 1.3, w: 9, h: 3.8, fontFace: 'Calibri', paraSpaceAfter: 10 });
addFooter(s13);

// Slide 14 — Avaliação de Comportamento
const s14 = pres.addSlide();
s14.background = { color: FUNDO };
s14.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s14.addText('Comportamento e Atitude', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 26, bold: true, color: BRANCO, fontFace: 'Calibri' });
s14.addShape(pres.ShapeType.rect, { x: 0.5, y: 1.3, w: 9, h: 3.6, fill: { color: BRANCO }, line: { color: VERDE, width: 1.5 } });
s14.addText(
  'Sua postura, respeito e pontualidade fazem parte da sua avaliação.\n\n' +
  'O mercado de trabalho valoriza quem é comprometido, colaborativo e ético.\n\n' +
  'Nesta UC, você desenvolve habilidades que vão além do conteúdo técnico — você desenvolve o profissional que vai ser!',
  { x: 0.8, y: 1.5, w: 8.5, h: 3.1, fontSize: 14, color: TEXTO, fontFace: 'Calibri', valign: 'middle' }
);
addFooter(s14);

// Slide 15 — Situação de Aprendizagem
const s15 = pres.addSlide();
s15.background = { color: FUNDO };
s15.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s15.addText('Projeto Integrador', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 28, bold: true, color: BRANCO, fontFace: 'Calibri' });
s15.addShape(pres.ShapeType.rect, { x: 0.5, y: 1.3, w: 9, h: 3.6, fill: { color: BRANCO }, line: { color: AMARELO, width: 2 } });
s15.addText('Situação de Aprendizagem', { x: 0.8, y: 1.5, w: 8.5, h: 0.5, fontSize: 16, bold: true, color: VERDE, fontFace: 'Calibri' });
s15.addText(
  'Ao final desta UC, você apresentará um MINI PLANO DE NEGÓCIOS com uma ideia de produto ou serviço sustentável.\n\n' +
  'Sua proposta deverá incluir:\n' +
  '   • Descrição do produto/serviço\n' +
  '   • Público-alvo\n' +
  '   • Impacto ambiental e social\n' +
  '   • Diferenciais e oportunidades de mercado',
  { x: 0.8, y: 2.1, w: 8.5, h: 2.7, fontSize: 13, color: TEXTO, fontFace: 'Calibri' }
);
addFooter(s15);

// ========== SLIDES DE CONTEÚDO PEDAGÓGICO ==========

// Slide 16 — O que é Empreendedorismo?
const s16 = pres.addSlide();
s16.background = { color: FUNDO };
s16.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s16.addText('O que é Empreendedorismo?', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 26, bold: true, color: BRANCO, fontFace: 'Calibri' });
// Col 1
s16.addShape(pres.ShapeType.rect, { x: 0.3, y: 1.2, w: 4.5, h: 3.9, fill: { color: BRANCO }, line: { color: VERDE, width: 1 } });
s16.addText('Definição', { x: 0.4, y: 1.3, w: 4.3, h: 0.4, fontSize: 14, bold: true, color: VERDE, fontFace: 'Calibri' });
s16.addText(
  'Empreendedorismo é a capacidade de identificar oportunidades e criar algo novo com valor para a sociedade.\n\nO empreendedor transforma ideias em negócios, resolve problemas reais e gera impacto positivo.',
  { x: 0.4, y: 1.8, w: 4.2, h: 3.1, fontSize: 13, color: TEXTO, fontFace: 'Calibri' }
);
// Col 2
s16.addShape(pres.ShapeType.rect, { x: 5.0, y: 1.2, w: 4.5, h: 3.9, fill: { color: VERDE } });
s16.addText('Jovens Empreendedores Brasileiros', { x: 5.1, y: 1.3, w: 4.3, h: 0.4, fontSize: 13, bold: true, color: AMARELO, fontFace: 'Calibri' });
const ex16 = [
  { text: 'Luiz Guilherme Pasin — criou app de reciclagem aos 16 anos', options: { bullet: true, fontSize: 12, color: BRANCO, breakLine: true } },
  { text: 'Marina Lins — desenvolveu horta comunitária digital', options: { bullet: true, fontSize: 12, color: BRANCO, breakLine: true } },
  { text: 'Caio Lacerda — plataforma de tutoria entre alunos', options: { bullet: true, fontSize: 12, color: BRANCO, breakLine: false } },
];
s16.addText(ex16, { x: 5.1, y: 1.85, w: 4.2, h: 3.0, fontFace: 'Calibri', paraSpaceAfter: 10 });
addFooter(s16);

// Slide 17 — Perfil do Empreendedor
const s17 = pres.addSlide();
s17.background = { color: FUNDO };
s17.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s17.addText('Perfil do Empreendedor', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 28, bold: true, color: BRANCO, fontFace: 'Calibri' });
const perfis17 = [
  { icon: '★', label: 'Criatividade', desc: 'Pensa em soluções inovadoras' },
  { icon: '★', label: 'Persistência', desc: 'Não desiste diante de desafios' },
  { icon: '★', label: 'Ética', desc: 'Age com honestidade e respeito' },
  { icon: '★', label: 'Visão', desc: 'Enxerga oportunidades à frente' },
  { icon: '★', label: 'Liderança', desc: 'Inspira e motiva pessoas' },
  { icon: '★', label: 'Inovação', desc: 'Transforma processos e produtos' },
];
perfis17.forEach((p, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  s17.addShape(pres.ShapeType.rect, { x: 0.4 + col * 3.1, y: 1.25 + row * 1.8, w: 2.8, h: 1.6, fill: { color: VERDE } });
  s17.addText(p.icon, { x: 0.4 + col * 3.1, y: 1.3 + row * 1.8, w: 2.8, h: 0.5, fontSize: 20, color: AMARELO, align: 'center', fontFace: 'Calibri' });
  s17.addText(p.label, { x: 0.4 + col * 3.1, y: 1.8 + row * 1.8, w: 2.8, h: 0.35, fontSize: 13, bold: true, color: BRANCO, align: 'center', fontFace: 'Calibri' });
  s17.addText(p.desc, { x: 0.4 + col * 3.1, y: 2.15 + row * 1.8, w: 2.8, h: 0.5, fontSize: 11, color: AMARELO, align: 'center', fontFace: 'Calibri' });
});
addFooter(s17);

// Slide 18 — Tipos de Negócios
const s18 = pres.addSlide();
s18.background = { color: FUNDO };
s18.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s18.addText('Tipos de Negócios na Economia', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 26, bold: true, color: BRANCO, fontFace: 'Calibri' });
const tipos18 = [
  { tipo: 'Produto Físico', ex: 'Ex: roupas, alimentos, eletrônicos, artesanato' },
  { tipo: 'Serviço', ex: 'Ex: cabeleireiro, aulas particulares, conserto de celular' },
  { tipo: 'Digital / Online', ex: 'Ex: aplicativo, curso online, loja virtual, streaming' },
  { tipo: 'Social / Sustentável', ex: 'Ex: ONG, cooperativa, negócio de reciclagem' },
];
tipos18.forEach((t, i) => {
  s18.addShape(pres.ShapeType.rect, { x: 0.3, y: 1.25 + i * 0.95, w: 2.5, h: 0.8, fill: { color: VERDE } });
  s18.addText(t.tipo, { x: 0.3, y: 1.25 + i * 0.95, w: 2.5, h: 0.8, fontSize: 13, bold: true, color: BRANCO, align: 'center', valign: 'middle', fontFace: 'Calibri' });
  s18.addShape(pres.ShapeType.rect, { x: 2.9, y: 1.25 + i * 0.95, w: 6.8, h: 0.8, fill: { color: BRANCO }, line: { color: VERDE, width: 1 } });
  s18.addText(t.ex, { x: 3.0, y: 1.25 + i * 0.95, w: 6.6, h: 0.8, fontSize: 13, color: TEXTO, valign: 'middle', fontFace: 'Calibri' });
});
addFooter(s18);

// Slide 19 — 5R's
const s19 = pres.addSlide();
s19.background = { color: FUNDO };
s19.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s19.addText("Os 5R's da Sustentabilidade", { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 26, bold: true, color: BRANCO, fontFace: 'Calibri' });
const rs19 = [
  { r: 'Reduzir', ex: 'Consuma menos — compre apenas o necessário', color: '2E7D32' },
  { r: 'Reutilizar', ex: 'Use novamente — pote de vidro como porta-lápis', color: '388E3C' },
  { r: 'Reciclar', ex: 'Transforme — papel velho vira caderno artesanal', color: '43A047' },
  { r: 'Recusar', ex: 'Diga não — recuse sacola plástica desnecessária', color: '66BB6A' },
  { r: 'Reparar', ex: 'Conserte — roupa rasgada pode ser costurada', color: '81C784' },
];
rs19.forEach((r, i) => {
  s19.addShape(pres.ShapeType.rect, { x: 0.3 + i * 1.88, y: 1.25, w: 1.7, h: 0.55, fill: { color: r.color } });
  s19.addText(r.r, { x: 0.3 + i * 1.88, y: 1.25, w: 1.7, h: 0.55, fontSize: 13, bold: true, color: BRANCO, align: 'center', valign: 'middle', fontFace: 'Calibri' });
  s19.addShape(pres.ShapeType.rect, { x: 0.3 + i * 1.88, y: 1.88, w: 1.7, h: 3.15, fill: { color: BRANCO }, line: { color: r.color, width: 1.5 } });
  s19.addText(r.ex, { x: 0.35 + i * 1.88, y: 1.98, w: 1.6, h: 2.95, fontSize: 11, color: TEXTO, align: 'center', fontFace: 'Calibri' });
});
addFooter(s19);

// Slide 20 — Coleta Seletiva e Ciclo da Água
const s20 = pres.addSlide();
s20.background = { color: FUNDO };
s20.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s20.addText('Meio Ambiente e Sustentabilidade', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 24, bold: true, color: BRANCO, fontFace: 'Calibri' });
// Coleta seletiva
s20.addText('♻ Coleta Seletiva', { x: 0.4, y: 1.2, w: 4.5, h: 0.45, fontSize: 15, bold: true, color: VERDE, fontFace: 'Calibri' });
const lixeiras = [
  { cor: 'AZUL', mat: 'Papel e papelão', hex: '1565C0' },
  { cor: 'VERDE', mat: 'Vidro', hex: '2E7D32' },
  { cor: 'AMARELO', mat: 'Metal', hex: 'F9A825' },
  { cor: 'VERMELHO', mat: 'Plástico', hex: 'C62828' },
];
lixeiras.forEach((l, i) => {
  s20.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.75 + i * 0.72, w: 1.2, h: 0.58, fill: { color: l.hex } });
  s20.addText(l.cor, { x: 0.4, y: 1.75 + i * 0.72, w: 1.2, h: 0.58, fontSize: 11, bold: true, color: BRANCO, align: 'center', valign: 'middle', fontFace: 'Calibri' });
  s20.addText(l.mat, { x: 1.7, y: 1.75 + i * 0.72, w: 3.1, h: 0.58, fontSize: 12, color: TEXTO, valign: 'middle', fontFace: 'Calibri' });
});
// Ciclo da água
s20.addText('💧 Ciclo da Água', { x: 5.1, y: 1.2, w: 4.5, h: 0.45, fontSize: 15, bold: true, color: VERDE, fontFace: 'Calibri' });
const ciclo = ['1. Evaporação — água aquece e vira vapor', '2. Condensação — vapor forma nuvens', '3. Precipitação — chuva, neve, granizo', '4. Infiltração e escoamento — volta ao lençol freático'];
const cicloText = ciclo.map((c, i) => ({ text: c, options: { bullet: false, fontSize: 12, color: TEXTO, breakLine: i < ciclo.length - 1 } }));
s20.addText(cicloText, { x: 5.1, y: 1.75, w: 4.5, h: 3.2, fontFace: 'Calibri', paraSpaceAfter: 8 });
addFooter(s20);

// Slide 21 — Identificando Oportunidades
const s21 = pres.addSlide();
s21.background = { color: FUNDO };
s21.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s21.addText('Como Identificar Oportunidades de Negócio', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 22, bold: true, color: BRANCO, fontFace: 'Calibri' });
const ops21 = [
  { n: '1', text: 'Observe problemas do cotidiano — onde as pessoas reclamam, há oportunidade de solução' },
  { n: '2', text: 'Pergunte o que as pessoas precisam — pesquise com família, amigos e vizinhos' },
  { n: '3', text: 'Analise tendências — o que está em alta? Sustentabilidade, tecnologia, saúde?' },
  { n: '4', text: 'Conecte suas habilidades a necessidades — o que você sabe fazer que ajuda os outros?' },
];
ops21.forEach((op, i) => {
  s21.addShape(pres.ShapeType.rect, { x: 0.3, y: 1.25 + i * 0.97, w: 0.6, h: 0.8, fill: { color: AMARELO } });
  s21.addText(op.n, { x: 0.3, y: 1.25 + i * 0.97, w: 0.6, h: 0.8, fontSize: 16, bold: true, color: VERDE, align: 'center', valign: 'middle', fontFace: 'Calibri' });
  s21.addShape(pres.ShapeType.rect, { x: 1.0, y: 1.25 + i * 0.97, w: 8.7, h: 0.8, fill: { color: BRANCO }, line: { color: VERDE, width: 1 } });
  s21.addText(op.text, { x: 1.15, y: 1.25 + i * 0.97, w: 8.4, h: 0.8, fontSize: 13, color: TEXTO, valign: 'middle', fontFace: 'Calibri' });
});
addFooter(s21);

// Slide 22 — Micro e Pequenas Empresas
const s22 = pres.addSlide();
s22.background = { color: FUNDO };
s22.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s22.addText('Micro e Pequenas Empresas', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 26, bold: true, color: BRANCO, fontFace: 'Calibri' });
// Col 1
s22.addShape(pres.ShapeType.rect, { x: 0.3, y: 1.2, w: 4.4, h: 3.9, fill: { color: BRANCO }, line: { color: VERDE, width: 1.5 } });
s22.addText('O que são?', { x: 0.4, y: 1.3, w: 4.2, h: 0.4, fontSize: 14, bold: true, color: VERDE, fontFace: 'Calibri' });
s22.addText(
  '• Microempresa (ME): faturamento até R$ 360.000/ano\n• Pequena empresa (EPP): até R$ 4,8 milhões/ano\n• Podem ser MEI (Microempreendedor Individual)\n• Respondem por 99% das empresas no Brasil',
  { x: 0.4, y: 1.8, w: 4.2, h: 3.1, fontSize: 12, color: TEXTO, fontFace: 'Calibri' }
);
// Col 2
s22.addShape(pres.ShapeType.rect, { x: 5.0, y: 1.2, w: 4.7, h: 3.9, fill: { color: VERDE } });
s22.addText('Por que importam?', { x: 5.1, y: 1.3, w: 4.5, h: 0.4, fontSize: 14, bold: true, color: AMARELO, fontFace: 'Calibri' });
s22.addText(
  '• Geram mais de 50% dos empregos formais\n• Movimentam a economia local\n• Estimulam a inovação\n• Fortalecem comunidades\n• São a porta de entrada para o empreendedorismo',
  { x: 5.1, y: 1.8, w: 4.5, h: 3.1, fontSize: 12, color: BRANCO, fontFace: 'Calibri' }
);
addFooter(s22);

// Slide 23 — Plano de Negócios
const s23 = pres.addSlide();
s23.background = { color: FUNDO };
s23.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s23.addText('Plano de Negócios', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 28, bold: true, color: BRANCO, fontFace: 'Calibri' });
const pn23 = [
  { q: 'O que é o produto/serviço?', d: 'Descreva claramente o que você vai oferecer' },
  { q: 'Quem é o público-alvo?', d: 'Quem vai comprar? Qual a faixa etária, onde mora?' },
  { q: 'Quanto vai custar?', d: 'Materiais, tempo, produção e preço de venda' },
  { q: 'Como vai vender?', d: 'Loja física, redes sociais, boca a boca?' },
  { q: 'Qual o diferencial?', d: 'O que seu produto tem que o concorrente não tem?' },
];
pn23.forEach((item, i) => {
  s23.addShape(pres.ShapeType.rect, { x: 0.3, y: 1.2 + i * 0.82, w: 4.3, h: 0.7, fill: { color: VERDE } });
  s23.addText(item.q, { x: 0.35, y: 1.2 + i * 0.82, w: 4.2, h: 0.7, fontSize: 12, bold: true, color: BRANCO, valign: 'middle', fontFace: 'Calibri' });
  s23.addShape(pres.ShapeType.rect, { x: 4.7, y: 1.2 + i * 0.82, w: 5.0, h: 0.7, fill: { color: BRANCO }, line: { color: VERDE, width: 1 } });
  s23.addText(item.d, { x: 4.8, y: 1.2 + i * 0.82, w: 4.8, h: 0.7, fontSize: 12, color: TEXTO, valign: 'middle', fontFace: 'Calibri' });
});
addFooter(s23);

// Slide 24 — Intraempreendedorismo
const s24 = pres.addSlide();
s24.background = { color: FUNDO };
s24.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s24.addText('Intraempreendedorismo', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 28, bold: true, color: BRANCO, fontFace: 'Calibri' });
s24.addShape(pres.ShapeType.rect, { x: 0.3, y: 1.2, w: 9.4, h: 1.0, fill: { color: AMARELO } });
s24.addText('É empreender DENTRO de uma empresa ou organização — inovar sem abrir seu próprio negócio!', {
  x: 0.4, y: 1.25, w: 9.2, h: 0.9, fontSize: 14, bold: true, color: VERDE, align: 'center', valign: 'middle', fontFace: 'Calibri'
});
s24.addText('Exemplos práticos:', { x: 0.4, y: 2.4, w: 9.2, h: 0.4, fontSize: 14, bold: true, color: VERDE, fontFace: 'Calibri' });
const ex24 = [
  { text: 'Funcionário que propõe um sistema de economia de energia na empresa', options: { bullet: true, fontSize: 14, color: TEXTO, breakLine: true } },
  { text: 'Colaborador que cria novo produto/serviço internamente', options: { bullet: true, fontSize: 14, color: TEXTO, breakLine: true } },
  { text: 'Estudante que organiza grupo de estudos no colégio', options: { bullet: true, fontSize: 14, color: TEXTO, breakLine: false } },
];
s24.addText(ex24, { x: 0.5, y: 2.85, w: 9, h: 2.1, fontFace: 'Calibri', paraSpaceAfter: 10 });
addFooter(s24);

// Slide 25 — Competências Socioemocionais
const s25 = pres.addSlide();
s25.background = { color: FUNDO };
s25.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s25.addText('Competências Socioemocionais', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 24, bold: true, color: BRANCO, fontFace: 'Calibri' });
s25.addShape(pres.ShapeType.rect, { x: 0.3, y: 1.2, w: 9.4, h: 0.9, fill: { color: BRANCO }, line: { color: VERDE, width: 1 } });
s25.addText('São habilidades que nos ajudam a lidar com nossas emoções, conviver bem com as pessoas e tomar boas decisões.', {
  x: 0.5, y: 1.25, w: 9.0, h: 0.8, fontSize: 13, color: TEXTO, valign: 'middle', fontFace: 'Calibri', italic: true
});
const socio25 = [
  { comp: 'Autoconhecimento', desc: 'Conhecer seus pontos fortes e fracos' },
  { comp: 'Autogestão', desc: 'Controlar emoções e comportamentos' },
  { comp: 'Empatia', desc: 'Colocar-se no lugar do outro' },
  { comp: 'Habilidades Sociais', desc: 'Comunicar-se e colaborar bem' },
  { comp: 'Tomada de Decisão', desc: 'Decidir de forma responsável e ética' },
];
socio25.forEach((s, i) => {
  s25.addShape(pres.ShapeType.rect, { x: 0.3, y: 2.2 + i * 0.62, w: 3.5, h: 0.55, fill: { color: VERDE } });
  s25.addText(s.comp, { x: 0.3, y: 2.2 + i * 0.62, w: 3.5, h: 0.55, fontSize: 12, bold: true, color: BRANCO, align: 'center', valign: 'middle', fontFace: 'Calibri' });
  s25.addShape(pres.ShapeType.rect, { x: 3.9, y: 2.2 + i * 0.62, w: 5.8, h: 0.55, fill: { color: BRANCO }, line: { color: VERDE, width: 1 } });
  s25.addText(s.desc, { x: 4.0, y: 2.2 + i * 0.62, w: 5.6, h: 0.55, fontSize: 12, color: TEXTO, valign: 'middle', fontFace: 'Calibri' });
});
addFooter(s25);

// Slide 26 — Autoconhecimento e Inteligência Emocional
const s26 = pres.addSlide();
s26.background = { color: FUNDO };
s26.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s26.addText('Autoconhecimento', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 28, bold: true, color: BRANCO, fontFace: 'Calibri' });
s26.addShape(pres.ShapeType.rect, { x: 0.3, y: 1.2, w: 4.4, h: 3.9, fill: { color: BRANCO }, line: { color: VERDE, width: 1.5 } });
s26.addText('O que é?', { x: 0.4, y: 1.3, w: 4.2, h: 0.4, fontSize: 14, bold: true, color: VERDE, fontFace: 'Calibri' });
s26.addText(
  'Autoconhecimento é saber quem você é:\n\n• Quais são seus pontos fortes?\n• O que você precisa melhorar?\n• Como você reage sob pressão?\n• Quais são seus valores?\n\nQuem se conhece toma decisões melhores!',
  { x: 0.4, y: 1.8, w: 4.2, h: 3.1, fontSize: 12, color: TEXTO, fontFace: 'Calibri' }
);
s26.addShape(pres.ShapeType.rect, { x: 5.0, y: 1.2, w: 4.7, h: 3.9, fill: { color: VERDE } });
s26.addText('Inteligência Emocional', { x: 5.1, y: 1.3, w: 4.5, h: 0.4, fontSize: 14, bold: true, color: AMARELO, fontFace: 'Calibri' });
s26.addText(
  'Como desenvolver:\n\n• Identifique suas emoções sem julgamento\n• Respire antes de reagir\n• Pratique escuta ativa\n• Busque feedback de quem confia em você\n• Escreva um diário emocional',
  { x: 5.1, y: 1.8, w: 4.5, h: 3.1, fontSize: 12, color: BRANCO, fontFace: 'Calibri' }
);
addFooter(s26);

// Slide 27 — Comunicação Assertiva e Trabalho em Equipe
const s27 = pres.addSlide();
s27.background = { color: FUNDO };
s27.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s27.addText('Comunicar e Colaborar', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 28, bold: true, color: BRANCO, fontFace: 'Calibri' });
const cc27 = [
  { text: 'Dizer o que pensa com respeito — ser claro sem ser agressivo', options: { bullet: true, fontSize: 14, color: TEXTO, breakLine: true } },
  { text: 'Escutar ativamente — prestar atenção real ao que o outro fala', options: { bullet: true, fontSize: 14, color: TEXTO, breakLine: true } },
  { text: 'Valorizar a contribuição de todos — cada ideia importa', options: { bullet: true, fontSize: 14, color: TEXTO, breakLine: true } },
  { text: 'Resolver conflitos com diálogo — evitar discussões improdutivas', options: { bullet: true, fontSize: 14, color: TEXTO, breakLine: true } },
  { text: 'Trabalhar em equipe é uma competência valorizada em TODAS as profissões', options: { bullet: true, fontSize: 14, color: VERDE, bold: true, breakLine: false } },
];
s27.addText(cc27, { x: 0.5, y: 1.3, w: 9, h: 3.9, fontFace: 'Calibri', paraSpaceAfter: 10 });
addFooter(s27);

// Slide 28 — Ética Profissional
const s28 = pres.addSlide();
s28.background = { color: FUNDO };
s28.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s28.addText('Ética no Mundo do Trabalho', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 24, bold: true, color: BRANCO, fontFace: 'Calibri' });
s28.addShape(pres.ShapeType.rect, { x: 0.3, y: 1.2, w: 9.4, h: 0.85, fill: { color: AMARELO } });
s28.addText('Ética é agir com honestidade, respeito e responsabilidade — mesmo quando ninguém está olhando.', {
  x: 0.5, y: 1.25, w: 9.0, h: 0.75, fontSize: 13, bold: true, color: VERDE, align: 'center', valign: 'middle', fontFace: 'Calibri', italic: true
});
s28.addText('Atitudes ÉTICAS:', { x: 0.4, y: 2.2, w: 4.4, h: 0.35, fontSize: 13, bold: true, color: VERDE, fontFace: 'Calibri' });
s28.addText('Atitudes ANTIÉTICAS:', { x: 5.0, y: 2.2, w: 4.6, h: 0.35, fontSize: 13, bold: true, color: 'C62828', fontFace: 'Calibri' });
const eticas = ['Cumprir prazos e compromissos', 'Respeitar o trabalho alheio', 'Ser honesto com clientes', 'Dividir créditos com a equipe'];
const antieticas = ['Copiar trabalho de colegas', 'Mentir para cliente', 'Prejudicar concorrente', 'Assumir mérito dos outros'];
eticas.forEach((e, i) => {
  s28.addShape(pres.ShapeType.rect, { x: 0.3, y: 2.65 + i * 0.6, w: 0.35, h: 0.45, fill: { color: '2E7D32' } });
  s28.addText('✓', { x: 0.3, y: 2.65 + i * 0.6, w: 0.35, h: 0.45, fontSize: 11, bold: true, color: BRANCO, align: 'center', valign: 'middle', fontFace: 'Calibri' });
  s28.addText(e, { x: 0.75, y: 2.65 + i * 0.6, w: 4.0, h: 0.45, fontSize: 12, color: TEXTO, valign: 'middle', fontFace: 'Calibri' });
});
antieticas.forEach((a, i) => {
  s28.addShape(pres.ShapeType.rect, { x: 5.0, y: 2.65 + i * 0.6, w: 0.35, h: 0.45, fill: { color: 'C62828' } });
  s28.addText('✗', { x: 5.0, y: 2.65 + i * 0.6, w: 0.35, h: 0.45, fontSize: 11, bold: true, color: BRANCO, align: 'center', valign: 'middle', fontFace: 'Calibri' });
  s28.addText(a, { x: 5.45, y: 2.65 + i * 0.6, w: 4.2, h: 0.45, fontSize: 12, color: TEXTO, valign: 'middle', fontFace: 'Calibri' });
});
addFooter(s28);

// Slide 29 — Resiliência
const s29 = pres.addSlide();
s29.background = { color: FUNDO };
s29.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: VERDE } });
s29.addText('Resiliência', { x: 0.4, y: 0.15, w: 9.2, h: 0.8, fontSize: 32, bold: true, color: BRANCO, fontFace: 'Calibri' });
s29.addShape(pres.ShapeType.rect, { x: 0.3, y: 1.2, w: 9.4, h: 1.0, fill: { color: VERDE } });
s29.addText('"A vida não é sobre esperar a tempestade passar, mas aprender a dançar na chuva."', {
  x: 0.5, y: 1.25, w: 9.0, h: 0.9, fontSize: 13, color: AMARELO, italic: true, align: 'center', valign: 'middle', fontFace: 'Cambria'
});
s29.addText('O que é resiliência?', { x: 0.4, y: 2.35, w: 9.2, h: 0.4, fontSize: 14, bold: true, color: VERDE, fontFace: 'Calibri' });
s29.addText('É a capacidade de superar adversidades, adaptar-se a mudanças e continuar seguindo em frente depois de dificuldades.', {
  x: 0.4, y: 2.8, w: 9.2, h: 0.6, fontSize: 13, color: TEXTO, fontFace: 'Calibri'
});
s29.addText('Como desenvolver:', { x: 0.4, y: 3.5, w: 9.2, h: 0.35, fontSize: 13, bold: true, color: VERDE, fontFace: 'Calibri' });
const res29 = [
  { text: 'Encare erros como aprendizado, não como fracasso', options: { bullet: true, fontSize: 13, color: TEXTO, breakLine: true } },
  { text: 'Busque apoio em amigos, família e professores', options: { bullet: true, fontSize: 13, color: TEXTO, breakLine: true } },
  { text: 'Celebre pequenas conquistas no caminho', options: { bullet: true, fontSize: 13, color: TEXTO, breakLine: false } },
];
s29.addText(res29, { x: 0.5, y: 3.88, w: 9, h: 1.1, fontFace: 'Calibri', paraSpaceAfter: 5 });
addFooter(s29);

// Slide 30 — Síntese Final
const s30 = pres.addSlide();
s30.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: VERDE } });
s30.addText('O que aprendemos nesta UC?', {
  x: 0.5, y: 0.4, w: 9, h: 0.9, fontSize: 30, bold: true, color: BRANCO, align: 'center', fontFace: 'Cambria'
});
const sin30 = [
  { text: 'Empreendedorismo e tipos de negócios', options: { bullet: true, fontSize: 16, color: BRANCO, breakLine: true } },
  { text: 'Sustentabilidade e os 5R\'s no dia a dia', options: { bullet: true, fontSize: 16, color: BRANCO, breakLine: true } },
  { text: 'Plano de negócios e identificação de oportunidades', options: { bullet: true, fontSize: 16, color: BRANCO, breakLine: true } },
  { text: 'Competências socioemocionais para o mundo do trabalho', options: { bullet: true, fontSize: 16, color: BRANCO, breakLine: true } },
  { text: 'Ética, comunicação assertiva e resiliência', options: { bullet: true, fontSize: 16, color: BRANCO, breakLine: false } },
];
s30.addText(sin30, { x: 0.8, y: 1.45, w: 8.5, h: 3.0, fontFace: 'Calibri', paraSpaceAfter: 10 });
s30.addShape(pres.ShapeType.rect, { x: 0.5, y: 4.65, w: 9, h: 0.7, fill: { color: AMARELO } });
s30.addText('Você está pronto para empreender com responsabilidade!', {
  x: 0.5, y: 4.65, w: 9, h: 0.7, fontSize: 15, bold: true, color: VERDE, align: 'center', valign: 'middle', fontFace: 'Calibri'
});

pres.writeFile({ fileName: OUTPUT })
  .then(() => console.log('PPTX criado com sucesso:', OUTPUT))
  .catch(err => { console.error('Erro:', err); process.exit(1); });
