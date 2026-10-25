# Ace the OSCE

Website for [Ace the OSCE](https://acetheosce.com.au), a small-group, in-person preparation
course for the ACEM Fellowship OSCE at the Westmead Simulation Centre, Sydney.

Built with Next.js and Tailwind CSS, hosted on Vercel. Every page is static.

## Running locally

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Before pushing, check that everything builds:

```bash
npx tsc --noEmit -p .
npm run lint
npm run build
```

## Updating content

Almost all text lives in **`lib/content.ts`**. Edit it, commit and push to `main`; Vercel
rebuilds and redeploys the site automatically.

### New course dates

In `lib/content.ts`, update:

- `nextCourse` — the in-person course (`date`, `shortDate`, `time`, and ISO `startDate`/`endDate`)
- `freeSession` — the Evening Taster (`shortDate`, `time`, `startDate`/`endDate`)
- `site.enrolUrl` — the Humanitix link
- The matching `date`/`time` in `courseOptions`

Once a session's end date has passed, the site switches to "Next course dates coming soon" on
the next build. **Push (or redeploy in Vercel) after each course** so that change goes live.

### Other content

| What | Where |
| --- | --- |
| Faculty (names, roles, credentials, bios, photos) | `faculty` in `lib/content.ts`, photos in `public/images/faculty/` |
| Testimonials | `testimonials` in `lib/content.ts` |
| FAQs | `faqs` in `lib/content.ts` |
| Course timeline and "What we cover" | `courseDay` and `curriculum` in `lib/content.ts` |
| ACEM OSCE guide facts and sitting dates | `lib/osce-facts.ts` (update `lastChecked` when you re-check ACEM's site) |
| Privacy policy | `app/privacy/page.tsx` |

To link a faculty member's name in any copy to their About Us card, write
`[Dr Laura Brown](faculty:laura-brown)`.

## Environment variables

Set these in Vercel (Project → Settings → Environment Variables). See `.env.example`.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Sends contact form messages (required for the form to work) |
| `CONTACT_FROM_EMAIL` | Sender address on a domain verified in Resend |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID (optional) |
| `GOOGLE_SITE_VERIFICATION` | Search Console HTML-tag code (optional; DNS verification is preferred) |

## Deployment notes

- `.vercel.app` deployments are hidden from search engines. The site becomes indexable
  automatically once `acetheosce.com.au` is the project's production domain in Vercel.
- Old WordPress URLs are redirected in `next.config.ts`.
- See `CLAUDE.md` for architecture decisions and conventions.
