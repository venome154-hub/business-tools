import type { Metadata } from "next";
import Link from "next/link";
import ContextualLinks from "@/components/ContextualLinks";
import JsonLd from "@/components/JsonLd";
import { estimateTrades } from "@/content/estimates";
import { industries } from "@/content/industries";
import { breadcrumbItems } from "@/lib/breadcrumbs";
import { breadcrumbLd } from "@/lib/schema";
import { titled } from "@/lib/site";

export const metadata: Metadata = {
  title: "Estimate templates with price ranges",
  description: "Free estimate templates that price a job as a low and high range, with assumptions and sample lines. Download PDF, Word, or Excel. No account required.",
  alternates: { canonical: "/estimate-template" },
  openGraph: {
    title: "Estimate templates with price ranges",
    description: "Free estimate templates that price a job as a low and high range, with assumptions and sample lines. Download PDF, Word, or Excel. No account required.",
    type: "website",
    url: "/estimate-template",
  },
};

export default function Page() {
  return (
    <main className="page">
      <JsonLd data={breadcrumbLd(breadcrumbItems("/estimate-template") ?? [])} />
      <article className="seo-content">
        <h1>Estimate templates</h1>
        <p>These pages are for a price range before the scope is settled. Each one explains how that trade arrives at a low and a high figure, shows sample lines, and lists the assumptions that belong on the download. A quote, which states one figure, stays on the quote templates.</p>
        <p>Open the <Link href="/estimate-generator">estimate generator</Link> for a blank range, or read <Link href="/guides/quote-vs-estimate-vs-proposal">how a quote, an estimate, and a proposal differ</Link>.</p>
        <div className="guide-links">
          {estimateTrades.map((item) => {
            const name = industries.find((industry) => industry.slug === item.slug)?.name ?? item.slug;
            return <Link key={item.slug} href={`/estimate-template/${item.slug}`}>{titled(name)} estimate template →</Link>;
          })}
        </div>
      </article>
      <ContextualLinks path="/estimate-template" />
    </main>
  );
}
