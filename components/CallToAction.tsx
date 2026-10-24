import Link from "next/link";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { ArrowRightIcon } from "@/components/icons";
import { site } from "@/lib/content";

export default function CallToAction() {
	return (
		<Section>
			<div className="container mx-auto max-w-7xl px-6 lg:px-4">
				<Reveal className="rounded-3xl bg-primary px-8 py-14 sm:px-14 text-center text-white">
					<h2 className="text-3xl sm:text-4xl font-semibold">
						Ready to ace your OSCE?
					</h2>
					<p className="mt-4 mx-auto max-w-2xl text-lg text-white/80">
						Join our small group course, or get in touch with any questions.
					</p>
					<div className="mt-8 flex flex-wrap justify-center gap-4">
						<a
							href={site.enrolUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-lg text-primary font-medium hover:bg-tint"
						>
							Enrol now
							<ArrowRightIcon className="h-5 w-5" />
						</a>
						<Link
							href="/contact"
							className="inline-flex items-center px-6 py-3 rounded-lg border border-white text-white hover:bg-white/10"
						>
							Contact us
						</Link>
					</div>
				</Reveal>
			</div>
		</Section>
	);
}
