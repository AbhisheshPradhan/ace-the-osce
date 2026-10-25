import Image from "next/image";
import Link from "next/link";
import PortableText from "@/components/PortableText";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import {
	ArrowRightIcon,
	CalendarIcon,
	CheckIcon,
	ClockIcon,
	MapPinIcon,
} from "@/components/icons";
import { formatCourseDate, formatTimeRange, getContent, imageUrl } from "@/lib/cms";
import { getSchedule } from "@/lib/schedule";

export default async function CourseOptions({
	showDetailsLink = false,
}: {
	showDetailsLink?: boolean;
}) {
	const { courseOptionsSection, courseDates, eveningTaster, inPersonCourse } = await getContent();
	const { inPersonUpcoming, tasterUpcoming } = await getSchedule();
	const cards = [
		{ id: "online-session", course: eveningTaster, dates: courseDates.taster, isUpcoming: tasterUpcoming},
		{ id: "in-person-course", course: inPersonCourse, dates: courseDates.inPerson, isUpcoming: inPersonUpcoming},
	];
	const { heading } = courseOptionsSection;

	return (
		<Section id="course-options" tint className="scroll-mt-24">
			<div className="container mx-auto max-w-7xl px-6 lg:px-4">
				<Reveal>
					<SectionHeading
						eyebrow={heading.eyebrow}
						title={heading.title}
						description={heading.description}
					/>
				</Reveal>
				<div className="mt-14 grid lg:grid-cols-2 gap-8">
					{cards.map(({ id, course, dates, isUpcoming }, i) => (
						<Reveal key={id} delay={i * 150}>
							<article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg border border-border">
								<div className="relative aspect-video">
									<Image
										src={imageUrl(course.image, { width: 1280, height: 720 })}
										alt={course.image.alt}
										fill
										sizes="(min-width: 1024px) 40vw, 100vw"
										className="object-cover"
									/>
								</div>
								<div className="flex flex-1 flex-col p-8">
									<h3 className="text-2xl font-semibold text-midnight_text">
										{course.title}
									</h3>
									<ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-base text-black/70">
										<li className="inline-flex items-center gap-2">
											<CalendarIcon className="h-5 w-5 text-primary" />
											{isUpcoming
												? formatCourseDate(dates.startDate)
												: courseOptionsSection.noDatesText}
										</li>
										{isUpcoming && (
											<li className="inline-flex items-center gap-2">
												<ClockIcon className="h-5 w-5 text-primary" />
												{formatTimeRange(dates.startDate, dates.endDate)}
											</li>
										)}
										<li className="inline-flex items-center gap-2">
											<MapPinIcon className="h-5 w-5 text-primary" />
											{course.venue}
										</li>
									</ul>
									<div className="mt-6 space-y-4 text-black/60">
										<PortableText value={course.description} />
									</div>
									{course.highlights && (
										<ul className="mt-6 grid sm:grid-cols-2 gap-3">
											{course.highlights.map((highlight) => (
												<li
													key={highlight}
													className="flex items-start gap-2 text-midnight_text"
												>
													<CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
													{highlight}
												</li>
											))}
										</ul>
									)}
									<div className="mt-auto pt-8">
										{isUpcoming ? (
											<a
												href={courseDates.bookingUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-2 bg-primary border border-primary px-6 py-3 rounded-lg text-white hover:bg-primary-dark"
											>
												{course.ctaLabel}
												<ArrowRightIcon className="h-5 w-5" />
											</a>
										) : (
											<Link
												href="/contact"
												className="inline-flex items-center gap-2 bg-primary border border-primary px-6 py-3 rounded-lg text-white hover:bg-primary-dark"
											>
												{courseOptionsSection.noDatesButtonLabel}
												<ArrowRightIcon className="h-5 w-5" />
											</Link>
										)}
									</div>
								</div>
							</article>
						</Reveal>
					))}
				</div>
				{showDetailsLink && (
					<Reveal className="mt-12 text-center">
						<Link
							href="/course"
							className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white"
						>
							{courseOptionsSection.detailsLinkLabel}
							<ArrowRightIcon className="h-5 w-5" />
						</Link>
					</Reveal>
				)}
			</div>
		</Section>
	);
}
