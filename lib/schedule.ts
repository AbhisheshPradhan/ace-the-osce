import { cacheLife } from "next/cache";
import { freeSession, nextCourse } from "@/lib/content";

// Whether each session is still ahead of us. Cached for a few hours so pages stay
// static but switch to "dates coming soon" on their own once a session has passed.
export async function getSchedule() {
	"use cache";
	cacheLife("hours");
	const now = Date.now();
	return {
		inPersonUpcoming: now < Date.parse(nextCourse.endDate),
		tasterUpcoming: now < Date.parse(freeSession.endDate),
	};
}
