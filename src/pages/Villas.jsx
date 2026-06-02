import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Home as HomeIcon,
  KeyRound,
  MessageCircle,
  PencilRuler,
  ShieldCheck,
  Sofa,
  Trees
} from "lucide-react";
import SEO from "../components/SEO";
import { breadcrumbSchema, organizationSchema } from "../utils/seo";
import { getWhatsAppUrl } from "../utils/whatsapp";

const heroPaths = [
  {
    href: "#ready",
    icon: HomeIcon,
    title: "Ready Bungalows",
    text: "Fully furnished options for quick possession, personal use, and managed rentals."
  },
  {
    href: "#custom",
    icon: PencilRuler,
    title: "Custom Villa Build",
    text: "Your plot, your brief. We help with design, approvals, construction, and handover."
  }
];

const readyOptions = [
  {
    id: "optilux",
    tone: "purple",
    tag: "Ready Bungalow - Cluster A - OptiLux",
    name: "OptiLux Twin",
    subtitle: "Duplex Bungalow - 2 BHK with Terrace - Fully Furnished",
    badge: "Quick Possession",
    image: "/assets/images/Plots_img/OptiLux.jpeg",
    specs: [
      ["903", "Built-up sq ft"],
      ["500+", "Garden sq ft"],
      ["2", "BHK + Terrace"],
      ["2", "Floors - Duplex"]
    ],
    features: [
      "Ground floor: master bedroom, living and dining, kitchen, toilet, terrace",
      "Sub ground floor: second bedroom, lounge or study, toilet, private car parking",
      "500+ sq ft private garden with front and rear access",
      "Fully furnished handover for move-in or rental-readiness",
      "High-speed Wi-Fi, water connection and estate security provisions"
    ],
    investment: [
      ["Fully furnished handover", "Price on request"],
      ["Upfront booking amount", "Price on request"],
      ["Annual return reference", "15%+"],
      ["Possession", "Quick - on documentation"],
      ["Bank financing", "Bankable proposal"]
    ]
  },
  {
    id: "condos",
    tone: "blue",
    tag: "Conceptual - Plot 48 - Investment Product",
    name: "1 BHK Condos",
    subtitle: "Four independent 1 BHK homes planned for compact hill living",
    badge: "Build Cost: Contact Us",
    image: "/assets/images/Villas_img/condosvilla.png",
    specs: [
      ["4", "Independent units"],
      ["675", "sq ft per unit"],
      ["3", "Floors (G+1+2)"],
      ["4", "Parking slots"]
    ],
    features: [
      "Four fully independent 1 BHK units on a single Serenity Hills plot",
      "Each unit: bedroom, living room, covered terrace, pantry and toilet",
      "Ground, first and second floor layout with dedicated parking planning",
      "Internal road access on both sides of the plot",
      "A compact Dapoli home format for group ownership or rental conversations"
    ],
    investment: [
      ["Ownership style", "Group or solo"],
      ["Rental model", "Four bookable units"],
      ["Plot reference", "Plot 48"],
      ["Pricing", "On request"]
    ]
  }
];

const buildSteps = [
  ["1", "Design Consultation", "Walk the plot, discuss your brief, choose a layout and translate your vision into buildable plans."],
  ["2", "Approvals & Estimates", "Review local approvals, structural drawings and a written build estimate before you commit."],
  ["3", "Build & Handover", "Construction is managed on-site with updates, then handed over as shell, semi-furnished or furnished."]
];

const buildTypes = [
  ["Starter", "2 BHK Villa", "900-1,200 sq ft", ["2 bedrooms with attached baths", "Open living and dining", "Kitchen with pantry", "Covered verandah", "Private garden setback"]],
  ["Family", "3 BHK Villa", "1,400-1,800 sq ft", ["Master plus 2 bedrooms", "Spacious living room", "Traditional varandah", "Kitchen garden option", "Double car parking"]],
  ["Premium", "4 BHK Villa", "2,000-2,600 sq ft", ["4 en-suite bedrooms", "Formal and informal living", "Large wrap-around varandah", "Plunge pool provision", "Staff quarter option"]],
  ["Bespoke", "Custom Design", "Any size / layout", ["Architect-led brief", "Site-specific design", "Laterite, brick or modern look", "Passive cooling focus", "Fully executed vision"]]
];

const buildFeatures = [
  [ShieldCheck, "Laterite & brick construction", "Traditional Konkan material language with practical insulation for the coastal hill climate."],
  [HomeIcon, "Tiled Mangalore roof", "Classic clay tile roof language for monsoon resilience and a fitting Konkan silhouette."],
  [Trees, "Varandah & garden setback", "Covered outdoor edges and garden breathing room can be planned into every build."],
  [ClipboardCheck, "Approvals handled", "Local approvals, structural certification and layout compliance are guided by the team."],
  [KeyRound, "Shell or furnished handover", "Choose bare shell, semi-furnished or fully furnished turnkey at estimate stage."],
  [Sofa, "Rental-ready packages", "Optional furnishing and operations support can prepare the villa for weekend stays."]
];

