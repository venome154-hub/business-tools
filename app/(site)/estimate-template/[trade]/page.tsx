import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DocumentStudio from "@/components/DocumentStudio";
import JsonLd from "@/components/JsonLd";
import { estimateDifference, estimateMetaTitle, estimateTrades, getEstimate } from "@/content/estimates";
import { getIndustry } from "@/content/industries";
import { breadcrumbItems } from "@/lib/breadcrumbs";
import { breadcrumbLd, faqLd } from "@/lib/schema";
import { titled } from "@/lib/site";

export function generateStaticParams() {
  return estimateTrades.map((item) => ({ trade: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ trade: string }> }): Promise<Metadata> {
  const { trade } = await params;
  const item = getEstimate(trade);
  const industry = getIndustry(trade);
  if (!item || !industry) return {};
  const title = estimateMetaTitle(industry.name);
  const description = item.description;
  return {
    title,
    description,
    alternates: { canonical: `/estimate-template/${item.slug}` },
    openGraph: { title, description, type: "website", url: `/estimate-template/${item.slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ trade: string }> }) {
  const { trade } = await params;
  const item = getEstimate(trade);
  const industry = getIndustry(trade);
  if (!item || !industry) notFound();
  const name = titled(industry.name);
  return (
    <main className="page">
      <JsonLd data={[faqLd(item.faqs), breadcrumbLd(breadcrumbItems(`/estimate-template/${item.slug}`) ?? [])]} />
      <article className="seo-content">
        <h1>{name} estimate template</h1>
        {item.intro.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
        <p>
          {estimateDifference.before}{" "}
          <Link href={`/quote-template/${item.slug}`}>{estimateDifference.quoteLink}</Link>.{" "}
          {estimateDifference.between}{" "}
          <Link href="/guides/quote-vs-estimate-vs-proposal">{estimateDifference.guideLink}</Link>.
        </p>
        <h2>How a {industry.name} prices a job before the figure is fixed</h2>
        {item.method.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
        <h2>Assumptions and exclusions</h2>
        <ul>
          {item.assumptions.map((assumption) => <li key={assumption}>{assumption}</li>)}
        </ul>
      </article>
      <DocumentStudio
        kind="estimate"
        headingLevel={2}
        defaults={{
          items: item.lines,
          terms: item.assumptions.join(" "),
        }}
      />
      <article className="seo-content">
        <h2>Questions about {industry.name} estimates</h2>
        <div className="faq-list">
          {item.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
        <div className="guide-links">
          <Link href="/estimate-generator">Estimate generator →</Link>
          <Link href="/estimate-template">All estimate templates →</Link>
          <Link href={`/quote-template/${item.slug}`}>{name} quote template →</Link>
          <Link href="/guides/quote-vs-estimate-vs-proposal">Quote vs estimate vs proposal →</Link>
        </div>
      </article>
    </main>
  );
}
