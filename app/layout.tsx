import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import GlobalHeader from "@/components/GlobalHeader";
import Analytics from "@/components/Analytics";
import Footer from "@/components/Footer";
import { isLiveSite, site } from "@/lib/content";

const dmSans = DM_Sans({
	variable: "--font-dm-sans",
	subsets: ["latin"],
});

export const ensureStatic = "navigation";

const description =
	"A small-group, in-person ACEM Fellowship OSCE preparation course at the Westmead Simulation Centre, run by FACEM educators since 2016.";

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	// Keep .vercel.app previews out of search results until launch.
	...(!isLiveSite && { robots: { index: false, follow: false } }),
	title: {
		default: "Ace the OSCE | ACEM Fellowship OSCE Preparation Course, Sydney",
		template: "%s | Ace the OSCE",
	},
	description,
	...(process.env.GOOGLE_SITE_VERIFICATION && {
		verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
	}),
	openGraph: {
		siteName: site.name,
		locale: "en_AU",
		type: "website",
		description,
		images: [
			{
				url: "/og.png",
				width: 1200,
				height: 630,
				alt: "Ace the OSCE: ACEM Fellowship OSCE preparation course",
			},
		],
	},
};

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
				{process.env.NEXT_PUBLIC_GA_ID && (
					<Analytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
				)}
			</body>
		</html>
	);
}
