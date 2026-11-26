import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DocumentStudio from "@/components/DocumentStudio";
import JsonLd from "@/components/JsonLd";
import { getInvoiceCountry, invoiceCountries } from "@/content/countries";
import { breadcrumbLd, faqLd } from "@/lib/schema";

export function generateStaticParams() {
  return invoiceCountries.map((item) => ({ country: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const item = getInvoiceCountry(country);
  if (!item) return {};
  const title = `Common invoice fields for ${item.name}`;
  const description = `A checklist of invoice fields often used in ${item.name}, with a link to the official source. Requirements vary.`;
  return { title, description, alternates: { canonical: `/invoice-requirements/${item.slug}` }, openGraph: { title, description, type: "website", url: `/invoice-requirements/${item.slug}` } };
}

export default async function Page({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const item = getInvoiceCountry(country);
  if (!item) notFound();
  const faqs = [
    { question: "Does this page know where I am?", answer: "No. Opening it does not detect your location. It only shows a checklist for this jurisdiction because you chose the page." },
    { question: "Is this a complete legal invoice?", answer: "No. It is a short list of commonly required fields plus the official source. Your supply, registration, and thresholds can change what you must show." },
    { question: "Which currency is the generator using?", answer: `The embedded invoice starts in ${item.currency}. You can change it.` },
  ];
  return (
    <main className="page">
      <JsonLd data={[faqLd(faqs), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Invoice requirements", path: "/invoice-requirements" }, { name: item.name, path: `/invoice-requirements/${item.slug}` }])]} />
      <article className="seo-content">
        <h1>Common invoice fields for {item.name}</h1>
        <p>{item.intro}</p>
        <p>Requirements vary. Check the tax authority before you rely on a template.</p>
        <p><a href={item.sourceUrl} target="_blank" rel="noreferrer">{item.sourceName}</a></p>
        <h2>Checklist</h2>
        <ul>{item.fields.map((field) => <li key={field}>{field}</li>)}</ul>
      </article>
      <DocumentStudio kind="invoice" defaults={{ currency: item.currency, notes: "Check the official source linked on this page before treating this invoice as complete." }} />
      <article className="seo-content">
        <div className="faq-list">
          {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
        <div className="guide-links">
          {invoiceCountries.filter((other) => other.slug !== item.slug).slice(0, 4).map((other) => <Link key={other.slug} href={`/invoice-requirements/${other.slug}`}>{other.name} →</Link>)}
        </div>
      </article>
    </main>
  );
}
