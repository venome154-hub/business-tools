import CopyEmbed from "@/components/CopyEmbed";
import type { CalcSlug } from "@/lib/calculators";
import { buildEmbedSnippet } from "@/lib/embed-snippet";
import { getSiteUrl } from "@/lib/site";

const targets: Record<CalcSlug, { title: string; path: string }> = {
  "profit-margin": { title: "Profit margin calculator", path: "/profit-margin-calculator" },
  markup: { title: "Markup calculator", path: "/markup-calculator" },
  "sales-tax": { title: "Sales tax calculator", path: "/sales-tax-calculator" },
  "freelance-rate": { title: "Freelance rate calculator", path: "/freelance-rate-calculator" },
  "late-fee": { title: "Late fee calculator", path: "/late-fee-calculator" },
  "break-even": { title: "Break-even calculator", path: "/break-even-calculator" },
  discount: { title: "Discount calculator", path: "/discount-calculator" },
  "due-date": { title: "Invoice due date calculator", path: "/invoice-due-date-calculator" },
};

export default function EmbedPanel({ slug }: { slug: CalcSlug }) {
  const target = targets[slug];
  const code = buildEmbedSnippet(slug, target.title, target.path, getSiteUrl());
  return (
    <details className="embed-copy">
      <summary className="btn-secondary">Embed this calculator</summary>
      <label>
        Embed code
        <textarea className="embed-code" readOnly rows={4} defaultValue={code} />
      </label>
      <CopyEmbed code={code} />
    </details>
  );
}
