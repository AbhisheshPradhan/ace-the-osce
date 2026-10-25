import type { Metadata } from "next";
import Image from "next/image";
import CallToAction from "@/components/CallToAction";
import FacultyCard from "@/components/FacultyCard";
import OpenTargetedBio from "@/components/OpenTargetedBio";
import PageHero from "@/components/PageHero";
import PortableText from "@/components/PortableText";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { getContent, imageUrl } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
	const { aboutPage } = await getContent();
	return {
		title: aboutPage.seo?.title,
		description: aboutPage.seo?.description,
		alternates: { canonical: "/about-us/" },
	};
}

const cardSizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw";

export default async function AboutUs() {
	const { aboutPage } = await getContent();
	const { hero, intro, directors, faculty } = aboutPage;

	return (
		<>
			<PageHero title={hero.title} description={hero.description} />
			<Section>
				<div className="container mx-auto max-w-7xl px-6 lg:px-4 grid lg:grid-cols-2 gap-12 items-center">
					<div className="space-y-6 text-lg text-black/70">
						<PortableText value={intro.body} />
					</div>
					<Reveal className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-2xl">
						<Image
							src={imageUrl(intro.image, { width: 1200, height: 900 })}
							alt={intro.image.alt}
							fill
							sizes="(min-width: 1024px) 50vw, 100vw"
							className="object-cover"
						/>
					</Reveal>
				</div>
			</Section>
			<Section tint>
				<div className="container mx-auto max-w-7xl px-6 lg:px-4">
					<Reveal>
						<SectionHeading
							eyebrow={directors.heading.eyebrow}
							title={directors.heading.title}
							description={directors.heading.description}
						/>
					</Reveal>
					<div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
						{directors.members.map((member, i) => (
							<Reveal key={member._id} delay={i * 100}>
								<FacultyCard member={member} sizes={cardSizes} showBio />
							</Reveal>
						))}
					</div>
					<Reveal className="mt-20">
						<SectionHeading
							eyebrow={faculty.heading.eyebrow}
							title={faculty.heading.title}
							description={faculty.heading.description}
						/>
					</Reveal>
					<div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
						{faculty.members.map((member, i) => (
							<Reveal key={member._id} delay={(i % 4) * 100}>
								<FacultyCard member={member} sizes={cardSizes} showBio />
							</Reveal>
						))}
					</div>
				</div>
			</Section>
			<CallToAction />
			<OpenTargetedBio />
		</>
	);
}
