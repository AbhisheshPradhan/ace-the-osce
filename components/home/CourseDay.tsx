import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { CheckIcon } from "@/components/icons";
import { courseDay, curriculum } from "@/lib/content";

export default function CourseDay() {
	return (
		<Section>
			<div className="container mx-auto max-w-7xl px-6 lg:px-4">
				<Reveal>
					<SectionHeading
						eyebrow="How it works"
						title="Your course, from start to finish"
						description="Support before, during and after the in-person day."
					/>
				</Reveal>
				<ol className="relative mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Connector from the first step's circle to the last (circles are 2.5rem, gaps 2rem). */}
					<div
						aria-hidden="true"
						className="absolute top-5 left-5 right-[calc((100%-6rem)/4-1.25rem)] hidden h-0.5 bg-primary/20 lg:block"
					/>
					{courseDay.map((item, i) => (
						<li key={item.step} className="relative">
							<Reveal delay={i * 100} className="h-full">
								<div className="flex items-center gap-3">
									<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white font-semibold ring-8 ring-white">
										{i + 1}
									</span>
									<span className="bg-white pr-2 text-sm font-semibold uppercase tracking-widest text-primary">
										{item.step}
									</span>
								</div>
								<h3 className="mt-5 text-xl font-semibold text-midnight_text">
									{item.title}
								</h3>
								<p className="mt-2 text-black/70">{item.description}</p>
							</Reveal>
						</li>
					))}
				</ol>
				<Reveal className="mt-16 rounded-3xl bg-tint p-8 sm:p-10">
					<h3 className="text-xl font-semibold text-midnight_text">
						What we cover
					</h3>
					<ul className="mt-5 flex flex-wrap gap-3">
						{curriculum.map((topic) => (
							<li
								key={topic}
								className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-medium text-midnight_text"
							>
								<CheckIcon className="h-4 w-4 shrink-0 text-primary" />
								{topic}
							</li>
						))}
					</ul>
				</Reveal>
			</div>
		</Section>
	);
}