const earnStats = [
  ["Fully furnished handover", "On Request", "OptiLux Twin is planned as a complete, furnished, rental-ready bungalow."],
  ["Low upfront commitment", "Token Amt", "Request current booking structure and payment schedule from the team."],
  ["Annual return reference", "15%+", "Shared as an indicative programme reference, subject to written terms."],
  ["Personal use", "Flexible", "Use your bungalow for weekends and discuss rental use for the rest of the year."]
];

const faqs = [
  ["Do I have to build immediately after buying a plot?", "No. Build timelines should be confirmed in writing for your selected plot, but the villa support is designed so owners can build when they are ready."],
  ["What does the build estimate include?", "A typical estimate covers drawings, approvals, civil construction, roofing, flooring, bathroom fixtures, electrical and plumbing. Furnishing and landscaping are usually separate packages."],
  ["Can I design my own floor plan?", "Yes. You can bring your own brief or architect, subject to setbacks, local bylaws and practical site conditions."],
  ["How long does construction take?", "A 2 BHK villa commonly needs around 14-18 months from design approval to shell completion. Larger homes may take longer, especially around monsoon scheduling."],
  ["Do you offer furnished handover?", "Yes. Ask for bare shell, semi-furnished or fully furnished options. Ready bungalow pricing and custom furnishing estimates should be requested directly."],
  ["Can I put my villa on the rental programme?", "Yes, managed rental participation can be discussed for estate bungalow owners. Ask for the current terms, fees, lock-ins and owner-use rules."],
  ["What is the 15%+ return based on?", "Treat it as an indicative programme reference until you receive the current written offer. Actual returns depend on occupancy, seasonality and rental programme terms."]
];

