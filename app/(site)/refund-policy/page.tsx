import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Refund policy",
  description: "Refund policy for BizToolsBox. The invoice, receipt, quote and CSV tools are free to use, so there is no paid plan and nothing to refund at this time.",
  alternates: { canonical: "/refund-policy" },
  openGraph: { title: "Refund policy", description: "Refund policy for BizToolsBox. The invoice, receipt, quote and CSV tools are free to use, so there is no paid plan and nothing to refund at this time.", type: "website", url: "/refund-policy" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className="page">
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Refund policy", path: "/refund-policy" }])} />
      <article className="seo-content">
        <h1>Refund policy</h1>
        <p>Last updated November 26, 2026. BizToolsBox does not sell a subscription, a download, or any other paid product. Because nothing is sold, there is nothing to refund.</p>
        <p>The tools stay free to use. If a paid plan is added later, this page will explain how a refund works before that plan is offered for sale.</p>
        <p>See <Link href="/pricing">pricing</Link> and the <Link href="/terms">terms</Link>.</p>
      </article>
    </main>
  );
}
