import type { Metadata } from "next";
import Link from "next/link";
import ContextualLinks from "@/components/ContextualLinks";
import EstimateGenerator from "@/components/EstimateGenerator";
import JsonLd from "@/components/JsonLd";
import { breadcrumbItems } from "@/lib/breadcrumbs";
import { breadcrumbLd, faqLd, webApplicationLd, type FaqItem } from "@/lib/schema";

const estimateFaqs: FaqItem[] = [
  { question: "Is an estimate the same as a quote?", answer: "No. An estimate is a low and high range while the scope can still move. A quote is one figure for a described scope. The note on the download says this is an estimate, not a fixed quote." },
  { question: "Can each line have a low and a high price?", answer: "Yes. Leave the high price blank when you only know one number. When you fill it, the line amount and the total both show a range." },
  { question: "What do convert to quote and convert to invoice do?", answer: "They copy every line into the quote or invoice generator on this device. The low price becomes the line price. Any high price is written into the notes." },
  { question: "Which files can I download?", answer: "PDF, Word, and Excel. The file is built in your browser. The lines are not uploaded." },
];

export const metadata: Metadata = {
  title: "Free Estimate Generator — Ranges in PDF, Word & Excel",
  description: "Build a job estimate with a low and high price on each line, a valid-until date, and written assumptions. Download PDF, Word, or Excel, then convert the lines.",
  alternates: { canonical: "/estimate-generator" },
  openGraph: {
    title: "Free Estimate Generator — Ranges in PDF, Word & Excel",
    description: "Build a job estimate with a low and high price on each line, a valid-until date, and written assumptions. Download PDF, Word, or Excel, then convert the lines.",
    type: "website",
    url: "/estimate-generator",
  },
};

export default function EstimateGeneratorPage() {
  return (
    <main className="page">
      <JsonLd data={[
        webApplicationLd("Free Estimate Generator", "/estimate-generator", "Create an estimate with a low and high price range in your browser."),
        faqLd(estimateFaqs),
        breadcrumbLd(breadcrumbItems("/estimate-generator") ?? []),
      ]} />
      <EstimateGenerator />
      <section className="seo-content" aria-labelledby="estimate-guide-title">
        <h2 id="estimate-guide-title">Write an estimate before the price is fixed</h2>
        <p>An estimate is the range you can defend before the scope is settled. Add a low and an optional high price on each line, a date the range stays open, and the assumptions that would push the job to the high end. The download is titled ESTIMATE and says it is not a fixed quote.</p>
        <h2>How to build the range</h2>
        <ol>
          <li>Enter your business, the client, an estimate number, and the date.</li>
          <li>Add each task with a quantity, a low price, and a high price when the spread is real.</li>
          <li>Set the valid-until date and write the assumptions and exclusions.</li>
          <li>Download PDF, Word, or Excel, or convert the lines into a quote or an invoice on this device.</li>
        </ol>
        <p>When the scope is settled, use <Link href="/quote-generator">the quote generator</Link> for one figure. The difference is explained in <Link href="/guides/quote-vs-estimate-vs-proposal">quote vs estimate vs proposal</Link>. Trade examples live on the <Link href="/estimate-template">estimate templates</Link>.</p>
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          {estimateFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
      </section>
      <ContextualLinks path="/estimate-generator" />
    </main>
  );
}
