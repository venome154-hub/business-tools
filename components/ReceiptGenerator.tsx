"use client";

import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { formatMoney, localDate, displayDate, parseDecimal, priceLines, roundMoney, sanitizeDecimal, type DecimalItem } from "@/lib/format";
import { downloadBusinessPdf } from "@/lib/pdf";

export default function ReceiptGenerator() {
  const [company, setCompany] = useState("Your Company");
  const [client, setClient] = useState("Client Name");
  const [receiptNo, setReceiptNo] = useState("RCP-001");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate] = useState(localDate);
  const [method, setMethod] = useState("Bank transfer");
  const [reference, setReference] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [receivedInput, setReceivedInput] = useState("");
  const [pdfError, setPdfError] = useState("");
  const [pdfBusy, setPdfBusy] = useState(false);
  const [items, setItems] = useState<DecimalItem[]>([{ description: "Service payment", quantity: "1", price: "100" }]);

  const priced = useMemo(() => priceLines(items), [items]);
  const subtotal = priced.subtotal;
  const received = receivedInput.trim() === "" ? subtotal : roundMoney(parseDecimal(receivedInput));
  const balance = roundMoney(Math.max(0, subtotal - received));
  const overpayment = roundMoney(Math.max(0, received - subtotal));

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
        filename: receiptNo || "receipt",
        title: "PAYMENT RECEIPT",
        meta: [
          `Receipt: ${receiptNo || "—"}`,
          `Date received: ${displayDate(date) || "—"}`,
        ],
        blocks: [{
          lines: [
            company,
            client ? `Received from: ${client}` : "",
            invoiceNo.trim() ? `Related invoice: ${invoiceNo.trim()}` : "",
            `Payment method: ${method}`,
            reference.trim() ? `Payment reference: ${reference.trim()}` : "",
          ],
        }],
        columns: [
          { header: "Description", width: 0.62, align: "left" },
          { header: "Qty", width: 0.14, align: "right" },
          { header: "Amount", width: 0.24, align: "right" },
        ],
        rows: priced.lines.map((line) => [line.description, line.quantityLabel, formatMoney(line.amount, currency)]),
        totals: [
          { label: "Listed total", value: formatMoney(subtotal, currency) },
          { label: "Amount received", value: formatMoney(received, currency), emphasize: true },
          ...(balance > 0 ? [{ label: "Balance remaining", value: formatMoney(balance, currency) }] : []),
          ...(overpayment > 0 ? [{ label: "Amount above listed total", value: formatMoney(overpayment, currency) }] : []),
        ],
        footer: "This receipt records a payment reported as received by the business. It does not process or verify payment.",
      });
      trackEvent("document_download", { tool_name: "receipt" });
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
            <h1>Receipt Generator</h1>
            <p>Record a payment you have received and download a clear receipt PDF.</p>
          </div>
          <button className="download" onClick={downloadPDF} disabled={pdfBusy}>{pdfBusy ? "Preparing PDF…" : "Download PDF"}</button>
        </div>
        {pdfError && <p className="form-error" role="alert">{pdfError}</p>}

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
              <input aria-label={`Quantity for item ${i + 1}`} inputMode="decimal" value={item.quantity} onChange={e => updateItem(i, "quantity", e.target.value)} />
              <input aria-label={`Price for item ${i + 1}`} inputMode="decimal" value={item.price} onChange={e => updateItem(i, "price", e.target.value)} />
              <button className="icon" onClick={() => setItems(current => current.filter((_, index) => index !== i))} aria-label="Remove item">×</button>
            </div>
          ))}
        </div>
        <button className="secondary" onClick={() => setItems(current => [...current, { description: "New item", quantity: "1", price: "0" }])}>+ Add item</button>
        <div className="grid totals-inputs">
          <label>Amount received<input inputMode="decimal" value={receivedInput} placeholder={subtotal.toFixed(2)} onChange={e => setReceivedInput(sanitizeDecimal(e.target.value))} /></label>
        </div>
        <p className="quote-note">Leave amount received blank to record the full listed amount. This tool creates a document only; it does not take or verify payments.</p>
      </div>

      <aside className="preview">
        <div className="paper">
          <div className="paper-top"><strong>PAYMENT RECEIPT</strong><span>{receiptNo}</span></div>
          <div className="paper-meta"><div><b>{company}</b></div><div>Received from: {client}</div><div>Date received: {displayDate(date) || "—"}</div>{invoiceNo && <div>Invoice: {invoiceNo}</div>}<div>Payment method: {method}</div>{reference && <div>Reference: {reference}</div>}</div>
          <hr />
          {priced.lines.map((line, i) => <div className="paper-row" key={i}><span>{line.description} × {line.quantityLabel}</span><b>{formatMoney(line.amount, currency)}</b></div>)}
          <div className="summary">
            <div>Listed total <span>{formatMoney(subtotal, currency)}</span></div>
            <div className="grand">Amount received <span>{formatMoney(received, currency)}</span></div>
            {balance > 0 && <div>Balance remaining <span>{formatMoney(balance, currency)}</span></div>}
            {overpayment > 0 && <div>Above listed total <span>{formatMoney(overpayment, currency)}</span></div>}
          </div>
          <p className="quote-paper-note">Payment receipt · Records payment reported as received</p>
        </div>
      </aside>
    </section>
  );
}
