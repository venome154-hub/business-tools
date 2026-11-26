import assert from "node:assert/strict";
import { inflateRawSync } from "node:zlib";
import test from "node:test";
import ExcelJS from "exceljs";
import { buildDocxBlob, buildXlsxBlob, DOCX_MIME, officeTotals, XLSX_MIME, type OfficeDocument } from "../lib/office-export.ts";

const sample: OfficeDocument = {
  filename: "INV-001",
  title: "INVOICE",
  template: "classic",
  accent: "#111827",
  currency: "USD",
  locale: "en-US",
  meta: ["Invoice number: INV-001", "Date: Nov 26, 2026"],
  fromTitle: "From",
  fromLines: ["Northwind Studio"],
  toTitle: "Bill to",
  toLines: ["Sample Client"],
  qtyHeader: "Qty",
  priceHeader: "Price",
  lines: [
    { description: "Design work", quantity: 2, price: 50, taxRate: 0 },
    { description: "Hosting", quantity: 1, price: 20, taxRate: 0 },
  ],
  perLineTax: false,
  discountRate: 10,
  taxRate: 20,
  shipping: 5,
  previouslyPaid: null,
  amountPaid: null,
  paidLabel: "Amount paid",
  totalLabel: "Total",
  notes: [{ title: "Notes", text: "Thank you" }],
  signature: "",
  signatureLabel: "Signature",
  madeWith: true,
  madeWithUrl: "https://www.biztoolsbox.online",
};

function zipText(data: Buffer, name: string) {
  let offset = 0;
  while (offset + 30 <= data.length && data.readUInt32LE(offset) === 0x04034b50) {
    const flags = data.readUInt16LE(offset + 6);
    const method = data.readUInt16LE(offset + 8);
    let compSize = data.readUInt32LE(offset + 18);
    const nameLen = data.readUInt16LE(offset + 26);
    const extraLen = data.readUInt16LE(offset + 28);
    const filename = data.subarray(offset + 30, offset + 30 + nameLen).toString();
    const start = offset + 30 + nameLen + extraLen;
    if (flags & 0x08 && compSize === 0) {
      const marker = data.indexOf(Buffer.from([0x50, 0x4b, 0x07, 0x08]), start);
      compSize = marker === -1 ? data.length - start : marker - start;
    }
    const compressed = data.subarray(start, start + compSize);
    if (filename === name) {
      const raw = method === 0 ? compressed : inflateRawSync(compressed);
      return raw.toString("utf8");
    }
    offset = start + compSize + (flags & 0x08 ? 16 : 0);
  }
  throw new Error(`missing ${name}`);
}

test("office totals include line amounts, tax, and shipping", () => {
  const totals = officeTotals(sample);
  assert.equal(totals.subtotal, 120);
  assert.equal(totals.discount, 12);
  assert.equal(totals.tax, 21.6);
  assert.equal(totals.total, 134.6);
  assert.deepEqual(totals.lines.map((line) => line.description), ["Design work", "Hosting"]);
});

test("docx and xlsx blobs are non-empty, typed, and contain the lines and total", async () => {
  const docx = await buildDocxBlob(sample);
  const xlsx = await buildXlsxBlob(sample);
  assert.ok(docx.size > 1000);
  assert.ok(xlsx.size > 1000);
  assert.equal(docx.type, DOCX_MIME);
  assert.equal(xlsx.type, XLSX_MIME);

  const xml = zipText(Buffer.from(await docx.arrayBuffer()), "word/document.xml");
  assert.match(xml, /Design work/);
  assert.match(xml, /Hosting/);
  assert.match(xml, /\$134\.60/);
  assert.match(xml, /Made with BizToolsBox https:\/\/www\.biztoolsbox\.online/);

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(Buffer.from(await xlsx.arrayBuffer()));
  const sheet = workbook.getWorksheet("Document");
  assert.ok(sheet);
  const descriptions = sheet.getColumn(1).values.flatMap((value) => typeof value === "string" ? [value] : []);
  assert.ok(descriptions.includes("Design work"));
  assert.ok(descriptions.includes("Hosting"));
  const amount = sheet.getColumn(4).values.flatMap((value) => value && typeof value === "object" && "formula" in value ? [value as { formula: string; result: number }] : []).find((cell) => cell.formula.includes("*"));
  assert.match(amount?.formula ?? "", /^ROUND\(B\d+\*C\d+,2\)$/);
  assert.equal(amount?.result, 100);
  const formulas = sheet.getColumn(2).values.flatMap((value) => value && typeof value === "object" && "formula" in value && typeof (value as { formula?: unknown }).formula === "string" ? [value as { formula: string; result: number }] : []);
  assert.ok(formulas.some((cell) => cell.formula.startsWith("ROUND(SUM(D")));
  const total = formulas.find((cell) => cell.result === 134.6);
  assert.ok(total, formulas.map((cell) => `${cell.formula}=${cell.result}`).join("; "));
  assert.match(total.formula, /ROUND\(/);
  assert.equal(descriptions.find((value) => value.startsWith("Made with BizToolsBox")), "Made with BizToolsBox https://www.biztoolsbox.online");
});

test("export does not call fetch", async () => {
  const calls: unknown[] = [];
  const original = globalThis.fetch;
  globalThis.fetch = ((...args: unknown[]) => {
    calls.push(args);
    return Promise.reject(new Error("fetch should not run during export"));
  }) as typeof fetch;
  try {
    await buildDocxBlob(sample);
    await buildXlsxBlob(sample);
    assert.equal(calls.length, 0);
  } finally {
    globalThis.fetch = original;
  }
});
