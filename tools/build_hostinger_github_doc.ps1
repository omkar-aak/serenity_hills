param(
  [string]$OutputPath = "Serenity-Hills-Hostinger-GitHub-Deployment-Guide.docx"
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
$body += P "Hostinger + GitHub Deployment Guide for Serenity Hills" "Title"
$body += P "Secure frontend hosting with GitHub source control, Hostinger static deployment, Vercel lead API, and private Google Sheets webhooks." "Subtitle"
$body += P ("Date: " + (Get-Date -Format "yyyy-MM-dd")) "Meta"

$body += P "Recommended Architecture" "Heading1"
$body += P "Use GitHub for source control, Hostinger for the built React static website, and Vercel for the secure /api/leads backend. Google Apps Script URLs must stay in Vercel environment variables, not in Hostinger files and not in React source."
$body += P "GitHub -> build React app -> Hostinger public_html -> browser calls Vercel /api/leads -> Vercel reads private env vars -> Google Apps Script -> Google Sheet" "Code"

$body += P "What Each Platform Does" "Heading1"
$body += Table @(
  @("Platform", "Role", "What to Store There"),
  @("GitHub", "Source control", "React source, api/leads code, README, package files, public assets. Do not commit .env.local."),
  @("Hostinger", "Frontend hosting", "Only the contents of dist/ after npm run build."),
  @("Vercel", "Backend/API hosting", "api/leads/index.js and private environment variables."),
  @("Google Apps Script", "Spreadsheet writer", "Server-side script that receives lead data and writes it into Google Sheets."),
  @("Google Sheets", "Lead database", "Main enquiries, Stay form enquiries, brochure enquiries, and timestamps.")
) @(1900, 2200, 5260)

$body += P "Why Vercel Is Still Needed" "Heading1"
$body += Bullet "Hostinger static hosting cannot safely hide Google Apps Script URLs by itself."
$body += Bullet "React code runs in the browser, so anything placed in VITE_ variables or source code is public."
$body += Bullet "Vercel provides the server-side layer where private environment variables can live."
$body += Bullet "The browser should only know the public Vercel API URL, not the private Google Apps Script URLs."

$body += P "GitHub Setup" "Heading1"
$body += Numbered "Create a private or public GitHub repository for the project."
$body += Numbered "Commit the source code, package.json, package-lock.json, public folder, src folder, api folder, and documentation."
$body += Numbered "Confirm .gitignore includes .env, .env.local, .env.production, node_modules, dist, and .vercel."
$body += Numbered "Never commit real Apps Script URLs, Odoo keys, or any private credentials."
$body += Numbered "Use branches or pull requests before major production changes."

$body += P "Local Development Workflow" "Heading1"
$body += Numbered "Create .env.local in the project root."
$body += Numbered "Set VITE_LEAD_API_URL=/api/leads for local development."
$body += Numbered "Set GOOGLE_SHEETS_WEBHOOK_URL and GOOGLE_SHEETS_STAY_WEBHOOK_URL in .env.local."
$body += Numbered "Run npm run dev."
$body += Numbered "Open http://localhost:5173 and test all forms."
$body += Numbered "Restart npm run dev after changing .env.local."

$body += P "Production Environment Variables" "Heading1"
$body += Table @(
  @("Variable", "Where", "Value / Purpose"),
  @("VITE_LEAD_API_URL", "Frontend build env", "Public Vercel API endpoint, for example https://your-vercel-project.vercel.app/api/leads."),
  @("GOOGLE_SHEETS_WEBHOOK_URL", "Vercel only", "Private Apps Script URL for normal lead forms."),
  @("GOOGLE_SHEETS_STAY_WEBHOOK_URL", "Vercel only", "Private Apps Script URL for Stay form."),
  @("GOOGLE_SHEETS_BROCHURE_WEBHOOK_URL", "Vercel only", "Optional private Apps Script URL for brochure form."),
  @("ALLOWED_ORIGINS", "Vercel only", "https://www.serenityhills.in,https://serenityhills.in"),
  @("MIN_FORM_SUBMIT_MS", "Vercel only", "2500 recommended for production."),
  @("ODOO_*", "Vercel only", "Optional CRM variables. Do not expose these in frontend.")
) @(2600, 1900, 4860)

$body += P "Vercel API Deployment" "Heading1"
$body += Numbered "Import the GitHub repository into Vercel or deploy a small Vercel project containing the api folder."
$body += Numbered "In Vercel Project Settings, add server-side environment variables for Google Sheets and allowed origins."
$body += Numbered "Deploy the Vercel project."
$body += Numbered "Copy the deployed endpoint ending with /api/leads."
$body += Numbered "Use this endpoint as VITE_LEAD_API_URL when building the frontend."
$body += Numbered "Test POST submission from the production domain after Hostinger upload."

$body += P "Hostinger Frontend Deployment" "Heading1"
$body += Numbered "Set VITE_LEAD_API_URL to the deployed Vercel /api/leads URL before building."
$body += Numbered "Run npm run build."
$body += Numbered "Open the dist folder."
$body += Numbered "Upload the contents of dist into Hostinger public_html. Do not upload the dist folder itself."
$body += Numbered "Make sure index.html, assets, robots.txt, sitemap.xml, llms.txt, and .htaccess are at the site root."
$body += Numbered "Clear Hostinger cache or browser cache if old JavaScript is still loading."

$body += P "Form Submission Workflow in Production" "Heading1"
$body += Numbered "Visitor submits a form on serenityhills.in."
$body += Numbered "React sends data to the Vercel /api/leads endpoint from VITE_LEAD_API_URL."
$body += Numbered "Vercel validates origin, payload size, phone/email, honeypot field, and submit timing."
$body += Numbered "Vercel selects the correct webhook based on formType."
$body += Numbered "Vercel forwards the lead to Google Apps Script using private server-side environment variables."
$body += Numbered "Google Apps Script stores the row in Google Sheets."
$body += Numbered "The frontend shows a success message to the visitor."

$body += P "Security Rules" "Heading1"
$body += Bullet "Do not put Google Apps Script URLs in React files."
$body += Bullet "Do not put Google Apps Script URLs in VITE_ variables."
$body += Bullet "Do not upload .env.local to GitHub or Hostinger."
$body += Bullet "Only Vercel should know GOOGLE_SHEETS_WEBHOOK_URL and GOOGLE_SHEETS_STAY_WEBHOOK_URL."
$body += Bullet "Keep ALLOWED_ORIGINS limited to localhost during development and serenityhills.in domains in production."
$body += Bullet "Rotate Apps Script deployment URLs if they were ever exposed publicly."

$body += P "Pre-Launch Checklist" "Heading1"
$body += Bullet "npm run lint passes."
$body += Bullet "npm run build passes."
$body += Bullet "No real Apps Script URL appears in src, api, dist, README, or committed files."
$body += Bullet "Vercel environment variables are configured."
$body += Bullet "Hostinger public_html contains fresh dist contents."
$body += Bullet "Main form submits to the correct Google Sheet."
$body += Bullet "Stay form submits to the Stay Google Sheet."
$body += Bullet "Brochure form downloads brochure only after successful submission, if that flow is required."
$body += Bullet "Direct routes refresh correctly on Hostinger because .htaccess is uploaded."

$body += P "Recommended Future Improvements" "Heading1"
$body += Numbered "Add a shared secret between Vercel and Apps Script so Apps Script rejects unknown callers."
$body += Numbered "Add IP-based rate limiting before running paid ad campaigns."
$body += Numbered "Add Cloudflare Turnstile or reCAPTCHA if spam increases."
$body += Numbered "Restrict Google Sheet access to required team members only."
$body += Numbered "Use GitHub Actions for automated build checks before uploading to Hostinger."

$body += P "Final Recommendation" "Heading1"
$body += P "Yes, Hostinger plus GitHub is a good setup for this website, but keep Vercel as the secure backend layer for forms. Hostinger should serve only static frontend files. GitHub should store code, not secrets. Vercel should store private environment variables and forward clean lead data to Google Sheets."

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
    <w:name w:val="Normal"/><w:qFormat/>
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

$tempRoot = Join-Path $env:TEMP ("serenity-hostinger-docx-" + [guid]::NewGuid().ToString("N"))
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
