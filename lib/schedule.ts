import { getContent } from "@/lib/cms";

// Set in next.config.ts when the site is built, so pages stay fully static. A course counts
// as past once the build happens after it ends; publishing in Sanity (or any push) rebuilds.
const builtAt = Number(process.env.BUILD_TIMESTAMP ?? Date.now());

// The year the site was built, e.g. for the copyright line.
export const buildYear = new Date(builtAt).getFullYear();

// Whether each course was still ahead of us when the site was built (dates from Dates and
// booking in Sanity).
export async function getSchedule() {
	const { courseDates } = await getContent();
	return {
		inPersonUpcoming: builtAt < Date.parse(courseDates.inPerson.endDate),
		tasterUpcoming: builtAt < Date.parse(courseDates.taster.endDate),
	};
}
