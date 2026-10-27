@AGENTS.md

# Ace the OSCE — project context

Marketing site for **Ace the OSCE**, a small-group, in-person preparation course for the
**ACEM Fellowship Clinical Examination (OSCE)**, run since 2016 by FACEM educators at the
Westmead Simulation Centre (SiLECT), Sydney. This project replaces the old WordPress/Elementor
site at https://acetheosce.com.au. Visual inspiration was the HealthPoint Pro template
(health-point-nextjs-pro.vercel.app), but all content, branding and code here are our own.

Goal: a site that is easy to read, makes clear within seconds what the course is and who it's
for, and converts visitors to enrolments (currently via Humanitix).

## Stack

- Next.js 16 (App Router, TypeScript) with `cacheComponents` and `partialPrefetching` on.
  **This Next.js differs from training data — read `node_modules/next/dist/docs/` first.**
- Tailwind CSS v4 via `@tailwindcss/postcss` (`postcss.config.mjs`). Theme tokens in `app/globals.css`.
- Content: **Sanity** (project `f3et2lbb`, dataset `production`, public). Hosted Studio in
  `studio/` with its own `package.json`; the site itself has no Sanity dependency.
- Hosting: Vercel (GitHub `AbhisheshPradhan/ace-the-osce`, `main` auto-deploys). Repo is public.
- Contact form: Next server action → Resend REST API (no SDK). GA4 via `@next/third-parties`.
- No other runtime dependencies. Don't add one for what the platform already does.

## Hard rules

- **Every route must be fully static.** The root layout exports `ensureStatic = "navigation"`;
  the build fails if a page needs request-time rendering. **No ISR/revalidation** either — the
  owner explicitly rejected `cacheLife` revalidation. Build output should show plain `○` routes.
- **Content is fetched at build time only.** `scripts/fetch-content.mjs` runs as `predev` and
  `prebuild`, writes `content/site-content.json` (gitignored), and pages read it through
  `getContent()` in `lib/cms.ts`. No request-time fetch, no `use cache`.
- **Sanity is the only source of content.** Don't put copy, dates, links or images back in the
  code. Code keeps only interface text (form field ids, "Applications open", breadcrumbs) and
  code-owned settings in `lib/site.ts`.
- Course dates are compared against the **build time** (`BUILD_TIMESTAMP` in `next.config.ts`,
  read in `lib/schedule.ts`). Every booking element (header, mobile menu, hero, course cards,
  call to action, OSCE Guide banner, Google events) switches on the next build after a course
  ends. Publishing in Sanity or any push rebuilds.
- `trailingSlash: true` — keeps the old WordPress URLs (`/about-us/`, `/contact/`) identical.
- **Light mode only.** Dark mode was deliberately removed; don't reintroduce `dark:` classes.
- **Facts must be sourced.** Don't invent claims (prizes, pass rates, ratings, group sizes,
  credentials). Testimonial stars show only when a real rating is entered. The OSCE Guide in
  Sanity keeps ACEM's source URL and a Last checked date.
- `.vercel.app` deployments are `noindex` + robots-disallowed; only `https://acetheosce.com.au`
  is indexable (`isLiveSite` in `lib/site.ts`, from `SITE_URL`, set in Vercel Production, falling
  back to `VERCEL_PROJECT_PRODUCTION_URL`).
- Google Analytics 4 loads only on the live site (`isLiveSite` + `NEXT_PUBLIC_GA_ID`), with no
  cookie banner (AU/NZ audience; disclosed in the Privacy Policy's "Analytics and cookies"
  section in Sanity). Events from one click listener in `components/Analytics.tsx`: `enrol_click`
  (Humanitix links), `email_click` (mailto), `cta_click` (links with a fixed `data-cta` id, since
  button text comes from Sanity), plus `generate_lead` when the contact form actually sends. Give
  new buttons a `data-cta` id. Keep GA's enhanced "form interactions" off (it double-counts).

## Where things live

- `studio/` — Sanity Studio. `schemaTypes/` (documents, singletons, reusable objects),
  `structure.ts` (sidebar: Courses, Pages, People, Site-wide), `constants.ts` (singleton ids,
  internal page list for link dropdowns), `components/EditElsewhere.tsx` ("Also on this page"
  notes; a target `path` opens the linked document at that field). Run with `npm run dev`
  inside `studio/`; publish with `npx sanity deploy`.
- `scripts/fetch-content.mjs` — fetches published content, resolves references and image assets,
  fails the build if a singleton is missing. New singleton types must be added to `SINGLETONS`.
- `lib/cms.ts` — `getContent()`, types mirroring the Studio schema (update both together),
  `imageUrl()` (Sanity CDN with crop/hotspot), `linkHref()`, `formatAddress()`, `toPlainText()`,
  date helpers (`formatCourseDate`, `formatShortDate`, `formatTime`, `formatTimeRange`; Sydney
  time), `facultySlug()` (About Us anchors from names).
- `lib/site.ts` — code-owned settings: site URL, `isLiveSite`, founding year.
- `lib/schedule.ts` — build-time "is this course upcoming?" check and `buildYear`.
- `lib/structured-data.ts` — schema.org Organization + Event JSON-LD (events only if upcoming).
- `app/` routes: `/` home, `/course/` (course + events JSON-LD), `/acem-osce/` (exam guide +
  Article JSON-LD), `/about-us/`, `/contact/`, `/privacy/` (draft, needs team review),
  `not-found`, `sitemap.ts`, `robots.ts`, `favicon.ico` (fallback; the site icon is in Sanity).
