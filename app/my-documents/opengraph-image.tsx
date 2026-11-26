import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "My documents";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("My documents", "The latest documents saved in this browser.");
}
