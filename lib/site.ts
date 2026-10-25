const LIVE_URL = "https://acetheosce.com.au";

// The URL this deployment is served from. On Vercel this is the project's production domain:
// the .vercel.app address until acetheosce.com.au is added, then the real domain.
// SITE_URL overrides it if ever needed.
const siteUrl =
	process.env.SITE_URL ??
	(process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: LIVE_URL);

// Only the real domain should be indexed; .vercel.app previews tell search engines to stay away.
export const isLiveSite = siteUrl === LIVE_URL;

// Settings that belong to the code rather than to Sanity. Everything editors change lives in
// Sanity (see lib/cms.ts).
export const site = {
	url: siteUrl,
	foundedYear: 2016,
};
