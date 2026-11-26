import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "About BizToolsBox";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("About", "Free browser-only tools built by Georgiy T.");
}
