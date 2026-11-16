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
	const { showOnlineOption = true, taster } = courseDates;
	// A dated online session (e.g. the Evening Taster) that hasn't ended yet.
	const tasterUpcoming = showOnlineOption && !!taster && builtAt < Date.parse(taster.endDate);
	return {
		inPersonUpcoming: builtAt < Date.parse(courseDates.inPerson.endDate),
		tasterUpcoming,
		// The free online option can be booked: always when it has no dates (course materials),
		// otherwise until its session ends.
		onlineOptionAvailable: showOnlineOption && (!taster || tasterUpcoming),
	};
}

// The link-preview image: the dated course one while that course is ahead, otherwise the
// evergreen one. Switches back on the first build after the course ends.
export async function getShareImage() {
	const { siteSettings } = await getContent();
	const { inPersonUpcoming } = await getSchedule();
	return (inPersonUpcoming && siteSettings.courseShareImage) || siteSettings.shareImage;
}
