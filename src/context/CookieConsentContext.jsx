import { useCallback, useEffect, useMemo, useState } from "react";
import { defaultConsent, readCookieConsent, updateTrackingConsent, writeCookieConsent } from "../utils/cookieConsent";
import { CookieConsentContext } from "./cookieConsentContextValue";

export function CookieConsentProvider({ children }) {
  const [consent, setConsent] = useState(() => readCookieConsent());
  const [bannerOpen, setBannerOpen] = useState(() => !readCookieConsent());
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [ready] = useState(true);

  useEffect(() => {
    if (consent) updateTrackingConsent(consent);
  }, [consent]);

  const saveConsent = useCallback((nextConsent) => {
    const saved = writeCookieConsent(nextConsent);
    setConsent(saved);
    setBannerOpen(false);
    setPreferencesOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent({ essential: true, analytics: true, marketing: true });
  }, [saveConsent]);

  const rejectOptional = useCallback(() => {
    saveConsent(defaultConsent);
  }, [saveConsent]);

  const openPreferences = useCallback(() => {
    setPreferencesOpen(true);
    setBannerOpen(false);
  }, []);

  const closePreferences = useCallback(() => {
    setPreferencesOpen(false);
    if (!consent) setBannerOpen(true);
  }, [consent]);

  const reopenPreferences = useCallback(() => {
    setPreferencesOpen(true);
    setBannerOpen(false);
  }, []);

  const dismissBanner = useCallback(() => {
    setBannerOpen(false);
  }, []);

  const value = useMemo(() => ({
    consent,
    ready,
    bannerOpen,
    preferencesOpen,
    acceptAll,
    rejectOptional,
    saveConsent,
    openPreferences,
    closePreferences,
    reopenPreferences,
    dismissBanner
  }), [acceptAll, bannerOpen, closePreferences, consent, dismissBanner, openPreferences, preferencesOpen, ready, rejectOptional, reopenPreferences, saveConsent]);

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}
