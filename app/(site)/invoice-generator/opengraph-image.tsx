import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Free invoice generator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Invoice generator", "Create a PDF invoice in your browser. Free, with no account.");
}
