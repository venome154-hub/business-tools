import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Free Delivery Note and Packing Slip";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Free Delivery Note and Packing Slip", "Create a delivery note PDF that lists quantities for a shipment.");
}
