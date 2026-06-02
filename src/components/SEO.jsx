import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageMeta } from "../data/pages";
import { siteConfig } from "../data/siteConfig";
import { absoluteUrl } from "../utils/seo";

function setMeta(name, content, attr = "name") {
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export default function SEO({ title, description, image, schema = [], canonicalPath }) {
  const { pathname } = useLocation();
  const meta = pageMeta[pathname] || pageMeta["/"];
  const resolvedTitle = title || meta.title;
  const resolvedDescription = description || meta.description;
  const resolvedImage = absoluteUrl(image || meta.image || siteConfig.assets.logo);
  const canonical = absoluteUrl(canonicalPath || pathname);

  useEffect(() => {
    document.title = resolvedTitle;
    setMeta("description", resolvedDescription);
    setMeta("og:title", resolvedTitle, "property");
    setMeta("og:description", resolvedDescription, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:url", canonical, "property");
    setMeta("og:image", resolvedImage, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", resolvedTitle);
    setMeta("twitter:description", resolvedDescription);
    setMeta("twitter:image", resolvedImage);

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);

    document.querySelectorAll("script[data-serenity-schema]").forEach((node) => node.remove());
    schema.filter(Boolean).forEach((item) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.serenitySchema = "true";
      script.textContent = JSON.stringify(item);
      document.head.appendChild(script);
    });
  }, [resolvedTitle, resolvedDescription, resolvedImage, canonical, schema]);

  return null;
}
