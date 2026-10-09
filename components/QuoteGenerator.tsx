"use client";

import { useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import { trackEvent } from "@/lib/analytics";

type Item = { description: string; quantity: number; price: number };

const money = (n: number, currency: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);

export default function QuoteGenerator() {
  const [company, setCompany] = useState("Your Company");
  const [client, setClient] = useState("Client Name");
  const [quoteNo, setQuoteNo] = useState("QUO-001");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [validUntil, setValidUntil] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
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
    setItems(current => current.map((item, i) => i === index
      ? { ...item, [field]: field === "description" ? value : Math.max(0, Number(value) || 0) }
      : item));
  }

  function downloadPDF() {
    const doc = new jsPDF();
    doc.setFontSize(24);
    doc.text("QUOTE", 20, 25);
    doc.setFontSize(11);
    doc.text(company.slice(0, 70), 20, 36);
    doc.text(`Quote: ${quoteNo}`.slice(0, 60), 140, 36);
    doc.text(`Date: ${date}`, 140, 43);
    if (validUntil) doc.text(`Valid until: ${validUntil}`, 140, 50);
    doc.text(`Prepared for: ${client}`.slice(0, 80), 20, 56);

    let y = 78;
    doc.setFont("helvetica", "bold");
    doc.text("Description", 20, y);
    doc.text("Qty", 120, y);
    doc.text("Price", 145, y);
    doc.text("Amount", 175, y);
    doc.setFont("helvetica", "normal");

    for (const item of items) {
      y += 9;
      if (y > 255) {
        doc.addPage();
        y = 25;
      }
      doc.text(item.description.slice(0, 38), 20, y);
      doc.text(String(item.quantity), 120, y);
      doc.text(money(item.price, currency), 145, y);
      doc.text(money(item.quantity * item.price, currency), 175, y);
    }

    y += 14;
    if (y > 265) {
      doc.addPage();
      y = 25;
    }
    doc.text(`Subtotal: ${money(subtotal, currency)}`, 125, y);
    if (discount) {
      y += 7;
      doc.text(`Discount (${discount}%): -${money(discountAmount, currency)}`, 125, y);
    }
    if (tax) {
      y += 7;
      doc.text(`Tax (${tax}%): ${money(taxAmount, currency)}`, 125, y);
    }
    doc.setFont("helvetica", "bold");
    doc.text(`Estimated total: ${money(total, currency)}`, 125, y + 10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("This quote is an estimate and is not an invoice.", 20, 280);
    doc.save(`${quoteNo || "quote"}.pdf`);
    trackEvent("document_download", { tool_name: "quote" });
  }

  return (
    <section className="invoice-layout">
      <div className="editor">
        <div className="heading">
          <div>
            <span className="badge">100% FREE</span>
            <h1>Quote Generator</h1>
            <p>Create a clear project estimate and download it as a PDF. No signup.</p>
          </div>
          <button className="download" onClick={downloadPDF}>Download PDF</button>
        </div>

        <div className="grid two">
          <label>Business name<input value={company} onChange={e => setCompany(e.target.value)} /></label>
          <label>Prepared for<input value={client} onChange={e => setClient(e.target.value)} /></label>
          <label>Quote number<input value={quoteNo} onChange={e => setQuoteNo(e.target.value)} /></label>
          <label>Date<input type="date" value={date} onChange={e => setDate(e.target.value)} /></label>
          <label>Valid until (optional)<input type="date" value={validUntil} onChange={e => setValidUntil(e.target.value)} /></label>
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
              <input aria-label={`Quantity for item ${i + 1}`} type="number" min="0" value={item.quantity} onChange={e => updateItem(i, "quantity", e.target.value)} />
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
        <p className="quote-note">A quote is an estimate for approval. It does not request payment like an invoice.</p>
      </div>

      <aside className="preview">
        <div className="paper">
          <div className="paper-top"><strong>QUOTE</strong><span>{quoteNo}</span></div>
          <div className="paper-meta"><div><b>{company}</b></div><div>Prepared for: {client}</div><div>Date: {date}</div>{validUntil && <div>Valid until: {validUntil}</div>}</div>
          <hr />
          {items.map((item, i) => (
            <div className="paper-row" key={i}><span>{item.description} × {item.quantity}</span><b>{money(item.quantity * item.price, currency)}</b></div>
          ))}
          <div className="summary">
            <div>Subtotal <span>{money(subtotal, currency)}</span></div>
            {discount > 0 && <div>Discount ({discount}%) <span>-{money(discountAmount, currency)}</span></div>}
            {tax > 0 && <div>Tax ({tax}%) <span>{money(taxAmount, currency)}</span></div>}
            <div className="grand">Estimated total <span>{money(total, currency)}</span></div>
          </div>
          <p className="quote-paper-note">Estimate only · Not an invoice</p>
        </div>
      </aside>
    </section>
  );
}
