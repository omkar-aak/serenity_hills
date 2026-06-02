import { useMemo, useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import LeadForm from "./LeadForm";
import { chatbotQuickReplies, growthFaqs, propertyListings } from "../data/homeGrowth";
import { homeFaqs } from "../data/faqs";

const buyingIntent = ["buy", "available", "book", "visit", "price", "contact", "call", "enquire", "site visit"];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi. Ask me about Serenity Hills plots, prices, documents, location, loans, or site visits."
    }
  ]);

  const knowledge = useMemo(() => [...homeFaqs, ...growthFaqs], []);

  function send(text = input) {
    const clean = text.trim();
    if (!clean) return;
    const reply = getReply(clean, knowledge);
    setMessages((current) => [...current, { role: "user", text: clean }, reply]);
    setInput("");
  }

  return (
    <div className="ai-assistant" id="assistant">
      {open && (
        <section className="ai-panel" aria-label="Serenity Hills AI assistant">
          <header>
            <div>
              <span className="ai-avatar"><Bot size={18} /></span>
              <strong>Serenity Assistant<small>Instant plot, pricing and visit help</small></strong>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant"><X size={18} /></button>
          </header>
          <div className="ai-messages">
            {messages.map((message, index) => (
              <article className={message.role} key={`${message.role}-${index}`}>
                <p>{message.text}</p>
                {message.listings && (
                  <div className="ai-listings">
                    {message.listings.map((item) => (
                      <div key={item.title}>
                        <strong>{item.title}</strong>
                        <span>{item.size} - {item.view} - approx. Rs. {item.price} lakh onwards</span>
                      </div>
                    ))}
                  </div>
                )}
                {message.showLeadForm && <LeadForm formType="chatbot" compact />}
              </article>
            ))}
          </div>
          <div className="ai-quick">
            {chatbotQuickReplies.map((item) => <button type="button" key={item} onClick={() => send(item)}>{item}</button>)}
          </div>
          <form className="ai-input" onSubmit={(event) => { event.preventDefault(); send(); }}>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about plots, pricing, visits..." />
            <button type="submit" aria-label="Send message"><Send size={17} /></button>
          </form>
        </section>
      )}
      <button className="ai-toggle" type="button" onClick={() => setOpen((current) => !current)} aria-label="Open AI assistant">
        {open ? <X /> : <MessageCircle />}
      </button>
    </div>
  );
}

function getReply(text, knowledge) {
  const query = text.toLowerCase();
  const wantsLead = buyingIntent.some((word) => query.includes(word));
  const matchedFaq = knowledge.find((faq) => {
    const q = faq.question.toLowerCase();
    return q.includes(query) || query.split(/\s+/).some((word) => word.length > 3 && q.includes(word));
  });

  if (query.includes("sea")) {
    return {
      role: "bot",
      text: "Here are the listings that match sea-view or sea-breeze interest. Availability should be confirmed with the team.",
      listings: propertyListings.filter((item) => item.tags.some((tag) => tag.includes("sea"))),
      showLeadForm: true
    };
  }

  if (query.includes("under 50") || query.includes("50 lakh") || query.includes("below 50")) {
    return {
      role: "bot",
      text: "These options currently match a budget under Rs. 50 lakh in the demo inventory.",
      listings: propertyListings.filter((item) => item.price <= 50),
      showLeadForm: true
    };
  }

  if (matchedFaq) {
    return { role: "bot", text: matchedFaq.answer, showLeadForm: wantsLead };
  }

  if (wantsLead) {
    return {
      role: "bot",
      text: "I can help with current pricing, availability, payment plan, documents, and a guided site visit. Please share your details and the team will contact you.",
      showLeadForm: true
    };
  }

  return {
    role: "bot",
    text: "Serenity Hills offers NA plot-led ownership conversations, villa possibilities, Dapoli location guidance, documentation support, WhatsApp enquiries, and guided site visits. Ask me a specific question and I will answer instantly."
  };
}
