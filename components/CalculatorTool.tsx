"use client";

import Link from "next/link";
import { useState } from "react";
import { breakEven, discountPrice, dueDate, freelanceRate, lateFee, markup, profitMargin, salesTax, type CalcSlug } from "@/lib/calculators";
import { acceptDecimal, displayDate, formatMoney } from "@/lib/format";
import { getSiteUrl } from "@/lib/site";
import AdSlot from "@/components/AdSlot";

function NumberField({ label, value, onChange, adorn }: { label: string; value: string; onChange: (value: string) => void; adorn?: "money" | "percent" }) {
  const field = (
    <input inputMode="decimal" value={value} onChange={(event) => {
      const next = acceptDecimal(event.target.value);
      if (next.value !== undefined) onChange(next.value);
    }} />
  );
  return (
    <label>{label}
      {adorn ? <span className="adorn">{adorn === "money" ? <span>$</span> : null}{field}{adorn === "percent" ? <span>%</span> : null}</span> : field}
    </label>
  );
}

const embedTitle: Record<CalcSlug, string> = {
  "profit-margin": "Profit margin calculator",
  markup: "Markup calculator",
  "sales-tax": "Sales tax calculator",
  "freelance-rate": "Freelance rate calculator",
  "late-fee": "Late fee calculator",
  "break-even": "Break-even calculator",
  discount: "Discount calculator",
  "due-date": "Invoice due date calculator",
};

function amountLabel(slug: CalcSlug) {
  if (slug === "freelance-rate") return "Yearly income goal";
  if (slug === "break-even") return "Fixed costs";
  if (slug === "sales-tax") return "Amount";
  if (slug === "late-fee") return "Invoice amount";
  if (slug === "discount") return "Original price";
  return "Cost";
}

export default function CalculatorTool({ slug, embedded = false }: { slug: CalcSlug; embedded?: boolean }) {
  const [a, setA] = useState(slug === "due-date" ? "" : slug === "freelance-rate" ? "60000" : "100");
  const [b, setB] = useState(slug === "freelance-rate" ? "12000" : slug === "sales-tax" || slug === "discount" || slug === "late-fee" ? "20" : "150");
  const [c, setC] = useState("48");
  const [d, setD] = useState("30");
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [issued, setIssued] = useState("");
  const [embedOpen, setEmbedOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  let result = "";
  if (slug === "profit-margin") {
    const value = profitMargin(a, b);
    result = value === null ? "Enter a selling price above 0." : `Margin: ${value}%`;
  } else if (slug === "markup") {
    const value = markup(a, b);
    result = value === null ? "Enter a cost above 0." : `Markup: ${value}%`;
  } else if (slug === "sales-tax") {
    const value = salesTax(a, b, mode);
    result = `Net ${formatMoney(value.net, "USD")} · Tax ${formatMoney(value.tax, "USD")} · Gross ${formatMoney(value.gross, "USD")}`;
  } else if (slug === "freelance-rate") {
    const value = freelanceRate(a, b, c, d);
    result = value === null ? "Enter weeks and hours above 0." : `Hourly rate: ${formatMoney(value, "USD")}`;
  } else if (slug === "late-fee") {
    const value = lateFee(a, b, c);
    result = `Fee ${formatMoney(value.fee, "USD")} · Total ${formatMoney(value.total, "USD")}`;
  } else if (slug === "break-even") {
    const value = breakEven(a, b, c);
    result = value === null ? "Price must be higher than the cost per unit." : `Break-even units: ${value}`;
  } else if (slug === "discount") {
    const value = discountPrice(a, b);
    result = `Discount ${formatMoney(value.off, "USD")} · Price ${formatMoney(value.total, "USD")}`;
  } else {
    const date = dueDate(issued, a);
    result = date ? `Due ${displayDate(date)}` : "Choose an issue date.";
  }

  const secondLabel = slug === "freelance-rate" ? "Yearly expenses" : slug === "break-even" ? "Price per unit" : slug === "late-fee" ? "Annual rate %" : slug === "discount" || slug === "sales-tax" ? "Rate %" : "Selling price";
  const secondAdorn = secondLabel.includes("%") ? "percent" : slug === "due-date" ? undefined : "money";
  const thirdAdorn = slug === "break-even" ? "money" : undefined;
  const embedCode = `<iframe src="${getSiteUrl()}/embed/${slug}" title="${embedTitle[slug]}" style="width:100%;max-width:480px;height:460px;border:0"></iframe>`;

  return (
    <section className="calc-tool">
      <div className="calc-layout">
        <div className="grid two">
          {slug === "due-date" ? (
            <>
              <label>Issue date<input type="date" value={issued} onChange={(event) => setIssued(event.target.value)} /></label>
              <NumberField label="Days until due" value={a} onChange={setA} />
            </>
          ) : (
            <>
              <NumberField label={amountLabel(slug)} value={a} onChange={setA} adorn="money" />
              <NumberField label={secondLabel} value={b} onChange={setB} adorn={secondAdorn} />
            </>
          )}
          {slug === "sales-tax" && (
            <label>Mode
              <select value={mode} onChange={(event) => setMode(event.target.value as "add" | "remove")}>
                <option value="add">Add tax</option>
                <option value="remove">Remove tax</option>
              </select>
            </label>
          )}
          {(slug === "freelance-rate" || slug === "late-fee" || slug === "break-even") && <NumberField label={slug === "freelance-rate" ? "Working weeks" : slug === "late-fee" ? "Days late" : "Variable cost per unit"} value={c} onChange={setC} adorn={thirdAdorn} />}
          {slug === "freelance-rate" && <NumberField label="Billable hours per week" value={d} onChange={setD} />}
        </div>
        <div className="calc-result-panel">
          <span>Result</span>
          <p className="calc-result" role="status">{result}</p>
          <span>The numbers stay in this browser. This is arithmetic, not tax or legal advice.</span>
        </div>
      </div>
      {embedded ? null : (
        <>
          <button type="button" className="btn-secondary" onClick={() => setEmbedOpen((open) => !open)}>Embed this calculator</button>
          {embedOpen && (
            <div className="embed-copy">
              <label>Embed code<textarea className="embed-code" readOnly rows={4} value={embedCode} /></label>
              <button className="secondary" type="button" onClick={() => {
                navigator.clipboard.writeText(embedCode).then(() => {
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 2000);
                }).catch(() => setCopied(false));
              }}>{copied ? "Copied" : "Copy"}</button>
              <p><Link href={`/embed/${slug}`}>Open the embeddable calculator</Link></p>
            </div>
          )}
        </>
      )}
      <AdSlot place="after-result" />
    </section>
  );
}
