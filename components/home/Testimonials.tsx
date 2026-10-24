import Reveal from "@/components/Reveal";
import RichText from "@/components/RichText";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { StarIcon } from "@/components/icons";
import { testimonials } from "@/lib/content";

export default function Testimonials() {
	return (
		<Section tint>
			<div className="container mx-auto max-w-7xl px-6 lg:px-4">
				<Reveal>
					<SectionHeading
						eyebrow="Testimonials"
						title="What our participants say"
					/>
				</Reveal>
				<div className="mt-14 grid md:grid-cols-3 gap-8">
					{testimonials.map((testimonial, i) => (
						<Reveal key={testimonial.quote} delay={i * 150}>
							<figure className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-lg border border-border">
								<div
									className="flex gap-1 text-yellow-500"
									role="img"
									aria-label="Rated 5 out of 5"
								>
									{Array.from({ length: 5 }, (_, j) => (
										<StarIcon key={j} className="h-5 w-5" />
									))}
								</div>
								<blockquote className="mt-6 flex-1 text-lg text-black/70">
									“<RichText text={testimonial.quote} />”
								</blockquote>
								<figcaption className="mt-6 font-medium text-midnight_text">
									{testimonial.attribution}
								</figcaption>
							</figure>
						</Reveal>
					))}
				</div>
			</div>
		</Section>
	);
}
