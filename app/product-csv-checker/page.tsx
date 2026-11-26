import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import CsvWorkbench from "@/components/CsvWorkbench";

export const metadata: Metadata = {
  title: "Shopify and WooCommerce Product CSV Checker",
  description: "Find a missing SKU, a missing price, or a duplicate product handle.",
  alternates: { canonical: "/product-csv-checker" },
  openGraph: { title: "Shopify and WooCommerce Product CSV Checker", description: "Find a missing SKU, a missing price, or a duplicate product handle.", type: "website", url: "/product-csv-checker" },
};

const faqs = [
    { question: "Which column names are recognized?", answer: "SKU or Variant SKU, and Price, Variant Price, or Regular price. Handles use the Handle column." },
    { question: "Does it fix the file?", answer: "No. It lists the issues so you can edit the export, and you can download that list." },
    { question: "Is the product file uploaded?", answer: "No. The check runs in your browser." },
];

export default function Page() {
  return (
    <ToolArticle name="Shopify and WooCommerce Product CSV Checker" path="/product-csv-checker" description="Find a missing SKU, a missing price, or a duplicate product handle." intro="Open a product export. The checker looks for a SKU column, a price column, blank values in those columns, and a repeated Shopify handle." faqs={faqs}>
      <CsvWorkbench mode="products" />
    </ToolArticle>
  );
}
