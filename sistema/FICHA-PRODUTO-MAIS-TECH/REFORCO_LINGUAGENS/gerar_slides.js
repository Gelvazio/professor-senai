const pptxgen = require('pptxgenjs');

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

// Paleta
const COR = {
  PRIMARY: '1B4332',
  SECONDARY: '2D6A4F',
  ACCENT: 'F4A261',
  LIGHT: 'F0FFF4',
  DARK: '0A1F14',
  WHITE: 'FFFFFF',
  MUTED: 'A8D5B5',
  CARD: '234D3C',
};

const W = 10;
const H = 5.625;

function addBg(slide, color) {
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color } });
}

function addTitle(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x ?? 0.5,
    y: opts.y ?? 0.3,
    w: opts.w ?? 9,
    h: opts.h ?? 0.9,
    fontSize: opts.fontSize ?? 36,
    bold: true,
    color: opts.color ?? COR.LIGHT,
    fontFace: 'Calibri',
    align: opts.align ?? 'left',
    valign: 'middle',
    margin: 0,
  });
}

function addBody(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x ?? 0.5,
    y: opts.y ?? 1.3,
    w: opts.w ?? 9,
    h: opts.h ?? 3.8,
    fontSize: opts.fontSize ?? 15,
    color: opts.color ?? COR.LIGHT,
    fontFace: 'Calibri',
    align: 'left',
    valign: 'top',
    margin: opts.margin ?? 4,
    ...opts,
  });
}

function addFooter(slide, text) {
  slide.addText(text, {
    x: 0, y: H - 0.38, w: W, h: 0.35,
    fontSize: 10, color: COR.MUTED, fontFace: 'Calibri',
    align: 'center', valign: 'middle',
    fill: { color: COR.DARK },
    margin: 0,
  });
}

function addCard(slide, x, y, w, h, title, body, accent) {
  slide.addShape(pres.ShapeType.roundRect, {
    x, y, w, h,
    fill: { color: COR.CARD },
    rectRadius: 0.12,
    line: { color: accent ?? COR.ACCENT, width: 2 },
  });
  slide.addText(title, {
    x: x + 0.15, y: y + 0.1, w: w - 0.3, h: 0.38,
    fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'left', valign: 'middle', margin: 0,
  });
  slide.addText(body, {
    x: x + 0.15, y: y + 0.52, w: w - 0.3, h: h - 0.65,
    fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'left', valign: 'top', margin: 0,
  });
}

