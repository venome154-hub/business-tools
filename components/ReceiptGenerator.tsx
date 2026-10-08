"use client";

import { useMemo, useState } from "react";
import { jsPDF } from "jspdf";

type Item = { description: string; quantity: number; price: number };

const today = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

const money = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);

export default function ReceiptGenerator() {
  const [company, setCompany] = useState("Your Company");
  const [client, setClient] = useState("Client Name");
  const [receiptNo, setReceiptNo] = useState("RCP-001");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate] = useState(today);
  const [method, setMethod] = useState("Bank transfer");
  const [reference, setReference] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [receivedInput, setReceivedInput] = useState("");
  const [items, setItems] = useState<Item[]>([{ description: "Service payment", quantity: 1, price: 100 }]);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.quantity * item.price, 0), [items]);
  const received = receivedInput === "" ? subtotal : Math.max(0, Number(receivedInput) || 0);
  const balance = Math.max(0, subtotal - received);
  const overpayment = Math.max(0, received - subtotal);

  function updateItem(index: number, field: keyof Item, value: string) {
    setItems(current => current.map((item, i) => i === index
      ? { ...item, [field]: field === "description" ? value : Math.max(0, Number(value) || 0) }
      : item));
  }

  function downloadPDF() {
    const doc = new jsPDF();
    doc.setFontSize(24);
    doc.text("PAYMENT RECEIPT", 20, 25);
    doc.setFontSize(11);
    doc.text(company.slice(0, 75), 20, 37);
    doc.text(`Receipt: ${receiptNo}`.slice(0, 70), 140, 37);
    doc.text(`Date received: ${date}`, 140, 44);
    doc.text(`Received from: ${client}`.slice(0, 90), 20, 54);
    if (invoiceNo.trim()) doc.text(`Related invoice: ${invoiceNo}`.slice(0, 85), 20, 61);
    doc.text(`Payment method: ${method}`.slice(0, 80), 20, invoiceNo.trim() ? 68 : 61);
    if (reference.trim()) doc.text(`Payment reference: ${reference}`.slice(0, 90), 20, invoiceNo.trim() ? 75 : 68);

    let y = 91;
    doc.setFont("helvetica", "bold");
    doc.text("Description", 20, y);
    doc.text("Qty", 120, y);
    doc.text("Amount", 175, y);
    doc.setFont("helvetica", "normal");
    for (const item of items) {
      y += 9;
      if (y > 260) { doc.addPage(); y = 25; }
      doc.text((item.description || "Item").slice(0, 42), 20, y);
      doc.text(String(item.quantity), 120, y);
      doc.text(money(item.quantity * item.price, currency), 175, y);
    }
    y += 15;
    if (y > 265) { doc.addPage(); y = 25; }
    doc.setFont("helvetica", "bold");
    doc.text(`Amount received: ${money(received, currency)}`, 120, y);
    doc.setFont("helvetica", "normal");
    if (balance > 0) doc.text(`Balance remaining: ${money(balance, currency)}`, 120, y + 8);
    if (overpayment > 0) doc.text(`Amount above listed total: ${money(overpayment, currency)}`, 120, y + 8);
    doc.setFontSize(9);
    doc.text("This receipt records a payment reported as received by the business. It does not process or verify payment.", 20, 280);
    doc.save(`${receiptNo || "receipt"}.pdf`);
  }

  return (
    <section className="invoice-layout">
      <div className="editor">
        <div className="heading">
          <div>
            <span className="badge">100% FREE</span>
            <h1>Receipt Generator</h1>
            <p>Record a payment you have received and download a clear receipt PDF.</p>
          </div>
          <button className="download" onClick={downloadPDF}>Download PDF</button>
        </div>

        <div className="grid two">
          <label>Business name<input value={company} onChange={e => setCompany(e.target.value)} /></label>
          <label>Received from<input value={client} onChange={e => setClient(e.target.value)} /></label>
          <label>Receipt number<input value={receiptNo} onChange={e => setReceiptNo(e.target.value)} /></label>
          <label>Date received<input type="date" value={date} onChange={e => setDate(e.target.value)} /></label>
          <label>Related invoice (optional)<input value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} placeholder="e.g. INV-104" /></label>
          <label>Currency<select value={currency} onChange={e => setCurrency(e.target.value)}><option>USD</option><option>EUR</option><option>GBP</option><option>CAD</option><option>AUD</option></select></label>
          <label>Payment method<select value={method} onChange={e => setMethod(e.target.value)}><option>Bank transfer</option><option>Cash</option><option>Card</option><option>PayPal</option><option>Check</option><option>Other</option></select></label>
          <label>Payment reference (optional)<input value={reference} onChange={e => setReference(e.target.value)} placeholder="Transaction or check number" /></label>
        </div>

        <h2>Payment for</h2>
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
        <div className="grid totals-inputs">
          <label>Amount received<input type="number" min="0" step="0.01" value={receivedInput} placeholder={subtotal.toFixed(2)} onChange={e => setReceivedInput(e.target.value)} /></label>
        </div>
        <p className="quote-note">Leave amount received blank to record the full listed amount. This tool creates a document only; it does not take or verify payments.</p>
      </div>

      <aside className="preview">
        <div className="paper">
          <div className="paper-top"><strong>PAYMENT RECEIPT</strong><span>{receiptNo}</span></div>
          <div className="paper-meta"><div><b>{company}</b></div><div>Received from: {client}</div><div>Date received: {date}</div>{invoiceNo && <div>Invoice: {invoiceNo}</div>}<div>Payment method: {method}</div>{reference && <div>Reference: {reference}</div>}</div>
          <hr />
          {items.map((item, i) => <div className="paper-row" key={i}><span>{item.description} × {item.quantity}</span><b>{money(item.quantity * item.price, currency)}</b></div>)}
          <div className="summary">
            <div>Listed total <span>{money(subtotal, currency)}</span></div>
            <div className="grand">Amount received <span>{money(received, currency)}</span></div>
            {balance > 0 && <div>Balance remaining <span>{money(balance, currency)}</span></div>}
            {overpayment > 0 && <div>Above listed total <span>{money(overpayment, currency)}</span></div>}
          </div>
          <p className="quote-paper-note">Payment receipt · Records payment reported as received</p>
        </div>
      </aside>
    </section>
  );
}
