import Link from "next/link";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { ArrowRightIcon } from "@/components/icons";
import { getContent } from "@/lib/cms";
import { getSchedule } from "@/lib/schedule";

const solidButton =
	"inline-flex items-center gap-2 bg-white px-6 py-3 rounded-lg text-primary font-medium hover:bg-tint";
const outlineButton =
	"inline-flex items-center px-6 py-3 rounded-lg border border-white text-white hover:bg-white/10";

export default async function CallToAction() {
	const { callToAction, courseDates } = await getContent();
	// "Enrol now" only while the in-person course is still ahead; otherwise Contact us leads.
	const { inPersonUpcoming } = await getSchedule();

	return (
		<Section>
			<div className="container mx-auto max-w-7xl px-6 lg:px-4">
				<Reveal className="rounded-3xl bg-primary px-8 py-14 sm:px-14 text-center text-white">
					<h2 className="text-3xl sm:text-4xl font-semibold">{callToAction.heading}</h2>
					{callToAction.text && (
						<p className="mt-4 mx-auto max-w-2xl text-lg text-white/80">
							{callToAction.text}
						</p>
					)}
					<div className="mt-8 flex flex-wrap justify-center gap-4">
						{inPersonUpcoming && (
							<a
								href={courseDates.bookingUrl}
								target="_blank"
								rel="noopener noreferrer"
								className={solidButton}
							>
								{callToAction.enrolLabel}
								<ArrowRightIcon className="h-5 w-5" />
							</a>
						)}
						<Link href="/contact" className={inPersonUpcoming ? outlineButton : solidButton}>
							{callToAction.contactLabel}
						</Link>
					</div>
				</Reveal>
			</div>
		</Section>
	);
}
