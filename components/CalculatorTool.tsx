"use client";

import Link from "next/link";
import { useState } from "react";
import { breakEven, discountPrice, dueDate, freelanceRate, lateFee, markup, profitMargin, salesTax, type CalcSlug } from "@/lib/calculators";
import { acceptDecimal, displayDate, formatMoney } from "@/lib/format";

function NumberField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label>{label}
      <input inputMode="decimal" value={value} onChange={(event) => {
        const next = acceptDecimal(event.target.value);
        if (next.value !== undefined) onChange(next.value);
      }} />
    </label>
  );
}

export default function CalculatorTool({ slug, embedded = false }: { slug: CalcSlug; embedded?: boolean }) {
  const [a, setA] = useState(slug === "due-date" ? "" : "100");
  const [b, setB] = useState(slug === "sales-tax" || slug === "discount" || slug === "late-fee" ? "20" : "150");
  const [c, setC] = useState("48");
  const [d, setD] = useState("30");
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [issued, setIssued] = useState("");

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

  return (
    <section className="seo-content calc-tool">
      <div className="grid two">
        {slug === "due-date" ? (
          <>
            <label>Issue date<input type="date" value={issued} onChange={(event) => setIssued(event.target.value)} /></label>
            <NumberField label="Days until due" value={a} onChange={setA} />
          </>
        ) : (
          <>
            <NumberField label={slug === "freelance-rate" ? "Yearly income goal" : slug === "break-even" ? "Fixed costs" : slug === "sales-tax" ? "Amount" : "Cost or original price"} value={a} onChange={setA} />
            <NumberField label={slug === "freelance-rate" ? "Yearly expenses" : slug === "break-even" ? "Price per unit" : slug === "late-fee" ? "Annual rate %" : slug === "discount" || slug === "sales-tax" ? "Rate %" : "Selling price"} value={b} onChange={setB} />
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
        {(slug === "freelance-rate" || slug === "late-fee" || slug === "break-even") && <NumberField label={slug === "freelance-rate" ? "Working weeks" : slug === "late-fee" ? "Days late" : "Variable cost per unit"} value={c} onChange={setC} />}
        {slug === "freelance-rate" && <NumberField label="Billable hours per week" value={d} onChange={setD} />}
      </div>
      <p className="calc-result" role="status">{result}</p>
      <p className="quote-note">The numbers stay in this browser. This is arithmetic, not tax or legal advice.</p>
      {embedded ? null : <p><Link href={`/embed/${slug}`}>Embed this calculator</Link></p>}
    </section>
  );
}
