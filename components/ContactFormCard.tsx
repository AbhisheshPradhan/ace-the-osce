import ContactForm from "@/components/ContactForm";
import { getContent } from "@/lib/cms";

// The contact form in its card, as shown on the Contact and Home pages. Wording comes from
// Contact form in Sanity; the "Which sitting?" choices from the OSCE Guide's sittings.
export default async function ContactFormCard({ className = "" }: { className?: string }) {
	const { contactForm, osceGuidePage } = await getContent();
	// Only the form's own wording goes to the browser: the rich-text error messages stay on the
	// server (the action sends them as text) and the box labels are used by ContactBlock.
	const {
		heading,
		intro,
		/* eslint-disable @typescript-eslint/no-unused-vars */
		sendError,
		unavailableError,
		emailHeading,
		venueHeading,
		mapLinkLabel,
		/* eslint-enable @typescript-eslint/no-unused-vars */
		...text
	} = contactForm;

	return (
		<div className={`rounded-3xl border border-border bg-white p-8 sm:p-10 shadow-lg ${className}`}>
			{heading && <h2 className="text-2xl font-semibold text-midnight_text">{heading}</h2>}
			{intro && <p className="mt-2 mb-8 text-black/70">{intro}</p>}
			<ContactForm
				sittings={osceGuidePage.sittings.items.map((s) => s.sitting)}
				text={text}
			/>
		</div>
	);
}
