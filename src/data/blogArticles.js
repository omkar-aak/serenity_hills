export const blogArticles = [
  {
    slug: "konkan-smart-money-2026",
    category: "investment",
    label: "Konkan Investment Guide",
    tag: "Investment",
    title: "Why the Konkan belt is where the smart money is moving in 2026",
    excerpt: "Infrastructure, demand, and pricing compared across Goa, Alibaug, and Dapoli: a plain-numbers view for serious second-home buyers.",
    body: [
      "Dapoli is becoming interesting because it still offers a quieter Konkan setting while infrastructure, weekend access, and second-home demand continue to improve.",
      "For buyers, the smart move is to compare documentation quality, road access, usable plot shape, estate services, and long-term maintenance before comparing only headline price.",
      "Serenity Hills keeps the conversation practical: visit the site, understand the land, review documents independently, and decide at your own pace."
    ],
    date: "May 2026",
    read: "7 min read",
    image: "/assets/events/investor-meet.jpg"
  },
  {
    slug: "mumbai-buyer-konkan-plot-checklist",
    category: "buyer",
    label: "Plot Due Diligence",
    tag: "Buyer Guide",
    title: "What every Mumbai buyer should check before signing a Konkan plot agreement",
    excerpt: "7/12, NA order, mutation and layout sanction explained as a practical due-diligence checklist.",
    body: [
      "Before signing, ask for the document set and review it with an independent professional. A beautiful site still needs clean paperwork.",
      "Key checks include title flow, 7/12 extract, NA order, mutation records, road access, layout details, payment terms, and what is actually included in the estate.",
      "A good site visit should answer both emotional and practical questions: how the place feels, and how the purchase stands on paper."
    ],
    date: "April 2026",
    read: "9 min read",
    image: "/assets/images/serenity-hills-plots.png"
  },
  {
    slug: "weekend-at-serenity-hills",
    category: "life",
    label: "Weekend Experience",
    tag: "Life on the Hill",
    title: "A weekend at Serenity Hills: the drive, the air, and what changed our minds",
    excerpt: "A two-day estate stay, the route from Pune, and the quiet details that help families picture a second home.",
    body: [
      "A weekend on the hill helps families understand the rhythm of Dapoli better than any brochure can.",
      "The drive, weather, food, views, nearby beaches, and slower evenings all become part of the buying decision.",
      "That is why Serenity Hills encourages guided visits before serious selection conversations."
    ],
    date: "March 2026",
    read: "5 min read",
    image: "/assets/events/site-visit-experience-small.jpg"
  },
  {
    slug: "konkan-land-documents-guide",
    category: "buyer",
    label: "Land Documents Explained",
    tag: "Buyer Guide",
    title: "7/12, NA order, mutation: a plain-language guide to Konkan land documents",
    excerpt: "The document stack that separates a clean Konkan plot from a legal headache, explained simply.",
    body: [
      "The 7/12 extract shows land record details, while NA permission helps clarify approved non-agricultural use.",
      "Mutation entries, title history, access, and layout references should be checked together instead of in isolation.",
      "Do not rely only on verbal assurances. Ask for copies, take advice, and keep the process documented."
    ],
    date: "February 2026",
    read: "11 min read",
    image: "/assets/images/serenity-hills-overview-optimized.jpg"
  },
  {
    slug: "dapoli-alibaug-goa-comparison",
    category: "investment",
    label: "Destination Comparison",
    tag: "Investment",
    title: "Dapoli vs Alibaug vs Goa: a second-home buyer's honest comparison",
    excerpt: "Price per sq ft, drive time, title clarity and rental demand. One table, three destinations, one honest verdict.",
    body: [
      "Goa, Alibaug, and Dapoli each serve different buyers. The best choice depends on budget, access, lifestyle intent, and documentation comfort.",
      "Dapoli often appeals to buyers who want a greener, quieter destination with a longer-horizon second-home thesis.",
      "The right comparison is not only price. It is also crowding, travel comfort, land clarity, and how often your family will actually use the place."
    ],
    date: "January 2026",
    read: "8 min read",
    image: "/assets/images/Plots_img/serenity-hills-landscape.jpeg"
  },
  {
    slug: "monsoon-konkan-hills-ownership",
    category: "life",
    label: "Monsoon Living",
    tag: "Life on the Hill",
    title: "Monsoon at 400 metres: what it is actually like to own on the Konkan hills",
    excerpt: "The mist, mud, silence and seasonal rhythm owners talk about after the first monsoon.",
    body: [
      "Monsoon changes the hill completely: deeper greens, moving mist, cooler air, and a slower daily rhythm.",
      "It is also the season when buyers should think practically about roads, drainage, maintenance, and access.",
      "Seeing the estate in season gives a more honest picture of ownership than a fair-weather visit alone."
    ],
    date: "December 2025",
    read: "6 min read",
    image: "/assets/events/monsoon-estate-tour-small.jpg"
  }
];

export function getBlogArticleBySlug(slug) {
  return blogArticles.find((article) => article.slug === slug);
}
