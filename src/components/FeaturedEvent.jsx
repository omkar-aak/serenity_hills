import { CalendarDays, MapPin } from "lucide-react";
import CTAButton from "./CTAButton";

export default function FeaturedEvent({ event }) {
  return (
    <article className="grid overflow-hidden rounded-lg bg-forest text-white shadow-soft lg:grid-cols-[1.1fr_.9fr]">
      <img src={event.image} alt={`${event.title} featured event at Serenity Hills`} width="1100" height="760" className="h-full min-h-80 w-full object-cover" />
      <div className="grid content-center p-6 md:p-10 lg:p-12">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-sand">{event.category}</p>
        <h2 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">{event.title}</h2>
        <div className="mt-5 grid gap-2 text-sm text-white/78">
          <p className="flex items-center gap-2"><CalendarDays size={18} className="text-sand" aria-hidden="true" /> {event.date}</p>
          <p className="flex items-center gap-2"><MapPin size={18} className="text-sand" aria-hidden="true" /> {event.location}</p>
        </div>
        <p className="mt-6 text-lg leading-8 text-white/84">{event.excerpt}</p>
        <CTAButton href="/contact" variant="sand" className="mt-7">Book This Experience</CTAButton>
      </div>
    </article>
  );
}
