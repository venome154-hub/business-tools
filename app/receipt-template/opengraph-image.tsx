import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Receipt templates";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Receipt templates", "Receipts for payments you have already received.");
}
