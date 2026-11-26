export type InvoiceCountry = {
  slug: string;
  name: string;
  currency: string;
  locale: string;
  sourceName: string;
  sourceUrl: string;
  intro: string;
  fields: string[];
};

export const invoiceCountries: InvoiceCountry[] = [
  {
    slug: "united-states",
    name: "the United States",
    currency: "USD",
    locale: "en-US",
    sourceName: "IRS recordkeeping guidance",
    sourceUrl: "https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping",
    intro: "The United States does not have one national VAT invoice. Sales tax is set by states and sometimes by cities, and a seller may also need to keep ordinary business records. The list below is a common commercial set, not a ruling for your state.",
    fields: ["Seller name and contact details", "Buyer name", "Invoice date and a unique invoice number", "Description, quantity, and price", "Sales tax stated separately when you charge it", "Payment terms and the total due"],
  },
  {
    slug: "united-kingdom",
    name: "the United Kingdom",
    currency: "GBP",
    locale: "en-GB",
    sourceName: "GOV.UK VAT invoice guidance",
    sourceUrl: "https://www.gov.uk/vat-record-keeping/vat-invoices",
    intro: "UK invoices used by VAT-registered businesses usually need a unique number, the supplier VAT number, the tax point, and a breakdown of VAT. A business that is not VAT-registered does not invent a VAT number. Check whether your supply needs a full VAT invoice.",
    fields: ["Your business name, address, and VAT number if you are registered", "Customer name and address", "Invoice number and tax-point date", "Description and quantity", "Net amount, VAT rate, and VAT amount for each rate", "The total including VAT"],
  },
  {
    slug: "canada",
    name: "Canada",
    currency: "CAD",
    locale: "en-CA",
    sourceName: "CRA guidance on GST/HST receipts and invoices",
    sourceUrl: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate.html",
    intro: "Canadian invoices for GST/HST registrants generally identify the supplier and the registration number, and show the tax charged. Provinces can add their own sales-tax rules. This checklist is the common federal starting point.",
    fields: ["Supplier name and GST/HST number when you are registered", "Invoice date", "Buyer name", "Description of the supply", "Amount paid or due", "GST/HST shown separately when you charge it"],
  },
  {
    slug: "australia",
    name: "Australia",
    currency: "AUD",
    locale: "en-AU",
    sourceName: "Australian Taxation Office tax invoice guidance",
    sourceUrl: "https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/tax-invoices/",
    intro: "A tax invoice in Australia is a specific document for GST-registered sales, and it usually includes an ABN. Not every sale needs the words tax invoice. The ATO page explains when a tax invoice is required.",
    fields: ["The words 'tax invoice' when you are issuing one", "Seller identity and ABN", "Date and a description of the items", "Buyer identity when the sale is at or above the ATO threshold that requires it", "GST amount or a statement that the total includes GST", "The price of the supply"],
  },
  {
    slug: "ireland",
    name: "Ireland",
    currency: "EUR",
    locale: "en-IE",
    sourceName: "Revenue guidance on invoice information",
    sourceUrl: "https://www.revenue.ie/en/vat/vat-records-invoices-and-credit-notes/invoices/what-information-do-i-need-to-include-on-an-invoice.aspx",
    intro: "Irish VAT invoices have a set of particulars published by Revenue, including the supplier VAT number and the VAT breakdown. A business that is not registered for VAT should not copy those VAT fields for show.",
    fields: ["Supplier name, address, and VAT number if registered", "Customer name and address", "Invoice date and a sequential number", "Description and quantity", "Date of supply if it differs from the invoice date", "Unit price excluding VAT, the VAT rate, and the VAT payable"],
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    currency: "NZD",
    locale: "en-NZ",
    sourceName: "Inland Revenue taxable supply information",
    sourceUrl: "https://www.ird.govt.nz/gst/taxable-supply-information-for-gst",
    intro: "Since 1 April 2023, Inland Revenue asks GST-registered businesses to keep taxable supply information. A document can still be marked tax invoice. The details depend on the value of the supply, so use the IRD page rather than this summary alone.",
    fields: ["Seller name or trade name, and the GST number when the value requires it", "Invoice date, or the time of supply if there is no invoice", "Description of the goods or services", "Buyer name and an identifier when the value requires them", "The price, and the GST amount or a statement that GST is included when that is required", "Quantity when the supply is of goods and the rules for that value ask for it"],
  },
  {
    slug: "south-africa",
    name: "South Africa",
    currency: "ZAR",
    locale: "en-ZA",
    sourceName: "SARS VAT guidance",
    sourceUrl: "https://www.sars.gov.za/types-of-tax/value-added-tax/",
    intro: "A South African VAT vendor has to issue a tax invoice that meets SARS requirements before the recipient relies on it for input tax. The SARS VAT pages describe the particulars. A non-vendor should not label a document as a VAT tax invoice.",
    fields: ["The words 'tax invoice' for a VAT supply", "Supplier name, address, and VAT registration number", "A unique invoice number and the date", "Recipient name, address, and VAT number when required", "Description and quantity", "Value, VAT, and the consideration"],
  },
  {
    slug: "india",
    name: "India",
    currency: "INR",
    locale: "en-IN",
    sourceName: "GST portal",
    sourceUrl: "https://www.gst.gov.in/",
    intro: "India's GST tax invoice has particulars set under GST law, including the GSTIN and the place of supply for many invoices. E-invoicing applies only to taxpayers who meet the notified turnover. This page is a checklist, not a filing tool.",
    fields: ["Supplier name, address, and GSTIN", "A consecutive invoice number and the date", "Recipient name, address, and GSTIN when registered", "Place of supply", "Description, quantity, and taxable value", "Tax rate and amount, split as the rules for that supply require"],
  },
  {
    slug: "germany",
    name: "Germany",
    currency: "EUR",
    locale: "de-DE",
    sourceName: "UStG §14 on invoices",
    sourceUrl: "https://www.gesetze-im-internet.de/ustg_1980/__14.html",
    intro: "German invoices for VAT purposes follow section 14 of the Umsatzsteuergesetz. Small invoices have a shorter list than full invoices. The statute is the source; this checklist only names the fields people most often miss.",
    fields: ["Full supplier and customer names and addresses", "Supplier tax number or VAT identification number", "Invoice date and a unique number", "Description, quantity, and the time of supply", "Net amount by tax rate, the rate, and the tax amount", "Any note the law requires when a special scheme applies"],
  },
  {
    slug: "united-arab-emirates",
    name: "the United Arab Emirates",
    currency: "AED",
    locale: "en-AE",
    sourceName: "UAE Federal Tax Authority",
    sourceUrl: "https://tax.gov.ae/",
    intro: "UAE VAT tax invoices must meet Federal Tax Authority requirements, including the supplier tax registration number when the supplier is registered. E-invoicing rules are being phased in for some businesses. Confirm the current FTA notice before you rely on a template.",
    fields: ["Supplier name, address, and tax registration number if registered", "The words 'tax invoice' when you are issuing one", "Invoice date and a unique number", "Customer name and address, and their registration number when required", "Description, quantity, and unit price", "Tax rate, tax amount, and the gross amount"],
  },
];

export function getInvoiceCountry(slug: string) {
  return invoiceCountries.find((item) => item.slug === slug);
}
