export const SUPPORT_EMAIL = "support@biztoolsbox.online";
export const SITE_URL = "https://www.biztoolsbox.online";

export function titled(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const value = configuredUrl || SITE_URL;
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/$/, "");
}
