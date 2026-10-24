import Link from "next/link";

export default function PageHero({
	title,
	description,
}: {
	title: string;
	description?: string;
}) {
	return (
		<section className="bg-linear-to-b from-tint to-white pt-36 pb-16 lg:pt-44 lg:pb-20">
			<div className="container mx-auto max-w-7xl px-6 lg:px-4 text-center">
				<nav aria-label="Breadcrumb" className="text-sm text-black/60">
					<Link href="/" className="hover:text-primary">
						Home
					</Link>
					<span className="mx-2">/</span>
					<span className="text-midnight_text">{title}</span>
				</nav>
				<h1 className="mt-4 text-4xl sm:text-5xl font-bold text-midnight_text">
					{title}
				</h1>
				{description && (
					<p className="mt-6 mx-auto max-w-3xl text-lg text-black/60">
						{description}
					</p>
				)}
			</div>
		</section>
	);
}
