param(
  [string]$OutputPath = "Serenity-Hills-Lead-Architecture-Security-Workflow.docx"
)

$ErrorActionPreference = "Stop"

function XmlEscape([string]$Text) {
  return [System.Security.SecurityElement]::Escape($Text)
}

function P([string]$Text, [string]$Style = "BodyText") {
  $escaped = XmlEscape $Text
  return @"
<w:p>
  <w:pPr><w:pStyle w:val="$Style"/></w:pPr>
  <w:r><w:t xml:space="preserve">$escaped</w:t></w:r>
</w:p>
"@
}

function Bullet([string]$Text) {
  $escaped = XmlEscape $Text
  return @"
<w:p>
  <w:pPr><w:pStyle w:val="BodyText"/><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr>
  <w:r><w:t xml:space="preserve">$escaped</w:t></w:r>
</w:p>
"@
}

function Numbered([string]$Text) {
  $escaped = XmlEscape $Text
  return @"
<w:p>
  <w:pPr><w:pStyle w:val="BodyText"/><w:numPr><w:ilvl w:val="0"/><w:numId w:val="2"/></w:numPr></w:pPr>
  <w:r><w:t xml:space="preserve">$escaped</w:t></w:r>
</w:p>
"@
}

function Cell([string]$Text, [int]$Width, [bool]$Header = $false) {
  $escaped = XmlEscape $Text
  $fill = if ($Header) { '<w:shd w:fill="F2F4F7"/>' } else { "" }
  $boldStart = if ($Header) { "<w:b/>" } else { "" }
  return @"
<w:tc>
  <w:tcPr><w:tcW w:w="$Width" w:type="dxa"/>$fill</w:tcPr>
  <w:p>
    <w:pPr><w:spacing w:after="80" w:line="264" w:lineRule="auto"/></w:pPr>
    <w:r><w:rPr>$boldStart</w:rPr><w:t xml:space="preserve">$escaped</w:t></w:r>
  </w:p>
</w:tc>
"@
}

