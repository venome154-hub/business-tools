import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Free quote generator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Quote generator", "Create a project estimate PDF in your browser.");
}
