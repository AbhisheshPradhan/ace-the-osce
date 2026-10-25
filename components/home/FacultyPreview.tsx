import Link from "next/link";
import FacultyCard from "@/components/FacultyCard";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRightIcon } from "@/components/icons";
import { getContent } from "@/lib/cms";

export default async function FacultyPreview() {
	const { homePage } = await getContent();
	const { heading, members, linkLabel } = homePage.facultyPreview;

	return (
		<Section>
			<div className="container mx-auto max-w-7xl px-6 lg:px-4">
				<Reveal>
					<SectionHeading
						eyebrow={heading.eyebrow}
						title={heading.title}
						description={heading.description}
					/>
				</Reveal>
				<div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{members.map((member, i) => (
						<Reveal key={member._id} delay={i * 100}>
							<FacultyCard
								member={member}
								sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
							/>
						</Reveal>
					))}
				</div>
				<Reveal className="mt-12 text-center">
					<Link
						href="/about-us"
						className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white"
					>
						{linkLabel}
						<ArrowRightIcon className="h-5 w-5" />
					</Link>
				</Reveal>
			</div>
		</Section>
	);
}
