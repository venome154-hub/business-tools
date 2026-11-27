import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Free payment reminder generator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Payment reminder", "Draft a payment reminder email and copy it yourself.");
}
