export default function EventTimeline({ items }) {
  return (
    <div className="mx-auto max-w-4xl">
      {items.map((item, index) => (
        <article key={item.title} className="relative grid gap-4 border-l border-forest/20 pb-10 pl-7 last:pb-0">
          <span className="absolute -left-2 top-1 grid size-4 place-items-center rounded-full bg-forest ring-4 ring-sand" aria-hidden="true" />
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-clay">{item.date}</p>
          <div className="rounded-lg bg-white p-5 shadow-soft">
            <h3 className="font-serif text-2xl font-semibold text-forest">{item.title}</h3>
            <p className="mt-2 leading-7 text-stone-700">{item.description}</p>
          </div>
          {index === items.length - 1 && <span className="sr-only">Final timeline item</span>}
        </article>
      ))}
    </div>
  );
}
