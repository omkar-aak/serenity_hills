import { MessageCircle } from "lucide-react";
import CTAButton from "./CTAButton";
import { getEventsWhatsAppUrl } from "../utils/whatsapp";

export default function EventCTA() {
  return (
    <section className="section-pad bg-forest text-center text-white">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-sand">Plan your visit</p>
        <h2 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">Interested in Experiencing Serenity Hills in Person?</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/78">
          Request a guided estate visit, project details, or a private conversation before travelling to Dapoli.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CTAButton href="/contact" variant="sand">Book a Site Visit</CTAButton>
          <CTAButton href="/contact" variant="secondary">Request Project Details</CTAButton>
          <CTAButton href={getEventsWhatsAppUrl()} variant="secondary" target="_blank" rel="noreferrer"><MessageCircle size={18} /> Chat on WhatsApp</CTAButton>
        </div>
      </div>
    </section>
  );
}
