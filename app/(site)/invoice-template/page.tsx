import type { Metadata } from "next";
import Link from "next/link";
import ContextualLinks from "@/components/ContextualLinks";
import JsonLd from "@/components/JsonLd";
import { industries } from "@/content/industries";
import { breadcrumbItems } from "@/lib/breadcrumbs";
import { breadcrumbLd } from "@/lib/schema";
import { titled } from "@/lib/site";

export const metadata: Metadata = {
  title: "Invoice templates by trade",
  description: "Free invoice templates with example line items for designers, trades, tutors, and other small businesses. Edit the lines and download a PDF in your browser.",
  alternates: { canonical: "/invoice-template" },
  openGraph: { title: "Invoice templates by trade", description: "Free invoice templates with example line items for designers, trades, tutors, and other small businesses. Edit the lines and download a PDF in your browser.", type: "website", url: "/invoice-template" },
};

export default function Page() {
  return (
    <main className="page">
      <JsonLd data={breadcrumbLd(breadcrumbItems("/invoice-template") ?? [])} />
      <article className="seo-content">
        <h1>Invoice templates for specific work</h1>
        <p>Each template opens the invoice generator with example lines for that trade. The descriptions are different because the work is different: a plumber’s call-out is not a tutor’s lesson block. Replace the sample prices with yours.</p>
        <h2>Blank templates by format</h2>
        <div className="guide-links">
          <Link href="/invoice-template/word">Invoice template for Word →</Link>
          <Link href="/invoice-template/google-docs">Invoice template for Google Docs →</Link>
          <Link href="/invoice-template/excel">Invoice template for Excel →</Link>
          <Link href="/invoice-template/pdf">Invoice template for PDF →</Link>
        </div>
        <div className="guide-links">
          {industries.map((item) => <Link key={item.slug} href={`/invoice-template/${item.slug}`}>{titled(item.name)} →</Link>)}
        </div>
      </article>
      <ContextualLinks path="/invoice-template" />
    </main>
  );
}
