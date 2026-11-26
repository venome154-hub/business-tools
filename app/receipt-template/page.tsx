import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { receiptTypes } from "@/content/receipt-types";
import { breadcrumbLd } from "@/lib/schema";
import { titled } from "@/lib/site";

export const metadata: Metadata = {
  title: "Receipt templates by payment type",
  description: "Receipt templates for rent, deposits, repairs, lessons, and other payments you have already received.",
  alternates: { canonical: "/receipt-template" },
  openGraph: { title: "Receipt templates by payment type", description: "Record a specific kind of payment you have received.", type: "website", url: "/receipt-template" },
};

export default function Page() {
  return (
    <main className="page">
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Receipt templates", path: "/receipt-template" }])} />
      <article className="seo-content">
        <h1>Receipt templates for money already received</h1>
        <p>Each template is a receipt, not a bill and not a fake record. It starts from the kind of payment: rent, a deposit, a repair, a lesson block, or an event booking.</p>
        <div className="guide-links">
          {receiptTypes.map((item) => <Link key={item.slug} href={`/receipt-template/${item.slug}`}>{titled(item.name)} →</Link>)}
        </div>
      </article>
    </main>
  );
}
