import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Free receipt generator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Receipt generator", "Record a payment and download a receipt PDF.");
}
