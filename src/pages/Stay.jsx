import { useState } from "react";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import SEO from "../components/SEO";
import { siteConfig } from "../data/siteConfig";
import { breadcrumbSchema, organizationSchema } from "../utils/seo";
import { trackEvent } from "../utils/analytics";
import { getWhatsAppUrl } from "../utils/whatsapp";

const villas = [
  {
    name: "Sapphire",
    spec: "2 BHK - Duplex",
    subtitle: "The Cozy Hillside Retreat",
    price: "INR 8,000",
    guests: "Up to 4 guests",
    image: "/assets/images/Plots_img/OptiLux.jpeg",
    color: "sapphire",
    text: "Designed for couples and small families seeking a quiet hillside getaway with privacy and green views.",
    features: ["Private front garden for morning tea", "Cosy backyard setting", "Work-friendly connectivity conversation", "Konkani-inspired comfort"]
  },
  {
    name: "Girigandh",
    spec: "3 BHK - Premium",
    subtitle: "The Premium Family Escape",
    price: "INR 12,000",
    guests: "Up to 6 guests",
    image: "/assets/images/Plots_img/Girigandh.jpeg",
    color: "girigandh",
    text: "A generous family villa concept with a traditional verandah for enjoying the surrounding Dapoli hills.",
    features: ["Panoramic verandah outlook", "Front and rear outdoor areas", "Spacious family layout", "A nature-connected stay"]
  },
  {
    name: "Dilasa",
    spec: "4 BHK - Estate Villa",
    subtitle: "The Large Family Retreat",
    price: "INR 20,000",
    guests: "Up to 10+ guests",
    image: "/assets/images/Plots_img/dilasa.jpeg",
    color: "dilasa",
    text: "A larger retreat suited to family reunions or special stays where private rooms and gathering space matter.",
    features: ["Largest garden footprint", "Room for larger families", "Direct approach access", "Caretaker support conversation"]
  }
];

const inclusions = ["Private villa", "Welcome Konkani tea", "Daily breakfast", "Hilltop access", "Wi-Fi", "Water supply", "Gated setting", "Spice garden"];

const itinerary = [
  {
    title: "Arrival & Panorama",
    moments: [["10 AM", "The Warm Welcome", "Arrive, settle into your villa, and get oriented to the hill."], ["Noon", "Hilltop Tea", "Begin with Konkani tea and a first panoramic look at the surroundings."], ["Lunch", "Konkani Meal", "Enjoy a fresh local meal prepared in the coastal style."], ["Evening", "Sunset in Your Sanctuary", "Slow down in the garden as the hills turn gold."]]
  },
  {
    title: "Coastal Adventure & Heritage",
    moments: [["Early AM", "Dolphin Safari", "Plan an early coastal outing from nearby beaches, subject to local availability."], ["Morning", "Temple Trail", "Explore Dapoli's temples and leafy local paths."], ["Afternoon", "Beach Time", "Choose a relaxed beach stop or explore local markets."], ["Evening", "Return and Relax", "Unwind at the villa with a home-style dinner."]]
  },
  {
    title: "Nature Walk & Farewell",
    moments: [["Early AM", "Gentle Nature Walk", "Take a quiet walk through green surroundings."], ["Breakfast", "Final Konkan Breakfast", "Begin the final morning slowly with tea and local flavours."], ["11 AM", "Departure", "Leave with time to plan your next return to Dapoli."]]
  }
];

const menus = [
  ["Veg Thali", "Traditional vegetarian Konkani spread", "INR 250", ["Seasonal bhaji", "Bhakri or chapati", "Rice and dal", "Sol kadhi"]],
  ["Chicken Thali", "Malvani-style comfort meal", "INR 350", ["Chicken rassa", "Rice or bhakri", "Salad and sides", "Sol kadhi"]],
  ["Surmai Fish Thali", "Fresh catch, subject to availability", "INR 550", ["Surmai preparation", "Rice bhakri", "Fish curry", "Sol kadhi"]],
  ["Breakfast Plate", "Included with selected stay packages", "Included", ["Poha or upma", "Tea", "Toast", "Ghavan by request"]]
];

