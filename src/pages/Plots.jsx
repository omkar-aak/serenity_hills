import {
  ArrowRight,
  Check,
  Droplets,
  LampFloor,
  MessageCircle,
  ShieldCheck,
  Stethoscope,
  Trees,
  UtensilsCrossed,
  Wifi,
  Zap
} from "lucide-react";
import LeadForm from "../components/LeadForm";
import SEO from "../components/SEO";
import { siteConfig } from "../data/siteConfig";
import { breadcrumbSchema, organizationSchema } from "../utils/seo";
import { getWhatsAppUrl } from "../utils/whatsapp";

const clusters = [
  {
    id: "optilux",
    letter: "A",
    name: "OptiLux",
    badge: "Most Accessible",
    color: "violet",
    meta: "Cluster A - 7 plots - 3,000-4,035 sq ft - Price on request",
    image: "/assets/images/Plots_img/OptiLux.jpeg",
    features: ["Natural tree cover around plots", "Easy access and practical contours", "Near the estate amenity area", "A considered starting point for buyers"],
    plots: [["15", "375", "4,035", "Available"], ["16", "375", "4,035", "On Hold"], ["17", "375", "4,035", "Sold"], ["18", "375", "4,035", "Available"], ["19", "375", "4,035", "Available"], ["21", "351", "3,777", "Available"], ["22", "279", "3,002", "Available"]]
  },
  {
    id: "panorama",
    letter: "B",
    name: "Panorama",
    badge: "Valley Views",
    color: "terracotta",
    meta: "Cluster B - 5 plots - 3,200-4,000 sq ft - Price on request",
    image: "/assets/images/Plots_img/serenity-hills-landscape.jpeg",
    features: ["Valley-facing orientation", "Open light and green views", "Sloping setting suited to design discussion", "Near shared green areas"],
    plots: [["25", "362", "3,896", "Available"], ["26", "338", "3,638", "Available"], ["27", "312", "3,358", "Sold"], ["28", "312", "3,358", "On Hold"], ["29", "298", "3,208", "Available"]]
  },
  {
    id: "cloud9",
    letter: "C",
    name: "Cloud 9",
    badge: "Top of the Hill",
    color: "blue",
    meta: "Cluster C - 5 plots - 3,260-3,755 sq ft - Price on request",
    image: "/assets/images/Plots_img/dilasa.jpeg",
    features: ["Elevated hill setting", "Monsoon atmosphere and open surroundings", "Private-feeling cluster layout", "Plot possibilities for a quieter villa"],
    plots: [["39", "303", "3,260", "Available"], ["40", "349", "3,755", "Available"], ["41", "324", "3,486", "On Hold"], ["45", "310", "3,336", "Available"], ["46", "310", "3,336", "Available"]]
  },
  {
    id: "valley",
    letter: "D",
    name: "Valley Delight",
    badge: "Monsoon Breeze",
    color: "green",
    meta: "Cluster D - 10 plots - 3,000-3,900 sq ft - Price on request",
    image: "/assets/images/Plots_img/Girigandh.jpeg",
    features: ["Green valley outlook", "Larger collection for choice", "Convenient construction discussion", "Near family-oriented amenities"],
    plots: [["30", "352", "3,788", "Available"], ["31", "348", "3,745", "Available"], ["32", "320", "3,444", "Sold"], ["33", "320", "3,444", "Sold"], ["34", "310", "3,336", "Available"], ["35", "310", "3,336", "On Hold"], ["36", "295", "3,176", "Available"], ["37", "295", "3,176", "Available"], ["47", "282", "3,035", "Available"], ["48", "278", "2,992", "Available"]]
  },
  {
    id: "island",
    letter: "E",
    name: "Island",
    badge: "Ridge Views",
    color: "rose",
    meta: "Cluster E - 8 plots - 3,100-4,000 sq ft - Price on request",
    image: "/assets/images/Plots_img/island.jpeg",
    features: ["Ridge-positioned setting", "Open sunrise and sunset possibilities", "Limited cluster footprint", "A premium villa conversation"],
    plots: [["01", "372", "4,004", "Available"], ["02", "368", "3,961", "Available"], ["03", "345", "3,713", "On Hold"], ["04", "330", "3,552", "Sold"], ["05", "318", "3,423", "Available"], ["06", "306", "3,294", "Available"], ["07", "298", "3,208", "Sold"], ["08", "288", "3,100", "Available"]]
  }
];

const inclusions = [
  [Trees, "Internal road access", "Discuss all-weather internal approach roads during your visit."],
  [Droplets, "Water planning", "Ask about connection points and available water provisions."],
  [Zap, "Electricity planning", "Review service availability and lighting provisions."],
  [Wifi, "Connectivity", "Ask about practical internet availability for stays."],
  [ShieldCheck, "Estate security", "Understand access and on-site management arrangements."],
  [LampFloor, "Maintenance", "Clarify shared-area maintenance expectations."],
  [Stethoscope, "Nearby services", "Review health and everyday access in Dapoli."],
  [UtensilsCrossed, "Konkan lifestyle", "Food and local experiences within the wider area."]
];

const plotFaqs = [
  ["How do I receive current plot pricing?", "Submit an enquiry or message on WhatsApp and request current availability, pricing and applicable documentation."],
  ["What documentation should I review?", "Request available title records, NA documentation, layout and access details, then use independent legal advice."],
  ["When can I take possession?", "Possession and timelines depend on the specific plot and executed documentation; obtain written confirmation before deciding."],
  ["Do I have to build a villa immediately?", "Discuss plot-only ownership, villa planning and any applicable conditions with the team before booking."],
  ["Can I arrange a guided site visit?", "Yes. A visit is encouraged to assess access, location, contours, views and practical services in person."],
  ["Can NRIs enquire?", "NRIs can request details, but should obtain qualified legal guidance on purchase eligibility and documentation."]
];

