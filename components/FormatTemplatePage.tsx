import Link from "next/link";
import BlankTemplateButton from "@/components/BlankTemplateButton";
import DocumentStudio from "@/components/DocumentStudio";
import JsonLd from "@/components/JsonLd";
import { getFormatPage, type FormatHub, type FormatId, type FormatPage } from "@/content/format-pages";
import { breadcrumbItems } from "@/lib/breadcrumbs";
import { breadcrumbLd, digitalDocumentLd, faqLd } from "@/lib/schema";
import { GOOGLE_DOCS_COPY_URL } from "@/lib/site";

const FORMAT_LABEL: Record<FormatId, string> = {
  word: "Word",
  "google-docs": "Google Docs",
  excel: "Excel",
  pdf: "PDF",
};

const HUB_LABEL: Record<FormatHub, string> = {
  invoice: "Invoice",
  quote: "Quote",
  receipt: "Receipt",
};

const TRADES: [string, string][] = [
  ["freelance-designer", "Freelance designer"],
  ["photographer", "Photographer"],
  ["plumber", "Plumber"],
  ["electrician", "Electrician"],
  ["consulting", "Consulting"],
  ["web-developer", "Web developer"],
];

const RECEIPTS: [string, string][] = [
  ["freelance-payment", "Freelance payment"],
  ["rent-payment", "Rent payment"],
  ["security-deposit", "Security deposit"],
  ["repair-payment", "Repair payment"],
  ["lesson-payment", "Lesson payment"],
  ["consulting-payment", "Consulting payment"],
];

function otherFormats(page: FormatPage) {
  return (Object.keys(FORMAT_LABEL) as FormatId[])
    .filter((format) => format !== page.format)
    .map((format) => ({
      href: `/${page.hub}-template/${format}`,
      label: `${HUB_LABEL[page.hub]} template for ${FORMAT_LABEL[format]}`,
    }));
}

export default function FormatTemplatePage({ hub, format }: { hub: FormatHub; format: FormatId }) {
  const page = getFormatPage(hub, format);
  const generator = `/${hub}-generator`;
  const hubPath = `/${hub}-template`;
  const popular = hub === "receipt" ? RECEIPTS : TRADES;
  const copyUrl = page.format === "google-docs" ? GOOGLE_DOCS_COPY_URL.trim() : "";

  return (
    <main className="page">
      <JsonLd data={[
        digitalDocumentLd(page.h1, page.path, page.documentName, page.mime, page.file),
        faqLd(page.faqs),
        breadcrumbLd(breadcrumbItems(page.path) ?? []),
      ]} />
      <article className="seo-content">
        <h1>{page.h1}</h1>
        <p>{page.intro}</p>
        <div className="format-actions">
          <BlankTemplateButton href={page.file} label={page.downloadLabel} />
          {copyUrl ? <a className="btn-primary" href={copyUrl} target="_blank" rel="noopener noreferrer">Make a copy in Google Docs</a> : null}
        </div>
        <h2>What is in the template</h2>
        {page.included.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <h2>How to edit it</h2>
        {page.editing.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <ol>
          {page.steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
        <h2>Tips for this format</h2>
        {page.tips.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <h2>Other formats</h2>
        <div className="guide-links">
          {otherFormats(page).map((item) => <Link key={item.href} href={item.href}>{item.label} →</Link>)}
          <Link href={generator}>{HUB_LABEL[hub]} generator →</Link>
          <Link href={hubPath}>All {HUB_LABEL[hub].toLowerCase()} templates →</Link>
        </div>
        <h2>Popular templates</h2>
        <div className="guide-links">
          {popular.map(([slug, label]) => <Link key={slug} href={`${hubPath}/${slug}`}>{label} →</Link>)}
        </div>
        <h2>Questions</h2>
        <div className="faq-list">
          {page.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
      </article>
      <DocumentStudio
        kind={hub}
        headingLevel={2}
        preferredFormat={page.preferred}
        defaults={{ items: [{ description: "Description", quantity: "1", price: "0" }] }}
      />
    </main>
  );
}
