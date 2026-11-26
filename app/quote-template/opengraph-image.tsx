import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Quote templates";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Quote templates", "Estimates with example lines for specific kinds of work.");
}
