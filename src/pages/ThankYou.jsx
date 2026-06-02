import { Link, useLocation } from "react-router-dom";
import SEO from "../components/SEO";
import CTAButton from "../components/CTAButton";
import { getWhatsAppUrl } from "../utils/whatsapp";

export default function ThankYou() {
  const { state } = useLocation();
  return (
    <>
      <SEO canonicalPath="/thank-you" />
      <main className="page-gutter grid min-h-[70vh] place-items-center bg-sand py-20 text-center">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-clay">Thank you</p>
          <h1 className="font-serif text-5xl font-semibold text-forest">Your Serenity Hills enquiry has been received.</h1>
          <p className="mt-5 leading-7 text-stone-700">
            Our team will respond with project details, plots, villas, pricing, documentation, and site visit options. {state?.fallback ? "Lead API URL is not configured yet, so please also message us on WhatsApp for production testing." : ""}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CTAButton href={getWhatsAppUrl()} target="_blank" rel="noreferrer">Chat on WhatsApp</CTAButton>
            <Link className="inline-flex min-h-11 items-center rounded-full border border-forest/20 px-5 py-3 font-semibold text-forest" to="/">Back to Home</Link>
          </div>
        </div>
      </main>
    </>
  );
}
