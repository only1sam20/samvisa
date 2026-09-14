# Samuel Adeyemo — professional portfolio

A public consultant website for professional profile development, extraordinary-ability evidence strategy, professional Fellowship support, and ethical scholarly visibility. Visitors can explore services, read insights, request a consultation, and submit a testimonial without creating an account.

The site uses a navy, warm white, and restrained gold visual identity, responsive layouts, accessible navigation and forms, and subtle motion that respects reduced-motion preferences. Personal information and editorial content are centralized for straightforward maintenance.

Implementation coverage, verification results, and remaining launch inputs are tracked in [Project status](docs/PROJECT_STATUS.md).

## Technology

- Next.js App Router, React, and TypeScript.
- Tailwind CSS with custom design tokens and component styles.
- Framer Motion for subtle animation and Lucide React for icons.
- Zod for shared client and server form validation.
- Resend email delivery through server-side native `fetch`; no email SDK or database is required.
- Node's test runner with `tsx` for API tests; Playwright for browser checks.
- Vercel as the deployment target.

Dependency versions are declared in `package.json`; `npm install` records the resolved versions in `package-lock.json`. Commit the generated lockfile and use it for reproducible installs. Framework setup references: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation) and [Tailwind CSS with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs).

## Run locally

Use Node.js 24 LTS or Node.js 22 with npm. Open PowerShell in the project directory:

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open [localhost:3000](http://localhost:3000). Copy the example environment file only when creating your local configuration; do not overwrite an existing `.env.local` containing your settings.

To preview the production build, stop the development server with `Ctrl+C`, then run:

```powershell
npm run build
npm run start
```

Keep `.env.local` private. It is excluded from Git. The website renders without email credentials, but form submissions return an honest configuration error until delivery is configured.

## Environment configuration

Edit `.env.local` for local development. Set the same variables in Vercel project settings for deployment.

| Variable | Purpose | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Absolute site origin used in canonical URLs, metadata, sitemap, and structured data. Use `http://localhost:3000` locally and your real HTTPS domain in production. | Set for each environment |
| `RESEND_API_KEY` | Server-only Resend API key used to deliver both forms. | For form delivery |
| `CONTACT_EMAIL` | Plain email address of the inbox that receives consultation requests and reviews. | For form delivery |
| `RESEND_FROM_EMAIL` | Plain sender email address on a domain verified in Resend. | For form delivery |
| `NEXT_PUBLIC_SUPABASE_URL` | Reserved for a future optional moderation integration. Unused in this version. | No |
| `SUPABASE_SERVICE_ROLE_KEY` | Reserved server-only key for a future optional integration. Unused in this version. | No |

`RESEND_FROM_EMAIL` must use a plain address such as `website@your-domain.com`; the current configuration validator does not accept display-name syntax such as `Samuel <website@your-domain.com>`. `CONTACT_EMAIL` is also a plain address. Do not prefix private keys with `NEXT_PUBLIC_`.

Restart the development server after changing environment variables. Rebuild and redeploy after changing production configuration, especially `NEXT_PUBLIC_SITE_URL`, because public settings and generated metadata can be included at build time.

## Set up email delivery with Resend

1. Create a Resend account and verify a domain you control, following the DNS instructions shown in its dashboard.
2. Create an API key with permission to send from that domain.
3. Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `CONTACT_EMAIL` in `.env.local` or Vercel environment settings.
4. Restart locally or redeploy on Vercel.
5. Submit a consultation request and a review using information you are comfortable sending, then confirm both emails arrive in the owner inbox.

The server sends to the configured owner address, never to an arbitrary recipient supplied by a visitor. Contact submissions include a reply-to address. The email integration uses the [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email).

The forms only show success after Resend accepts the message and returns its identifier. Provider acceptance is not a guarantee of inbox delivery; use Resend's delivery logs when troubleshooting actual delivery. The application does not keep a separate database copy of submissions in this version.

## Edit personal information and contact links

Update `lib/siteConfig.ts`:

| Setting | Replace with |
| --- | --- |
| `name`, `title`, `nationality`, `location`, `experience` | Verified personal details. The supplied defaults identify Samuel Adeyemo, Nigeria, and 10+ years of experience. |
| `email: "YOUR_EMAIL"` | Public contact email shown on the website. This may differ from the private `CONTACT_EMAIL` destination. |
| `linkedin: "YOUR_LINKEDIN_URL"` | Your complete HTTPS LinkedIn profile URL. |
| `whatsapp: "YOUR_WHATSAPP_NUMBER"` | International phone number including country code, for example in `+234…` format. |
| `url` fallback | Your owned domain if changing the default fallback. Prefer setting `NEXT_PUBLIC_SITE_URL` explicitly. |
| `description` | Accurate search and social description of your services. |

LinkedIn links appear only when a valid HTTPS LinkedIn URL is configured. WhatsApp links and the floating contact button appear only when a usable number is configured. Unconfigured contact methods do not lead visitors to placeholder addresses.

Use only information you want to publish. Do not put private identity documents, API keys, or client correspondence in public assets or content files.

## Add a profile photograph and CV

Add your actual professional photo at:

```text
public/images/samuel-profile.jpg
```

Use a clear portrait with enough room around your head and shoulders for responsive cropping. The site uses Next.js image optimization. Until the file exists, an intentional `SA` initials treatment is shown.

Add your final public CV at:

```text
public/documents/samuel-adeyemo-cv.pdf
```

The CV download appears only when the file exists; otherwise the site displays a coming-soon state. Review the PDF for private information before adding it.

Asset availability is detected from the filesystem during rendering/build. **Rebuild and redeploy after adding, replacing, or removing either file.** Keep the exact lowercase filenames above, particularly for deployment to a case-sensitive filesystem.

## Maintain website content

| File | Content |
| --- | --- |
| `lib/data/services.ts` | Twelve services, descriptions, features, category filters, and icon names. |
| `lib/data/content.ts` | Audience groups, process steps, experience timeline, expertise tags, FAQs, and case-study data. |
| `lib/data/insights.ts` | Article titles, excerpts, categories, reading times, art variants, and section content. |
| `lib/data/testimonials.ts` | Publicly approved testimonials and clearly marked editorial placeholders. |
| `lib/siteConfig.ts` | Shared owner identity, contact information, domain, and site description. |
| `app/globals.css` | Design tokens, typography, layout, component styling, and responsive behavior. |

### Services

Add an object to `services` with a unique URL-safe `slug`, `title`, `shortDescription`, `description`, `icon`, `features`, and a category of `extraordinary`, `fellowship`, `research`, or `profile`. The slug controls the service detail URL. Use a supported Lucide icon name and update the site's icon mapping if introducing a new icon. Keep claims grounded in services actually offered.

Consultation and review dropdown options are maintained separately as `serviceOptions` in `lib/validation.ts`. Update that list if visitors should be able to select a new service in a form.

### Experience and professional history

Replace every `Dates to be added` value and its instruction text in `lib/data/content.ts` with verified dates and descriptions. Current entries are clearly labeled practice-area placeholders; they are not a fabricated employment history. Add employers, degrees, awards, and credentials only when Samuel supplies them.

### Insights

Add articles to `articles` in `lib/data/insights.ts`. Each article has a unique `slug`, `title`, `category`, `excerpt`, `readTime`, an `art` variant, and a `sections` array of `{ heading, body }` objects. Available art variants are `blueprint`, `fellowship`, `research`, `citation`, and `review`.

The five supplied articles are visibly marked editorial drafts. After reviewing and approving a real article, replace the sample content, remove its editorial-draft section, and set `isPlaceholder: false`. Leave `isPlaceholder: true` on unreviewed samples. Check links and any factual or legal claims before publication. Article detail pages are generated from the data.

### Case studies

The three case studies are sample structures, not real client outcomes. Replace their objective, areas, and outcome only with documented work you are permitted to publish; then set `isPlaceholder: false`. Keep descriptions anonymized according to the client's permission. Do not add visa approvals, Fellowship awards, citation totals, or other outcomes that have not been verified.

## Testimonial submission and moderation

Testimonials and the Share Your Experience form are on the homepage at `/#testimonials`; there is no separate `/testimonials` page. The form sends a private email to `CONTACT_EMAIL` through `/api/reviews`. Submissions are explicitly marked `approved: false` and **never appear automatically**. No public admin dashboard, user registration, or public review-reading API is included.

To publish a testimonial manually:

1. Review the submission for authenticity, consent, relevance, and identifying details.
2. Confirm the reviewer agreed to publication with their selected privacy preference. Resolve any material editing with the reviewer.
3. Add only the consented public text and identity to `approvedTestimonials` in `lib/data/testimonials.ts`.
4. Set `approved: true` after moderation. The public rendering filters for strict `approved === true`.
5. Rebuild and redeploy, then inspect the published result.

An entry has `id`, `name`, `title`, `quote`, `service`, `privacyPreference`, and `approved`. The public file is a publication surface: never copy the full submission email, private contact information, or company details into it.

| Submitted preference | Public data preference | Publication handling |
| --- | --- | --- |
| `full-name` | `full` | Store only the full name and professional title the reviewer permits you to display. |
| `first-name` | `first` | Store only the agreed first name. Confirm that any title and testimonial wording do not reveal more identity than the reviewer permits. |
| `anonymous` | `anonymous` | Store `Anonymous client` as the name and an empty title. Omit company and other identifying details, including those inside the quote. |

The initial approved list is empty. Visitors see “Client testimonials will be added with permission.” Placeholder cards are labeled and contain editorial instructions rather than invented client praise. Remove or replace those placeholders as genuine approved reviews become available.

### Optional future Supabase integration

Supabase is not installed or connected. Both placeholder variables can remain blank without affecting the site. Setting them alone does not enable persistence or moderation.

The optional [moderation schema](docs/supabase-moderation.sql) provides a starting table with `approved = false`, a consent field, validation constraints, and row-level security. It grants no access to anonymous or ordinary authenticated API clients and creates no public policies. It is documentation for a future integration; the application does not execute it.

To implement persistence later:

1. Create a Supabase project and review/run the SQL in its owner-controlled SQL editor.
2. Set the project URL and service-role key in server environment variables. Never expose the service-role key in a Client Component, browser bundle, or a `NEXT_PUBLIC_` variable.
3. Add a server-only insert after validation in `app/api/reviews/route.ts`. Set `approved: false` on the server and preserve consent and the selected privacy preference. The current strict schema rejects visitor-supplied `approved` values.
4. Moderate in Supabase's authenticated owner dashboard. Keep anonymous and ordinary authenticated clients unable to read or modify the raw submissions table.
5. If replacing the manual content file, implement a server-side loader that selects only `approved = true` and `consent = true`, then returns a minimal, privacy-respecting projection. Use reviewed publication text and redact identifying details before approval. Never serialize the original private name, company, or unapproved rows to the browser.
6. Add integration tests for unapproved-row exclusion, consent, all three privacy preferences, and authorization before enabling it in production. Retain a graceful empty state when configuration is absent.

A database view alone does not make private submissions safe: review its grants, row-level security behavior, and selected columns before exposing it. No public management page is needed for this portfolio.

## Form behavior and security

Both API routes validate JSON on the server using Zod, enforce length and field constraints, reject unexpected fields, use a honeypot, check browser origins, and limit request bodies to 24 KiB. Submissions require consent. WhatsApp contact preference requires a phone number; LinkedIn preference requires an HTTPS LinkedIn profile URL.

The in-memory limiter allows up to five attempts per form per visitor IP in a 15-minute window on Vercel. Outside Vercel it uses a shared local key until a trusted reverse proxy is explicitly configured. This is best-effort protection within one process: serverless instances do not share it and restarts reset it. Add Vercel WAF rules or a persistent atomic limiter, such as Redis, when scaling or if abuse requires stronger protection. Raw IP addresses are not stored in the limiter map; it uses hashed keys.

| Response | Meaning |
| --- | --- |
| `200` | The email provider accepted the message. Review submissions still await moderation. |
| `400` | Malformed, empty, or rejected submission, including the honeypot. |
| `403` | Browser origin check failed. |
| `413` | Request body exceeded the size limit. |
| `415` | Request was not sent as JSON. |
| `422` | Field validation failed; the response includes field errors. |
| `429` | Rate limit or limiter capacity reached; response includes `Retry-After`. |
| `503` | Email delivery is not configured correctly, or the provider request timed out or could not connect. |
| `502` | The email provider rejected or could not accept delivery. |
| `500` | An unexpected server error occurred. |

Missing API credentials do not crash the website and do not produce fake success messages. Development errors identify missing configuration variable names; production errors omit infrastructure details. Form values remain available after a failed submission so visitors can retry. The application does not log submission contents or credentials.

## Privacy and professional boundaries

The `/privacy` page describes consultation information, review moderation, email processing, retention, third-party infrastructure, and contact options. No analytics scripts or tracking cookies are added by the application. If you enable analytics, a cookie-based tool, or a database, update the policy to match the actual implementation and your retention practices.

The `/disclaimer` page explains that Samuel provides professional profile development and related consulting, not immigration legal advice or legal representation. No immigration decision, Fellowship award, publication acceptance, citation count, or professional recognition is guaranteed. Keep these boundaries consistent when editing marketing copy.

## Routes and project structure

```text
app/
  page.tsx                 Homepage
  about/                   Professional background
  services/                Service directory and individual service pages
  case-studies/            Clearly labeled sample case studies
  insights/                Article directory and individual articles
  contact/                 Consultation form and contact methods
  privacy/                 Privacy policy
  disclaimer/              Professional disclaimer
  api/contact/route.ts     Validated consultation email endpoint
  api/reviews/route.ts     Validated private review email endpoint
  sitemap.ts               Public route sitemap
  robots.ts                Crawler directives
components/                Reusable layout, page, form, and UI components
  home/Testimonials.tsx    Homepage testimonials and review dialog
lib/
  siteConfig.ts            Central owner and site configuration
  data/                    Editable professional content
  validation.ts            Shared form rules and dropdown options
  server/                  Server email and request protection helpers
public/
  images/                  Optional profile image
  documents/               Optional public CV
docs/
  PROJECT_STATUS.md        Delivery tracking and verification results
  supabase-moderation.sql   Optional future schema; unused by this version
tests/                     API and browser verification
```

Metadata includes page titles and descriptions, OpenGraph data, canonical support, a sitemap, robots configuration, and structured data for a Person, ProfessionalService, and WebSite. Set the actual domain before requesting indexing. Do not add unverified awards or credentials to structured data.

## Validation commands

Run the following checks before releasing changes:

```powershell
npm run lint
npm run typecheck
npm test
npm run build
```

For browser tests, install Playwright's Chromium browser once and run:

```powershell
npx playwright install chromium
npm run test:e2e
```

Inspect `playwright.config.ts` for the test server settings. After a failure, open Playwright's report when one has been generated:

```powershell
npx playwright show-report
```

These are repeatable validation commands, not a claim of a particular Lighthouse score or live-provider delivery. Confirm real email delivery separately after you configure Resend. Browser checks should cover navigation, keyboard behavior, the service filters, form validation, honest missing-configuration errors, and layouts around 375, 430, 768, 1024, 1280, and 1440 pixels. Also verify the chosen photo and CV after adding them.

## Deploy to Vercel

1. Commit the project and lockfile to a Git repository. Keep `.env.local` and real keys out of the repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Select **Next.js** as the framework preset and the directory containing `package.json` as the project root. Use Node.js 24 or 22 consistently with your local environment.
4. Keep the standard Next.js build setup: install dependencies with the committed lockfile and run `npm run build`. Do not switch to a static export: the form APIs require a server runtime.
5. Add `NEXT_PUBLIC_SITE_URL` with your real production origin, such as `https://www.samueladeyemo.com` only if that is the domain you control. Add `RESEND_API_KEY`, `CONTACT_EMAIL`, and `RESEND_FROM_EMAIL` for the Production environment. Configure Preview separately if you want preview deployments to send emails.
6. Deploy, then add your custom domain in Vercel's Domains settings and complete its DNS instructions.
7. If the final domain or environment values change, update the settings and redeploy. Check canonical links, `/sitemap.xml`, `/robots.txt`, contact links, mobile navigation, and both forms on the deployed domain.

Preview deployments should use the intended preview origin when their canonical configuration must differ. Production must not retain `http://localhost:3000`. Vercel manages preview access settings separately from the application's public pages; choose the appropriate project setting for your review workflow.

No deployment or external email delivery is performed merely by installing or building this project.

## Before launch: values and content to replace

- [ ] Replace `YOUR_EMAIL`, `YOUR_LINKEDIN_URL`, and `YOUR_WHATSAPP_NUMBER` in `lib/siteConfig.ts` for the contact methods you want to offer.
- [ ] Set the real production domain in `NEXT_PUBLIC_SITE_URL`; confirm domain ownership and DNS configuration.
- [ ] Set `RESEND_API_KEY`, `CONTACT_EMAIL`, and the verified `RESEND_FROM_EMAIL`; confirm receipt of both types of submission.
- [ ] Add your actual portrait and public CV if ready, then rebuild. Leaving these absent produces intentional placeholders instead of broken links.
- [ ] Replace the experience dates and descriptions with verified career history.
- [ ] Review the service descriptions, professional biography, FAQs, and public policy wording for accuracy.
- [ ] Review or replace the five editorial draft articles. Keep draft labels on samples that remain.
- [ ] Replace sample case studies only when real details and client permission are available.
- [ ] Add testimonials only after verifying authenticity, consent, and privacy preferences. An empty approved list is valid.
- [ ] Keep optional Supabase variables blank unless you implement and verify the integration.
- [ ] Run the validation commands and inspect the deployed desktop and mobile experience.

No client counts, employers, degrees, approvals, real testimonials, or specific case outcomes have been invented to fill missing information.
