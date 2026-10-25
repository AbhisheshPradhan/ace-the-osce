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
- Hosting: Vercel (GitHub `AbhisheshPradhan/ace-the-osce`, `main` auto-deploys). Repo is public.
- Contact form: Next server action → Resend REST API (no SDK). GA4 via `@next/third-parties`.
- No other runtime dependencies. Don't add one for what the platform already does.

## Hard rules

- **Every route must be fully static.** The root layout exports `ensureStatic = "navigation"`;
  the build fails if a page needs request-time rendering. **No ISR/revalidation** either — the
  owner explicitly rejected `cacheLife` revalidation. Build output should show plain `○` routes.
- Course dates are compared against the **build time** (`BUILD_TIMESTAMP` set in
  `next.config.ts`, read in `lib/schedule.ts`). Pages switch to "dates coming soon" on the next
  build after a session ends. Any push rebuilds.
- `trailingSlash: true` — keeps the old WordPress URLs (`/about-us/`, `/contact/`) identical.
- **Light mode only.** Dark mode was deliberately removed; don't reintroduce `dark:` classes.
- **Facts must be sourced.** Don't invent claims (prizes, pass rates, group sizes, credentials).
  Exam facts in `lib/osce-facts.ts` come from ACEM's Examinations page and carry a
  `lastChecked` date. Faculty details: the website (and `lib/content.ts`) is newer than Humanitix.
- `.vercel.app` deployments are `noindex` + robots-disallowed; only `https://acetheosce.com.au`
  is indexable (`isLiveSite` in `lib/content.ts`, derived from `VERCEL_PROJECT_PRODUCTION_URL`).

## Where things live

- `lib/content.ts` — **all site copy and data**: site info, stats, next course / Evening Taster
  dates (`nextCourse`, `freeSession`, ISO `startDate`/`endDate`), course timeline (`courseDay`),
  curriculum, FAQs, course options, faculty, testimonials, `facultySlug()`.
- `lib/osce-facts.ts` — ACEM OSCE guide facts (stations, eligibility, sittings, fee, FAQs).
- `lib/schedule.ts` — build-time "is this session upcoming?" check.
- `lib/structured-data.ts` — schema.org Organization + Event JSON-LD (events only if upcoming).
- `app/` routes: `/` home, `/course/` (full course + events JSON-LD), `/acem-osce/` (exam guide),
  `/about-us/`, `/contact/` (form + map), `/privacy/` (draft, needs team review), `not-found`,
  `sitemap.ts`, `robots.ts`, icons (`icon.png`, `apple-icon.png`, `favicon.ico`).
- `app/contact/actions.ts` — contact form server action (honeypot, validation, echoes values back on error).
- `components/` — `Section` (shared vertical rhythm; `tint` = white→tint→white band),
  `SectionHeading`, `Reveal` (scroll fade-in via IntersectionObserver), `RichText`, `FacultyCard`,
  `Faq`, `PageHero`, `CallToAction`, `GlobalHeader`/`MobileMenu` (drawer portalled to body because
  the header's backdrop-blur breaks `position: fixed`), `Analytics`, `JsonLd`, `Logo`, `icons`.
  `components/home/` holds home/course sections.
- `next.config.ts` — redirects for old WordPress URLs (`/all-courses/` → `/course/`, etc.).
- `public/images/` — `logo/logo.svg` (traced vector of the original PNG), faculty photos,
  course images, `simulation-training.jpeg`. `public/og.png` is the static link-preview image.

## Conventions

- Tabs, double quotes; match surrounding code. No formatter is configured.
- Brand: teal `--color-primary #2c6b6f` (buttons/accents, hover `primary-dark`), navy
  `--color-midnight_text #13214a` (headings), `--color-tint #eef5f5`. Font: DM Sans.
- Body text `text-black/70` (min `/60` for small text — contrast).
- Alternate `Section tint` between neighbours so backgrounds never double up.
- Wrap below-the-fold content in `Reveal`; never the hero (LCP).
- In copy, link faculty mentions with `[Dr Name](faculty:slug)` and render via `RichText`
  (unknown slugs fail the build). `RichText` also turns the site email into a mailto link.
- Internal links use `Link` without trailing slash (Next adds it). External links get
  `target="_blank" rel="noopener noreferrer"`.
- Check: `npx tsc --noEmit -p .`, `npx eslint app components lib`, `npx next build` (all routes `○`).
- Commits: `type(scope): imperative summary` + `- ` bullets. No AI attribution lines.

## Environment variables (see `.env.example`)

`RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (contact form), `NEXT_PUBLIC_GA_ID` (GA4, optional),
`GOOGLE_SITE_VERIFICATION` (optional; prefer DNS verification), `SITE_URL` (optional override).

## Status (as of 25 Oct 2026)

- Deployed to Vercel for a showcase on `.vercel.app`; real domain not switched yet.
- The 24 July 2026 course has passed, so the site shows "Next course dates coming soon".
  Awaiting next dates + Humanitix links from the team.
- Waiting on the team for: next dates, price, group size, one day vs two (About Us says "two
  intensive days"), day schedule, real course photos (hero and in-person images are AI-generated),
  matching headshots (Dr Susie Stapledon has none), recent testimonials, faculty FACEM status and
  any exam prizes, Humanitix API key, DNS access, GA4 ID, privacy policy review.

## Next: Sanity CMS

Planned next step: move editable content into Sanity so the team (doctors) can edit it.
Constraints to respect:
- Keep pages **fully static**: fetch Sanity content at build time; trigger rebuilds from a
  Sanity webhook → Vercel deploy hook on publish. No ISR/revalidation.
- Candidates to move from `lib/content.ts`: course sessions (dates, Humanitix links), faculty
  (incl. photos), testimonials, FAQs, curriculum, course timeline, stats. The faculty-link markup
  (`[text](faculty:slug)`) should become Portable Text references/annotations.
- Exam facts (`lib/osce-facts.ts`) may also move, keeping a source URL + last-checked field.
- Embedded Studio vs hosted Studio is undecided; an embedded `/studio` route is dynamic and
  must sit outside `ensureStatic` (route group with `ensureStatic = false`).
