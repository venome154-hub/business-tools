export const DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
export const XLSX_MIME = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

export type OfficeLine = {
  description: string;
  quantity: number;
  price: number;
  priceHigh?: number;
  taxRate: number;
};

export type OfficeDocument = {
  filename: string;
  title: string;
  template: "classic" | "modern" | "minimal";
  accent: string;
  currency: string;
  locale: string;
  meta: string[];
  fromTitle: string;
  fromLines: string[];
  toTitle: string;
  toLines: string[];
  qtyHeader: string;
  priceHeader: string;
  lines: OfficeLine[];
  perLineTax: boolean;
  discountRate: number;
  taxRate: number;
  shipping: number | null;
  previouslyPaid: number | null;
  amountPaid: number | null;
  paidLabel: string;
  totalLabel: string;
  notes: { title: string; text: string }[];
  signature: string;
  signatureLabel: string;
  madeWith: boolean;
  madeWithUrl: string;
};

export type OfficeTotals = {
  lines: { description: string; quantity: number; price: number; priceHigh?: number; taxRate: number; amount: number; amountHigh: number; tax: number }[];
  subtotal: number;
  subtotalHigh: number;
  discount: number;
  discountHigh: number;
  tax: number;
  taxHigh: number;
  shipping: number;
  total: number;
  totalHigh: number;
};

function round2(value: number) {
  if (!Number.isFinite(value)) return 0;
  const rounded = Number(value.toFixed(2));
  return Object.is(rounded, -0) ? 0 : rounded;
}

export function officeTotals(model: OfficeDocument): OfficeTotals {
  const lines = (model.lines.length ? model.lines : [{ description: "Item", quantity: 0, price: 0, taxRate: 0 }]).map((line) => {
    const highPrice = line.priceHigh !== undefined && line.priceHigh > line.price ? line.priceHigh : line.price;
    const amount = round2(line.quantity * line.price);
    const amountHigh = round2(line.quantity * highPrice);
    const tax = model.perLineTax ? round2(amount * (1 - model.discountRate / 100) * (line.taxRate / 100)) : 0;
    return { ...line, description: line.description || "Item", amount, amountHigh, tax };
  });
  const subtotal = round2(lines.reduce((sum, line) => sum + line.amount, 0));
  const subtotalHigh = round2(lines.reduce((sum, line) => sum + line.amountHigh, 0));
  const discount = round2(subtotal * (model.discountRate / 100));
  const discountHigh = round2(subtotalHigh * (model.discountRate / 100));
  const net = round2(Math.max(0, subtotal - discount));
  const netHigh = round2(Math.max(0, subtotalHigh - discountHigh));
  const tax = model.perLineTax ? round2(lines.reduce((sum, line) => sum + line.tax, 0)) : round2(net * (model.taxRate / 100));
  const taxHigh = model.perLineTax
    ? round2(lines.reduce((sum, line) => sum + round2(line.amountHigh * (1 - model.discountRate / 100) * (line.taxRate / 100)), 0))
    : round2(netHigh * (model.taxRate / 100));
  const shipping = model.shipping ?? 0;
  const total = round2(net + tax + shipping);
  const totalHigh = round2(netHigh + taxHigh + shipping);
  return { lines, subtotal, subtotalHigh, discount, discountHigh, tax, taxHigh, shipping, total, totalHigh };
}

function moneySpan(low: number, high: number, model: OfficeDocument) {
  return high > low ? `${money(low, model)} – ${money(high, model)}` : money(low, model);
}

function money(amount: number, model: OfficeDocument) {
  const value = round2(amount);
  const code = model.currency.trim().toUpperCase();
  try {
    return new Intl.NumberFormat(model.locale || "en-US", { style: "currency", currency: code }).format(value);
  } catch {
    return `${code} ${value.toFixed(2)}`;
  }
}

function excelFormat(model: OfficeDocument) {
  try {
    const code = model.currency.trim().toUpperCase();
    const formatted = new Intl.NumberFormat(model.locale || "en-US", { style: "currency", currency: code }).format(1);
    const symbol = new Intl.NumberFormat(model.locale || "en-US", { style: "currency", currency: code, currencyDisplay: "narrowSymbol" })
      .formatToParts(1)
      .find((part) => part.type === "currency")?.value ?? code;
    const literal = symbol.replace(/"/g, "''");
    return formatted.trim().endsWith(symbol.trim()) ? `#,##0.00"${literal}"` : `"${literal}"#,##0.00`;
  } catch {
    return "#,##0.00";
  }
}

function accentHex(value: string) {
  const hex = value.trim().replace("#", "");
  return /^[0-9a-fA-F]{6}$/.test(hex) ? hex.toUpperCase() : "111827";
}

export function safeOfficeFilename(name: string, extension: "docx" | "xlsx") {
  const cleaned = name
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\.+$/g, "")
    .slice(0, 120);
  return `${cleaned || "document"}.${extension}`;
}

