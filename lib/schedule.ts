import { freeSession, nextCourse } from "@/lib/content";

// Set in next.config.ts when the site is built, so pages stay fully static. A session counts
// as past once the build happens after it ends, so redeploy (any push) after each course.
const builtAt = Number(process.env.BUILD_TIMESTAMP ?? Date.now());

// The year the site was built, e.g. for the copyright line.
export const buildYear = new Date(builtAt).getFullYear();

// Whether each session was still ahead of us when the site was built.
export async function getSchedule() {
	return {
		inPersonUpcoming: builtAt < Date.parse(nextCourse.endDate),
		tasterUpcoming: builtAt < Date.parse(freeSession.endDate),
	};
}
