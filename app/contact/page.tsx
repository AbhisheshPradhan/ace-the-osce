import type { Metadata } from "next";
import ContactBlock from "@/components/ContactBlock";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { getContent } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
	const { contactPage } = await getContent();
	return {
		title: contactPage.seo?.title,
		description: contactPage.seo?.description,
		alternates: { canonical: "/contact/" },
	};
}

export default async function Contact() {
	const { contactPage } = await getContent();

	return (
		<>
			<PageHero title={contactPage.hero.title} description={contactPage.hero.description} />
			<Section>
				<ContactBlock />
			</Section>
		</>
	);
}
