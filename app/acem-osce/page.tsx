import type { Metadata } from "next";
import Link from "next/link";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { nextCourse, site } from "@/lib/content";
import { getSchedule } from "@/lib/schedule";
import {
	eligibility,
	examFee,
	guideFaqs,
	keyFacts,
	osceSource,
	sittings,
	stationTypes,
} from "@/lib/osce-facts";

const title = "ACEM Fellowship OSCE: Format, Stations, Eligibility and Dates";
const description =
	"A plain-English guide to the ACEM Fellowship Clinical Examination (OSCE): 12 stations of 11 minutes over two days, station types, eligibility, attempts, fees and 2026–27 sitting dates.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/acem-osce/" },
	openGraph: { title, description, type: "article", images: "/og.png" },
};

const structuredData = {
	"@context": "https://schema.org",
	"@type": "Article",
	headline: title,
	description,
	dateModified: osceSource.lastCheckedIso,
	author: { "@type": "Organization", name: site.name, url: site.url },
	publisher: { "@type": "Organization", name: site.name, url: site.url },
	mainEntityOfPage: `${site.url}/acem-osce/`,
	citation: osceSource.url,
};

export default async function AcemOsceGuide() {
	const { inPersonUpcoming } = await getSchedule();

	return (
		<>
			<JsonLd data={structuredData} />
			<PageHero
				title="The ACEM Fellowship OSCE"
				description="Everything you need to know about the Fellowship Clinical Examination: the format, station types, who can sit it and when."
			/>

			<Section>
				<div className="container mx-auto max-w-5xl px-6 lg:px-4">
					<Reveal>
						<SectionHeading
							eyebrow="At a glance"
							title="Key facts"
							description={`The OSCE is a clinical exam based on scenarios you would expect to see in the emergency department. The current exam fee is ${examFee} per attempt.`}
						/>
					</Reveal>
					<div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
						{keyFacts.map((fact, i) => (
							<Reveal
								key={fact.label}
								delay={i * 100}
								className="h-full rounded-2xl bg-tint p-6 text-center"
							>
								<p className="text-3xl sm:text-4xl font-bold text-primary">
									{fact.value}
								</p>
								<p className="mt-2 text-black/70">{fact.label}</p>
							</Reveal>
						))}
					</div>
				</div>
			</Section>

			<Section tint>
				<div className="container mx-auto max-w-5xl px-6 lg:px-4 grid lg:grid-cols-2 gap-12">
					<Reveal>
						<SectionHeading align="left" eyebrow="Format" title="How the exam runs" />
						<div className="mt-6 space-y-4 text-lg text-black/70">
							<p>
								The OSCE is held over two consecutive days and has up to 12
								clinical stations.
							</p>
							<p>
								Each station is 11 minutes: 4 minutes of reading time followed by
								7 minutes of assessment. That adds up to 132 minutes of stations
								across the two days.
							</p>
						</div>
					</Reveal>
					<Reveal delay={150}>
						<h3 className="text-xl font-semibold text-midnight_text">
							Station types
						</h3>
						<p className="mt-2 text-black/70">
							Every sitting includes at least one of each:
						</p>
						<ul className="mt-5 space-y-3">
							{stationTypes.map((station) => (
								<li
									key={station}
									className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 font-medium text-midnight_text"
								>
									<CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
									{station}
								</li>
							))}
						</ul>
					</Reveal>
				</div>
			</Section>

			<Section>
				<div className="container mx-auto max-w-5xl px-6 lg:px-4 grid lg:grid-cols-2 gap-12">
					<Reveal>
						<SectionHeading
							align="left"
							eyebrow="Eligibility"
							title="Who can sit the OSCE?"
						/>
						<p className="mt-6 text-lg text-black/70">
							You must meet these requirements by the eligibility deadline for
							your chosen sitting:
						</p>
					</Reveal>
					<Reveal delay={150}>
						<ul className="space-y-4">
							{eligibility.map((item) => (
								<li key={item} className="flex items-start gap-3 text-black/80">
									<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary text-white">
										<CheckIcon className="h-4 w-4" />
									</span>
									{item}
								</li>
							))}
						</ul>
						<p className="mt-6 text-sm text-black/60">
							Specialist international medical graduates and transitioned
							trainees have variations under ACEM’s regulations.
						</p>
					</Reveal>
				</div>
			</Section>

			<Section tint>
				<div className="container mx-auto max-w-5xl px-6 lg:px-4">
					<Reveal>
						<SectionHeading
							eyebrow="Dates"
							title="Upcoming OSCE sittings"
							description="The application close date is also the withdrawal cut-off, unless exceptional circumstances apply."
						/>
					</Reveal>
					<div className="mt-12 grid md:grid-cols-3 gap-6">
						{sittings.map((s, i) => (
							<Reveal
								key={s.sitting}
								delay={i * 100}
								className="h-full rounded-2xl bg-white p-6 shadow-lg border border-border"
							>
								<p className="text-sm font-semibold uppercase tracking-widest text-primary">
									Sitting {s.sitting}
								</p>
								<p className="mt-2 text-xl font-semibold text-midnight_text">
									{s.dates}
								</p>
								<p className="mt-1 text-black/70">{s.location}</p>
								<dl className="mt-5 space-y-2 text-sm">
									<div className="flex justify-between gap-4">
										<dt className="text-black/60">Applications open</dt>
										<dd className="font-medium text-midnight_text text-right">
											{s.applicationsOpen}
										</dd>
									</div>
									<div className="flex justify-between gap-4">
										<dt className="text-black/60">Applications close</dt>
										<dd className="font-medium text-midnight_text text-right">
											{s.applicationsClose}
										</dd>
									</div>
									<div className="flex justify-between gap-4">
										<dt className="text-black/60">Eligibility deadline</dt>
										<dd className="font-medium text-midnight_text text-right">
											{s.eligibilityDeadline}
										</dd>
									</div>
								</dl>
							</Reveal>
						))}
					</div>
				</div>
			</Section>

			<Faq items={guideFaqs} eyebrow="OSCE FAQ" title="Common questions about the OSCE">
				<p className="mt-10 text-sm text-black/60">
					Source:{" "}
					<a
						href={osceSource.url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-primary hover:underline"
					>
						ACEM Examinations
					</a>
					, last checked {osceSource.lastChecked}. Exam details can change, so
					always confirm with ACEM before applying. Past papers and exam reports
					are on{" "}
					<a
						href={osceSource.resourcesUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="text-primary hover:underline"
					>
						ACEM eLearning
					</a>
					.
				</p>
			</Faq>

			<Section spacing="bottom">
				<div className="container mx-auto max-w-7xl px-6 lg:px-4">
					<Reveal className="rounded-3xl bg-primary px-8 py-14 sm:px-14 text-center text-white">
						<h2 className="text-3xl sm:text-4xl font-semibold">
							Practise under exam conditions
						</h2>
						<p className="mt-4 mx-auto max-w-2xl text-lg text-white/80">
							{inPersonUpcoming
								? `Our next in-person course is on ${nextCourse.date} at the ${nextCourse.venue}`
								: `Our next in-person course dates will be announced soon. Each course runs at the ${nextCourse.venue}`}
							, with trial stations, individual coaching and
							video feedback from FACEM faculty.
						</p>
						<div className="mt-8 flex flex-wrap justify-center gap-4">
							{inPersonUpcoming && (
								<a
									href={site.enrolUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-lg text-primary font-medium hover:bg-tint"
								>
									Enrol now
									<ArrowRightIcon className="h-5 w-5" />
								</a>
							)}
							<Link
								href="/course"
								className={
									inPersonUpcoming
										? "inline-flex items-center px-6 py-3 rounded-lg border border-white text-white hover:bg-white/10"
										: "inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary font-medium hover:bg-tint"
								}
							>
								See course options
							</Link>
						</div>
					</Reveal>
				</div>
			</Section>
		</>
	);
}
