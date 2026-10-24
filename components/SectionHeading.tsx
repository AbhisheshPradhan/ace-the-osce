export default function SectionHeading({
	eyebrow,
	title,
	description,
	align = "center",
}: {
	eyebrow?: string;
	title: string;
	description?: string;
	align?: "center" | "left";
}) {
	const alignment = align === "center" ? "text-center mx-auto" : "text-left";

	return (
		<div className={`max-w-2xl ${alignment}`}>
			{eyebrow && (
				<p className="text-primary text-sm font-semibold uppercase tracking-widest">
					{eyebrow}
				</p>
			)}
			<h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-midnight_text">
				{title}
			</h2>
			{description && (
				<p className="mt-4 text-lg text-black/60">
					{description}
				</p>
			)}
		</div>
	);
}