// ── SLIDE 1 — CAPA ──────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  // Faixa de acento superior
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  // Bloco central
  s.addShape(pres.ShapeType.rect, { x: 0.5, y: 1.1, w: 9, h: 3.2, fill: { color: COR.CARD } });
  s.addText('Reforço de Linguagens', {
    x: 0.7, y: 1.25, w: 8.6, h: 1.1,
    fontSize: 44, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'left', valign: 'middle', margin: 0,
  });
  s.addText('RIO DO SUL MAIS TECH · SENAI · Iniciação Profissional', {
    x: 0.7, y: 2.4, w: 8.6, h: 0.6,
    fontSize: 18, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'left', valign: 'middle', margin: 0,
  });
  s.addShape(pres.ShapeType.rect, { x: 0.7, y: 3.1, w: 2.5, h: 0.06, fill: { color: COR.ACCENT } });
  s.addText('Prefeitura Municipal de Rio do Sul', {
    x: 0.7, y: 3.25, w: 8.6, h: 0.45,
    fontSize: 14, color: COR.MUTED, fontFace: 'Calibri',
    align: 'left', valign: 'middle', margin: 0,
  });
  s.addText('Carga Horária: 63h  |  Modalidade: Presencial', {
    x: 0.7, y: 3.75, w: 8.6, h: 0.4,
    fontSize: 12, color: COR.MUTED, fontFace: 'Calibri',
    align: 'left', valign: 'middle', margin: 0,
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 2 — VISUAL INSTITUCIONAL ─────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  // Dois painéis
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0.12, w: 4.5, h: H - 0.5, fill: { color: COR.PRIMARY } });
  s.addText('📚', { x: 1.2, y: 0.8, w: 2, h: 2, fontSize: 96, align: 'center', valign: 'middle' });
  s.addText('Ler · Escrever · Comunicar', {
    x: 0.15, y: 3.0, w: 4.2, h: 0.7,
    fontSize: 16, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  s.addText('Desenvolvendo habilidades\nde linguagem para a vida,\no estudo e o trabalho.', {
    x: 0.15, y: 3.75, w: 4.2, h: 1.1,
    fontSize: 13, color: COR.MUTED, fontFace: 'Calibri',
    align: 'center', valign: 'top', margin: 0,
  });
  // Painel direito
  s.addText('Programa Rio do Sul Mais Tech', {
    x: 4.8, y: 0.5, w: 4.9, h: 0.7,
    fontSize: 22, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'left', valign: 'middle', margin: 0,
  });
  const items = [
    ['🏫', 'SENAI — Serviço Nacional de Aprendizagem Industrial'],
    ['🏙️', 'Prefeitura Municipal de Rio do Sul'],
    ['🎓', 'Iniciação Profissional para jovens do 8° e 9° ano'],
    ['🌱', 'Formação técnica, cidadã e humana'],
  ];
  items.forEach(([ico, txt], i) => {
    s.addText(ico, { x: 4.8, y: 1.4 + i * 0.8, w: 0.5, h: 0.6, fontSize: 20, align: 'center', valign: 'middle' });
    s.addText(txt, {
      x: 5.35, y: 1.4 + i * 0.8, w: 4.3, h: 0.6,
      fontSize: 13, color: COR.LIGHT, fontFace: 'Calibri',
      align: 'left', valign: 'middle', margin: 0,
    });
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 3 — IDENTIFICAÇÃO DA UC ──────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Identificação da Unidade Curricular', { y: 0.2, fontSize: 30 });
  const dados = [
    ['UC', 'Reforço de Linguagens'],
    ['Módulo', 'Único'],
    ['CH Total', '63 horas'],
    ['CH Presencial', '63 horas'],
    ['Público-alvo', '8° e 9° ano do Ensino Fundamental (12–15 anos)'],
    ['Modalidade', 'Presencial — LabTEC'],
    ['Programa', 'Rio do Sul Mais Tech — SENAI / Prefeitura Municipal de Rio do Sul'],
  ];
  dados.forEach(([label, valor], i) => {
    const y = 1.15 + i * 0.57;
    s.addShape(pres.ShapeType.rect, { x: 0.4, y, w: 2.5, h: 0.48, fill: { color: COR.SECONDARY } });
    s.addText(label, {
      x: 0.4, y, w: 2.5, h: 0.48,
      fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
      align: 'center', valign: 'middle', margin: 0,
    });
    s.addShape(pres.ShapeType.rect, { x: 2.95, y, w: 6.65, h: 0.48, fill: { color: COR.CARD } });
    s.addText(valor, {
      x: 2.95, y, w: 6.65, h: 0.48,
      fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri',
      align: 'left', valign: 'middle', margin: 8,
    });
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 4 — APRESENTAÇÃO DO PROFESSOR ────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Apresentação do Professor', { y: 0.2, fontSize: 30 });
  // Avatar placeholder
  s.addShape(pres.ShapeType.ellipse, { x: 0.5, y: 1.1, w: 2.4, h: 2.4, fill: { color: COR.CARD }, line: { color: COR.ACCENT, width: 3 } });
  s.addText('👤', { x: 0.5, y: 1.1, w: 2.4, h: 2.4, fontSize: 72, align: 'center', valign: 'middle' });
  const cards = [
    ['Nome', '[Nome do Professor]'],
    ['Formação', '[Formação Acadêmica]'],
    ['Experiência', '[Área de atuação e anos de experiência]'],
    ['Contato', '[E-mail ou canal de comunicação]'],
  ];
  cards.forEach(([label, val], i) => {
    const y = 1.1 + i * 0.82;
    s.addShape(pres.ShapeType.roundRect, { x: 3.2, y, w: 6.3, h: 0.7, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(label + ': ', {
      x: 3.35, y: y + 0.05, w: 1.5, h: 0.6,
      fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
      align: 'left', valign: 'middle', margin: 0,
    });
    s.addText(val, {
      x: 4.65, y: y + 0.05, w: 4.7, h: 0.6,
      fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri',
      align: 'left', valign: 'middle', margin: 0,
    });
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 5 — DINÂMICA: AVIÃO DE PAPEL ─────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Dinâmica de Apresentação da Turma', { y: 0.2, fontSize: 28 });
  s.addText('✈️', { x: 3.5, y: 0.95, w: 3, h: 2.0, fontSize: 100, align: 'center', valign: 'middle' });
  s.addText('Avião de Papel', {
    x: 0.5, y: 2.95, w: 9, h: 0.55,
    fontSize: 24, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  const passos = [
    '1. Pegue um papel e escreva: nome, idade, escola e algo sobre você',
    '2. Dobre o papel em formato de avião de papel',
    '3. Ao sinal, todos lançam o avião ao mesmo tempo',
    '4. Quem pegar um avião, lê em voz alta as informações do colega',
  ];
  s.addText(passos.join('\n'), {
    x: 0.5, y: 3.55, w: 9, h: 1.65,
    fontSize: 13, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'left', valign: 'top', margin: 0,
    lineSpacingMultiple: 1.3,
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 6 — PLANO DE ENSINO ──────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Plano de Ensino', { y: 0.2, fontSize: 30 });
  const modulos = [
    ['Módulo 1', 'Leitura e Compreensão Textual', '15h'],
    ['Módulo 2', 'Produção Textual', '12h'],
    ['Módulo 3', 'Gramática Aplicada', '12h'],
    ['Módulo 4', 'Comunicação Oral', '12h'],
    ['Módulo 5', 'Autonomia e Estratégias de Estudo', '12h'],
  ];
  modulos.forEach(([mod, tema, ch], i) => {
    const y = 1.1 + i * 0.77;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 1.6, h: 0.62, fill: { color: COR.ACCENT }, rectRadius: 0.08 });
    s.addText(mod, {
      x: 0.4, y, w: 1.6, h: 0.62,
      fontSize: 11, bold: true, color: COR.DARK, fontFace: 'Calibri',
      align: 'center', valign: 'middle', margin: 0,
    });
    s.addShape(pres.ShapeType.roundRect, { x: 2.1, y, w: 6.1, h: 0.62, fill: { color: COR.CARD }, rectRadius: 0.08 });
    s.addText(tema, {
      x: 2.25, y, w: 5.1, h: 0.62,
      fontSize: 13, color: COR.LIGHT, fontFace: 'Calibri',
      align: 'left', valign: 'middle', margin: 0,
    });
    s.addShape(pres.ShapeType.roundRect, { x: 8.25, y, w: 1.35, h: 0.62, fill: { color: COR.PRIMARY }, rectRadius: 0.08 });
    s.addText(ch, {
      x: 8.25, y, w: 1.35, h: 0.62,
      fontSize: 14, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
      align: 'center', valign: 'middle', margin: 0,
    });
  });
  s.addShape(pres.ShapeType.rect, { x: 0.4, y: H - 0.75, w: 9.2, h: 0.3, fill: { color: COR.PRIMARY } });
  s.addText('Total: 63 horas  |  ~31 encontros de 2h  |  Local: LabTEC', {
    x: 0.4, y: H - 0.75, w: 9.2, h: 0.3,
    fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 7 — CAPACIDADES TÉCNICAS ─────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Capacidades Técnicas', { y: 0.2, fontSize: 30 });
  const caps = [
    ['📋', 'Organizar informações de forma clara e coerente'],
    ['📖', 'Desenvolver autonomia de estudo com estratégias de leitura e escrita'],
    ['🧠', 'Aplicar pensamento crítico na análise de textos'],
    ['🤝', 'Trabalhar em grupo em leitura, produção textual e debates'],
    ['💬', 'Comunicar-se de forma assertiva, respeitando diferentes opiniões'],
    ['📅', 'Cumprir prazos e entregar atividades conforme orientações'],
  ];
  const cols = [[0, 1, 2], [3, 4, 5]];
  cols.forEach((idxs, col) => {
    idxs.forEach((idx, row) => {
      const [ico, txt] = caps[idx];
      const x = 0.4 + col * 4.85;
      const y = 1.1 + row * 1.32;
      s.addShape(pres.ShapeType.roundRect, { x, y, w: 4.5, h: 1.18, fill: { color: COR.CARD }, rectRadius: 0.1 });
      s.addText(ico, { x: x + 0.1, y: y + 0.1, w: 0.8, h: 0.98, fontSize: 26, align: 'center', valign: 'middle' });
      s.addText(txt, {
        x: x + 0.98, y: y + 0.1, w: 3.35, h: 0.98,
        fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri',
        align: 'left', valign: 'middle', margin: 0,
      });
    });
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 8 — CAPACIDADES SOCIOEMOCIONAIS ──────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Capacidades Socioemocionais', { y: 0.2, fontSize: 30 });
  const items = [
    ['🎯', 'Responsabilidade', 'Assumir compromisso com a própria aprendizagem e com o grupo'],
    ['💪', 'Persistência', 'Superar dificuldades sem desistir diante de desafios linguísticos'],
    ['🌐', 'Colaboração', 'Contribuir ativamente em trabalhos em equipe e projetos coletivos'],
    ['🌈', 'Respeito à Diversidade', 'Valorizar diferentes modos de se expressar e comunicar'],
    ['👂', 'Escuta Ativa', 'Ouvir com atenção e interesse os colegas e o professor'],
  ];
  items.forEach(([ico, titulo, desc], i) => {
    const y = 1.1 + i * 0.83;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 9.2, h: 0.73, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(ico, { x: 0.5, y: y + 0.05, w: 0.65, h: 0.63, fontSize: 22, align: 'center', valign: 'middle' });
    s.addText(titulo, {
      x: 1.2, y: y + 0.05, w: 2.4, h: 0.63,
      fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
      align: 'left', valign: 'middle', margin: 0,
    });
    s.addText(desc, {
      x: 3.65, y: y + 0.05, w: 5.8, h: 0.63,
      fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri',
      align: 'left', valign: 'middle', margin: 0,
    });
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 9 — CONHECIMENTOS: LEITURA E INTERPRETAÇÃO ──────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Leitura e Interpretação Textual', { y: 0.2, fontSize: 28 });
  s.addText('Módulo 1 · 15 horas', {
    x: 0.5, y: 1.05, w: 4, h: 0.4,
    fontSize: 13, color: COR.ACCENT, fontFace: 'Calibri', bold: true,
    align: 'left', valign: 'middle', margin: 0,
  });
  const conteudos = [
    { ico: '🔍', t: 'Compreensão Global', d: 'Identificar a mensagem central e os elementos essenciais de um texto.' },
    { ico: '💡', t: 'Tema e Ideia Principal', d: 'Distinguir o assunto geral da tese ou ideia central defendida.' },
    { ico: '🎯', t: 'Intenção Comunicativa', d: 'Reconhecer o propósito do autor: informar, persuadir, narrar, descrever.' },
    { ico: '📝', t: 'Leitura Detalhada', d: 'Explorar nuances, inferências e informações explícitas e implícitas.' },
  ];
  conteudos.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.8;
    const y = 1.55 + row * 1.7;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 4.5, h: 1.55, fill: { color: COR.CARD }, rectRadius: 0.12 });
    s.addText(c.ico, { x: x + 0.15, y: y + 0.15, w: 0.7, h: 0.65, fontSize: 28, align: 'center', valign: 'middle' });
    s.addText(c.t, {
      x: x + 0.92, y: y + 0.12, w: 3.4, h: 0.45,
      fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
      align: 'left', valign: 'middle', margin: 0,
    });
    s.addText(c.d, {
      x: x + 0.92, y: y + 0.58, w: 3.4, h: 0.88,
      fontSize: 11.5, color: COR.LIGHT, fontFace: 'Calibri',
      align: 'left', valign: 'top', margin: 0,
    });
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 10 — CONHECIMENTOS: PRODUÇÃO TEXTUAL ─────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Produção Textual', { y: 0.2, fontSize: 30 });
  s.addText('Módulo 2 · 12 horas', {
    x: 0.5, y: 1.05, w: 4, h: 0.4,
    fontSize: 13, color: COR.ACCENT, fontFace: 'Calibri', bold: true,
    align: 'left', valign: 'middle', margin: 0,
  });
  // Fluxo de produção
  const etapas = ['✏️\nPlanejar', '📄\nRedigir', '🔄\nRevisar', '📢\nPublicar'];
  etapas.forEach((txt, i) => {
    const x = 0.4 + i * 2.3;
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.55, w: 2.1, h: 1.15, fill: { color: COR.CARD }, rectRadius: 0.12 });
    s.addText(txt, {
      x, y: 1.55, w: 2.1, h: 1.15,
      fontSize: 14, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
      align: 'center', valign: 'middle', margin: 0,
    });
    if (i < 3) s.addText('→', { x: x + 2.12, y: 1.85, w: 0.18, h: 0.55, fontSize: 18, color: COR.ACCENT, align: 'center', valign: 'middle', margin: 0 });
  });
  const temas = [
    ['🔗', 'Coesão Textual', 'Uso de conectivos, pronomes e referências para encadear ideias.'],
    ['💡', 'Coerência', 'Organização lógica e progressão temática do texto.'],
    ['¶', 'Paragrafação', 'Divisão em parágrafos com unidade temática e progressão.'],
    ['📐', 'Organização de Ideias', 'Introdução, desenvolvimento e conclusão bem estruturados.'],
  ];
  temas.forEach((t, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.8;
    const y = 2.85 + row * 1.1;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 4.5, h: 0.95, fill: { color: COR.PRIMARY }, rectRadius: 0.1 });
    s.addText(t[0], { x: x + 0.12, y, w: 0.65, h: 0.95, fontSize: 20, align: 'center', valign: 'middle' });
    s.addText(t[1], { x: x + 0.82, y: y + 0.06, w: 3.55, h: 0.33, fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(t[2], { x: x + 0.82, y: y + 0.4, w: 3.55, h: 0.5, fontSize: 11, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'top', margin: 0 });
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 11 — CONHECIMENTOS: GRAMÁTICA E ORALIDADE ───────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Gramática Aplicada e Oralidade', { y: 0.2, fontSize: 28 });
  // Coluna esquerda
  s.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 1.1, w: 4.45, h: 3.95, fill: { color: COR.CARD }, rectRadius: 0.12 });
  s.addText('📌 Gramática — Módulo 3 · 12h', {
    x: 0.6, y: 1.18, w: 4.1, h: 0.45,
    fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'left', valign: 'middle', margin: 0,
  });
  const gram = [
    '• Pontuação e seu papel comunicativo',
    '• Vírgula, ponto, ponto e vírgula',
    '• Concordância verbal',
    '• Concordância nominal',
    '• Regência verbal básica',
    '• Ortografia e acentuação',
  ];
  s.addText(gram.join('\n'), {
    x: 0.6, y: 1.68, w: 4.1, h: 3.2,
    fontSize: 12.5, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.5,
  });
  // Coluna direita
  s.addShape(pres.ShapeType.roundRect, { x: 5.15, y: 1.1, w: 4.45, h: 3.95, fill: { color: COR.CARD }, rectRadius: 0.12 });
  s.addText('🎤 Comunicação Oral — Módulo 4 · 12h', {
    x: 5.35, y: 1.18, w: 4.1, h: 0.45,
    fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'left', valign: 'middle', margin: 0,
  });
  const oral = [
    '• Técnicas de debate e argumentação',
    '• Apresentação oral com clareza',
    '• Postura, voz e contato visual',
    '• Escuta ativa e respeito ao turno',
    '• Linguagem formal e informal',
    '• Seminário e exposição de ideias',
  ];
  s.addText(oral.join('\n'), {
    x: 5.35, y: 1.68, w: 4.1, h: 3.2,
    fontSize: 12.5, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.5,
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 12 — COMBINADOS / REGRAS ─────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Nossos Combinados', { y: 0.2, fontSize: 30 });
  const regras = [
    ['📵', 'Celular', 'Guardado durante as aulas, salvo quando autorizado para pesquisa.'],
    ['⏰', 'Pontualidade', 'Chegar no horário é respeitar a si mesmo e aos colegas.'],
    ['🤐', 'Respeito', 'Ouvir o outro sem interromper, valorizar todas as opiniões.'],
    ['📚', 'Participação', 'Engajar-se nas atividades, fazer perguntas, colaborar.'],
    ['📝', 'Prazos', 'Entregar atividades dentro do prazo combinado.'],
    ['🤝', 'Cooperação', 'Ajudar os colegas e aprender junto — a turma é uma equipe.'],
  ];
  regras.forEach((r, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.85;
    const y = 1.1 + row * 1.35;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 4.5, h: 1.2, fill: { color: COR.CARD }, rectRadius: 0.12 });
    s.addText(r[0], { x: x + 0.1, y, w: 0.85, h: 1.2, fontSize: 28, align: 'center', valign: 'middle' });
    s.addText(r[1], { x: x + 1.0, y: y + 0.1, w: 3.35, h: 0.38, fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(r[2], { x: x + 1.0, y: y + 0.5, w: 3.35, h: 0.62, fontSize: 11.5, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'top', margin: 0 });
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 13 — SISTEMA DE AVALIAÇÃO ────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Sistema de Avaliação', { y: 0.2, fontSize: 30 });
  const avals = [
    { label: 'Atividades Práticas', peso: '40%', desc: 'Exercícios de leitura, escrita e oralidade realizados durante os módulos', ico: '✏️' },
    { label: 'Projeto Final', peso: '35%', desc: 'Texto de opinião sobre tecnologia e mercado de trabalho + apresentação oral', ico: '🏆' },
    { label: 'Participação', peso: '25%', desc: 'Engajamento, colaboração, respeito e frequência nas aulas', ico: '🙌' },
  ];
  avals.forEach((a, i) => {
    const y = 1.15 + i * 1.38;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 9.2, h: 1.22, fill: { color: COR.CARD }, rectRadius: 0.12 });
    s.addText(a.ico, { x: 0.5, y, w: 0.9, h: 1.22, fontSize: 30, align: 'center', valign: 'middle' });
    s.addText(a.label, { x: 1.45, y: y + 0.1, w: 5.2, h: 0.42, fontSize: 14, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(a.desc, { x: 1.45, y: y + 0.55, w: 5.2, h: 0.58, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'top', margin: 0 });
    s.addShape(pres.ShapeType.roundRect, { x: 7.8, y: y + 0.26, w: 1.6, h: 0.7, fill: { color: COR.ACCENT }, rectRadius: 0.1 });
    s.addText(a.peso, { x: 7.8, y: y + 0.26, w: 1.6, h: 0.7, fontSize: 22, bold: true, color: COR.DARK, fontFace: 'Calibri', align: 'center', valign: 'middle', margin: 0 });
  });
  s.addText('Média para aprovação: ≥ 6,0 pontos', {
    x: 0.4, y: H - 0.72, w: 9.2, h: 0.3,
    fontSize: 12, bold: true, color: COR.MUTED, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 14 — AVALIAÇÃO DE COMPORTAMENTO ──────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Avaliação de Comportamento', { y: 0.2, fontSize: 30 });
  const criterios = [
    ['🎯', 'Responsabilidade', 'Cumprir tarefas, prazos e compromissos assumidos'],
    ['🤝', 'Trabalho em Equipe', 'Colaborar, respeitar e contribuir com o grupo'],
    ['👂', 'Postura em Aula', 'Atenção, participação e respeito ao professor e colegas'],
    ['💬', 'Comunicação', 'Expressar-se com clareza, respeito e assertividade'],
    ['🔄', 'Autoavaliação', 'Refletir sobre o próprio desenvolvimento e propor melhorias'],
  ];
  criterios.forEach((c, i) => {
    const y = 1.1 + i * 0.83;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 9.2, h: 0.73, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(c[0], { x: 0.5, y, w: 0.65, h: 0.73, fontSize: 22, align: 'center', valign: 'middle' });
    s.addText(c[1], { x: 1.2, y, w: 2.8, h: 0.73, fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(c[2], { x: 4.05, y, w: 5.4, h: 0.73, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
  });
  s.addText('A avaliação de comportamento compõe 25% da nota final (Participação).', {
    x: 0.4, y: H - 0.72, w: 9.2, h: 0.3,
    fontSize: 11, color: COR.MUTED, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 15 — SITUAÇÃO DE APRENDIZAGEM ────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Situação de Aprendizagem', { y: 0.2, fontSize: 30 });
  // Destaque do projeto
  s.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 1.05, w: 9.2, h: 1.05, fill: { color: COR.ACCENT }, rectRadius: 0.14 });
  s.addText('💡 Projeto: "Tecnologia e Mercado de Trabalho"', {
    x: 0.55, y: 1.05, w: 8.9, h: 1.05,
    fontSize: 20, bold: true, color: COR.DARK, fontFace: 'Calibri',
    align: 'left', valign: 'middle', margin: 8,
  });
  const etapas = [
    ['1', '🔎 Pesquisar', 'Investigar como a tecnologia transforma o mercado de trabalho atual.'],
    ['2', '✍️ Produzir', 'Redigir um texto de opinião argumentativo, com posição clara e fundamentada.'],
    ['3', '🔄 Revisar', 'Aplicar conhecimentos de gramática, coesão e coerência ao texto.'],
    ['4', '🎤 Apresentar', 'Expor o texto oralmente para a turma, praticando a comunicação.'],
  ];
  etapas.forEach((e, i) => {
    const y = 2.2 + i * 0.77;
    s.addShape(pres.ShapeType.ellipse, { x: 0.4, y: y + 0.05, w: 0.6, h: 0.6, fill: { color: COR.SECONDARY } });
    s.addText(e[0], { x: 0.4, y: y + 0.05, w: 0.6, h: 0.6, fontSize: 14, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'center', valign: 'middle', margin: 0 });
    s.addShape(pres.ShapeType.roundRect, { x: 1.1, y, w: 8.5, h: 0.7, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(e[1], { x: 1.2, y, w: 2.0, h: 0.7, fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(e[2], { x: 3.2, y, w: 6.3, h: 0.7, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SALVAR ──────────────────────────────────────────────────────────────────
const outputPath = 'C:/fontes/professor-senai/sistema/FICHA-PRODUTO-MAIS-TECH/REFORCO_LINGUAGENS/Slides_Reforco_Linguagens.pptx';
pres.writeFile({ fileName: outputPath })
  .then(() => console.log('PPTX gerado:', outputPath))
  .catch(e => { console.error(e); process.exit(1); });
