import SectionHeading from "./SectionHeading";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    quote:
      "The site visit felt calm and transparent. We could understand the estate, ask document-related questions, and see how Dapoli fits our second-home plans.",
    name: "Mr. Dilip Lagu",
    city: "Mumbai"
  },
  {
    quote:
      "What stood out was the nature around the project. It did not feel like a rushed sales visit; it felt like a proper conversation about lifestyle and land.",
    name: "Mr. Shah",
    city: "Pune"
  },
  {
    quote:
      "As an NRI enquiry, I appreciated the clarity around site visits, documentation review, and the need for proper due diligence before any decision.",
    name: "Mr. Girish Gaikwad ",
    city: "Pune"
  }
];

export default function Testimonials() {
  return (
    <section className="section-pad bg-white">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Visitor impressions" title="What Visitors & Buyers Feel About Serenity Hills" align="center">
          Real conversations, real experiences, and genuine impressions from people exploring Serenity Hills.
        </SectionHeading>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => <TestimonialCard key={testimonial.name} testimonial={testimonial} />)}
        </div>
      </div>
    </section>
  );
}
