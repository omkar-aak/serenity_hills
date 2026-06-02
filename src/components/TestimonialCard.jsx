import { Quote } from "lucide-react";

export default function TestimonialCard({ testimonial }) {
  return (
    <article className="rounded-lg border border-forest/10 bg-white p-6 shadow-soft">
      <Quote className="mb-5 text-clay" size={30} aria-hidden="true" />
      <p className="text-lg leading-8 text-stone-700">{testimonial.quote}</p>
      <div className="mt-6 border-t border-forest/10 pt-4">
        <h3 className="font-semibold text-forest">{testimonial.name}</h3>
        <p className="text-sm text-stone-500">{testimonial.city}</p>
      </div>
    </article>
  );
}
