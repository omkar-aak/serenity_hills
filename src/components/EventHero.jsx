import { CalendarDays, MapPin } from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";

export default function EventHero({ event }) {
  return (
    <section className="relative min-h-[68svh] overflow-hidden bg-forest text-white">
      <img src={event.heroImage || event.image} alt={`${event.title} at Serenity Hills Dapoli`} width="1600" height="1067" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-black/52" />
      <div className="hero-pad relative mx-auto grid min-h-[68svh] max-w-7xl content-center">
        <Breadcrumbs light items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: event.title }]} />
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-sand">{event.category}</p>
        <h1 className="mt-4 max-w-5xl font-serif text-4xl font-semibold leading-tight sm:text-5xl md:text-7xl">{event.title}</h1>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/84">
          <p className="flex items-center gap-2"><CalendarDays size={18} className="text-sand" aria-hidden="true" /> {event.date}</p>
          <p className="flex items-center gap-2"><MapPin size={18} className="text-sand" aria-hidden="true" /> {event.location}</p>
        </div>
      </div>
    </section>
  );
}
