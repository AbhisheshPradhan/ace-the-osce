# Ace the OSCE

Website for [Ace the OSCE](https://acetheosce.com.au), a small-group, in-person preparation
course for the ACEM Fellowship OSCE at the Westmead Simulation Centre, Sydney.

Built with Next.js and Tailwind CSS, hosted on Vercel. Content is edited in
[Sanity](https://www.sanity.io) and pulled in when the site builds, so every page is static.

## Running locally

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run dev` first fetches the latest published content from
Sanity into `content/site-content.json` (not committed). To see newly published changes,
restart it, or run `npm run content`.

Before pushing, check that everything builds:

```bash
npx tsc --noEmit -p .
npm run lint
npm run build
```

## Updating content

All text, dates, links and images are edited in the **Sanity Studio** at
https://ace-the-osce.sanity.studio, not in the code. Click **Publish** and a Sanity webhook
triggers a Vercel deploy: the change is live in about a minute. Each published document
triggers its own deploy.

The Studio sidebar:

| Group | What's there |
| --- | --- |
| Courses | **Dates and booking** (the Humanitix link, both courses' dates, and a link to the ACEM sittings), the In-person course and Evening Taster card text, the course options section |
| Pages | Home, The Course, OSCE Guide, About Us, Contact, Privacy Policy, Page not found |
| People | Faculty, Testimonials |
| Site-wide | Header, Footer, Contact form, Call to action, Site settings (email, venue, logo, icon, share image). The contact email is also where contact form messages are sent |

### New course dates

Open **Dates and booking**, update the Humanitix link and the start and end times (Sydney
time), and publish. Every date and booking button on the site updates together. Then check
the ACEM sittings (the **Edit ACEM sittings** link at the top of the form): they are shown on
the OSCE Guide page and in the contact form's "Which sitting?" dropdown. Once a course's end
time has passed, the site switches to its "no dates" wording on the next build.

### Running the Studio

```bash
cd studio
npm install
npm run dev          # http://localhost:3333
npx sanity deploy    # publish the Studio for the team (hosted by Sanity)
```

The content schema (which fields exist) is code in `studio/schemaTypes/`. If you change it,
update the matching types in `lib/cms.ts`, and add any new single-instance document to
`SINGLETONS` in `scripts/fetch-content.mjs`.

## Environment variables

Set these in Vercel (Project → Settings → Environment Variables). See `.env.example`.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Sends contact form messages (required for the form to work) |
| `CONTACT_FROM_EMAIL` | Sender address on a domain verified in Resend (defaults to `Ace the OSCE website <noreply@acetheosce.com.au>`) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID. Loads only on the live site; the Privacy Policy describes it |
| `SITE_URL` | `https://acetheosce.com.au` in Production. Makes the site indexable and sets canonical URLs |

Sanity needs no variables: the dataset is public.

## Deployment notes

- Live at https://acetheosce.com.au. Only that domain is indexable (`SITE_URL`, falling back to
  Vercel's production domain); `.vercel.app` deployments are hidden from search engines.
- DNS is managed at SiteGround: the A record and `www` CNAME point to Vercel, plus Resend's
  records (`send`, `rsend`, `resend._domainkey`) and the Google Search Console TXT. Leave the
  MX and SPF records alone; they belong to the domain's email.
- The contact form sends through Resend to the contact email in Site settings, with the
  visitor as Reply-To.
- Old WordPress URLs are redirected in `next.config.ts`.
- See `CLAUDE.md` for architecture decisions and conventions.
