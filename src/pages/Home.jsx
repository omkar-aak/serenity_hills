import {
  ArrowRight,
  Check,
  Droplets,
  House,
  LampFloor,
  Leaf,
  MapPinned,
  MessageCircle,
  ShieldCheck,
  Stethoscope,
  Trees,
  UtensilsCrossed,
  Wifi
} from "lucide-react";
import LeadForm from "../components/LeadForm";
import HomeVideoShowcase from "../components/HomeVideoShowcase";
import SEO from "../components/SEO";
import StayEnquiryForm from "../components/StayEnquiryForm";
import { homeFaqs } from "../data/faqs";
import { growthFaqs, showcaseVideos } from "../data/homeGrowth";
import { siteConfig } from "../data/siteConfig";
import { absoluteUrl, breadcrumbSchema, faqSchema, organizationSchema } from "../utils/seo";
import { getWhatsAppUrl } from "../utils/whatsapp";

const ownershipPaths = [
  {
    code: "01 - Land",
    icon: Leaf,
    title: "Buy a plot",
    text: "Secure a verified NA plot. Land-bank for the future or build at your own pace, with documentation available for review.",
    meta: "3,000 - 4,000 sq ft  |  NA plot opportunity",
    link: "See plot inventory",
    className: "land"
  },
  {
    code: "02 - Villa",
    icon: House,
    title: "Build your villa",
    text: "Boutique villa, twin home, or holiday retreat, shaped with a managed second-home development conversation.",
    meta: "Turnkey concepts  |  2-4 bedroom",
    link: "See villa options",
    className: "villa"
  },
  {
    code: "03 - Try first",
    icon: Trees,
    title: "Stay a weekend",
    text: "Spend a weekend exploring Dapoli and the estate setting before deciding. Visits are coordinated by appointment.",
    meta: "Visit planning  |  By appointment",
    link: "Request a visit",
    className: "stay"
  }
];

const testimonials = [
  {
    quote: "We came for a weekend and could immediately picture our family's second home in the hills.",
    name: "Mr. Lagu",
    detail: "Mumbai - Plot enquiry"
  },
  {
    quote: "The document conversation was clear and unhurried. That clarity mattered as much as the location.",
    name: "Mr. Shah",
    detail: "Pune - Site visitor"
  },
  {
    quote: "For a long-term lifestyle decision, Dapoli felt calmer, greener, and far more personal.",
    name: "G. Gaikwad",
    detail: "Bengaluru - Investor enquiry"
  }
];

const amenities = [
  { icon: MapPinned, title: "Internal road access", text: "Access planned to connect each estate cluster." },
  { icon: Droplets, title: "Water planning", text: "Practical water availability conversations for owners." },
  { icon: Wifi, title: "Connectivity", text: "Space designed for work-from-hill weekends." },
  { icon: ShieldCheck, title: "Controlled access", text: "A private estate atmosphere for residents." },
  { icon: Stethoscope, title: "Nearby essentials", text: "Dapoli town conveniences within easy reach." },
  { icon: UtensilsCrossed, title: "Konkan living", text: "Local food, seasons, and coastal experiences." },
  { icon: Trees, title: "Open green space", text: "A nature-led setting with room to breathe." },
  { icon: LampFloor, title: "Thoughtful planning", text: "Estate services discussed during your visit." }
];

const stories = [
  {
    slug: "konkan-smart-money-2026",
    tag: "Investment",
    title: "Why the Konkan belt is attracting second-home buyers",
    text: "A closer look at access, lifestyle appeal, and the questions careful buyers ask.",
    date: "March 2026",
    image: siteConfig.assets.landscape
  },
  {
    slug: "mumbai-buyer-konkan-plot-checklist",
    tag: "Buyer Guide",
    title: "What to review before signing for a Konkan plot",
    text: "Title records, NA documentation, access, and an independent due-diligence checklist.",
    date: "February 2026",
    image: siteConfig.assets.plots
  },
  {
    slug: "weekend-at-serenity-hills",
    tag: "Life on the Hill",
    title: "A weekend in Dapoli: sea air, hill views, slow mornings",
    text: "The kind of visit that helps families decide whether a second home fits.",
    date: "January 2026",
    image: siteConfig.assets.beach
  }
];

