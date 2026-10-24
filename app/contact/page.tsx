import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { MailIcon, MapPinIcon } from "@/components/icons";
import { site } from "@/lib/content";
import { sittings } from "@/lib/osce-facts";

export const metadata: Metadata = {
	title: "Contact",
	description:
		"Questions about Ace the OSCE courses, schedules or enrolment? Send us a message or find the Westmead Simulation Centre.",
	alternates: { canonical: "/contact/" },
};

const mapQuery = encodeURIComponent(site.location.mapQuery);

export default function Contact() {
	return (
		<>
			<PageHero
				title="Contact"
				description="We’re here to help you succeed. Ace the OSCE is run by experienced doctors, dedicated to helping doctors feel confident and prepared for their OSCE exams. Whether you’re curious about our courses, schedules, or enrolment, we’d love to hear from you — get in touch today."
			/>
			<Section>
				<div className="container mx-auto max-w-7xl px-6 lg:px-4 grid lg:grid-cols-5 gap-8">
					<div className="lg:col-span-3 rounded-3xl border border-border bg-white p-8 sm:p-10 shadow-lg">
						<h2 className="text-2xl font-semibold text-midnight_text">
							Send us a message
						</h2>
						<p className="mt-2 mb-8 text-black/70">
							We’ll get back to you soon.
						</p>
						<ContactForm sittings={sittings.map((s) => s.sitting)} />
					</div>
					<div className="lg:col-span-2 space-y-6">
						<div className="rounded-3xl bg-tint p-8">
							<span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
								<MailIcon className="h-6 w-6" />
							</span>
							<h2 className="mt-5 text-2xl font-semibold text-midnight_text">
								Prefer email?
							</h2>
							<a
								href={`mailto:${site.email}`}
								className="mt-3 inline-block text-lg font-medium text-primary hover:underline break-all"
							>
								{site.email}
							</a>
						</div>
						<div className="rounded-3xl bg-tint p-8">
							<span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
								<MapPinIcon className="h-6 w-6" />
							</span>
							<h2 className="mt-5 text-2xl font-semibold text-midnight_text">
								Find the Simulation Centre
							</h2>
							<p className="mt-2 font-medium text-midnight_text">
								{site.location.name}
							</p>
							<p className="mt-1 text-black/70">{site.location.address}</p>
							<a
								href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-5 inline-block font-medium text-primary hover:underline"
							>
								Open in Google Maps
							</a>
						</div>
					</div>
				</div>
			</Section>
			<Section spacing="bottom">
				<div className="container mx-auto max-w-7xl px-6 lg:px-4">
					<div className="h-96 lg:h-112 overflow-hidden rounded-3xl border border-border">
						<iframe
							title="Map of the Westmead Simulation Centre"
							src={`https://maps.google.com/maps?q=${mapQuery}&z=16&output=embed`}
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							className="h-full w-full"
						/>
					</div>
				</div>
			</Section>
		</>
	);
}
