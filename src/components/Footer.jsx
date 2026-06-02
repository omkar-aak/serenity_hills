import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { useCookieConsent } from "../context/useCookieConsent";
import { getWhatsAppUrl } from "../utils/whatsapp";

export default function Footer({ onEnquire }) {
  const { reopenPreferences } = useCookieConsent();

  return (
    <footer className="site-footer-ref">
      <div className="home-container site-footer-grid">
        <div className="site-footer-brand">
          <img src={siteConfig.assets.logo} alt="Serenity Hills logo" width="88" height="88" />
          <p>
            A private hill-station estate in Dapoli: NA plot conversations, managed second-home possibilities, and transparent documentation on the Konkan coast.
          </p>
        </div>
        <div>
          <h3>Estate</h3>
          <a href="/vision">Vision</a>
          <a href="/plots">Plots</a>
          <a href="/villas">Villas</a>
          <a href="/stay">Stay</a>
          <a href="/blog">Blog</a>
        </div>
        <div>
          <h3>Legal</h3>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-and-conditions">Terms & Conditions</a>
          <a href="/policy-terms">Policy & Legal</a>
          <button type="button" onClick={reopenPreferences}>Cookie Settings</button>
        </div>
        <div className="site-footer-contact">
          <h3>Contact</h3>
          <a href={siteConfig.phoneHref}><Phone size={15} /> {siteConfig.phoneDisplay}</a>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <p>{siteConfig.location}</p>
          <div className="site-footer-socials">
            <a className="site-footer-social" href={getWhatsAppUrl()} target="_blank" rel="noreferrer" aria-label="WhatsApp Serenity Hills"><MessageCircle size={17} /></a>
            <a className="site-footer-social" href={siteConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram Serenity Hills Dapoli"><InstagramIcon /></a>
            <a className="site-footer-social" href={siteConfig.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook Serenity Hills Dapoli"><FacebookIcon /></a>
            <a className="site-footer-social" href={siteConfig.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube Serenity Hills Dapoli"><YoutubeIcon /></a>
            <button className="site-footer-action" type="button" onClick={onEnquire}>Request Details</button>
          </div>
        </div>
      </div>
      <div className="home-container site-footer-bottom">
        <p>Copyright {new Date().getFullYear()} Serenity Hills. Information is for general enquiry only. Buyers should conduct independent due diligence.</p>
        <span>Designed for Konkan.</span>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.6.4-1 1-1Z" fill="currentColor" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M10 9.5v5l5-2.5-5-2.5Z" fill="currentColor" />
    </svg>
  );
}
