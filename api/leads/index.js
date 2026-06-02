const DEFAULT_ALLOWED_ORIGINS = "https://www.serenityhills.in,https://serenityhills.in,http://localhost:5173,http://127.0.0.1:5173";
const MAX_BODY_BYTES = 20_000;
const allowedInterests = new Set(["Plot", "Villa", "Site Visit", "Investment", "Brochure"]);
const allowedContactMethods = new Set(["WhatsApp", "Call", "Email"]);

export default async function handler(req, res) {
  const origin = normalizeOrigin(req.headers.origin || "");
  const allowedOrigins = parseAllowedOrigins();
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  let requestBody = {};

  res.setHeader("Access-Control-Allow-Origin", corsOrigin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      service: "serenity-hills-lead-api",
      configured: Boolean(getSheetsWebhookUrl({ formType: "enquiry" })),
      receivedOrigin: origin || null,
      allowedOrigins
    });
  }
  if (req.method !== "POST") return res.status(405).json({ success: false, message: "Method not allowed." });
  if (origin && !allowedOrigins.includes(origin)) {
    return res.status(403).json({
      success: false,
      message: "Origin is not allowed.",
      receivedOrigin: origin,
      allowedOrigins
    });
  }

  try {
    const rawLength = Number(req.headers["content-length"] || 0);
    if (rawLength > MAX_BODY_BYTES) {
      return res.status(413).json({ success: false, message: "Request payload is too large." });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    requestBody = body;
    const validation = validatePayload(body);
    if (!validation.valid) return res.status(400).json({ success: false, message: validation.message });

    if (body.company_website) {
      return res.status(200).json({ success: true, message: "Thank you." });
    }

    const minSubmitMs = Number(process.env.MIN_FORM_SUBMIT_MS || 2500);
    if (Number(body.formSubmitMs || 0) < minSubmitMs) {
      return res.status(400).json({ success: false, message: "Please try submitting the form again." });
    }

    const hasSheetsWebhook = Boolean(getSheetsWebhookUrl(body));
    const hasOdoo = hasOdooConfig();

    if (!hasSheetsWebhook && !hasOdoo) {
      const message = process.env.NODE_ENV === "production"
        ? "Lead API is not configured."
        : "Lead API is missing a Google Sheets webhook URL in .env.local.";
      return res.status(500).json({ success: false, message });
    }

    if (hasSheetsWebhook) {
      await forwardSpreadsheetLead(body);
    }

    if (hasOdoo && body.formType !== "Download Brochure") {
      const lead = buildOdooLead(body);
      await createOdooLead(lead);
    }

    return res.status(200).json({ success: true, message: "Your enquiry has been submitted." });
  } catch (error) {
    console.error("Lead API failure", {
      message: error.message,
      code: error.code,
      hasSheetsWebhook: Boolean(getSheetsWebhookUrl(requestBody)),
      hasOdooUrl: Boolean(process.env.ODOO_URL),
      hasDb: Boolean(process.env.ODOO_DB)
    });
    return res.status(502).json({
      success: false,
      message: "We could not submit your enquiry. Please try again or contact us on WhatsApp."
    });
  }
}

function parseAllowedOrigins() {
  return (process.env.ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGINS)
    .split(",")
    .map((item) => normalizeOrigin(item))
    .filter(Boolean);
}

function normalizeOrigin(value = "") {
  const trimmed = String(value).trim().replace(/\/+$/, "");
  if (!trimmed) return "";

  try {
    return new URL(trimmed).origin;
  } catch {
    return trimmed;
  }
}

function validatePayload(body) {
  const fullName = sanitize(body.fullName);
  const mobile = sanitize(body.mobile);
  const email = sanitize(body.email);
  const city = sanitize(body.city);
  const message = sanitize(body.message);

  if (!fullName || fullName.length < 2 || fullName.length > 100) return { valid: false, message: "Please enter a valid full name." };
  if (!/^[0-9+\-\s()]{8,18}$/.test(mobile)) return { valid: false, message: "Please enter a valid mobile number." };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { valid: false, message: "Please enter a valid email address." };
  if (city.length > 80) return { valid: false, message: "City name is too long." };
  if (!allowedInterests.has(body.buyerInterest)) return { valid: false, message: "Please select a valid buyer interest." };
  if (!allowedContactMethods.has(body.preferredContactMethod)) return { valid: false, message: "Please select a valid contact method." };
  if (message.length > 1000) return { valid: false, message: "Message is too long." };
  if (containsSuspiciousText([fullName, mobile, email, city, message].join(" "))) return { valid: false, message: "Please remove links or suspicious content." };
  return { valid: true };
}