export default function Villas({ onEnquire }) {
  return (
    <>
      <SEO
        title="Villas - Serenity Hills Dapoli | Ready & Custom Builds"
        description="Explore Serenity Hills villas in Dapoli: ready bungalow options, custom villa builds, managed rental programme conversations, floor plan references and FAQs."
        canonicalPath="/villas"
        schema={[organizationSchema(), breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Villas", href: "/villas" }])]}
      />
      <main className="design-page villas-page">
        <section className="villas-hero">
          <div className="design-container villas-hero-inner">
            <p className="villas-badge"><span />Bungalows & Custom Builds - Dapoli</p>
            <h1>Build your Konkan home.<br />Or buy one <em>ready.</em></h1>
            <p className="villas-hero-copy">Two ready bungalow options available now. Full custom villa build support for plot owners: design, approvals, and construction managed end to end.</p>
            <div className="villas-hero-paths">
              {heroPaths.map(({ href, icon: Icon, title, text }) => (
                <a href={href} key={title}>
                  <Icon size={25} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </a>
              ))}
            </div>
            <div className="design-actions">
              <a className="design-btn gold" href="#ready">See ready options <ArrowRight size={16} /></a>
              <button className="design-btn outline light" type="button" onClick={onEnquire}>Discuss custom build</button>
              <a className="design-btn outline light" href={getWhatsAppUrl()} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a>
            </div>
          </div>
        </section>

        <nav className="villas-path-bar" aria-label="Villa sections">
          <div className="design-container">
            <a href="#ready"><span />Ready Bungalows</a>
            <a href="#custom"><span />Custom Villa Build</a>
            <a href="#earn"><span />Own, Earn & Enjoy</a>
            <a href="#vfaq"><span />FAQs</a>
          </div>
        </nav>

        <section className="design-section" id="ready">
          <div className="design-container">
            <DesignHeading eyebrow="Ready options - 2 bungalows available now" title="Move in. Or earn from it. From day one.">
              Two distinct ready options: a turnkey duplex bungalow and a four-unit 1 BHK condo concept. Both are positioned for estate living and investment conversations.
            </DesignHeading>
            <div className="villas-ready-list">
              {readyOptions.map((option) => <ReadyVillaCard option={option} key={option.id} />)}
            </div>
          </div>
        </section>

        <section className="design-section design-alt" id="custom">
          <div className="design-container">
            <DesignHeading eyebrow="Custom villa build - plot owners" title="Your plot. Your vision. Our build team.">
              No mandatory rush. Build when you are ready and use the team for design, approvals, estimates, construction and handover.
            </DesignHeading>
            <div className="villas-steps">
              {buildSteps.map(([number, title, text]) => <article key={title}><strong>{number}</strong><h3>{title}</h3><p>{text}</p></article>)}
            </div>
            <div className="villas-build-grid">
              {buildTypes.map(([type, title, size, rooms]) => (
                <article key={title}>
                  <span>{type}</span>
                  <h3>{title}</h3>
                  <strong>{size}</strong>
                  <ul>{rooms.map((room) => <li key={room}>{room}</li>)}</ul>
                  <button type="button" onClick={onEnquire}>Build cost: contact us <ArrowRight size={14} /></button>
                </article>
              ))}
            </div>
            <div className="villas-feature-heading">
              <h3>Every build includes.</h3>
              <p>Standard topics discussed for custom villa builds on Serenity Hills plots.</p>
            </div>
            <div className="villas-feature-grid">
              {buildFeatures.map(([Icon, title, text]) => <article key={title}><Icon /><div><h4>{title}</h4><p>{text}</p></div></article>)}
            </div>
            <div className="villas-center-cta">
              <button className="design-btn forest" type="button" onClick={onEnquire}>Discuss your custom build <ArrowRight size={16} /></button>
              <p>Request a design consultation at the site with the project team.</p>
            </div>
          </div>
        </section>

        <section className="villas-earn" id="earn">
          <div className="design-container villas-earn-grid">
            <div className="villas-earn-numbers">
              {earnStats.map(([label, value, text]) => <article key={label}><span>{label}</span><strong>{value}</strong><p>{text}</p></article>)}
            </div>
            <div className="villas-earn-copy">
              <p className="design-eyebrow">The investment angle</p>
              <h2>"Own, Earn & Enjoy."</h2>
              <p>The ready villa path is designed for buyers who want a Dapoli weekend home and also want to explore managed rental income. The team can share current rental programme terms, owner-use rules and expected operating responsibilities.</p>
              <p>You own the asset, use it for your own stays, and can discuss managed bookings for the rest of the year.</p>
              <button className="design-btn gold" type="button" onClick={onEnquire}>Get the investment details <ArrowRight size={16} /></button>
              <small>*Return references are indicative and subject to written terms, occupancy, seasonal demand and programme participation. Independent financial advice is recommended.</small>
            </div>
          </div>
        </section>

        <section className="design-section design-alt" id="vfaq">
          <div className="design-container villas-faq-grid">
            <div>
              <p className="design-eyebrow">Villa FAQs</p>
              <h2>Questions about building or buying.</h2>
              <p>Plain answers for the questions that usually come up before someone starts a villa conversation.</p>
              <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer">Ask on WhatsApp <ArrowRight size={14} /></a>
            </div>
            <div className="design-faq">
              {faqs.map(([question, answer], index) => <details open={index === 0} key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
            </div>
          </div>
        </section>

        <section className="design-section villas-split-section">
          <div className="design-container villas-split-cta">
            <article>
              <span>Ready now</span>
              <h3>See a ready bungalow. Move in or earn from it.</h3>
              <p>OptiLux Twin: fully furnished, quick possession conversation, price on request.</p>
              <button className="design-btn forest" type="button" onClick={onEnquire}>Get bungalow details <ArrowRight size={16} /></button>
            </article>
            <article>
              <span>Your timeline</span>
              <h3>Start a custom build. On your schedule.</h3>
              <p>Buy a plot, build when ready, and use the estate team for architects, approvals and construction.</p>
              <button className="design-btn gold" type="button" onClick={onEnquire}>Discuss your build <ArrowRight size={16} /></button>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}

function ReadyVillaCard({ option }) {
  return (
    <article className={`villa-ready-card ${option.tone}`} id={`villa-${option.id}`}>
      <header>
        <div>
          <p>{option.tag}</p>
          <h3>{option.name}</h3>
          {option.subtitle && <span>{option.subtitle}</span>}
        </div>
        <strong>{option.badge}</strong>
      </header>
      <div className="villa-ready-body">
        <div>
          {option.image && (
            <figure className="villa-ready-image">
              <img src={option.image} alt={`${option.name} villa concept at Serenity Hills Dapoli`} width="900" height="560" loading="lazy" decoding="async" />
            </figure>
          )}
          {option.specs.length > 0 && (
            <div className="villa-spec-strip">
              {option.specs.map(([value, label]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}
            </div>
          )}
        </div>
        <div className="villa-ready-details">
          <section>
            <h4>{option.id === "optilux" ? "Bungalow features" : "About the condo concept"}</h4>
            <ul>{option.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          </section>
          {option.investment.length > 0 && (
            <section className="villa-invest-panel">
              <h4>"Own, Earn & Enjoy"</h4>
              {option.investment.map(([label, value]) => <p key={label}><span>{label}</span><strong>{value}</strong></p>)}
              <small>Confirm current pricing, possession and programme terms with the Serenity Hills team before making any decision.</small>
            </section>
          )}
        </div>
      </div>
      <footer>
        <a href={getWhatsAppUrl(`Hi, I am interested in ${option.name} at Serenity Hills Dapoli.`)} target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp enquiry</a>
      </footer>
    </article>
  );
}

function DesignHeading({ eyebrow, title, children }) {
  return <div className="design-heading"><p className="design-eyebrow">{eyebrow}</p><h2>{title}</h2>{children && <p className="design-lede">{children}</p>}</div>;
}
