import Reveal from "@/components/Reveal";
import RichText from "@/components/RichText";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";

export default function Faq({
	items,
	eyebrow = "FAQ",
	tint = false,
	title = "Frequently asked questions",
	children,
}: {
	items: { question: string; answer: string }[];
	eyebrow?: string;
	tint?: boolean;
	title?: string;
	children?: React.ReactNode;
}) {
	return (
		<Section tint={tint}>
			<div className="container mx-auto max-w-3xl px-6 lg:px-4">
				<Reveal>
					<SectionHeading eyebrow={eyebrow} title={title} />
				</Reveal>
				<div className="mt-12 space-y-4">
					{items.map((item) => (
						<details
							key={item.question}
							className={`group rounded-2xl ${tint ? "bg-white" : "bg-tint"}`}
						>
							{/* The whole header row, padding and toggle included, opens the answer. */}
							<summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-5 text-lg font-medium text-midnight_text [&::-webkit-details-marker]:hidden">
								{item.question}
								<span
									aria-hidden="true"
									className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl leading-none text-primary transition-transform group-open:rotate-45"
								>
									+
								</span>
							</summary>
							<p className="px-6 pb-5 text-black/70">
								<RichText text={item.answer} />
							</p>
						</details>
					))}
				</div>
				{children}
			</div>
		</Section>
	);
}
