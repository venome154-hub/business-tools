export const SUPPORT_EMAIL = "support@biztoolsbox.online";
export const SITE_URL = "https://www.biztoolsbox.online";

/**
 * Optional "Make a copy" link for the Google Docs template pages.
 * Leave this empty until a brand-only Google account supplies the URL.
 * An empty value hides the button. Do not put a personal name or location in the link.
 */
export const GOOGLE_DOCS_COPY_URL = "";

export function titled(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const value = configuredUrl || SITE_URL;
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/$/, "");
}
