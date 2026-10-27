import type { Metadata } from "next";
import Link from "next/link";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import PortableText from "@/components/PortableText";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { getContent, imageUrl } from "@/lib/cms";
import { site } from "@/lib/site";
import { getSchedule } from "@/lib/schedule";

export async function generateMetadata(): Promise<Metadata> {
	const { osceGuidePage, siteSettings } = await getContent();
	const { title, description } = osceGuidePage.seo ?? {};
	const { shareImage } = siteSettings;
	return {
		title,
		description,
		alternates: { canonical: "/acem-osce/" },
		openGraph: {
			title,
			description,
			type: "article",
			...(shareImage && {
				images: [
					{
						url: imageUrl(shareImage, { width: 1200, height: 630, format: "jpg" }),
						width: 1200,
						height: 630,
						alt: shareImage.alt,
					},
				],
			}),
		},
	};
}

export default async function AcemOsceGuide() {
	const { courseDates, osceGuidePage, siteSettings } = await getContent();
	const { hero, keyFacts, format, eligibility, sittings, faq, source, banner, seo } =
		osceGuidePage;
	const { inPersonUpcoming } = await getSchedule();
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: seo?.title,
		description: seo?.description,
		dateModified: source.lastChecked,
		author: { "@type": "Organization", name: siteSettings.siteName, url: site.url },
		publisher: { "@type": "Organization", name: siteSettings.siteName, url: site.url },
		mainEntityOfPage: `${site.url}/acem-osce/`,
		citation: source.url,
	};

	return (
		<>
			<JsonLd data={structuredData} />
			<PageHero title={hero.title} description={hero.description} />

			<Section>
				<div className="container mx-auto max-w-5xl px-6 lg:px-4">
					<Reveal>
						<SectionHeading
							eyebrow={keyFacts.heading.eyebrow}
							title={keyFacts.heading.title}
							description={keyFacts.heading.description}
						/>
					</Reveal>
					<div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
						{keyFacts.facts.map((fact, i) => (
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
						<SectionHeading
							align="left"
							eyebrow={format.heading.eyebrow}
							title={format.heading.title}
						/>
						<div className="mt-6 space-y-4 text-lg text-black/70">
							<PortableText value={format.body} />
						</div>
					</Reveal>
					<Reveal delay={150}>
						<h3 className="text-xl font-semibold text-midnight_text">
							{format.stationTypesHeading}
						</h3>
						<p className="mt-2 text-black/70">{format.stationTypesIntro}</p>
						<ul className="mt-5 space-y-3">
							{format.stationTypes.map((station) => (
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
							eyebrow={eligibility.heading.eyebrow}
							title={eligibility.heading.title}
						/>
						{eligibility.heading.description && (
							<p className="mt-6 text-lg text-black/70">
								{eligibility.heading.description}
							</p>
						)}
					</Reveal>
					<Reveal delay={150}>
						<ul className="space-y-4">
							{eligibility.requirements.map((item) => (
								<li key={item} className="flex items-start gap-3 text-black/80">
									<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary text-white">
										<CheckIcon className="h-4 w-4" />
									</span>
									{item}
								</li>
							))}
						</ul>
						{eligibility.note && (
							<p className="mt-6 text-sm text-black/60">{eligibility.note}</p>
						)}
					</Reveal>
				</div>
			</Section>

			<Section tint>
				<div className="container mx-auto max-w-5xl px-6 lg:px-4">
					<Reveal>
						<SectionHeading
							eyebrow={sittings.heading.eyebrow}
							title={sittings.heading.title}
							description={sittings.heading.description}
						/>
					</Reveal>
					<div className="mt-12 grid md:grid-cols-3 gap-6">
						{sittings.items.map((s, i) => (
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

			<Faq items={faq.items} eyebrow={faq.heading.eyebrow} title={faq.heading.title}>
				<div className="mt-10 text-sm text-black/60">
					<PortableText value={source.note} />
				</div>
			</Faq>


			<Section spacing="bottom">
				<div className="container mx-auto max-w-7xl px-6 lg:px-4">
					<Reveal className="rounded-3xl bg-primary px-8 py-14 sm:px-14 text-center text-white">
						<h2 className="text-3xl sm:text-4xl font-semibold">{banner.heading}</h2>
						<div className="mt-4 mx-auto max-w-2xl text-lg text-white/80">
							<PortableText value={inPersonUpcoming ? banner.textUpcoming : banner.textNoDates} />
						</div>
						<div className="mt-8 flex flex-wrap justify-center gap-4">
							{inPersonUpcoming && (
								<a
									data-cta="osce_guide_banner_enrol"
									href={courseDates.bookingUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-lg text-primary font-medium hover:bg-tint"
								>
									{banner.enrolLabel}
									<ArrowRightIcon className="h-5 w-5" />
								</a>
							)}
							<Link
								data-cta="osce_guide_banner_course"
								href="/course"
								className={
									inPersonUpcoming
										? "inline-flex items-center px-6 py-3 rounded-lg border border-white text-white hover:bg-white/10"
										: "inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary font-medium hover:bg-tint"
								}
							>
								{banner.courseLinkLabel}
							</Link>
						</div>
					</Reveal>
				</div>
			</Section>
		</>
	);
}
