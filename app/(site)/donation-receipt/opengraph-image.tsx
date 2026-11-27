import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Free Donation Receipt Generator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Free Donation Receipt Generator", "Create a generic donation receipt PDF. Tax rules vary.");
}
