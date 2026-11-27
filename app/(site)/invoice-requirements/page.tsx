import type { Metadata } from "next";
import Link from "next/link";
import ContextualLinks from "@/components/ContextualLinks";
import JsonLd from "@/components/JsonLd";
import { invoiceCountries } from "@/content/countries";
import { breadcrumbItems } from "@/lib/breadcrumbs";
import { breadcrumbLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Invoice requirements by jurisdiction",
  description: "Checklists of commonly required invoice fields for several jurisdictions, each with a link to an official source. These pages do not detect where you are.",
  alternates: { canonical: "/invoice-requirements" },
  openGraph: { title: "Invoice requirements by jurisdiction", description: "Checklists of commonly required invoice fields for several jurisdictions, each with a link to an official source. These pages do not detect where you are.", type: "website", url: "/invoice-requirements" },
};

export default function Page() {
  return (
    <main className="page">
      <JsonLd data={breadcrumbLd(breadcrumbItems("/invoice-requirements") ?? [])} />
      <article className="seo-content">
        <h1>Invoice requirements, jurisdiction by jurisdiction</h1>
        <p>These pages list fields that are commonly expected and link to an official source. They do not detect where you are, and they are not a substitute for the tax authority’s own instructions.</p>
        <div className="guide-links">
          {invoiceCountries.map((item) => <Link key={item.slug} href={`/invoice-requirements/${item.slug}`}>{item.name} →</Link>)}
        </div>
      </article>
      <ContextualLinks path="/invoice-requirements" />
    </main>
  );
}
