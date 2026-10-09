import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/invoice-generator`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/quote-generator`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/receipt-generator`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/payment-reminder-generator`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/guides`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/guides/invoice-vs-quote`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/guides/how-to-write-an-invoice`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
