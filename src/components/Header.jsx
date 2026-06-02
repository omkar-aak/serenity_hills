import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { getWhatsAppUrl } from "../utils/whatsapp";

const links = [
  { label: "Vision", href: "/vision" },
  { label: "Plots", href: "/plots" },
  { label: "Villas", href: "/villas" },
  { label: "Stay", href: "/stay" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" }
];

export default function Header({ onEnquire }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  function isActive(item) {
    if (item.label === "Blog") return pathname.startsWith("/blog");
    return pathname === item.href;
  }

  return (
    <header className="site-header-ref">
      <nav className="site-header-inner home-container" aria-label="Main navigation">
        <Link to="/" className="site-brand" aria-label="Serenity Hills home">
          <img src={siteConfig.assets.logo} alt="Serenity Hills logo" width="72" height="72" />
        </Link>
        <div className="site-nav">
          {links.map((item) => (
            <Link className={isActive(item) ? "active" : ""} aria-current={isActive(item) ? "page" : undefined} key={item.href} to={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="site-header-actions">
          <a className="site-icon site-call" href={siteConfig.phoneHref} aria-label="Call Serenity Hills"><Phone size={17} /></a>
          <a className="site-icon" href={getWhatsAppUrl()} target="_blank" rel="noreferrer" aria-label="WhatsApp Serenity Hills"><MessageCircle size={17} /></a>
          <button className="home-btn home-btn-gold site-brochure" type="button" onClick={onEnquire}>Download Brochure</button>
          <button className="site-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="site-mobile-nav">
          <div className="home-container">
            {links.map((item) => (
              <Link className={isActive(item) ? "active" : ""} aria-current={isActive(item) ? "page" : undefined} key={item.href} to={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <button className="home-btn home-btn-gold" type="button" onClick={() => { setOpen(false); onEnquire(); }}>Download Brochure</button>
          </div>
        </div>
      )}
    </header>
  );
}
