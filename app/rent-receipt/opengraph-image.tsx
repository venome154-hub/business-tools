import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Free Rent Receipt Generator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Free Rent Receipt Generator", "Write a rent receipt PDF for a payment you received.");
}
