import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "../utils/whatsapp";

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Serenity Hills on WhatsApp"
      className="fixed bottom-6 right-4 z-40 hidden size-14 place-items-center rounded-full bg-[#1f8f4d] text-white shadow-xl transition hover:scale-105 md:grid"
    >
      <MessageCircle aria-hidden="true" />
    </a>
  );
}
