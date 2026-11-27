import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Contact BizToolsBox";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Contact", "Email Georgiy T. about bugs, privacy, or corrections.");
}
