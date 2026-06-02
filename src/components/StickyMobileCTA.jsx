import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { getWhatsAppUrl } from "../utils/whatsapp";

export default function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-forest/10 bg-white/98 px-2.5 pb-[calc(.55rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_24px_rgba(0,0,0,.08)] backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-1.5">
        <a className="mobile-cta" href={siteConfig.phoneHref} aria-label="Call Serenity Hills">
          <Phone className="mobile-cta-icon" /> <span>Call Now</span>
        </a>
        <a className="mobile-cta" href={getWhatsAppUrl()} target="_blank" rel="noreferrer" aria-label="WhatsApp Serenity Hills">
          <MessageCircle className="mobile-cta-icon" /> <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
