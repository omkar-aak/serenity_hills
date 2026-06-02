import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, FileCheck, Leaf, Mail, Search, TrendingUp } from "lucide-react";
import LeadForm from "../components/LeadForm";
import SEO from "../components/SEO";
import { siteConfig } from "../data/siteConfig";
import { breadcrumbSchema, organizationSchema } from "../utils/seo";

const categories = [
  ["all", "All articles"],
  ["investment", "Investment"],
  ["buyer", "Buyer Guide"],
  ["life", "Life on the Hill"]
];

const articles = [
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
    icon: TrendingUp,
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
    icon: FileCheck,
    image: siteConfig.assets.plots
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
    icon: Leaf,
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
    icon: FileCheck,
    image: siteConfig.assets.overview
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
    icon: TrendingUp,
    image: siteConfig.assets.landscape
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
    icon: Leaf,
    image: "/assets/events/monsoon-estate-tour-small.jpg"
  }
];

const topicColumns = [
  {
    title: "Investment Guides",
    icon: TrendingUp,
    links: [
      "Why the Konkan belt is where smart money is moving",
      "Dapoli vs Alibaug vs Goa: an honest comparison",
      "How NH-66 infrastructure is repricing the Konkan coast",
      "Land appreciation in Dapoli: a 5-year data view",
      "The OptiLux managed rental model explained"
    ]
  },
  {
    title: "Buyer Checklists",
    icon: FileCheck,
    links: [
      "What to check before signing a Konkan plot agreement",
      "7/12, NA order, mutation: plain-language guide",
      "How to verify a Konkan plot title independently",
      "Stamp duty and registration for Maharashtra NA plots",
      "Can NRIs buy NA land in Maharashtra?"
    ]
  },
  {
    title: "Life on the Hill",
    icon: Leaf,
    links: [
      "A weekend at Serenity Hills: one family's story",
      "Monsoon at 400 metres: the real experience",
      "What the drive from Pune to Dapoli is actually like",
      "Konkan food: what guests eat at Serenity Hills",
      "Stars, silence, and why city people stay longer"
    ]
  }
];

export default function LatestEvents() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filteredArticles = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory = category === "all" || article.category === category;
      const haystack = `${article.title} ${article.excerpt} ${article.tag} ${article.label}`.toLowerCase();
      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [category, query]);

  const featured = articles[0];

  return (
    <>
      <SEO
        title="Blog - Serenity Hills Dapoli | Investment Guides & Buyer Checklists"
        description="The Dapoli real estate guide: investment thesis, plot due diligence checklists, Konkan lifestyle stories and buyer education from Serenity Hills."
        canonicalPath="/blog"
        schema={[organizationSchema(), breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }])]}
      />
      <main className="design-page blog-page">
        <section className="blog-hero">
          <div className="design-container">
            <p className="blog-bread"><a href="/">Home</a><span>/</span>Blog</p>
            <h1>From the hill:<br /><em>stories, guides & insights.</em></h1>
            <p>The Dapoli real estate guide. Written for buyers who ask the right questions and expect straight answers.</p>
            <div className="blog-search">
              <Search size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles: Dapoli, NA plots, investment..." />
              <button type="button">Search</button>
            </div>
            <div className="blog-chip-row">
              {categories.map(([value, label]) => (
                <button className={category === value ? "active" : ""} type="button" onClick={() => setCategory(value)} key={value}>
                  <span />{label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="blog-featured">
          <div className="design-container">
            <article className="blog-featured-card">
              <div className="blog-featured-art">
                <img src={featured.image} alt={`${featured.title} article cover`} width="760" height="520" loading="lazy" decoding="async" />
                <span>Featured</span>
                <TrendingUp size={58} />
                <p>Investment - Cover Story</p>
              </div>
              <div className="blog-featured-copy">
                <p>{featured.tag} - {featured.date} - {featured.read}</p>
                <h2>{featured.title}</h2>
                <span>{featured.excerpt} The case is stronger than most people realise, and the window is narrower.</span>
                <div><strong>By Serenity Hills</strong><small>{featured.date}</small><small>{featured.read}</small></div>
                <Link to={`/blog/${featured.slug}`}>Read the full article <ArrowRight size={16} /></Link>
              </div>
            </article>
          </div>
        </section>

        <section className="blog-articles">
          <div className="design-container">
            <div className="blog-grid-head">
              <h2>All articles</h2>
              <span>Showing {filteredArticles.length} articles</span>
            </div>
            {filteredArticles.length ? (
              <div className="blog-card-grid">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    article={article}
                    key={article.title}
                  />
                ))}
              </div>
            ) : (
              <div className="blog-no-results">
                <Search size={34} />
                <h3>No articles found</h3>
                <p>Try a different search term or view all articles.</p>
                <button type="button" onClick={() => { setQuery(""); setCategory("all"); }}>View all articles</button>
              </div>
            )}
          </div>
        </section>

        <section className="blog-newsletter">
          <div className="design-container blog-newsletter-grid">
            <div>
              <p className="design-eyebrow">Stay informed</p>
              <h2>Get the Dapoli buyer's guide: <em>free.</em></h2>
              <p>One article a month. No spam, no listings push: just the information serious Konkan second-home buyers need to make good decisions.</p>
            </div>
            <div className="blog-newsletter-form">
              <Mail size={22} />
              <LeadForm formType="blog-newsletter" compact />
            </div>
          </div>
        </section>

        <section className="blog-topics">
          <div className="design-container">
            <div className="blog-topic-head">
              <p className="design-eyebrow">Browse by topic</p>
              <h2>Everything we have written about the hill.</h2>
            </div>
            <div className="blog-topic-grid">
              {topicColumns.map(({ icon: Icon, title, links }) => (
                <article key={title}>
                  <header><Icon size={22} /><h3>{title}</h3></header>
                  <ul>{links.map((link) => <li key={link}><a href="/blog">{link}<ArrowRight size={14} /></a></li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function ArticleCard({ article }) {
  const Icon = article.icon || BookOpen;
  return (
    <article className={`blog-article-card ${article.category}`}>
      <div className="blog-article-thumb">
        <img src={article.image} alt={`${article.title} article thumbnail`} width="640" height="360" loading="lazy" decoding="async" />
        <Icon size={42} />
        <span>{article.label}</span>
      </div>
      <div className="blog-article-body">
        <p>{article.tag}</p>
        <h3>{article.title}</h3>
        <span>{article.excerpt}</span>
      </div>
      <footer>
        <small>{article.date} - {article.read}</small>
        <Link to={`/blog/${article.slug}`}>Read <ArrowRight size={14} /></Link>
      </footer>
    </article>
  );
}
