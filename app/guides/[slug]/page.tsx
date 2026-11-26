import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import AdSlot from "@/components/AdSlot";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { articles, getArticle } from "@/content/articles";
import { articleLd, breadcrumbLd } from "@/lib/schema";

export function generateStaticParams() {
  return articles.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/guides/${article.slug}` },
    openGraph: { title: article.title, description: article.description, type: "article", url: `/guides/${article.slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const more = articles.filter((item) => item.slug !== article.slug).slice(0, 3);
  return (
    <main className="page">
      <JsonLd data={[articleLd(article.title, article.description, `/guides/${article.slug}`), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }, { name: article.title, path: `/guides/${article.slug}` }])]} />
      <article className="seo-content">
        <h1>{article.title}</h1>
        <nav aria-label="On this page">
          <h2>On this page</h2>
          <ol>
            {article.paragraphs.slice(0, 3).map((paragraph, index) => <li key={paragraph.slice(0, 24)}><a href={`#section-${index + 1}`}>{paragraph.split(". ")[0]}</a></li>)}
          </ol>
        </nav>
        {article.paragraphs.map((paragraph, index) => <p id={index < 3 ? `section-${index + 1}` : undefined} key={paragraph.slice(0, 40)}>{paragraph}</p>)}
        <AdSlot place="in-article" />
        <div className="guide-tool">
          <span className="tool-icon"><FileText size={20} /></span>
          <div><strong>{article.toolLabel}</strong><p>Use this tool in your browser.</p></div>
          <Link className="btn-primary" href={article.toolHref}>{article.toolLabel}</Link>
        </div>
        <h2>More guides</h2>
        <div className="guide-links">
          {more.map((item) => <Link key={item.slug} href={`/guides/${item.slug}`}>{item.title} →</Link>)}
        </div>
      </article>
    </main>
  );
}