const experiences = [
  ["Summer - April to June", "The Mango Festival", "Visit during mango season to explore Dapoli's celebrated Alphonso culture."],
  ["Clear Nights - Oct to Feb", "Star Gazing", "Let the darker hill skies set the scene for a telescope-led evening."],
  ["Seasonal", "Konkani Food Festival", "Discover local cooking, seafood preparations, and vegetarian coastal recipes."],
  ["Monsoon", "Green Hill Walks", "Monsoon turns the surroundings intensely green for slow, guided outings."],
  ["Weekend Specials", "Cultural Evenings", "A relaxed evening concept with local flavours and sounds."],
  ["Year-round", "Coastal Morning", "Explore nearby beaches and local coastal life during your stay."]
];

const nearby = [
  ["Karde Beach", "Quiet sand and early morning coastal outings.", "15 min away"],
  ["Ladghar Beach", "A well-known beach outing near Dapoli.", "20 min away"],
  ["Anjarle Ganesh Temple", "A memorable temple stop with coastal context.", "25 min away"],
  ["Keshavraj Temple", "A leafy, peaceful destination in the region.", "20 min away"],
  ["Alphonso Orchards", "Seasonal mango-growing landscape.", "10 min away"],
  ["Dapoli Market", "Local ingredients and everyday essentials.", "10 min away"],
  ["Harnai Harbour", "A glimpse of working coastal life.", "15 min away"],
  ["Konkan Hills", "Green drives and slow scenic mornings.", "Nearby"]
];

