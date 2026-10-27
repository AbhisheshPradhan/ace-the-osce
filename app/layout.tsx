import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import GlobalHeader from "@/components/GlobalHeader";
import Analytics from "@/components/Analytics";
import Footer from "@/components/Footer";
import { getContent, imageUrl } from "@/lib/cms";
import { isLiveSite, site } from "@/lib/site";

const dmSans = DM_Sans({
	variable: "--font-dm-sans",
	subsets: ["latin"],
});

export const ensureStatic = "navigation";

// Site name, default description, share image and icons come from Site settings in Sanity;
// the default title is the Home page's. app/favicon.ico stays as the fallback icon.
export async function generateMetadata(): Promise<Metadata> {
	const { siteSettings, homePage } = await getContent();
	const { siteName, defaultDescription, shareImage, siteIcon } = siteSettings;

	return {
		metadataBase: new URL(site.url),
		// Keep .vercel.app previews out of search results until launch.
		...(!isLiveSite && { robots: { index: false, follow: false } }),
		title: {
			default: homePage.seo?.title ?? siteName,
			template: `%s | ${siteName}`,
		},
		description: defaultDescription,
		...(siteIcon && {
			icons: {
				icon: { url: imageUrl(siteIcon, { width: 64, height: 64, format: "png" }), type: "image/png" },
				apple: { url: imageUrl(siteIcon, { width: 180, height: 180, format: "png" }), sizes: "180x180" },
			},
		}),
		openGraph: {
			siteName,
			locale: "en_AU",
			type: "website",
			description: defaultDescription,
			...(shareImage && {
				images: [
					{
						url: imageUrl(shareImage, { width: 1200, height: 630, format: "jpg" }),
						width: 1200,
						height: 630,
						alt: shareImage.alt,
					},
				],
			}),
		},
	};
}

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en-AU" className={`${dmSans.variable} h-full antialiased`}>
			<head>
				<noscript>
					<style>{`[data-reveal]{opacity:1;transform:none}`}</style>
				</noscript>
			</head>
			<body className="min-h-full flex flex-col">
				<a
					href="#main"
					className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-medium focus:text-primary focus:shadow-lg"
				>
					Skip to content
				</a>
				<GlobalHeader />
				<main id="main" className="flex-1">
					{children}
				</main>
				<Footer />
				{isLiveSite && process.env.NEXT_PUBLIC_GA_ID && (
					<Analytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
				)}
			</body>
		</html>
	);
}
