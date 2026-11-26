import { getIndustry } from "@/content/industries";
import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { titled } from "@/lib/site";

export const alt = "Invoice template";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const item = getIndustry(industry);
  return renderOg(item ? `${titled(item.name)} invoice template` : "Invoice template", "Example lines and a free invoice generator in your browser.");
}
