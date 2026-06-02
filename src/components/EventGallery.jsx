export default function EventGallery({ images }) {
  return (
    <div className="grid auto-rows-[220px] gap-4 md:grid-cols-4 md:auto-rows-[180px] lg:auto-rows-[210px]">
      {images.map((image) => (
        <figure key={image.src} className={`group overflow-hidden rounded-lg bg-stone-100 shadow-soft ${image.span || ""}`}>
          <img src={image.src} alt={image.alt} width="900" height="700" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
        </figure>
      ))}
    </div>
  );
}
