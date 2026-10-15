"use client";

import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { applyTaxAndDiscount, decimalLabel, displayDate, formatMoney, localDate, priceLines, sanitizeDecimal, sanitizePercent, type DecimalItem } from "@/lib/format";
import { downloadBusinessPdf } from "@/lib/pdf";

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
  const [tax, setTax] = useState("0");
  const [discount, setDiscount] = useState("0");
  const [paymentInfo, setPaymentInfo] = useState("");
  const [notes, setNotes] = useState("");
  const [pdfError, setPdfError] = useState("");
  const [pdfBusy, setPdfBusy] = useState(false);
  const [items, setItems] = useState<DecimalItem[]>([
    { description: "Service", quantity: "1", price: "100" },
  ]);

  const priced = useMemo(() => priceLines(items), [items]);
  const totals = useMemo(
    () => ({ ...priced, ...applyTaxAndDiscount(priced.subtotal, tax, discount) }),
    [priced, tax, discount],
  );

  function updateItem(index: number, field: keyof DecimalItem, value: string) {
    setItems((current) => current.map((item, itemIndex) => {
      if (itemIndex !== index) return item;
      if (field === "description") return { ...item, description: value };
      return { ...item, [field]: sanitizeDecimal(value) };
    }));
  }

  async function downloadPDF() {
    if (pdfBusy) return;
    setPdfBusy(true);
    setPdfError("");
    try {
      await downloadBusinessPdf({
        filename: invoiceNo || "invoice",
        title: "INVOICE",
        meta: [
          `Invoice #: ${invoiceNo || "—"}`,
          `Issue date: ${displayDate(date) || "—"}`,
          ...(dueDate ? [`Due date: ${displayDate(dueDate)}`] : []),
        ],
        blocks: [
          { title: "FROM", lines: [company, companyAddress, companyEmail] },
          { title: "BILL TO", lines: [client, clientAddress, clientEmail] },
        ],
        columns: [
          { header: "Description", width: 0.52, align: "left" },
          { header: "Qty", width: 0.12, align: "right" },
          { header: "Price", width: 0.18, align: "right" },
          { header: "Amount", width: 0.18, align: "right" },
        ],
        rows: totals.lines.map((line) => [
          line.description,
          line.quantityLabel,
          formatMoney(line.price, currency),
          formatMoney(line.amount, currency),
        ]),
        totals: [
          { label: "Subtotal", value: formatMoney(totals.subtotal, currency) },
          ...(totals.discountRate > 0 ? [{ label: `Discount (${decimalLabel(discount)}%)`, value: `-${formatMoney(totals.discountAmount, currency)}` }] : []),
          ...(totals.taxRate > 0 ? [{ label: `Tax (${decimalLabel(tax)}%)`, value: formatMoney(totals.taxAmount, currency) }] : []),
          { label: "TOTAL DUE", value: formatMoney(totals.total, currency), emphasize: true },
        ],
        notes: [
          { title: "Payment instructions", text: paymentInfo },
          { title: "Notes", text: notes },
        ],
        footer: "Thank you for your business.",
      });
      trackEvent("document_download", { tool_name: "invoice" });
    } catch {
      setPdfError("The PDF could not be created. Check the details and try again.");
    } finally {
      setPdfBusy(false);
    }
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
          <button className="download" onClick={downloadPDF} disabled={pdfBusy}>{pdfBusy ? "Preparing PDF…" : "Download PDF"}</button>
        </div>
        {pdfError && <p className="form-error" role="alert">{pdfError}</p>}

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
              <input aria-label={`Quantity for item ${i + 1}`} inputMode="decimal" value={item.quantity} onChange={e => updateItem(i, "quantity", e.target.value)} />
              <input aria-label={`Price for item ${i + 1}`} inputMode="decimal" value={item.price} onChange={e => updateItem(i, "price", e.target.value)} />
              <button className="icon" onClick={() => setItems(current => current.filter((_, index) => index !== i))} aria-label="Remove item">×</button>
            </div>
          ))}
        </div>
        <button className="secondary" onClick={() => setItems(current => [...current, { description: "New item", quantity: "1", price: "0" }])}>+ Add item</button>

        <div className="grid two totals-inputs">
          <label>Tax %<input inputMode="decimal" value={tax} onChange={e => setTax(sanitizeDecimal(e.target.value))} /></label>
          <label>Discount %<input inputMode="decimal" value={discount} onChange={e => setDiscount(sanitizePercent(e.target.value))} /></label>
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
          {totals.lines.map((line, i) => (
            <div className="paper-row" key={i}><span>{line.description || "Item"} × {line.quantityLabel}</span><b>{formatMoney(line.amount, currency)}</b></div>
          ))}
          <div className="summary">
            <div>Subtotal <span>{formatMoney(totals.subtotal, currency)}</span></div>
            {totals.discountRate > 0 && <div>Discount ({decimalLabel(discount)}%) <span>-{formatMoney(totals.discountAmount, currency)}</span></div>}
            {totals.taxRate > 0 && <div>Tax ({decimalLabel(tax)}%) <span>{formatMoney(totals.taxAmount, currency)}</span></div>}
            <div className="grand">Total due <span>{formatMoney(totals.total, currency)}</span></div>
          </div>
          {paymentInfo && <div className="invoice-preview-extra"><b>Payment instructions</b><p>{paymentInfo}</p></div>}
          {notes && <div className="invoice-preview-extra"><b>Notes</b><p>{notes}</p></div>}
        </div>
      </aside>
    </section>
  );
}
