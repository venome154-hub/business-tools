export const LOCALES: [string, string][] = [
  ["en-US", "English (United States)"],
  ["en-GB", "English (United Kingdom)"],
  ["en-AU", "English (Australia)"],
  ["en-CA", "English (Canada)"],
  ["de-DE", "German"],
  ["fr-FR", "French"],
  ["es-ES", "Spanish"],
  ["it-IT", "Italian"],
  ["nl-NL", "Dutch"],
  ["pt-BR", "Portuguese (Brazil)"],
  ["pl-PL", "Polish"],
  ["sv-SE", "Swedish"],
  ["ja-JP", "Japanese"],
  ["zh-CN", "Chinese (Simplified)"],
];

export function currencyCodes() {
  const intl = Intl as typeof Intl & { supportedValuesOf?: (key: string) => string[] };
  if (typeof intl.supportedValuesOf === "function") return intl.supportedValuesOf("currency");
  return ["USD", "EUR", "GBP", "CAD", "AUD", "NZD", "CHF", "JPY", "INR", "AED", "ZAR"];
}

export function addDays(iso: string, days: number) {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return "";
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
