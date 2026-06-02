import CTAButton from "./CTAButton";

export default function BlogCard({ post }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-forest/10 bg-white shadow-soft">
      <div className="overflow-hidden">
        <img src={post.image} alt={post.alt} width="720" height="500" loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
      </div>
      <div className="p-5 md:p-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-clay">{post.category}</p>
        <h3 className="font-serif text-2xl font-semibold leading-tight text-forest">{post.title}</h3>
        <p className="mt-4 leading-7 text-stone-700">{post.excerpt}</p>
        <CTAButton href={post.href} variant="secondary" className="mt-5">Read More</CTAButton>
      </div>
    </article>
  );
}
