/**
 * Bilingual content. English is the source of truth for structure;
 * the Spanish dictionary is typed against it, so a missing key is a build error.
 */

export type Str = string;
export type List = readonly string[];
export type Rows = readonly (readonly [string, string])[];

/** Widen literal types while preserving the structure (tuples stay tuples). */
export type DictValue<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly unknown[]
        ? { [K in keyof T]: DictValue<T[K]> }
        : { [K in keyof T]: DictValue<T[K]> };

export const en = {
  meta: {
    locale: "en_US",
    langName: "English",
    switchTo: "Español",
    switchAria: "Cambiar el sitio a español",
  },

  /** Brand essence, straight from the brand book. */
  tagline: "Your home, handled.",

  /**
   * The plain answer to "what does this company do", in one sentence and with no
   * brand language in it. Everything above the fold leans on the tagline, which
   * is evocative rather than descriptive — this is the line that has to be
   * understood by someone who has never heard of the company and is skimming.
   */
  whatWeDo: {
    label: "What we do",
    line:
      "We repair, maintain and improve homes — the whole list, from a sticking door to repainting a floor. One company, one quote, one crew.",
    /** The fastest possible read of the offer, as a legend. */
    glanceTitle: "Six things off your list",
    glanceHint: "Point at one to see what it covers.",
  },

  /**
   * The concise home page.
   *
   * Measured target: the whole page reads in under 30 seconds. At ~200 words
   * per minute of body copy that allows about 200 words for the ENTIRE page,
   * including labels and buttons. The long-form home ran to 1,411 words over
   * 8,960px, which is roughly seven minutes of reading — the reason this exists.
   *
   * The rule applied here: the home page ANSWERS, the inner pages EXPLAIN. Every
   * block that was doing explanatory work has moved to the page that owns it, and
   * what remains is the shortest true statement of each idea.
   */
  concise: {
    /**
     * The hero's own answer to "what does this company do" — 12 words where the
     * long home spends 23.
     *
     * It replaces `whatWeDo.line` on this page rather than shadowing it, and the
     * trade is deliberate: the long version spends its second half on a concrete
     * example ("from a sticking door to repainting a floor") which is worth its
     * words when the reader is settling in, and is not worth them in a hero that
     * has to land in one glance. `whatWeDo.line` is untouched for the long home.
     */
    heroLine: "Repairs, maintenance and improvements. One list, one price, one crew.",
    /**
     * The four commitments.
     *
     * The heading used to read "Four things, every job." above WE ANSWER / WE
     * ARRIVE / WE QUOTE FIRST / WE STAND BEHIND IT — which are four promises, not
     * four things, and the mismatch was the kind of small wrongness that makes a
     * reader trust the rest of the page slightly less without knowing why.
     */
    promise: "Four promises, every job.",
    /** Service tiles: short name + one line. Rewritten, not truncated. */
    tilesTitle: "What we do",
    /**
     * "Point at one" was wrong on every touch device, where there is nothing to
     * point with. The tiles are buttons — they are tapped — so the hint names both.
     */
    tilesHint: "Tap or point at one to see what it covers.",
    tilesCta: "Services",
    /** Three steps, not five: the two that moved out were process detail. */
    stepsTitle: "How it works",
    stepsCta: "Process",
    faqTitle: "Common questions",
    faqAll: "All questions",
    areasTitle: "Areas",
    /**
     * "See my address", not "My address". Cutting label words for brevity dropped
     * the verb and left a form-field caption where a link belongs — nothing about
     * "My address" says it can be pressed.
     */
    areasCta: "See my address",
    /** The interactive selector. */
    pickerTitle: "What's on your list?",
    pickerHint: "Tap what you need. We will quote the whole list in one price.",
    /*
     * The count is only ever a digit beside this word, so "1 selected" and
     * "3 selected" are both correct and no plural form is needed in English. The
     * CTA is the case that needs two forms: "Quote these 1" is not English, and
     * n=1 is the state a first-time visitor is most likely to be in.
     */
    pickerSelected: "selected",
    pickerSelectedOne: "selected",
    pickerCta: "Quote these {n}",
    pickerCtaOne: "Quote this one",
    pickerEmpty: "Quote my list",
    pickerClear: "Clear",

    /**
     * The close, and the two objections it exists to answer.
     *
     * The long home's CTA carries "No obligation, no pressure, and no charge for
     * the conversation." The concise page rendered only the title and the
     * tagline, which dropped the three most valuable words on the page for a
     * stranger deciding whether asking costs them anything. One short line puts
     * them back without putting the paragraph back.
     */
    closeBody: "One written price. No obligation, no charge for the conversation.",

    /*
     * The caption under the hero footage. It describes what is ON SCREEN rather
     * than selling it, which is what a caption is for — and it is also the text a
     * screen reader gets in place of the video, which is `aria-hidden` because it
     * has no audio track to caption and no information the caption does not carry.
     */
    plateCaption: "Our own truck, our own crew.",
    plateNote: "On the way to a job",

    /**
     * The problem, said once. The long home spent 138 words on it across three
     * cards; on a page that has to read in 30 seconds it gets one line and three
     * labels, because the reader already knows they are tired of chasing people —
     * they do not need to be told they are.
     */
    problem: "Finding someone reliable is the hard part. Not finding someone.",
    problemTags: ["Nobody answers", "Nobody shows", "You end up managing it"],

    /** Three steps, not five. Steps 2 and 5 of the long version were detail. */
    steps: [
      { n: "1", title: "Send the list", body: "Call or send the form. Photos help." },
      { n: "2", title: "Get one written price", body: "Fixed, before anything starts." },
      { n: "3", title: "We arrive and finish it", body: "Then we walk it with you." },
    ],

    /** Three questions, answered in a line each. The other five live on /contact. */
    faq: [
      {
        q: "What does it cost?",
        a: "Placeholder — publish your call-out fee and minimum job.",
      },
      {
        q: "Are you insured?",
        a: "Yes, and licensed work goes to a licensed partner we bring.",
      },
      {
        q: "How fast can you come?",
        a: "Placeholder — publish your real response time.",
      },
    ],
  },

  nav: {
    home: "Home",
    services: "Services",
    areas: "Service Areas",
    about: "About",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    call: "Call now",
    quote: "Request a quote",
    skip: "Skip to main content",
  },

  common: {
    inHouse: "In-house crew",
    partner: "Licensed partner",
    included: "What's covered",
    scope: "Typical scope",
    notIncluded: "What we don't do",
    learnMore: "See the full list",
    allServices: "All services",
    backHome: "Back to home",
    placeholderNote:
      "Placeholder detail — replace before launch",
    syntheticNote: "Illustrative example",
    required: "Required",
    optional: "Optional",
  },

  hero: {
    title: "Your home,\nhandled.",
    sub: "One company. One standard. One point of contact.",
    body:
      "HandyMan manages small-to-mid-sized home projects with a qualified in-house crew, plus licensed trade partners when the law requires one. You hire us — not an individual worker. We schedule the job, quote the price, and take responsibility for the result.",
    ctaPrimary: "Request a quote",
    ctaSecondary: "See what we do",
    ticketTitle: "Work order",
    ticketNo: "No. HM-1042",
    ticketFields: [
      ["Customer", "R. Alvarez"],
      ["Property", "Single-family, 1,840 sq ft"],
      ["Requested", "6 open items"],
      ["Status", "Quote approved"],
      ["Arrival", "Tue, 8:00 – 10:00 AM"],
    ] as Rows,
    /** The Status row renders as a mechanical board; see `ticketStatusCycle`. */
    ticketStatus: "Quote approved",
    /** The states a job passes through, as the office board would cycle them. */
    ticketStatusCycle: [
      "Quote approved",
      "Scheduled",
      "Crew on site",
      "Work complete",
      "Warranty active",
    ] as List,
    /**
     * The same states, short, for when the row is narrow. The board never drops
     * below the ticket's field scale; it shortens the state instead.
     */
    ticketStatusCycleShort: [
      "Approved",
      "Scheduled",
      "On site",
      "Complete",
      "Warranty",
    ] as List,
    ticketStamp: "Approved",
  },

  problem: {
    title: "Finding someone\nisn't the hard part.",
    body:
      "Homeowners are tired of calling multiple contractors, waiting for no-shows, and managing different people for every small repair. The problem is not finding someone who can do the work. It is finding someone reliable enough to answer, arrive, and stand behind it.",
    alt: [
      {
        label: "Calling around",
        title: "Six calls, four voicemails",
        body:
          "Every trade is a different number, a different schedule, and a different story about when they can get there.",
      },
      {
        label: "Waiting",
        title: "Thursday becomes never",
        body:
          "A window gets promised, then moves, then quietly disappears. Nobody calls to say it moved.",
      },
      {
        label: "Managing",
        title: "You become the general contractor",
        body:
          "Chasing three people, comparing three prices, and holding the whole list together by yourself.",
      },
    ],
    close:
      "That is the job we take off your list. One company answers, one company arrives, one company owns the outcome.",
  },

  solution: {
    title: "One company owns\nthe whole list.",
    body:
      "HandyMan manages small-to-mid-sized home projects through qualified in-house technicians and licensed trade partners when required. The customer hires HandyMan — not an individual worker. We schedule the job, communicate the price, and take responsibility for the result.",
    points: [
      {
        title: "Qualified crew",
        body: "Vetted, insured technicians on our own payroll — not a rotating cast of subcontractors.",
      },
      {
        title: "Licensed when required",
        body:
          "We know when a job legally needs a licensed specialist, and we bring one rather than improvise.",
      },
      {
        title: "One accountable company",
        body: "One quote, one schedule, one number to call if anything needs putting right.",
      },
    ],
  },

  promise: {
    title: "Four things, every job.",
    body: "This is the standard we hold ourselves to. It does not change with the size of the job.",
    items: [
      { n: "01", title: "We answer", body: "Clear and responsive communication." },
      { n: "02", title: "We arrive", body: "Reliable scheduling and updates." },
      { n: "03", title: "We quote first", body: "Approved pricing before work begins." },
      { n: "04", title: "We stand behind it", body: "Consistent quality and dependable support." },
    ],
  },

  services: {
    title: "What we take\ncare of.",
    body:
      "Six categories, and between them they cover the whole list — the small repairs, the projects you have been putting off, and the seasonal work that keeps a house ahead of itself. Grouped by what you need done, not by which trade we have to call.",
    cta: "Request a quote",
    boundaryTitle: "Where the line is",
    boundaryBody:
      "Some work legally requires a licensed trade. We tell you which before you approve anything — and we bring the licensed partner ourselves so you still have one point of contact.",
    categories: [
      {
        id: "repairs",
        name: "Everyday repairs",
        short: "Everyday repairs",
        covers:
          "The running list of small jobs — doors, drywall, caulking, shelving, screens — done in one visit instead of six.",
        blurb:
          "The running list. Small jobs that never quite justify a specialist on their own, done in one visit.",
        inHouse: true,
        items: [
          "Doors that stick, drag or won't latch",
          "Drywall patches and hole repair",
          "Caulking and re-sealing tubs, sinks and showers",
          "Shelving, brackets and heavy-mirror hanging",
          "Furniture assembly and mounting",
          "Weatherstripping and draft sealing",
          "Cabinet hardware, hinges and drawer slides",
          "Screen repair and window hardware",
        ],
        boundary: [],
      },
      {
        id: "plumbing-electrical",
        name: "Plumbing & electrical (handyman scope)",
        short: "Plumbing & electrical",
        covers:
          "Faucets, toilets, disposals, light fixtures, switches and outlets — the work a handyman may legally do. Anything past that line goes to a licensed partner we bring ourselves.",
        blurb:
          "The work a handyman can legally do, done properly. Anything past that line goes to a licensed partner — we tell you which, and we still schedule it.",
        inHouse: true,
        items: [
          "Faucet, showerhead and toilet-seat replacement",
          "Garbage disposal replacement (same circuit)",
          "Toilet fill and flush valve repair",
          "Slow-drain clearing and p-trap cleaning",
          "Light fixture and ceiling fan replacement (existing wiring)",
          "Outlet, switch and cover-plate replacement",
          "Under-cabinet and closet lighting (plug-in or existing circuit)",
          "GFCI outlet replacement",
        ],
        boundary: [
          "New circuits, panel work, or any service upgrade — licensed electrician",
          "Water heater replacement, gas lines, or moving supply/drain lines — licensed plumber",
        ],
      },
      {
        id: "carpentry",
        name: "Carpentry & doors",
        short: "Carpentry & doors",
        covers:
          "Doors hung and re-hung, trim, baseboard, closet systems, deck boards — measured, fitted and finished on site.",
        blurb:
          "Doors, trim and the woodwork that makes a house feel cared for. Measured, fitted, and finished on site.",
        inHouse: true,
        items: [
          "Interior door replacement and re-hanging",
          "Door and window trim installation",
          "Baseboard and shoe molding",
          "Closet shelving and rod systems",
          "Stair railing and banister tightening",
          "Rot repair on exterior trim",
          "Deck board and railing repair",
          "Built-in shelving and simple millwork",
        ],
        boundary: ["Load-bearing wall changes or structural framing — licensed engineer and permit"],
      },
      {
        id: "paint",
        name: "Paint & wall finish",
        short: "Paint & wall finish",
        covers:
          "Interior and exterior painting, drywall repair before it, and the prep that decides whether the job lasts.",
        blurb:
          "Interior and exterior painting with the prep done first — because prep is what makes a paint job last.",
        inHouse: true,
        items: [
          "Interior wall, ceiling and trim painting",
          "Single-room and whole-floor repaints",
          "Drywall repair and skim before paint",
          "Primer and stain-blocking",
          "Exterior siding, door and shutter painting",
          "Deck cleaning and re-staining",
          "Garage floor and basement sealing",
          "Wallpaper removal",
        ],
        boundary: [],
      },
      {
        id: "exterior",
        name: "Exterior & seasonal",
        short: "Exterior & seasonal",
        covers:
          "Gutters, pressure washing, fences, storm prep and winterizing — booked in blocks while the weather holds.",
        blurb:
          "The work that keeps water out and a house ahead of the season. Booked in blocks while the weather holds.",
        inHouse: true,
        items: [
          "Gutter cleaning, resealing and guard fitting",
          "Pressure washing — siding, deck, driveway, walkways",
          "Fence repair and gate alignment",
          "Mailbox, house-number and exterior fixture mounting",
          "Storm-prep checks and winterization",
          "Seasonal debris and leaf clearing",
          "Minor roof patching and flashing seal (walkable pitches)",
          "Sprinkler and hose-bib checks",
        ],
        boundary: [
          "Steep or multi-story roof work — licensed roofing contractor",
          "Tree removal or work near power lines — licensed arborist or utility",
        ],
      },
      {
        id: "safety",
        name: "Safety & accessibility",
        short: "Safety & accessibility",
        covers:
          "Grab bars anchored into studs, handrails, non-slip treads and detector swaps — the small installations that make a house safer to live in.",
        blurb:
          "Small installations that make a house safer for the people living in it. Often the reason someone calls us.",
        inHouse: true,
        items: [
          "Grab bars anchored into studs or blocking",
          "Handrails for steps and hallways",
          "Non-slip stair treads and edge strips",
          "Bathroom safety updates",
          "Child-safety cabinet and furniture anchoring",
          "Smoke and CO detector replacement",
          "Motion and night lighting at entries",
          "Threshold ramps and door widening clearance",
        ],
        boundary: [],
      },
    ],
    licensedTitle: "When we bring a licensed specialist",
    licensedBody:
      "Every state draws this line differently, and some jobs need a permit regardless of who does them. These are the ones we routinely route to a licensed partner — you still get one quote and one point of contact.",
    licensedItems: [
      {
        name: "Electrical beyond fixture swaps",
        body: "New circuits, panel replacements, service upgrades, and anything requiring an electrical permit.",
        who: "Licensed electrician",
      },
      {
        name: "Plumbing beyond fixture swaps",
        body: "Water heaters, gas lines, repiping, and moving supply or drain lines.",
        who: "Licensed plumber",
      },
      {
        name: "HVAC",
        body: "Heating, cooling, refrigerant lines and ductwork. We coordinate; a licensed HVAC contractor performs the work.",
        who: "Licensed HVAC contractor",
      },
      {
        name: "Roofing on steep pitches",
        body: "Multi-story, steep, or structural roof work, and anything needing a roofing permit.",
        who: "Licensed roofing contractor",
      },
      {
        name: "Asbestos, mold and lead",
        body: "Abatement and remediation in homes built before 1978, or wherever testing identifies a hazard.",
        who: "Certified remediation specialist",
      },
      {
        name: "Structural change",
        body: "Removing or altering a load-bearing wall, foundation work, and additions.",
        who: "Licensed engineer and permit",
      },
    ],
  },

  process: {
    title: "Five steps,\nno surprises.",
    body:
      "You always know which step you are on and what happens next. Nothing starts until you approve the price.",
    steps: [
      {
        n: "01",
        title: "You tell us the list",
        body:
          "Call or send the form with as much or as little detail as you have. Photos help. A rough description is enough to start.",
        meta: "Same business day",
      },
      {
        n: "02",
        title: "We walk the job",
        body:
          "We look at what is actually there — in person or by video for smaller items — and confirm what is in scope.",
        meta: "Scheduled visit",
      },
      {
        n: "03",
        title: "You get one written quote",
        body:
          "Line items, a fixed price, and a clear note on anything that needs a licensed partner or a permit. Nothing is approved until you approve it.",
        meta: "Fixed price",
      },
      {
        n: "04",
        title: "We schedule and arrive",
        body:
          "You get a two-hour arrival window and an update if anything moves. The crew shows up with the materials for the approved work.",
        meta: "2-hour window",
      },
      {
        n: "05",
        title: "We walk it together",
        body:
          "We go through the finished work with you before we leave, and the workmanship warranty starts that day. If something is not right, we come back.",
        meta: "1-year workmanship",
      },
    ],
  },

  compare: {
    title: "The difference is\nwho is accountable.",
    body:
      "There is nothing wrong with a good independent tradesperson. The trouble starts when six of them each hold a piece of your list.",
    cols: ["", "HandyMan All-in-One", "Calling around", "App-based marketplace"],
    rows: [
      ["Who you hire", "One company", "A different person per trade", "Whoever accepts the job"],
      ["Who answers", "Our office, during hours", "Whoever picks up", "An app, then a stranger"],
      ["Price", "Fixed and approved first", "Verbal, often changes", "Hourly, set by the worker"],
      ["Scheduling", "A 2-hour window you get in writing", "A day, maybe", "A slot that reassigns"],
      ["Follow-up", "We come back — warranty in writing", "You call again", "A support ticket"],
      ["Licensed work", "We bring the licensed partner", "Not our problem", "Varies by worker"],
    ],
  },

  areas: {
    title: "Where we work.",
    body:
      "We keep a tight radius on purpose. Short drives mean the crew arrives when we said it would, and can come back the same week if anything needs a second look.",
    findTitle: "Not sure if you're covered?",
    findBody: "Call or send the form with your ZIP code and we will tell you straight away.",
    cta: "Check my address",
    listTitle: "Towns we cover",
    note: "Placeholder coverage list — replace with the real service area before launch.",
  },

  about: {
    title: "Built around one\nsimple idea.",
    body:
      "HandyMan All-in-One is a home repair and maintenance company built around one simple idea: homeowners should only need one trusted company to take care of their entire home. From everyday repairs to seasonal projects, we coordinate the right professionals and remain accountable from beginning to end.",
    missionLabel: "Mission",
    mission:
      "To make home repair simple by delivering reliable service, clear pricing, and quality work through people we would trust in our own homes.",
    visionLabel: "Vision",
    vision: "To become America's most trusted all-in-one home-services company.",
    positioningLabel: "Positioning",
    positioning:
      "The trusted team for every home project. HandyMan combines the convenience of a local handyman with the reliability, organization and accountability of a professional home-services company.",
    valuesLabel: "Values",
    values: [
      {
        name: "Reliability",
        body: "We do what we say.",
        detail:
          "If we promise a window, we hold it. If something changes, you hear it from us before you have to ask.",
      },
      {
        name: "Transparency",
        body: "No hidden costs or surprises.",
        detail:
          "One written quote with line items. If the scope changes once we open a wall, we stop and re-quote before continuing.",
      },
      {
        name: "Care",
        body: "We respect every home as if it were our own.",
        detail:
          "Drop cloths down, shoes off, tools packed out, and the space left cleaner than we found it.",
      },
      {
        name: "Responsibility",
        body: "We know when a licensed specialist is required.",
        detail:
          "And we say so before you approve the job — not after something goes wrong.",
      },
    ],
    standardLabel: "The standard we hold",
    standard: [
      "Every technician is background-checked, insured and on our own payroll.",
      "Every job starts with an approved written price.",
      "Every job ends with a walkthrough and a workmanship warranty.",
      "No job is subcontracted out from under you. If we bring a licensed partner, you are told who and why.",
    ],
  },

  faq: {
    title: "Straight answers.",
    items: [
      {
        q: "What counts as a small-to-mid-sized project?",
        a: "Anything from a single sticking door up to a multi-day project across several rooms — repainting a floor, replacing interior doors, repairing exterior trim, or working through a list of twenty small items in a few visits. If a job needs a general contractor, a permit, or a licensed trade, we will tell you at the quote stage and bring the right partner.",
      },
      {
        q: "Do you charge for the quote?",
        a: "Placeholder answer — set your real policy here. Many home-services companies quote smaller lists free and charge a trip fee for larger on-site estimates, crediting it against the work if you approve. Whatever you decide, state it plainly: this is the question customers ask first.",
      },
      {
        q: "How soon can you come out?",
        a: "Placeholder answer — state your real response time. The brand promise is 'we answer', so whatever you commit to here has to hold on your busiest week, not your quietest.",
      },
      {
        q: "Are you licensed and insured?",
        a: "We carry general liability insurance and our technicians are covered. Work that legally requires a trade license is performed by a licensed partner, and we tell you which jobs those are before you approve anything. Replace this answer with your actual license number and coverage limits before launch.",
      },
      {
        q: "What if I don't like the work?",
        a: "Tell us. Workmanship is covered for one year, and we come back to put it right. We walk every finished job with you before we pack up, because it is far easier to fix something while we are still standing there.",
      },
      {
        q: "Can you work while I'm not home?",
        a: "Yes, for most jobs. We confirm the scope in writing first, and you get a call before we leave. For anything involving entry while you are away we agree the access method in advance.",
      },
      {
        q: "Do you handle the permit?",
        a: "For work that needs a permit, the licensed partner pulls it and we coordinate the schedule so you are not chasing the paperwork. Placeholder — confirm how you handle permit costs in your market.",
      },
      {
        q: "Do you bring materials?",
        a: "We bring standard consumables — caulk, fasteners, patching compound, drop cloths. For paint, fixtures and hardware we either include them as a line item on the quote or work with what you have already bought. Your choice, stated on the quote.",
      },
    ],
  },

  cta: {
    title: "Tell us what's\non your list.",
    body:
      "Send it over and we will come back with one written quote. No obligation, no pressure, and no charge for the conversation.",
    primary: "Request a quote",
    secondary: "Call {phone}",
    bullets: [
      "Same business day response",
      "One written, fixed price",
      "Licensed partner arranged for you",
      "1-year workmanship warranty",
    ],
  },

  contact: {
    title: "Start your list.",
    body:
      "The more you tell us, the more accurate the quote. Photos and a rough description are enough to get going.",
    formTitle: "Job request",
    formNo: "Form HM-1",
    fields: {
      name: "Name",
      namePh: "First and last",
      phone: "Phone",
      phonePh: "(555) 000-0000",
      email: "Email",
      emailPh: "you@example.com",
      address: "Property address or ZIP",
      addressPh: "1420 Workshop Ave, or 00000",
      services: "What do you need?",
      servicesHint: "Select everything that applies.",
      urgency: "How soon?",
      urgencyOptions: ["As soon as possible", "Within two weeks", "This month", "Just planning"],
      details: "Describe the work",
      detailsPh:
        "Two doors that won't latch, a slow bathroom drain, and the hallway needs repainting. Happy to send photos.",
      contactPref: "Best way to reach you",
      contactPrefOptions: ["Phone call", "Text message", "Email"],
      consent:
        "I agree to be contacted about this request. We do not sell or share your details.",
      submit: "Send request",
      submitting: "Sending…",
    },
    successTitle: "Request received.",
    successBody:
      "We have your list. Someone from the office will be in touch the same business day to confirm the details and arrange a time to walk the job.",
    successRef: "Reference",
    successAgain: "Send another request",
    errorTitle: "That didn't send.",
    errorBody:
      "Something went wrong on our end. Please try again, or call us directly — we would rather hear from you than lose the job.",
    asideTitle: "Or just call",
    asideBody: "A real person answers during business hours. If we miss you, we call back the same day.",
    hoursTitle: "Hours",
    areasTitle: "Service area",
    areasBody: "We cover these towns and the surrounding area:",
  },

  /**
   * The footer.
   *
   * It carries no blurb and no second tagline. Both used to sit here and both
   * were repetitions: the blurb restated the hero's own sub-line almost word for
   * word, and the tagline ran a third time at the bottom of the page on a site
   * whose logo lockup already spells it out. Cutting them took 15 words off every
   * one of the 13 routes without removing a single fact, and the footer keeps
   * every link, address, hour and disclaimer it had.
   */
  footer: {
    servicesTitle: "Services",
    companyTitle: "Company",
    contactTitle: "Contact",
    hoursTitle: "Hours",
    areasTitle: "Areas",
    rights: "All rights reserved.",
    placeholder:
      "Placeholders to replace before launch: phone, email, address, service areas, hours, license number and every figure marked on this site.",
  },

  notFound: {
    code: "404",
    title: "Nothing on this ticket.",
    body:
      "That page isn't here. The job list, though, is right where you left it.",
    cta: "Back to home",
  },

  legal: {
    title: "Legal",
    body: "Placeholder — add your privacy policy and terms before launch.",
  },
} as const;

export type Dict = typeof en;
