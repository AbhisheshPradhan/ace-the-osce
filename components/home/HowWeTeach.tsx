import Image from "next/image";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { CheckIcon } from "@/components/icons";
import { getContent, imageUrl } from "@/lib/cms";

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
				{/* Flex rather than grid so a short last row is centred. */}
				<ul className="mt-14 flex flex-wrap justify-center gap-6">
					{teaching.items.map((item, i) => (
						<li
							key={item.title}
							className="w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
						>
							<Reveal delay={i * 100} className="h-full overflow-hidden rounded-2xl bg-tint">
								{item.image ? (
									<div className="relative aspect-4/3">
										<Image
											src={imageUrl(item.image, { width: 800, height: 600 })}
											alt={item.image.alt}
											fill
											sizes="(min-width: 1280px) 400px, (min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
											className="object-cover"
										/>
									</div>
								) : (
									<span className="mx-6 mt-6 flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary">
										<CheckIcon className="h-5 w-5" />
									</span>
								)}
								<div className="p-6">
									<h3 className="text-xl font-semibold text-midnight_text">{item.title}</h3>
									{item.description && <p className="mt-2 text-black/70">{item.description}</p>}
								</div>
							</Reveal>
						</li>
					))}
				</ul>
			</div>
		</Section>
	);
}
