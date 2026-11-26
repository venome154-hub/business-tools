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
  {
    slug: "freelance-designer",
    description: "A design estimate brackets the first direction and the files that come after it. Download PDF, Word, or Excel before a new direction is treated as already paid.",
    intro: [
      "Design numbers stay wide until you know how many directions the client will actually look at. One explored route with a known file handoff is the low end. A second route, a new audience, or source files you still have to build is the high end.",
      "Keep exploration apart from the files the client takes away. A range that blends them makes every extra board look like it was already inside the first figure.",
    ],
    method: [
      "Ask what has to be decided in the room and what has to be delivered afterwards. Those are different days, and only the second one needs export formats.",
      "Put a fresh direction on its own line. A tweak inside the chosen route can stay in the low column. A route that starts again belongs in the high column.",
    ],
    assumptions: [
      "The low total is one direction plus the named file types.",
      "A new audience, a new product, or a new name is a new line.",
      "Stock images, type licences, and print management sit outside the bracket unless listed.",
      "The range expires on the valid-until date if the brief is still moving.",
    ],
    lines: [
      { description: "First direction, explored in the brief", quantity: "1", price: "450", priceHigh: "800" },
      { description: "Further directions", quantity: "1", price: "0", priceHigh: "500" },
      { description: "Production files for the chosen route", quantity: "1", price: "220", priceHigh: "420" },
      { description: "Extra presentation boards", quantity: "1", price: "80", priceHigh: "200" },
    ],
    faqs: [
      { question: "Why is the first design direction a range?", answer: "You can see the brief, not how many times the client will restart it. The low end is one route. The high end is a second route that is not a tweak of the first." },
      { question: "When do production files leave the design range?", answer: "When the route is chosen. Until then the file line is an allowance. After that, convert to quote and drop the unused direction." },
      { question: "What usually widens a design bracket?", answer: "A new name, a new audience, or a request for files you did not name. Those sit in the assumptions so the low total is not read as every possible board." },
    ],
  },
  {
    slug: "photographer",
    description: "A photography estimate separates hours on site from the edited set. Download PDF, Word, or Excel before travel and extra frames are treated as part of the day.",
    intro: [
      "A photo day is knowable. The edit is not, until you agree how many finished frames and how fast they leave the studio. Coverage you can schedule is the low end. A second location, a longer edit, or prints the client has not chosen is the high end.",
      "Write the range before the date is held. A single coverage figure hides the edit, and the edit is where the hours usually grow.",
    ],
    method: [
      "Split the day you are on site from the frames you deliver later. Travel that is not a local trip gets its own allowance.",
      "Prints, albums, and a longer gallery stay in the high column until the client picks them. They should not inflate the day rate.",
    ],
    assumptions: [
      "The low total is the named hours on site plus the named edited set.",
      "A second location or an extra hour on the day sits in the high column.",
      "Prints and albums are allowances, not a promise of a specific product.",
      "Weather, permits, and a second camera operator are out unless a line says otherwise.",
    ],
    lines: [
      { description: "Hours on site", quantity: "4", price: "150", priceHigh: "220" },
      { description: "Edited frames, named count", quantity: "25", price: "12", priceHigh: "22" },
      { description: "Travel beyond the local area", quantity: "1", price: "0", priceHigh: "180" },
      { description: "Print or album allowance", quantity: "1", price: "0", priceHigh: "240" },
    ],
    faqs: [
      { question: "Why not one number for the whole photo job?", answer: "The day can be booked. The edit depends on how many frames you promised and how fast. A blended figure makes a longer edit look like a discount argument." },
      { question: "Where do prints sit in the range?", answer: "In the high column until a product is chosen. The low total is time and files. A book or a print run is a later choice, not a hidden part of the day." },
      { question: "How does a photo range become a booking figure?", answer: "When the hours, the frame count, and travel are settled, convert to quote. Every line moves on this device, and the high end stays in the notes." },
    ],
  },
  {
    slug: "consulting",
    description: "A consulting estimate prices the diagnostic and later hours as a range, and says whether the client leaves with a memo. Download PDF, Word, or Excel.",
    intro: [
      "Advisory work is a range until you know if the client wants a written result or a block of conversation. A short diagnostic with a memo is the low end. An open advisory block, a workshop with more people, or a second round of interviews is the high end.",
      "Name what they hold at the end. Time with nothing written down is a different bracket from a document someone else in the company can read.",
    ],
    method: [
      "Separate the first diagnostic from later hours. The diagnostic has a shape. Later hours do not, until the questions are known.",
      "If more than one stakeholder will be in the room, put that in the high column. A two-person briefing is not the same meeting as a room of twelve.",
    ],
    assumptions: [
      "The low total is the diagnostic and the named written result.",
      "Further hours are an allowance, not a retained month.",
      "Travel, data access, and workshops beyond the first meeting sit in the high column.",
      "The range is not a promise of a particular business outcome.",
    ],
    lines: [
      { description: "Diagnostic conversations", quantity: "1", price: "900", priceHigh: "1600" },
      { description: "Written note of what was found", quantity: "1", price: "400", priceHigh: "900" },
      { description: "Later advisory hours", quantity: "4", price: "180", priceHigh: "280" },
      { description: "Workshop with a wider group", quantity: "1", price: "0", priceHigh: "1200" },
    ],
    faqs: [
      { question: "Why bracket consulting instead of selling a day?", answer: "A day rate hides whether the client receives a memo or only the conversation. The range shows both the first look and the hours that may follow." },
      { question: "What pushes the consulting total up?", answer: "More people in the room, a second round of interviews, or a workshop that was not in the first conversation. Those belong in the high column, not inside the diagnostic." },
      { question: "When is the range ready to become one figure?", answer: "When the deliverable is either the memo or a fixed hour block, and the extra workshop is accepted or dropped. Convert to quote copies the lines locally." },
    ],
  },
  {
    slug: "tutoring",
    description: "A tutoring estimate prices a trial and a block of lessons as a range, including missed weeks. Download PDF, Word, or Excel before the term is treated as fixed.",
    intro: [
      "A lesson you have already met the student for is tighter than a term you are guessing. The trial is the low, known piece. The block is a range because pace, materials, and missed weeks are not visible from a single message.",
      "Say what a missed lesson does to the bracket. Moving it is not the same cost as losing the hour, and parents read a silent policy as a promise.",
    ],
    method: [
      "Price the trial on its own. After it, the block can narrow because you have seen the level.",
      "Past papers, a second subject, or exam-season intensity sit in the high column. They are not part of a calm weekly hour.",
    ],
    assumptions: [
      "The low total is the trial plus the named number of ordinary lessons.",
      "A missed lesson is moved once, unless the high column says it is still charged.",
      "Materials beyond your usual notes are an allowance.",
      "A second subject or a holiday intensive is a new line.",
    ],
    lines: [
      { description: "Trial lesson", quantity: "1", price: "40", priceHigh: "60" },
      { description: "Following lessons", quantity: "8", price: "45", priceHigh: "65" },
      { description: "Papers and practice sets", quantity: "1", price: "0", priceHigh: "40" },
      { description: "Missed lesson, if still charged", quantity: "1", price: "0", priceHigh: "45" },
    ],
    faqs: [
      { question: "Why is a tutoring block wider than the trial?", answer: "The trial is one hour you can see. The block depends on pace and on weeks that get cancelled. The high end is there so a missed week is not a surprise invoice." },
      { question: "Do materials sit inside the lesson price?", answer: "Only your usual notes. Bought papers or a second subject are an allowance in the high column until the parent asks for them." },
      { question: "Can the block become a single term price?", answer: "Yes, after the trial, when the count of lessons and the missed-lesson rule are agreed. Convert to quote keeps each lesson line." },
    ],
  },
  {
    slug: "catering",
    description: "A catering estimate prices food per guest as a range, plus staff and diet changes. Download PDF, Word, or Excel before the guest list is final.",
    intro: [
      "Guest count is a guess until the week of the event. Food for the count you were told is the low end. A drop below your minimum, a wave of dietary changes, or service staff you have not rostered is the high end.",
      "Keep food, people who serve it, and the things you hire apart. A client who cuts the menu should still see what the staff cost.",
    ],
    method: [
      "Use the count you were given as the low quantity and note the minimum you will still cook for. The high price per guest covers the dearer plate and the dietary swaps.",
      "Crockery hire, a chef on site, and travel to the venue are their own allowances. They do not shrink just because ten guests cancel.",
    ],
    assumptions: [
      "The low total uses the guest count you were given and the simpler menu.",
      "A count under the minimum still pays the minimum kitchen time.",
      "Dietary changes beyond the ones named sit in the high column.",
      "Venue rules, power, and a water supply are as described on the visit or the call.",
    ],
    lines: [
      { description: "Food per guest, simpler menu", quantity: "40", price: "28", priceHigh: "46" },
      { description: "Service staff", quantity: "3", price: "160", priceHigh: "240" },
      { description: "Hire of crockery and linen", quantity: "1", price: "80", priceHigh: "260" },
      { description: "Dietary swaps above the named set", quantity: "1", price: "0", priceHigh: "180" },
    ],
    faqs: [
      { question: "Why is catering still a range after a headcount?", answer: "The count moves, and so does the menu. The low end is the number and the plate you were shown. The high end is a richer plate, more dietary swaps, or staff you add when the room gets larger." },
      { question: "What happens if the guest count falls?", answer: "Food quantity can fall. Staff and hire often cannot. The assumptions should say there is a minimum so a last-week drop does not wipe the kitchen day." },
      { question: "When does the range become the event figure?", answer: "When the menu, the count, and the staff are locked. Convert to quote copies the lines, and the unused high end stays in the notes." },
    ],
  },
  {
    slug: "bookkeeper",
    description: "A bookkeeping estimate separates a current month from a backlog, and leaves software as the client cost. Download PDF, Word, or Excel before catch-up is hidden.",
    intro: [
      "A current month is a small range. A backlog is not, until you have seen how many months, how many accounts, and whether payroll is in the pile. The tidy month is the low end. Reconstructing a year, or filing work you have not opened, is the high end.",
      "Software the client already pays for should not hide inside your hours. Name it as their cost unless you will buy it.",
    ],
    method: [
      "Count accounts and the oldest month you would touch. Payroll and sales-tax support are separate lines because some clients stop at the bank feed.",
      "The catch-up quantity is the uncertain one. Use a low month count you have seen and a high count if the records may go further back.",
    ],
    assumptions: [
      "The low total is the current month and the accounts you were shown.",
      "Older months sit in the high column until the files are opened.",
      "Payroll and sales-tax support are included only on their own lines.",
      "Bookkeeping software is the client's subscription unless a line says you supply it.",
    ],
    lines: [
      { description: "Current month, accounts as shown", quantity: "1", price: "250", priceHigh: "400" },
      { description: "Catch-up months", quantity: "3", price: "180", priceHigh: "320" },
      { description: "Payroll support", quantity: "1", price: "0", priceHigh: "150" },
      { description: "Sales-tax working papers", quantity: "1", price: "0", priceHigh: "120" },
    ],
    faqs: [
      { question: "Why is catch-up bookkeeping wider than a current month?", answer: "A live month has a shape you can see. A backlog hides missing statements and old coding. The high end is the extra months and the repair, not a second copy of the monthly fee." },
      { question: "Is the software inside the bookkeeping range?", answer: "No, unless a line says you will pay for it. The assumptions should say the subscription stays with the client." },
      { question: "When can the backlog become one fee?", answer: "After you have opened the files and the month count is real. Convert to quote then, and leave the unused payroll line off if they do not want it." },
    ],
  },
  {
    slug: "personal-trainer",
    description: "A training estimate brackets sessions and unused hours before the block is treated as fixed. Download PDF, Word, or Excel with the expiry written down.",
    intro: [
      "A single session you can schedule is the low end. A block is a range because some hours will be missed, some clients want a written plan, and a nutrition note is a different job from the hour in the gym.",
      "Put an expiry on unused hours inside the assumptions. A block without an end date becomes an argument six months later.",
    ],
    method: [
      "Price the assessment apart from the repeating sessions. The assessment tells you the high end of the programming.",
      "A written plan and any food note stay in the high column until the client asks for them. They are not a free side of the session.",
    ],
    assumptions: [
      "The low total is the assessment plus the named in-person sessions.",
      "Unused sessions expire on the date written in the assumptions.",
      "A written plan or a food note is the high column, not part of every hour.",
      "Travel to a client site, or a small-group format, is a separate line.",
    ],
    lines: [
      { description: "First assessment", quantity: "1", price: "70", priceHigh: "110" },
      { description: "Following sessions", quantity: "8", price: "55", priceHigh: "80" },
      { description: "Written training plan", quantity: "1", price: "0", priceHigh: "90" },
      { description: "Unused session, if it expires", quantity: "1", price: "0", priceHigh: "55" },
    ],
    faqs: [
      { question: "Why show unused training sessions in the range?", answer: "Clients read a block as hours they can keep forever. The high column and the expiry say what happens when a session is not used, before anyone argues about it." },
      { question: "Is a meal note part of the session?", answer: "Not by default. It is an allowance. If they want it, it stays as a line. If they do not, the low total is the hours in the gym only." },
      { question: "When does the block stop being a range?", answer: "When the count, the length, and the expiry are agreed. Convert to quote copies those lines and keeps the high prices in the notes." },
    ],
  },
  {
    slug: "interior-designer",
    description: "An interior estimate separates the design fee from furniture money, which stays an allowance until products are chosen. Download PDF, Word, or Excel.",
    intro: [
      "The drawing and the concept can be bracketed from a visit. The furniture cannot, until someone picks real products. Concept and drawings are the low end. Procurement time and a goods allowance that still might change are the high end.",
      "Never blend your fee with the sofa budget. A client who cuts the furniture should still see what the design time costs.",
    ],
    method: [
      "Walk the rooms and note what is a concept, what is a drawing, and what is you managing orders. Those three do not move together.",
      "Goods are an allowance with a low and a high, labelled as money that passes through, not as your fee.",
    ],
    assumptions: [
      "The low total is concept and drawings for the rooms you walked.",
      "Furniture and finishes are allowances, not a locked product list.",
      "Procurement time is included only on its own line.",
      "Builders, joiners, and structural work are outside this bracket.",
    ],
    lines: [
      { description: "Concept for the rooms visited", quantity: "1", price: "1200", priceHigh: "2200" },
      { description: "Drawings of the agreed rooms", quantity: "1", price: "800", priceHigh: "1500" },
      { description: "Procurement time", quantity: "1", price: "0", priceHigh: "900" },
      { description: "Goods allowance, not a product list", quantity: "1", price: "2000", priceHigh: "8000" },
    ],
    faqs: [
      { question: "Why is furniture a range and not a shopping list?", answer: "The products are not chosen. The allowance shows a floor and a ceiling for goods. Your fee is the other lines, so cutting a sofa does not look like cutting the design." },
      { question: "Does the visit lock the number of rooms?", answer: "It locks the rooms you walked. Another room is a new line. The assumptions should say the low total is only the rooms seen." },
      { question: "When can procurement become a fixed fee?", answer: "When the product list exists. Until then leave it as an allowance, and convert to quote only the design lines the client has accepted." },
    ],
  },
  {
    slug: "copywriter",
    description: "A copywriting estimate counts assets and research as a range, with rush timing in the high end. Download PDF, Word, or Excel before a new page is an edit.",
    intro: [
      "A known page with a source you already have is the low end. Interviews you still have to book, a second stakeholder who rewrites the brief, or a deadline that compresses the week is the high end.",
      "Count assets, not a vague 'website words' line. A homepage and a launch email do not share a range just because both are sentences.",
    ],
    method: [
      "List each asset and whether the research is already in a document or still in someone's head. The second case is the wide line.",
      "A revision inside the agreed asset stays in the low column. A new asset, or a new reader who changes the audience, is the high column.",
    ],
    assumptions: [
      "The low total is the named assets and one revision on each.",
      "Interviews and desk research you still have to do sit in the high column.",
      "Rush timing is an allowance, not the ordinary pace.",
      "Design, translation, and publishing the page are outside this bracket.",
    ],
    lines: [
      { description: "Named assets, first draft", quantity: "4", price: "180", priceHigh: "320" },
      { description: "Research still to be gathered", quantity: "1", price: "0", priceHigh: "400" },
      { description: "Revision on the agreed assets", quantity: "1", price: "120", priceHigh: "240" },
      { description: "Rush timing", quantity: "1", price: "0", priceHigh: "300" },
    ],
    faqs: [
      { question: "Why is research its own range?", answer: "If the facts are in a brief, the draft is the low end. If you still have to interview people, that time is real and belongs in the high column instead of inside the page price." },
      { question: "When is a change a new asset?", answer: "When the audience or the offer changes. A sentence fix on the agreed page is the revision line. A new page is another quantity on the asset line, or a new line." },
      { question: "How do extra readers affect the bracket?", answer: "One more approver often means another pass. Put that in the high end of the revision line, and say so in the assumptions before the draft starts." },
    ],
  },
  {
    slug: "videographer",
    description: "A video estimate splits the shoot from the edit and keeps music rights and travel in the high end. Download PDF, Word, or Excel before the film is one day.",
    intro: [
      "The shoot day can be walked. The edit cannot, until the finished length and the number of cuts are named. A short cut from one location is the low end. A longer cut, licensed music, travel, or a second camera is the high end.",
      "Do not hide the edit inside the day rate. Clients remember the day and forget the week at the desk.",
    ],
    method: [
      "Write the location, the hours, and the finished runtime as separate lines. A change of runtime moves only the edit.",
      "Music rights and travel stay allowances. You cannot know the track, or the distance, until the cut and the call sheet exist.",
    ],
    assumptions: [
      "The low total is one location and the named runtime.",
      "Another cut, a longer runtime, or a second camera sits in the high column.",
      "Music licensing is an allowance, not a specific track.",
      "Travel, permits, and talent fees are out unless listed.",
    ],
    lines: [
      { description: "Shoot at one location", quantity: "1", price: "700", priceHigh: "1200" },
      { description: "Edit to the named runtime", quantity: "1", price: "500", priceHigh: "1100" },
      { description: "Music rights allowance", quantity: "1", price: "0", priceHigh: "250" },
      { description: "Travel or a second camera", quantity: "1", price: "0", priceHigh: "400" },
    ],
    faqs: [
      { question: "Why is the edit wider than the shoot?", answer: "The shoot is a day you can see. The edit grows with runtime and with extra cuts. The high end is that growth, not a second copy of the day rate." },
      { question: "Are music rights inside the day?", answer: "No. They are an allowance until a track is chosen. The assumptions should say the low total does not include a licence." },
      { question: "When can the film become one figure?", answer: "When runtime, cuts, and whether you need a second camera are settled. Convert to quote carries the lines and leaves the high prices in the notes." },
    ],
  },
  {
    slug: "dog-walker",
    description: "A dog-walking estimate prices visit length and extra dogs as a range, and shows the holiday walk. Download PDF, Word, or Excel before feeding is assumed free.",
    intro: [
      "A solo walk of a known length is the low end. A second dog, a longer slot, a public holiday, or a request to feed and medicate is the high end. Those are easy to treat as kindness and then impossible to bill later.",
      "Name the pet and the slot. A weekly pack is a quantity of visits, not a flat 'dog care' number that hides which days moved.",
    ],
    method: [
      "Price one dog and the usual slot as the low line. Each extra dog from the same home is a smaller add-on with its own high end if the dogs pull in different directions.",
      "Holiday dates and medication are allowances. Leave them at a low of zero if the client may decline them.",
    ],
    assumptions: [
      "The low total is one dog for the named visit length.",
      "Extra dogs, holidays, and medication are the high column or their own lines.",
      "Keys, leads, and any park permit match what you were shown.",
      "Vet care and overnight minding are outside this bracket.",
    ],
    lines: [
      { description: "Solo visit, named length", quantity: "5", price: "18", priceHigh: "28" },
      { description: "Extra dog from the same home", quantity: "1", price: "8", priceHigh: "14" },
      { description: "Public-holiday visit", quantity: "1", price: "0", priceHigh: "35" },
      { description: "Feed or medication on the visit", quantity: "1", price: "0", priceHigh: "10" },
    ],
    faqs: [
      { question: "Why is a second dog not just the same visit?", answer: "The slot gets harder, not longer by magic. The add-on is a small range so two calm dogs and two dogs that need splitting are not the same price." },
      { question: "Are holidays inside the weekly pack?", answer: "Only if the holiday line is kept. Otherwise the assumptions say holiday walks are the high, optional line and can be declined." },
      { question: "When does the week become a fixed pack?", answer: "When the dogs, the length, and the holiday rule are agreed. Convert to quote copies each visit line onto one price." },
    ],
  },
  {
    slug: "translator",
    description: "A translation estimate names the language pair and prices review or sworn steps as the high end. Download PDF, Word, or Excel before layout is treated as words.",
    intro: [
      "A clean text in a pair you know is the low end. A scanned file, a second reader, a sworn step, or rebuilding a designed layout is the high end. The word count is not the whole job when the file is not actually text.",
      "Say the unit out loud: source words, pages, or a minimum. A range without a unit gets compared with a completely different job.",
    ],
    method: [
      "Count what you can already select as text. If the file is a scan or a poster, the high column covers the rebuild, not a higher rate on words you do not have.",
      "A second linguist or a sworn certification is its own allowance. Leave the low at zero when the client may not need it.",
    ],
    assumptions: [
      "The low total is a clean file in the named language pair.",
      "Review by another linguist, or a sworn step, is the high column.",
      "Rebuilding a designed layout is not included in the word line.",
      "The range moves if the source file grows after you counted it.",
    ],
    lines: [
      { description: "Source words, clean file", quantity: "2000", price: "0.12", priceHigh: "0.18" },
      { description: "Second linguist review", quantity: "1", price: "0", priceHigh: "180" },
      { description: "Sworn or certified step", quantity: "1", price: "0", priceHigh: "120" },
      { description: "Rebuild of a designed layout", quantity: "1", price: "0", priceHigh: "240" },
    ],
    faqs: [
      { question: "Why is a translation range about the file, not only the rate?", answer: "A selectable document is the low end. A scan or a poster adds hours that are not words. The high column is that work, so the rate itself stays explainable." },
      { question: "Is a second reader assumed?", answer: "No. The review line starts at zero. If they want another linguist or a sworn step, that allowance is already visible." },
      { question: "When can the word price stop being a range?", answer: "When the file is final and you know whether review or layout is in. Convert to quote then, with the low rate as the line price." },
    ],
  },
  {
    slug: "music-teacher",
    description: "A music-teaching estimate counts lessons and absences as a range, and keeps exams in the high end. Download PDF, Word, or Excel before a term is one fee.",
    intro: [
      "A term is a count of lessons plus a rule for the ones that do not happen. The ordinary lesson is the low end. An absence you still hold, an exam you accompany, or extra rehearsals before a show is the high end.",
      "Name the instrument and the length. A half hour and an hour are different brackets even when the student is the same.",
    ],
    method: [
      "Set the term quantity from the calendar you can already see. The high price on the lesson line covers a longer slot if they are still choosing 30 or 45 minutes.",
      "Exam days and show rehearsals are allowances at a low of zero. They are the pieces people forget until the month they happen.",
    ],
    assumptions: [
      "The low total is the named instrument and the named lesson length.",
      "One absence can be moved. Further absences are the high column if you still hold the slot.",
      "Exam accompaniment and extra rehearsals are separate lines.",
      "Instrument hire and bought sheet music are the student's cost.",
    ],
    lines: [
      { description: "Term lessons, named length", quantity: "10", price: "30", priceHigh: "45" },
      { description: "Absence you still hold", quantity: "1", price: "0", priceHigh: "30" },
      { description: "Exam accompaniment", quantity: "1", price: "0", priceHigh: "60" },
      { description: "Extra rehearsal before a show", quantity: "1", price: "0", priceHigh: "40" },
    ],
    faqs: [
      { question: "Why is lesson length a range?", answer: "Families often have not chosen 30 or 45 minutes. The low end is the shorter slot. The high end is the longer one, so the term total can be read before they decide." },
      { question: "What does an absence do to the term?", answer: "The assumptions say one missed lesson moves. If you still hold the slot after that, the high line shows the cost instead of burying it in the term." },
      { question: "Are exams inside the term lessons?", answer: "No. Accompaniment and extra rehearsals are optional lines. Leave them off the quote if the student is not taking the exam." },
    ],
  },
  {
    slug: "event-planner",
    description: "An event-planning estimate prices your fee apart from vendor budgets, which stay allowances. Download PDF, Word, or Excel before a deposit is your fee.",
    intro: [
      "Your decisions have a shape. The vendors do not, until contracts exist. The planning fee for a named set of decisions is the low end. Vendor budgets, a longer guest list, or day-of coordination you have not staffed is the high end.",
      "Pass-through money is not your fee. A client who reads one blended number will think the venue deposit was your profit.",
    ],
    method: [
      "List the decisions the fee covers: venue shortlist, vendor chase, run-of-show. Anything outside that list is a high-column allowance.",
      "Put each large vendor budget on its own line with a low and a high, labelled as money that passes through when a booking is made.",
    ],
    assumptions: [
      "The low total is the planning fee for the decisions named above.",
      "Venue, food, and florals are allowances, not confirmed bookings.",
      "Day-of staff beyond you are the high column.",
      "A change of date or city resets the range.",
    ],
    lines: [
      { description: "Planning fee, named decisions", quantity: "1", price: "1800", priceHigh: "3200" },
      { description: "Venue budget, not a booking", quantity: "1", price: "2000", priceHigh: "7000" },
      { description: "Food budget, not a booking", quantity: "1", price: "1500", priceHigh: "5000" },
      { description: "Day-of coordination", quantity: "1", price: "400", priceHigh: "1100" },
    ],
    faqs: [
      { question: "Why are vendor budgets inside an estimate at all?", answer: "So the client sees the size of the day. They are allowances, not bookings. The planning fee is the line that is actually yours." },
      { question: "What widens the planning fee itself?", answer: "More decisions, another city, or a guest list that changes the format. The high end of the fee is that, separate from the venue money." },
      { question: "When do allowances become bookings?", answer: "When a vendor is chosen. Convert the planning lines to a quote, and replace an allowance with the real booking only after it exists." },
    ],
  },
  {
    slug: "virtual-assistant",
    description: "A virtual-assistant estimate brackets retained hours and names the tasks inside them. Download PDF, Word, or Excel before a month is an unlimited inbox.",
    intro: [
      "A month of help is a range until the task list is bounded. Inbox and calendar for a known volume is the low end. Research, a second brand, overflow hours, or tools you would subscribe to for them is the high end.",
      "Hours without a task list get read as 'whatever comes up'. The assumptions have to say what is in bounds.",
    ],
    method: [
      "Pick the tasks you have actually seen: inbox, scheduling, a named research job. Leave unseen task types in the high column.",
      "Tools are the client's subscriptions unless a line says you will pay. Overflow hours are a rate, not a silent extension of the retainer.",
    ],
    assumptions: [
      "The low total is the named tasks and the named hours.",
      "Hours beyond the pack are the high column's rate.",
      "A new task type is not already included.",
      "Software you would buy for this client is their cost unless listed.",
    ],
    lines: [
      { description: "Retained hours, named tasks", quantity: "10", price: "30", priceHigh: "45" },
      { description: "Overflow hours", quantity: "3", price: "35", priceHigh: "50" },
      { description: "Research beyond the inbox", quantity: "1", price: "0", priceHigh: "150" },
      { description: "Tools bought for this client", quantity: "1", price: "0", priceHigh: "40" },
    ],
    faqs: [
      { question: "Why is a retainer still a range?", answer: "Because the task list is not closed. The low end is the work you have seen. The high end is overflow and tasks that were not in the first description." },
      { question: "Are tools part of the hour?", answer: "No. If you subscribe on their behalf, that is its own allowance. Otherwise the assumptions say the tools stay in their name." },
      { question: "When can the month be a single fee?", answer: "When the hours and the task list are both written down. Convert to quote, and delete the overflow line if they want a hard cap instead." },
    ],
  },
  {
    slug: "mechanic",
    description: "A mechanic estimate prices the labour you can see and a parts allowance, and says a strip-down may find more. Download PDF, Word, or Excel before it is opened.",
    intro: [
      "The operation you can name from a look or a scan is the low end. Parts you expect, and faults that appear only after something is apart, are the high end. A single job number pretends the strip-down already happened.",
      "Identify the vehicle on the estimate. A range with no registration is a range for a different car.",
    ],
    method: [
      "Split labour for the named operation from the parts allowance. The parts line can start at the known component and rise if the surrounding pieces are seized.",
      "Diagnostic time is its own line when you have not yet opened the job. It should not vanish into the repair if the client stops there.",
    ],
    assumptions: [
      "The low total is the named operation and the parts you already expect.",
      "Further faults found after dismantling are the high column, then a revised range.",
      "The vehicle is the one identified on the estimate.",
      "Consumables beyond the usual workshop kit are listed if they are significant.",
    ],
    lines: [
      { description: "Diagnostic time before opening", quantity: "1", price: "80", priceHigh: "140" },
      { description: "Labour for the named operation", quantity: "2", price: "90", priceHigh: "140" },
      { description: "Expected parts", quantity: "1", price: "60", priceHigh: "220" },
      { description: "Further faults after dismantling", quantity: "1", price: "0", priceHigh: "300" },
    ],
    faqs: [
      { question: "Why can a repair range grow after the strip-down?", answer: "Seized fixings and a second failed part are not visible on the ramp. The high column is that possibility. If it becomes real, you publish a revised range before continuing." },
      { question: "Should parts and labour share a line?", answer: "No. The client needs to see which end moved. Parts are an allowance. Labour is the operation you named." },
      { question: "When is the range a figure you will honour?", answer: "When the job is open and the extra faults are either found or ruled out. Convert to quote at that point, not from the first glance." },
    ],
  },
  {
    slug: "florist",
    description: "A floral estimate describes scale and keeps install, collection, and vessels in the high end. Download PDF, Word, or Excel while flower prices can still move.",
    intro: [
      "Stem prices move with the week and the season. A known scale in flowers you can get this week is the low end. A larger install, hired vessels, collection after the event, or a bloom that is out of season is the high end.",
      "Describe the scale in words a client can picture: a table centre, a ceremony arch. A range with no picture of size gets compared with a bouquet.",
    ],
    method: [
      "Separate the flowers from the labour to install them and from the trip to collect them. A client who only wants delivery should see collection as optional.",
      "Vessels are hire or purchase, not a silent part of the stems. Put them in the high column until the client chooses.",
    ],
    assumptions: [
      "The low total is the named scale in flowers available this week.",
      "Stem prices move if the valid-until date passes.",
      "Installation and collection are included only on their lines.",
      "Hired vessels are returned. Bought vessels are the high end if they keep them.",
    ],
    lines: [
      { description: "Flowers for the named scale", quantity: "1", price: "180", priceHigh: "420" },
      { description: "Install on site", quantity: "1", price: "60", priceHigh: "180" },
      { description: "Collection after the event", quantity: "1", price: "0", priceHigh: "90" },
      { description: "Vessels, hire or keep", quantity: "1", price: "20", priceHigh: "80" },
    ],
    faqs: [
      { question: "Why do flower prices need a valid-until date?", answer: "The same stem is a different cost next month. The low end is what you can get now. After the date, the range is no longer the one you would publish." },
      { question: "Is collection part of the arrangement?", answer: "Only on its line. If they keep the flowers and you never return, that line stays at zero." },
      { question: "When can the scale become one price?", answer: "When the size, the vessels, and whether you install are chosen, and the date is inside the validity window. Convert to quote then." },
    ],
  },
  {
    slug: "baker",
    description: "A bakery estimate prices servings and flavour as a range, and keeps delivery and diet changes visible. Download PDF, Word, or Excel before the cake is fixed.",
    intro: [
      "Servings and a known flavour can be bracketed. A diet change, a second tier, delivery, or a tasting you later credit is the high end. A cake price with none of that named gets rewritten the week of the event.",
      "Write the event date on the estimate. A range for a date you cannot staff is not a range you can keep.",
    ],
    method: [
      "Use servings as the quantity when the cake is priced that way, with a low flavour and a high flavour if they are still choosing. Structure and diet changes are separate.",
      "A tasting is a small line of its own. If you credit it against the order, say that in the assumptions rather than hiding the fee.",
    ],
    assumptions: [
      "The low total is the named servings and the simpler flavour.",
      "Dietary changes and extra tiers sit in the high column.",
      "Delivery and setup are included only if their line is kept.",
      "A tasting fee is credited against the order only when the assumptions say so.",
    ],
    lines: [
      { description: "Servings, simpler flavour", quantity: "40", price: "4", priceHigh: "7" },
      { description: "Diet change or extra tier", quantity: "1", price: "0", priceHigh: "80" },
      { description: "Delivery and setup", quantity: "1", price: "0", priceHigh: "60" },
      { description: "Tasting, creditable if agreed", quantity: "1", price: "15", priceHigh: "30" },
    ],
    faqs: [
      { question: "Why is flavour a range?", answer: "Fillings and finishes do not cost the same. The low end is the simpler cake. The high end is the finish they are still choosing, so the event total can be read either way." },
      { question: "Is a tasting free?", answer: "It is a small line. The assumptions say whether that amount comes off the cake if they order. It should not be an invisible gift or a surprise fee." },
      { question: "When is the cake no longer a range?", answer: "When servings, flavour, diet changes, and delivery are chosen and the date is one you can bake. Convert to quote at that point." },
    ],
  },
  {
    slug: "massage-therapist",
    description: "A massage estimate prices session length and headcount, and keeps the table and travel in the high end. Download PDF, Word, or Excel. Not a medical outcome.",
    intro: [
      "A single session in your room is the low end. A workplace visit, more people, a longer slot, or you bringing the table is the high end. The range is about time and travel, not about a health result.",
      "Say the length in minutes. A sixty-minute and a ninety-minute visit are different brackets, and a block of sessions is a quantity, not a cure.",
    ],
    method: [
      "Price one person and one length as the base. Multiply people only when you have seen the room and the timetable.",
      "Travel and the table are allowances for off-site work. In the studio they can stay at zero.",
    ],
    assumptions: [
      "The low total is the named length in your usual room.",
      "Extra people and a longer slot sit in the high column.",
      "Travel and table hire apply only away from the studio.",
      "The range does not promise a medical result.",
    ],
    lines: [
      { description: "Session, named length, one person", quantity: "1", price: "70", priceHigh: "110" },
      { description: "Further people on the same visit", quantity: "3", price: "60", priceHigh: "90" },
      { description: "Travel to a workplace", quantity: "1", price: "0", priceHigh: "40" },
      { description: "Table, if the site has none", quantity: "1", price: "0", priceHigh: "25" },
    ],
    faqs: [
      { question: "Why is a workplace visit wider than a studio hour?", answer: "You lose the travel and you may be carrying equipment. The low end is the room you already have. The high end is the hour plus getting there." },
      { question: "Does the range promise a treatment result?", answer: "No. It prices time, people, and travel. The assumptions say it is not a medical outcome, and the download says it is not a fixed quote." },
      { question: "When can a block of sessions be one figure?", answer: "When the length, the number of people, and whether you travel are known. Convert to quote copies those lines." },
    ],
  },
  {
    slug: "it-support",
    description: "An IT support estimate says whether the work is remote or on site, and keeps hardware as an allowance. Download PDF, Word, or Excel before hardware is labour.",
    intro: [
      "A remote hour on a problem you have already seen is the low end. A site visit, a full workstation build, or hardware and licences you have not identified is the high end. Labour and boxes should not share a line.",
      "If the exact product is unknown, the hardware line is an allowance. Naming a brand you have not checked turns the range into a guess with a logo on it.",
    ],
    method: [
      "Split remote help, on-site time, and a setup that has a beginning and an end. A managed month is a different shape and should not be stuffed into a break-fix hour.",
      "Licences stay an allowance at a low of zero unless you will buy a named product.",
    ],
    assumptions: [
      "The low total is remote help for the problem described.",
      "On-site time and a workstation setup are the high column or their own lines.",
      "Hardware and licences are allowances until the product is known.",
      "Passwords, admin rights, and a contact on site are available when the line says you will attend.",
    ],
    lines: [
      { description: "Remote help for the described problem", quantity: "2", price: "70", priceHigh: "110" },
      { description: "On-site hour", quantity: "1", price: "90", priceHigh: "150" },
      { description: "Workstation setup", quantity: "1", price: "120", priceHigh: "280" },
      { description: "Hardware or licence allowance", quantity: "1", price: "0", priceHigh: "400" },
    ],
    faqs: [
      { question: "Why is hardware not inside the IT labour range?", answer: "You do not know the product yet. Labour is the hour. The box or the licence is an allowance so a client does not think a laptop was included in the call-out." },
      { question: "When is on-site time the low end?", answer: "Only if the problem cannot be seen remotely and the visit is already certain. Otherwise remote is the low end and the visit is the high end." },
      { question: "How does this become a fixed setup price?", answer: "When the product and the place are known. Convert to quote, drop the unused allowance, and keep any remaining high price in the notes." },
    ],
  },
  {
    slug: "architect",
    description: "An architecture estimate names the stages in the fee and leaves surveys and other consultants in the high end. Download PDF, Word, or Excel.",
    intro: [
      "A concept for a site you have walked can be bracketed. Technical stages, a planning submission, and coordinating other consultants cannot, until the brief stops moving. The early stage is the low end. Later stages and third-party costs are the high end.",
      "Printing, a measured survey, and planning charges are not your fee. They disappear into a percentage and then surprise everyone.",
    ],
    method: [
      "Name the stages you would actually start: concept, then a later technical stage as a range. Do not publish a whole-building percentage until the brief and the consultant list exist.",
      "Put survey, planning charges, and other consultants on allowance lines with a low of zero if they may be hired directly by the client.",
    ],
    assumptions: [
      "The low total is the concept stage for the site you have seen.",
      "Later drawing stages are the high column until the brief is stable.",
      "Survey, planning charges, and other consultants are allowances or the client's own hires.",
      "A change of site or of brief resets the range.",
    ],
    lines: [
      { description: "Concept stage for the site visited", quantity: "1", price: "2500", priceHigh: "4500" },
      { description: "Later drawing stage", quantity: "1", price: "0", priceHigh: "6000" },
      { description: "Planning submission time", quantity: "1", price: "0", priceHigh: "1800" },
      { description: "Survey and consultant allowances", quantity: "1", price: "0", priceHigh: "2500" },
    ],
    faqs: [
      { question: "Why not a percentage of the build on the first estimate?", answer: "The brief and the consultant list are not stable. A percentage pretends they are. The range covers the stage you can start, and leaves later stages visible as a high end." },
      { question: "Are planning charges part of the fee?", answer: "No. They are an allowance or the client's payment to the authority. The assumptions should say which, so a submission fee is not read as extra design time." },
      { question: "When can a later stage be added as one figure?", answer: "When that stage is actually instructed. Convert the concept lines to a quote first, and add the next stage when the brief is the one you priced." },
    ],
  },
  {
    slug: "social-media-manager",
    description: "A social estimate counts posts and platforms, and keeps filming and ad spend out of the low total. Download PDF, Word, or Excel before a month is unlimited.",
    intro: [
      "A month of posts on platforms you have already seen is the low end. Filming, daily community replies, a report beyond a simple export, or media spend is the high end. Ad spend is their budget at the platform, not your hours.",
      "Count posts. A line that says 'social media' cannot move when they add a channel in week two.",
    ],
    method: [
      "List the platforms and the post count. Stories and community replies are separate so they can be declined.",
      "Filming is an allowance. If they hand you finished clips, that line stays at zero. If you have to shoot, the high end is the shoot, not a higher price per caption.",
    ],
    assumptions: [
      "The low total is the named posts on the named platforms.",
      "Filming, community replies, and a written report are the high column or their own lines.",
      "Money paid to the platforms is not your fee.",
      "A new platform after the month starts is a new line.",
    ],
    lines: [
      { description: "Posts on the named platforms", quantity: "12", price: "40", priceHigh: "70" },
      { description: "Community replies", quantity: "1", price: "0", priceHigh: "200" },
      { description: "Filming, if clips are not supplied", quantity: "1", price: "0", priceHigh: "350" },
      { description: "Short monthly report", quantity: "1", price: "0", priceHigh: "80" },
    ],
    faqs: [
      { question: "Why is ad spend missing from the low total?", answer: "It is paid to the platform, not to you. Putting it in your fee makes the month look larger and then starts a fight about whose money it was." },
      { question: "What if they add a platform mid-month?", answer: "That is a new line, not a stretch of the post count. The assumptions say the low total is only the platforms named when the range was written." },
      { question: "When can the month be a single fee?", answer: "When the post count, the platforms, and whether you film or reply are all chosen. Convert to quote and drop the lines they declined." },
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
