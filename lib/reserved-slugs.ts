/** Slugs reserved for format landing pages. google-sheets is reserved for a later page. */
export const RESERVED_TEMPLATE_SLUGS = ["word", "google-docs", "excel", "pdf", "google-sheets"] as const;

export type ReservedTemplateSlug = (typeof RESERVED_TEMPLATE_SLUGS)[number];

export function isReservedTemplateSlug(slug: string) {
  return (RESERVED_TEMPLATE_SLUGS as readonly string[]).includes(slug);
}
