import { getArticle } from "@/content/articles";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "BizToolsBox guide";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  return renderOg(article?.title ?? "Guide", article?.description ?? "A practical note on business paperwork.");
}
