import content from "@/content/site-content.json";

// Content edited in Sanity (studio/), fetched into content/site-content.json by
// scripts/fetch-content.mjs before every build. These types mirror the Studio schema in
// studio/schemaTypes; references are already resolved to the documents they point to.

export type SanityImage = {
	asset: { url: string; width: number; height: number };
	hotspot?: { x: number; y: number };
	crop?: { top: number; bottom: number; left: number; right: number };
};
export type ImageWithAlt = SanityImage & { alt: string };

export type Faculty = {
	_id: string;
	name: string;
	role?: string;
	credentials?: string;
	photo?: ImageWithAlt;
	bio: string;
};

export type Span = {
	_type: "span";
	_key: string;
	text: string;
	marks: string[];
};
export type LiveValue = {
	_type: "contactEmail" | "nextCourseDate" | "nextCourseVenue";
	_key: string;
};
export type MarkDef =
	| { _type: "link"; _key: string; href: string }
	| { _type: "facultyLink"; _key: string; faculty: Faculty };
export type Block = {
	_type: "block";
	_key: string;
	style: "normal";
	markDefs: MarkDef[];
	children: (Span | LiveValue)[];
};
export type RichText = Block[];

export type Link = { label: string; page?: string; url?: string };
export type SectionHeading = {
	eyebrow?: string;
	title: string;
	description?: string;
};
export type PageHero = { title: string; description?: string };
export type Seo = { title?: string; description?: string };
export type FaqItem = { question: string; answer: RichText };

export type CourseDates = { startDate: string; endDate: string };

// The text on a course card. Dates and the booking link are in Content["courseDates"].
export type Course = {
	title: string;
	venue: string;
	description: RichText;
	highlights?: string[];
	ctaLabel: string;
	image: ImageWithAlt;
};

export type Testimonial = {
	_id: string;
	quote: RichText;
	attribution: string;
	rating?: number;
};

export type Content = {
	courseDates: { bookingUrl: string; inPerson: CourseDates; taster: CourseDates };
	inPersonCourse: Course;
	eveningTaster: Course;
	homePage: {
		seo?: Seo;
		hero: {
			eyebrow?: string;
			heading: string;
			subheading?: string;
			paymentNote?: string;
			tasterLabel?: string;
			noDatesText?: string;
			noDatesButtonLabel?: string;
			detailsButtonLabel?: string;
			image: ImageWithAlt;
			topImage?: ImageWithAlt;
			sideImage?: ImageWithAlt;
			cornerImage?: ImageWithAlt;
			stats?: { value: string; label: string }[];
		};
		about: {
			heading: SectionHeading;
			body: RichText;
			points?: string[];
			linkLabel?: string;
			image: ImageWithAlt;
		};
		facultyPreview: {
			heading: SectionHeading;
			members: Faculty[];
			linkLabel?: string;
		};
	};
	coursePage: {
		seo?: Seo;
		hero: PageHero;
		howItWorks: {
			heading: SectionHeading;
			steps: { step: string; title: string; description: string }[];
			topicsHeading?: string;
			topics?: string[];
		};
		faq: {
			heading: SectionHeading;
			items: FaqItem[];
			guideLinkIntro?: string;
			guideLinkLabel?: string;
		};
	};
	osceGuidePage: {
		seo?: Seo;
		hero: PageHero;
		keyFacts: {
			heading: SectionHeading;
			facts: { value: string; label: string }[];
		};
		format: {
			heading: SectionHeading;
			body: RichText;
			stationTypesHeading?: string;
			stationTypesIntro?: string;
			stationTypes: string[];
		};
		eligibility: {
			heading: SectionHeading;
			requirements: string[];
			note?: string;
		};
		sittings: {
			heading: SectionHeading;
			items: {
				sitting: string;
				dates: string;
				location: string;
				applicationsOpen: string;
				applicationsClose: string;
				eligibilityDeadline: string;
			}[];
		};
		faq: { heading: SectionHeading; items: FaqItem[] };
		source: { note: RichText; url: string; lastChecked: string };
		banner: {
			heading: string;
			textUpcoming: RichText;
			textNoDates: RichText;
			enrolLabel?: string;
			courseLinkLabel?: string;
		};
	};
	aboutPage: {
		seo?: Seo;
		hero: PageHero;
		intro: { body: RichText; image: ImageWithAlt };
		directors: { heading: SectionHeading; members: Faculty[] };
		faculty: { heading: SectionHeading; members: Faculty[] };
	};
	contactPage: {
		seo?: Seo;
		hero: PageHero;
	};
	privacyPage: {
		seo?: Seo;
		title: string;
		lastUpdated: string;
		sections: { heading: string; body: RichText }[];
	};
	notFoundPage: {
		heading: string;
		text?: string;
		suggestions?: { link: Link; description?: string }[];
		homeButtonLabel?: string;
	};
	courseOptionsSection: {
		heading: SectionHeading;
		noDatesText?: string;
		noDatesButtonLabel?: string;
		detailsLinkLabel?: string;
	};
	testimonialsSection: { heading: SectionHeading; items: Testimonial[] };
	callToAction: {
		heading: string;
		text?: string;
		enrolLabel?: string;
		contactLabel?: string;
	};
	header: { menu: Link[]; enrolLabel?: string; noDatesLabel?: string };
	footer: {
		tagline?: string;
		linksHeading?: string;
		links: Link[];
		contactHeading?: string;
		privacyLinkLabel?: string;
	};
	contactForm: {
		heading?: string;
		intro?: string;
		nameLabel: string;
		emailLabel: string;
		sittingLabel: string;
		optionalLabel?: string;
		sittingPlaceholder: string;
		notSureOption: string;
		messageLabel: string;
		submitLabel: string;
		sendingLabel: string;
		privacyText?: string;
		privacyLinkLabel?: string;
		successHeading: string;
		successText?: string;
		nameError: string;
		emailError: string;
		messageError: string;
		sendError: RichText;
		unavailableError: RichText;
		emailHeading?: string;
		venueHeading?: string;
		mapLinkLabel?: string;
	};
	siteSettings: {
		siteName: string;
		email: string;
		location: {
			name: string;
			streetAddress: string;
			locality: string;
			region: string;
			postcode: string;
			mapQuery: string;
		};
		logo: SanityImage;
		siteIcon?: SanityImage;
		defaultDescription?: string;
		shareImage?: ImageWithAlt;
	};
	faculty: Faculty[];
	testimonial: Testimonial[];
};

