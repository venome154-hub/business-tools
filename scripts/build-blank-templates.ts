import { mkdir, writeFile } from "node:fs/promises";
import { jsPDF } from "jspdf";
import { buildDocxBlob, buildXlsxBlob, type OfficeDocument } from "../lib/office-export.ts";

type Kind = {
  id: "invoice" | "quote" | "receipt";
  title: string;
  from: string;
  to: string;
  price: string;
  note: string;
  shipping: number | null;
  pdfNote: string;
};

const kinds: Kind[] = [
  { id: "invoice", title: "Invoice", from: "From", to: "Bill to", price: "Price", note: "Replace this note with payment details.", shipping: 0, pdfNote: "" },
  { id: "quote", title: "Quote", from: "From", to: "Prepared for", price: "Price", note: "Replace this note with the scope of work.", shipping: null, pdfNote: "An estimate for approval, not a request for payment." },
  { id: "receipt", title: "Receipt", from: "Received by", to: "Received from", price: "Unit amount", note: "Replace this note with the payment method and reference.", shipping: 0, pdfNote: "Records a payment you report as received." },
];

function model(kind: Kind): OfficeDocument {
  return {
    filename: kind.id,
    title: kind.title,
    template: "classic",
    accent: "#111827",
    currency: "USD",
    locale: "en-US",
    meta: ["Number:", "Date:"],
    fromTitle: kind.from,
    fromLines: ["Your business name", "Email", "Address"],
    toTitle: kind.to,
    toLines: ["Client name", "Email", "Address"],
    qtyHeader: "Qty",
    priceHeader: kind.price,
    lines: [
      { description: "Description", quantity: 1, price: 0, taxRate: 0 },
      { description: "Description", quantity: 1, price: 0, taxRate: 0 },
      { description: "Description", quantity: 1, price: 0, taxRate: 0 },
    ],
    perLineTax: false,
    discountRate: 0,
    taxRate: 0,
    shipping: kind.shipping,
    previouslyPaid: null,
    amountPaid: null,
    paidLabel: kind.id === "receipt" ? "Amount received" : "Amount paid",
    totalLabel: "Total",
    notes: [{ title: "Notes", text: kind.note }],
    signature: "",
    signatureLabel: "Signature",
    madeWith: true,
    madeWithUrl: "https://www.biztoolsbox.online",
  };
}

function pdfBytes(kind: Kind) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.setFillColor(17, 24, 39);
  doc.rect(0, 0, 210, 24, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(kind.title, 14, 15);
  doc.setTextColor(17, 24, 39);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  if (kind.pdfNote) doc.text(kind.pdfNote, 14, 32);
  const top = kind.pdfNote ? 42 : 36;
  doc.setFont("helvetica", "bold");
  doc.text(kind.from, 14, top);
  doc.text(kind.to, 110, top);
  doc.setFont("helvetica", "normal");
  for (const [index, line] of ["Your business name", "Email", "Address"].entries()) {
    doc.text(line, 14, top + 6 + index * 5);
    doc.text(index === 0 ? "Client name" : line, 110, top + 6 + index * 5);
  }
  doc.text("Number", 14, top + 28);
  doc.text("Date", 14, top + 34);
  doc.text("Currency: USD", 14, top + 40);
  const table = top + 48;
  doc.setFillColor(17, 24, 39);
  doc.rect(14, table, 182, 8, "F");
  doc.setTextColor(255, 255, 255);
  const columns = kind.id === "receipt" ? { qty: 108, price: 128, amount: 172 } : { qty: 120, price: 145, amount: 175 };
  doc.text("Description", 16, table + 5);
  doc.text("Qty", columns.qty, table + 5);
  doc.text(kind.price, columns.price, table + 5);
  doc.text("Amount", columns.amount, table + 5);
  doc.setTextColor(17, 24, 39);
  for (let row = 0; row < 4; row += 1) {
    const y = table + 14 + row * 8;
    doc.text("Description", 16, y);
    doc.text("1", columns.qty, y);
    doc.text("0.00", columns.price, y);
    doc.text("0.00", columns.amount, y);
  }
  const totals = table + 50;
  doc.text("Subtotal", 145, totals);
  doc.text("0.00", 175, totals);
  doc.text("Tax", 145, totals + 6);
  doc.text("0.00", 175, totals + 6);
  doc.setFont("helvetica", "bold");
  doc.text("Total", 145, totals + 14);
  doc.text("0.00", 175, totals + 14);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Notes: ${kind.note}`, 14, totals + 28);
  doc.setTextColor(100, 116, 139);
  doc.text("Made with BizToolsBox https://www.biztoolsbox.online", 14, 280);
  return Buffer.from(doc.output("arraybuffer"));
}

const dir = "public/templates";
await mkdir(dir, { recursive: true });
for (const kind of kinds) {
  const docx = await buildDocxBlob(model(kind));
  const xlsx = await buildXlsxBlob(model(kind));
  await writeFile(`${dir}/${kind.id}-blank.docx`, Buffer.from(await docx.arrayBuffer()));
  await writeFile(`${dir}/${kind.id}-blank.xlsx`, Buffer.from(await xlsx.arrayBuffer()));
  await writeFile(`${dir}/${kind.id}-blank.pdf`, pdfBytes(kind));
}
