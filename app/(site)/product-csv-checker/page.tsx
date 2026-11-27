import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
import CsvWorkbench from "@/components/CsvWorkbench";

export const metadata: Metadata = {
  title: "Shopify and WooCommerce Product CSV Checker",
  description: "Check a Shopify or WooCommerce product CSV before import: find missing SKUs, missing prices and duplicate handles. Free, runs in your browser.",
  alternates: { canonical: "/product-csv-checker" },
  openGraph: { title: "Shopify and WooCommerce Product CSV Checker", description: "Check a Shopify or WooCommerce product CSV before import: find missing SKUs, missing prices and duplicate handles. Free, runs in your browser.", type: "website", url: "/product-csv-checker" },
};

const faqs = [
    { question: "Which column names are recognized?", answer: "SKU or Variant SKU, and Price, Variant Price, or Regular price. Handles use the Handle column. Title and option value columns are used only to tell a real second product from variant rows." },
    { question: "Does it fix the file?", answer: "No. It lists the issues so you can edit the export, and you can download that list." },
    { question: "Is the product file uploaded?", answer: "No. The check runs in your browser." },
];

export default function Page() {
  return (
    <ToolArticle name="Shopify and WooCommerce Product CSV Checker" path="/product-csv-checker" description="Check a Shopify or WooCommerce product CSV before import: find missing SKUs, missing prices and duplicate handles. Free, runs in your browser." intro="Open a product export. The checker lists a missing SKU, a missing or non-numeric price, a SKU used on more than one row, and a handle that looks like two products. Variant rows that share a handle and leave Title empty are not treated as a second product." faqs={faqs}>
      <CsvWorkbench mode="products" />
    </ToolArticle>
  );
}
