import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
	title: "Page not found",
	robots: { index: false },
};

const destinations = [
	{
		href: "/course",
		title: "The course",
		description: "Dates, venue and how to enrol.",
	},
	{
		href: "/acem-osce",
		title: "ACEM OSCE guide",
		description: "Format, stations, eligibility and sitting dates.",
	},
	{
		href: "/contact",
		title: "Contact us",
		description: "Questions about the course? Get in touch.",
	},
];

export default function NotFound() {
	return (
		<Section className="pt-36 lg:pt-44">
			<div className="container mx-auto max-w-3xl px-6 lg:px-4 text-center">
				<p className="text-sm font-semibold uppercase tracking-widest text-primary">
					404
				</p>
				<h1 className="mt-3 text-4xl sm:text-5xl font-bold text-midnight_text">
					We couldn’t find that page
				</h1>
				<p className="mt-6 text-lg text-black/70">
					It may have moved when we updated our website. Try one of these
					instead:
				</p>
				<ul className="mt-12 grid sm:grid-cols-3 gap-6 text-left">
					{destinations.map((item) => (
						<li key={item.href}>
							<Link
								href={item.href}
								className="group flex h-full flex-col rounded-2xl bg-tint p-6 hover:bg-primary/10"
							>
								<span className="flex items-center gap-2 text-lg font-semibold text-midnight_text">
									{item.title}
									<ArrowRightIcon className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
								</span>
								<span className="mt-2 text-black/70">{item.description}</span>
							</Link>
						</li>
					))}
				</ul>
				<Link
					href="/"
					className="mt-12 inline-flex items-center gap-2 bg-primary border border-primary px-6 py-3 rounded-lg text-white hover:bg-primary-dark"
				>
					Back to home
				</Link>
			</div>
		</Section>
	);
}