function madeWithLine(model: OfficeDocument) {
  return `Made with BizToolsBox ${model.madeWithUrl}`;
}

export async function buildDocxBlob(model: OfficeDocument) {
  const docx = await import("docx");
  const totals = officeTotals(model);
  const accent = accentHex(model.accent);
  const titleColor = model.template === "minimal" ? "111827" : model.template === "modern" ? accent : "FFFFFF";
  const headerFill = model.template === "classic" ? accent : model.template === "modern" ? "EFF6FF" : "FFFFFF";
  const headerColor = model.template === "classic" ? "FFFFFF" : "111827";
  const border = { style: docx.BorderStyle.SINGLE, size: 4, color: "CBD5E1" };
  const borders = { top: border, bottom: border, left: border, right: border };
  const cell = (text: string, options?: { bold?: boolean; fill?: string; color?: string; align?: (typeof docx.AlignmentType)[keyof typeof docx.AlignmentType] }) => new docx.TableCell({
    borders,
    width: { size: 20, type: docx.WidthType.PERCENTAGE },
    shading: options?.fill ? { fill: options.fill } : undefined,
    margins: { top: 60, bottom: 60, left: 80, right: 80 },
    children: [new docx.Paragraph({
      alignment: options?.align,
      children: [new docx.TextRun({ text, bold: options?.bold, color: options?.color, font: "Calibri", size: 20 })],
    })],
  });
  const party = (title: string, lines: string[]) => new docx.TableCell({
    borders,
    width: { size: 50, type: docx.WidthType.PERCENTAGE },
    margins: { top: 80, bottom: 80, left: 80, right: 80 },
    children: [
      new docx.Paragraph({ children: [new docx.TextRun({ text: title, bold: true, color: "64748B", font: "Calibri", size: 18 })] }),
      ...(lines.length ? lines : ["—"]).map((line) => new docx.Paragraph({ children: [new docx.TextRun({ text: line, font: "Calibri", size: 21 })] })),
    ],
  });
  const amountHeader = "Amount";
  const headers = model.perLineTax
    ? ["Description", model.qtyHeader, model.priceHeader, "Tax %", amountHeader]
    : ["Description", model.qtyHeader, model.priceHeader, amountHeader];
  const itemRows = totals.lines.map((line) => new docx.TableRow({
    children: [
      cell(line.description),
      cell(String(line.quantity), { align: docx.AlignmentType.RIGHT }),
      cell(moneySpan(line.price, line.priceHigh ?? line.price, model), { align: docx.AlignmentType.RIGHT }),
      ...(model.perLineTax ? [cell(String(line.taxRate), { align: docx.AlignmentType.RIGHT })] : []),
      cell(moneySpan(line.amount, line.amountHigh, model), { align: docx.AlignmentType.RIGHT }),
    ],
  }));
  const totalRows: [string, string][] = [
    ["Subtotal", moneySpan(totals.subtotal, totals.subtotalHigh, model)],
    ...(model.discountRate > 0 ? [[`Discount (${model.discountRate}%)`, `-${moneySpan(totals.discount, totals.discountHigh, model)}`] as [string, string]] : []),
    ...(totals.tax > 0 || totals.taxHigh > 0 ? [["Tax", moneySpan(totals.tax, totals.taxHigh, model)] as [string, string]] : []),
    ...(model.shipping !== null && totals.shipping > 0 ? [["Shipping", money(totals.shipping, model)] as [string, string]] : []),
    [model.totalLabel, moneySpan(totals.total, totals.totalHigh, model)],
  ];
  if (model.previouslyPaid) totalRows.push(["Previously paid", money(model.previouslyPaid, model)]);
  if (model.amountPaid !== null) {
    totalRows.push([model.paidLabel || "Amount paid", money(model.amountPaid, model)]);
    totalRows.push(["Balance", money(round2(totals.total - (model.previouslyPaid ?? 0) - model.amountPaid), model)]);
  }

  const doc = new docx.Document({
    sections: [{
      properties: { page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } } },
      children: [
        new docx.Paragraph({
          shading: model.template === "classic" ? { fill: accent } : undefined,
          border: model.template === "modern" ? { bottom: { style: docx.BorderStyle.SINGLE, size: 12, color: accent, space: 1 } } : undefined,
          spacing: { after: 200 },
          children: [new docx.TextRun({ text: model.title, bold: true, color: titleColor, font: "Calibri", size: 36 })],
        }),
        ...model.meta.map((line) => new docx.Paragraph({
          spacing: { after: 40 },
          children: [new docx.TextRun({ text: line, font: "Calibri", size: 20, color: "334155" })],
        })),
        new docx.Paragraph({ spacing: { after: 160 }, children: [new docx.TextRun({ text: `Currency: ${model.currency}`, font: "Calibri", size: 20 })] }),
        new docx.Table({
          width: { size: 100, type: docx.WidthType.PERCENTAGE },
          rows: [new docx.TableRow({ children: [party(model.fromTitle, model.fromLines), party(model.toTitle, model.toLines)] })],
        }),
        new docx.Paragraph({ spacing: { before: 200 } }),
        new docx.Table({
          width: { size: 100, type: docx.WidthType.PERCENTAGE },
          rows: [
            new docx.TableRow({
              tableHeader: true,
              children: headers.map((header) => cell(header, { bold: true, fill: headerFill, color: headerColor })),
            }),
            ...itemRows,
          ],
        }),
        new docx.Paragraph({ spacing: { before: 160 } }),
        new docx.Table({
          width: { size: 100, type: docx.WidthType.PERCENTAGE },
          rows: totalRows.map(([label, value], index) => new docx.TableRow({
            children: [
              cell(label, { bold: index === totalRows.findIndex((row) => row[0] === model.totalLabel), align: docx.AlignmentType.RIGHT }),
              cell(value, { bold: label === model.totalLabel, align: docx.AlignmentType.RIGHT }),
            ],
          })),
        }),
        ...model.notes.flatMap((note) => [
          new docx.Paragraph({
            spacing: { before: 200 },
            children: [new docx.TextRun({ text: note.title, bold: true, font: "Calibri", size: 21 })],
          }),
          new docx.Paragraph({ children: [new docx.TextRun({ text: note.text, font: "Calibri", size: 20 })] }),
        ]),
        ...(model.signature ? [
          new docx.Paragraph({
            spacing: { before: 300 },
            children: [new docx.TextRun({ text: model.signature, font: "Calibri", size: 22 })],
          }),
          new docx.Paragraph({ children: [new docx.TextRun({ text: model.signatureLabel || "Signature", font: "Calibri", size: 18, color: "64748B" })] }),
        ] : []),
        ...(model.madeWith ? [new docx.Paragraph({
          spacing: { before: 300 },
          children: [new docx.TextRun({ text: madeWithLine(model), font: "Calibri", size: 18, color: "64748B" })],
        })] : []),
      ],
    }],
  });
  return docx.Packer.toBlob(doc);
}

