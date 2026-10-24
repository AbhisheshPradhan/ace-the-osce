import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import RichText from "@/components/RichText";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import {
	ArrowRightIcon,
	CalendarIcon,
	CheckIcon,
	ClockIcon,
	MapPinIcon,
} from "@/components/icons";
import { courseOptions, site } from "@/lib/content";
import { getSchedule } from "@/lib/schedule";

export default async function CourseOptions({
	showDetailsLink = false,
}: {
	showDetailsLink?: boolean;
}) {
	const { inPersonUpcoming, tasterUpcoming } = await getSchedule();
	const upcoming: Record<string, boolean> = {
		"online-session": tasterUpcoming,
		"in-person-course": inPersonUpcoming,
	};

	return (
		<Section id="course-options" tint className="scroll-mt-24">
			<div className="container mx-auto max-w-7xl px-6 lg:px-4">
				<Reveal>
					<SectionHeading
						eyebrow="Course options"
						title="Choose how you prepare"
						description="Start with our free online Evening Taster, then join the in-person course for a full day of coached OSCE practice."
					/>
				</Reveal>
				<div className="mt-14 grid lg:grid-cols-2 gap-8">
					{courseOptions.map((option, i) => {
						const isUpcoming = upcoming[option.id] ?? true;
						return (
							<Reveal key={option.id} delay={i * 150}>
								<article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg border border-border">
									<div className="relative aspect-video">
										<Image
											src={option.image}
											alt={option.imageAlt}
											fill
											sizes="(min-width: 1024px) 40vw, 100vw"
											className="object-cover"
										/>
									</div>
									<div className="flex flex-1 flex-col p-8">
										<h3 className="text-2xl font-semibold text-midnight_text">
											{option.title}
										</h3>
										<ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-base text-black/70">
											<li className="inline-flex items-center gap-2">
												<CalendarIcon className="h-5 w-5 text-primary" />
												{isUpcoming ? option.date : "Dates to be announced"}
											</li>
											{isUpcoming && option.time && (
												<li className="inline-flex items-center gap-2">
													<ClockIcon className="h-5 w-5 text-primary" />
													{option.time}
												</li>
											)}
											<li className="inline-flex items-center gap-2">
												<MapPinIcon className="h-5 w-5 text-primary" />
												{option.venue}
											</li>
										</ul>
										<div className="mt-6 space-y-4 text-black/60">
											{option.description.map((paragraph) => (
												<p key={paragraph}>
													<RichText text={paragraph} />
												</p>
											))}
										</div>
										<ul className="mt-6 grid sm:grid-cols-2 gap-3">
											{option.highlights.map((highlight) => (
												<li
													key={highlight}
													className="flex items-start gap-2 text-midnight_text"
												>
													<CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
													{highlight}
												</li>
											))}
										</ul>
										<div className="mt-auto pt-8">
											{isUpcoming ? (
												<a
													href={site.enrolUrl}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex items-center gap-2 bg-primary border border-primary px-6 py-3 rounded-lg text-white hover:bg-primary-dark"
												>
													{option.cta}
													<ArrowRightIcon className="h-5 w-5" />
												</a>
											) : (
												<Link
													href="/contact"
													className="inline-flex items-center gap-2 bg-primary border border-primary px-6 py-3 rounded-lg text-white hover:bg-primary-dark"
												>
													Ask about the next course
													<ArrowRightIcon className="h-5 w-5" />
												</Link>
											)}
										</div>
									</div>
								</article>
							</Reveal>
						);
					})}
				</div>
				{showDetailsLink && (
					<Reveal className="mt-12 text-center">
						<Link
							href="/course"
							className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white"
						>
							How the course works, what we cover and FAQs
							<ArrowRightIcon className="h-5 w-5" />
						</Link>
					</Reveal>
				)}
			</div>
		</Section>
	);
}
