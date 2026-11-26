import type { TemplateFaq, TemplateItem } from "@/content/industries";

export type ReceiptTemplate = {
  slug: string;
  name: string;
  intro: string;
  items: TemplateItem[];
  faqs: TemplateFaq[];
  related: string[];
};

export const receiptTypes: ReceiptTemplate[] = [
  {
    slug: "freelance-payment",
    name: "freelance payment",
    intro: "Use this receipt after a client pays an invoice for project work. It records the amount you received, the method, and the invoice it settles. It does not collect the payment.",
    items: [{ description: "Project balance received", quantity: "1", price: "1500" }],
    faqs: [
      { question: "When do I issue this instead of an invoice?", answer: "After the money arrives. The invoice asked for payment. This receipt records that you received it." },
      { question: "What if they paid only part?", answer: "Enter the amount received. The receipt can show a balance against the line total." },
      { question: "Should I mention the invoice number?", answer: "Yes. Use the related-invoice field so the receipt points at the bill it closes." },
      { question: "Does this prove the bank transfer?", answer: "No. It is your record of a payment you report. Keep the bank record as well." },
    ],
    related: ["consulting-payment", "repair-payment", "lesson-payment"],
  },
  {
    slug: "rent-payment",
    name: "rent payment",
    intro: "A rent receipt records a rent amount you received for a stated period and property. It is a record of money received, not a lease and not a demand for the next month.",
    items: [{ description: "Rent received for the stated period", quantity: "1", price: "1200" }],
    faqs: [
      { question: "What should the description include?", answer: "The property and the period, such as rent for March at the flat you name in the address fields." },
      { question: "Can this receipt replace a lease?", answer: "No. It only records a payment you say you received." },
      { question: "How do I show a partial rent payment?", answer: "Enter the amount received. The balance line shows what is still short of the listed rent." },
      { question: "Is a rent receipt a tax document?", answer: "Rules differ. This PDF does not decide what a tenant or owner may claim." },
    ],
    related: ["security-deposit", "freelance-payment", "studio-rental"],
  },
  {
    slug: "security-deposit",
    name: "security deposit",
    intro: "Use this when you receive a security deposit, not when you bill rent. The description should say the money is a deposit held against the agreement, so it is not mistaken for income from a completed service.",
    items: [{ description: "Security deposit received", quantity: "1", price: "800" }],
    faqs: [
      { question: "Is a deposit the same as rent?", answer: "No. Label it as a deposit. Rent for a period belongs on a rent receipt." },
      { question: "Does this receipt return the deposit?", answer: "No. It records receipt. Returning money is a later payment out, not this document." },
      { question: "Should I name the agreement?", answer: "Put a short reference in the notes or payment reference, without pasting an entire contract." },
      { question: "Can I receipt only part of the deposit?", answer: "Yes. The amount received can be lower than the line you expected to hold." },
    ],
    related: ["rent-payment", "studio-rental", "event-booking"],
  },
  {
    slug: "repair-payment",
    name: "repair payment",
    intro: "Repair receipts fit plumbers, electricians, mechanics, and other trades after the customer pays. List the labour and the main parts so the receipt matches the invoice they already saw.",
    items: [
      { description: "Repair labour paid", quantity: "1", price: "180" },
      { description: "Parts paid", quantity: "1", price: "64" },
    ],
    faqs: [
      { question: "Should parts and labour stay split?", answer: "Yes, when the invoice split them. The receipt is easier to match." },
      { question: "What if the customer paid cash?", answer: "Choose Cash as the method. The receipt still does not verify the cash." },
      { question: "Can I include the warranty?", answer: "Only the warranty you actually give, in the notes. Do not imply a manufacturer warranty you cannot honour." },
      { question: "Is this a quote?", answer: "No. A receipt means you are recording money already received." },
    ],
    related: ["freelance-payment", "consulting-payment", "retail-sale"],
  },
  {
    slug: "lesson-payment",
    name: "lesson payment",
    intro: "Tutors and music teachers can receipt a block of lessons once the family has paid. Name the subject or instrument and the number of lessons the payment covers.",
    items: [{ description: "Lessons paid, block of 8", quantity: "1", price: "320" }],
    faqs: [
      { question: "Do I receipt each lesson or the block?", answer: "Receipt the payment you received. If they paid for eight lessons at once, one line for that block matches the money." },
      { question: "What about a trial that was free?", answer: "Leave a free trial off the receipt. A paid trial is its own line." },
      { question: "Can unused lessons be shown?", answer: "The receipt records money, not attendance. Your policy on unused lessons belongs in the notes if you need it there." },
      { question: "Should two siblings be one receipt?", answer: "Separate lines per student keep the counts clear." },
    ],
    related: ["freelance-payment", "consulting-payment", "event-booking"],
  },
  {
    slug: "photography-session",
    name: "photography session",
    intro: "Issue this after a client pays for a session or a balance on a gallery. Separate the sitting fee from a product order if those were paid together but mean different things.",
    items: [
      { description: "Session fee received", quantity: "1", price: "250" },
      { description: "Print order received", quantity: "1", price: "80" },
    ],
    faqs: [
      { question: "What if the prints are not finished?", answer: "If they paid, you can receipt the payment. Say in the notes if the prints are still in production." },
      { question: "Does this transfer copyright?", answer: "No. Usage terms belong in your agreement, not in the act of recording a payment." },
      { question: "How do I show a retainer already receipted?", answer: "Receipt only the new amount, and mention the earlier receipt number in the notes." },
      { question: "Should travel be included?", answer: "Include it only if it was part of the money you received." },
    ],
    related: ["event-booking", "freelance-payment", "studio-rental"],
  },
  {
    slug: "cleaning-visit",
    name: "cleaning visit",
    intro: "A cleaning receipt records payment for a visit that already happened or a prepaid pack of visits. Name the property and whether the charge was a standard clean or a deep clean.",
    items: [{ description: "Deep clean paid", quantity: "1", price: "220" }],
    faqs: [
      { question: "Can I receipt a prepaid month?", answer: "Yes. Describe it as prepaid visits and state how many, so it is not read as a single clean." },
      { question: "What if they paid cash to the cleaner?", answer: "Record the method as cash only if you received it. The PDF does not confirm who held the cash." },
      { question: "Should products be listed?", answer: "Add a line if the customer paid you for products. Included products need no extra line." },
      { question: "Is this an invoice for next week?", answer: "No. If they have not paid, use an invoice." },
    ],
    related: ["rent-payment", "repair-payment", "freelance-payment"],
  },
  {
    slug: "consulting-payment",
    name: "consulting payment",
    intro: "Consultants receipt a paid workshop, a block of hours, or a retainer. Name the engagement and the period. A receipt is not the memo or the advice itself.",
    items: [{ description: "Advisory block paid", quantity: "1", price: "2000" }],
    faqs: [
      { question: "Is a retainer receipt the same as earning the fee?", answer: "The receipt shows the cash received. Whether you have earned it depends on the agreement, not on this PDF." },
      { question: "Should expenses paid by the client sit here?", answer: "Only amounts you received. If they paid a hotel directly, that is not your receipt." },
      { question: "Can I receipt a deposit before the workshop?", answer: "Yes, and describe it as a deposit toward the named workshop." },
      { question: "What reference should I store?", answer: "Use the payment reference for the transfer id the client used." },
    ],
    related: ["freelance-payment", "lesson-payment", "event-booking"],
  },
  {
    slug: "catering-event",
    name: "catering event",
    intro: "Caterers receipt the balance or the full amount after an event is paid. Show the guest charge and staffing separately when those were the amounts collected.",
    items: [
      { description: "Catering balance received", quantity: "1", price: "960" },
      { description: "Staffing balance received", quantity: "1", price: "240" },
    ],
    faqs: [
      { question: "Do I receipt the deposit again?", answer: "No. Receipt the amount of this payment. Mention the earlier deposit in the notes if the balance is what remains." },
      { question: "What guest count belongs here?", answer: "The count you charged, in the description, so it matches the invoice." },
      { question: "Can leftover food be a discount?", answer: "Only if you actually reduced the amount received. Do not invent a refund on the receipt." },
      { question: "Is a card payment different?", answer: "Choose Card and add the reference if you have one. The tool does not talk to the card machine." },
    ],
    related: ["event-booking", "retail-sale", "photography-session"],
  },
  {
    slug: "retail-sale",
    name: "retail sale",
    intro: "A simple retail receipt lists the goods and the amount paid at the till or by transfer. It is a record of that sale, not a tax-invoice template for every local rule.",
    items: [
      { description: "Goods sold", quantity: "2", price: "35" },
      { description: "Delivery paid", quantity: "1", price: "8" },
    ],
    faqs: [
      { question: "Can this be my only sales record?", answer: "It can be the customer copy. Keep your own sales record as well if you need one for your accounts." },
      { question: "How do returns work?", answer: "A return is not this receipt. Record money you pay back outside this document, and do not rewrite history on the original." },
      { question: "Should tax be inside the price?", answer: "If your shelf price includes tax, the line can be the gross amount and the notes can say tax is included. This page does not calculate a local rate for you." },
      { question: "What identifier should goods have?", answer: "Name the item. Add a SKU in the description if you use one." },
    ],
    related: ["repair-payment", "catering-event", "freelance-payment"],
  },
  {
    slug: "contractor-progress",
    name: "contractor progress payment",
    intro: "Use this when a client pays a stage of a building or fit-out job. Name the stage so the receipt cannot be read as payment of the whole contract.",
    items: [{ description: "Progress stage 2 received", quantity: "1", price: "4000" }],
    faqs: [
      { question: "Does this mean the job is finished?", answer: "No, if you name the stage. The final stage should be its own receipt later." },
      { question: "Where does the contract sum go?", answer: "The line is the amount received now. The contract sum can be mentioned in the notes." },
      { question: "What about retention?", answer: "Receipt the cash you got. If retention is still held by the client, do not describe it as received." },
      { question: "Should materials on site be listed?", answer: "Only if this payment specifically covered a materials invoice you want to identify." },
    ],
    related: ["repair-payment", "freelance-payment", "rent-payment"],
  },
  {
    slug: "studio-rental",
    name: "studio rental",
    intro: "Studios receipt a paid booking for a room or desk. State the date and the hours. A refundable bond is a deposit receipt, not part of the rental fee, if you hold it separately.",
    items: [{ description: "Studio hire, 4 hours", quantity: "1", price: "160" }],
    faqs: [
      { question: "How do I receipt a bond?", answer: "Use the security-deposit template when the money is a bond. Keep hire fees here." },
      { question: "What if they overrun?", answer: "Add a line for the extra hour only if they paid it." },
      { question: "Is equipment hire included?", answer: "Give lights or backdrops their own line when they were charged." },
      { question: "Does the receipt book the calendar?", answer: "No. It records payment. Your booking system still holds the reservation." },
    ],
    related: ["event-booking", "photography-session", "security-deposit"],
  },
  {
    slug: "event-booking",
    name: "event booking",
    intro: "Planners, venues, and entertainers can receipt a paid booking fee. Describe the event date and whether the amount is a deposit or payment in full.",
    items: [{ description: "Booking fee received", quantity: "1", price: "500" }],
    faqs: [
      { question: "How do I label a deposit?", answer: "Say deposit in the description if the event is not yet paid in full." },
      { question: "Does this lock the date?", answer: "It records that you received the fee you asked for. The terms of cancellation belong in the agreement." },
      { question: "Can vendor costs sit on this receipt?", answer: "Only amounts the client paid to you. Money they paid a venue directly is the venue's receipt." },
      { question: "What if the event is postponed?", answer: "Do not alter the fact of the payment. Your credit or rebooking policy is a separate decision." },
    ],
    related: ["catering-event", "photography-session", "studio-rental"],
  },
];

export function getReceiptType(slug: string) {
  return receiptTypes.find((item) => item.slug === slug);
}
