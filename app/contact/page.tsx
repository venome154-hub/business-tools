import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/schema";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Georgiy T. about BizToolsBox, including bugs, privacy questions, and corrections.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact BizToolsBox", description: "Email Georgiy T. about the free business tools.", type: "website", url: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="page">
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <article className="seo-content">
        <h1>Contact</h1>
        <p>Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Georgiy T. reads messages about broken tools, privacy questions, and factual corrections on the guides.</p>
        <p>Include the page address and what you expected to happen. Do not attach invoices, receipts, or customer spreadsheets; the tools are meant to keep that information on your device.</p>
        <p>A reply usually takes a few business days. There is no phone line and no live chat.</p>
      </article>
    </main>
  );
}