export default function Home({ onEnquire }) {
  const faqs = [...homeFaqs, ...growthFaqs];

  return (
    <>
      <SEO
        title="Serenity Hills - Private Hill-Station Estate in Dapoli | NA Plots & Villas"
        description="Explore Serenity Hills Dapoli with NA plot opportunities, villa possibilities, click-to-play YouTube videos, FAQs, pricing guidance, and guided site visits."
        schema={[
          organizationSchema(),
          faqSchema(faqs),
          videoSchema(showcaseVideos),
          localBusinessSchema(),
          breadcrumbSchema([{ name: "Home", href: "/" }])
        ]}
      />
      <main className="home-page">
        <section className="home-hero" id="home">
          <div className="home-hero-bg" aria-hidden="true" />
          <div className="home-hero-grid" aria-hidden="true" />
          <div className="home-container home-hero-content">
            <p className="home-badge"><span />Private Estate - Dapoli, Konkan</p>
            <h1>Nature crafted.<br /><em>Soul approved.</em></h1>
            <p className="home-hero-sub">
              48 villa plots across 15 acres of Western Ghats hill country, with a guided, documentation-first ownership conversation.
            </p>
            <div className="home-pills">
              <span><Check size={13} /> NA documentation conversation</span>
              <span><Check size={13} /> 15 acres - 48 plots</span>
            </div>
            <div className="home-actions">
              <button className="home-btn home-btn-gold" type="button" onClick={onEnquire}>Download Brochure <ArrowRight size={16} /></button>
              <a className="home-btn home-btn-ghost" href="#contact">Book Site Visit</a>
              <a className="home-btn home-btn-ghost" href={getWhatsAppUrl()} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp</a>
            </div>
          </div>
          <div className="home-scroll" aria-hidden="true">Scroll<span /></div>
        </section>

        <HomeVideoShowcase />

        <section className="home-stats" aria-label="Estate highlights">
          <div className="home-container home-stats-grid">
            {[["15", "Acres of estate"], ["48", "Villa plots"], ["100+", "Native flora & fauna"], ["05", "Plot clusters"]].map(([number, label]) => (
              <div className="home-stat" key={label}>
                <div>{number}</div>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="home-why" id="vision">
          <div className="home-container home-why-grid">
            <MapIllustration />
            <div className="home-copy">
              <p className="home-eyebrow">Why Dapoli - Why now</p>
              <h2>A coastal hill within a weekend&apos;s reach.</h2>
              <ul className="home-distance">
                <li><span>From Pune</span><strong>190 km - approx. 4 hr drive</strong></li>
                <li><span>From Mumbai</span><strong>230 km - approx. 5 hr drive</strong></li>
                <li><span>Off coastal highway</span><strong>Easy local access</strong></li>
                <li><span>From Dapoli town</span><strong>Nearby essentials</strong></li>
              </ul>
              <p>
                Dapoli combines hill weather, Konkan beaches, and a slower pace with practical access from Pune and Mumbai. Visit the estate and review the location and documents with clarity.
              </p>
              <a className="home-text-link" href="#plots">See the ownership paths <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        <section className="home-paths" id="plots">
          <div className="home-container">
            <SectionIntro eyebrow="Three ways to own" title="Choose where to start.">
              Three distinct journeys, each a different way to make the hill yours.
            </SectionIntro>
            <div className="home-path-grid">
              {ownershipPaths.map(({ icon: Icon, ...path }) => (
                <article className={`home-path-card ${path.className}`} id={path.className === "villa" ? "villas" : path.className === "stay" ? "stay" : undefined} key={path.title}>
                  <Icon className="home-path-icon" size={24} />
                  <p className="home-path-code">{path.code}</p>
                  <h3>{path.title}</h3>
                  <p className="home-path-text">{path.text}</p>
                  <p className="home-path-meta">{path.meta}</p>
                  <a className="home-text-link" href="#contact">{path.link} <ArrowRight size={15} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-plan">
          <div className="home-container">
            <SectionIntro eyebrow="The Layout" title="Master plan." inverse>
              Five plot clusters arranged across a hillside-inspired estate concept.
            </SectionIntro>
            <div className="home-plan-canvas" aria-label="Illustrated master plan with five plot clusters">
              <img src={siteConfig.assets.masterPlan} alt="Serenity Hills master plan with five plot clusters" width="1600" height="900" loading="lazy" />
            </div>
            <div className="home-plan-footer">
              <div className="home-legend">
                <span className="available">Available</span>
                <span className="hold">On Hold</span>
                <span className="sold">Sold</span>
              </div>
              <a className="home-plan-link" href="#contact">View full plot inventory <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        <section className="home-testimonials">
          <div className="home-container">
            <SectionIntro eyebrow="Buyers - Owners - Visitors" title="What they say about the hill." />
            <div className="home-testimonial-grid">
              {testimonials.map((item) => (
                <blockquote className="home-quote" key={item.name}>
                  <span className="home-quote-mark">&ldquo;</span>
                  <p>{item.quote}</p>
                  <footer><span>{item.name.charAt(0)}</span><strong>{item.name}<small>{item.detail}</small></strong></footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="home-amenities">
          <div className="home-container">
            <SectionIntro eyebrow="What's on the hill" title="Estate amenities.">
              Every essential considered for a nature-led second-home setting.
            </SectionIntro>
            <div className="home-amenity-grid">
              {amenities.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <Icon size={22} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-blog" id="blog">
          <div className="home-container">
            <div className="home-blog-header">
              <SectionIntro eyebrow="From the hill" title="Stories & insights." />
              <a className="home-text-link" href="/blog">All updates <ArrowRight size={16} /></a>
            </div>
            <div className="home-story-grid">
              {stories.map((story) => (
                <article className="home-story" key={story.title}>                  <div className="home-story-image">
                    <img src={story.image} alt={`${story.title} at Serenity Hills Dapoli`} width="640" height="360" loading="lazy" decoding="async" />
                  </div>
                  <div className="home-story-body">
                    <p>{story.tag}</p>
                    <h3>{story.title}</h3>
                    <span>{story.text}</span>
                    <small>{story.date}</small>
                  </div>
                  <a href={`/blog/${story.slug}`}>Read article <ArrowRight size={15} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-faq">
          <div className="home-container home-faq-grid">
            <div>
              <p className="home-eyebrow">Frequently asked</p>
              <h2>Real questions, straight answers.</h2>
              <p>If your question is not here, send us a WhatsApp message and the team will help with project details.</p>
              <a className="home-text-link" href={getWhatsAppUrl()} target="_blank" rel="noreferrer">Ask on WhatsApp <ArrowRight size={16} /></a>
            </div>
            <div className="home-faq-list">
              {faqs.slice(0, 9).map((faq, index) => (
                <details key={faq.question} open={index === 0}>
                  <summary>{faq.question}<span>+</span></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="home-contact" id="contact">
          <div className="home-container home-contact-grid">
            <div className="home-contact-copy">
              <p className="home-eyebrow">Request details</p>
              <h2>Your private Dapoli estate conversation starts here.</h2>
              <p>Tell us what you are exploring: plots, a villa possibility, or a site visit. We will share relevant details at your pace.</p>
              <ul>
                {["No-pressure project conversation", "Documentation guidance available", "WhatsApp-first contact support"].map((item) => <li key={item}><Check size={13} />{item}</li>)}
              </ul>
              <address>
                <small>Or reach us directly</small>
                <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </address>
            </div>
            <div className="home-form-card"><LeadForm formType="Download Brochure" compact /></div>
          </div>
        </section>

        <section className="home-final">
          <div className="home-container">
            <p className="home-eyebrow">See it for yourself</p>
            <h2>Come walk the hill <em>this weekend.</em></h2>
            <p>Book a site visit and explore the estate setting, ownership paths, and documentation conversation in person.</p>
            <div className="home-actions">
              <button className="home-btn home-btn-gold" type="button" onClick={onEnquire}>Book a Site Visit <ArrowRight size={16} /></button>
              <a className="home-btn home-btn-ghost" href={getWhatsAppUrl()} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Chat on WhatsApp</a>
            </div>
          </div>
        </section>

        <section className="home-stay-form-bottom" id="stay-booking">
          <div className="home-stay-form-wrap">
            <StayEnquiryForm />
          </div>
        </section>
      </main>
    </>
  );
}

function SectionIntro({ eyebrow, title, children, inverse = false }) {
  return (
    <div className={`home-section-intro ${inverse ? "inverse" : ""}`}>
      <p className="home-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p className="home-section-desc">{children}</p>}
    </div>
  );
}

function MapIllustration() {
  return (
    <div className="home-map">
      <iframe
        title="Serenity Hills Dapoli location on Google Maps"
        src={siteConfig.googleMapEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a href={siteConfig.googleMapUrl} target="_blank" rel="noreferrer">Open exact location in Google Maps</a>
    </div>
  );
}

function videoSchema(videos) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: videos.map((video, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "VideoObject",
        name: video.title,
        description: video.description,
        thumbnailUrl: [`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`],
        uploadDate: video.uploadDate,
        duration: video.duration,
        embedUrl: `https://www.youtube-nocookie.com/embed/${video.youtubeId}`,
        contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`
      }
    }))
  };
}

function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.legalName,
    image: absoluteUrl(siteConfig.assets.logo),
    url: siteConfig.siteUrl,
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "Dapoli",
      addressRegion: "Maharashtra",
      addressCountry: "IN"
    },
    areaServed: ["Dapoli", "Ratnagiri", "Pune", "Mumbai"]
  };
/*  */}
