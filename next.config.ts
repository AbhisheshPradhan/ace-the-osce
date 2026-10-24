import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	partialPrefetching: true,
	// Matches the old WordPress URLs (/about-us/, /contact/).
	trailingSlash: true,
	// Pages from the old WordPress site that Google has indexed.
	async redirects() {
		return [
			{ source: "/all-courses", destination: "/course/", permanent: true },
			{ source: "/customer-cabinet", destination: "/", permanent: true },
			{ source: "/customer-cabinet-2", destination: "/", permanent: true },
			{ source: "/elementor-hf/:path*", destination: "/", permanent: true },
		];
	},
};

export default nextConfig;