type FormulaCell = { formula: string; result: number };

export async function buildXlsxBlob(model: OfficeDocument) {
  const loaded = await import("exceljs");
  const excel = loaded as { Workbook?: new () => import("exceljs").Workbook; default?: { Workbook: new () => import("exceljs").Workbook } };
  const Workbook = excel.Workbook ?? excel.default?.Workbook;
  if (!Workbook) throw new Error("Excel library did not load");
  const totals = officeTotals(model);
  const format = excelFormat(model);
  const accent = `FF${accentHex(model.accent)}`;
  const workbook = new Workbook();
  const sheet = workbook.addWorksheet("Document");
  sheet.columns = [
    { width: 36 },
    { width: 16 },
    { width: 16 },
    { width: 14 },
    { width: 18 },
    { width: 16 },
  ];
  sheet.mergeCells("A1:D1");
  const title = sheet.getCell("A1");
  title.value = model.title;
  title.font = {
    bold: true,
    size: 18,
    color: { argb: model.template === "classic" ? "FFFFFFFF" : model.template === "modern" ? accent : "FF111827" },
    name: "Calibri",
  };
  if (model.template === "classic") title.fill = { type: "pattern", pattern: "solid", fgColor: { argb: accent } };
  if (model.template === "modern") sheet.getCell("A1").border = { bottom: { style: "medium", color: { argb: accent } } };
  let row = 2;
  for (const line of model.meta) {
    sheet.getCell(row, 1).value = line;
    row += 1;
  }
  sheet.getCell(row, 1).value = `Currency: ${model.currency}`;
  row += 2;
  sheet.getCell(row, 1).value = model.fromTitle;
  sheet.getCell(row, 3).value = model.toTitle;
  sheet.getCell(row, 1).font = { bold: true, color: { argb: "FF64748B" } };
  sheet.getCell(row, 3).font = { bold: true, color: { argb: "FF64748B" } };
  const fromLines = model.fromLines.length ? model.fromLines : ["—"];
  const toLines = model.toLines.length ? model.toLines : ["—"];
  const partyRows = Math.max(fromLines.length, toLines.length);
  for (let index = 0; index < partyRows; index += 1) {
    row += 1;
    if (fromLines[index]) sheet.getCell(row, 1).value = fromLines[index];
    if (toLines[index]) sheet.getCell(row, 3).value = toLines[index];
  }
  row += 2;
  const discountCell = `$B$${row}`;
  sheet.getCell(row, 1).value = "Discount %";
  sheet.getCell(row, 2).value = model.discountRate;
  row += 1;
  const taxCell = `$B$${row}`;
  sheet.getCell(row, 1).value = "Tax %";
  sheet.getCell(row, 2).value = model.perLineTax ? 0 : model.taxRate;
  row += 1;
  let shippingCell: string | null = null;
  if (model.shipping !== null) {
    shippingCell = `$B$${row}`;
    sheet.getCell(row, 1).value = "Shipping";
    sheet.getCell(row, 2).value = totals.shipping;
    sheet.getCell(row, 2).numFmt = format;
    row += 1;
  }
  row += 1;
  const ranged = !model.perLineTax && totals.lines.some((line) => line.amountHigh > line.amount);
  const headers = model.perLineTax
    ? ["Description", model.qtyHeader, model.priceHeader, "Tax %", "Amount", "Line tax"]
    : ranged
      ? ["Description", model.qtyHeader, "Low price", "High price", "Low amount", "High amount"]
      : ["Description", model.qtyHeader, model.priceHeader, "Amount"];
  headers.forEach((header, index) => {
    const cell = sheet.getCell(row, index + 1);
    cell.value = header;
    cell.font = { bold: true, color: { argb: model.template === "classic" ? "FFFFFFFF" : "FF111827" } };
    if (model.template !== "minimal") {
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: model.template === "classic" ? accent : "FFEFF6FF" } };
    }
  });
  const firstItem = row + 1;
  totals.lines.forEach((line, index) => {
    const current = firstItem + index;
    sheet.getCell(current, 1).value = line.description;
    sheet.getCell(current, 2).value = line.quantity;
    const price = sheet.getCell(current, 3);
    price.value = line.price;
    price.numFmt = format;
    if (model.perLineTax) {
      sheet.getCell(current, 4).value = line.taxRate;
      const amount = sheet.getCell(current, 5);
      amount.value = { formula: `ROUND(B${current}*C${current},2)`, result: line.amount } satisfies FormulaCell;
      amount.numFmt = format;
      const lineTax = sheet.getCell(current, 6);
      lineTax.value = { formula: `ROUND(E${current}*(1-${discountCell}/100)*(D${current}/100),2)`, result: line.tax };
      lineTax.numFmt = format;
    } else if (ranged) {
      const high = sheet.getCell(current, 4);
      high.value = line.priceHigh !== undefined && line.priceHigh > line.price ? line.priceHigh : line.price;
      high.numFmt = format;
      const lowAmount = sheet.getCell(current, 5);
      lowAmount.value = { formula: `ROUND(B${current}*C${current},2)`, result: line.amount } satisfies FormulaCell;
      lowAmount.numFmt = format;
      const highAmount = sheet.getCell(current, 6);
      highAmount.value = { formula: `ROUND(B${current}*D${current},2)`, result: line.amountHigh } satisfies FormulaCell;
      highAmount.numFmt = format;
    } else {
      const amount = sheet.getCell(current, 4);
      amount.value = { formula: `ROUND(B${current}*C${current},2)`, result: line.amount } satisfies FormulaCell;
      amount.numFmt = format;
    }
  });
  const lastItem = firstItem + totals.lines.length - 1;
  const amountColumn = model.perLineTax ? "E" : ranged ? "E" : "D";
  row = lastItem + 2;
  const subtotalRow = row;
  sheet.getCell(row, 1).value = "Subtotal";
  const subtotal = sheet.getCell(row, 2);
  subtotal.value = { formula: `ROUND(SUM(${amountColumn}${firstItem}:${amountColumn}${lastItem}),2)`, result: totals.subtotal };
  subtotal.numFmt = format;
  if (ranged) {
    const highSubtotal = sheet.getCell(row, 3);
    highSubtotal.value = { formula: `ROUND(SUM(F${firstItem}:F${lastItem}),2)`, result: totals.subtotalHigh };
    highSubtotal.numFmt = format;
  }
  row += 1;
  const discountRow = row;
  sheet.getCell(row, 1).value = "Discount";
  const discount = sheet.getCell(row, 2);
  discount.value = { formula: `ROUND(B${subtotalRow}*${discountCell}/100,2)`, result: totals.discount };
  discount.numFmt = format;
  if (ranged) {
    const highDiscount = sheet.getCell(row, 3);
    highDiscount.value = { formula: `ROUND(C${subtotalRow}*${discountCell}/100,2)`, result: totals.discountHigh };
    highDiscount.numFmt = format;
  }
  row += 1;
  const taxRow = row;
  sheet.getCell(row, 1).value = "Tax";
  const tax = sheet.getCell(row, 2);
  tax.value = model.perLineTax
    ? { formula: `ROUND(SUM(F${firstItem}:F${lastItem}),2)`, result: totals.tax }
    : { formula: `ROUND((B${subtotalRow}-B${discountRow})*${taxCell}/100,2)`, result: totals.tax };
  tax.numFmt = format;
  if (ranged) {
    const highTax = sheet.getCell(row, 3);
    highTax.value = { formula: `ROUND((C${subtotalRow}-C${discountRow})*${taxCell}/100,2)`, result: totals.taxHigh };
    highTax.numFmt = format;
  }
  row += 1;
  let shippingRow: number | null = null;
  if (shippingCell) {
    shippingRow = row;
    sheet.getCell(row, 1).value = "Shipping";
    const shipping = sheet.getCell(row, 2);
    shipping.value = { formula: shippingCell.replace(/\$/g, ""), result: totals.shipping };
    shipping.numFmt = format;
    row += 1;
  }
  const totalRow = row;
  sheet.getCell(row, 1).value = model.totalLabel;
  sheet.getCell(row, 1).font = { bold: true };
  const totalFormula = shippingRow
    ? `ROUND(B${subtotalRow}-B${discountRow}+B${taxRow}+B${shippingRow},2)`
    : `ROUND(B${subtotalRow}-B${discountRow}+B${taxRow},2)`;
  const total = sheet.getCell(row, 2);
  total.value = { formula: totalFormula, result: totals.total };
  total.numFmt = format;
  total.font = { bold: true };
  if (ranged) {
    const highTotal = sheet.getCell(row, 3);
    const highFormula = shippingRow
      ? `ROUND(C${subtotalRow}-C${discountRow}+C${taxRow}+B${shippingRow},2)`
      : `ROUND(C${subtotalRow}-C${discountRow}+C${taxRow},2)`;
    highTotal.value = { formula: highFormula, result: totals.totalHigh };
    highTotal.numFmt = format;
    highTotal.font = { bold: true };
  }
  row += 1;
  if (model.previouslyPaid !== null) {
    sheet.getCell(row, 1).value = "Previously paid";
    const prior = sheet.getCell(row, 2);
    prior.value = model.previouslyPaid;
    prior.numFmt = format;
    row += 1;
  }
  if (model.amountPaid !== null) {
    const paidRow = row;
    sheet.getCell(row, 1).value = model.paidLabel || "Amount paid";
    const paid = sheet.getCell(row, 2);
    paid.value = model.amountPaid;
    paid.numFmt = format;
    row += 1;
    sheet.getCell(row, 1).value = "Balance";
    const balance = sheet.getCell(row, 2);
    const priorRef = model.previouslyPaid !== null ? `B${paidRow - 1}` : "0";
    balance.value = {
      formula: `ROUND(B${totalRow}-${priorRef}-B${paidRow},2)`,
      result: round2(totals.total - (model.previouslyPaid ?? 0) - model.amountPaid),
    };
    balance.numFmt = format;
    row += 1;
  }
  row += 1;
  for (const note of model.notes) {
    sheet.getCell(row, 1).value = note.title;
    sheet.getCell(row, 1).font = { bold: true };
    row += 1;
    sheet.getCell(row, 1).value = note.text;
    row += 2;
  }
  if (model.signature) {
    sheet.getCell(row, 1).value = model.signature;
    row += 1;
    sheet.getCell(row, 1).value = model.signatureLabel || "Signature";
    row += 2;
  }
  if (model.madeWith) sheet.getCell(row, 1).value = madeWithLine(model);
  const buffer = await workbook.xlsx.writeBuffer();
  return new Blob([buffer], { type: XLSX_MIME });
}

export async function downloadOfficeDocument(format: "docx" | "xlsx", model: OfficeDocument) {
  const blob = format === "docx" ? await buildDocxBlob(model) : await buildXlsxBlob(model);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = safeOfficeFilename(model.filename, format);
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
