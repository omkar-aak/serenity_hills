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
        <section className="fixed bottom-4 left-4 right-4 z-[60] animate-cookie-in rounded-lg border border-forest/10 bg-white/96 p-4 text-stone-700 shadow-2xl backdrop-blur sm:left-auto sm:right-5 sm:bottom-5 sm:w-[min(390px,calc(100vw-2.5rem))]" aria-label="Cookie consent banner">
          <div className="grid gap-3">
            <div className="pr-8">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-clay">Cookie consent</p>
              <h2 className="mt-1 font-serif text-xl font-semibold leading-tight text-forest">Your Privacy Matters</h2>
              <p className="mt-2 text-xs leading-5">
                We use cookies to improve your browsing experience, analyze website traffic, and support relevant marketing communication. You can accept all cookies or manage your preferences.
                {" "}<Link className="font-semibold text-forest underline-offset-4 hover:underline" to="/privacy-policy">Privacy Policy</Link>
              </p>
            </div>
            <div className="grid gap-2">
              <button type="button" className="btn-primary min-h-10 px-4 py-2 text-xs" onClick={acceptAll}>Accept All</button>
              <button type="button" className="cookie-secondary min-h-10 px-4 py-2 text-xs" onClick={rejectOptional}>Reject Non-Essential</button>
              <button type="button" className="cookie-secondary min-h-10 px-4 py-2 text-xs" onClick={openPreferences}>Manage Preferences</button>
            </div>
          </div>
          <button type="button" className="absolute right-2.5 top-2.5 rounded-full p-1.5 text-stone-600 transition hover:bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest" onClick={dismissBanner} aria-label="Close cookie banner">
            <X size={16} />
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
