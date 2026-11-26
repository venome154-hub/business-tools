import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Pricing",
  description: "BizToolsBox does not sell a paid plan. The document, calculator, and CSV tools are free.",
  alternates: { canonical: "/pricing" },
  openGraph: { title: "Pricing", description: "No paid plan is for sale. The tools are free.", type: "website", url: "/pricing" },
};

export default function Page() {
  return (
    <main className="page">
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])} />
      <article className="seo-content">
        <h1>Pricing</h1>
        <p>A paid plan is not for sale. There is no monthly price and no checkout on BizToolsBox.</p>
        <p>The invoice, quote, receipt, reminder, calculator, and CSV tools are free to use in your browser. You do not need an account.</p>
        <p>If a paid plan is offered later, this page will list what it includes and what it costs before anyone can buy it. Until then, there is nothing to subscribe to and nothing to cancel.</p>
        <p>Read the <Link href="/terms">terms</Link> and the <Link href="/refund-policy">refund policy</Link>.</p>
      </article>
    </main>
  );
}
