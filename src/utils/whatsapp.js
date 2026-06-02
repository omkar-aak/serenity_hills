import { siteConfig } from "../data/siteConfig";

export function getWhatsAppUrl(message = siteConfig.defaultWhatsappMessage) {
  return `https://wa.me/${siteConfig.whatsappPhone}?text=${encodeURIComponent(message)}`;
}

export function getEventsWhatsAppUrl() {
  return getWhatsAppUrl("Hi, I am interested in Serenity Hills Dapoli events and would like more details.");
}
