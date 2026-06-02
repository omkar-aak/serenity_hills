import { CalendarDays, MapPin } from "lucide-react";
import CTAButton from "./CTAButton";

export default function EventCard({ event }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-forest/10 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="overflow-hidden">
        <img src={event.image} alt={`${event.title} at Serenity Hills`} width="720" height="520" loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
      </div>
      <div className="p-5 md:p-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-clay">{event.category}</p>
        <h3 className="font-serif text-2xl font-semibold leading-tight text-forest">{event.title}</h3>
        <div className="mt-4 grid gap-2 text-sm text-stone-600">
          <p className="flex items-center gap-2"><CalendarDays size={17} className="text-clay" aria-hidden="true" /> {event.date}</p>
          <p className="flex items-center gap-2"><MapPin size={17} className="text-clay" aria-hidden="true" /> {event.location}</p>
        </div>
        <p className="mt-4 leading-7 text-stone-700">{event.excerpt}</p>
        <CTAButton href={`/blog/${event.slug}`} variant="secondary" className="mt-5">View Details</CTAButton>
      </div>
    </article>
  );
}
