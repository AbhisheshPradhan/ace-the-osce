import ContactFormCard from "@/components/ContactFormCard";
import { MailIcon, MapPinIcon } from "@/components/icons";
import { formatAddress, getContent } from "@/lib/cms";

// The contact form, the email and venue boxes beside it, and the map underneath. Shown on
// the Contact and Home pages; wording is in Contact form in Sanity, details in Site settings.
export default async function ContactBlock() {
	const { contactForm, siteSettings } = await getContent();
	const { email, location } = siteSettings;
	const mapQuery = encodeURIComponent(location.mapQuery);

	return (
		<div className="container mx-auto max-w-7xl px-6 lg:px-4">
			<div className="grid lg:grid-cols-5 gap-8">
				<ContactFormCard className="lg:col-span-3" />
				<div className="lg:col-span-2 space-y-6">
					<div className="rounded-3xl bg-tint p-8">
						<span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
							<MailIcon className="h-6 w-6" />
						</span>
						<h2 className="mt-5 text-2xl font-semibold text-midnight_text">
							{contactForm.emailHeading}
						</h2>
						<a
							data-cta="contact_box_email"
							href={`mailto:${email}`}
							className="mt-3 inline-block text-lg font-medium text-primary hover:underline break-all"
						>
							{email}
						</a>
					</div>
					<div className="rounded-3xl bg-tint p-8">
						<span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
							<MapPinIcon className="h-6 w-6" />
						</span>
						<h2 className="mt-5 text-2xl font-semibold text-midnight_text">
							{contactForm.venueHeading}
						</h2>
						<p className="mt-2 font-medium text-midnight_text">{location.name}</p>
						<p className="mt-1 text-black/70">{formatAddress(location)}</p>
						<a
							href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
							target="_blank"
							rel="noopener noreferrer"
							className="mt-5 inline-block font-medium text-primary hover:underline"
						>
							{contactForm.mapLinkLabel}
						</a>
					</div>
				</div>
			</div>
			<div className="mt-8 h-96 lg:h-112 overflow-hidden rounded-3xl border border-border">
				<iframe
					title={`Map of ${location.name}`}
					src={`https://maps.google.com/maps?q=${mapQuery}&z=16&output=embed`}
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					className="h-full w-full"
				/>
			</div>
		</div>
	);
}
