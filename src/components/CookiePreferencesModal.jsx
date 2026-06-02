import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useCookieConsent } from "../context/useCookieConsent";

export default function CookiePreferencesModal() {
  const { consent, preferencesOpen, closePreferences, saveConsent, acceptAll, rejectOptional } = useCookieConsent();
  const [analytics, setAnalytics] = useState(() => Boolean(consent?.analytics));
  const [marketing, setMarketing] = useState(() => Boolean(consent?.marketing));
  const panelRef = useRef(null);

  useEffect(() => {
    if (!preferencesOpen) return;
    const previousFocus = document.activeElement;
    requestAnimationFrame(() => panelRef.current?.focus());

    function onKeyDown(event) {
      if (event.key === "Escape") closePreferences();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus?.();
    };
  }, [closePreferences, consent, preferencesOpen]);

  if (!preferencesOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="cookie-preferences-title">
      <div ref={panelRef} tabIndex="-1" className="max-h-[92vh] w-full max-w-2xl overflow-auto rounded-lg bg-white p-5 shadow-2xl outline-none md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-clay">Cookie settings</p>
            <h2 id="cookie-preferences-title" className="mt-2 font-serif text-3xl font-semibold text-forest">Manage your preferences</h2>
            <p className="mt-3 leading-7 text-stone-700">
              Choose how Serenity Hills may use cookies beyond essentials. You can update these choices from the footer anytime.
            </p>
          </div>
          <button type="button" className="rounded-full p-2 text-stone-600 transition hover:bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest" onClick={closePreferences} aria-label="Close cookie preferences">
            <X />
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          <PreferenceRow title="Essential Cookies" description="Required for core website functionality, security, routing, and form experience." checked disabled />
          <PreferenceRow title="Analytics Cookies" description="Help us understand website traffic and improve page performance without exposing private CRM credentials." checked={analytics} onChange={setAnalytics} />
          <PreferenceRow title="Marketing Cookies" description="Support relevant remarketing communication through tools such as Meta Pixel when configured." checked={marketing} onChange={setMarketing} />
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <button type="button" className="btn-primary" onClick={acceptAll}>Accept All</button>
          <button type="button" className="cookie-secondary" onClick={rejectOptional}>Reject Optional</button>
          <button type="button" className="cookie-secondary" onClick={() => saveConsent({ essential: true, analytics, marketing })}>Save Preferences</button>
        </div>
      </div>
    </div>
  );
}

function PreferenceRow({ title, description, checked, disabled = false, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-forest/10 bg-[#fbfaf6] p-4">
      <div>
        <h3 className="font-semibold text-forest">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-stone-600">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative h-8 w-14 shrink-0 rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${checked ? "bg-forest" : "bg-stone-300"} ${disabled ? "cursor-not-allowed opacity-70" : ""}`}
      >
        <span className={`absolute top-1 size-6 rounded-full bg-white shadow transition ${checked ? "left-7" : "left-1"}`} />
        <span className="sr-only">{title}</span>
      </button>
    </div>
  );
}
