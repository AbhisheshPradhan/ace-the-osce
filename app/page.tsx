import CallToAction from "@/components/CallToAction";
import JsonLd from "@/components/JsonLd";
import AboutCourse from "@/components/home/AboutCourse";
import ContactSection from "@/components/home/ContactSection";
import CourseOptions from "@/components/home/CourseOptions";
import FacultyPreview from "@/components/home/FacultyPreview";
import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import { organization } from "@/lib/structured-data";

export default function Home() {
	return (
		<>
			<JsonLd data={{ "@context": "https://schema.org", ...organization }} />
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
