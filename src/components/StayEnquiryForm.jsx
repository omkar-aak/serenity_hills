import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { stayVillas } from "../data/stayVillas";
import { siteConfig } from "../data/siteConfig";
import { trackEvent } from "../utils/analytics";

const initialStayValues = { fullName: "", mobile: "", email: "", villa: "", checkIn: "", checkOut: "", guests: "", request: "" };

export default function StayEnquiryForm() {
  const [startedAt] = useState(() => Date.now());
  const [values, setValues] = useState(initialStayValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverMessage, setServerMessage] = useState("");

  function update(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (values.fullName.trim().length < 2) nextErrors.fullName = "Please enter your full name.";
    if (!/^[0-9+\-\s()]{8,18}$/.test(values.mobile)) nextErrors.mobile = "Please enter a valid mobile number.";
    if (!values.villa) nextErrors.villa = "Please choose a villa.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setServerMessage("");
    const payload = {
      ...values,
      checkInDate: values.checkIn,
      checkOutDate: values.checkOut,
      specialRequest: values.request,
      buyerInterest: "Villa",
      preferredContactMethod: "WhatsApp",
      formType: "Stay Page Form",
      city: "",
      company_website: "",
      message: `Stay enquiry for ${values.villa}; dates: ${values.checkIn || "not set"} to ${values.checkOut || "not set"}; guests: ${values.guests || "not set"}; request: ${values.request || "none"}.`,
      submittedAt: new Date().toISOString(),
      formStartedAt: startedAt,
      formSubmitMs: Date.now() - startedAt,
      pageUrl: window.location.href,
      referrer: document.referrer,
      utm: Object.fromEntries(new URLSearchParams(window.location.search))
    };

    setStatus("submitting");
    try {
      const response = await fetch(siteConfig.leadApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await parseLeadApiResponse(response);
      if (!response.ok || !data.success) {
        throw new Error(data.message || `Lead API returned HTTP ${response.status}.`);
      }
      trackEvent("lead_submitted", { formType: "Stay Page Form", buyerInterest: "Villa" });
      setStatus("success");
      setValues(initialStayValues);
      setErrors({});
      window.setTimeout(() => setStatus("idle"), 6000);
    } catch (error) {
      setStatus("error");
      setServerMessage(getSubmissionErrorMessage(error));
    }
  }

  return (
    <form className="stay-form" onSubmit={submit} noValidate>
      <Field label="Full Name *" name="fullName" value={values.fullName} onChange={update} error={errors.fullName} />
      <div className="stay-form-row">
        <Field label="Mobile *" name="mobile" value={values.mobile} onChange={update} error={errors.mobile} />
        <Field label="Email" name="email" value={values.email} onChange={update} type="email" />
      </div>
      <label>Select Villa *<select name="villa" value={values.villa} onChange={update}><option value="">Choose your bungalow</option>{stayVillas.map((villa) => <option key={villa.name} value={villa.name}>{villa.name} - {villa.price}/night</option>)}</select>{errors.villa && <small>{errors.villa}</small>}</label>
      <div className="stay-form-row">
        <Field label="Check-in Date" name="checkIn" value={values.checkIn} onChange={update} type="date" />
        <Field label="Check-out Date" name="checkOut" value={values.checkOut} onChange={update} type="date" />
      </div>
      <label>Number of Guests<select name="guests" value={values.guests} onChange={update}><option value="">Select</option>{["1-2 guests", "3-4 guests", "5-6 guests", "7-10 guests", "10+ guests"].map((option) => <option key={option}>{option}</option>)}</select></label>
      <label>Special request<textarea name="request" value={values.request} onChange={update} rows="3" placeholder="Meals, occasion, local experiences or other requests" /></label>
      {status === "error" && <p className="stay-form-error">{serverMessage || "We could not submit your enquiry. Please contact the team on WhatsApp."}</p>}
      {status === "success" && <p className="stay-form-success" role="status">Form submitted successfully. Our team will contact you shortly.</p>}
      <button type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Submitting..." : "Request Booking"} <ArrowRight size={16} /></button>
      <p className="stay-form-consent">By submitting, you consent to be contacted about your stay enquiry. Current prices and availability require confirmation.</p>
    </form>
  );
}

function Field({ label, error, ...props }) {
  return <label>{label}<input {...props} />{error && <small>{error}</small>}</label>;
}

function getSubmissionErrorMessage(error) {
  if (error?.message === "Failed to fetch") {
    return "Could not reach the lead API. Please check the Vercel API URL and allowed origins.";
  }

  return error?.message || "We could not submit your enquiry. Please contact the team on WhatsApp.";
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
