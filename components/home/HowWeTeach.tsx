import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { CheckIcon } from "@/components/icons";
import { getContent } from "@/lib/cms";

// The Course page: the teaching methods (from The Course → How we teach in Sanity). Hidden
// while the list is empty.
export default async function HowWeTeach() {
	const { teaching } = (await getContent()).coursePage;
	if (!teaching?.items?.length) return null;

	return (
		<Section>
			<div className="container mx-auto max-w-7xl px-6 lg:px-4">
				<Reveal>
					<SectionHeading
						eyebrow={teaching.heading.eyebrow}
						title={teaching.heading.title}
						description={teaching.heading.description}
					/>
				</Reveal>
				<ul className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{teaching.items.map((item, i) => (
						<li key={item.title}>
							<Reveal delay={i * 100} className="h-full rounded-2xl bg-tint p-6">
								<span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary">
									<CheckIcon className="h-5 w-5" />
								</span>
								<h3 className="mt-4 text-xl font-semibold text-midnight_text">{item.title}</h3>
								{item.description && <p className="mt-2 text-black/70">{item.description}</p>}
							</Reveal>
						</li>
					))}
				</ul>
			</div>
		</Section>
	);
}
