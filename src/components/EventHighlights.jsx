import { Compass, Handshake, Leaf, MapPinned, Users } from "lucide-react";

const icons = [Compass, Leaf, Handshake, MapPinned, Users];

export default function EventHighlights({ highlights }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {highlights.map((highlight, index) => {
        const Icon = icons[index % icons.length];
        return (
          <article key={highlight} className="rounded-lg border border-forest/10 bg-white p-5 shadow-soft">
            <span className="mb-4 grid size-11 place-items-center rounded-full bg-[#e8f8ee] text-forest">
              <Icon size={20} aria-hidden="true" />
            </span>
            <h3 className="font-semibold leading-6 text-forest">{highlight}</h3>
          </article>
        );
      })}
    </div>
  );
}