function Table([array]$Rows, [array]$Widths) {
  $grid = ($Widths | ForEach-Object { "<w:gridCol w:w=`"$_`"/>" }) -join ""
  $xml = @"
<w:tbl>
  <w:tblPr>
    <w:tblW w:w="9360" w:type="dxa"/>
    <w:tblInd w:w="120" w:type="dxa"/>
    <w:tblBorders>
      <w:top w:val="single" w:sz="4" w:space="0" w:color="D9E2EC"/>
      <w:left w:val="single" w:sz="4" w:space="0" w:color="D9E2EC"/>
      <w:bottom w:val="single" w:sz="4" w:space="0" w:color="D9E2EC"/>
      <w:right w:val="single" w:sz="4" w:space="0" w:color="D9E2EC"/>
      <w:insideH w:val="single" w:sz="4" w:space="0" w:color="D9E2EC"/>
      <w:insideV w:val="single" w:sz="4" w:space="0" w:color="D9E2EC"/>
    </w:tblBorders>
    <w:tblCellMar><w:top w:w="80" w:type="dxa"/><w:left w:w="120" w:type="dxa"/><w:bottom w:w="80" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tblCellMar>
  </w:tblPr>
  <w:tblGrid>$grid</w:tblGrid>
"@
  for ($i = 0; $i -lt $Rows.Count; $i++) {
    $xml += "<w:tr>"
    for ($j = 0; $j -lt $Rows[$i].Count; $j++) {
      $xml += Cell $Rows[$i][$j] $Widths[$j] ($i -eq 0)
    }
    $xml += "</w:tr>"
  }
  $xml += "</w:tbl>"
  return $xml
}

$body = ""
$body += P "Serenity Hills Lead Capture Architecture, Workflow, and Security Review" "Title"
$body += P "Prepared for local development, Hostinger frontend hosting, Vercel serverless API deployment, and Google Sheets lead storage." "Subtitle"
$body += P ("Date: " + (Get-Date -Format "yyyy-MM-dd")) "Meta"

$body += P "Executive Verdict" "Heading1"
$body += P "Your current architecture is significantly safer than exposing Google Apps Script URLs directly in React. The browser now calls only /api/leads or the deployed Vercel API URL, while the real Google Apps Script web app URLs live in server-side environment variables. This prevents casual scraping from the JavaScript bundle and keeps secrets out of Hostinger static files."
$body += P "Security rating: Good for a small business lead-capture site, provided the production Vercel environment variables are configured correctly and the Google Apps Script endpoint is not shared publicly. It is not a banking-grade or zero-trust design, but it is a practical and secure architecture for website enquiry forms."

$body += P "Current High-Level Architecture" "Heading1"
$body += Table @(
  @("Layer", "Component", "Responsibility"),
  @("Frontend", "React + Vite static site on Hostinger or local Vite", "Collects form input, validates basic fields, and submits JSON to the lead API. It must not contain Google Apps Script URLs."),
  @("API boundary", "api/leads/index.js on Vercel, and Vite local API middleware in development", "Validates payloads, checks CORS origin, applies anti-spam controls, and forwards approved leads to private destinations."),
  @("Secret storage", ".env.local locally and Vercel Environment Variables in production", "Stores GOOGLE_SHEETS_WEBHOOK_URL, GOOGLE_SHEETS_STAY_WEBHOOK_URL, and optional Odoo credentials outside the browser bundle."),
  @("Data destination", "Google Apps Script Web App -> Google Sheets", "Receives sanitized lead payloads from the server API and writes rows into the spreadsheet."),
  @("Optional CRM", "Odoo JSON-RPC", "Creates CRM leads when Odoo environment variables are present.")
) @(1800, 2800, 4760)

$body += P "Request Workflow" "Heading1"
$body += Numbered "Visitor fills a form on the website, such as the main lead form, brochure form, or Stay page form."
$body += Numbered "React validates required fields and constructs a payload with contact details, form type, source, page URL, referrer, UTM data, honeypot field, and submit timing."
$body += Numbered "The browser sends a POST request to siteConfig.leadApiUrl. Locally this is /api/leads; in production it should be the deployed Vercel API URL."
$body += Numbered "The API validates request method, origin, body size, user input, honeypot, and minimum submit time."
$body += Numbered "The API chooses the correct private webhook based on formType: Stay Page Form uses GOOGLE_SHEETS_STAY_WEBHOOK_URL; Download Brochure uses the brochure webhook or fallback; other leads use GOOGLE_SHEETS_WEBHOOK_URL."
$body += Numbered "The API forwards the lead to Google Apps Script using server-side fetch with text/plain JSON payload."
$body += Numbered "Google Apps Script writes the lead row into the configured Google Sheet."
$body += Numbered "The API returns success to the frontend, and the user sees a success message."

$body += P "Text Architecture Diagram" "Heading1"
$body += P "Browser React form -> /api/leads -> Vercel serverless function -> private env var lookup -> Google Apps Script -> Google Sheet" "Code"
$body += P "Optional path: /api/leads -> Odoo JSON-RPC -> crm.lead, only when Odoo credentials are configured." "Code"

$body += P "Environment Variables" "Heading1"
$body += Table @(
  @("Variable", "Where It Lives", "Purpose"),
  @("VITE_LEAD_API_URL", "Frontend build env", "Public API endpoint used by React. Safe to expose. For Hostinger, set to the deployed Vercel /api/leads URL."),
  @("GOOGLE_SHEETS_WEBHOOK_URL", "Server env only", "Default Apps Script webhook for normal lead forms."),
  @("GOOGLE_SHEETS_STAY_WEBHOOK_URL", "Server env only", "Apps Script webhook for Stay page booking enquiries."),
  @("GOOGLE_SHEETS_BROCHURE_WEBHOOK_URL", "Server env only", "Optional dedicated Apps Script webhook for brochure requests."),
  @("ALLOWED_ORIGINS", "Server env only", "CORS allowlist for localhost and production domains."),
  @("MIN_FORM_SUBMIT_MS", "Server env only", "Rejects very fast bot-like submissions."),
  @("ODOO_*", "Server env only", "Optional CRM integration credentials. Never expose in frontend.")
) @(2600, 2200, 4560)

$body += P "Local Development Workflow" "Heading1"
$body += Numbered "Keep .env.local in the project root. It is ignored by .gitignore and should contain private Google webhook URLs."
$body += Numbered "Run npm run dev. The Vite config mounts a local /api/leads handler for development."
$body += Numbered "Submit the form from http://localhost:5173. The frontend calls /api/leads without exposing the Apps Script URL."
$body += Numbered "Restart npm run dev whenever .env.local changes."

$body += P "Production Hosting Workflow" "Heading1"
$body += Numbered "Deploy api/leads/index.js to Vercel as the backend API."
$body += Numbered "Add server-side environment variables in Vercel: GOOGLE_SHEETS_WEBHOOK_URL, GOOGLE_SHEETS_STAY_WEBHOOK_URL, ALLOWED_ORIGINS, and optional Odoo variables."
$body += Numbered "Set VITE_LEAD_API_URL during frontend build to https://your-vercel-project.vercel.app/api/leads."
$body += Numbered "Run npm run build."
$body += Numbered "Upload the contents of dist/ to Hostinger public_html, not the dist folder itself."
$body += Numbered "Test main lead form, Stay form, brochure flow, WhatsApp fallback, and direct route reloads."

$body += P "Security Assessment" "Heading1"
$body += Table @(
  @("Control", "Current Status", "Comment"),
  @("Apps Script URL hidden from frontend", "Implemented", "Real webhook URLs are server env vars and are not present in src or dist."),
  @("Frontend only exposes API URL", "Implemented", "VITE_LEAD_API_URL is public by design and does not contain secrets."),
  @("CORS allowlist", "Implemented", "API rejects unexpected origins when ALLOWED_ORIGINS is configured properly."),
  @("Input validation", "Implemented", "Name, phone, email, city, contact method, interest, and message are checked."),
  @("Honeypot field", "Implemented", "company_website blocks simple automated spam submissions."),
  @("Submit timing check", "Implemented", "Very fast submissions are rejected using MIN_FORM_SUBMIT_MS."),
  @("Body size limit", "Implemented", "Large payloads are rejected."),
  @("Rate limiting", "Not implemented", "Recommended before ad campaigns or high traffic."),
  @("Bot challenge", "Not implemented", "Consider Turnstile or reCAPTCHA if spam increases."),
  @("Server-side logging without secrets", "Partially implemented", "Logs show configuration flags, not secret values.")
) @(2300, 1700, 5360)

$body += P "Is This Architecture Secure?" "Heading1"
$body += Bullet "Yes, it is secure enough for a public marketing website lead form when deployed correctly."
$body += Bullet "The biggest improvement is that Apps Script URLs are no longer shipped in the React bundle."
$body += Bullet "The browser cannot directly see or call the Google Sheets webhook unless the URL leaks elsewhere."
$body += Bullet "The server API creates a controlled gate with validation, CORS, honeypot, submit timing, and payload size checks."
$body += Bullet "The remaining risk is abuse of the public API endpoint itself, because any public website form endpoint can be targeted. Add rate limiting and bot protection if traffic or spam increases."

$body += P "Residual Risks and Recommendations" "Heading1"
$body += Table @(
  @("Risk", "Impact", "Recommended Fix"),
  @("Public API endpoint can still receive spam", "Medium", "Add IP-based rate limiting, Vercel KV/Upstash, or Cloudflare Turnstile."),
  @("Google Apps Script URL could leak through logs or sharing", "Medium", "Keep it only in .env.local and Vercel env vars. Rotate it if exposed."),
  @("CORS is not authentication", "Medium", "Use CORS as browser control only; pair with rate limits and optional signed server secret if needed."),
  @("Apps Script may accept any caller if URL is known", "Medium", "Add a shared secret header/body token checked by Apps Script, stored only in server env."),
  @("Spreadsheet contains personal data", "High", "Limit sheet access, protect columns, and avoid public sharing."),
  @("No consent audit trail beyond payload", "Low", "Keep timestamp, source, page URL, and consent copy version if compliance matters.")
) @(2500, 1600, 5260)

$body += P "Recommended Next Hardening Steps" "Heading1"
$body += Numbered "Add GOOGLE_SHEETS_SHARED_SECRET in Vercel and Apps Script. The API sends it; Apps Script rejects requests without it."
$body += Numbered "Add rate limiting per IP and per phone/email."
$body += Numbered "Add Cloudflare Turnstile or reCAPTCHA only if spam becomes a real problem."
$body += Numbered "Rotate the old public Apps Script deployment URLs if they were previously exposed in dist or public source."
$body += Numbered "Restrict Google Sheet sharing to required team members only."
$body += Numbered "Keep .env.local out of commits and confirm Vercel variables after every redeploy."

$body += P "Deployment Checklist" "Heading1"
$body += Bullet "Vercel API deployed and reachable at /api/leads."
$body += Bullet "Vercel env contains GOOGLE_SHEETS_WEBHOOK_URL and GOOGLE_SHEETS_STAY_WEBHOOK_URL."
$body += Bullet "Vercel env contains ALLOWED_ORIGINS=https://www.serenityhills.in,https://serenityhills.in."
$body += Bullet "Frontend build uses VITE_LEAD_API_URL=https://your-vercel-project.vercel.app/api/leads."
$body += Bullet "Hostinger public_html contains fresh dist output."
$body += Bullet "Search built assets for any real Apps Script deployment URL before upload."
$body += Bullet "Test main form, Stay form, brochure form, and failure message behavior."

$body += P "Final Recommendation" "Heading1"
$body += P "Continue with the current proxy-based architecture. It is the right pattern for keeping Google Apps Script and spreadsheet integrations private behind a server-side boundary. Before production launch, configure the same environment variables in Vercel, rotate any previously exposed Apps Script deployment URLs, and add a shared secret check inside Apps Script for stronger protection."

$documentXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
$body
    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>
"@

$stylesXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:qFormat/>
    <w:pPr><w:spacing w:after="120" w:line="264" w:lineRule="auto"/></w:pPr>
    <w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="22"/><w:color w:val="222222"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Title">
    <w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:qFormat/>
    <w:pPr><w:spacing w:before="0" w:after="160"/></w:pPr>
    <w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="40"/><w:color w:val="0B2545"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Subtitle">
    <w:name w:val="Subtitle"/><w:basedOn w:val="Normal"/><w:qFormat/>
    <w:pPr><w:spacing w:after="160"/></w:pPr>
    <w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="24"/><w:color w:val="555555"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Meta">
    <w:name w:val="Meta"/><w:basedOn w:val="Normal"/>
    <w:pPr><w:spacing w:after="240"/></w:pPr>
    <w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="20"/><w:color w:val="666666"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:qFormat/>
    <w:pPr><w:keepNext/><w:spacing w:before="320" w:after="160"/></w:pPr>
    <w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="32"/><w:color w:val="2E74B5"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="BodyText">
    <w:name w:val="Body Text"/><w:basedOn w:val="Normal"/>
    <w:pPr><w:spacing w:after="120" w:line="264" w:lineRule="auto"/></w:pPr>
    <w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="22"/><w:color w:val="222222"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Code">
    <w:name w:val="Code"/><w:basedOn w:val="Normal"/>
    <w:pPr><w:spacing w:before="80" w:after="80"/><w:ind w:left="240"/></w:pPr>
    <w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/><w:sz w:val="20"/><w:color w:val="1F4D78"/></w:rPr>
  </w:style>
</w:styles>
"@

$numberingXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:abstractNum w:abstractNumId="1">
    <w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/><w:lvlJc w:val="left"/><w:pPr><w:tabs><w:tab w:val="num" w:pos="720"/></w:tabs><w:ind w:left="720" w:hanging="360"/></w:pPr></w:lvl>
  </w:abstractNum>
  <w:num w:numId="1"><w:abstractNumId w:val="1"/></w:num>
  <w:abstractNum w:abstractNumId="2">
    <w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="decimal"/><w:lvlText w:val="%1."/><w:lvlJc w:val="left"/><w:pPr><w:tabs><w:tab w:val="num" w:pos="720"/></w:tabs><w:ind w:left="720" w:hanging="360"/></w:pPr></w:lvl>
  </w:abstractNum>
  <w:num w:numId="2"><w:abstractNumId w:val="2"/></w:num>
</w:numbering>
"@

$contentTypes = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
</Types>
"@

$rels = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>
"@

$docRels = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>
</Relationships>
"@

$tempRoot = Join-Path $env:TEMP ("serenity-docx-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path (Join-Path $tempRoot "_rels") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $tempRoot "word/_rels") -Force | Out-Null

[System.IO.File]::WriteAllText((Join-Path $tempRoot "[Content_Types].xml"), $contentTypes, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText((Join-Path $tempRoot "_rels/.rels"), $rels, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText((Join-Path $tempRoot "word/document.xml"), $documentXml, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText((Join-Path $tempRoot "word/styles.xml"), $stylesXml, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText((Join-Path $tempRoot "word/numbering.xml"), $numberingXml, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText((Join-Path $tempRoot "word/_rels/document.xml.rels"), $docRels, [System.Text.Encoding]::UTF8)

$fullOutput = if ([System.IO.Path]::IsPathRooted($OutputPath)) { $OutputPath } else { Join-Path (Get-Location) $OutputPath }
if (Test-Path $fullOutput) { Remove-Item -LiteralPath $fullOutput -Force }

Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($tempRoot, $fullOutput)
Remove-Item -LiteralPath $tempRoot -Recurse -Force

Write-Output $fullOutput
