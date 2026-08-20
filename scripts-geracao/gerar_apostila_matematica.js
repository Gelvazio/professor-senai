/**
 * Gera o DOCX da Apostila de Reforço Matemática e Raciocínio Lógico
 * a partir do arquivo Markdown fonte.
 *
 * Uso: node scripts-geracao/gerar_apostila_matematica.js
 */

const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
  WidthType, AlignmentType, ShadingType, BorderStyle, PageBreak, LevelFormat,
} = require('docx');
const fs = require('fs');
const path = require('path');

const AZUL    = '0D1B4B';
const VERMELHO = 'E53935';
const AZUL_CLARO = 'D0D7E8';
const CINZA_CODE = 'F2F2F2';

// ---------------------------------------------------------------------------
// Inline parser: **bold**, `code`
// ---------------------------------------------------------------------------
function parseInline(text, baseSize = 22) {
  const runs = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      runs.push(new TextRun({ text: text.slice(last, m.index), size: baseSize }));
    }
    const token = m[0];
    if (token.startsWith('**')) {
      runs.push(new TextRun({ text: token.slice(2, -2), bold: true, size: baseSize }));
    } else {
      runs.push(new TextRun({ text: token.slice(1, -1), font: 'Courier New', size: baseSize - 2 }));
    }
    last = m.index + token.length;
  }
  if (last < text.length) {
    runs.push(new TextRun({ text: text.slice(last), size: baseSize }));
  }
  return runs.length ? runs : [new TextRun({ text, size: baseSize })];
}

// ---------------------------------------------------------------------------
// Element builders
// ---------------------------------------------------------------------------
const spacing = (before, after) => ({ before, after });

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text: text.trim(), bold: true, color: AZUL, size: 40, font: 'Calibri' })],
    spacing: spacing(480, 240),
    border: { bottom: { style: BorderStyle.THICK, size: 8, color: AZUL } },
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text: text.trim(), bold: true, color: AZUL, size: 30, font: 'Calibri' })],
    spacing: spacing(360, 180),
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    children: [new TextRun({ text: text.trim(), bold: true, size: 25, font: 'Calibri' })],
    spacing: spacing(240, 120),
  });
}

function h4(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_4,
    children: [new TextRun({ text: text.trim(), bold: true, size: 22, font: 'Calibri' })],
    spacing: spacing(180, 80),
  });
}

function para(text) {
  return new Paragraph({
    children: parseInline(text),
    spacing: spacing(80, 80),
  });
}

function blockquote(text) {
  return new Paragraph({
    children: parseInline(text, 21),
    indent: { left: 720 },
    spacing: spacing(60, 60),
    border: { left: { style: BorderStyle.SINGLE, size: 12, color: VERMELHO } },
  });
}

function codeBlock(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: 'Courier New', size: 18, color: '333333' })],
    spacing: spacing(60, 60),
    indent: { left: 720 },
    shading: { type: ShadingType.CLEAR, fill: CINZA_CODE },
  });
}

function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: 'bullet-list', level: Math.min(level, 1) },
    children: parseInline(text),
    spacing: spacing(60, 60),
  });
}

function ordered(text) {
  return new Paragraph({
    numbering: { reference: 'ordered-list', level: 0 },
    children: parseInline(text),
    spacing: spacing(60, 60),
  });
}

function hrule() {
  return new Paragraph({
    children: [new TextRun({ text: '' })],
    spacing: spacing(80, 80),
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC' } },
  });
}

function empty() {
  return new Paragraph({ children: [new TextRun({ text: '' })], spacing: spacing(40, 40) });
}

// ---------------------------------------------------------------------------
// Table parser
// ---------------------------------------------------------------------------
function parseTable(lines) {
  const parseRow = (line) =>
    line.split('|')
      .slice(1, -1)
      .map(c => c.trim());

  const headers = parseRow(lines[0]);
  const dataRows = lines.slice(2).map(parseRow);
  const numCols = headers.length;
  const totalWidth = 8640;
  const colW = Math.floor(totalWidth / numCols);
  const colWidths = headers.map(() => colW);

  const mkCell = (text, isHeader = false) =>
    new TableCell({
      width: { size: colW, type: WidthType.DXA },
      shading: isHeader ? { type: ShadingType.CLEAR, fill: AZUL_CLARO } : undefined,
      margins: { top: 80, bottom: 80, left: 100, right: 100 },
      children: [new Paragraph({
        children: parseInline(text.replace(/\*\*/g, ''), 19),
        alignment: isHeader ? AlignmentType.CENTER : AlignmentType.LEFT,
        spacing: spacing(40, 40),
      })],
    });

  return new Table({
    columnWidths: colWidths,
    width: { size: totalWidth, type: WidthType.DXA },
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map(h => {
          const cell = mkCell(h, true);
          // override with bold
          cell.options && (cell.options.children[0].options.children = [
            new TextRun({ text: h.replace(/\*\*/g, ''), bold: true, size: 20, color: AZUL }),
          ]);
          return cell;
        }),
      }),
      ...dataRows.map(row => new TableRow({
        children: row.map(c => mkCell(c, false)),
      })),
    ],
  });
}

