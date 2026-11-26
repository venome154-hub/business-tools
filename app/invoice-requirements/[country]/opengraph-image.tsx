import { getInvoiceCountry } from "@/content/countries";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Invoice requirements";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const item = getInvoiceCountry(country);
  return renderOg(item ? `Invoice fields: ${item.name}` : "Invoice requirements", "A checklist and a link to the official source.");
}
