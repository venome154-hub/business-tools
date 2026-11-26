import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();

const pages = [
  { dir: "purchase-order", kind: "doc", slug: "purchase-order", title: "Free Purchase Order Generator", description: "Create a supplier purchase order PDF in your browser. No account.", intro: "List what you are ordering, the vendor, quantities, and prices. The purchase order is built on this device and downloaded as a PDF.", faqs: [
    ["Is this purchase order free?", "Yes. You can fill it in and download a PDF without an account."],
    ["Does it place the order with the vendor?", "No. It only creates the document. You send the PDF yourself."],
    ["Where is the purchase order saved?", "If you download or choose Save on this device, a copy stays in this browser. It is not uploaded."],
  ]},
  { dir: "credit-note", kind: "doc", slug: "credit-note", title: "Free Credit Note Generator", description: "Create a credit note PDF for an amount credited against an invoice.", intro: "Use a credit note when you reduce what a customer owes. Enter the related invoice number, the credited items, and download the PDF.", faqs: [
    ["Is a credit note a receipt?", "No. A credit note records an amount credited. A receipt records a payment received."],
    ["Can I link it to an invoice?", "Yes. Add the related invoice number so it appears on the PDF."],
    ["Is the credit note uploaded?", "No. The PDF is created in your browser."],
  ]},
  { dir: "delivery-note", kind: "doc", slug: "delivery-note", title: "Free Delivery Note and Packing Slip", description: "Create a delivery note PDF that lists quantities for a shipment.", intro: "A delivery note, sometimes called a packing slip, lists what is in a shipment. This version shows descriptions and quantities rather than a request for payment.", faqs: [
    ["Does the packing slip show prices?", "No. It lists the items and quantities so the recipient can check the shipment."],
    ["Can I add a purchase order number?", "Yes. The PO number is printed with the delivery details."],
    ["Is the file uploaded?", "No. The PDF is created on your device."],
  ]},
  { dir: "timesheet-invoice", kind: "doc", slug: "timesheet", title: "Free Timesheet Invoice Generator", description: "Bill hours times a rate and download a timesheet invoice PDF.", intro: "Enter the hours and the rate for each piece of work. The line amount is hours multiplied by the rate, then tax, discount, and balance are calculated in the browser.", faqs: [
    ["How is the line total calculated?", "Each line is hours multiplied by the rate you enter."],
    ["Can I add tax?", "Yes. Use one tax rate for the invoice, or tax each line separately."],
    ["Is this a payroll system?", "No. It creates an invoice PDF from the hours and rates you type."],
  ]},
  { dir: "rent-receipt", kind: "doc", slug: "rent-receipt", title: "Free Rent Receipt Generator", description: "Write a rent receipt PDF for a payment you received.", intro: "Record the tenant, the property, the rent period, and the amount you received. Download a PDF for your records.", faqs: [
    ["Does this collect rent?", "No. It writes a receipt for rent you already received."],
    ["Can I name the property and period?", "Yes. Both appear on the receipt."],
    ["Is the receipt stored online?", "No. It stays in this browser unless you download the PDF."],
  ]},
  { dir: "donation-receipt", kind: "doc", slug: "donation-receipt", title: "Free Donation Receipt Generator", description: "Create a generic donation receipt PDF. Tax rules vary.", intro: "Record the donor, the amount, and the date. The PDF includes a note that tax rules vary and that this document does not decide whether a gift is deductible.", faqs: [
    ["Does this prove a donation is tax-deductible?", "No. Deductibility depends on local rules and on the organization. Check the authority that applies to you."],
    ["Who is the receipt for?", "It is a record of a donation you report as received."],
    ["Is donor information uploaded?", "No. The receipt is created in your browser."],
  ]},
  { dir: "profit-margin-calculator", kind: "calc", slug: "profit-margin", title: "Profit Margin Calculator", description: "Calculate profit margin from cost and selling price in your browser.", intro: "Margin is the share of the selling price that is left after cost. Enter cost and selling price. The percentage is (price − cost) ÷ price.", faqs: [
    ["What is profit margin?", "It is the profit divided by the selling price, shown as a percentage."],
    ["How is this different from markup?", "Margin uses the selling price as the base. Markup uses the cost as the base."],
    ["Are the numbers saved?", "No. The calculation runs in this browser and is not sent to a server."],
  ]},
  { dir: "markup-calculator", kind: "calc", slug: "markup", title: "Markup Calculator", description: "Calculate markup from cost and selling price.", intro: "Markup is the amount added to cost, divided by that cost. A 50% markup on a 100 cost is a 150 selling price.", faqs: [
    ["What is markup?", "Markup is (selling price − cost) ÷ cost."],
    ["Can markup and margin be the same number?", "Only in special cases. A 100% markup is a 50% margin."],
    ["Do I need an account?", "No. The calculator runs in your browser."],
  ]},
  { dir: "sales-tax-calculator", kind: "calc", slug: "sales-tax", title: "Sales Tax Calculator", description: "Add or remove VAT, GST, or sales tax from an amount.", intro: "Enter an amount and a rate to add tax on top, or to pull tax back out of a tax-inclusive price. The rate is capped at 100%.", faqs: [
    ["Can I remove tax from a gross price?", "Yes. Choose Remove tax. The net amount is the gross price divided by 1 plus the rate."],
    ["Which tax does this use?", "It uses the rate you type. It does not look up a VAT or GST rate for you."],
    ["Is this tax advice?", "No. It is arithmetic. Confirm the rate with the rules that apply to the sale."],
  ]},
  { dir: "freelance-rate-calculator", kind: "calc", slug: "freelance-rate", title: "Freelance Hourly Rate Calculator", description: "Estimate an hourly rate from an income goal, expenses, weeks, and hours.", intro: "Add the yearly income you want to the yearly business expenses, then divide by billable hours. Billable hours are working weeks times hours per week.", faqs: [
    ["What does the hourly rate include?", "It spreads your income goal and business expenses across the billable hours you enter."],
    ["Should I include vacation weeks?", "Enter only the weeks you expect to bill. Unpaid weeks lower the hour count and raise the rate."],
    ["Does this set my client price?", "No. It is a planning figure. Your quote can still differ by project."],
  ]},
  { dir: "late-fee-calculator", kind: "calc", slug: "late-fee", title: "Late Payment Fee Calculator", description: "Estimate a simple annual late fee for an unpaid invoice.", intro: "The fee is the unpaid amount times the annual rate times days late, divided by 365. It is a simple estimate, not a statutory interest calculation.", faqs: [
    ["How is the fee calculated?", "Amount × annual rate × days ÷ 365."],
    ["Does this apply a legal interest rate?", "No. You enter the rate. Check the contract and the rules that apply before you charge a fee."],
    ["Can I put the note on an invoice?", "The invoice generator has a late-fee note field. This page only calculates a figure."],
  ]},
  { dir: "break-even-calculator", kind: "calc", slug: "break-even", title: "Break-even Calculator", description: "Estimate how many units cover fixed costs.", intro: "Break-even units equal fixed costs divided by the amount left from the price after variable cost. If the price is not higher than the variable cost, there is no break-even point.", faqs: [
    ["What is a break-even point?", "It is the number of units where revenue covers fixed costs and the variable cost of those units."],
    ["What if price is below variable cost?", "The calculator does not return a unit count, because each sale would add to the loss."],
    ["Does it include tax?", "No. Enter figures on the same basis you want to compare."],
  ]},
  { dir: "discount-calculator", kind: "calc", slug: "discount", title: "Discount Calculator", description: "Take a percentage off a price.", intro: "Enter the original price and a discount percent from 0 to 100. The result is the amount off and the price after the discount.", faqs: [
    ["Can the discount be more than 100%?", "No. A discount above 100% is reduced to 100%."],
    ["Does this stack discounts?", "No. It applies one percentage to the original price."],
    ["Where can I put this on an invoice?", "The invoice and quote generators have a discount percent that applies to the subtotal."],
  ]},
  { dir: "invoice-due-date-calculator", kind: "calc", slug: "due-date", title: "Invoice Due Date Calculator", description: "Add net days to an invoice issue date.", intro: "Choose the issue date and the number of days, such as 7, 15, or 30. The due date is that many days later on the calendar.", faqs: [
    ["What does net 30 mean?", "It means payment is due 30 days after the invoice date, unless the agreement says otherwise."],
    ["Does the count include the issue date?", "The due date is the issue date plus the number of days you enter."],
    ["Can the invoice generator do this?", "Yes. Net 7, Net 15, and Net 30 on the invoice set the due date from the issue date."],
  ]},
  { dir: "csv-excel", kind: "csv", slug: "excel", title: "CSV and Excel Converter", description: "Convert CSV to Excel or Excel to CSV in your browser.", intro: "Open a CSV or an .xlsx file. Download the other format without uploading the spreadsheet.", faqs: [
    ["Is the spreadsheet uploaded?", "No. SheetJS reads and writes the file in your browser."],
    ["Which Excel files work?", "The tool reads .xlsx and .xls and writes .xlsx."],
    ["What if the CSV is not UTF-8?", "If the bytes are not valid UTF-8, the file is read as Windows-1252."],
  ]},
  { dir: "csv-to-json", kind: "csv", slug: "json", title: "CSV to JSON Converter", description: "Turn a CSV header row into JSON keys in your browser.", intro: "The first row becomes the keys. Each following row becomes an object. Empty rows are left out of the JSON file.", faqs: [
    ["Are the values strings?", "Yes. Cells are written as text, including numbers."],
    ["What if two columns share a name?", "The later column overwrites the earlier one in that object."],
    ["Is the file uploaded?", "No. Conversion happens on your device."],
  ]},
  { dir: "split-csv", kind: "csv", slug: "split", title: "Split CSV by Rows", description: "Split a CSV into smaller files that keep the header row.", intro: "Choose how many data rows each file should hold. Every part keeps the original header. Download each part separately.", faqs: [
    ["Does each file include the header?", "Yes. The first row is copied onto every part."],
    ["Why is there a button per part?", "Browsers often block a burst of automatic downloads, so each part has its own button."],
    ["Can I split an Excel file?", "Yes. An .xlsx file is read in the browser first."],
  ]},
  { dir: "csv-columns", kind: "csv", slug: "columns", title: "Remove and Reorder CSV Columns", description: "Drop columns and change their order, then download the CSV.", intro: "Uncheck a column to remove it. Use Up and Down to change the order, then download the sheet.", faqs: [
    ["Does this edit the original file?", "No. The download is a new file. The file on your device is unchanged."],
    ["Can I reorder columns?", "Yes. Up and Down move the selected column."],
    ["Are empty headers kept?", "A column stays available until you uncheck it, even if the header cell is blank."],
  ]},
  { dir: "csv-find-replace", kind: "csv", slug: "replace", title: "Find and Replace in a CSV", description: "Replace text in one CSV column or in every column.", intro: "Search the data rows, optionally in a single column, and write the replacement into a new CSV. The header row is left as it is.", faqs: [
    ["Does find and replace change the header?", "No. Only data rows are changed."],
    ["Can I match case?", "Yes. Turn on Match case when the capital letters matter."],
    ["Is the sheet uploaded?", "No. The replacement runs in your browser."],
  ]},
  { dir: "csv-join", kind: "csv", slug: "join", title: "Join Two CSVs by Key", description: "Combine two CSV files by a shared key, like VLOOKUP.", intro: "Every row from the first file is kept. Matching rows from the second file add their other columns. A missing key leaves those cells blank.", faqs: [
    ["Which file keeps all of its rows?", "The first file. Rows that do not match still appear, with empty cells from the second file."],
    ["Is the match case-sensitive?", "No. Keys are compared after trimming spaces and ignoring letter case."],
    ["Do both files need the same headers?", "No. You choose the key column in each file."],
  ]},
  { dir: "product-csv-checker", kind: "csv", slug: "products", title: "Shopify and WooCommerce Product CSV Checker", description: "Find a missing SKU, a missing price, or a duplicate product handle.", intro: "Open a product export. The checker looks for a SKU column, a price column, blank values in those columns, and a repeated Shopify handle.", faqs: [
    ["Which column names are recognized?", "SKU or Variant SKU, and Price, Variant Price, or Regular price. Handles use the Handle column."],
    ["Does it fix the file?", "No. It lists the issues so you can edit the export, and you can download that list."],
    ["Is the product file uploaded?", "No. The check runs in your browser."],
  ]},
];