- `app/contact/actions.ts` — contact form server action (honeypot, validation, messages from Sanity).
- `components/` — `Section` (shared vertical rhythm; `tint` = white→tint→white band),
  `SectionHeading`, `Reveal` (scroll fade-in via IntersectionObserver), `PortableText` (Sanity
  rich text), `ContactBlock`/`ContactFormCard`/`ContactForm`, `FacultyCard`, `Faq`, `PageHero`,
  `CallToAction`, `GlobalHeader`/`MobileMenu` (drawer portalled to body because the header's
  backdrop-blur breaks `position: fixed`), `Analytics`, `JsonLd`, `Logo`, `icons`.
  `components/home/` holds home/course sections.
- `next.config.ts` — redirects for old WordPress URLs, Sanity CDN `remotePatterns`.
- All images (logo, icon, share image, hero tiles, faculty, course cards) live in Sanity. The hero
  photos are real course photos from Dr Andrew Coggins (2017 photos from his emergencypedia.com
  blog, plus the resuscitation simulation photo).

## Conventions

- Tabs, double quotes in the site; the Studio uses its own Prettier style (2 spaces, single
  quotes, no semicolons). No formatter is configured for the site.
- Brand: teal `--color-primary #2c6b6f` (buttons/accents, hover `primary-dark`), navy
  `--color-midnight_text #13214a` (headings), `--color-tint #eef5f5`. Font: DM Sans.
- Body text `text-black/70` (min `/60` for small text — contrast).
- Alternate `Section tint` between neighbours so backgrounds never double up.
- Wrap below-the-fold content in `Reveal`; never the hero (LCP).
- Rich text renders through `PortableText`: bold, italic, web links, faculty links (to the
  About Us card) and live tags (contact email, next course date and venue). Plain-text mentions
  of the contact email become mailto links. Client components get plain props, not rich text.
- Internal links use `Link` without trailing slash (Next adds it). External links get
  `target="_blank" rel="noopener noreferrer"`.
- Check: `npm run content` (needed once before `tsc`), `npx tsc --noEmit -p .`,
  `npx eslint app components lib scripts`, `npm run build` (all routes `○`). Studio:
  `npx tsc --noEmit -p .` and `npx eslint .` inside `studio/`.
- Commits: `type(scope): imperative summary` + `- ` bullets. No AI attribution lines.

## Environment variables (see `.env.example`)

`RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (contact form), `NEXT_PUBLIC_GA_ID` (GA4, optional),
`SITE_URL` (optional override).
Sanity needs none: the dataset is public and the project id is in the fetch script.

## Status (as of 27 Oct 2026)

- **Live** at https://acetheosce.com.au. DNS stays at SiteGround (A record and `www` CNAME point
  to Vercel); the old WordPress hosting is paid until about mid-2027. Don't touch the MX/SPF
  records, they serve the domain's email.
- Search Console is verified by DNS TXT and the sitemap is submitted.
- Contact form: Resend domain verified (Tokyo region, records `send`, `rsend`,
  `resend._domainkey` at SiteGround), key in Vercel, tested end to end. Messages go to the contact
  email in Site settings (`acetheosce@gmail.com`, the team's inbox; we have no access to it).
- Sanity integration is done: every page reads from Sanity at build time. The one-off seed script
  that imported the old content was removed (it's in git history); **don't recreate one** — the
  team edits in the Studio now and a seed would overwrite their changes.
- Publishing in Sanity deploys the site: a Sanity webhook (production, published only) calls a
  Vercel deploy hook, once per published document. The hosted Studio is
  https://ace-the-osce.sanity.studio (`npx sanity deploy` in studio/), with a "How to update the
  website" guide at the top of the sidebar. Draft Mode preview was skipped: the team edits about
  twice a year.
- The course runs about twice a year (February and July). Dates and booking holds one course at
  a time and links to the ACEM sittings, which also fill the contact form's sitting dropdown.
  Past sittings stay listed on purpose until the team removes them.
- Still to do: invite the doctors as Editors; hand over accounts (admin invites for
  `acetheosce@gmail.com` on GA, Search Console, Sanity and Resend; transfer the Vercel project
  to a Pro team, as Hobby is for non-commercial use); in GA, mark `generate_lead` and
  `enrol_click` as Key events. No daily scheduled rebuild for now.
- The 24 July 2026 course has passed, so the site shows "Next course dates coming soon".
  Awaiting next dates + Humanitix link from the team.
- Waiting on the team for: next dates, price, group size, packages and pricing (Humanitix 2026:2 listed a free online evening
  session and a paid in-person day; the old About Us "two intensive days" meant the two together
  and was removed; consider saying in-person includes the online session), who leads the
  Evening Taster (Humanitix says "Laura, one of our recent prize-winning candidates"), day schedule,
  recent course photos (the in-person course card image is AI-generated; the hero uses 2017
  photos), matching headshots (Dr Susie Stapledon has none), recent testimonials (the newest is
  a 2023 email), faculty FACEM status and any exam prizes, Humanitix API key, privacy policy
  review, and a source for the home page "50+ courses / 500+ attendees" stats.
