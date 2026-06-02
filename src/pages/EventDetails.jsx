import { Navigate, useParams } from "react-router-dom";
import EventCTA from "../components/EventCTA";
import EventGallery from "../components/EventGallery";
import EventHero from "../components/EventHero";
import EventHighlights from "../components/EventHighlights";
import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";
import { getBlogArticleBySlug } from "../data/blogArticles";
import { getEventBySlug } from "../data/events";
import { siteConfig } from "../data/siteConfig";
import { breadcrumbSchema, organizationSchema } from "../utils/seo";

export default function EventDetails() {
  const { slug } = useParams();
  const article = getBlogArticleBySlug(slug);
  const event = getEventBySlug(slug);

  if (article) return <BlogArticleDetails article={article} />;
  if (!event) return <Navigate to="/blog" replace />;

  const galleryImages = event.gallery.map((src, index) => ({
    src,
    alt: `${event.title} gallery image ${index + 1} at Serenity Hills`,
    span: index === 0 ? "md:col-span-2 md:row-span-2" : ""
  }));

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.excerpt,
    image: [`${siteConfig.siteUrl}${event.heroImage || event.image}`],
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dapoli",
        addressRegion: "Maharashtra",
        addressCountry: "IN"
      }
    },
    organizer: {
      "@type": "Organization",
      name: "Serenity Hills",
      url: siteConfig.siteUrl
    }
  };

  return (
    <>
      <SEO
        title={`${event.title} | Serenity Hills Dapoli`}
        description={event.excerpt}
        image={event.heroImage || event.image}
        canonicalPath={`/blog/${event.slug}`}
        schema={[
          organizationSchema(),
          eventSchema,
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: event.title, href: `/blog/${event.slug}` }
          ])
        ]}
      />
      <main>
        <EventHero event={event} />

        <section className="section-pad bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.85fr_1.15fr]">
            <SectionHeading eyebrow="Event story" title="A closer look at the Serenity Hills experience">
              {event.description}
            </SectionHeading>
            <div className="grid gap-5 text-lg leading-8 text-stone-700">
              {event.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad bg-[#fbfaf6]">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Gallery" title="Moments from the estate and Dapoli setting" align="center">
              A photography-led view of the atmosphere, site orientation, nature, and lifestyle context around this experience.
            </SectionHeading>
            <div className="mt-10">
              <EventGallery images={galleryImages} />
            </div>
          </div>
        </section>

        <section className="section-pad bg-sand">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Highlights" title="What this experience includes" align="center" />
            <div className="mt-10">
              <EventHighlights highlights={event.highlights} />
            </div>
          </div>
        </section>

        <section className="section-pad bg-white">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-clay">Estate journal</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold text-forest md:text-5xl">Built for people who want to feel the place before they decide.</h2>
            <p className="mt-5 text-lg leading-8 text-stone-700">
              Serenity Hills events are intentionally calm, spacious, and practical. They help buyers understand Dapoli, the estate setting, documentation conversations, and second-home possibilities in a more human way.
            </p>
          </div>
        </section>

        <EventCTA />
      </main>
    </>
  );
}

function BlogArticleDetails({ article }) {
  return (
    <>
      <SEO
        title={`${article.title} | Serenity Hills Blog`}
        description={article.excerpt}
        image={article.image}
        canonicalPath={`/blog/${article.slug}`}
        schema={[
          organizationSchema(),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: article.title,
            description: article.excerpt,
            image: [`${siteConfig.siteUrl}${article.image}`],
            datePublished: article.date,
            author: { "@type": "Organization", name: "Serenity Hills" }
          },
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: article.title, href: `/blog/${article.slug}` }
          ])
        ]}
      />
      <main className="design-page blog-detail-page">
        <section className="blog-detail-hero">
          <div className="design-container">
            <p className="blog-bread"><a href="/">Home</a><span>/</span><a href="/blog">Blog</a></p>
            <p className="design-eyebrow">{article.tag} - {article.date} - {article.read}</p>
            <h1>{article.title}</h1>
            <p>{article.excerpt}</p>
          </div>
        </section>
        <section className="blog-detail-body">
          <div className="design-container">
            <img src={article.image} alt={`${article.title} article cover`} width="1200" height="720" loading="eager" decoding="async" />
            <article>
              {article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <a href="/blog">Back to all articles</a>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
