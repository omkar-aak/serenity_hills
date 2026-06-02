import CTAButton from "./CTAButton";
import { getWhatsAppUrl } from "../utils/whatsapp";

export default function PageHero({ eyebrow, title, children, image, cta = "Request Details", overlay = true }) {
  return (
    <section className="relative overflow-hidden bg-forest text-white">
      <img src={image} alt="" width="1600" height="980" className={`absolute inset-0 h-full w-full object-cover ${overlay ? "opacity-45" : "opacity-100"}`} />
      {overlay && <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/78 to-forest/25" />}
      {!overlay && <div className="absolute inset-0 bg-black/35" />}
      <div className="hero-pad relative mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-sand">{eyebrow}</p>
        <h1 className="max-w-4xl font-serif text-4xl font-semibold leading-tight md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/86">{children}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <CTAButton href="/contact" variant="sand">{cta}</CTAButton>
          <CTAButton href={getWhatsAppUrl()} variant="secondary" target="_blank" rel="noreferrer">Chat on WhatsApp</CTAButton>
        </div>
      </div>
    </section>
  );
}
