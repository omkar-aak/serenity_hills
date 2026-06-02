import {
  ArrowRight,
  ClipboardCheck,
  Construction,
  Handshake,
  Leaf,
  MapPinned,
  MessageCircle,
  ShieldCheck
} from "lucide-react";
import SEO from "../components/SEO";
import { breadcrumbSchema, organizationSchema } from "../utils/seo";
import { getWhatsAppUrl } from "../utils/whatsapp";

const thesisPillars = [
  {
    title: "A Coastal Alternative",
    icon: Leaf,
    text: "Dapoli offers the meeting point of green hill country and the Konkan coast, while still feeling quieter than more established second-home destinations."
  },
  {
    title: "Access That Matters",
    icon: Construction,
    text: "Road-trip access from Pune and Mumbai makes a guided site visit practical for families considering a weekend or long-horizon second home."
  },
  {
    title: "Documentation First",
    icon: ClipboardCheck,
    text: "Serious property decisions start with documents, title review, permissions, access, and independent due diligence before commitment."
  }
];

const infrastructure = [
  ["Road connectivity", "Road access and route comfort are central to evaluating any Dapoli second-home decision."],
  ["Town proximity", "Markets, essentials, health services, and everyday practicalities should be reviewed during a visit."],
  ["Estate access", "Internal access, water, power, maintenance, and security questions belong in the buyer conversation."],
  ["Long-term context", "Infrastructure changes over time; buyers should verify current status from authoritative sources."]
];

const compareRows = [
  ["Setting", "Hill and coast", "Coastal destination", "Coastal access", "Hill station"],
  ["Weekend approach", "Pune and Mumbai road trip", "Longer from Maharashtra", "Closer to Mumbai", "Closer to Pune"],
  ["Buyer focus", "Plot-led estate", "Villa and rental market", "Second-home market", "Holiday-home market"],
  ["Due diligence", "Review project documents", "Verify property-specific records", "Verify property-specific records", "Verify property-specific records"]
];

const differentiators = [
  { icon: ClipboardCheck, title: "Documentation conversation", text: "Request available project records and obtain independent legal review before purchase." },
  { icon: Leaf, title: "Nature-led siting", text: "Explore slopes, views, trees, privacy, and orientation during a guided visit." },
  { icon: Construction, title: "Practical planning", text: "Discuss access, services, future build possibilities, and maintenance expectations." },
  { icon: ShieldCheck, title: "Managed environment", text: "Understand security and management provisions relevant to an occasional home." },
  { icon: Handshake, title: "No-pressure guidance", text: "Land-bank, build later, or explore first: the right path depends on your goals." },
  { icon: MapPinned, title: "Dapoli lifestyle", text: "Coast, hills, markets, temples, beaches, and the pace of Konkan life are nearby." }
];

const audiences = [
  ["The Second-Home Builder", "Build now or later", "A family seeking a quiet home of its own, with nature, weekend access, and the ability to shape a villa over time.", ["Plot-led ownership", "Villa planning conversations", "Site visits with family"]],
  ["The Land Buyer", "Long-horizon ownership", "A careful buyer evaluating documented land in Dapoli as part of broader personal asset planning.", ["Document review", "Access assessment", "Independent advice encouraged"]],
  ["The Retirement Planner", "Life beyond the city", "A professional planning early for a greener, quieter future destination with practical everyday access.", ["Low-density setting", "Nature-led pace", "Essential services nearby"]]
];

