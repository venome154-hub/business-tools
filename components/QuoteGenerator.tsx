"use client";

import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { applyTaxAndDiscount, decimalLabel, displayDate, formatMoney, localDate, priceLines, sanitizeDecimal, sanitizePercent, type DecimalItem } from "@/lib/format";
import { downloadBusinessPdf } from "@/lib/pdf";

export default function QuoteGenerator() {
  const [company, setCompany] = useState("Your Company");
  const [client, setClient] = useState("Client Name");
  const [quoteNo, setQuoteNo] = useState("QUO-001");
  const [date, setDate] = useState(localDate);
  const [validUntil, setValidUntil] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [tax, setTax] = useState("0");
  const [discount, setDiscount] = useState("0");
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
        filename: quoteNo || "quote",
        title: "QUOTE",
        meta: [
          `Quote: ${quoteNo || "—"}`,
          `Date: ${displayDate(date) || "—"}`,
          ...(validUntil ? [`Valid until: ${displayDate(validUntil)}`] : []),
        ],
        blocks: [{ lines: [company, client ? `Prepared for: ${client}` : ""] }],
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
          { label: "Estimated total", value: formatMoney(totals.total, currency), emphasize: true },
        ],
        footer: "This quote is an estimate and is not an invoice.",
      });
      trackEvent("document_download", { tool_name: "quote" });
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
            <h1>Quote Generator</h1>
            <p>Create a clear project estimate and download it as a PDF. No signup.</p>
          </div>
          <button className="download" onClick={downloadPDF} disabled={pdfBusy}>{pdfBusy ? "Preparing PDF…" : "Download PDF"}</button>
        </div>
        {pdfError && <p className="form-error" role="alert">{pdfError}</p>}

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
        <p className="quote-note">A quote is an estimate for approval. It does not request payment like an invoice.</p>
      </div>

      <aside className="preview">
        <div className="paper">
          <div className="paper-top"><strong>QUOTE</strong><span>{quoteNo}</span></div>
          <div className="paper-meta"><div><b>{company}</b></div><div>Prepared for: {client}</div><div>Date: {displayDate(date) || "—"}</div>{validUntil && <div>Valid until: {displayDate(validUntil)}</div>}</div>
          <hr />
          {totals.lines.map((line, i) => (
            <div className="paper-row" key={i}><span>{line.description} × {line.quantityLabel}</span><b>{formatMoney(line.amount, currency)}</b></div>
          ))}
          <div className="summary">
            <div>Subtotal <span>{formatMoney(totals.subtotal, currency)}</span></div>
            {totals.discountRate > 0 && <div>Discount ({decimalLabel(discount)}%) <span>-{formatMoney(totals.discountAmount, currency)}</span></div>}
            {totals.taxRate > 0 && <div>Tax ({decimalLabel(tax)}%) <span>{formatMoney(totals.taxAmount, currency)}</span></div>}
            <div className="grand">Estimated total <span>{formatMoney(totals.total, currency)}</span></div>
          </div>
          <p className="quote-paper-note">Estimate only · Not an invoice</p>
        </div>
      </aside>
    </section>
  );
}