function sanitize(value = "") {
  return String(value).replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 1200);
}

function containsSuspiciousText(text) {
  return /(https?:\/\/|<script|viagra|casino|crypto giveaway|loan approval)/i.test(text);
}

function getSheetsWebhookUrl(body = {}) {
  if (body.formType === "Stay Page Form") {
    return process.env.GOOGLE_SHEETS_STAY_WEBHOOK_URL || process.env.STAY_LEAD_API_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL || "";
  }

  if (body.formType === "Download Brochure") {
    return process.env.GOOGLE_SHEETS_BROCHURE_WEBHOOK_URL || process.env.BROCHURE_LEAD_API_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL || "";
  }

  return process.env.GOOGLE_SHEETS_WEBHOOK_URL || "";
}

async function forwardSpreadsheetLead(body) {
  const webhookUrl = getSheetsWebhookUrl(body);
  if (!webhookUrl) throw new Error("Google Sheets webhook URL is not configured.");

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error("Google Sheets lead submission failed.");
  }
}

function hasOdooConfig() {
  const { ODOO_URL, ODOO_DB, ODOO_USERNAME, ODOO_API_KEY } = process.env;
  return Boolean(ODOO_URL && ODOO_DB && ODOO_USERNAME && ODOO_API_KEY);
}

function buildOdooLead(body) {
  const fullName = sanitize(body.fullName);
  const buyerInterest = sanitize(body.buyerInterest);
  const utm = body.utm || {};
  const description = [
    "Source: Website",
    `Medium: ${sanitize(utm.utm_medium) || "Organic / Website"}`,
    `Campaign: ${sanitize(utm.utm_campaign) || "Not provided"}`,
    `Buyer Interest: ${buyerInterest}`,
    `Preferred Contact Method: ${sanitize(body.preferredContactMethod)}`,
    `City: ${sanitize(body.city)}`,
    `Message: ${sanitize(body.message) || "Not provided"}`,
    `Page URL: ${sanitize(body.pageUrl)}`,
    `Referrer: ${sanitize(body.referrer) || "Direct / unavailable"}`,
    `UTM Source: ${sanitize(utm.utm_source)}`,
    `Form Type: ${sanitize(body.formType)}`,
    `Submitted At: ${sanitize(body.submittedAt) || new Date().toISOString()}`
  ].join("\n");

  const lead = {
    name: `Serenity Hills Website Lead - ${buyerInterest} - ${fullName}`,
    contact_name: fullName,
    phone: sanitize(body.mobile),
    email_from: sanitize(body.email),
    city: sanitize(body.city),
    description
  };

  if (process.env.ODOO_CRM_TEAM_ID) lead.team_id = Number(process.env.ODOO_CRM_TEAM_ID);
  if (process.env.ODOO_SALESPERSON_ID) lead.user_id = Number(process.env.ODOO_SALESPERSON_ID);
  return lead;
}

async function createOdooLead(lead) {
  const { ODOO_URL, ODOO_DB, ODOO_USERNAME, ODOO_API_KEY } = process.env;
  if (!ODOO_URL || !ODOO_DB || !ODOO_USERNAME || !ODOO_API_KEY) {
    throw new Error("Odoo environment variables are not configured.");
  }

  const uid = await jsonRpc(ODOO_URL, {
    service: "common",
    method: "login",
    args: [ODOO_DB, ODOO_USERNAME, ODOO_API_KEY]
  });

  if (!uid) throw new Error("Odoo login failed.");

  return jsonRpc(ODOO_URL, {
    service: "object",
    method: "execute_kw",
    args: [ODOO_DB, uid, ODOO_API_KEY, "crm.lead", "create", [lead]]
  });
}

async function jsonRpc(baseUrl, params) {
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/jsonrpc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", method: "call", params, id: Date.now() })
  });
  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.error?.message || "Odoo JSON-RPC request failed.");
  }
  return data.result;
}
