import type { Metadata } from "next";
import Link from "next/link";
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
        {article.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
        <p>Use the <Link href={article.toolHref}>{article.toolLabel}</Link> when you want to do this on the site. The tool runs in your browser.</p>
        <h2>More guides</h2>
        <div className="guide-links">
          {more.map((item) => <Link key={item.slug} href={`/guides/${item.slug}`}>{item.title} →</Link>)}
        </div>
      </article>
    </main>
  );
}
