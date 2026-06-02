import { useEffect } from "react";
import { X } from "lucide-react";
import LeadForm from "./LeadForm";

export default function LeadModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="lead-modal-overlay" role="dialog" aria-modal="true" aria-label="Serenity Hills enquiry form">
      <div className="lead-modal-panel">
        <div className="lead-modal-head mb-5 flex items-start justify-between gap-3 border-b border-forest/10 pb-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-clay sm:text-sm">Enquiry</p>
            <h2 className="mt-1 font-serif text-3xl leading-tight text-forest sm:text-4xl">Request project details</h2>
          </div>
          <button className="grid size-10 shrink-0 place-items-center rounded-full text-stone-600 hover:bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest" type="button" onClick={onClose} aria-label="Close enquiry form">
            <X />
          </button>
        </div>
        <LeadForm formType="Download Brochure" compact />
      </div>
    </div>
  );
}
