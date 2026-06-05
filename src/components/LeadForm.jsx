import { useEffect, useRef, useState } from "react";
import { siteConfig } from "../data/siteConfig";
import { buyerInterests, contactMethods, validateLead } from "../utils/validators";
import { trackEvent } from "../utils/analytics";

const initial = {
  fullName: "",
  mobile: "",
  email: "",
  city: "",
  budget: "",
  requirement: "",
  preferredVisitDate: "",
  buyerInterest: "Site Visit",
  preferredContactMethod: "WhatsApp",
  message: "",
  company_website: ""
};

export default function LeadForm({ formType = "enquiry", compact = false }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverMessage, setServerMessage] = useState("");
  const startedAtRef = useRef(0);
  const showConversionFields = !["modal", "enquiry", "Download Brochure"].includes(formType);

  useEffect(() => {
    startedAtRef.current = window.performance?.now?.() || 0;
  }, []);

  function update(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    const nextErrors = validateLead(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("submitting");
    setServerMessage("");
    const payload = {
      ...values,
      name: values.fullName,
      phone: values.mobile,
      mobileNumber: values.mobile,
      formType,
      formName: formType,
      source: formType === "Download Brochure" ? "Download Brochure Form" : "Website Lead Form",
      submittedAt: new Date().toISOString(),
      formStartedAt: startedAtRef.current,
      formSubmitMs: Math.round((window.performance?.now?.() || 0) - startedAtRef.current),
      pageUrl: window.location.href,
      referrer: document.referrer,
      utm: Object.fromEntries(new URLSearchParams(window.location.search))
    };
    const submitUrl = siteConfig.leadApiUrl;

    try {
      if (!submitUrl) {
        trackEvent("lead_form_fallback", payload);
        downloadBrochure();
        showSuccess();
        return;
      }
      const response = await fetch(submitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await parseLeadApiResponse(response);
      if (!response.ok || !data.success) {
        throw new Error(data.message || `Lead API returned HTTP ${response.status}.`);
      }
      trackEvent("lead_submitted", { formType, buyerInterest: values.buyerInterest });
      downloadBrochure();
      showSuccess();
    } catch (error) {
      setStatus("error");
      setServerMessage(getSubmissionErrorMessage(error));
    }
  }

  function showSuccess() {
    setStatus("success");
    setValues(initial);
    setErrors({});
    window.setTimeout(() => setStatus("idle"), 6000);
  }

  return (
    <>
      <form className={`lead-form grid gap-4 ${compact ? "" : "rounded-lg bg-white p-5 shadow-soft md:p-7"}`} onSubmit={submit} noValidate>
        <input className="hidden" name="company_website" value={values.company_website} onChange={update} tabIndex="-1" autoComplete="off" />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Full Name" name="fullName" value={values.fullName} onChange={update} error={errors.fullName} required />
          <Field label="Mobile Number" name="mobile" value={values.mobile} onChange={update} error={errors.mobile} required inputMode="tel" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Email" name="email" value={values.email} onChange={update} error={errors.email} type="email" />
          <Field label="City" name="city" value={values.city} onChange={update} error={errors.city} />
        </div>
        {showConversionFields && (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Budget" name="budget" value={values.budget} onChange={update} error={errors.budget} placeholder="Example: Under 50 lakh" />
            <Field label="Preferred Visit Date" name="preferredVisitDate" value={values.preferredVisitDate} onChange={update} error={errors.preferredVisitDate} type="date" />
          </div>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          <Select label="Buyer Interest" name="buyerInterest" value={values.buyerInterest} onChange={update} options={buyerInterests} error={errors.buyerInterest} />
          <Select label="Preferred Contact Method" name="preferredContactMethod" value={values.preferredContactMethod} onChange={update} options={contactMethods} error={errors.preferredContactMethod} />
        </div>
        {showConversionFields && <Field label="Requirement" name="requirement" value={values.requirement} onChange={update} error={errors.requirement} placeholder="Plot, villa, sea-view plot, investment, site visit..." />}
        <div>
          <label className="form-label" htmlFor={`${formType}-message`}>Message</label>
          <textarea id={`${formType}-message`} name="message" rows="4" className="form-input resize-y" value={values.message} onChange={update} placeholder="Tell us what you would like to know about plots, villas, pricing, documents, or site visits." />
          {errors.message && <p className="form-error">{errors.message}</p>}
        </div>
        {serverMessage && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{serverMessage}</p>}
        <button className="btn-primary w-full" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting..." : "Request Serenity Hills Details"}
        </button>
        <p className="text-xs leading-5 text-stone-500">
          By submitting, you consent to be contacted about Serenity Hills. Information is for general project enquiry purposes and does not replace independent due diligence.
        </p>
      </form>
      {status === "success" && (
        <div className="lead-success-pop" role="status" aria-live="polite">
          <button type="button" aria-label="Close success message" onClick={() => setStatus("idle")}>x</button>
          <strong>Form submitted successfully.</strong>
          <p>Thank you. Our team will contact you shortly. You can continue browsing this page.</p>
        </div>
      )}
    </>
  );
}

function getSubmissionErrorMessage(error) {
  if (error?.message === "Failed to fetch") {
    return "Could not reach the lead API. Please check the Vercel API URL and allowed origins.";
  }

  return error?.message || "We could not submit your enquiry. Please try again or contact us on WhatsApp.";
}

async function parseLeadApiResponse(response) {
  const text = await response.text();
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return {
      success: false,
      message: `Lead API returned HTTP ${response.status} with a non-JSON response. Check Vercel API URL/path.`
    };
  }
}

function downloadBrochure() {
  const link = document.createElement("a");
  link.href = siteConfig.brochureUrl;
  link.download = "Serenity Hills Brochure.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function Field({ label, name, error, ...props }) {
  return (
    <div>
      <label className="form-label" htmlFor={name}>{label}</label>
      <input id={name} name={name} className="form-input" {...props} />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}

function Select({ label, name, options, error, ...props }) {
  return (
    <div>
      <label className="form-label" htmlFor={name}>{label}</label>
      <select id={name} name={name} className="form-input" {...props}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
