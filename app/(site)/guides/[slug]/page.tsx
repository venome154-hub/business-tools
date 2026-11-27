import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import ContextualLinks from "@/components/ContextualLinks";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { articles, getArticle } from "@/content/articles";
import { breadcrumbItems } from "@/lib/breadcrumbs";
import { linksFor } from "@/lib/related";
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
  const path = `/guides/${article.slug}`;
  const primary = linksFor(path)?.tools[0];
  return (
    <main className="page">
      <JsonLd data={[articleLd(article.title, article.description, path), breadcrumbLd(breadcrumbItems(path) ?? [])]} />
      <article className="seo-content">
        <h1>{article.title}</h1>
        {primary && <p className="guide-cta"><Link className="btn-primary" href={primary.href}>Try the {primary.label}</Link></p>}
        <nav aria-label="On this page">
          <h2>On this page</h2>
          <ol>
            {article.paragraphs.slice(0, 3).map((paragraph, index) => <li key={paragraph.slice(0, 24)}><a href={`#section-${index + 1}`}>{paragraph.split(". ")[0]}</a></li>)}
          </ol>
        </nav>
        {article.paragraphs.map((paragraph, index) => <p id={index < 3 ? `section-${index + 1}` : undefined} key={paragraph.slice(0, 40)}>{paragraph}</p>)}
        <AdSlot place="in-article" />
      </article>
      <ContextualLinks path={path} />
    </main>
  );
}
