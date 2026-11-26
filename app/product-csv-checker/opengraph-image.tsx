import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Shopify and WooCommerce Product CSV Checker";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Shopify and WooCommerce Product CSV Checker", "Find a missing SKU, a missing price, or a duplicate product handle.");
}
