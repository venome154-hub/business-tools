export type DecimalItem = { description: string; quantity: string; price: string };

export type PricedLine = {
  description: string;
  quantityLabel: string;
  quantity: number;
  price: number;
  amount: number;
};

export function roundMoney(value: number) {
  if (!Number.isFinite(value)) return 0;
  const rounded = Number(value.toFixed(2));
  return Object.is(rounded, -0) ? 0 : rounded;
}

export function parseDecimal(value: string) {
  const normalized = value.trim();
  if (!normalized || normalized === ".") return 0;
  const amount = Number(normalized);
  return Number.isFinite(amount) ? Math.max(0, amount) : 0;
}

export function sanitizeDecimal(value: string) {
  const cleaned = value.replace(/[^\d.]/g, "");
  const dot = cleaned.indexOf(".");
  if (dot === -1) return cleaned;
  return `${cleaned.slice(0, dot + 1)}${cleaned.slice(dot + 1).replace(/\./g, "")}`;
}

export function acceptDecimal(raw: string, max?: number): { value?: string; error: string } {
  if (raw.trim() === "") return { value: "", error: "" };
  if (raw.includes("-")) return { error: "Enter a number that is 0 or greater." };
  if (!/^\d*\.?\d*$/.test(raw)) return { error: "Use digits and one decimal point." };
  if (raw === "." || raw.endsWith(".")) return { value: raw, error: "" };
  const amount = Number(raw);
  if (!Number.isFinite(amount)) return { error: "Enter a valid number." };
  if (max !== undefined && amount > max) return { value: String(max), error: "Enter a percentage from 0 to 100." };
  return { value: raw, error: "" };
}

export function sanitizePercent(value: string, max = 100) {
  const sanitized = sanitizeDecimal(value);
  if (sanitized === "" || sanitized.endsWith(".")) return sanitized;
  const amount = Number(sanitized);
  if (!Number.isFinite(amount)) return "";
  if (amount > max) return String(max);
  return sanitized;
}

export function formatMoney(amount: number, currency: string, locale = "en-US") {
  const value = roundMoney(amount);
  const code = currency.trim().toUpperCase();
  if (!/^[A-Z]{3}$/.test(code)) return value.toFixed(2);
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency: code }).format(value);
  } catch {
    return value.toFixed(2);
  }
}

export function decimalLabel(value: string) {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "." || trimmed.endsWith(".")) return String(parseDecimal(trimmed));
  return trimmed;
}

export function localDate() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

export function displayDate(value: string, locale = "en-US") {
  if (!value) return "";
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return "";
  return new Date(year, month - 1, day).toLocaleDateString(locale, {
    month: "short", day: "numeric", year: "numeric",
  });
}

export function priceLines(items: DecimalItem[]) {
  const lines: PricedLine[] = items.map((item) => {
    const quantity = parseDecimal(item.quantity);
    const price = parseDecimal(item.price);
    return {
      description: item.description,
      quantityLabel: decimalLabel(item.quantity),
      quantity,
      price,
      amount: roundMoney(quantity * price),
    };
  });
  const subtotal = roundMoney(lines.reduce((sum, line) => sum + line.amount, 0));
  return { lines, subtotal };
}

export function applyTaxAndDiscount(subtotal: number, taxInput: string, discountInput: string) {
  const discountRate = Math.min(100, parseDecimal(discountInput));
  const discountAmount = roundMoney(subtotal * (discountRate / 100));
  const taxable = roundMoney(Math.max(0, subtotal - discountAmount));
  const taxRate = Math.min(100, parseDecimal(taxInput));
  const taxAmount = roundMoney(taxable * (taxRate / 100));
  const total = roundMoney(taxable + taxAmount);
  return { discountRate, discountAmount, taxable, taxRate, taxAmount, total };
}
