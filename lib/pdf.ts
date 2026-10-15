import { jsPDF } from "jspdf";

const FONT = "Roboto";
const MARGIN = 18;

export type PdfColumn = { header: string; width: number; align: "left" | "right" };
export type PdfBlock = { title?: string; lines: string[] };
export type PdfTotal = { label: string; value: string; emphasize?: boolean };
export type PdfNote = { title: string; text: string };

export type PdfModel = {
  filename: string;
  title: string;
  meta: string[];
  blocks: PdfBlock[];
  columns: PdfColumn[];
  rows: string[][];
  totals: PdfTotal[];
  notes?: PdfNote[];
  footer: string;
};

let regularFont: string | null = null;
let boldFont: string | null = null;

function arrayBufferToBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x4000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return btoa(binary);
}

async function fontBase64(path: string) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Font could not be loaded (${response.status})`);
  return arrayBufferToBase64(await response.arrayBuffer());
}

async function createDocument() {
  if (!regularFont) regularFont = await fontBase64("/fonts/Roboto-Regular.ttf");
  if (!boldFont) boldFont = await fontBase64("/fonts/Roboto-Bold.ttf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.addFileToVFS("Roboto-Regular.ttf", regularFont);
  doc.addFont("Roboto-Regular.ttf", FONT, "normal");
  doc.addFileToVFS("Roboto-Bold.ttf", boldFont);
  doc.addFont("Roboto-Bold.ttf", FONT, "bold");
  doc.setFont(FONT, "normal");
  return doc;
}

function asLines(value: string | string[]) {
  return Array.isArray(value) ? value : [value];
}

export function safePdfFilename(name: string) {
  const cleaned = name
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\.+$/g, "")
    .slice(0, 120);
  return `${cleaned || "document"}.pdf`;
}

export async function downloadBusinessPdf(model: PdfModel) {
  const doc = await createDocument();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const left = MARGIN;
  const right = pageWidth - MARGIN;
  const contentWidth = right - left;
  let y = 20;

  const preparePage = () => {
    doc.setFont(FONT, "normal");
    doc.setFontSize(10);
    doc.setTextColor(17, 24, 39);
  };

  const nextPage = () => {
    doc.addPage();
    y = 20;
    preparePage();
  };

  const wrap = (text: string, width: number) => asLines(doc.splitTextToSize(text || " ", Math.max(width, 8)));

  preparePage();
  doc.setFont(FONT, "bold");
  doc.setFontSize(22);
  const titleWidth = doc.getTextWidth(model.title);
  doc.setFont(FONT, "normal");
  doc.setFontSize(10);
  const metaWidth = 78;
  const sideBySide = left + titleWidth + 8 <= right - metaWidth;

  if (sideBySide) {
    doc.setFont(FONT, "bold");
    doc.setFontSize(22);
    doc.text(model.title, left, y);
    doc.setFont(FONT, "normal");
    doc.setFontSize(10);
    let metaY = y - 1;
    for (const line of model.meta) {
      for (const part of wrap(line, metaWidth)) {
        doc.text(part, right, metaY, { align: "right" });
        metaY += 5;
      }
    }
    y = Math.max(y + 12, metaY + 6);
  } else {
    doc.setFont(FONT, "bold");
    doc.setFontSize(22);
    doc.text(model.title, left, y);
    y += 10;
    doc.setFont(FONT, "normal");
    doc.setFontSize(10);
    for (const line of model.meta) {
      for (const part of wrap(line, contentWidth)) {
        doc.text(part, left, y);
        y += 5;
      }
    }
    y += 4;
  }

  const blocks = model.blocks
    .map((block) => ({
      title: block.title?.trim() ?? "",
      lines: block.lines.flatMap((line) => line.split(/\r?\n/)).map((line) => line.trim()).filter(Boolean),
    }))
    .filter((block) => block.title || block.lines.length);

  if (blocks.length > 0) {
    const gap = blocks.length > 1 ? 8 : 0;
    const columnWidth = (contentWidth - gap * (blocks.length - 1)) / blocks.length;
    const rendered = blocks.map((block) => {
      const lines: { text: string; bold: boolean }[] = [];
      if (block.title) lines.push({ text: block.title, bold: true });
      for (const line of block.lines) {
        for (const part of wrap(line, columnWidth)) lines.push({ text: part, bold: false });
      }
      return lines;
    });
    const blockHeight = Math.max(...rendered.map((lines) => lines.length), 1) * 5;
    if (y + blockHeight > pageHeight - MARGIN) nextPage();
    rendered.forEach((lines, index) => {
      const x = left + index * (columnWidth + gap);
      lines.forEach((line, lineIndex) => {
        doc.setFont(FONT, line.bold ? "bold" : "normal");
        doc.text(line.text, x, y + lineIndex * 5);
      });
    });
    y += blockHeight + 8;
  }

  const fractionTotal = model.columns.reduce((sum, column) => sum + column.width, 0) || 1;
  const widths = model.columns.map((column) => (column.width / fractionTotal) * contentWidth);
  widths[widths.length - 1] = contentWidth - widths.slice(0, -1).reduce((sum, width) => sum + width, 0);

  const drawTableHeader = () => {
    if (y + 16 > pageHeight - MARGIN) nextPage();
    doc.setFillColor(241, 245, 249);
    doc.rect(left, y - 5, contentWidth, 10, "F");
    doc.setFont(FONT, "bold");
    doc.setFontSize(10);
    doc.setTextColor(17, 24, 39);
    let x = left;
    model.columns.forEach((column, index) => {
      const textX = column.align === "right" ? x + widths[index] - 2 : x + 2;
      doc.text(column.header, textX, y + 1, { align: column.align });
      x += widths[index];
    });
    doc.setFont(FONT, "normal");
    y += 12;
  };

  drawTableHeader();
  for (const row of model.rows) {
    const cells = model.columns.map((column, index) => {
      const raw = row[index] ?? "";
      const text = raw || (index === 0 ? "—" : "");
      return wrap(text, widths[index] - 4);
    });
    const rowHeight = Math.max(...cells.map((lines) => lines.length), 1) * 5 + 4;
    if (y + rowHeight > pageHeight - MARGIN && y > 40) {
      nextPage();
      drawTableHeader();
    }
    cells.forEach((lines, index) => {
      const x = left + widths.slice(0, index).reduce((sum, width) => sum + width, 0);
      const align = model.columns[index].align;
      lines.forEach((line, lineIndex) => {
        const textX = align === "right" ? x + widths[index] - 2 : x + 2;
        doc.text(line, textX, y + lineIndex * 5, { align });
      });
    });
    y += rowHeight;
    doc.setDrawColor(226, 232, 240);
    doc.line(left, y - 2, right, y - 2);
  }

  y += 6;
  const totalsHeight = model.totals.length * 8 + 6;
  if (y + totalsHeight > pageHeight - MARGIN) nextPage();
  for (const total of model.totals) {
    doc.setFont(FONT, total.emphasize ? "bold" : "normal");
    const labelLines = wrap(total.label, contentWidth * 0.5);
    const valueLines = wrap(total.value, contentWidth * 0.42);
    const lineCount = Math.max(labelLines.length, valueLines.length);
    if (y + (total.emphasize ? 2 : 0) + lineCount * 5 > pageHeight - MARGIN) nextPage();
    if (total.emphasize) {
      doc.setDrawColor(15, 23, 42);
      doc.setFont(FONT, "bold");
      doc.line(left + contentWidth * 0.42, y - 1, right, y - 1);
      y += 2;
    }
    labelLines.forEach((line, index) => doc.text(line, left + contentWidth * 0.42, y + index * 5));
    valueLines.forEach((line, index) => doc.text(line, right, y + index * 5, { align: "right" }));
    y += lineCount * 5 + 2;
  }

  for (const note of model.notes ?? []) {
    if (!note.text.trim()) continue;
    const lines = wrap(note.text.trim(), contentWidth);
    const required = 12 + lines.length * 5;
    if (y + required > pageHeight - MARGIN) nextPage();
    y += 6;
    doc.setFont(FONT, "bold");
    doc.text(note.title, left, y);
    doc.setFont(FONT, "normal");
    y += 6;
    lines.forEach((line, index) => doc.text(line, left, y + index * 5));
    y += lines.length * 5;
  }

  const footerLines = wrap(model.footer, contentWidth);
  if (y + 8 + footerLines.length * 4 > pageHeight - 10) nextPage();
  y += 8;
  doc.setFont(FONT, "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  footerLines.forEach((line, index) => doc.text(line, left, y + index * 4));
  doc.save(safePdfFilename(model.filename));
}
