import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useCookieConsent } from "../context/useCookieConsent";

const CookiePreferencesModal = lazy(() => import("./CookiePreferencesModal"));

export default function CookieBanner() {
  const { ready, bannerOpen, preferencesOpen, acceptAll, rejectOptional, openPreferences, dismissBanner } = useCookieConsent();

  if (!ready) return null;

  return (
    <>
      {bannerOpen && (
        <section className="fixed inset-x-0 bottom-20 z-[60] mx-auto w-[min(100%-1rem,980px)] animate-cookie-in rounded-lg border border-forest/10 bg-white/96 p-4 text-stone-700 shadow-2xl backdrop-blur md:bottom-6 md:p-5" aria-label="Cookie consent banner">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="pr-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-clay">Cookie consent</p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-forest">Your Privacy Matters</h2>
              <p className="mt-2 text-sm leading-6">
                We use cookies to improve your browsing experience, analyze website traffic, and support relevant marketing communication. You can accept all cookies or manage your preferences.
                {" "}<Link className="font-semibold text-forest underline-offset-4 hover:underline" to="/privacy-policy">Privacy Policy</Link>
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-3 lg:min-w-[460px]">
              <button type="button" className="btn-primary" onClick={acceptAll}>Accept All</button>
              <button type="button" className="cookie-secondary" onClick={rejectOptional}>Reject Non-Essential</button>
              <button type="button" className="cookie-secondary" onClick={openPreferences}>Manage Preferences</button>
            </div>
          </div>
          <button type="button" className="absolute right-3 top-3 rounded-full p-2 text-stone-600 transition hover:bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest" onClick={dismissBanner} aria-label="Close cookie banner">
            <X size={18} />
          </button>
        </section>
      )}
      {preferencesOpen && (
        <Suspense fallback={null}>
          <CookiePreferencesModal />
        </Suspense>
      )}
    </>
  );
}
