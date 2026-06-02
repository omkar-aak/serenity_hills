export default function SectionHeading({ eyebrow, title, children, align = "left" }) {
  return (
    <div className={`mx-auto max-w-3xl ${align === "center" ? "text-center" : ""}`}>
      {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-clay">{eyebrow}</p>}
      <h2 className="font-serif text-3xl font-semibold leading-tight text-forest md:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-base leading-7 text-stone-700 md:text-lg">{children}</p>}
    </div>
  );
}
