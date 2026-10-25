import PortableText from "@/components/PortableText";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { StarIcon } from "@/components/icons";
import { getContent } from "@/lib/cms";

export default async function Testimonials() {
	const { testimonialsSection } = await getContent();
	const { heading, items } = testimonialsSection;

	return (
		<Section tint>
			<div className="container mx-auto max-w-7xl px-6 lg:px-4">
				<Reveal>
					<SectionHeading
						eyebrow={heading.eyebrow}
						title={heading.title}
						description={heading.description}
					/>
				</Reveal>
				<div className="mt-14 grid md:grid-cols-3 gap-8">
					{items.map((testimonial, i) => {
						const { rating } = testimonial;
						return (
							<Reveal key={testimonial._id} delay={(i % 3) * 150}>
								<figure className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-lg border border-border">
									{rating && (
										<div
											className="mb-6 flex gap-1 text-yellow-500"
											role="img"
											aria-label={`Rated ${rating} out of 5`}
										>
											{Array.from({ length: 5 }, (_, j) => (
												<StarIcon
													key={j}
													className={`h-5 w-5 ${j < rating ? "" : "text-black/15"}`}
												/>
											))}
										</div>
									)}
									<blockquote className="flex-1 text-lg text-black/70">
										“<PortableText value={testimonial.quote} inline />”
									</blockquote>
									<figcaption className="mt-6 font-medium text-midnight_text">
										{testimonial.attribution}
									</figcaption>
								</figure>
							</Reveal>
						);
					})}
				</div>
			</div>
		</Section>
	);
}
