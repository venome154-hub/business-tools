import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DocumentStudio from "@/components/DocumentStudio";
import JsonLd from "@/components/JsonLd";
import { getReceiptType, receiptTypes } from "@/content/receipt-types";
import { breadcrumbLd, faqLd } from "@/lib/schema";
import { titled } from "@/lib/site";

export function generateStaticParams() {
  return receiptTypes.map((item) => ({ type: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  const item = getReceiptType(type);
  if (!item) return {};
  const title = `${titled(item.name)} receipt template`;
  const description = item.intro.slice(0, 155);
  return { title, description, alternates: { canonical: `/receipt-template/${item.slug}` }, openGraph: { title, description, type: "website", url: `/receipt-template/${item.slug}` } };
}

export default async function Page({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const item = getReceiptType(type);
  if (!item) notFound();
  return (
    <main className="page">
      <JsonLd data={[faqLd(item.faqs), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Receipt templates", path: "/receipt-template" }, { name: item.name, path: `/receipt-template/${item.slug}` }])]} />
      <article className="seo-content">
        <h1>{titled(item.name)} receipt template</h1>
        <p>{item.intro}</p>
      </article>
      <DocumentStudio kind="receipt" defaults={{ items: item.items }} />
      <article className="seo-content">
        <div className="faq-list">
          {item.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
        <div className="guide-links">
          {item.related.map((slug) => <Link key={slug} href={`/receipt-template/${slug}`}>{titled(getReceiptType(slug)?.name ?? slug)} receipt →</Link>)}
        </div>
      </article>
    </main>
  );
}
