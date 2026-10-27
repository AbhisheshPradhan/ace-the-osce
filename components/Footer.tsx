import Link from "next/link";
import Logo from "@/components/Logo";
import { MailIcon, MapPinIcon } from "@/components/icons";
import { formatAddress, getContent, linkHref } from "@/lib/cms";
import { buildYear } from "@/lib/schedule";

const linkClass =
	"text-base text-black/70 hover:text-primary pb-1";

export default async function Footer() {
	const { footer, siteSettings } = await getContent();
	const { email, location, siteName } = siteSettings;

	return (
		<footer className="border-t border-footer_stroke">
			<div className="container mx-auto max-w-7xl px-6 lg:px-4">
				<div className="grid grid-cols-12 gap-8 lg:pt-24 pt-16 sm:pb-14 pb-10 border-b border-solid border-footer_stroke">
					<div className="md:col-span-5 col-span-12">
						<Logo />
						<p className="text-base font-normal text-black/70 max-w-29 pt-6">
							{footer.tagline}
						</p>
					</div>
					<div className="md:col-span-3 sm:col-span-6 col-span-12">
						<h2 className="pb-3 text-lg font-medium text-midnight_text">
							{footer.linksHeading}
						</h2>
						<ul>
							{footer.links.map((link) => {
								const { href, external } = linkHref(link);
								return (
									<li key={link.label} className={linkClass}>
										{external ? (
											<a href={href} target="_blank" rel="noopener noreferrer">
												{link.label}
											</a>
										) : (
											<Link href={href}>{link.label}</Link>
										)}
									</li>
								);
							})}
						</ul>
					</div>
					<div className="md:col-span-4 sm:col-span-6 col-span-12">
						<h2 className="pb-3 text-lg font-medium text-midnight_text">
							{footer.contactHeading}
						</h2>
						<ul className="space-y-3">
							<li className="flex items-start gap-3">
								<MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
								<a
									data-cta="footer_email"
									href={`mailto:${email}`}
									className="text-black/70 hover:text-primary break-all"
								>
									{email}
								</a>
							</li>
							<li className="flex items-start gap-3 text-black/70">
								<MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
								<span>
									{location.name}, {formatAddress(location)}
								</span>
							</li>
						</ul>
					</div>
				</div>
				<div className="flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-black/70">
					<p>
						Copyright © {buildYear} {siteName}
					</p>
					<Link href="/privacy" className="hover:text-primary">
						{footer.privacyLinkLabel}
					</Link>
				</div>
			</div>
		</footer>
	);
}
