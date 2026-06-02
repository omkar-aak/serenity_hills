export const COOKIE_CONSENT_KEY = "serenity_cookie_consent";

export const defaultConsent = {
  essential: true,
  analytics: false,
  marketing: false,
  consentedAt: ""
};

export function readCookieConsent() {
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return {
      essential: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      consentedAt: parsed.consentedAt || ""
    };
  } catch {
    return null;
  }
}

export function writeCookieConsent(consent) {
  const nextConsent = {
    essential: true,
    analytics: Boolean(consent.analytics),
    marketing: Boolean(consent.marketing),
    consentedAt: new Date().toISOString()
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(nextConsent));
  updateTrackingConsent(nextConsent);
  return nextConsent;
}

export function updateTrackingConsent(consent) {
  updateGoogleConsentMode(consent);
  window.__SERENITY_COOKIE_CONSENT__ = consent;
  window.dispatchEvent(new CustomEvent("serenity:cookie-consent", { detail: consent }));
}

export function updateGoogleConsentMode(consent) {
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied"
    });
  }
}

export function canLoadAnalytics(consent) {
  return Boolean(consent?.analytics && (import.meta.env.VITE_GA4_ID || import.meta.env.VITE_GTM_ID));
}

export function canLoadMarketing(consent) {
  return Boolean(consent?.marketing && import.meta.env.VITE_META_PIXEL_ID);
}
