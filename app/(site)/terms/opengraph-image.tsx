import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "BizToolsBox terms";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Terms of use", "Free use, your documents, and the limits of these tools.");
}
