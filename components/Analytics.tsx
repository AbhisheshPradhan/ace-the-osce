"use client";

import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";
import { useEffect } from "react";

// Loads GA4 and records clicks on any Humanitix (enrolment) link as an `enrol_click` event.
export default function Analytics({ gaId }: { gaId: string }) {
	useEffect(() => {
		const onClick = (event: MouseEvent) => {
			const link = (event.target as Element | null)?.closest?.("a");
			if (!link?.href.startsWith("https://events.humanitix.com")) return;
			sendGAEvent("event", "enrol_click", {
				link_text: link.textContent?.trim(),
				page_path: window.location.pathname,
			});
		};
		document.addEventListener("click", onClick);
		return () => document.removeEventListener("click", onClick);
	}, []);

	return <GoogleAnalytics gaId={gaId} />;
}
