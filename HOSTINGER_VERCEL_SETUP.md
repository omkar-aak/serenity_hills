# Hostinger Frontend + Vercel Backend Setup

This setup keeps the Google Apps Script URL out of the frontend. The browser will only see the public Vercel API URL. The private Google Apps Script URLs live only in Vercel Environment Variables.

## Architecture

```text
Visitor browser
  -> Hostinger static React frontend
  -> Vercel /api/leads backend
  -> private Google Apps Script URL from Vercel env
  -> Google Sheet
```

## Files To Use

| File | Purpose |
|---|---|
| `.env.hostinger.example` | Frontend build template for Hostinger. Contains only public `VITE_` values. |
| `.env.vercel.example` | Backend env template for Vercel. Contains private Google Apps Script URLs. |
| `api/leads/index.js` | Secure lead API. Browser calls this instead of Apps Script directly. |
| `dist/` | Build output to upload into Hostinger `public_html/`. |

## Local Development

Create `.env.local`:

```env
VITE_SITE_URL=http://localhost:5173
VITE_LEAD_API_URL=/api/leads

GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_MAIN_LEAD_DEPLOYMENT_ID/exec
GOOGLE_SHEETS_STAY_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_STAY_DEPLOYMENT_ID/exec
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
MIN_FORM_SUBMIT_MS=1000
```

Run:

```bash
npm run dev
```

Restart the dev server after changing `.env.local`.

## Vercel Backend Deployment

1. Deploy this project or the `api/` folder to Vercel.
2. Go to Vercel Project Settings -> Environment Variables.
3. Add values from `.env.vercel.example`.
4. Deploy.
5. Copy the final endpoint:

```text
https://your-vercel-api-project.vercel.app/api/leads
```

## Hostinger Frontend Build

Create `.env.hostinger` from `.env.hostinger.example`.

Important:

```env
VITE_LEAD_API_URL=https://your-vercel-api-project.vercel.app/api/leads
```

Then run:

```bash
npm run build:hostinger
```

Upload the contents of `dist/` into Hostinger `public_html/`.

Do not upload:

```text
.env.local
.env.vercel.example
node_modules/
src/
api/
```

## Security Rules

- Google Apps Script URLs must not be in React source files.
- Google Apps Script URLs must not be in `VITE_` variables.
- Hostinger should only receive static files from `dist/`.
- Vercel should store private webhook URLs.
- GitHub should not contain `.env.local` or real production secrets.
- The frontend will show the Vercel API URL. That is normal. The secret Apps Script URL remains hidden.

## Production Checklist

- `npm run lint` passes.
- `npm run build` passes.
- Search `dist/` and confirm no real Apps Script deployment URL exists.
- Vercel env has `GOOGLE_SHEETS_WEBHOOK_URL`.
- Vercel env has `GOOGLE_SHEETS_STAY_WEBHOOK_URL`.
- Vercel env has production `ALLOWED_ORIGINS`.
- Hostinger has fresh `dist/` contents.
- Main form stores data in Google Sheet.
- Stay form stores data in Google Sheet.
- Brochure flow works.

## Fixing `Origin is not allowed`

This means the form is coming from a domain that is not listed in Vercel `ALLOWED_ORIGINS`.

Your production value should normally be:

```env
ALLOWED_ORIGINS=https://www.serenityhills.in,https://serenityhills.in
```

If you are testing from another domain, add that exact origin too. Examples:

```env
ALLOWED_ORIGINS=https://www.serenityhills.in,https://serenityhills.in,https://your-hostinger-temporary-domain.com,https://your-vercel-preview.vercel.app
```

Important rules:

- Use origin only: protocol + domain.
- Do not include paths like `/contact`.
- Do not include trailing slash.
- After changing Vercel Environment Variables, redeploy the Vercel API.

To find the origin, open browser DevTools -> Network -> failed `/api/leads` request -> Request Headers -> `Origin`.
