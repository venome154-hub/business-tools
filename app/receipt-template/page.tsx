import type { Metadata } from "next";
import Link from "next/link";
import ContextualLinks from "@/components/ContextualLinks";
import JsonLd from "@/components/JsonLd";
import { receiptTypes } from "@/content/receipt-types";
import { breadcrumbItems } from "@/lib/breadcrumbs";
import { breadcrumbLd } from "@/lib/schema";
import { titled } from "@/lib/site";

export const metadata: Metadata = {
  title: "Receipt templates by payment type",
  description: "Free receipt templates for rent, deposits, repairs, lessons, and other payments already received. Download a PDF in your browser. No sign-up needed.",
  alternates: { canonical: "/receipt-template" },
  openGraph: { title: "Receipt templates by payment type", description: "Free receipt templates for rent, deposits, repairs, lessons, and other payments already received. Download a PDF in your browser. No sign-up needed.", type: "website", url: "/receipt-template" },
};

export default function Page() {
  return (
    <main className="page">
      <JsonLd data={breadcrumbLd(breadcrumbItems("/receipt-template") ?? [])} />
      <article className="seo-content">
        <h1>Receipt templates for money already received</h1>
        <p>Each template is a receipt, not a bill and not a fake record. It starts from the kind of payment: rent, a deposit, a repair, a lesson block, or an event booking.</p>
        <div className="guide-links">
          {receiptTypes.map((item) => <Link key={item.slug} href={`/receipt-template/${item.slug}`}>{titled(item.name)} →</Link>)}
        </div>
      </article>
      <ContextualLinks path="/receipt-template" />
    </main>
  );
}
