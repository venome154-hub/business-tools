import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculatorTool from "@/components/CalculatorTool";
import EmbedCode from "@/components/EmbedCode";
import type { CalcSlug } from "@/lib/calculators";
import { getSiteUrl } from "@/lib/site";

const embeds: Record<string, { slug: CalcSlug; title: string; path: string }> = {
  "profit-margin": { slug: "profit-margin", title: "Profit margin calculator", path: "/profit-margin-calculator" },
  markup: { slug: "markup", title: "Markup calculator", path: "/markup-calculator" },
  "sales-tax": { slug: "sales-tax", title: "Sales tax calculator", path: "/sales-tax-calculator" },
  "freelance-rate": { slug: "freelance-rate", title: "Freelance rate calculator", path: "/freelance-rate-calculator" },
  "late-fee": { slug: "late-fee", title: "Late fee calculator", path: "/late-fee-calculator" },
  "break-even": { slug: "break-even", title: "Break-even calculator", path: "/break-even-calculator" },
  discount: { slug: "discount", title: "Discount calculator", path: "/discount-calculator" },
  "due-date": { slug: "due-date", title: "Invoice due date calculator", path: "/invoice-due-date-calculator" },
};

export function generateStaticParams() {
  return Object.keys(embeds).map((tool) => ({ tool }));
}

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const { tool } = await params;
  const item = embeds[tool];
  if (!item) return {};
  return { title: item.title, robots: { index: false, follow: false } };
}

export default async function Page({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params;
  const item = embeds[tool];
  if (!item) notFound();
  const src = `${getSiteUrl()}/embed/${tool}`;
  const code = `<iframe src="${src}" title="${item.title}" style="width:100%;max-width:480px;height:460px;border:0"></iframe>`;
  return (
    <main className="embed-app">
      <h1>{item.title}</h1>
      <CalculatorTool slug={item.slug} embedded />
      <p className="embed-credit"><a href={`${getSiteUrl()}${item.path}`}>Powered by BizToolsBox</a></p>
      <EmbedCode code={code} />
    </main>
  );
}
