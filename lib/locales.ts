export const LOCALES: [string, string][] = [
  ["en-US", "English (United States)"],
  ["en-GB", "English (United Kingdom)"],
  ["en-AU", "English (Australia)"],
  ["en-CA", "English (Canada)"],
  ["en-IE", "English (Ireland)"],
  ["en-NZ", "English (New Zealand)"],
  ["en-ZA", "English (South Africa)"],
  ["en-IN", "English (India)"],
  ["en-AE", "English (United Arab Emirates)"],
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

export type CurrencyOption = { code: string; name: string; label: string };

const FALLBACK_CURRENCY_CODES = ["USD", "EUR", "GBP", "CAD", "AUD", "NZD", "CHF", "JPY", "INR", "AED", "ZAR", "UZS"];

export function currencyCodes() {
  const intl = Intl as typeof Intl & { supportedValuesOf?: (key: string) => string[] };
  if (typeof intl.supportedValuesOf === "function") return intl.supportedValuesOf("currency");
  return FALLBACK_CURRENCY_CODES;
}

export function currencyOptions(): CurrencyOption[] {
  let names: Intl.DisplayNames | null = null;
  try {
    names = new Intl.DisplayNames(["en"], { type: "currency" });
  } catch {
    names = null;
  }
  return currencyCodes().map((code) => {
    let name = code;
    if (names) {
      try {
        const display = names.of(code);
        if (display) name = display;
      } catch {
        name = code;
      }
    }
    return { code, name, label: `${code} — ${name}` };
  });
}

export function isCurrencyCode(value: string) {
  return currencyCodes().includes(value.trim().toUpperCase());
}

function foldCurrencySearch(value: string) {
  return value.toLowerCase().replace(/sum/g, "som");
}

export function matchCurrencies(options: CurrencyOption[], raw: string, limit = 12) {
  const query = raw.trim().toLowerCase();
  if (!query) return options.slice(0, limit);
  const foldedQuery = foldCurrencySearch(query);
  return options
    .map((option) => {
      const code = option.code.toLowerCase();
      const name = foldCurrencySearch(option.name);
      const words = name.split(/[^a-z0-9]+/);
      let rank = 6;
      if (code === query) rank = 0;
      else if (code.startsWith(query)) rank = 1;
      else if (name.startsWith(foldedQuery)) rank = 2;
      else if (words.some((word) => word === foldedQuery)) rank = 3;
      else if (words.some((word) => word.startsWith(foldedQuery))) rank = 4;
      else if (code.includes(query) || name.includes(foldedQuery)) rank = 5;
      return { option, rank };
    })
    .filter((item) => item.rank < 6)
    .sort((a, b) => a.rank - b.rank || a.option.code.localeCompare(b.option.code))
    .slice(0, limit)
    .map((item) => item.option);
}

export function addDays(iso: string, days: number) {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return "";
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