// ---------------------------------------------------------------------------
// Main Markdown → docx elements parser
// ---------------------------------------------------------------------------
function parse(content) {
  const lines = content.split('\n');
  const elems = [];
  let i = 0;
  let inCode = false;
  let codeLines = [];
  let tableLines = [];

  const flushTable = () => {
    if (tableLines.length >= 2) {
      try { elems.push(parseTable(tableLines)); } catch (_) {
        tableLines.forEach(l => elems.push(para(l)));
      }
      elems.push(empty());
    }
    tableLines = [];
  };

  while (i < lines.length) {
    const line = lines[i];

    // Code fence
    if (line.trim().startsWith('```')) {
      if (!inCode) { inCode = true; codeLines = []; }
      else {
        inCode = false;
        if (codeLines.length) elems.push(codeBlock(codeLines.join('\n')));
        codeLines = [];
      }
      i++; continue;
    }
    if (inCode) { codeLines.push(line); i++; continue; }

    // Table
    if (line.trim().startsWith('|') && line.includes('|', 1)) {
      tableLines.push(line); i++; continue;
    } else { flushTable(); }

    // HR
    if (/^-{3,}$/.test(line.trim())) { elems.push(hrule()); i++; continue; }

    // Headings
    if (line.startsWith('#### ')) { elems.push(h4(line.slice(5))); i++; continue; }
    if (line.startsWith('### '))  { elems.push(h3(line.slice(4))); i++; continue; }
    if (line.startsWith('## '))   { elems.push(h2(line.slice(3))); i++; continue; }
    if (line.startsWith('# '))    { elems.push(h1(line.slice(2))); i++; continue; }

    // Blockquote
    if (line.startsWith('> ')) { elems.push(blockquote(line.slice(2))); i++; continue; }

    // Bullet list
    const bulletMatch = line.match(/^(\s*)[-*]\s(.*)/);
    if (bulletMatch) {
      const lvl = Math.floor((bulletMatch[1] || '').length / 2);
      elems.push(bullet(bulletMatch[2], lvl));
      i++; continue;
    }

    // Ordered list
    const ordMatch = line.match(/^\d+\.\s(.*)/);
    if (ordMatch) { elems.push(ordered(ordMatch[1])); i++; continue; }

    // Empty line
    if (!line.trim()) { i++; continue; }

    // Paragraph
    elems.push(para(line));
    i++;
  }

  flushTable();
  return elems;
}

// ---------------------------------------------------------------------------
// Build and write document
// ---------------------------------------------------------------------------
async function main() {
  const srcPath = path.join(
    'C:', 'fontes', 'professor-senai', 'sistema',
    'FICHA-PRODUTO-MAIS-TECH', 'ReforcoMatematicaRaciocinioLogico',
    'Apostila_Reforco_Matematica_Raciocinio_Logico.md'
  );
  const outPath = path.join(
    'C:', 'fontes', 'professor-senai', 'sistema',
    'FICHA-PRODUTO-MAIS-TECH', 'ReforcoMatematicaRaciocinioLogico',
    'Apostila_Reforco_Matematica_Raciocinio_Logico.docx'
  );

  const content = fs.readFileSync(srcPath, 'utf-8');
  const children = parse(content);

  const doc = new Document({
    numbering: {
      config: [
        {
          reference: 'bullet-list',
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: '•',
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: { indent: { left: 720, hanging: 360 } },
                run: { font: 'Symbol', size: 22 },
              },
            },
            {
              level: 1,
              format: LevelFormat.BULLET,
              text: '◦',
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: { indent: { left: 1080, hanging: 360 } },
                run: { font: 'Symbol', size: 22 },
              },
            },
          ],
        },
        {
          reference: 'ordered-list',
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: '%1.',
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: { indent: { left: 720, hanging: 360 } },
                run: { size: 22 },
              },
            },
          ],
        },
      ],
    },
    styles: {
      default: {
        document: {
          run: { font: 'Calibri', size: 22 },
          paragraph: { spacing: { before: 80, after: 80 } },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, right: 1260, bottom: 1440, left: 1260 },
          },
        },
        children,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outPath, buffer);
  console.log('Apostila gerada:', outPath);
}

main().catch(err => { console.error(err); process.exit(1); });
