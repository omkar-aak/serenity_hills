export function initAnalytics() {
  const ga4 = import.meta.env.VITE_GA4_ID;
  const gtm = import.meta.env.VITE_GTM_ID;
  const meta = import.meta.env.VITE_META_PIXEL_ID;
  const linkedIn = import.meta.env.VITE_LINKEDIN_PARTNER_ID;

  window.__SERENITY_ANALYTICS__ = { ga4, gtm, meta, linkedIn };
}

export function trackEvent(name, payload = {}) {
  window.dispatchEvent(new CustomEvent("serenity:analytics", { detail: { name, payload } }));
}
