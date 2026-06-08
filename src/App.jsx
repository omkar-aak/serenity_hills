import { lazy, Suspense, useState, useEffect, useRef } from "react";
import ReactGA from "react-ga4";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import CookieBanner from "./components/CookieBanner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LeadModal from "./components/LeadModal";
import StickyMobileCTA from "./components/StickyMobileCTA";
import WhatsAppButton from "./components/WhatsAppButton";
import { CookieConsentProvider } from "./context/CookieConsentContext";

const Home = lazy(() => import("./pages/Home"));
const Vision = lazy(() => import("./pages/Vision"));
const Plots = lazy(() => import("./pages/Plots"));
const Villas = lazy(() => import("./pages/Villas"));
const Stay = lazy(() => import("./pages/Stay"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Contact = lazy(() => import("./pages/Contact"));
const LatestEvents = lazy(() => import("./pages/LatestEvents"));
const EventDetails = lazy(() => import("./pages/EventDetails"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const PolicyLegal = lazy(() => import("./pages/PolicyLegal"));
const ThankYou = lazy(() => import("./pages/ThankYou"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function AnalyticsPageViewTracker() {
  const location = useLocation();
  const lastTrackedPage = useRef(location.pathname + location.search);

  useEffect(() => {
    const page = location.pathname + location.search;

    if (page === lastTrackedPage.current) return;

    lastTrackedPage.current = page;
    ReactGA.send({ hitType: "pageview", page });
  }, [location.pathname, location.search]);

  return null;
}

function NavigateToBlogPost() {
  const { pathname } = useLocation();
  const slug = pathname.split("/").filter(Boolean).pop();
  return <Navigate to={`/blog/${slug || ""}`} replace />;
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <CookieConsentProvider>
      <AnalyticsPageViewTracker />
      <ScrollToTop />
      <Header onEnquire={openModal} />
      <Suspense fallback={<main className="grid min-h-[60vh] place-items-center bg-sand text-forest">Loading Serenity Hills...</main>}>
        <Routes>
          <Route path="/" element={<Home onEnquire={openModal} />} />
          <Route path="/vision" element={<Vision onEnquire={openModal} />} />
          <Route path="/plots" element={<Plots onEnquire={openModal} />} />
          <Route path="/villas" element={<Villas onEnquire={openModal} />} />
          <Route path="/stay" element={<Stay onEnquire={openModal} />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<LatestEvents />} />
          <Route path="/blog/:slug" element={<EventDetails />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/policy-terms" element={<PolicyLegal />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/dream-villa" element={<Navigate to="/villas" replace />} />
          <Route path="/the-estate" element={<Navigate to="/vision" replace />} />
          <Route path="/plots-villas" element={<Navigate to="/plots" replace />} />
          <Route path="/na-plots-in-dapoli" element={<Navigate to="/plots" replace />} />
          <Route path="/dapoli-tourism" element={<Navigate to="/stay" replace />} />
          <Route path="/serenity-events" element={<Navigate to="/stay" replace />} />
          <Route path="/latest-events" element={<Navigate to="/blog" replace />} />
          <Route path="/latest-events/:slug" element={<NavigateToBlogPost />} />
          <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
          <Route path="/terms" element={<Navigate to="/terms-and-conditions" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer onEnquire={openModal} />
      <WhatsAppButton />
      <StickyMobileCTA onEnquire={openModal} />
      <CookieBanner />
      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </CookieConsentProvider>
  );
}
