import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "BizToolsBox refund policy";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Refund policy", "Nothing is sold, so there is nothing to refund.");
}
