import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputPath = "C:/fontes/professor-senai/sistema/FICHA-PRODUTO-MAIS-TECH/REFORCO_LINGUAGENS/DIARIO_CLASSE_REFORCO_LINGUAGEM.xlsx";

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("Diário de Classe");
sheet.showGridLines = false;
sheet.freezePanes.freezeRows(9);

sheet.getRange("A1:G1").merge();
sheet.getRange("A1").values = [["DIÁRIO DE CLASSE — REFORÇO DE LINGUAGENS"]];
sheet.getRange("A1:G1").format = {
  fill: "#1F4E78",
  font: { bold: true, color: "#FFFFFF", size: 18 },
  horizontalAlignment: "center",
  verticalAlignment: "center",
};
sheet.getRange("A1:G1").format.rowHeight = 34;

sheet.getRange("A3:B6").values = [
  ["Diário", "509634"],
  ["Unidade curricular", "Reforço de Linguagens"],
  ["Sistema de origem", "SGN — Sistema de Gestão do Negócio"],
  ["Data de referência", new Date("2026-08-25T00:00:00")],
];
sheet.getRange("A3:A6").format = {
  fill: "#D9EAF7",
  font: { bold: true, color: "#1F1F1F" },
};
sheet.getRange("B6").format.numberFormat = "dd/mm/yyyy";

sheet.getRange("D3:E6").values = [
  ["C.H presencial prevista", 63 / 24],
  ["C.H não presencial prevista", 0],
  ["C.H presencial alocada", 52 / 24],
  ["C.H presencial ministrada", null],
];
sheet.getRange("D3:D6").format = {
  fill: "#D9EAF7",
  font: { bold: true, color: "#1F1F1F" },
};
sheet.getRange("E3:E6").format = {
  fill: "#E2F0D9",
  font: { bold: true, color: "#1F1F1F" },
  numberFormat: "[h]:mm",
  horizontalAlignment: "center",
};
sheet.getRange("E6").formulas = [["=SUM(E10:E18)"]];

sheet.getRange("A8:G8").values = [[
  "Matrícula",
  "Docente",
  "Tipo",
  "C.H presencial alocada",
  "C.H presencial ministrada",
  "C.H não presencial alocada",
  "C.H não presencial ministrada",
]];
sheet.getRange("A8:G8").format = {
  fill: "#4472C4",
  font: { bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  wrapText: true,
  borders: { preset: "all", style: "thin", color: "#D9E2F3" },
};
sheet.getRange("A8:G8").format.rowHeight = 48;

const rows = [
  ["73537", "Lucas Kohn Morandi", "", 4 / 24, 4 / 24, 0, 0],
  ["75912", "Graziela Marconcini Semann Ferreira", "", 8 / 24, 8 / 24, 0, 0],
  ["77057", "Cintia Simone Grimm", "", 2 / 24, 2 / 24, 0, 0],
  ["79399", "Robison Elias da Silva", "", 3 / 24, 3 / 24, 0, 0],
  ["79398", "Joao Victor Araujo de Freitas", "", 19 / 24, 10 / 24, 0, 0],
  ["80255", "Victor Samuel da Silva Anato", "", 2 / 24, 2 / 24, 0, 0],
  ["81931", "Leila Rosana Rode Scheidt", "", 2 / 24, 2 / 24, 0, 0],
  ["82061", "Nesio Oliveira Silva", "", 6 / 24, 6 / 24, 0, 0],
  ["82114", "Gelvazio Camargo", "", 6 / 24, 6 / 24, 0, 0],
];
sheet.getRange("A10:G18").values = rows;
sheet.getRange("A10:G18").format = {
  verticalAlignment: "center",
  borders: {
    insideHorizontal: { style: "thin", color: "#D9E2F3" },
    bottom: { style: "thin", color: "#D9E2F3" },
  },
};
sheet.getRange("A10:A18").format.horizontalAlignment = "center";
sheet.getRange("D10:G18").format = {
  numberFormat: "[h]:mm",
  horizontalAlignment: "center",
};

sheet.getRange("A19:C19").merge();
sheet.getRange("A19").values = [["TOTAL"]];
sheet.getRange("D19:G19").formulas = [[
  "=SUM(D10:D18)",
  "=SUM(E10:E18)",
  "=SUM(F10:F18)",
  "=SUM(G10:G18)",
]];
sheet.getRange("A19:G19").format = {
  fill: "#D9EAF7",
  font: { bold: true, color: "#1F1F1F" },
  borders: { preset: "doubleBottom", style: "medium", color: "#4472C4" },
};
sheet.getRange("A19:C19").format.horizontalAlignment = "right";
sheet.getRange("D19:G19").format = {
  numberFormat: "[h]:mm",
  horizontalAlignment: "center",
  fill: "#D9EAF7",
  font: { bold: true, color: "#1F1F1F" },
};

sheet.getRange("A21:G22").merge();
sheet.getRange("A21").values = [[
  "Fonte: DIARIO_CLASSE_REFORCO_LINGUAGEM.pdf — Diário de classe SGN nº 509634. O campo Tipo aparece vazio no documento de origem.",
]];
sheet.getRange("A21:G22").format = {
  fill: "#F2F2F2",
  font: { italic: true, color: "#595959", size: 9 },
  wrapText: true,
  verticalAlignment: "center",
};

sheet.getRange("A1:G22").format.font.name = "Aptos";
sheet.getRange("A1:G22").format.verticalAlignment = "center";
sheet.getRange("A3:E6").format.borders = { preset: "inside", style: "thin", color: "#D9E2F3" };

sheet.getRange("A:A").format.columnWidth = 12;
sheet.getRange("B:B").format.columnWidth = 34;
sheet.getRange("C:C").format.columnWidth = 16;
sheet.getRange("D:G").format.columnWidth = 19;
sheet.getRange("A10:G18").format.rowHeight = 26;

const table = sheet.tables.add("A8:G18", true, "DocentesDiario");
table.style = "TableStyleMedium2";
table.showFilterButton = true;
table.showBandedRows = true;

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

