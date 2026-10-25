import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import { ArrowRightIcon } from "@/components/icons";
import { getContent, linkHref } from "@/lib/cms";

export const metadata: Metadata = {
	title: "Page not found",
	robots: { index: false },
};

export default async function NotFound() {
	const { notFoundPage } = await getContent();

	return (
		<Section className="pt-36 lg:pt-44">
			<div className="container mx-auto max-w-3xl px-6 lg:px-4 text-center">
				<p className="text-sm font-semibold uppercase tracking-widest text-primary">
					404
				</p>
				<h1 className="mt-3 text-4xl sm:text-5xl font-bold text-midnight_text">
					{notFoundPage.heading}
				</h1>
				{notFoundPage.text && (
					<p className="mt-6 text-lg text-black/70">{notFoundPage.text}</p>
				)}
				{notFoundPage.suggestions && (
					<ul className="mt-12 grid sm:grid-cols-3 gap-6 text-left">
						{notFoundPage.suggestions.map(({ link, description }) => {
							const { href, external } = linkHref(link);
							return (
								<li key={link.label}>
									<Link
										href={href}
										{...(external && { target: "_blank", rel: "noopener noreferrer" })}
										className="group flex h-full flex-col rounded-2xl bg-tint p-6 hover:bg-primary/10"
									>
										<span className="flex items-center gap-2 text-lg font-semibold text-midnight_text">
											{link.label}
											<ArrowRightIcon className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
										</span>
										{description && (
											<span className="mt-2 text-black/70">{description}</span>
										)}
									</Link>
								</li>
							);
						})}
					</ul>
				)}
				<Link
					href="/"
					className="mt-12 inline-flex items-center gap-2 bg-primary border border-primary px-6 py-3 rounded-lg text-white hover:bg-primary-dark"
				>
					{notFoundPage.homeButtonLabel}
				</Link>
			</div>
		</Section>
	);
}
