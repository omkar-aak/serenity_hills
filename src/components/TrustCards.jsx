import { ClipboardCheck, FileSearch, Home, MapPin, Mountain, ShieldCheck } from "lucide-react";

const iconMap = [ShieldCheck, Mountain, Home, MapPin, FileSearch, ClipboardCheck];

export default function TrustCards({ items }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => {
        const Icon = iconMap[index % iconMap.length];
        return (
          <article key={item.title || item} className="rounded-lg border border-forest/10 bg-white p-5 shadow-soft">
            <Icon className="mb-4 text-clay" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-forest">{item.title || item}</h3>
            {item.text && <p className="mt-2 text-sm leading-6 text-stone-650">{item.text}</p>}
          </article>
        );
      })}
    </div>
  );
}
