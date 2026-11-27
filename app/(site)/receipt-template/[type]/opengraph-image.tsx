import { getReceiptType } from "@/content/receipt-types";
import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { titled } from "@/lib/site";

export const alt = "Receipt template";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const item = getReceiptType(type);
  return renderOg(item ? `${titled(item.name)} receipt template` : "Receipt template", "Record a payment you have already received.");
}
