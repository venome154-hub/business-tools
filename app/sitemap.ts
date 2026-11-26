import type { MetadataRoute } from "next";
import { updatedAt } from "@/content/updated-at";
import { lastModifiedFor } from "@/lib/sitemap-dates";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  return Object.keys(updatedAt).map((path) => {
    const lastModified = lastModifiedFor(path, updatedAt);
    const url = path === "/" ? site : `${site}${path}`;
    return lastModified ? { url, lastModified } : { url };
  });
}
