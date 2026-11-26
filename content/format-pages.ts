export type FormatId = "word" | "google-docs" | "excel" | "pdf";
export type FormatHub = "invoice" | "quote" | "receipt";

export type FormatFaq = { question: string; answer: string };

export type FormatPage = {
  hub: FormatHub;
  format: FormatId;
  path: string;
  h1: string;
  title: string;
  description: string;
  file: string;
  mime: string;
  documentName: string;
  downloadLabel: string;
  preferred: "pdf" | "docx" | "xlsx";
  fillLine: string;
  intro: string;
  included: string[];
  editing: string[];
  tips: string[];
  steps: string[];
  faqs: FormatFaq[];
};

const DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const PDF = "application/pdf";

export const formatPages: FormatPage[] = [
  {
    hub: "invoice",
    format: "word",
    path: "/invoice-template/word",
    h1: "Invoice template for Word",
    title: "Free Invoice Template for Word (.docx) — Download or Fill Online",
    description: "Download a free blank invoice template for Microsoft Word. Edit the .docx table, or fill the same invoice in your browser and save it. No account.",
    file: "/templates/invoice-blank.docx",
    mime: DOCX,
    documentName: "Blank invoice template for Word",
    downloadLabel: "Download the Word template (.docx)",
    preferred: "docx",
    fillLine: "Fill it online, then download as Word.",
    intro: "A Word invoice is a document you can open, retype, and send without learning a spreadsheet. This template is a .docx file made of tables, so the columns stay aligned when you add a line or change a price. Download it and edit it in Microsoft Word, or fill the same layout in the browser and save a new .docx from the entries on the page.",
    included: [
      "The file opens with the title Invoice on a dark bar, then blank lines for the invoice number and the issue date. Two side-by-side blocks say From and Bill to. Each block has a place for a name, an email, and an address. Nothing is pre-filled with a real business, so you replace the labels with your own details.",
      "The line-item table has a header row and three rows marked Description. Each row starts at quantity 1 and price 0.00, so the amount column reads zero until you type a real price. Under the table are subtotal, tax, and total, all at 0.00 in the blank file. A notes paragraph is reserved for payment instructions, a bank reference, or a late-fee sentence. The last line is plain text: Made with BizToolsBox and the site address.",
    ],
    editing: [
      "Open the file in Word and click inside a cell to replace it. To add a billed item, insert a row below the last description. Type the quantity and the price as text. Word does not multiply them, so total the invoice yourself or use the form on this page, which downloads a finished .docx.",
      "Mark the header row so Description, Qty, Price, and Amount repeat on a second page. Do not merge the amount cells with the descriptions. Set the page to A4 or Letter before you send it.",
    ],
    tips: [
      "Send the .docx when the client needs to change wording. Send a PDF when the layout should stay fixed. If you paste from a website, keep text only so you do not import another font.",
      "The blank file uses US dollars and a simple date line. Change the currency symbol by typing it. The browser form on this page can format the same invoice in another currency and locale, then download Word again. The download is built on your device. The words you type are not uploaded with the file.",
    ],
    steps: [
      "Download the .docx with the button above.",
      "Open it in Microsoft Word.",
      "Replace the business, client, number, and date lines.",
      "Edit each description, quantity, and price, and update the total.",
      "Add payment instructions in the notes paragraph.",
      "Save the .docx, or also save a PDF from Word if the client asked for one.",
    ],
    faqs: [
      { question: "Will this .docx open in Word?", answer: "Yes. It is a standard .docx. Word 2007 and later, and Microsoft 365, open it. LibreOffice Writer opens it too." },
      { question: "Does the Word file calculate tax for me?", answer: "No. Amounts in the blank .docx are text. Type the tax yourself, or use the form below. The form totals the invoice and downloads Word." },
      { question: "Can I add my logo?", answer: "Yes. In Word, click above the title and insert a picture. Keep it small so the invoice still fits on one page. The browser form also has a logo field, and that logo is included when you download a PDF. The Word download from the form is a text-and-table document and does not embed the logo image." },
      { question: "Is the template free to use on a client invoice?", answer: "Yes. Download it, change it, and send it. You do not need an account. You are responsible for the numbers, the tax treatment, and the payment details you put on the invoice." },
      { question: "Where is the file saved?", answer: "The blank template is a file on this site. After you edit it, save it wherever you keep client paperwork. If you use the form, the finished Word file downloads to your device, and a copy of the draft can stay in this browser. It is not sent to a server." },
    ],
  },
  {
    hub: "invoice",
    format: "google-docs",
    path: "/invoice-template/google-docs",
    h1: "Invoice template for Google Docs",
    title: "Free Invoice Template for Google Docs — Download or Fill Online",
    description: "Get a free invoice template you can open in Google Docs. Upload the .docx to Drive, or fill the invoice online and download Word. No signup here.",
    file: "/templates/invoice-blank.docx",
    mime: DOCX,
    documentName: "Blank invoice template for Google Docs",
    downloadLabel: "Download the .docx for Google Docs",
    preferred: "docx",
    fillLine: "Fill it online, then download as Word.",
    intro: "Google Docs does not hand out a native invoice file from this site, and a public Make a copy link is not published here. The practical route is a .docx that Docs converts cleanly. Download the Word invoice, upload it to Google Drive, and open it with Google Docs. You can also fill the invoice in the browser and download a .docx that you then upload the same way.",
    included: [
      "The .docx contains the same blank invoice used on the Word page: a title, number and date lines, From and Bill to columns, and a three-row table of descriptions at quantity 1 and price 0.00. Subtotal, tax, and total sit under the table at zero. The notes paragraph is where payment instructions belong. A plain-text line at the end credits BizToolsBox and includes the site address.",
      "After Docs converts the file, the table remains a table. That matters because an invoice pasted as a drawing cannot be edited line by line. You can share the Doc with an accountant or a client as a viewer, commenter, or editor. Sharing is a Google account choice. This site never receives the document you create in Drive.",
    ],
    editing: [
      "In Google Drive choose New, then File upload, and select the .docx. When the upload finishes, right-click the file and choose Open with, then Google Docs. Replace the placeholder lines. To add a billed item, place the cursor in the last row and insert a row from the table menu. Docs will not multiply quantity by price, so type the line amount yourself or calculate it in the form on this page first.",
      "Use File, then Page setup, if the invoice should be A4 rather than Letter. Download the finished Doc as PDF when you want a copy the client cannot casually edit, or as .docx when another person will open it in Word. Suggesting mode is a good way for a colleague to propose a description change without touching the total until you accept it.",
    ],
    tips: [
      "There is no Make a copy button. A copy link would need a brand-only Google account, and that link is not set. Upload the .docx into your own Drive. Type the business address you actually use on invoices.",
      "Name a version in Docs before you send a shared link. If you would rather not use Drive, fill the form below and download Word. That file is created in the browser.",
    ],
    steps: [
      "Download the .docx with the button above.",
      "Open Google Drive.",
      "Choose New, then File upload, and select the .docx.",
      "Right-click the uploaded file, then Open with, then Google Docs.",
      "Replace the business, client, lines, and total.",
      "Share the Doc or download it as PDF or Word from the File menu.",
    ],
    faqs: [
      { question: "Why is the download a .docx and not a Google Doc?", answer: "A Google Doc lives in a Google account. This site does not publish a Make a copy link, because that link would have to be owned by a brand-only Google account and none is configured. The .docx is the file Docs is built to import." },
      { question: "Will the table survive the conversion?", answer: "Yes. The template is a Word table, which Google Docs imports as a Docs table. You can add rows and edit cells. Check the total after you convert, because Docs does not recalculate the amounts." },
      { question: "Can I share the invoice without emailing a file?", answer: "Yes, after it is in your Drive. Use the Share button in Docs and choose who can view or comment. That sharing is between you and Google. This website is not part of that step." },
      { question: "What if I do not want a Google account?", answer: "Use the form on this page. It fills the same kind of invoice and downloads a Word file to your device. You can also download the blank .docx and open it in Word or LibreOffice." },
      { question: "Does uploading the template send my client list here?", answer: "No. You upload the blank file to Google, or you type into the form in this browser. The form does not post the invoice to BizToolsBox. The blank download is a static file with placeholders, not your client names." },
    ],
  },
  {
    hub: "invoice",
    format: "excel",
    path: "/invoice-template/excel",
    h1: "Invoice template for Excel",
    title: "Free Invoice Template for Excel (.xlsx) — Download or Fill Online",
    description: "Download a free Excel invoice template with working formulas for line amounts, tax, and total. Edit the .xlsx, or fill it online. No account.",
    file: "/templates/invoice-blank.xlsx",
    mime: XLSX,
    documentName: "Blank invoice template for Excel",
    downloadLabel: "Download the Excel template (.xlsx)",
    preferred: "xlsx",
    fillLine: "Fill it online, then download as Excel.",
    intro: "An Excel invoice stays useful after you send it because the arithmetic is still in the cells. This blank .xlsx has real formulas: each line amount is quantity times price, rounded to cents, and the subtotal, discount, tax, shipping, and total refer to those cells. Change a price and the total updates. You can do the same work in the browser form and download a fresh workbook.",
    included: [
      "The sheet is named Document. The title Invoice sits across the top, with lines for the number and the date, the currency code, and the From and Bill to details. Below that are input cells for discount percent, tax percent, and shipping. The line table has a description, a quantity, and a price you type. The amount cell is a formula, ROUND of quantity times price to two decimals, not a typed number.",
      "Subtotal is a ROUND of the sum of the amount column. Discount multiplies that subtotal by the discount percent. Tax is calculated on the amount after discount. Shipping points at the shipping input, and the total adds subtotal, minus discount, plus tax and shipping. Three description rows start at quantity 1 and price 0, so a new file totals 0.00 until you enter prices. The footer is a text line with the BizToolsBox address.",
    ],
    editing: [
      "Type prices in the price column only. If you type over an amount formula, that line will stop updating. To add a row, insert it inside the table range and copy the amount formula down. Then check that the subtotal SUM still covers every amount cell. Excel and LibreOffice Calc both keep these formulas. Google Sheets does too, after you upload the .xlsx.",
      "Enter 10 in the tax cell for ten percent, not 0.10, because the formula divides by 100. Leave shipping at 0 if you do not charge it. The blank file uses a US dollar format. The browser form can download the same invoice in another currency.",
    ],
    tips: [
      "To open the same workbook in Google Sheets, go to Google Drive, choose New, then File upload, and upload the .xlsx. Open it with Google Sheets. The formulas come across. There is no separate Make a copy link on this page. Your upload stays in your Drive.",
      "If a client must not change the formulas, export a PDF from Excel after the numbers are final. The form on this page rounds to the cent and downloads Excel with the same ROUND formulas.",
    ],
    steps: [
      "Download the .xlsx.",
      "Open it in Excel, LibreOffice Calc, or upload it to Google Sheets.",
      "Replace the business and client lines.",
      "Enter descriptions, quantities, and prices. Leave the amount formulas in place.",
      "Set the tax percent, discount percent, and shipping amount.",
      "Confirm the total, then save the workbook or export a PDF.",
    ],
    faqs: [
      { question: "Why do the amount cells show a formula?", answer: "So the invoice stays editable. The amount is ROUND of quantity times price, to two decimal places. The total is built from the subtotal, discount, tax, and shipping cells. Change an input and the sheet recalculates." },
      { question: "What happens if I type 10 in the tax cell?", answer: "The tax formula treats that as 10 percent of the amount after discount. It does not treat 10 as ten dollars. Type a currency amount only in price and shipping cells." },
      { question: "Can I add more than three lines?", answer: "Yes. Insert rows in the line-item block and copy the amount formula into the new rows. Extend the subtotal SUM so it includes the new amount cells. The browser form is easier if you do not want to edit ranges: add lines there and download Excel." },
      { question: "Does this workbook send my prices anywhere?", answer: "No. The blank file is a static download. After that, Excel or Sheets stores it where you save it. The form on this page builds the workbook in your browser and does not post the rows to a server." },
      { question: "Will the formulas work in Google Sheets?", answer: "Yes. Upload the .xlsx to Drive and open it with Google Sheets. ROUND, SUM, and cell references are supported. Check that the total still references the discount, tax, and shipping cells after you insert rows." },
    ],
  },
  {
    hub: "invoice",
    format: "pdf",
    path: "/invoice-template/pdf",
    h1: "Invoice template for PDF",
    title: "Free Invoice Template for PDF — Download or Fill Online",
    description: "Download a free blank invoice PDF you can print, or fill the invoice in your browser and download a finished PDF. The file stays on your device. No account.",
    file: "/templates/invoice-blank.pdf",
    mime: PDF,
    documentName: "Blank invoice template for PDF",
    downloadLabel: "Download the blank PDF",
    preferred: "pdf",
    fillLine: "Fill it online, then download as PDF.",
    intro: "A PDF invoice is the file most clients expect to receive and the one that still looks the same when they open it on a phone. This page has two uses. Download the blank PDF and print it if you need a paper form. Or fill the invoice on this page and download a completed PDF that already contains your lines, tax, and total. The completed file is created in the browser.",
    included: [
      "The blank PDF is one A4 page. A dark bar carries the word Invoice. Under it are From and Bill to columns with placeholder lines for a name, an email, and an address, plus number, date, and currency lines. A table lists Description, Qty, Price, and Amount for four rows that start at zero. Subtotal, tax, and total are printed as 0.00. A notes line explains that you should replace it with payment details. The footer is the text Made with BizToolsBox and the site address.",
      "The blank PDF is for printing or for looking at the layout. The amounts are drawn as text, not as form fields that a PDF reader will calculate. If you need a finished invoice, use the generator under the article. It accepts your business, your client, and each line, then builds a PDF with the template you pick: classic, modern, or minimal. That PDF can include a logo and a payment-link QR code when you add them.",
    ],
    editing: [
      "You generally do not edit a PDF the way you edit Word. Open the blank file to print it, or to check margins, and write on the paper if that is truly what you need. For a client copy, type into the form. Choose the currency and the date format, add tax or a discount, and select Download PDF. The button stays disabled if the currency code is not valid, so you do not save a file with a broken code.",
      "If someone must change the wording later, this is the wrong format to send first. Give them the Word template, agree the text, and then download PDF for the copy that gets paid. PDF is also the right attachment when you want the invoice number and total to be hard to alter by accident in an email thread.",
    ],
    tips: [
      "Print the blank PDF at actual size, not fit-to-page, if you are checking whether the table sits inside the margins. The generator’s page-size control switches the finished PDF between A4 and Letter. The blank file itself is A4.",
      "The Made with BizToolsBox checkbox also controls the finished PDF. The blank file includes that credit because it is the default. The invoice text stays in the browser.",
    ],
    steps: [
      "Download the blank PDF if you want a printable form.",
      "To make a finished invoice, use the form below instead of writing on the PDF.",
      "Enter your business, the client, and each line item.",
      "Set the currency, tax, and any discount or shipping.",
      "Review the preview.",
      "Select Download PDF. The file is saved on your device.",
    ],
    faqs: [
      { question: "Can I type into the blank PDF?", answer: "It is a printable layout, not a fillable calculation form. The boxes are drawn text. Use the generator on this page to produce a PDF that already contains your details." },
      { question: "Does the finished PDF match the blank layout?", answer: "It is the same kind of invoice: title, parties, line table, and totals. The generator adds your real text and can switch among three templates and two page sizes. The blank file is the classic layout on A4." },
      { question: "Will the PDF look the same on a phone?", answer: "Yes. A PDF keeps its page size and fonts. That is the reason to send PDF rather than a Word file when the client will only read it." },
      { question: "Can I add a logo to the PDF?", answer: "Yes, in the generator. Choose a PNG, JPG, or SVG logo. It is placed on the PDF created in your browser. The blank download has no logo, so you can see the layout before you add one." },
      { question: "Is anything uploaded when I download?", answer: "The blank PDF is a static file. The finished PDF is built on your device from the form. The invoice contents are not posted to BizToolsBox." },
    ],
  },
  {
    hub: "quote",
    format: "word",
    path: "/quote-template/word",
    h1: "Quote template for Word",
    title: "Free Quote Template for Word (.docx) — Download or Fill Online",
    description: "Download a free quote template for Microsoft Word. Edit the estimate in the .docx, or fill it in your browser and save Word. A quote is not a bill. No account.",
    file: "/templates/quote-blank.docx",
    mime: DOCX,
    documentName: "Blank quote template for Word",
    downloadLabel: "Download the Word template (.docx)",
    preferred: "docx",
    fillLine: "Fill it online, then download as Word.",
    intro: "A quote tells the client what you propose to do and what you propose to charge before they agree. It is not an invoice and it does not ask for payment. This Word template gives you a .docx you can edit as a letter and a table: scope, prices, a valid-until line, and a place for the client to accept. Fill the same estimate in the browser if you want the total calculated for you.",
    included: [
      "The document title is Quote. Meta lines cover the quote number and the date. Two columns are labeled From and Prepared for, with placeholders for name, email, and address. The table has three Description rows at quantity 1 and price 0.00, then subtotal, tax, and total at zero. There is no shipping row, because a quote on this site prices the work itself. The notes paragraph is where exclusions belong: what is not included, how long the price lasts, and what happens if the scope changes.",
      "A signature label is ready for an acceptance line. In the blank file the signature is empty. When you send the quote, you can add Accepted by and a date, or leave that for the client to complete. The closing line credits BizToolsBox in plain text with the site address. You can delete that line in Word if the document should carry only your name.",
    ],
    editing: [
      "Write what the price covers in the description cells, not only a fee. Add a row for each part of the work. Word will not add the column, so total it yourself or use the form and download Word.",
      "Put a real valid-until date on the date line if the price expires. Word has no special field for it. Type it next to the issue date so the client sees both. If the quote is accepted, do not turn this file into the invoice by changing the title only. Create an invoice that references the quote number, with its own invoice number and payment instructions.",
    ],
    tips: [
      "Keep descriptions and amounts in separate cells. If you write the price inside the description sentence, a later edit of the fee is easy to miss. Use a heading style only for the title, not for each row, or the table will grow unevenly when Word updates styles.",
      "Send .docx while you are still agreeing the words. Send PDF once the client is ready to accept a fixed layout. The browser form downloads either. It does not upload the estimate. If you need a trade-specific starting point, the quote templates by trade add example lines. This page is the empty file.",
    ],
    steps: [
      "Download the quote .docx.",
      "Open it in Word.",
      "Replace From and Prepared for with your details and the client’s.",
      "Write each part of the work as its own row and set the total.",
      "State what is excluded, and the date the price expires, in the notes.",
      "Save the file. Create an invoice only after the client accepts.",
    ],
    faqs: [
      { question: "Is a quote the same as an invoice?", answer: "No. A quote proposes a price for approval. An invoice requests payment for work you are billing. This template does not include payment instructions as a demand for money. Add those on the invoice later." },
      { question: "Why is there no shipping line?", answer: "The quote file prices the proposed work. Shipping, if you charge it, can be its own row in the table. The invoice template has a separate shipping figure because that document is the bill." },
      { question: "Can the client edit the quote?", answer: "If you send the .docx, yes. That is useful while the scope is under discussion. When you want a fixed copy, download a PDF from Word or from the form on this page." },
      { question: "Does Word total the rows?", answer: "Not in this template. Amounts are text. The form below multiplies quantity by price, applies tax and discount, and downloads a Word file with the results." },
      { question: "May I remove the BizToolsBox line?", answer: "Yes. It is ordinary text at the end of the document. Delete the paragraph in Word. The checkbox on the form controls whether a new download includes it." },
    ],
  },
  {
    hub: "quote",
    format: "google-docs",
    path: "/quote-template/google-docs",
    h1: "Quote template for Google Docs",
    title: "Free Quote Template for Google Docs — Download or Fill Online",
    description: "Open a free quote template in Google Docs by uploading the .docx to Drive. Or fill the estimate online and download Word. No account on this site.",
    file: "/templates/quote-blank.docx",
    mime: DOCX,
    documentName: "Blank quote template for Google Docs",
    downloadLabel: "Download the .docx for Google Docs",
    preferred: "docx",
    fillLine: "Fill it online, then download as Word.",
    intro: "Google Docs is a practical place to draft a quote with a client because comments sit next to the sentence you are still negotiating. This site does not host the Doc and does not offer a Make a copy link. Download the quote as a .docx, upload that file to your Drive, and open it with Google Docs. The form below can produce the .docx after you have entered the lines.",
    included: [
      "The file is a blank quote, titled Quote, with number and date lines, From and Prepared for columns, and a table of three zero-priced rows. Totals start at 0.00. Notes are meant for the scope boundary: rounds of revision, travel, materials, or a date after which the price is withdrawn. There is no shipping total. An empty signature line can become the acceptance line once you are in Docs.",
      "Conversion keeps the table. You can invite the client as a commenter so they can question a line without changing the fee. When the wording is agreed, download PDF from Docs and send that as the copy you will invoice against. Keep the Doc as the history of how you got there.",
    ],
    editing: [
      "Upload with Drive’s New menu, then File upload. Open with Google Docs. Rewrite Prepared for so it is the client’s name, not the placeholder. Add rows for separate deliverables. Type line amounts yourself, because Docs will not multiply the quantity by the price. If you would rather not do that arithmetic, fill the estimate in the browser first and upload the downloaded .docx.",
      "Use comments for questions such as whether a meeting is included. Use suggesting mode if a partner is editing the price. Name a version on the day you send it. Page setup should match the paper you print, A4 or Letter, before you download PDF. Do not paste the client’s full postal address into a Doc you then share with a wide link.",
    ],
    tips: [
      "The Make a copy button is hidden because no brand Google Doc URL is configured. Uploading the template puts the quote in your Drive from the start, which is the safer default. Anyone with the link should be turned off unless you mean to publish the price.",
      "A quote in Docs is still not an invoice. When the client accepts, write an invoice with its own number. You can say which quote it follows. The browser tools on this site keep those as separate documents so a proposal is not accidentally sent as a bill.",
    ],
    steps: [
      "Download the quote .docx.",
      "In Google Drive, choose New, then File upload.",
      "Upload the file.",
      "Right-click it, choose Open with, then Google Docs.",
      "Edit the scope, the rows, and the date the price expires.",
      "Share for comments, or download PDF when the quote is final.",
    ],
    faqs: [
      { question: "Why isn’t there a Make a copy button?", answer: "A copy link has to point at a Doc owned by a brand-only Google account. That address is empty on purpose, so the button is hidden. Upload the .docx instead." },
      { question: "Can two people edit the quote?", answer: "Yes, after it is in your Drive. Share it with specific people. Comments and suggestions are part of Docs, not part of this website." },
      { question: "Will formulas appear in Docs?", answer: "No. This quote is a Word table of text amounts, not a spreadsheet. Use the Excel quote template if you want quantity times price to recalculate." },
      { question: "How do I stop the client editing the price?", answer: "Share as a commenter or viewer, or download a PDF and send the PDF. A .docx or an editable Doc can be changed." },
      { question: "Does this page store the quote?", answer: "No. Drive stores what you upload there. The form stores a draft in this browser if you download or save on this device. The quote text is not posted to the site." },
    ],
  },
  {
    hub: "quote",
    format: "excel",
    path: "/quote-template/excel",
    h1: "Quote template for Excel",
    title: "Free Quote Template for Excel (.xlsx) — Download or Fill Online",
    description: "Download a free Excel quote template. Line totals, tax, and the estimate total are formulas you can edit. Or fill the quote online. No account.",
    file: "/templates/quote-blank.xlsx",
    mime: XLSX,
    documentName: "Blank quote template for Excel",
    downloadLabel: "Download the Excel template (.xlsx)",
    preferred: "xlsx",
    fillLine: "Fill it online, then download as Excel.",
    intro: "A quote spreadsheet is the right blank file when the price is still moving. Change the hours or the unit fee and the estimate total follows, because the amount cells are formulas. This .xlsx is an estimate for approval, not a request for payment. It has no shipping input. Fill it in Excel, in LibreOffice, or in Google Sheets after you upload it, or build it in the browser and download the workbook.",
    included: [
      "The sheet title is Quote. You get number and date lines, a currency line, From and Prepared for blocks, and inputs for a discount percent and a tax percent. Each line stores a description, a quantity, and a price. The amount is ROUND of quantity times price, to two decimals. Subtotal sums those amounts. Discount and tax are formulas against the percent cells. The total is subtotal, minus discount, plus tax. There is no shipping term in that total.",
      "Three rows start at a price of zero so the estimate opens at 0.00. Notes say to replace the paragraph with the scope of work. Use that area, or a column you add yourself, to record what is excluded. The footer line names BizToolsBox and the site. It is text, not a formula, so it does not affect the total.",
    ],
    editing: [
      "Edit prices and quantities only. Leave the ROUND formulas. If you insert rows, copy the formula and widen the SUM. Enter tax as a whole percent: 20 means twenty percent. A quote often needs a validity date. Type it on the date line so it is visible. Excel will not remind you when that date passes.",
      "Do not add a payment-demand sentence at the bottom and then send the sheet as if it were an invoice. When the work is accepted, copy the agreed figures into an invoice, or use the quote generator’s option to turn the quote into an invoice. That keeps a proposal and a bill as different documents with different numbers.",
    ],
    tips: [
      "Google Sheets: in Drive choose New, then File upload, upload the .xlsx, and open it with Google Sheets. The formulas transfer. This page does not offer a public copy link. Your sheet stays in your account.",
      "Protect the formula cells if colleagues type in the workbook, and leave the price cells unlocked. In Excel that is Review, then Protect Sheet, after you unlock the input range. The browser form is the simpler path if you only need one estimate and a file to send: type the lines, check the total, and download Excel.",
    ],
    steps: [
      "Download the .xlsx.",
      "Open it in Excel or upload it to Google Sheets.",
      "Enter who the quote is from and who it is for.",
      "Type quantities and prices. Do not overwrite the amount formulas.",
      "Set tax or discount if they apply, and write the expiry date.",
      "Save the workbook. Invoice only after the client accepts the figure.",
    ],
    faqs: [
      { question: "Why doesn’t the quote total include shipping?", answer: "The quote template prices the proposed work. Add a row if a delivery charge is part of the offer. The formula total will include that row once its amount sits in the summed column." },
      { question: "Can I change a price after I send the file?", answer: "If you sent the .xlsx, the client has the formulas too. If the price changes, send a revised quote with a new date or a version note. Do not silently edit a file they already accepted." },
      { question: "How is rounding done?", answer: "Each line amount and the total use ROUND to two decimal places, so currency cents match the invoice tools on this site. Do not use Excel’s cell format alone. A format can hide extra digits that a later sum still includes." },
      { question: "Will Sheets keep the formulas?", answer: "Yes, when you upload the .xlsx and open it with Google Sheets. Check the total cell after you add rows, and extend the SUM if you inserted lines outside the original range." },
      { question: "Is the estimate uploaded when I download the blank file?", answer: "The blank workbook contains placeholders and zeros. Downloading it does not send client names. A workbook you build in the form is created in the browser." },
    ],
  },
  {
    hub: "quote",
    format: "pdf",
    path: "/quote-template/pdf",
    h1: "Quote template for PDF",
    title: "Free Quote Template for PDF — Download or Fill Online",
    description: "Download a free blank quote as a PDF, or fill the estimate in your browser and download a finished PDF. A quote proposes a price. It does not bill. No account.",
    file: "/templates/quote-blank.pdf",
    mime: PDF,
    documentName: "Blank quote template for PDF",
    downloadLabel: "Download the blank PDF",
    preferred: "pdf",
    fillLine: "Fill it online, then download as PDF.",
    intro: "Send a quote as a PDF when the words and the price are ready to be read, not rewritten. The page layout stays put on the client’s screen. This blank PDF shows the structure: who the estimate is from, who it is for, the lines, and the total. It prints as a paper worksheet. The finished PDF, with your real scope and figures, comes from the form further down the page.",
    included: [
      "The blank page is A4 and titled Quote. A short line under the title says it is an estimate for approval, not a request for payment. From and Prepared for each have name, email, and address placeholders. Number, date, and currency lines follow. Four table rows start at 0.00, with subtotal, tax, and total at zero. There is no shipping total. The notes line tells you to replace it with what the price covers and when it expires.",
      "The footer credits BizToolsBox. The file is not a form you can tab through and calculate. Drawing a total on a PDF and hoping the reader adds it up is how mismatched quotes happen. Use the generator for any quote you will actually send. It applies the tax and discount you enter and downloads one PDF.",
    ],
    editing: [
      "Treat the blank PDF as a preview of the page and as something you can print. Type the live quote in the form: business, client, quote number, valid-until date, and each line. The preview updates before you download. Pick classic, modern, or minimal if you want a different look from the blank file’s classic bar.",
      "After you download the finished PDF, read it once before you attach it. Check the valid-until date and that the descriptions say what is excluded. If the client needs to mark it up, send the Word quote instead and return to PDF when you both agree. An accepted quote should be followed by an invoice, not by renaming this PDF.",
    ],
    tips: [
      "Actual-size printing shows whether your logo, added in the generator, collides with the title. The blank file has no logo so the type has room. The generator’s logo sits in the PDF it creates, and that image never leaves your browser except inside the file you download.",
      "If you turn off Made with BizToolsBox, the finished PDF omits the credit. The blank file still has it, because the blank is the default template. Neither file is a contract by itself. The words you write are what the client is asked to accept.",
    ],
    steps: [
      "Download the blank PDF to print or to see the layout.",
      "Enter the estimate in the form below.",
      "Add a valid-until date and describe what is not included.",
      "Check the preview total.",
      "Select Download PDF.",
      "Send the PDF. Issue an invoice only after acceptance.",
    ],
    faqs: [
      { question: "Can the client accept by replying to the PDF?", answer: "They can reply to your email and say they accept. The PDF itself has an acceptance line in the generator when you fill the signature or accepted-by field. Keep that message with the file." },
      { question: "Why does the blank PDF say it is not a bill?", answer: "So the page is not mistaken for an invoice if someone prints it. A quote proposes a price. Payment instructions belong on the invoice you send later." },
      { question: "Is the blank PDF fillable?", answer: "No. It is a printable template. The form on this page is the fillable version, and it downloads a completed PDF." },
      { question: "Which page size is the blank file?", answer: "A4. The generator can also build the finished quote on Letter. Choose that before you download if your client prints on Letter paper." },
      { question: "Are quote details uploaded?", answer: "No. The blank PDF is a static download. The finished PDF is generated in your browser from the form." },
    ],
  },
  {
    hub: "receipt",
    format: "word",
    path: "/receipt-template/word",
    h1: "Receipt template for Word",
    title: "Free Receipt Template for Word (.docx) — Download or Fill Online",
    description: "Download a free receipt template for Microsoft Word. Record a payment you already received, edit the .docx, or fill it online and save Word. No account.",
    file: "/templates/receipt-blank.docx",
    mime: DOCX,
    documentName: "Blank receipt template for Word",
    downloadLabel: "Download the Word template (.docx)",
    preferred: "docx",
    fillLine: "Fill it online, then download as Word.",
    intro: "A receipt records a payment you have already received. It is not a bill and it does not collect the money. This Word template is a .docx you can complete after a transfer, a cash payment, or a card payment you are writing down for your records or for the payer. The browser form does the same job and downloads Word when you want the amount received and the balance calculated.",
    included: [
      "The title is Receipt. Lines are ready for the receipt number, the date, and the currency. Received by and Received from are separate columns, each with name, email, and address placeholders. The table has three description rows at a zero amount, then subtotal, tax, shipping, and total. The blank file does not pretend a payment was made. You write the amount received in the notes, or you use the form, which has a field labeled Amount received and shows any balance.",
      "Use the notes for the payment method and a reference, such as a transfer id or a check number. The related invoice number belongs there too if this receipt closes an invoice. The footer is the BizToolsBox line and the site address, as plain text you can remove.",
    ],
    editing: [
      "Write what the payment covers in the description, not only the word Paid. A receipt that says Rent for March is clearer than one that says Payment. Word will not subtract the amount received from the total. If you need a remaining balance, enter both numbers yourself or use the form, which calculates balance from the total, anything previously paid, and the amount received.",
      "Do not issue a receipt for money you only expect. If you are still asking to be paid, send an invoice. If you are proposing a price, send a quote. The receipt date should be the date you received the funds, which may differ from the invoice date. Type both dates in the notes if that distinction matters to the payer.",
    ],
    tips: [
      "Keep a copy of the .docx with the same receipt number you put on the page. Skipping numbers, or reusing a number for a different payer, makes the file harder to match later. Word has no sequence of its own.",
      "The form can start from an invoice you made on this site and carry the parties and the total into a receipt. You still confirm the amount you actually received. Nothing is verified with a bank. The document says what you report.",
    ],
    steps: [
      "Download the receipt .docx.",
      "Open it in Word after the payment has arrived.",
      "Name who received the money and who paid.",
      "Describe what the payment covers and enter the amounts.",
      "Add the method, a reference, and any related invoice number.",
      "Save the file and give a copy to the payer if they need one.",
    ],
    faqs: [
      { question: "Does this receipt prove the payment to a bank?", answer: "No. It is your record of a payment you say you received. It does not connect to a bank, a card network, or an invoice that was paid online." },
      { question: "Can I show a partial payment?", answer: "Yes. Write the total that was due, the amount received, and the balance. In Word you type those three figures. The form calculates the balance when you fill Amount received." },
      { question: "Should I send a receipt instead of an invoice?", answer: "Send an invoice to request payment. Send a receipt after you receive it. They answer different questions, and they should have different numbers." },
      { question: "Can I remove the credit line?", answer: "Yes. Delete the Made with BizToolsBox paragraph in Word. On a file you download from the form, the checkbox controls that line." },
      { question: "Is the payer’s name uploaded?", answer: "Not by this site. The blank file has placeholders. What you type in Word stays in the file you save. What you type in the form stays in the browser." },
    ],
  },
  {
    hub: "receipt",
    format: "google-docs",
    path: "/receipt-template/google-docs",
    h1: "Receipt template for Google Docs",
    title: "Free Receipt Template for Google Docs — Download or Fill Online",
    description: "Download a free receipt .docx and open it in Google Docs. Record a payment you have received, or fill the receipt online and save Word. No account here.",
    file: "/templates/receipt-blank.docx",
    mime: DOCX,
    documentName: "Blank receipt template for Google Docs",
    downloadLabel: "Download the .docx for Google Docs",
    preferred: "docx",
    fillLine: "Fill it online, then download as Word.",
    intro: "Google Docs is a reasonable place to keep receipts if you already share a folder with a bookkeeper. This page does not put the receipt in a public Doc, and it does not show a Make a copy button. Download the .docx, upload it to your Drive, and open it with Google Docs. Fill the browser form first if you want the amount received and the balance worked out before the upload.",
    included: [
      "The Word file is a blank receipt: title, number, date, Received by, Received from, and a zeroed table with subtotal, tax, shipping, and total. Notes are the right place for the payment method, a reference, and the invoice number this receipt belongs to. Nothing in the file claims a specific person has paid, because a template cannot know that.",
      "Once the file is a Doc, you can file it in a folder per year or per payer. Share it with your accountant as a viewer. Do not share a receipt folder with anyone who has the link. A receipt contains names and amounts, and a public link is a broad disclosure. That choice is in your Google account, not on this website.",
    ],
    editing: [
      "Drive, New, File upload, then Open with Google Docs. Replace Received from with the payer’s name. Write the date you got the money. Add a row if one payment covers several items. Docs will not compute the balance. Either type it or download a completed .docx from the form and upload that file instead of the blank.",
      "If you later find the amount was wrong, do not silently overwrite a Doc you already sent. Download a PDF of the version the payer has, from version history, and then write a corrected receipt with a new number. Say which receipt it replaces. Comments are a poor place to hide a changed total.",
    ],
    tips: [
      "No Make a copy link is offered. The slot for a brand-owned Google Doc is empty, so the button stays hidden. Uploading the .docx means the receipt starts in your Drive.",
      "A receipt in Docs is still only as true as what you type. The site does not see the bank transfer. If you need a paper copy, download PDF from Docs after you finish. If you do not want a Google account in the process, use the form and download Word or PDF directly.",
    ],
    steps: [
      "Download the receipt .docx.",
      "Open Google Drive and choose New, then File upload.",
      "Upload the file you downloaded.",
      "Open it with Google Docs.",
      "Record who paid, how much, the method, and the reference.",
      "File the Doc in your own folder. Download PDF if the payer needs a fixed copy.",
    ],
    faqs: [
      { question: "Why do I upload a Word file to get a Google Doc?", answer: "Docs imports .docx as an editable document. This site does not publish a Doc to copy, because that would require a link from a brand-only Google account, and none is set." },
      { question: "Can my bookkeeper see the receipt?", answer: "Only if you share it from your Drive. This website has no access to that Doc and does not list your receipts." },
      { question: "What should I do about a partial payment?", answer: "Write the amount received and the remaining balance in the Doc, or let the form calculate the balance and upload the finished .docx. Say which invoice the payment relates to." },
      { question: "Is a receipt a request for the rest of the money?", answer: "No. It records what arrived. If a balance remains, the invoice is still the document that requests it. You can mention the balance so the payer sees it." },
      { question: "Does the upload include my customers?", answer: "You upload a file to Google. If you upload the blank template, it has placeholders. If you upload a finished receipt, that file goes to Google under your account, not to BizToolsBox." },
    ],
  },
  {
    hub: "receipt",
    format: "excel",
    path: "/receipt-template/excel",
    h1: "Receipt template for Excel",
    title: "Free Receipt Template for Excel (.xlsx) — Download or Fill Online",
    description: "Download a free Excel receipt template with formulas for the total. Record a payment you received, or fill the receipt online and save .xlsx. No account.",
    file: "/templates/receipt-blank.xlsx",
    mime: XLSX,
    documentName: "Blank receipt template for Excel",
    downloadLabel: "Download the Excel template (.xlsx)",
    preferred: "xlsx",
    fillLine: "Fill it online, then download as Excel.",
    intro: "A receipt spreadsheet helps when one payment covers several lines and you want the total to stay tied to those lines. This .xlsx calculates each line as quantity times price, then subtotal, discount, tax, shipping, and total. You still write down the amount you actually received. The sheet does not talk to a bank. Open it in Excel or, after an upload, in Google Sheets. The browser form can download the same kind of workbook.",
    included: [
      "The title is Receipt. Header lines cover the number, the date, and the currency. Received by and Received from are labeled blocks. Discount percent, tax percent, and shipping are input cells. Line amounts are ROUND formulas. The total formula adds the pieces together. Rows start at zero so you do not accidentally issue a receipt for a sample price. Notes tell you to record the payment method and reference. The BizToolsBox line is text in the footer.",
      "The blank sheet does not include an amount-received formula, because a blank template does not know what arrived. Add that figure under the total and subtract it yourself if you are staying in Excel, or use the form, which has Amount received and a balance. Previously paid can be entered in the form when this payment is not the first one against the same work.",
    ],
    editing: [
      "Type the payer and the description of what was paid for before you touch the total. Leave formula cells alone. A receipt that shows a formula the payer can change is a weak record. After the numbers are final, save a PDF copy from Excel and keep the .xlsx as your working file. Protect the sheet if other people open the workbook.",
      "Google Sheets path: Drive, New, File upload, then open with Google Sheets. Formulas remain. There is no Make a copy button here. If you add rows, extend the SUM. Enter tax as a percent, not as a second copy of the total. Shipping belongs in the shipping cell, not added again by hand on the total, or you will double count it.",
    ],
    tips: [
      "Use one receipt number per payment. If a second transfer arrives later, make another receipt that mentions the first, or record previously paid in the form and download a new file. Do not edit the old total and hope both of you still have the same copy.",
      "The form’s Excel download uses the same ROUND-to-cents approach as this blank file, and it can include the amount received and the balance as cells. That is the better download when the payment is partial. The static file is the empty starting point.",
    ],
    steps: [
      "Download the .xlsx after you have received the payment.",
      "Open it in Excel or upload it to Google Sheets.",
      "Enter who paid and what the payment covers.",
      "Let the formulas produce the total. Do not type over them.",
      "Write the amount received, the method, and the reference.",
      "Save a PDF copy for the payer and keep the workbook for yourself.",
    ],
    faqs: [
      { question: "Does the workbook confirm the money arrived?", answer: "No. It records the amount you enter. It does not connect to a payment processor or a bank feed." },
      { question: "Where do I put the amount received?", answer: "On the blank sheet, write it under the total and note the balance. In the form, use Amount received. The Excel file that form downloads can include that figure and the remaining balance." },
      { question: "Why are there formulas on a receipt?", answer: "So the total of the items stays consistent with the rows. The fact of payment is still something you state. The formula only adds up the document." },
      { question: "Can I open this in Google Sheets?", answer: "Yes. Upload the .xlsx to Drive and choose Open with Google Sheets. Check the total reference if you insert rows." },
      { question: "Will downloading the template upload my takings?", answer: "No. The file on this page is blank. A workbook you create in the form is built locally and downloaded to your device." },
    ],
  },
  {
    hub: "receipt",
    format: "pdf",
    path: "/receipt-template/pdf",
    h1: "Receipt template for PDF",
    title: "Free Receipt Template for PDF — Download or Fill Online",
    description: "Download a free blank receipt PDF to print, or fill in a payment you received and download a finished PDF. It does not collect money. No account.",
    file: "/templates/receipt-blank.pdf",
    mime: PDF,
    documentName: "Blank receipt template for PDF",
    downloadLabel: "Download the blank PDF",
    preferred: "pdf",
    fillLine: "Fill it online, then download as PDF.",
    intro: "A PDF receipt is the copy you give someone so they can file proof of a payment you received. The layout does not reflow, which matters when the payer prints it. This blank PDF is the printable shell. The finished PDF, with the payer’s name and the amount, is what the form creates in your browser after you say what was paid. The tool does not take the payment and does not check it.",
    included: [
      "The blank page is A4, titled Receipt, with a line that says it records a payment you report as received. Received by and Received from have placeholders. Number, date, and currency lines are empty of real data. Four item rows and the subtotal, tax, and total are zero. A notes line asks for the method and a reference. The footer includes the BizToolsBox credit and the address of the site.",
      "Print that page if you need a paper receipt to complete by hand. Do not email the blank file to a payer as if it were their receipt. Use the form to put their name, the amount received, the method, and any related invoice number into a PDF that already shows those facts. Amount received is a field in the form. The blank PDF has no calculation fields.",
    ],
    editing: [
      "Handwriting belongs on a printed blank, not inside a PDF editor, unless you are correcting a scan. For anything you will send by email, type in the generator. Set the date to the day the money arrived. If only part of the invoice was paid, enter the amount received and read the balance in the preview before you download.",
      "Choose a template and a page size in the form if the classic A4 blank is not the look you want. Add a logo if you use one on invoices, so the receipt looks like the same business. The logo is embedded in the PDF on your device. Turn the BizToolsBox line off with the same checkbox the other downloads use if you do not want it on the payer’s copy.",
    ],
    tips: [
      "Keep the receipt number in a list you control. The PDF will not stop you reusing a number. Match it to the invoice number in the notes when the payment closes a bill you already sent.",
      "The blank download is cached in the browser after the page loads, and the click saves that file without sending names or amounts. The finished PDF never posts the form to a server. Fonts for that PDF are fetched from this site as font files, not as your document.",
    ],
    steps: [
      "Download the blank PDF if you need a paper form.",
      "For a receipt you will send, use the form below.",
      "Enter who was paid, who paid, and the amount received.",
      "Add the payment method, a reference, and the related invoice number.",
      "Read the balance if the payment is partial.",
      "Select Download PDF and give that file to the payer.",
    ],
    faqs: [
      { question: "Can I print the blank receipt and fill it in by hand?", answer: "Yes. That is what the blank PDF is for. Write clearly and keep a copy. For email, use the generator so the payer’s name and the amount are typed." },
      { question: "Does the PDF collect the payment?", answer: "No. It documents a payment you have already received. It does not charge a card or confirm a transfer." },
      { question: "How do I show a remaining balance?", answer: "In the form, enter the amount received. The preview and the PDF show the balance against the total. The blank PDF does not calculate a balance." },
      { question: "Can I include the invoice number?", answer: "Yes. The form has a related-invoice field, and it is printed on the PDF. On the blank page, write it in the notes." },
      { question: "Is the payer’s information uploaded?", answer: "No. The blank file has no payer. The finished PDF is created in your browser and downloaded to your device." },
    ],
  },
];

export function getFormatPage(hub: FormatHub, format: FormatId) {
  const page = formatPages.find((item) => item.hub === hub && item.format === format);
  if (!page) throw new Error(`Missing format page ${hub}/${format}`);
  return page;
}

export function formatPageCopy(page: FormatPage) {
  return [page.intro, ...page.included, ...page.editing, ...page.tips, ...page.steps, ...page.faqs.flatMap((faq) => [faq.question, faq.answer])].join(" ");
}
