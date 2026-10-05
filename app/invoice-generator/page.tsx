import InvoiceGenerator from "@/components/InvoiceGenerator";

export const metadata = {
  title: "Free Invoice Generator — Create PDF Invoices Online",
  description: "Create a professional invoice online for free. Add your items, tax and discount, then download a PDF.",
};

export default function InvoicePage() {
  return (
    <main className="page">
      <div className="topbar">
        <a href="/" className="brand">BusinessTools</a>
        <span>Free Invoice Generator</span>
      </div>
      <InvoiceGenerator />
    </main>
  );
}