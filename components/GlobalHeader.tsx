import Link from "next/link";
import Logo from "@/components/Logo";
import MobileMenu from "@/components/MobileMenu";
import { getContent, linkHref } from "@/lib/cms";
import { getSchedule } from "@/lib/schedule";

export default async function GlobalHeader() {
	const { header, courseDates } = await getContent();
	const { inPersonUpcoming } = await getSchedule();
	const links = header.menu.map((link) => ({ label: link.label, ...linkHref(link) }));
	// Point at Humanitix while a course is open; otherwise invite people to get in touch.
	const cta = inPersonUpcoming
		? { href: courseDates.bookingUrl, label: header.enrolLabel ?? "", external: true }
		: { href: "/contact", label: header.noDatesLabel ?? "", external: false };

	return (
		<header className="fixed h-24 top-0 py-1 z-50 w-full bg-white/90 backdrop-blur border-b border-border/60 transition-all">
			<div className="container mx-auto max-w-7xl flex items-center justify-between lg:px-4 px-6 py-5">
				<Logo />
				<ul className="hidden lg:flex grow items-center justify-center gap-8">
					{links.map((link) => (
						<li key={link.label}>
							{link.external ? (
								<a
									className="text-base text-black py-2 flex hover:text-primary"
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
								>
									{link.label}
								</a>
							) : (
								<Link
									className="text-base text-black py-2 flex hover:text-primary"
									href={link.href}
								>
									{link.label}
								</Link>
							)}
						</li>
					))}
				</ul>
				<div className="flex items-center gap-2 sm:gap-4">
					{cta.external ? (
						<a
							data-cta="header"
							className="inline-flex min-h-11 items-center bg-primary border border-primary px-4 text-sm sm:text-base rounded-lg text-white hover:bg-primary-dark"
							href={cta.href}
							target="_blank"
							rel="noopener noreferrer"
						>
							{cta.label}
						</a>
					) : (
						<Link
							data-cta="header"
							className="inline-flex min-h-11 items-center bg-primary border border-primary px-4 text-sm sm:text-base rounded-lg text-white hover:bg-primary-dark"
							href={cta.href}
						>
							{cta.label}
						</Link>
					)}
					<MobileMenu links={links} cta={cta} />
				</div>
			</div>
		</header>
	);
}
