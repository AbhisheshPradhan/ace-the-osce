import { freeSession, nextCourse, site } from "@/lib/content";
import { getSchedule } from "@/lib/schedule";

// schema.org data for search engines (Google event listings, organisation details).

const organizationId = `${site.url}/#organization`;

export const organization = {
	"@type": "EducationalOrganization",
	"@id": organizationId,
	name: site.name,
	url: site.url,
	email: site.email,
	foundingDate: String(site.foundedYear),
};

const place = {
	"@type": "Place",
	name: `${site.location.name}, Westmead Hospital`,
	address: {
		"@type": "PostalAddress",
		streetAddress: site.location.streetAddress,
		addressLocality: site.location.locality,
		addressRegion: site.location.region,
		postalCode: site.location.postcode,
		addressCountry: "AU",
	},
};

const inPersonEvent = {
	"@type": "Event",
	name: "Ace the OSCE: In-Person ACEM OSCE Course",
	description:
		"A full day of coached ACEM Fellowship OSCE practice at the Westmead Simulation Centre, with trial stations, individual coaching and video feedback.",
	startDate: nextCourse.startDate,
	endDate: nextCourse.endDate,
	eventStatus: "https://schema.org/EventScheduled",
	eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
	location: place,
	image: [`${site.url}/images/course/in-person-course.jpg`],
	organizer: { "@id": organizationId },
	offers: {
		"@type": "Offer",
		url: site.enrolUrl,
		availability: "https://schema.org/InStock",
	},
};

const tasterEvent = {
	"@type": "Event",
	name: "Ace the OSCE: Evening Taster (Tips and Tricks)",
	description:
		"A free online introduction to ACEM OSCE preparation, with sample stations, group discussion and practical advice.",
	startDate: freeSession.startDate,
	endDate: freeSession.endDate,
	eventStatus: "https://schema.org/EventScheduled",
	eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
	isAccessibleForFree: true,
	location: { "@type": "VirtualLocation", url: site.enrolUrl },
	image: [`${site.url}/images/course/online-session.jpeg`],
	organizer: { "@id": organizationId },
	offers: {
		"@type": "Offer",
		url: site.enrolUrl,
		price: 0,
		priceCurrency: "AUD",
		availability: "https://schema.org/InStock",
	},
};

// Only advertise events that haven't happened yet.
export async function getUpcomingEvents() {
	const { inPersonUpcoming, tasterUpcoming } = await getSchedule();
	return [
		...(inPersonUpcoming ? [inPersonEvent] : []),
		...(tasterUpcoming ? [tasterEvent] : []),
	];
}
