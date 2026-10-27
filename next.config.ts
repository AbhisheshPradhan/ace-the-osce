import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	partialPrefetching: true,
	experimental: { inlineCss: true },
	// Matches the old WordPress URLs (/about-us/, /contact/).
	trailingSlash: true,
	// Build time, used to decide which course dates are still upcoming (see lib/schedule.ts).
	env: { BUILD_TIMESTAMP: String(Date.now()) },
	// Images edited in Sanity, served from its CDN. Query strings carry size and crop.
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
				pathname: "/images/f3et2lbb/production/**",
			},
		],
	},
	// Pages from the old WordPress site that Google has indexed.
	async redirects() {
		return [
			{
				source: "/all-courses",
				destination: "/course/",
				permanent: true,
			},
			{ source: "/customer-cabinet", destination: "/", permanent: true },
			{
				source: "/customer-cabinet-2",
				destination: "/",
				permanent: true,
			},
			{
				source: "/elementor-hf/:path*",
				destination: "/",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
