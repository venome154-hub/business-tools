import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DocumentStudio from "@/components/DocumentStudio";
import JsonLd from "@/components/JsonLd";
import { breadcrumbItems } from "@/lib/breadcrumbs";
import { getEstimate } from "@/content/estimates";
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
  const title = `${titled(item.name)} quote template`;
  const description = item.quoteIntro.slice(0, 155);
  return { title, description, alternates: { canonical: `/quote-template/${item.slug}` }, openGraph: { title, description, type: "website", url: `/quote-template/${item.slug}` } };
}

export default async function Page({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const item = getIndustry(industry);
  if (!item) notFound();
  return (
    <main className="page">
      <JsonLd data={[faqLd(item.quoteFaqs), breadcrumbLd(breadcrumbItems(`/quote-template/${item.slug}`) ?? [])]} />
      <article className="seo-content">
        <h1>{titled(item.name)} quote template</h1>
        <p>{item.quoteIntro}</p>
        <p>This estimate is not an invoice. It proposes the scope and the price before the work is billed. The sample lines are a draft you can edit.</p>
        {getEstimate(item.slug) && <p>While the scope can still move, use the <Link href={`/estimate-template/${item.slug}`}>range page for this trade</Link>.</p>}
      </article>
      <DocumentStudio kind="quote" headingLevel={2} defaults={{ items: item.items, notes: "Price assumes the scope described in the lines. Work outside that scope needs a new quote." }} />
      <article className="seo-content">
        <h2>Questions about {item.name} quotes</h2>
        <div className="faq-list">
          {item.quoteFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
        <div className="guide-links">
          {item.related.map((slug) => <Link key={slug} href={`/quote-template/${slug}`}>{titled(getIndustry(slug)?.name ?? slug)} quote template →</Link>)}
          <Link href={`/invoice-template/${item.slug}`}>Invoice template for a {item.name} →</Link>
          <Link href="/quote-generator">Quote generator →</Link>
          <Link href="/invoice-generator">Invoice generator →</Link>
        </div>
      </article>
    </main>
  );
}
