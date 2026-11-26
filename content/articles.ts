export type GuideArticle = {
  slug: string;
  title: string;
  description: string;
  toolHref: string;
  toolLabel: string;
  paragraphs: string[];
};

export const articles: GuideArticle[] = [
  {
    slug: "how-to-invoice-as-a-freelancer",
    title: "How to invoice as a freelancer",
    description: "What a freelancer should put on an invoice before sending it to a client.",
    toolHref: "/invoice-generator",
    toolLabel: "invoice generator",
    paragraphs: [
      "A freelance invoice is a request for a specific amount, tied to work the client can recognise. Start with your name, the client’s name, a unique invoice number, and the date. Then describe the work in the words you used in the quote: the page, the session, the month of the retainer, or the stage of the build.",
      "Price the unit you agreed. Hours need a quantity. A fixed milestone is a quantity of one with a description of the milestone. Add tax only when you are charging it, and name the payment method in the instructions: bank details, a payment link, or the rule that payment is due on receipt.",
      "If the client already paid a deposit, enter that amount as amount paid so the balance is what you still expect. Do not describe unpaid future work as if it were delivered. Send the invoice when the agreed trigger happens, such as delivery or the end of the month.",
      "Keep a copy. BizToolsBox builds the PDF in your browser and can keep the latest documents on this device. It does not send the invoice to your client or store it on a BizToolsBox account.",
    ],
  },
  {
    slug: "what-net-30-means",
    title: "What net 30 means",
    description: "How to read net 7, net 15, and net 30 on an invoice.",
    toolHref: "/invoice-due-date-calculator",
    toolLabel: "due date calculator",
    paragraphs: [
      "Net 30 means the client is expected to pay within 30 days of the invoice date, unless the contract defines a different start date. Net 7 and net 15 are the same idea with shorter periods. Due on receipt means you are asking for payment immediately.",
      "The count is only as clear as the invoice date. If you issue the invoice on the day you finish the work, net 30 runs from that day. If your agreement says payment runs from the end of the month, the invoice should say that, because the phrase net 30 alone does not carry every local custom.",
      "Put the due date on the invoice as a calendar date, not only the words net 30. People miss a due date that they have to calculate. The invoice generator can set the date from Net 7, Net 15, or Net 30, and the due-date calculator does the same arithmetic on its own.",
      "A due date is not a late fee. Charging interest or a penalty needs a term you actually agreed. The calculator estimates a simple fee; it does not supply a legal rate.",
    ],
  },
  {
    slug: "how-to-write-a-late-payment-email",
    title: "How to write a late payment email",
    description: "A plain structure for chasing an unpaid invoice without hiding the amount or the date.",
    toolHref: "/payment-reminder-generator",
    toolLabel: "payment reminder generator",
    paragraphs: [
      "A late-payment email should name the invoice number, the amount still outstanding, and the due date. The reader should not have to open an attachment to learn what you are asking. Attach the invoice anyway so they can pay from the original document.",
      "Match the tone to the relationship and to how late the invoice is. A first note can assume the invoice was missed. A later note can be shorter and firmer, and it can repeat the payment instructions. Avoid threats you do not intend to carry out.",
      "Say how you want to be paid, using the same bank details or link as the invoice. If part of the bill was already paid, ask only for the remainder. One clear amount is easier to pay than a trail of earlier messages.",
      "The payment reminder generator drafts that email in your browser. It does not send the message. Copy it into your own mail app after you check the figures.",
    ],
  },
  {
    slug: "quote-vs-estimate-vs-proposal",
    title: "Quote vs estimate vs proposal",
    description: "How a quote, an estimate, and a proposal differ before any invoice exists.",
    toolHref: "/quote-generator",
    toolLabel: "quote generator",
    paragraphs: [
      "An estimate is an early figure when the scope is still loose. A quote is a price you are willing to stand behind for a described scope, usually until a validity date. A proposal is the story around the work: approach, timeline, and price. People use the words loosely, so the document should say which one it is.",
      "If you need the price to be the part the client accepts, use a quote and list the lines, the exclusions, and the date it expires. A proposal that hides the price in a paragraph is harder to turn into an invoice later.",
      "When the client accepts, the invoice should reuse the same line descriptions. New work found later is a variation, not a silent change to the old total. The quote generator can pass the lines into the invoice generator on this device.",
      "None of these documents signs a contract by itself. If you need a signature with legal effect, use the process your agreement requires. The Accepted by line is a name on the PDF.",
    ],
  },
  {
    slug: "how-to-clean-a-shopify-product-csv",
    title: "How to clean a Shopify product CSV",
    description: "What to check in a Shopify product export before you import it again.",
    toolHref: "/product-csv-checker",
    toolLabel: "product CSV checker",
    paragraphs: [
      "A Shopify product CSV uses a handle to group rows that belong to one product, and variant rows for each option. Before you import, look for an empty Variant SKU, an empty Variant Price, and a handle that appears on two different products by mistake.",
      "Do not delete the header row. Importers match columns by those names. Blank data under a real header is still an empty value; the CSV cleaner can drop columns that have a header but no values in the data rows.",
      "Duplicate handles are not always wrong: extra rows can be variants or images, and those variant rows usually leave Title empty. The checker calls a handle a possible duplicate product only when more than one of its rows has a title, or when the option values are the same. A second product that reused a handle will collide on import.",
      "Open the file in the product CSV checker or the CSV cleaner in your browser. The file is not uploaded. Export a fresh copy from Shopify if you are unsure which version is current.",
    ],
  },
  {
    slug: "how-to-write-a-receipt",
    title: "How to write a receipt",
    description: "What to record after a customer pays.",
    toolHref: "/receipt-generator",
    toolLabel: "receipt generator",
    paragraphs: [
      "A receipt confirms money you received. It is not a request for payment and it is not proof that a bank transfer cleared unless you also have the bank record. Include who paid, who received the money, the date, the amount, and what the payment was for.",
      "Refer to the invoice number when there is one. If the customer paid part of the bill, show the amount received and the balance still open. If they paid in full, say so by entering the full amount or leaving the received field to mean the listed total.",
      "Name the method: transfer, card, cash, or another method you actually used. Add a reference such as a transfer id when you have one. Do not invent a card approval code.",
      "Special cases have their own documents. Rent for a period can use the rent receipt. A gift to an organisation can use the donation receipt, which does not decide tax deductibility.",
    ],
  },
  {
    slug: "how-invoice-numbers-work",
    title: "How invoice numbers work",
    description: "Why each invoice needs its own number and how the generator increments them.",
    toolHref: "/invoice-generator",
    toolLabel: "invoice generator",
    paragraphs: [
      "An invoice number is a label you do not reuse for a different bill. It lets you, the client, and later a bookkeeper point at one document. INV-001 and INV-002 are enough if you actually keep the sequence.",
      "Gaps happen when you draft an invoice and do not send it. That is less serious than using one number twice. If you void a number, note it in your own records rather than deleting the fact that the number existed.",
      "Quotes, receipts, and credit notes should not share the invoice sequence. A credit note that reuses the invoice number looks like a second copy of the invoice. Give it a CN number and refer to the invoice in the related field.",
      "On this site the next number is stored in the browser after you save or download. Another browser, or a cleared site storage, will not know your sequence. Your own register remains the source if you need a formal series.",
    ],
  },
  {
    slug: "what-belongs-on-a-quote",
    title: "What belongs on a quote",
    description: "The lines and assumptions that keep an estimate from drifting.",
    toolHref: "/quote-generator",
    toolLabel: "quote generator",
    paragraphs: [
      "A useful quote names the client, the date, and how long the price stays open. Each line should be something the client can accept or refuse: a day of labour, a page, a fixture, a block of hours. A single line called project is hard to vary.",
      "Write the assumptions in the terms: how many revisions, who supplies materials, what is excluded, and what happens if the site or the brief changes. Those sentences do more work than an extra decimal place.",
      "Show tax and discounts the way you will invoice them. A quote that hides tax and an invoice that adds it feel like a price increase. If a cost is only an allowance, label it as an allowance.",
      "After acceptance, turn the quote into an invoice with the same lines rather than retyping them. You can still change quantities if the agreed scope changed.",
    ],
  },
  {
    slug: "partial-payments-on-a-receipt",
    title: "How to record a partial payment",
    description: "What a receipt should show when the client pays only part of an invoice.",
    toolHref: "/receipt-generator",
    toolLabel: "receipt generator",
    paragraphs: [
      "A partial payment is still a receipt. The amount received is the cash that arrived, not the invoice total. The balance is what remains. Recording the full invoice total as received, when it was not, creates a false record.",
      "Put the invoice number on the receipt. If this is the second instalment, say so in the notes and refer to the earlier receipt if you issued one. Each receipt should have its own number.",
      "On the invoice itself, amount paid and balance due serve the same purpose before you send a chase. The reminder email should ask for the balance, not the original total.",
      "Do not use a receipt to describe a forgiveness of debt. If you are reducing what is owed without a payment, that is a credit note, not a receipt.",
    ],
  },
  {
    slug: "purchase-order-basics",
    title: "What a purchase order is for",
    description: "How a purchase order differs from an invoice you send to a customer.",
    toolHref: "/purchase-order",
    toolLabel: "purchase order",
    paragraphs: [
      "A purchase order is your request to a supplier: please supply these items at these prices. The supplier’s invoice later asks you to pay. The two documents face opposite directions.",
      "The PO number is the reference you want on the supplier’s invoice and on the delivery. Put quantities and descriptions in enough detail that the warehouse can pick the right goods. Delivery notes should repeat that PO number.",
      "A purchase order does not move money. If you must pay before delivery, that is a separate payment, and the supplier’s receipt or your bank record shows it.",
      "The purchase-order tool builds a PDF in the browser. It does not send the order to the supplier.",
    ],
  },
  {
    slug: "credit-note-or-refund",
    title: "Credit note or refund",
    description: "When reducing an invoice is not the same as handing money back.",
    toolHref: "/credit-note",
    toolLabel: "credit note",
    paragraphs: [
      "A credit note reduces the amount a customer owes, or records that you have credited an earlier invoice. A refund is money you pay back. You might issue a credit note and also refund, but they are not the same entry.",
      "The credit note should point at the original invoice number and describe the items or the amount credited. Give it its own number. Reusing the invoice number makes the pair look like duplicates.",
      "Do not call a credit note a receipt. A receipt says money came in. A credit note says an amount was credited. Using the wrong title is how books get confused.",
      "Tax treatment of a credit depends on your rules and on the original invoice. The generator formats the document you describe. It does not file a tax adjustment.",
    ],
  },
  {
    slug: "delivery-note-and-packing-slip",
    title: "Delivery note and packing slip",
    description: "What to list when goods leave, before anyone treats the paper as a bill.",
    toolHref: "/delivery-note",
    toolLabel: "delivery note",
    paragraphs: [
      "A delivery note, also called a packing slip, tells the recipient what is in the shipment. It is checked against the box. It is not an invoice and this version does not show prices.",
      "Include the delivery address, the date, quantities, and the purchase-order number if there is one. The person signing on the dock may never see the commercial invoice.",
      "Short-shipped lines should be obvious. If a quantity is zero because the item is on backorder, say that in the description rather than leaving the recipient to guess.",
      "The customer’s invoice can follow with prices. Keep the descriptions aligned so the packing slip and the invoice can be matched.",
    ],
  },
  {
    slug: "billing-hours-on-a-timesheet-invoice",
    title: "Billing hours on a timesheet invoice",
    description: "How to turn hours and a rate into an invoice line.",
    toolHref: "/timesheet-invoice",
    toolLabel: "timesheet invoice",
    paragraphs: [
      "A timesheet invoice line is hours multiplied by the rate. Describe the work and the period, such as development in the week of 3 March, so the hours are not an unexplained number.",
      "Different rates need different lines: standard hours, travel, or a higher rate you agreed for weekends. Do not average them into one rate that nobody remembers approving.",
      "Round hours the way the contract says. If you bill to the nearest quarter hour, the quantity can be 1.25. The generator multiplies the quantity by the rate you enter.",
      "A timesheet attached in your own files can hold the daily detail. The invoice can stay shorter, as long as the totals can be traced back to that sheet.",
    ],
  },
  {
    slug: "profit-margin-and-markup",
    title: "Profit margin and markup",
    description: "Why a 50 percent markup is not a 50 percent margin.",
    toolHref: "/profit-margin-calculator",
    toolLabel: "profit margin calculator",
    paragraphs: [
      "Margin is profit divided by the selling price. Markup is profit divided by the cost. On a cost of 100 and a price of 150, the markup is 50 percent and the margin is about 33 percent. Quoting one figure when you meant the other changes the price.",
      "Use margin when you think about how much of each sale is left after cost. Use markup when you build a price by adding a percentage to cost. The two calculators on this site do those sums separately.",
      "Neither figure includes overhead unless you put overhead into the cost first. A healthy margin on materials can still lose money if labour is missing from the cost.",
      "These calculators are arithmetic in the browser. They are not a pricing policy and they do not see your accounts.",
    ],
  },
  {
    slug: "adding-or-removing-sales-tax",
    title: "Adding or removing sales tax",
    description: "How to add VAT, GST, or sales tax, and how to pull it back out of a gross price.",
    toolHref: "/sales-tax-calculator",
    toolLabel: "sales tax calculator",
    paragraphs: [
      "Adding tax multiplies the net amount by the rate and adds the result. Removing tax divides the gross amount by one plus the rate. A 20 percent tax on 100 is 20. A gross price of 120 with 20 percent tax included has a net of 100, not 96.",
      "The calculator uses the rate you type. It does not look up a state, a province, or a VAT registration. If you need a rate, take it from the authority that applies to the sale.",
      "On an invoice, decide whether your line prices are net or already gross, and say which. Mixing them makes the tax line double-count or disappear.",
      "Country pages on this site list common invoice fields and link to the official source. They do not set your rate.",
    ],
  },
  {
    slug: "setting-a-freelance-hourly-rate",
    title: "Setting a freelance hourly rate",
    description: "A simple way to turn an income goal and billable hours into a rate.",
    toolHref: "/freelance-rate-calculator",
    toolLabel: "freelance rate calculator",
    paragraphs: [
      "Divide the income you want, plus the business expenses you must cover, by the hours you can actually bill. A year of 48 working weeks at 30 billable hours is not 52 weeks at 40 hours. Unpaid admin, sales, and leave come out of the hour count.",
      "The resulting rate is a planning figure. A fixed project price can still be higher or lower. If you quote only the rate and the hours overrun, the client experiences the overrun as your problem or theirs depending on the quote.",
      "Expenses in this sum are business costs you want the rate to carry, such as software and insurance. They are not the client’s reimbursable travel, which belongs on the invoice as its own line.",
      "The calculator does not know your tax on personal income. Treat the result as a business planning number and check the tax position separately.",
    ],
  },
  {
    slug: "merging-csv-files",
    title: "How to merge CSV files",
    description: "How to combine exports that do not share the same column order.",
    toolHref: "/csv-merger",
    toolLabel: "CSV merger",
    paragraphs: [
      "Merging by header name lines up columns even when one export lists SKU before price and another lists price first. A column missing from one file stays blank for that file’s rows. Merging by position instead would shift values under the wrong header.",
      "Clean obvious blank rows before you merge if they would become empty records. Do not drop a column just because its header is awkward. Drop it when the data cells are empty and you do not need the header.",
      "If you need a value from a second sheet only when a key matches, that is a join, not a stack. Use the join tool and pick the key column in each file. Every row of the first file is kept.",
      "Both tools run in the browser. A large file still uses your device’s memory, but it is not uploaded to BizToolsBox.",
    ],
  },
  {
    slug: "finding-duplicate-skus",
    title: "Finding duplicate SKUs",
    description: "How repeated product codes show up in a CSV and what to ignore.",
    toolHref: "/duplicate-sku-finder",
    toolLabel: "duplicate SKU finder",
    paragraphs: [
      "A SKU should point at one sellable variant. Two rows with the same SKU can mean a repeated product, a copied line, or a code reused across stores. The finder lists the repeated values and can download the matching rows.",
      "Blank SKU cells are not duplicates of each other. They are missing codes, which the product CSV checker reports separately. Fill or remove them before you treat the file as ready to import.",
      "Ignore case and surrounding spaces when the same code was typed two ways. If those settings would merge codes that are truly different in your catalogue, turn the normalisation off and review the exact text.",
      "The original file on disk is unchanged. Download the report and edit a copy of the export.",
    ],
  },
  {
    slug: "late-fees-on-an-invoice",
    title: "Late fees on an invoice",
    description: "What to write if a payment is late, and what not to invent.",
    toolHref: "/late-fee-calculator",
    toolLabel: "late fee calculator",
    paragraphs: [
      "A late fee belongs on an invoice only when the client agreed to it or a rule you rely on allows it. The invoice generator has a late-fee note for that wording. The note does not calculate a statutory rate for you.",
      "The late-fee calculator uses amount × annual rate × days ÷ 365. That is a simple interest sketch. It is not compound interest and it is not the rate from a statute unless you typed that rate.",
      "Show the overdue principal clearly, and show the fee as its own amount if you decide to charge one. Folding the fee into the original line hides what you added.",
      "A reminder email can mention the fee if it is already part of the amount you are asking for. Do not threaten a fee in the email that the invoice does not show.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((item) => item.slug === slug);
}
