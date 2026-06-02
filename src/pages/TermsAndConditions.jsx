import SEO from "../components/SEO";
import { LegalLayout } from "./PolicyLegal";

export default function TermsAndConditions() {
  return (
    <>
      <SEO canonicalPath="/terms-and-conditions" />
      <LegalLayout eyebrow="Terms & Conditions" title="Straight terms for a better buyer conversation." lede="Website information is shared for project enquiry, communication, and buyer education purposes.">
        <p>By using this website, you agree that all information is provided for general project enquiry and communication purposes.</p>
        <h2>No Professional Advice</h2>
        <p>Nothing on this website should be treated as legal, financial, investment, tax, or property advisory advice. Buyers should consult qualified professionals.</p>
        <h2>Project Information</h2>
        <p>Images, descriptions, amenities, pricing, availability, plans, and specifications are indicative and may change. Final terms must be confirmed through official documents.</p>
        <h2>Lead Forms</h2>
        <p>Submitting a form does not create a booking, allotment, reservation, or contractual right. It only allows Serenity Hills representatives to contact you about your enquiry.</p>
        <h2>External Services</h2>
        <p>The website may submit lead data to a Vercel-hosted API and Odoo CRM. WhatsApp and phone links open third-party services governed by their own terms.</p>
        <h2>Limitation</h2>
        <p>Serenity Hills is not responsible for decisions made solely on website content without site visits, document review, written confirmation, and independent due diligence.</p>
      </LegalLayout>
    </>
  );
}
