import type { Metadata } from "next";
import Image from "next/image";
import CallToAction from "@/components/CallToAction";
import FacultyCard from "@/components/FacultyCard";
import OpenTargetedBio from "@/components/OpenTargetedBio";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { faculty } from "@/lib/content";

export const metadata: Metadata = {
	title: "About Us and Our Faculty",
	description:
		"Since 2016, Ace the OSCE has helped hundreds of ACEM fellowship candidates across Australia and New Zealand prepare for the OSCE. Meet our FACEM faculty.",
	alternates: { canonical: "/about-us/" },
};

const directors = faculty.filter((member) => member.role);
const team = faculty.filter((member) => !member.role);
const cardSizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw";

export default function AboutUs() {
	return (
		<>
			<PageHero
				title="About Us"
				description="Your ultimate preparation for the ACEM Fellowship Exam."
			/>
			<Section>
				<div className="container mx-auto max-w-7xl px-6 lg:px-4 grid lg:grid-cols-2 gap-12 items-center">
					<div className="space-y-6 text-lg text-black/70">
						<p>
							Since 2016, Ace the OSCE has helped hundreds of ACEM fellowship
							candidates across Australia and New Zealand succeed in one of the
							most challenging parts of their training—the OSCE.
						</p>
						<p>
							Our boutique, high-yield course is designed specifically to give
							candidates the edge they need. The course combines expert guidance
							with highly personalised feedback in a supportive,
							high-teacher-to-participant environment.
						</p>
						<p>
							With small group sizes, individualised attention, and a track
							record of success, Ace the OSCE isn’t just another prep
							course—it’s your personalised path to passing the OSCE with
							confidence.
						</p>
					</div>
					<Reveal className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-2xl">
						<Image
							src="/images/simulation-training.jpeg"
							alt="Emergency team running a resuscitation simulation on a manikin while a colleague holds up a “Quiet please” sign"
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
							eyebrow="Our team"
							title="Course directors"
							description="The founding team behind Ace the OSCE."
						/>
					</Reveal>
					<div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
						{directors.map((member, i) => (
							<Reveal key={member.name} delay={i * 100}>
								<FacultyCard member={member} sizes={cardSizes} showBio />
							</Reveal>
						))}
					</div>
					<Reveal className="mt-20">
						<SectionHeading
							title="Faculty"
							description="Emergency physicians and educators who coach at our courses."
						/>
					</Reveal>
					<div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
						{team.map((member, i) => (
							<Reveal key={member.name} delay={(i % 4) * 100}>
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
