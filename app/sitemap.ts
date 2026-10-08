import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/invoice-generator`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/quote-generator`, changeFrequency: "monthly", priority: 0.9 },
  ];
}
