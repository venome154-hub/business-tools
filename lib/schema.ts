import { getSiteUrl, SUPPORT_EMAIL } from "@/lib/site";

export type FaqItem = { question: string; answer: string };

export function organizationLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BizToolsBox",
    url,
    email: SUPPORT_EMAIL,
    founder: { "@type": "Person", name: "Georgiy T." },
  };
}

export function websiteLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BizToolsBox",
    url,
    publisher: { "@type": "Organization", name: "BizToolsBox", url },
  };
}

export function webApplicationLd(name: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `${getSiteUrl()}${path}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    browserRequirements: "Requires a modern web browser",
  };
}

export function faqLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  const site = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? site : `${site}${item.path}`,
    })),
  };
}

export function articleLd(headline: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished: "2026-10-08",
    dateModified: "2026-11-26",
    author: { "@type": "Person", name: "Georgiy T." },
    publisher: { "@type": "Organization", name: "BizToolsBox", url: getSiteUrl() },
    mainEntityOfPage: `${getSiteUrl()}${path}`,
  };
}
