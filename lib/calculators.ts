import { addDays } from "@/lib/locales";
import { parseDecimal, roundMoney } from "@/lib/format";

export type CalcSlug = "profit-margin" | "markup" | "sales-tax" | "freelance-rate" | "late-fee" | "break-even" | "discount" | "due-date";

export function profitMargin(cost: string, price: string) {
  const selling = parseDecimal(price);
  if (!selling) return null;
  return roundMoney(((selling - parseDecimal(cost)) / selling) * 100);
}

export function markup(cost: string, price: string) {
  const base = parseDecimal(cost);
  if (!base) return null;
  return roundMoney(((parseDecimal(price) - base) / base) * 100);
}

export function salesTax(amount: string, rate: string, mode: "add" | "remove") {
  const value = parseDecimal(amount);
  const taxRate = Math.min(100, parseDecimal(rate)) / 100;
  if (mode === "add") {
    const tax = roundMoney(value * taxRate);
    return { net: value, tax, gross: roundMoney(value + tax) };
  }
  const net = roundMoney(value / (1 + taxRate));
  return { net, tax: roundMoney(value - net), gross: value };
}

export function freelanceRate(income: string, expenses: string, weeks: string, hours: string) {
  const billable = parseDecimal(weeks) * parseDecimal(hours);
  if (!billable) return null;
  return roundMoney((parseDecimal(income) + parseDecimal(expenses)) / billable);
}

export function lateFee(amount: string, rate: string, days: string) {
  const fee = roundMoney(parseDecimal(amount) * (Math.min(100, parseDecimal(rate)) / 100) * (parseDecimal(days) / 365));
  return { fee, total: roundMoney(parseDecimal(amount) + fee) };
}

export function breakEven(fixed: string, price: string, variable: string) {
  const margin = parseDecimal(price) - parseDecimal(variable);
  if (margin <= 0) return null;
  return roundMoney(parseDecimal(fixed) / margin);
}

export function discountPrice(price: string, rate: string) {
  const base = parseDecimal(price);
  const off = roundMoney(base * (Math.min(100, parseDecimal(rate)) / 100));
  return { off, total: roundMoney(base - off) };
}

export function dueDate(issued: string, days: string) {
  if (!issued) return "";
  return addDays(issued, Math.round(parseDecimal(days)));
}
