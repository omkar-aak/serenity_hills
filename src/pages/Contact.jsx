import { ArrowRight, Check, Clock, Mail, MapPin, MessageCircle, Phone, Route } from "lucide-react";
import LeadForm from "../components/LeadForm";
import SEO from "../components/SEO";
import { siteConfig } from "../data/siteConfig";
import { breadcrumbSchema, organizationSchema } from "../utils/seo";
import { getWhatsAppUrl } from "../utils/whatsapp";

const intents = ["Plot Enquiry", "Villa Build", "Weekend Stay", "Investment"];

const methods = [
  {
    icon: MessageCircle,
    className: "wa",
    label: "Fastest response",
    title: "WhatsApp",
    detail: siteConfig.phoneDisplay,
    note: "English, Marathi and Hindi. Share your question and the team will reply with relevant details.",
    href: getWhatsAppUrl("Hi, I am interested in Serenity Hills Dapoli. Please share details."),
    cta: "Open WhatsApp"
  },
  {
    icon: Phone,
    className: "ph",
    label: "Speak to the team",
    title: "Phone",
    detail: siteConfig.phoneDisplay,
    note: "Best for plot selection, build timelines, investment structure and site visit planning.",
    href: siteConfig.phoneHref,
    cta: "Call now"
  },
  {
    icon: Mail,
    className: "em",
    label: "Written enquiries",
    title: "Email",
    detail: siteConfig.email,
    note: "Best for formal enquiries, document requests, NRI questions, press and media conversations.",
    href: `mailto:${siteConfig.email}`,
    cta: "Send an email"
  }
];

const steps = [
  ["1", "We review your enquiry", "Usually within a few hours on working days. Weekends may take a little longer."],
  ["2", "We reach you on WhatsApp", "A brief hello to understand what you are exploring: no script, no pressure."],
  ["3", "We send the right documents", "Rate card, plot inventory, 7/12 extracts, brochure or visit details based on your enquiry."]
];

const trustSignals = [
  "No pressure follow-up: you decide the pace",
  "Documents shared early in the conversation",
  "Independent legal review actively encouraged",
  "WhatsApp-first support in English, Marathi or Hindi",
  "Site visits available by appointment"
];

const faqs = [
  ["How quickly do you respond to enquiries?", "WhatsApp enquiries usually receive the fastest response during working hours. Form submissions are reviewed and followed up on WhatsApp or phone."],
  ["Do I need to visit the site before booking a plot?", "A visit is strongly recommended because it confirms the view, contour, access and feel of the selected cluster. Virtual walkthroughs can also be discussed."],
  ["Will I be pressured to decide quickly?", "No. The team shares documents, answers questions and lets you work at your own pace. Availability should still be confirmed before any decision."],
  ["Can I do a virtual site visit?", "Yes. Ask for a live video walkthrough of the estate, clusters or shortlisted plots on WhatsApp or Zoom."],
  ["Who do I contact for press or media enquiries?", `Email ${siteConfig.email} with your publication, story angle and deadline.`]
];

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact - Serenity Hills Dapoli | Plot, Villa & Site Visit Enquiry"
        description="Contact Serenity Hills Dapoli for plot enquiries, villa builds, weekend stays, investment questions, documents, pricing and site visit appointments."
        canonicalPath="/contact"
        schema={[organizationSchema(), breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }])]}
      />
      <main className="design-page contact-page">
        <section className="contact-hero">
          <div className="design-container">
            <p className="contact-bread"><a href="/">Home</a><span>/</span>Contact</p>
            <h1>Let's talk about<br /><em>the hill.</em></h1>
            <p>No scripts, no pressure. Tell us what you are exploring and we will give you the straight answer, with documents to back it up.</p>
            <div className="contact-intents">
              {intents.map((intent) => <a href="#contact-form" key={intent}>{intent}</a>)}
            </div>
          </div>
        </section>

        <section className="contact-methods">
          <div className="design-container contact-method-grid">
            {methods.map(({ icon: Icon, className, label, title, detail, note, href, cta }) => (
              <article className={`contact-method-card ${className}`} key={title}>
                <div><Icon size={24} /></div>
                <span>{label}</span>
                <h3>{title}</h3>
                <strong>{detail}</strong>
                <p>{note}</p>
                <a href={href} target={href.startsWith("https") ? "_blank" : undefined} rel={href.startsWith("https") ? "noreferrer" : undefined}>{cta} <ArrowRight size={15} /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-main" id="contact-form">
          <div className="design-container contact-grid">
            <aside className="contact-info-panel">
              <p className="design-eyebrow">What to expect</p>
              <h2>No pressure.<br />Just the facts.</h2>
              <p>Every enquiry is handled personally. We share relevant documents, answer your questions and let you decide at your pace.</p>
              <div className="contact-steps">
                <h3>What happens after you submit</h3>
                {steps.map(([number, title, text]) => (
                  <article key={title}>
                    <strong>{number}</strong>
                    <div><h4>{title}</h4><p>{text}</p></div>
                  </article>
                ))}
              </div>
              <div className="contact-trust">
                {trustSignals.map((item) => <p key={item}><Check size={15} />{item}</p>)}
              </div>
              <div className="contact-office">
                <h3>Find us</h3>
                <p><MapPin size={16} />{siteConfig.address}</p>
                
                <p><Route size={16} />Approx. 4 hrs from Pune and 5 hrs from Mumbai via NH-66.</p>
                <MapIllustration />
              </div>
            </aside>

            <section className="contact-form-card">
              <h2>Send us a message</h2>
              <p>Tell us what you are exploring and we will respond with exactly what is relevant.</p>
              <LeadForm formType="contact" compact />
            </section>
          </div>
        </section>

        <section className="contact-site-visit">
          <div className="design-container">
            <div>
              <p className="design-eyebrow">See it for yourself</p>
              <h2>The best conversation happens <em>on the hill.</em></h2>
              <p>Book a site visit. We will show you the slope, plots, documents and the view from the western edge.</p>
              <div className="design-actions">
                <a className="design-btn gold" href="#contact-form">Request a Site Visit <ArrowRight size={16} /></a>
                <a className="design-btn ghost" href={getWhatsAppUrl("Hi, I would like to book a site visit to Serenity Hills Dapoli.")} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp to book</a>
              </div>
            </div>
          </div>
        </section>

        <section className="design-section design-alt">
          <div className="design-container contact-faq-grid">
            <div>
              <p className="design-eyebrow">Quick answers</p>
              <h2>Contact & process FAQs.</h2>
              <p>Short answers to the questions people ask before they reach out.</p>
              <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer">Still have a question? WhatsApp us <ArrowRight size={14} /></a>
            </div>
            <div className="design-faq">
              {faqs.map(([question, answer], index) => <details open={index === 0} key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function MapIllustration() {
  return (
    <div className="contact-map">
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
