import BlogPreviewSection from "../components/BlogPreviewSection";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";
import TalkToUsCTA from "../components/TalkToUsCTA";
import Testimonials from "../components/Testimonials";
import TrustCards from "../components/TrustCards";
import { siteConfig } from "../data/siteConfig";
import { breadcrumbSchema, organizationSchema } from "../utils/seo";

export default function AboutUs() {
  return (
    <>
      <SEO schema={[organizationSchema(), breadcrumbSchema([{ name: "Home", href: "/" }, { name: "About Us", href: "/about-us" }])]} />
      <PageHero eyebrow="About Us" title="A Dapoli estate advisory built around nature, clarity, and trust." image={siteConfig.assets.landscape}>
        Serenity Hills helps buyers evaluate Dapoli land and second-home possibilities without rushing the decision.
      </PageHero>
      <section className="section-pad bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <SectionHeading eyebrow="Our story" title="From a private hill-station idea to a better buyer journey.">
            The original Serenity Hills story centered on a private hill-station inspired second home in Dapoli. This rebuild keeps that emotional core, while making the website more useful for modern buyers who care about documentation, site visits, process clarity, and long-term value.
          </SectionHeading>
          <div className="rounded-lg bg-sand p-6 md:p-8">
            <p className="leading-8 text-stone-800">
              We speak to families, NRIs, investors, and second-home seekers who want a place that feels close to nature but still demands practical due diligence. Our role is to help start that conversation with clear project details, guided visits, and careful next steps.
            </p>
          </div>
        </div>
      </section>
      <section className="section-pad bg-[#fbfaf6]">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Principles" title="What Serenity Hills stands for" align="center" />
          <div className="mt-10">
            <TrustCards items={[
              { title: "Premium but grounded", text: "A refined estate experience without exaggerated claims or confusing sales language." },
              { title: "Documentation-aware", text: "We encourage document review, independent advice, and a transparent buyer process." },
              { title: "Nature-led", text: "Dapoli's hills, beaches, seasons, and slower rhythm are central to the project appeal." },
              { title: "Buyer-first", text: "Every form, CTA, and site visit path is built to help buyers make a considered decision." },
              { title: "NRI-friendly enquiries", text: "Remote buyers can request details, schedule calls, and plan visits before travelling." },
              { title: "Future maintainability", text: "The new site is fast, static, SEO-friendly, and easier to maintain than the previous heavy build." }
            ]} />
          </div>
        </div>
      </section>
      <Testimonials />
      <BlogPreviewSection />
      <TalkToUsCTA />
    </>
  );
}
