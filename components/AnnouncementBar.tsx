import AnnouncementText from "@/components/AnnouncementText";
import { formatCourseDate, getContent } from "@/lib/cms";
import { builtAt, getSchedule } from "@/lib/schedule";

// Enrolment banner above the header: text only (the header's button handles enrolling).
// Deliberately code-owned (not in Sanity): update the sitting and the early bird deadline here
// each round. The course date comes from Dates and booking; the banner disappears on the
// first build after the course ends.
const SITTING = "2027.1";
const EARLY_BIRD_ENDS = "2026-12-15T23:59:59+11:00"; // end of 15 Dec 2026, Sydney time
const EARLY_BIRD_LABEL = { short: "15 Dec", long: "15 December" };

export async function showAnnouncement() {
	return (await getSchedule()).inPersonUpcoming;
}

export default async function AnnouncementBar() {
	if (!(await showAnnouncement())) return null;
	const { courseDates } = await getContent();
	const start = courseDates.inPerson.startDate;
	// "12 Feb 2027"
	const shortDate = new Date(start).toLocaleDateString("en-AU", {
		timeZone: "Australia/Sydney",
		day: "numeric",
		month: "short",
		year: "numeric",
	});

	return (
		<div className="bg-primary text-white">
			<p className="container mx-auto max-w-7xl flex h-9 items-center justify-center gap-2 whitespace-nowrap px-3 text-sm">
				<AnnouncementText
					earlyBirdEnds={Date.parse(EARLY_BIRD_ENDS)}
					earlyBirdAtBuild={builtAt < Date.parse(EARLY_BIRD_ENDS)}
					earlyBirdLabel={EARLY_BIRD_LABEL}
					shortDate={shortDate}
					longDate={formatCourseDate(start)}
					sitting={SITTING}
				/>
			</p>
		</div>
	);
}
