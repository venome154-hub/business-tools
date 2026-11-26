export type EstimateLine = { description: string; quantity: string; price: string; priceHigh: string };
export type EstimateFaq = { question: string; answer: string };

export type EstimateTrade = {
  slug: string;
  description: string;
  intro: string[];
  method: string[];
  assumptions: string[];
  lines: EstimateLine[];
  faqs: EstimateFaq[];
};

export const ESTIMATE_NOTE = "This is an estimate, not a fixed quote.";

export const estimateDifference = {
  before: "A quote states one figure for a settled scope.",
  quoteLink: "matching quote template",
  between: "This page keeps a low and a high price until the visit confirms the work.",
  guideLink: "how a quote, an estimate, and a proposal differ",
};

export const estimateTrades: EstimateTrade[] = [
  {
    slug: "contractor",
    description: "Walk a contractor job, then publish a low and high range for labour, materials, and hidden conditions. Download PDF, Word, or Excel before the figure is locked.",
    intro: [
      "A contractor rarely knows the full opening until the plaster comes off. The first number is a bracket: what the job costs if the walls are sound, and what it costs if joists, damp, or extra making-good show up.",
      "Use the low column for the work you can see and the high column for the contingency you would rather name now than argue about later. The valid-until date is the day material prices or site access stop being the ones you measured.",
    ],
    method: [
      "Start with a walkthrough and a tape, not a single bottom line. Measure the rooms that are actually in play, photograph the access, and note which other trades still have to finish before you can start.",
      "Split the bracket into labour days, a materials allowance, and a separate contingency for concealed structure. If the client wants one figure after that, convert the lines into a quote and drop the high column.",
    ],
    assumptions: [
      "Access stays as seen on the visit, including parking and a working lift or stair.",
      "Concealed rot, asbestos, or undersized joists sit in the high column, not in the low.",
      "Permits, engineer letters, and rubbish skips are called out rather than buried in labour.",
      "The range expires on the valid-until date if timber or board prices move.",
    ],
    lines: [
      { description: "Walkthrough and measured sketch", quantity: "1", price: "180", priceHigh: "260" },
      { description: "Labour days, visible scope", quantity: "5", price: "420", priceHigh: "540" },
      { description: "Materials allowance", quantity: "1", price: "900", priceHigh: "1400" },
      { description: "Contingency for concealed structure", quantity: "1", price: "0", priceHigh: "750" },
    ],
    faqs: [
      { question: "Why does a contractor estimate show two totals?", answer: "The low total is the work you could see and measure. The high total adds the allowance for conditions that only appear once the surface is opened. A single number would pretend those conditions are already known." },
      { question: "When should the range become a contractor quote?", answer: "After the opening-up, or when the client accepts the high end as the cap. Convert to quote copies every line and keeps the low price as the figure, with the range written into the notes." },
      { question: "What usually blows a contractor range?", answer: "A change of access, a wet substrate, or a request to match a finish that was not on the visit. Those belong in the assumptions so the bracket does not silently become a promise." },
    ],
  },
  {
    slug: "plumber",
    description: "Give a plumber estimate as a range after the visit: access, pipe runs, and fixtures that may change. Download PDF, Word, or Excel, and keep assumptions visible.",
    intro: [
      "Plumbing prices move with what is behind the wall. A visible trap and a shutoff you can reach is one end of the bracket. A chase through tile, a corroded stack, or a fixture the client has not bought yet is the other end.",
      "Write the range before you order parts. The low side assumes the route you traced. The high side is the longer route, the extra valve, or the afternoon lost to water that will not isolate.",
    ],
    method: [
      "On the visit, find the shutoff, the vent path, and the distance from the existing supply. Count fittings you would add if the straight run is blocked.",
      "Keep fixture supply as its own line when the client is still choosing. Labour for setting a known model is tighter than labour for a model you have not unboxed.",
    ],
    assumptions: [
      "The shutoff holds and the stack is sound enough to tie into.",
      "Walls and tile opened for the pipe run are made good by someone else unless a line says otherwise.",
      "Fixtures are either client-supplied or listed with their own allowance.",
      "Concealed leaks found after the water is on sit above the low total.",
    ],
    lines: [
      { description: "Site visit and isolation check", quantity: "1", price: "90", priceHigh: "140" },
      { description: "Supply and waste run, measured route", quantity: "1", price: "480", priceHigh: "820" },
      { description: "Valve and fitting allowance", quantity: "1", price: "70", priceHigh: "190" },
      { description: "Setting the fixture, once chosen", quantity: "1", price: "160", priceHigh: "280" },
    ],
    faqs: [
      { question: "Should a plumber estimate include the fixture?", answer: "Only when the model is known. If the client is still choosing, keep an allowance in the high column and say the low column is labour and pipe only." },
      { question: "How long can a plumbing range stay open?", answer: "Until the valid-until date. Copper, valves, and the day's schedule are the usual reasons a bracket from last month is no longer the one you would publish." },
      { question: "What does convert to quote do with a plumbing range?", answer: "Every line moves to the quote generator on this device. The low price becomes the quote price, and the high end is written into the notes so the spread is not lost." },
    ],
  },
  {
    slug: "electrician",
    description: "An electrician estimate prices circuits as a range after the board and the route are seen. Download PDF, Word, or Excel, and name what the high end holds.",
    intro: [
      "Electrical work is a range until you have seen the board, the route, and whether the walls can be chased. A point on an existing circuit is not the same job as a new circuit that needs a spare way and a longer cable run.",
      "Put testing and the certificate on their own line. Clients compare the visible devices and forget the hour spent proving the circuit. The high column is where a full board, a longer chase, or making good the plaster lives.",
    ],
    method: [
      "Count points and note which ones can share a circuit. Photograph the board so the spare-way question is not a guess made from the van.",
      "If decoration is not yours, say so in the assumptions. A chase that you open and someone else closes is a different bracket from a chase you also fill and paint.",
    ],
    assumptions: [
      "The existing board has a spare way, unless the high column includes a board change.",
      "Routes follow the cavities seen on the visit. Solid walls that need a longer chase sit in the high column.",
      "Plaster, paint, and floorboards opened for cable are listed if you will close them.",
      "Certification time is a line, not a footnote that disappears from the total.",
    ],
    lines: [
      { description: "Board inspection on site", quantity: "1", price: "110", priceHigh: "160" },
      { description: "New points on an existing circuit", quantity: "4", price: "85", priceHigh: "130" },
      { description: "Cable route allowance", quantity: "1", price: "140", priceHigh: "360" },
      { description: "Test and certificate", quantity: "1", price: "90", priceHigh: "140" },
    ],
    faqs: [
      { question: "Why is the electrical range wider after a board visit?", answer: "The visit tells you whether a spare way exists. Without it, the high column has to carry a board change that the low column can leave out." },
      { question: "Do I estimate making good the walls?", answer: "If you will fill and paint, put that spread on its own line. If another trade closes the chase, write that as an assumption so the bracket is not read as a decorated finish." },
      { question: "Can the range be turned into an invoice later?", answer: "Yes. Convert to invoice copies the lines onto the invoice generator in this browser. The low price is the line price, and the high end stays in the notes." },
    ],
  },
  {
    slug: "hvac",
    description: "An HVAC estimate separates the visit, the equipment bracket, and set-up labour. Download PDF, Word, or Excel before the range is treated as a fixed price.",
    intro: [
      "Heating and cooling prices depend on the equipment you have not unboxed yet and on the path it has to travel. A like-for-like swap in an open plant room is the low end. A crane, a new pad, a longer line set, or a higher-efficiency cabinet is the high end.",
      "Keep the diagnostic visit separate from the replacement bracket. The visit is a known half day. The cabinet is an allowance until the model, the efficiency, and the disposal of the old unit are chosen.",
    ],
    method: [
      "Measure the plant space, the line-set length, and the electrical supply before you publish a range. Note whether the old unit can leave through the door you used.",
      "Put efficiency options in the high column or on an alternate line. A client who wants the quieter cabinet should see that number beside the basic one, not discover it after the order.",
    ],
    assumptions: [
      "The electrical supply and the pad can take the unit described in the low column.",
      "Disposal of the old unit is included only if a line says so.",
      "Line-set length beyond the measured run sits in the high column.",
      "Filters, pads, and refrigerant top-up beyond the visit are not assumed free.",
    ],
    lines: [
      { description: "Diagnostic visit and measurements", quantity: "1", price: "140", priceHigh: "210" },
      { description: "Equipment allowance", quantity: "1", price: "2200", priceHigh: "4100" },
      { description: "Set and commission labour", quantity: "1", price: "680", priceHigh: "1100" },
      { description: "Remove the old unit", quantity: "1", price: "150", priceHigh: "420" },
    ],
    faqs: [
      { question: "Should the HVAC range include the cabinet?", answer: "As an allowance, yes. The low end is the basic unit that fits the measured space. The high end is the efficiency or size step you discussed, not a blank cheque." },
      { question: "Why keep the visit outside the replacement bracket?", answer: "The visit happens even if the client never replaces the unit. Folding it into the equipment number makes a declined job look like a discount and hides the time already spent." },
      { question: "What invalidates an HVAC range?", answer: "A longer line set, a supply that cannot feed the new unit, or a crane the doorway made unnecessary on paper. The valid-until date is also the limit if equipment pricing moves." },
    ],
  },
  {
    slug: "painter",
    description: "A painter estimate turns rooms, coats, and prep into a low and high total. Download PDF, Word, or Excel after the walk-round, and name the high-end surfaces.",
    intro: [
      "Paint prices follow surface, not room names. A sound wall and two coats is the low end. Flaking paint, dark-to-light colour, ceilings, and trim that were 'while you are here' are the high end.",
      "Measure or count on site. A room count from a listing hides height, repairs, and furniture you cannot move. The range should say which of those you saw.",
    ],
    method: [
      "Note substrate, sheen, and whether the colour change needs an undercoat. Ceilings and woodwork are separate lines so a client can drop them without rewriting the walls.",
      "Prep is its own bracket. Filling hairline cracks is not the same day as scraping a failed coating back to plaster.",
    ],
    assumptions: [
      "Furniture is moved by the client, or a line includes the time to shift it.",
      "Colour changes that need an undercoat sit in the high column.",
      "Damp, mould, and failed plaster are excluded until a line is added.",
      "Ceilings, doors, and trim are in the total only when they have lines.",
    ],
    lines: [
      { description: "Walk-round and surface notes", quantity: "1", price: "70", priceHigh: "120" },
      { description: "Walls, two coats, sound substrate", quantity: "4", price: "180", priceHigh: "260" },
      { description: "Prep where the coating has failed", quantity: "1", price: "90", priceHigh: "340" },
      { description: "Ceilings and trim, if included", quantity: "1", price: "160", priceHigh: "420" },
    ],
    faqs: [
      { question: "Why is prep a range instead of a fixed day?", answer: "You can see peeling from the floor, but not how far it goes once you scrape. The low end is filling and sanding. The high end is taking a failed coating back." },
      { question: "Does a colour change widen the painter range?", answer: "Yes, when the new colour cannot cover in the coats you allowed. Put the extra coat in the high column and name the colours you saw." },
      { question: "Are ceilings inside a room price?", answer: "Only if a line says so. Otherwise the assumptions should say ceilings and trim are outside the bracket the client is reading." },
    ],
  },
  {
    slug: "landscaping",
    description: "A landscaping estimate prices clearance, paving, and planting as separate ranges after you have seen access and spoil. Download PDF, Word, or Excel.",
    intro: [
      "Garden numbers move with spoil, access, and what is under the turf. Clearing a light border is the low end. Breaking a slab, shifting wet soil, and waiting on plants that are not in the yard this week is the high end.",
      "Keep demolition, new surface, and planting on different lines. A client who drops the patio should still see what the clearance and the beds cost on their own.",
    ],
    method: [
      "Walk the access with the machine you would actually use. A barrow through a side gate and a digger that does not fit are different brackets.",
      "Plant supply is an allowance until the species and the season are chosen. Labour to set them is tighter than the price of the plants.",
    ],
    assumptions: [
      "Green waste leaves the site only if a line includes the skip or the van.",
      "Levels and buried concrete beyond the probed depth sit in the high column.",
      "Irrigation repairs and extra topsoil are not assumed.",
      "Plant prices follow the valid-until date and the species named on the lines.",
    ],
    lines: [
      { description: "Site walk and access check", quantity: "1", price: "120", priceHigh: "180" },
      { description: "Clearance and spoil", quantity: "1", price: "450", priceHigh: "980" },
      { description: "New surface allowance", quantity: "1", price: "1600", priceHigh: "2900" },
      { description: "Planting labour and plant allowance", quantity: "1", price: "380", priceHigh: "860" },
    ],
    faqs: [
      { question: "Why split clearance from the new surface?", answer: "Clearance can be priced from what you can see and probe. The surface depends on a material the client may still change. One blended number hides which part moved." },
      { question: "How should spoil sit in the range?", answer: "The low end is the volume you can take in the usual van or a small skip. The high end is wet soil, buried rubble, or a gate the machine cannot use." },
      { question: "When do plant prices leave the bracket?", answer: "On the valid-until date, or when the species changes. Say that in the assumptions so a spring list is not treated as a summer invoice." },
    ],
  },
  {
    slug: "cleaning",
    description: "A cleaning estimate separates the first deep visit from later upkeep, with a range for condition you have not seen. Download PDF, Word, or Excel.",
    intro: [
      "The first clean and the weekly visit are different jobs. A maintained flat is the low end of the first visit. Grease, limescale, and rooms that were left out of the message are the high end.",
      "Price the first visit as a range of hours, then show the later visits as a tighter line. Clients who only look at the weekly number will not see why the opening visit costs more.",
    ],
    method: [
      "Ask for room count, last professional clean, and pets, then still leave a high column until you have seen the oven, the shower, and the floors.",
      "Add-ons such as inside ovens, interior glass, and laundry sit on their own lines so they can be declined without rewriting the base hours.",
    ],
    assumptions: [
      "Hot water, power, and a place to empty the machine are available.",
      "Heavy grease, hoarding, or a post-build dust-down is the high column, not the weekly rate.",
      "Keys, parking, and alarm codes match what was described.",
      "Consumables beyond your usual kit are listed if the client expects you to supply them.",
    ],
    lines: [
      { description: "First visit, hours on site", quantity: "4", price: "35", priceHigh: "55" },
      { description: "Later maintenance visit", quantity: "1", price: "120", priceHigh: "160" },
      { description: "Oven and shower detail", quantity: "1", price: "40", priceHigh: "90" },
      { description: "Interior glass allowance", quantity: "1", price: "0", priceHigh: "70" },
    ],
    faqs: [
      { question: "Why is the first cleaning visit a range?", answer: "Photos and room counts miss grease and scale. The low end is a maintained home. The high end is the extra hours once you see the oven, the shower, and the floors." },
      { question: "Should weekly upkeep use the same bracket?", answer: "No. After the first visit the condition is known, so the maintenance line can be tighter. Leave the wide bracket on the opening visit only." },
      { question: "What is outside a cleaning range by default?", answer: "Exterior windows, biohazard, and a builders' clean, unless a line names them. The assumptions should say so in plain language." },
    ],
  },
  {
    slug: "handyman",
    description: "A handyman estimate itemises the punch list as ranges, because odd jobs grow on the day. Download PDF, Word, or Excel and keep each task on its own line.",
    intro: [
      "A punch list looks short until you are in the room. A door that needs a plane is the low end. A door that needs the frame eased, the hinge packed, and a new latch is the high end. One blended 'odd jobs' figure cannot move when a fifth task appears.",
      "Give each task its own bracket and a valid-until date. The client can drop a line. You can convert the ones they keep into a quote without retyping the list.",
    ],
    method: [
      "Walk the list with a screwdriver, not a camera only. Note which tasks need a second trip for a part you would not carry on a guess.",
      "Parts you have not seen, such as a matched tile or a discontinued hinge, belong in the high column as an allowance.",
    ],
    assumptions: [
      "Each line is one task. A new task on the day is a new line, not a silent stretch of an old one.",
      "Matched finishes and discontinued hardware sit in the high column.",
      "Making good paint around a repair is included only when the line says so.",
      "The range assumes the property is as seen, including power and a place to work.",
    ],
    lines: [
      { description: "Attend and walk the punch list", quantity: "1", price: "60", priceHigh: "90" },
      { description: "Ease and rehang a door", quantity: "1", price: "70", priceHigh: "150" },
      { description: "Refix loose fittings", quantity: "6", price: "15", priceHigh: "25" },
      { description: "Parts allowance for unmatched hardware", quantity: "1", price: "20", priceHigh: "80" },
    ],
    faqs: [
      { question: "Why not one price for the whole punch list?", answer: "The list changes while you are there. Separate brackets let a client drop a task and let you add one without pretending the original total still describes the day." },
      { question: "How do parts sit in a handyman range?", answer: "Known screws and hinges can be the low end. A matched tile or a hinge you have to order is the high end, named as an allowance rather than absorbed into labour." },
      { question: "Can I send the kept tasks on as a quote?", answer: "Yes. Convert to quote copies every line locally. Delete the tasks the client declined before you download the quote, and the high prices remain in the notes." },
    ],
  },
  {
    slug: "carpenter",
    description: "A carpenter estimate prices the piece from the opening you measured, with a range for material and for surprises in the frame. Download PDF, Word, or Excel.",
    intro: [
      "Custom woodwork is a range until the opening is square and the material is chosen. A stock board in a true opening is the low end. A hardwood the yard has to order, a twisted frame, and scribing to an uneven wall are the high end.",
      "Write the measured opening on the estimate. If the opening changes after plaster or after a floor goes down, the bracket you published was for a different hole.",
    ],
    method: [
      "Measure width, height, and depth, and check the diagonals. Note whether you are fitting to finished surfaces or to a carcass that is still moving.",
      "Separate making from fitting. The bench time is knowable. The site time depends on the frame you have not yet eased.",
    ],
    assumptions: [
      "The price follows the opening measured on the visit. A later change of size is a new line.",
      "Material is the species named. An upgrade sits in the high column.",
      "Decorating the new work, and easing doors cut by someone else, are outside the bracket unless listed.",
      "Site power and a dry place to stand the piece are available on the fitting day.",
    ],
    lines: [
      { description: "Measure the opening and check it is square", quantity: "1", price: "80", priceHigh: "130" },
      { description: "Make the piece in the named material", quantity: "1", price: "640", priceHigh: "1100" },
      { description: "Fit and scribe on site", quantity: "1", price: "220", priceHigh: "410" },
      { description: "Ironmongery allowance", quantity: "1", price: "40", priceHigh: "160" },
    ],
    faqs: [
      { question: "Why measure before publishing a carpentry range?", answer: "A nominal door size is not the opening. Out of square, a new floor, or a lining that is still proud changes both the bench time and the site time." },
      { question: "How do I show a material upgrade?", answer: "Keep the named board as the low price and the upgrade as the high price on the same line, or as a second line the client can decline. Say which species the low end assumes." },
      { question: "Does fitting include decorating?", answer: "Not unless a line says so. Filling, priming, and paint are easy to assume and expensive to discover later, so they belong in the assumptions when they are out." },
    ],
  },
  {
    slug: "web-developer",
    description: "A web developer estimate brackets pages, revisions, and work still undefined. Download PDF, Word, or Excel, and keep copy and photos outside the low total.",
    intro: [
      "A site price is a range while the page list, the accounts, and the content source are still moving. A brochure on a theme you know is the low end. A custom template, a shop, or content you have to write is the high end.",
      "Name the revision rounds and what a round is. A text tweak is not a new layout. The high column is where the extra round, the extra template, or the integration you have not seen the API for should sit.",
    ],
    method: [
      "List pages or features, not a single 'website' line. Mark which of them depend on copy and photos the client still owes.",
      "Put care after launch on its own line with a range of hours. Leaving it inside the build number makes every later question look like it was already paid.",
    ],
    assumptions: [
      "Copy and photography arrive in a usable state. Writing or art direction is a separate line.",
      "The low total covers the named pages and the named revision rounds.",
      "Third-party fees, licences, and ad spend are the client's, unless a line says you will buy them.",
      "A change of platform or a shop added later is outside the bracket.",
    ],
    lines: [
      { description: "Page templates, named set", quantity: "5", price: "280", priceHigh: "460" },
      { description: "Revision rounds", quantity: "2", price: "150", priceHigh: "320" },
      { description: "Forms and a simple integration", quantity: "1", price: "200", priceHigh: "700" },
      { description: "Care hours after launch", quantity: "3", price: "90", priceHigh: "140" },
    ],
    faqs: [
      { question: "Why bracket a website instead of naming one build price?", answer: "The page list and the content source still move. The low end is the named templates. The high end is extra templates, an integration you have not seen, or rounds beyond the ones listed." },
      { question: "Where do copy and photos sit?", answer: "Outside the low total, unless a line says you will produce them. The assumptions should say the client supplies both in a form you can place." },
      { question: "How does this become a web quote?", answer: "When the page list is settled, convert to quote. The lines carry over in this browser, the low price becomes the quote price, and the high end is kept in the notes." },
    ],
  },
];

export const estimateSlugs = estimateTrades.map((item) => item.slug);

export function getEstimate(slug: string) {
  return estimateTrades.find((item) => item.slug === slug);
}

export function estimateMetaTitle(name: string) {
  const titled = name.charAt(0).toUpperCase() + name.slice(1);
  return `Free ${titled} Estimate Template — PDF, Word & Excel`;
}

export function estimateArticleText(name: string, trade: EstimateTrade) {
  const titled = name.charAt(0).toUpperCase() + name.slice(1);
  return [
    `${titled} estimate template`,
    ...trade.intro,
    estimateDifference.before,
    estimateDifference.quoteLink,
    estimateDifference.between,
    estimateDifference.guideLink,
    `How a ${name} prices a job before the figure is fixed`,
    ...trade.method,
    "Assumptions and exclusions",
    ...trade.assumptions,
    ...trade.lines.flatMap((line) => [line.description, line.quantity, line.price, line.priceHigh]),
    `Questions about ${name} estimates`,
    ...trade.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ESTIMATE_NOTE,
    "Estimate generator",
    "All estimate templates",
  ].join(" ");
}
