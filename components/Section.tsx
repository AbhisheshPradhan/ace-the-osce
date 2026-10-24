// Shared vertical rhythm for page sections. Alternate `tint` between neighbours so
// each section is marked by a soft band of colour rather than a doubled gap.
export default function Section({
	tint = false,
	spacing = "both",
	id,
	className = "",
	children,
}: {
	tint?: boolean;
	spacing?: "both" | "bottom";
	id?: string;
	className?: string;
	children: React.ReactNode;
}) {
	const padding = spacing === "both" ? "py-14 lg:py-24" : "pb-14 lg:pb-24";

	return (
		<section
			id={id}
			className={`${padding} ${tint ? "bg-linear-to-b from-white via-tint to-white" : ""} ${className}`}
		>
			{children}
		</section>
	);
}
