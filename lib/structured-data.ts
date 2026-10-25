import { getContent, imageUrl, toPlainText, type Content, type Course } from "@/lib/cms";
import { site } from "@/lib/content";
import { getSchedule } from "@/lib/schedule";

// schema.org data for search engines (Google event listings, organisation details), built
// from the content in Sanity.

const organizationId = `${site.url}/#organization`;

export async function getOrganization() {
	const { siteSettings } = await getContent();
	return {
		"@type": "EducationalOrganization",
		"@id": organizationId,
		name: siteSettings.siteName,
		url: site.url,
		email: siteSettings.email,
		foundingDate: String(site.foundedYear),
	};
}

function event(
	content: Content,
	course: Course,
	dates: { startDate: string; endDate: string },
	online: boolean,
) {
	const { siteSettings, courseDates } = content;
	const { location } = siteSettings;
	return {
		"@type": "Event",
		name: `${siteSettings.siteName}: ${course.title}`,
		description: toPlainText(course.description.slice(0, 1), content),
		startDate: dates.startDate,
		endDate: dates.endDate,
		eventStatus: "https://schema.org/EventScheduled",
		eventAttendanceMode: online
			? "https://schema.org/OnlineEventAttendanceMode"
			: "https://schema.org/OfflineEventAttendanceMode",
		location: online
			? { "@type": "VirtualLocation", url: courseDates.bookingUrl }
			: {
					"@type": "Place",
					name: location.name,
					address: {
						"@type": "PostalAddress",
						streetAddress: location.streetAddress,
						addressLocality: location.locality,
						addressRegion: location.region,
						postalCode: location.postcode,
						addressCountry: "AU",
					},
				},
		image: [imageUrl(course.image, { width: 1200, height: 675, format: "jpg" })],
		organizer: { "@id": organizationId },
		offers: {
			"@type": "Offer",
			url: courseDates.bookingUrl,
			availability: "https://schema.org/InStock",
			// The Evening Taster is free.
			...(online && { price: 0, priceCurrency: "AUD" }),
		},
		...(online && { isAccessibleForFree: true }),
	};
}

// Only advertise events that haven't happened yet.
export async function getUpcomingEvents() {
	const content = await getContent();
	const { inPersonUpcoming, tasterUpcoming } = await getSchedule();
	return [
		...(inPersonUpcoming
			? [event(content, content.inPersonCourse, content.courseDates.inPerson, false)]
			: []),
		...(tasterUpcoming
			? [event(content, content.eveningTaster, content.courseDates.taster, true)]
			: []),
	];
}
