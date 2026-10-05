 "use client";

import { useMemo, useState } from "react";
import { jsPDF } from "jspdf";

type Item = { description: string; quantity: number; price: number };

const money = (n: number, currency: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);

export default function InvoiceGenerator() {
  const [company, setCompany] = useState("Your Company");
  const [client, setClient] = useState("Client Name");
  const [invoiceNo, setInvoiceNo] = useState("INV-001");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [currency, setCurrency] = useState("USD");
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [items, setItems] = useState<Item[]>([
    { description: "Service", quantity: 1, price: 100 }
  ]);

  const subtotal = useMemo(
    () => items.reduce((sum, x) => sum + x.quantity * x.price, 0),
    [items]
  );
  const discountAmount = subtotal * (discount / 100);
  const taxable = Math.max(0, subtotal - discountAmount);
  const taxAmount = taxable * (tax / 100);
  const total = taxable + taxAmount;

  function updateItem(index: number, field: keyof Item, value: string) {
    setItems(prev => prev.map((item, i) =>
      i === index
        ? { ...item, [field]: field === "description" ? value : Number(value) }
        : item
    ));
  }

  function addItem() {
    setItems(prev => [...prev, { description: "New item", quantity: 1, price: 0 }]);
  }

  function removeItem(index: number) {
    setItems(prev => prev.filter((_, i) => i !== index));
  }

  function downloadPDF() {
    const doc = new jsPDF();
    doc.setFontSize(24);
    doc.text("INVOICE", 20, 25);
    doc.setFontSize(11);
    doc.text(company, 20, 35);
    doc.text(`Invoice: ${invoiceNo}`, 140, 35);
    doc.text(`Date: ${date}`, 140, 42);
    doc.text(`Bill to: ${client}`, 20, 52);

    let y = 70;
    doc.setFont("helvetica", "bold");
    doc.text("Description", 20, y);
    doc.text("Qty", 120, y);
    doc.text("Price", 145, y);
    doc.text("Amount", 175, y);
    doc.setFont("helvetica", "normal");

    y += 9;
    items.forEach(item => {
      doc.text(item.description.slice(0, 38), 20, y);
      doc.text(String(item.quantity), 120, y);
      doc.text(money(item.price, currency), 145, y);
      doc.text(money(item.quantity * item.price, currency), 175, y);
      y += 8;
    });

    y += 8;
    doc.text(`Subtotal: ${money(subtotal, currency)}`, 125, y);
    y += 7;
    if (discount) {
      doc.text(`Discount: -${money(discountAmount, currency)}`, 125, y);
      y += 7;
    }
    if (tax) {
      doc.text(`Tax: ${money(taxAmount, currency)}`, 125, y);
      y += 7;
    }
    doc.setFont("helvetica", "bold");
    doc.text(`Total: ${money(total, currency)}`, 125, y + 3);
    doc.save(`${invoiceNo || "invoice"}.pdf`);
  }

  return (
    <section className="invoice-layout">
      <div className="editor">
        <div className="heading">
          <div>
            <span className="badge">100% FREE</span>
            <h1>Invoice Generator</h1>
            <p>Create a professional PDF invoice in seconds. No signup.</p>
          </div>
          <button className="download" onClick={downloadPDF}>Download PDF</button>
        </div>

        <div className="grid two">
          <label>Company<input value={company} onChange={e => setCompany(e.target.value)} /></label>
          <label>Bill to<input value={client} onChange={e => setClient(e.target.value)} /></label>
          <label>Invoice number<input value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} /></label>
          <label>Date<input type="date" value={date} onChange={e => setDate(e.target.value)} /></label>
          <label>Currency
            <select value={currency} onChange={e => setCurrency(e.target.value)}>
              <option>USD</option><option>EUR</option><option>GBP</option><option>CAD</option><option>AUD</option>
            </select>
          </label>
        </div>

        <h2>Items</h2>
        <div className="items">
          {items.map((item, i) => (
            <div className="item" key={i}>
              <input value={item.description} onChange={e => updateItem(i, "description", e.target.value)} />
              <input type="number" min="0" value={item.quantity} onChange={e => updateItem(i, "quantity", e.target.value)} />
              <input type="number" min="0" step="0.01" value={item.price} onChange={e => updateItem(i, "price", e.target.value)} />
              <button className="icon" onClick={() => removeItem(i)} aria-label="Remove item">×</button>
            </div>
          ))}
        </div>
        <button className="secondary" onClick={addItem}>+ Add item</button>

        <div className="grid two totals-inputs">
          <label>Tax %<input type="number" min="0" value={tax} onChange={e => setTax(Number(e.target.value))} /></label>
          <label>Discount %<input type="number" min="0" value={discount} onChange={e => setDiscount(Number(e.target.value))} /></label>
        </div>
      </div>

      <aside className="preview">
        <div className="paper">
          <div className="paper-top"><strong>INVOICE</strong><span>{invoiceNo}</span></div>
          <div className="paper-meta"><div><b>{company}</b></div><div>Bill to: {client}</div><div>{date}</div></div>
          <hr />
          {items.map((item, i) => (
            <div className="paper-row" key={i}><span>{item.description} × {item.quantity}</span><b>{money(item.quantity * item.price, currency)}</b></div>
          ))}
          <div className="summary">
            <div>Subtotal <span>{money(subtotal, currency)}</span></div>
            <div>Discount <span>-{money(discountAmount, currency)}</span></div>
            <div>Tax <span>{money(taxAmount, currency)}</span></div>
            <div className="grand">Total <span>{money(total, currency)}</span></div>
          </div>
        </div>
      </aside>
    </section>
  );
}