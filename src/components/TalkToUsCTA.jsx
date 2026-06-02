import { MessageCircle } from "lucide-react";
import CTAButton from "./CTAButton";
import LeadForm from "./LeadForm";
import { getWhatsAppUrl } from "../utils/whatsapp";

export default function TalkToUsCTA() {
  return (
    <section className="section-pad relative z-10 bg-sand">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 rounded-lg border border-forest/10 bg-white p-6 shadow-soft md:p-8 lg:grid-cols-[.85fr_1.15fr] lg:p-10">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-clay">Talk To Us</p>
            <h2 className="font-serif text-4xl font-semibold leading-tight text-forest md:text-5xl">Request a project briefing.</h2>
            <p className="mt-5 text-lg leading-8 text-stone-700">
              Request a project briefing and explore Serenity Hills through a guided conversation. Ask about plots, villas, documentation, Dapoli access, and site visit planning.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton href="#about-lead-form">Request Project Details</CTAButton>
              <CTAButton href="/contact" variant="secondary">Book a Site Visit</CTAButton>
              <CTAButton href={getWhatsAppUrl()} variant="secondary" target="_blank" rel="noreferrer"><MessageCircle size={18} /> Chat on WhatsApp</CTAButton>
            </div>
          </div>
          <div id="about-lead-form">
            <LeadForm formType="about" compact />
          </div>
        </div>
      </div>
    </section>
  );
}
