import SEO from "../components/SEO";
import { breadcrumbSchema } from "../utils/seo";

export default function PolicyLegal() {
  return (
    <>
      <SEO schema={[breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Policy & Legal", href: "/policy-terms" }])]} />
      <LegalLayout eyebrow="Policy & legal" title="Clear disclosures for better real estate decisions." lede="Website information is for general enquiry, advertising, and project briefing purposes only.">
        <h2>Advertising and Real Estate Disclaimer</h2>
        <p>Information on this website is intended for general project enquiry purposes. It should not be treated as legal, financial, tax, investment, or property purchase advice.</p>
        <p>Pricing, availability, specifications, development plans, plot sizes, images, services, and timelines may change without prior notice. Buyers should request current written information before making any decision.</p>
        <h2>Buyer Due Diligence</h2>
        <p>Buyers are encouraged to review title documents, 7/12 extract, NA order, layout approvals, access records, encumbrance status, tax records, agreement terms, and any other relevant documents with independent legal and financial advisors.</p>
        <h2>Site Visit Recommended</h2>
        <p>A guided site visit and documentation review are recommended before decision-making. Visuals on the website may include project images, surrounding lifestyle visuals, and representative estate imagery.</p>
        <h2>Lead and Communication Consent</h2>
        <p>By submitting a form, you consent to be contacted by phone, WhatsApp, email, or other relevant channels for Serenity Hills project information.</p>
        <h2>Refund or Cancellation Policy</h2>
        <p>This website does not process payments directly. Any token, booking, refund, cancellation, or commercial term must be governed by signed documents and official receipts issued through the appropriate business process.</p>
      </LegalLayout>
    </>
  );
}

export function LegalLayout({ eyebrow = "Legal", title, lede, children }) {
  return (
    <main className="design-page legal-page">
      <section className="legal-hero">
        <div className="design-container">
          <p className="design-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {lede && <p>{lede}</p>}
        </div>
      </section>
      <section className="legal-content">
        <div className="design-container legal-card">{children}</div>
      </section>
    </main>
  );
}
