import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DocumentStudio from "@/components/DocumentStudio";
import JsonLd from "@/components/JsonLd";
import { getIndustry, industries } from "@/content/industries";
import { breadcrumbLd, faqLd } from "@/lib/schema";
import { titled } from "@/lib/site";

export function generateStaticParams() {
  return industries.map((item) => ({ industry: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const { industry } = await params;
  const item = getIndustry(industry);
  if (!item) return {};
  const title = `${titled(item.name)} invoice template`;
  const description = item.invoiceIntro.slice(0, 155);
  return {
    title,
    description,
    alternates: { canonical: `/invoice-template/${item.slug}` },
    openGraph: { title, description, type: "website", url: `/invoice-template/${item.slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const item = getIndustry(industry);
  if (!item) notFound();
  const title = `${titled(item.name)} invoice template`;
  return (
    <main className="page">
      <JsonLd data={[
        faqLd(item.invoiceFaqs),
        breadcrumbLd([{ name: "Home", path: "/" }, { name: "Invoice templates", path: "/invoice-template" }, { name: item.name, path: `/invoice-template/${item.slug}` }]),
      ]} />
      <article className="seo-content">
        <h1>{title}</h1>
        <p>{item.invoiceIntro}</p>
        <p>The example lines below are a starting point for this kind of work. Change the quantities and prices. The PDF is created in your browser.</p>
      </article>
      <DocumentStudio kind="invoice" defaults={{ items: item.items }} />
      <article className="seo-content">
        <h2>Questions about {item.name} invoices</h2>
        <div className="faq-list">
          {item.invoiceFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
        <h2>Related templates</h2>
        <div className="guide-links">
          {item.related.map((slug) => <Link key={slug} href={`/invoice-template/${slug}`}>{titled(getIndustry(slug)?.name ?? slug)} invoice template →</Link>)}
          <Link href={`/quote-template/${item.slug}`}>Quote template for a {item.name} →</Link>
          <Link href="/invoice-template">All invoice templates →</Link>
        </div>
      </article>
    </main>
  );
}