export default function Stay() {
  return (
    <>
      <SEO
        title="Stay - Serenity Hills Dapoli | Private Villa Experience"
        description="Explore a private Serenity Hills stay concept in Dapoli with villa choices, Konkani meals, a weekend itinerary, seasonal experiences, and booking enquiries."
        image={siteConfig.assets.villa}
        canonicalPath="/stay"
        schema={[organizationSchema(), breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Stay", href: "/stay" }])]}
      />
      <main className="design-page stay-page">
        <section className="stay-hero">
          <div className="stay-watermark" aria-hidden="true">Stay</div>
          <div className="design-container stay-hero-inner">
            <p className="design-badge"><span />Private Villas - Dapoli, Konkan</p>
            <h1>The hill <em>awaits.</em><br />Come stay.</h1>
            <p className="design-hero-copy">Signature bungalow stays on a Konkan hillside: local meals, green mornings, starlit evenings, and space to breathe.</p>
            <div className="stay-pills">
              <span><Check size={13} /> 2N/3D concepts from INR 8,000/night</span>
              <span><Check size={13} /> Meals and welcome tea options</span>
              <span><Check size={13} /> Availability on enquiry</span>
            </div>
            <div className="design-actions">
              <a className="design-btn gold" href="#booking">Check Availability <ArrowRight size={16} /></a>
              <a className="design-btn ghost" href="#villas">See the Villas</a>
              <a className="design-btn ghost" href={getWhatsAppUrl()} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a>
            </div>
          </div>
        </section>

        <section className="stay-includes">
          <div className="design-container">
            <p>Every stay includes</p>
            <div>{inclusions.map((item) => <span key={item}><Check size={12} /> {item}</span>)}</div>
          </div>
        </section>

        <section className="design-section stay-villas" id="villas">
          <div className="design-container">
            <DesignHeading eyebrow="The Bungalows" title={<>Three villas. Three scales.<br />One hill.</>}>
              Whether it is a couple&apos;s escape, family holiday, or larger reunion, choose the scale that suits your stay.
            </DesignHeading>
            <div className="stay-villa-grid">
              {villas.map((villa) => (
                <article className={`stay-villa-card ${villa.color}`} key={villa.name}>
                  <div className="stay-villa-image">
                    <img src={villa.image} alt={`${villa.name} villa concept at Serenity Hills`} width="640" height="440" loading="lazy" />
                    <strong>{villa.price}<small>per night*</small></strong>
                    <span>{villa.guests}</span>
                  </div>
                  <div className="stay-villa-copy">
                    <p>{villa.spec}</p>
                    <h3>{villa.name}</h3>
                    <h4>{villa.subtitle}</h4>
                    <div>{villa.text}</div>
                    <ul>{villa.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                  </div>
                  <footer>
                    <a href="#booking">Book {villa.name} <ArrowRight size={15} /></a>
                    <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer"><MessageCircle size={15} /> Ask on WhatsApp</a>
                  </footer>
                </article>
              ))}
            </div>
            <p className="stay-rate-note">*Illustrative reference-page pricing shown; request confirmation of rates, inclusions, taxes and availability before booking.</p>
          </div>
        </section>

        <section className="design-section design-alt stay-itinerary">
          <div className="design-container">
            <DesignHeading eyebrow="2 Nights - 3 Days" title={<>A weekend that<br />resets <em>everything.</em></>}>
              Every day has a distinct rhythm: arrival, Dapoli exploration, and a quiet farewell to the hills.
            </DesignHeading>
            <div className="stay-day-grid">
              {itinerary.map((day, index) => (
                <article key={day.title}>
                  <header><strong>{index + 1}</strong><p>Day {index + 1}</p><h3>{day.title}</h3></header>
                  <div>{day.moments.map(([time, title, text]) => <section key={title}><small>{time}</small><h4>{title}</h4><p>{text}</p></section>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="design-section stay-menu">
          <div className="design-container">
            <DesignHeading eyebrow="The Kitchen" title={<>Konkani flavours,<br />cooked <em>from scratch.</em></>}>
              Fresh coastal inspiration and familiar comfort meals complement a slower stay on the hill.
            </DesignHeading>
            <div className="stay-menu-grid">
              {menus.map(([name, description, price, items]) => (
                <article key={name}><header><div><h3>{name}</h3><p>{description}</p></div><strong>{price}</strong></header><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>
              ))}
              <aside><UtensilsMark /><h3>Meals served at your villa</h3><p>Meal choices and fresh-catch availability can be confirmed while arranging your stay.</p></aside>
            </div>
          </div>
        </section>

        <section className="design-section design-alt stay-experiences">
          <div className="design-container">
            <DesignHeading eyebrow="Seasonal Celebrations" title={<>Live the Konkani vibe.<br /><em>Plan your visit right.</em></>}>
              The experience changes beautifully with Dapoli&apos;s seasons.
            </DesignHeading>
            <div className="stay-exp-grid">
              {experiences.map(([season, title, text]) => <article key={title}><small>{season}</small><h3>{title}</h3><p>{text}</p><span>Experience</span></article>)}
            </div>
          </div>
        </section>

        <section className="stay-nearby">
          <div className="design-container">
            <DesignHeading eyebrow="Beyond the Estate" title={<>Dapoli&apos;s best is<br />right outside.</>} inverse />
            <div className="stay-nearby-grid">
              {nearby.map(([name, text, distance]) => <article key={name}><h3>{name}</h3><p>{text}</p><strong>{distance}</strong></article>)}
            </div>
          </div>
        </section>

        <section className="design-section design-alt stay-booking" id="booking">
          <div className="design-container stay-booking-grid">
            <div>
              <DesignHeading eyebrow="Reserve Your Stay" title={<>Book the hill.<br />We&apos;ll handle the rest.</>}>
                Stays are by enquiry. Send your preferred dates and villa and the team can confirm current options.
              </DesignHeading>
              <div className="stay-booking-points">
                {["Confirmed through your preferred contact method", "Ask about payment and cancellation terms", "Modify dates subject to availability", `Call directly: ${siteConfig.phoneDisplay}`].map((item) => <p key={item}><Check size={15} />{item}</p>)}
              </div>
            </div>
            <StayEnquiryForm />
          </div>
        </section>
      </main>
    </>
  );
}

function DesignHeading({ eyebrow, title, children, inverse = false }) {
  return <div className={`design-heading ${inverse ? "inverse" : ""}`}><p className="design-eyebrow">{eyebrow}</p><h2>{title}</h2>{children && <p className="design-lede">{children}</p>}</div>;
}

function UtensilsMark() {
  return <span className="stay-utensils" aria-hidden="true">Kitchen</span>;
}

function StayEnquiryForm() {
  const [startedAt] = useState(() => Date.now());
  const initialStayValues = { fullName: "", mobile: "", email: "", villa: "", checkIn: "", checkOut: "", guests: "", request: "" };
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
      <label>Select Villa *<select name="villa" value={values.villa} onChange={update}><option value="">Choose your bungalow</option>{villas.map((villa) => <option key={villa.name} value={villa.name}>{villa.name} - {villa.price}/night</option>)}</select>{errors.villa && <small>{errors.villa}</small>}</label>
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