export default function Vision({ onEnquire }) {
  return (
    <>
      <SEO
        title="Vision - Serenity Hills Dapoli | The Estate"
        description="Explore the Serenity Hills vision: Dapoli access, documentation-led ownership conversations, estate planning, and second-home possibilities."
        canonicalPath="/vision"
        schema={[organizationSchema(), breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Vision", href: "/vision" }])]}
      />
      <main className="design-page vision-page">
        <section className="vision-hero">
          <div className="vision-hero-number" aria-hidden="true">15</div>
          <div className="design-container vision-hero-inner">
            <p className="design-badge"><span />The Estate Vision</p>
            <h1>The hill that<br />changes <em>everything.</em></h1>
            <p className="design-hero-copy">Why Dapoli speaks to second-home buyers: the land, the access, the setting, and the questions that guide every Serenity Hills conversation.</p>
            <nav className="vision-hero-links" aria-label="Vision page sections">
              {[["01", "The Thesis", "thesis"], ["02", "Location", "location"], ["03", "Infrastructure", "infrastructure"], ["04", "Comparison", "comparison"], ["05", "Who It's For", "who"]].map(([number, title, id]) => (
                <a href={`#${id}`} key={id}><span>{number}</span>{title}</a>
              ))}
            </nav>
          </div>
        </section>

        <nav className="vision-anchor" aria-label="Section navigation">
          {[["The Thesis", "thesis"], ["Location", "location"], ["Infrastructure", "infrastructure"], ["Comparison", "comparison"], ["The Estate", "estate"], ["Who It's For", "who"]].map(([label, id]) => (
            <a href={`#${id}`} key={label}>{label}</a>
          ))}
        </nav>

        <section className="vision-statement">
          <blockquote>
            The Konkan coast is not a secret. It is simply <em>misunderstood</em>: hill air, coastal light, and room to imagine a quieter kind of life.
            <cite>- The Serenity Hills Vision</cite>
          </blockquote>
        </section>

        <section className="design-section" id="thesis">
          <div className="design-container">
            <DesignHeading eyebrow="01 - The Estate Thesis" title={<>Three reasons this hill<br />deserves a closer look.</>}>
              A thoughtful land decision brings geography, access, documentation, and personal goals into the same conversation.
            </DesignHeading>
            <div className="vision-pillar-grid">
              {thesisPillars.map(({ icon: Icon, title, text }, index) => (
                <article key={title}>
                  <span className="vision-index">0{index + 1}</span>
                  <Icon />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="design-section design-alt" id="location">
          <div className="design-container vision-location-grid">
            <VisionMap />
            <div>
              <DesignHeading eyebrow="02 - Location" title={<>Closer than you think.<br /><em>Farther than it feels.</em></>}>
                Dapoli offers a coastal-hill atmosphere that remains reachable for planned weekend travel from Pune and Mumbai.
              </DesignHeading>
              <div className="vision-distance-grid">
                {[["From Mumbai", "230", "km", "Approx. 5 hours"], ["From Pune", "190", "km", "Approx. 4 hours"], ["Dapoli town", "10", "min", "Essentials nearby"], ["Coastal outings", "15", "min", "Beach access varies"]].map(([city, value, unit, detail]) => (
                  <article key={city}><p>{city}</p><strong>{value}<span>{unit}</span></strong><small>{detail}</small></article>
                ))}
              </div>
              <article className="vision-fact"><p className="design-eyebrow">The Konkan Advantage</p><h3>Hill country near the sea.</h3><p>Visit in person to understand the slope, access, breeze, surroundings, and whether the location fits the way your family wants to use a second home.</p></article>
            </div>
          </div>
        </section>

        <section className="design-section" id="infrastructure">
          <div className="design-container vision-infra-grid">
            <DesignHeading eyebrow="03 - Infrastructure" title={<>The practical questions<br />matter <em>now.</em></>}>
              Evaluate access and local services using current, independently verified information before a property decision.
            </DesignHeading>
            <div className="vision-timeline">
              {infrastructure.map(([title, text], index) => (
                <article key={title}><span className={index < 2 ? "done" : ""} /><small>Review point 0{index + 1}</small><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="design-section vision-compare" id="comparison">
          <div className="design-container">
            <DesignHeading eyebrow="04 - Location Comparison" title={<>How Dapoli compares<br />with <em>alternatives.</em></>} inverse>
              A high-level comparison for conversation only; pricing, approvals, title and suitability must be verified property by property.
            </DesignHeading>
            <div className="vision-table-wrap">
              <table>
                <thead><tr><th>Consideration</th><th>Serenity Hills / Dapoli</th><th>Goa</th><th>Alibaug</th><th>Mahabaleshwar</th></tr></thead>
                <tbody>{compareRows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td className={index === 1 ? "highlight" : ""} key={cell}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <div className="vision-review-grid">
              {["Location", "Documents", "Lifestyle", "Long horizon"].map((label) => (
                <article key={label}><small>Review</small><strong>{label}</strong><p>Ask questions, visit the site, and verify before deciding.</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="design-section" id="estate">
          <div className="design-container">
            <DesignHeading eyebrow="The Estate - What makes it different" title={<>Not just land.<br />A <em>considered</em> environment.</>}>
              The estate conversation blends setting, practical infrastructure questions, documentation support, and the freedom to plan at your pace.
            </DesignHeading>
            <div className="vision-diff-grid">
              {differentiators.map(({ icon: Icon, title, text }) => <article key={title}><Icon /><div><h3>{title}</h3><p>{text}</p></div></article>)}
            </div>
          </div>
        </section>

        <section className="design-section design-alt" id="who">
          <div className="design-container">
            <DesignHeading eyebrow="05 - Who It's For" title={<>Three kinds of buyers.<br />One <em>hill.</em></>}>
              Serenity Hills can begin with different goals, provided each buyer evaluates the decision carefully.
            </DesignHeading>
            <div className="vision-audience-grid">
              {audiences.map(([title, tag, text, bullets]) => (
                <article key={title}><header><h3>{title}</h3><span>{tag}</span></header><p>{text}</p><ul>{bullets.map((item) => <li key={item}>{item}</li>)}</ul></article>
              ))}
            </div>
          </div>
        </section>

        <section className="design-final">
          <div className="design-container">
            <p className="design-eyebrow">The next step is yours</p>
            <h2>Read the vision.<br />Now <em>see the land.</em></h2>
            <p>Book a site visit to explore the estate setting and discuss available information with the team.</p>
            <div className="design-actions">
              <a className="design-btn gold" href="/contact">Book a Site Visit <ArrowRight size={16} /></a>
              <button className="design-btn ghost" type="button" onClick={onEnquire}>Download Brochure</button>
              <a className="design-btn ghost" href={getWhatsAppUrl()} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp Us</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function DesignHeading({ eyebrow, title, children, inverse = false }) {
  return <div className={`design-heading ${inverse ? "inverse" : ""}`}><p className="design-eyebrow">{eyebrow}</p><h2>{title}</h2>{children && <p className="design-lede">{children}</p>}</div>;
}

function VisionMap() {
  return (
    <figure className="vision-map">
      <svg viewBox="0 0 480 504" aria-label="Illustrative map locating Serenity Hills in Dapoli">
        <rect width="480" height="504" fill="#eef7f2" />
        <path d="M0 200 Q100 180 160 220 Q200 250 180 300 Q160 340 120 360 Q80 380 0 370Z" fill="#dbeef8" />
        <ellipse cx="280" cy="220" rx="180" ry="150" fill="#c8e6d4" opacity=".65" />
        <ellipse cx="300" cy="240" rx="110" ry="100" fill="#a8d4b8" opacity=".45" />
        <path d="M60 50 Q120 100 140 160 Q160 220 150 280 Q140 340 100 490" fill="none" stroke="#d8b87a" strokeWidth="4" strokeDasharray="8 4" />
        <path d="M88 78 Q130 160 175 268 M390 120 Q330 190 205 266" fill="none" stroke="#1a5c43" strokeWidth="2.5" strokeDasharray="6 4" opacity=".5" />
        <MapPoint x="88" y="68" label="Mumbai - 230 km" labelX="152" labelY="70" />
        <MapPoint x="390" y="110" label="Pune - 190 km" labelX="327" labelY="112" reverse />
        <circle cx="190" cy="272" r="25" fill="#c8a25a" opacity=".2" /><circle cx="190" cy="272" r="15" fill="#c8a25a" /><circle cx="190" cy="272" r="8" fill="white" />
        <rect x="89" y="302" width="202" height="32" rx="16" fill="white" /><text x="190" y="322" textAnchor="middle">Serenity Hills, Dapoli</text>
        <text x="43" y="291" className="sea">Arabian</text><text x="55" y="306" className="sea">Sea</text>
        <text x="178" y="125" className="road">NH-66 / Coastal route</text>
      </svg>
    </figure>
  );
}

function MapPoint({ x, y, label, labelX, labelY, reverse }) {
  return <g><circle cx={x} cy={y} r="12" fill="#1a5c43" /><circle cx={x} cy={y} r="6" fill="white" /><rect x={reverse ? 274 : 105} y={labelY - 17} width="105" height="25" rx="12" fill="white" /><text x={labelX} y={labelY}>{label}</text></g>;
}
