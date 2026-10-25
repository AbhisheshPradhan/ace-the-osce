import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import RichText from "@/components/RichText";
import Section from "@/components/Section";
import { site } from "@/lib/content";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description: `How ${site.name} collects, uses and protects your personal information.`,
	alternates: { canonical: "/privacy/" },
};

const lastUpdated = "25 October 2026";

const sections = [
	{
		heading: "What we collect",
		body: [
			"When you use our contact form, we collect your name, email address, the OSCE sitting you are preparing for (if you choose to tell us) and your message.",
			"Course bookings and payments are handled by Humanitix, not by this website. Humanitix’s own privacy policy applies to the information you give them.",
		],
	},
	{
		heading: "How we use it",
		body: [
			"We use your contact details only to reply to your enquiry and, if you ask, to tell you about upcoming courses.",
			"We do not sell or rent your personal information, and we do not use it for unrelated marketing.",
		],
	},
	{
		heading: "How it is stored",
		body: [
			`Messages sent through our contact form are delivered by our email provider, Resend, to the ${site.name} email inbox. Resend may store information outside Australia.`,
			"We keep enquiry emails only as long as we need them to respond and to run our courses.",
		],
	},
	{
		heading: "Your choices",
		body: [
			"You can ask us to see, correct or delete the personal information we hold about you by emailing us.",
		],
	},
	{
		heading: "Contact us",
		body: [
			`If you have a question or concern about privacy, email ${site.email}. We aim to handle privacy matters in line with the Australian Privacy Principles.`,
		],
	},
];

export default function PrivacyPolicy() {
	return (
		<>
			<PageHero
				title="Privacy Policy"
				description={`Last updated ${lastUpdated}`}
			/>
			<Section>
				<div className="container mx-auto max-w-3xl px-6 lg:px-4 space-y-12">
					{sections.map((section) => (
						<div key={section.heading}>
							<h2 className="text-2xl font-semibold text-midnight_text">
								{section.heading}
							</h2>
							<div className="mt-4 space-y-4 text-lg text-black/70">
								{section.body.map((paragraph) => (
									<p key={paragraph}>
										<RichText text={paragraph} />
									</p>
								))}
							</div>
						</div>
					))}
				</div>
			</Section>
		</>
	);
}
