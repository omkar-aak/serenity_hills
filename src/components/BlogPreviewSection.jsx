import { siteConfig } from "../data/siteConfig";
import BlogCard from "./BlogCard";
import SectionHeading from "./SectionHeading";

const posts = [
  {
    title: "Why Dapoli is Emerging as a Second-Home Destination",
    excerpt: "A calm coastal belt, green hills, weekend access, and a slower lifestyle are making Dapoli more relevant for thoughtful second-home buyers.",
    category: "Dapoli lifestyle",
    image: siteConfig.assets.beach,
    alt: "Dapoli beach lifestyle for second-home buyers",
    href: "/stay"
  },
  {
    title: "Things to Know Before Buying NA Plots",
    excerpt: "Understand documentation, site visits, access, title checks, layout approvals, and why independent due diligence matters before buying land.",
    category: "Buyer education",
    image: siteConfig.assets.plots,
    alt: "NA plot discussion at Serenity Hills Dapoli",
    href: "/plots"
  },
  {
    title: "Weekend Living Near Pune & Mumbai",
    excerpt: "A second-home decision is not just about distance. It is about rhythm, family use, nature, maintenance, and how often you can realistically visit.",
    category: "Second-home guide",
    image: siteConfig.assets.landscape,
    alt: "Green Dapoli landscape near Serenity Hills",
    href: "/vision"
  },
  {
    title: "Coastal Maharashtra Lifestyle Guide",
    excerpt: "Beaches, temples, forts, food, monsoon greenery, and hill weather give Dapoli a distinct sense of place for lifestyle-led buyers.",
    category: "Travel and nature",
    image: siteConfig.assets.forts,
    alt: "Dapoli coastal tourism and fort landscape",
    href: "/stay"
  }
];

export default function BlogPreviewSection() {
  return (
    <section className="section-pad bg-[#fbfaf6]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Insights" title="Insights From Dapoli & Serenity Hills" align="center">
          Editorial guides that help buyers understand Dapoli, NA plots, second-home planning, and nature-led ownership with more clarity.
        </SectionHeading>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {posts.map((post) => <BlogCard key={post.title} post={post} />)}
        </div>
      </div>
    </section>
  );
}
