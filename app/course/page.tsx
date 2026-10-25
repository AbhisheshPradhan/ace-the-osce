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
import { faqs } from "@/lib/content";
import { getOrganization, getUpcomingEvents } from "@/lib/structured-data";

export const metadata: Metadata = {
	title: "ACEM OSCE Preparation Course in Sydney",
	description:
		"A small-group ACEM Fellowship OSCE course at the Westmead Simulation Centre: trial stations, individual coaching and video feedback from FACEM faculty, plus a free online Evening Taster.",
	alternates: { canonical: "/course/" },
};

export default async function CoursePage() {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [await getOrganization(), ...(await getUpcomingEvents())],
	};

	return (
		<>
			<JsonLd data={structuredData} />
			<PageHero
				title="ACEM OSCE Preparation Course"
				description="A small-group, in-person course at the Westmead Simulation Centre, run by FACEM educators since 2016."
			/>
			<CourseOptions />
			<CourseDay />
			<Testimonials />
			<Faq items={faqs}>
				<p className="mt-10 text-center text-black/70">
					New to the exam?{" "}
					<Link
						href="/acem-osce"
						className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
					>
						Read our ACEM OSCE guide
						<ArrowRightIcon className="h-4 w-4" />
					</Link>
				</p>
			</Faq>
			<CallToAction />
		</>
	);
}
