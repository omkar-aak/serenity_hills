export default function ImageGallery({ images }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {images.map((image, index) => (
        <figure key={image.src} className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}>
          <img
            src={image.src}
            alt={image.alt}
            width={image.width || 900}
            height={image.height || 640}
            loading={index === 0 ? "eager" : "lazy"}
            className="h-full min-h-64 w-full rounded-lg object-cover shadow-soft"
          />
        </figure>
      ))}
    </div>
  );
}
