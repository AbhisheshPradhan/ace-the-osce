import type { Metadata } from "next";
import Link from "next/link";
import CallToAction from "@/components/CallToAction";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import CourseDay from "@/components/home/CourseDay";
import CourseOptions from "@/components/home/CourseOptions";
import Testimonials from "@/components/home/Testimonials";
import { ArrowRightIcon } from "@/components/icons";
import { getContent } from "@/lib/cms";
import { getOrganization, getUpcomingEvents } from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
	const { coursePage } = await getContent();
	return {
		title: coursePage.seo?.title,
		description: coursePage.seo?.description,
		alternates: { canonical: "/course/" },
	};
}

export default async function CoursePage() {
	const { coursePage } = await getContent();
	const { hero, faq } = coursePage;
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [await getOrganization(), ...(await getUpcomingEvents())],
	};

	return (
		<>
			<JsonLd data={structuredData} />
			<PageHero title={hero.title} description={hero.description} />
			<CourseOptions />
			<CourseDay />
			<Testimonials />
			<Faq items={faq.items} eyebrow={faq.heading.eyebrow} title={faq.heading.title}>
				{faq.guideLinkLabel && (
					<p className="mt-10 text-center text-black/70">
						{faq.guideLinkIntro}{" "}
						<Link
							href="/acem-osce"
							className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
						>
							{faq.guideLinkLabel}
							<ArrowRightIcon className="h-4 w-4" />
						</Link>
					</p>
				)}
			</Faq>
			<CallToAction />
		</>
	);
}
