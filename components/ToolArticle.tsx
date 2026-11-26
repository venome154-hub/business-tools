import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, faqLd, webApplicationLd, type FaqItem } from "@/lib/schema";

export default function ToolArticle({
  name,
  path,
  description,
  intro,
  faqs,
  headingAbove = false,
  children,
}: {
  name: string;
  path: string;
  description: string;
  intro: string;
  faqs: FaqItem[];
  headingAbove?: boolean;
  children: React.ReactNode;
}) {
  return (
    <main className="page">
      <JsonLd data={[
        webApplicationLd(name, path, description),
        faqLd(faqs),
        breadcrumbLd([{ name: "Home", path: "/" }, { name, path }]),
      ]} />
      {headingAbove && (
        <section className="seo-content">
          <h1>{name}</h1>
          <p>{intro}</p>
          <AdSlot place="in-article" />
        </section>
      )}
      {children}
      <section className="seo-content">
        {!headingAbove && <><h2>{name}</h2><p>{intro}</p></>}
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          {faqs.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
        </div>
      </section>
    </main>
  );
}
