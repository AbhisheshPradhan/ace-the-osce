import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

const pillars = [
	"Boutique, high-yield course",
	"Small groups with a high teacher-to-participant ratio",
	"Highly personalised feedback",
	"Experienced FACEM faculty",
];

export default function AboutCourse() {
	return (
		<Section>
			<div className="container mx-auto max-w-7xl px-6 lg:px-4 grid lg:grid-cols-2 gap-12 items-center">
				<Reveal>
					<SectionHeading
						align="left"
						eyebrow="About our course"
						title="Helping ACEM candidates pass the OSCE since 2016"
					/>
					<p className="mt-6 text-lg text-black/60">
						Since 2016, Ace the OSCE has helped hundreds of ACEM fellowship
						candidates across Australia and New Zealand succeed in one of the
						most challenging parts of their training—the OSCE. Our boutique,
						high-yield course is designed specifically to give candidates the
						edge they need.
					</p>
					<p className="mt-4 text-lg text-black/60">
						The course combines expert guidance with highly personalised
						feedback in a supportive, high-teacher-to-participant environment.
					</p>
					<ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-4">
						{pillars.map((pillar) => (
							<li
								key={pillar}
								className="flex items-start gap-3 font-medium text-midnight_text"
							>
								<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary text-white">
									<CheckIcon className="h-4 w-4" />
								</span>
								{pillar}
							</li>
						))}
					</ul>
					<Link
						href="/about-us"
						className="mt-8 inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
					>
						More about us
						<ArrowRightIcon className="h-5 w-5" />
					</Link>
				</Reveal>
				<Reveal
					delay={150}
					className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-2xl"
				>
					<Image
						src="/images/communication-station-laura.jpg"
						alt="Dr Laura Brown and a candidate during a communication station in the simulation room"
						fill
						sizes="(min-width: 1024px) 50vw, 100vw"
						className="object-cover"
					/>
				</Reveal>
			</div>
		</Section>
	);
}