export default function Plots({ onEnquire }) {
  return (
    <>
      <SEO
        title="Plots - Serenity Hills Dapoli | Plot Clusters"
        description="Explore Serenity Hills plot clusters in Dapoli, illustrated availability, estate inclusions, documentation guidance, and site visit enquiries."
        canonicalPath="/plots"
        schema={[organizationSchema(), breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Plots", href: "/plots" }])]}
      />
      <main className="design-page plots-page">
        <section className="plots-hero">
          <div className="design-container">
            <p className="plots-breadcrumb"><a href="/">Home</a><span>/</span>Plots</p>
            <h1>48 plots. 5 clusters.<br />One hill.</h1>
            <p className="design-hero-copy">Choose by view, contour, or preference. Explore NA plot opportunities with project documentation and availability shared during your enquiry.</p>
            <div className="plots-pills">
              <span><Check size={13} /> Documentation available for review</span>
              <span><Check size={13} /> 15 acres - 48 plots</span>
              <span className="phase">Phase I enquiries open</span>
            </div>
          </div>
        </section>

        <nav className="plots-filter" aria-label="Plot clusters">
          <div className="design-container">
            {clusters.map((cluster) => <a className={cluster.color} href={`#${cluster.id}`} key={cluster.id}><span />{cluster.name}</a>)}
            <a className="plots-compare-link" href="#plot-faq">Compare clusters <ArrowRight size={15} /></a>
          </div>
        </nav>

        <section className="plots-plan">
          <div className="design-container">
            <div className="plots-plan-title"><h2>Master plan</h2><p>Choose a cluster to explore its plots, qualities, and indicated status.</p></div>
            <div className="plots-plan-canvas">
              <img src={siteConfig.assets.masterPlan} alt="Serenity Hills Dapoli master plan layout showing plot clusters" width="1600" height="900" loading="lazy" decoding="async" />
            </div>
            <div className="plots-legend"><span className="available">Available</span><span className="hold">On Hold</span><span className="sold">Sold</span><p>Status shown for design reference; confirm current availability with the team.</p></div>
          </div>
        </section>

        <div className="design-container plots-layout" id="clusters">
          <div className="plots-clusters">
            {clusters.map((cluster) => <ClusterCard cluster={cluster} onEnquire={onEnquire} key={cluster.id} />)}
          </div>
          <aside className="plots-dock">
            <h2>Enquire about plots</h2>
            <p>Leave your details to request the current rate card, documentation guidance, and inventory conversation.</p>
            <LeadForm formType="plots" compact />
            <a className="plots-wa" href={getWhatsAppUrl()} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp instead</a>
          </aside>
        </div>

        <section className="design-section plots-included">
          <div className="design-container">
            <DesignHeading eyebrow="Standard estate conversation" title="What's discussed with every plot.">
              Confirm actual inclusions, specifications, availability and documentation with the project team before any decision.
            </DesignHeading>
            <div className="plots-inclusion-grid">
              {inclusions.map(([Icon, title, text]) => <article key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}
            </div>
            <p className="plots-trust"><Check size={16} /> Ask for relevant title and approval documents and complete independent due diligence before purchasing land.</p>
          </div>
        </section>

        <section className="design-section design-alt" id="plot-faq">
          <div className="design-container plots-faq-grid">
            <DesignHeading eyebrow="Plot Purchase FAQ" title="Deeper questions, straight answers.">
              These are practical starting points for a better first conversation.
            </DesignHeading>
            <div className="design-faq">
              {plotFaqs.map(([question, answer], index) => <details open={index === 0} key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
            </div>
          </div>
        </section>

        <section className="plots-callout">
          <div className="design-container">
            <div>
              <h2>Not sure which cluster fits?</h2>
              <p>Share your timeline and priorities and request a guided site visit conversation.</p>
            </div>
            <div className="design-actions">
              <button className="design-btn forest" type="button" onClick={onEnquire}>Get my shortlist <ArrowRight size={16} /></button>
              <a className="design-btn outline" href={getWhatsAppUrl()} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function ClusterCard({ cluster, onEnquire }) {
  return (
    <article className={`cluster-card ${cluster.color}`} id={cluster.id}>
      <header>
        <div><h2>{cluster.name}</h2><p>{cluster.meta}</p></div>
        <span>{cluster.badge}</span>
      </header>
      <div className="cluster-overview">
        <img src={cluster.image} alt={`${cluster.name} plot cluster setting at Serenity Hills`} width="720" height="520" loading="lazy" />
        <div>
          <h3>Why {cluster.name}</h3>
          <ul>{cluster.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        </div>
      </div>
      <div className="cluster-table">
        <table>
          <thead><tr><th>Plot #</th><th>Size (sq.m)</th><th>Size (sq.ft)</th><th>Status</th></tr></thead>
          <tbody>{cluster.plots.map(([number, meters, feet, status]) => <tr key={number}><td>{number}</td><td>{meters}</td><td>{feet}</td><td><span className={`status ${status.toLowerCase().replaceAll(" ", "-")}`}>{status}</span></td></tr>)}</tbody>
        </table>
        <div className="cluster-actions">
          <button type="button" onClick={onEnquire}>Check price for {cluster.name} <ArrowRight size={15} /></button>
          <a href="/contact">Request details <ArrowRight size={15} /></a>
        </div>
      </div>
    </article>
  );
}

function DesignHeading({ eyebrow, title, children }) {
  return <div className="design-heading"><p className="design-eyebrow">{eyebrow}</p><h2>{title}</h2>{children && <p className="design-lede">{children}</p>}</div>;
}