function page(entry) {
  const child = entry.kind === "doc"
    ? `<DocumentStudio kind="${entry.slug}" />`
    : entry.kind === "calc"
      ? `<CalculatorTool slug="${entry.slug}" />`
      : `<CsvWorkbench mode="${entry.slug}" />`;
  const imports = entry.kind === "doc"
    ? `import DocumentStudio from "@/components/DocumentStudio";`
    : entry.kind === "calc"
      ? `import CalculatorTool from "@/components/CalculatorTool";`
      : `import CsvWorkbench from "@/components/CsvWorkbench";`;
  const faqs = entry.faqs.map(([question, answer]) => `    { question: ${JSON.stringify(question)}, answer: ${JSON.stringify(answer)} },`).join("\n");
  return `import type { Metadata } from "next";
import ToolArticle from "@/components/ToolArticle";
${imports}

export const metadata: Metadata = {
  title: ${JSON.stringify(entry.title)},
  description: ${JSON.stringify(entry.description)},
  alternates: { canonical: ${JSON.stringify("/" + entry.dir)} },
  openGraph: { title: ${JSON.stringify(entry.title)}, description: ${JSON.stringify(entry.description)}, type: "website", url: ${JSON.stringify("/" + entry.dir)} },
};

const faqs = [
${faqs}
];

export default function Page() {
  return (
    <ToolArticle name=${JSON.stringify(entry.title)} path=${JSON.stringify("/" + entry.dir)} description=${JSON.stringify(entry.description)} intro=${JSON.stringify(entry.intro)} faqs={faqs}>
      ${child}
    </ToolArticle>
  );
}
`;
}

function og(title, subtitle) {
  return `import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = ${JSON.stringify(title)};
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg(${JSON.stringify(title)}, ${JSON.stringify(subtitle)});
}
`;
}

for (const entry of pages) {
  const dir = join(root, "app", entry.dir);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "page.tsx"), page(entry));
  writeFileSync(join(dir, "opengraph-image.tsx"), og(entry.title, entry.description));
}

const docsDir = join(root, "app", "my-documents");
mkdirSync(docsDir, { recursive: true });
writeFileSync(join(docsDir, "page.tsx"), `import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import MyDocuments from "@/components/MyDocuments";
import { breadcrumbLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "My Documents",
  description: "Open, duplicate, or delete the latest documents saved in this browser.",
  alternates: { canonical: "/my-documents" },
  openGraph: { title: "My Documents", description: "Documents saved on this device.", type: "website", url: "/my-documents" },
};

export default function Page() {
  return (
    <main className="page">
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "My documents", path: "/my-documents" }])} />
      <MyDocuments />
    </main>
  );
}
`);
writeFileSync(join(docsDir, "opengraph-image.tsx"), og("My documents", "The latest documents saved in this browser."));
console.log("wrote", pages.length + 1, "pages");
