import type { MetadataRoute } from "next";
import { isLiveSite, site } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: { userAgent: "*", [isLiveSite ? "allow" : "disallow"]: "/" },
		sitemap: `${site.url}/sitemap.xml`,
	};
}
