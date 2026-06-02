import SEO from "../components/SEO";
import { LegalLayout } from "./PolicyLegal";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO canonicalPath="/privacy-policy" />
      <LegalLayout eyebrow="Privacy Policy" title="Privacy built around clear enquiry handling." lede="How Serenity Hills collects, uses, and protects enquiry information shared through this website.">
        <p>Serenity Hills respects your privacy. This policy explains how enquiry data is collected and used when you interact with this website.</p>
        <h2>Information We Collect</h2>
        <p>We may collect your name, mobile number, email, city, buyer interest, preferred contact method, message, page URL, referrer, and UTM campaign details when you submit a form.</p>
        <h2>How We Use Information</h2>
        <p>We use information to respond to enquiries, share project details, coordinate site visits, provide brochure or pricing information, and improve our marketing and customer communication.</p>
        <h2>Cookies and Tracking</h2>
        <p>The site includes placeholders for GA4, Google Tag Manager, Meta Pixel, and LinkedIn Insight Tag. These should be configured only with valid IDs and appropriate consent practices for production campaigns.</p>
        <h2>Data Sharing</h2>
        <p>Lead data may be sent to an internal CRM such as Odoo and used by authorized sales or support teams. We do not publish your personal information on the website.</p>
        <h2>Your Choices</h2>
        <p>You may request that we stop contacting you for marketing-related communication by replying to our message or contacting us through the details on the Contact page.</p>
        <h2>Security</h2>
        <p>We use server-side environment variables for private CRM credentials. No Odoo credentials should be placed in frontend code or public environment files.</p>
      </LegalLayout>
    </>
  );
}
