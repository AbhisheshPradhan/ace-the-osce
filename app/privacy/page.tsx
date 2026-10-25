import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PortableText from "@/components/PortableText";
import Section from "@/components/Section";
import { getContent } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
	const { privacyPage } = await getContent();
	return {
		title: privacyPage.seo?.title,
		description: privacyPage.seo?.description,
		alternates: { canonical: "/privacy/" },
	};
}

export default async function PrivacyPolicy() {
	const { privacyPage } = await getContent();
	// "25 October 2026" (a date with no time, so no time zone to convert).
	const lastUpdated = new Date(privacyPage.lastUpdated).toLocaleDateString("en-AU", {
		timeZone: "UTC",
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return (
		<>
			<PageHero title={privacyPage.title} description={`Last updated ${lastUpdated}`} />
			<Section>
				<div className="container mx-auto max-w-3xl px-6 lg:px-4 space-y-12">
					{privacyPage.sections.map((section) => (
						<div key={section.heading}>
							<h2 className="text-2xl font-semibold text-midnight_text">
								{section.heading}
							</h2>
							<div className="mt-4 space-y-4 text-lg text-black/70">
								<PortableText value={section.body} />
							</div>
						</div>
					))}
				</div>
			</Section>
		</>
	);
}
