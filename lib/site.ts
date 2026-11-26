export const SUPPORT_EMAIL = "support@biztoolsbox.online";

export function titled(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  const productionUrl = process.env.VERCEL_ENV === "production" ? "https://www.biztoolsbox.online" : undefined;
  const value = configuredUrl ?? productionUrl ?? (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/$/, "");
}
