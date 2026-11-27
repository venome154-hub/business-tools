import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "BizToolsBox privacy";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Privacy", "How the free tools handle what you type and which files you open.");
}
