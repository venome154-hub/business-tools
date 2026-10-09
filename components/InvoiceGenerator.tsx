"use client";

import { useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import { trackEvent } from "@/lib/analytics";

type Item = { description: string; quantity: number; price: number };

const money = (n: number, currency: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);

function localDate() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

function displayDate(value: string) {
  if (!value) return "";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

export default function InvoiceGenerator() {
  const [company, setCompany] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [client, setClient] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("INV-001");
  const [date, setDate] = useState(localDate);
  const [dueDate, setDueDate] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [paymentInfo, setPaymentInfo] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<Item[]>([
    { description: "Service", quantity: 1, price: 100 },
  ]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [items],
  );
  const discountAmount = subtotal * (discount / 100);
  const taxable = Math.max(0, subtotal - discountAmount);
  const taxAmount = taxable * (tax / 100);
  const total = taxable + taxAmount;

  function updateItem(index: number, field: keyof Item, value: string) {
    setItems(current => current.map((item, i) => {
      if (i !== index) return item;
      if (field === "description") return { ...item, description: value };
      const numericValue = Number(value);
      return { ...item, [field]: Number.isFinite(numericValue) ? Math.max(0, numericValue) : 0 };
    }));
  }

  function downloadPDF() {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const left = 18;
    const right = pageWidth - 18;
    const descriptionWidth = 98;
    let y = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("INVOICE", left, y);
    doc.setFontSize(10);
    doc.text(`Invoice #: ${invoiceNo || "—"}`, right, y - 2, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.text(`Issue date: ${displayDate(date) || "—"}`, right, y + 5, { align: "right" });
    if (dueDate) doc.text(`Due date: ${displayDate(dueDate)}`, right, y + 11, { align: "right" });

    y += 18;
    doc.setFont("helvetica", "bold");
    doc.text("FROM", left, y);
    doc.text("BILL TO", 112, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    y += 6;
    const supplierLines = [company, ...companyAddress.split(/\r?\n/), companyEmail].filter(Boolean);
    const clientLines = [client, ...clientAddress.split(/\r?\n/), clientEmail].filter(Boolean);
    const supplierWrapped = supplierLines.flatMap(line => doc.splitTextToSize(line, 78));
    const clientWrapped = clientLines.flatMap(line => doc.splitTextToSize(line, 78));
    supplierWrapped.forEach((line: string, index: number) => doc.text(line, left, y + index * 5));
    clientWrapped.forEach((line: string, index: number) => doc.text(line, 112, y + index * 5));
    y += Math.max(supplierWrapped.length, clientWrapped.length, 1) * 5 + 12;

    const drawTableHeader = () => {
      doc.setFillColor(241, 245, 249);
      doc.rect(left, y - 5, right - left, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.text("Description", left + 2, y + 1);
      doc.text("Qty", 132, y + 1, { align: "right" });
      doc.text("Price", 158, y + 1, { align: "right" });
      doc.text("Amount", right - 2, y + 1, { align: "right" });
      doc.setFont("helvetica", "normal");
      y += 12;
    };

    drawTableHeader();
    for (const item of items) {
      const descriptionLines: string[] = doc.splitTextToSize(item.description || "—", descriptionWidth);
      const rowHeight = Math.max(descriptionLines.length * 5, 7) + 4;
      if (y + rowHeight > pageHeight - 35) {
        doc.addPage();
        y = 20;
        drawTableHeader();
      }
      descriptionLines.forEach((line, index) => doc.text(line, left + 2, y + index * 5));
      doc.text(String(item.quantity), 132, y, { align: "right" });
      doc.text(money(item.price, currency), 158, y, { align: "right" });
      doc.text(money(item.quantity * item.price, currency), right - 2, y, { align: "right" });
      y += rowHeight;
      doc.setDrawColor(226, 232, 240);
      doc.line(left, y - 2, right, y - 2);
    }

    y += 5;
    if (y > pageHeight - 60) {
      doc.addPage();
      y = 22;
    }
    const drawTotal = (label: string, value: string, bold = false) => {
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.text(label, 125, y);
      doc.text(value, right - 2, y, { align: "right" });
      y += 7;
    };
    drawTotal("Subtotal", money(subtotal, currency));
    if (discount > 0) drawTotal(`Discount (${discount}%)`, `-${money(discountAmount, currency)}`);
    if (tax > 0) drawTotal(`Tax (${tax}%)`, money(taxAmount, currency));
    y += 1;
    doc.setDrawColor(15, 23, 42);
    doc.line(125, y - 3, right, y - 3);
    drawTotal("TOTAL DUE", money(total, currency), true);

    const addSection = (title: string, value: string) => {
      if (!value.trim()) return;
      const lines: string[] = doc.splitTextToSize(value.trim(), right - left);
      const required = 7 + lines.length * 5;
      if (y + required > pageHeight - 18) {
        doc.addPage();
        y = 22;
      }
      y += 5;
      doc.setFont("helvetica", "bold");
      doc.text(title, left, y);
      doc.setFont("helvetica", "normal");
      y += 6;
      lines.forEach((line, index) => doc.text(line, left, y + index * 5));
      y += lines.length * 5;
    };
    addSection("Payment instructions", paymentInfo);
    addSection("Notes", notes);

    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text("Thank you for your business.", left, Math.min(y + 8, pageHeight - 10));
    doc.save(`${invoiceNo || "invoice"}.pdf`);
    trackEvent("document_download", { tool_name: "invoice" });
  }

  return (
    <section className="invoice-layout">
      <div className="editor">
        <div className="heading">
          <div>
            <span className="badge">100% FREE</span>
            <h1>Invoice Generator</h1>
            <p>Create a detailed PDF invoice. Your entries stay in this browser.</p>
          </div>
          <button className="download" onClick={downloadPDF}>Download PDF</button>
        </div>

        <h2>Your business</h2>
        <div className="grid two">
          <label>Business or name<input value={company} onChange={e => setCompany(e.target.value)} /></label>
          <label>Business email (optional)<input type="email" value={companyEmail} onChange={e => setCompanyEmail(e.target.value)} /></label>
          <label className="full-field">Business address (optional)<textarea rows={2} value={companyAddress} onChange={e => setCompanyAddress(e.target.value)} /></label>
        </div>

        <h2>Client</h2>
        <div className="grid two">
          <label>Client or business name<input value={client} onChange={e => setClient(e.target.value)} /></label>
          <label>Client email (optional)<input type="email" value={clientEmail} onChange={e => setClientEmail(e.target.value)} /></label>
          <label className="full-field">Client address (optional)<textarea rows={2} value={clientAddress} onChange={e => setClientAddress(e.target.value)} /></label>
        </div>

        <h2>Invoice details</h2>
        <div className="grid two">
          <label>Invoice number<input value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} /></label>
          <label>Issue date<input type="date" value={date} onChange={e => setDate(e.target.value)} /></label>
          <label>Due date (optional)<input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} /></label>
          <label>Currency
            <select value={currency} onChange={e => setCurrency(e.target.value)}>
              <option>USD</option><option>EUR</option><option>GBP</option><option>CAD</option><option>AUD</option>
            </select>
          </label>
        </div>

        <h2>Products or services</h2>
        <div className="items">
          {items.map((item, i) => (
            <div className="item" key={i}>
              <input aria-label={`Description for item ${i + 1}`} value={item.description} onChange={e => updateItem(i, "description", e.target.value)} />
              <input aria-label={`Quantity for item ${i + 1}`} type="number" min="0" step="any" value={item.quantity} onChange={e => updateItem(i, "quantity", e.target.value)} />
              <input aria-label={`Price for item ${i + 1}`} type="number" min="0" step="0.01" value={item.price} onChange={e => updateItem(i, "price", e.target.value)} />
              <button className="icon" onClick={() => setItems(current => current.filter((_, index) => index !== i))} aria-label="Remove item">×</button>
            </div>
          ))}
        </div>
        <button className="secondary" onClick={() => setItems(current => [...current, { description: "New item", quantity: 1, price: 0 }])}>+ Add item</button>

        <div className="grid two totals-inputs">
          <label>Tax %<input type="number" min="0" value={tax} onChange={e => setTax(Math.max(0, Number(e.target.value) || 0))} /></label>
          <label>Discount %<input type="number" min="0" max="100" value={discount} onChange={e => setDiscount(Math.min(100, Math.max(0, Number(e.target.value) || 0)))} /></label>
        </div>
        <div className="grid two invoice-extra">
          <label className="full-field">Payment instructions (optional)<textarea rows={3} placeholder="Bank transfer, payment link, or other agreed method" value={paymentInfo} onChange={e => setPaymentInfo(e.target.value)} /></label>
          <label className="full-field">Notes (optional)<textarea rows={3} placeholder="Thank-you note or additional details" value={notes} onChange={e => setNotes(e.target.value)} /></label>
        </div>
      </div>

      <aside className="preview">
        <div className="paper">
          <div className="paper-top"><strong>INVOICE</strong><span>{invoiceNo || "—"}</span></div>
          <div className="paper-meta">
            <div><b>{company || "Your business"}</b></div>
            {companyAddress && <div className="pre-line">{companyAddress}</div>}
            {companyEmail && <div>{companyEmail}</div>}
            <div className="invoice-preview-client"><b>Bill to</b><br />{client || "Client"}</div>
            {clientAddress && <div className="pre-line">{clientAddress}</div>}
            {clientEmail && <div>{clientEmail}</div>}
            <div>Issued: {displayDate(date) || "—"}</div>
            {dueDate && <div>Due: {displayDate(dueDate)}</div>}
          </div>
          <hr />
          {items.map((item, i) => (
            <div className="paper-row" key={i}><span>{item.description || "Item"} × {item.quantity}</span><b>{money(item.quantity * item.price, currency)}</b></div>
          ))}
          <div className="summary">
            <div>Subtotal <span>{money(subtotal, currency)}</span></div>
            {discount > 0 && <div>Discount ({discount}%) <span>-{money(discountAmount, currency)}</span></div>}
            {tax > 0 && <div>Tax ({tax}%) <span>{money(taxAmount, currency)}</span></div>}
            <div className="grand">Total due <span>{money(total, currency)}</span></div>
          </div>
          {paymentInfo && <div className="invoice-preview-extra"><b>Payment instructions</b><p>{paymentInfo}</p></div>}
          {notes && <div className="invoice-preview-extra"><b>Notes</b><p>{notes}</p></div>}
        </div>
      </aside>
    </section>
  );
}
