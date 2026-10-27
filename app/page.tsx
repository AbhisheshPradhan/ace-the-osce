import type { Metadata } from "next";
import CallToAction from "@/components/CallToAction";
import JsonLd from "@/components/JsonLd";
import AboutCourse from "@/components/home/AboutCourse";
import ContactSection from "@/components/home/ContactSection";
import CourseOptions from "@/components/home/CourseOptions";
import FacultyPreview from "@/components/home/FacultyPreview";
import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import { getOrganization, getWebSite } from "@/lib/structured-data";

// Title and description come from the root layout (Home's SEO settings in Sanity).
export const metadata: Metadata = {
	alternates: { canonical: "/" },
};

export default async function Home() {
	return (
		<>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@graph": [await getOrganization(), await getWebSite()],
				}}
			/>
			<Hero />
			<AboutCourse />
			<CourseOptions showDetailsLink />
			<FacultyPreview />
			<Testimonials />
			<ContactSection />
			<CallToAction />
		</>
	);
}
