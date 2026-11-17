"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

// The banner's wording. The early bird part is checked in the browser, so it drops out after
// the deadline without a rebuild; the static HTML uses the build-time answer.
export default function AnnouncementText({
	earlyBirdEnds,
	earlyBirdAtBuild,
	earlyBirdLabel,
	shortDate,
	longDate,
	sitting,
}: {
	earlyBirdEnds: number;
	earlyBirdAtBuild: boolean;
	earlyBirdLabel: { short: string; long: string };
	shortDate: string;
	longDate: string;
	sitting: string;
}) {
	const earlyBird = useSyncExternalStore(
		noopSubscribe,
		() => Date.now() < earlyBirdEnds,
		() => earlyBirdAtBuild,
	);

	return (
		<>
			<span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary">
				{earlyBird ? "Early bird" : "Enrolments open"}
			</span>
			<span className="lg:hidden">
				{earlyBird ? `${shortDate} · ends ${earlyBirdLabel.short}` : `${shortDate} course`}
			</span>
			<span className="hidden lg:inline">
				{earlyBird
					? `Enrolments open for ${longDate} (ACEM sitting ${sitting}) · Early bird rate ends ${earlyBirdLabel.long}`
					: `${longDate} (ACEM sitting ${sitting})`}
			</span>
		</>
	);
}