// Async so Draft Mode can later swap in a live Sanity fetch without changing callers.
export async function getContent(): Promise<Content> {
	return content as unknown as Content;
}

// "Friday 24 July 2026", in Sydney time.
export function formatCourseDate(iso: string) {
	return new Date(iso).toLocaleDateString("en-AU", {
		timeZone: "Australia/Sydney",
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}

// A Sanity CDN URL for an image at a given size. `fit=crop` respects the editor's crop and
// focus point when both width and height are given.
export function imageUrl(
	image: SanityImage,
	{ width, height, format }: { width?: number; height?: number; format?: "png" | "jpg" } = {},
) {
	const params = new URLSearchParams();
	if (width) params.set("w", String(width));
	if (height) params.set("h", String(height));
	if (width && height) params.set("fit", "crop");
	if (image.crop) {
		const { width: w, height: h } = image.asset;
		const { top, bottom, left, right } = image.crop;
		params.set(
			"rect",
			[left * w, top * h, (1 - left - right) * w, (1 - top - bottom) * h]
				.map(Math.round)
				.join(","),
		);
	}
	if (image.hotspot) {
		params.set("crop", "focalpoint");
		params.set("fp-x", String(image.hotspot.x));
		params.set("fp-y", String(image.hotspot.y));
	}
	params.set(format ? "fm" : "auto", format ?? "format");
	return `${image.asset.url}?${params}`;
}

// Where a Sanity link points: a page on this site or another website.
export function linkHref(link: Link) {
	return { href: link.page ?? link.url ?? "/", external: !link.page };
}

// "Level 3 WECC, Westmead Hospital, …, Westmead NSW 2145, Australia"
export function formatAddress(location: Content["siteSettings"]["location"]) {
	return `${location.streetAddress}, ${location.locality} ${location.region} ${location.postcode}, Australia`;
}

// Rich text as plain text, with live values filled in. For places that can only show a
// string, such as messages returned by the contact form's server action.
export function toPlainText(value: RichText, { siteSettings, courseDates, inPersonCourse }: Content) {
	const live: Record<LiveValue["_type"], string> = {
		contactEmail: siteSettings.email,
		nextCourseDate: formatCourseDate(courseDates.inPerson.startDate),
		nextCourseVenue: inPersonCourse.venue,
	};
	return value
		.map((block) =>
			block.children.map((child) => (child._type === "span" ? child.text : live[child._type])).join(""),
		)
		.join("\n\n");
}

const SYDNEY = "Australia/Sydney";

// "Fri 24 July 2026", or "Thu 25 June" without the year.
export function formatShortDate(iso: string, { year = true } = {}) {
	return new Date(iso).toLocaleDateString("en-AU", {
		timeZone: SYDNEY,
		weekday: "short",
		day: "numeric",
		month: "long",
		...(year && { year: "numeric" }),
	});
}

// "8:00am", in Sydney time.
export function formatTime(iso: string) {
	const parts = new Intl.DateTimeFormat("en-AU", {
		timeZone: SYDNEY,
		hour: "numeric",
		minute: "2-digit",
	}).formatToParts(new Date(iso));
	const part = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
	return `${part("hour")}:${part("minute")}${part("dayPeriod").toLowerCase()}`;
}

// "8:00am–5:00pm"
export function formatTimeRange(start: string, end: string) {
	return `${formatTime(start)}–${formatTime(end)}`;
}

// URL fragment for a faculty member's About Us card, from their name:
// "Dr Úna Nic Ionmhain" -> "una-nic-ionmhain", as in /about-us/#una-nic-ionmhain.
export function facultySlug(name: string) {
	return name
		.replace(/^(Dr|A\/Prof)\.?\s+/, "")
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}
