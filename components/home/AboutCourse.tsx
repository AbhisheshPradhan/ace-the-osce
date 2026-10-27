import Image from "next/image";
import Link from "next/link";
import PortableText from "@/components/PortableText";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { getContent, imageUrl } from "@/lib/cms";

export default async function AboutCourse() {
	const { homePage } = await getContent();
	const { heading, body, points, linkLabel, image } = homePage.about;

	return (
		<Section>
			<div className="container mx-auto max-w-7xl px-6 lg:px-4 grid lg:grid-cols-2 gap-12 items-center">
				<Reveal>
					<SectionHeading align="left" eyebrow={heading.eyebrow} title={heading.title} />
					<div className="mt-6 space-y-4 text-lg text-black/60">
						<PortableText value={body} />
					</div>
					{points && (
						<ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-4">
							{points.map((point) => (
								<li
									key={point}
									className="flex items-start gap-3 font-medium text-midnight_text"
								>
									<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary text-white">
										<CheckIcon className="h-4 w-4" />
									</span>
									{point}
								</li>
							))}
						</ul>
					)}
					{linkLabel && (
						<Link
							data-cta="about_course_more"
							href="/about-us"
							className="mt-8 inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
						>
							{linkLabel}
							<ArrowRightIcon className="h-5 w-5" />
						</Link>
					)}
				</Reveal>
				{/* No Reveal and not lazy: on desktop the top of this photo is in the first screen and
				    can be the LCP. */}
				<div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-2xl">
					<Image
						src={imageUrl(image, { width: 1200, height: 900 })}
						alt={image.alt}
						fill
						loading="eager"
						sizes="(min-width: 1024px) 50vw, 100vw"
						className="object-cover"
					/>
				</div>
			</div>
		</Section>
	);
}
