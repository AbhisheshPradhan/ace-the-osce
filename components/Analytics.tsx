"use client";

import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";
import { useEffect } from "react";

// Sends a GA4 event, or does nothing when GA isn't loaded (previews, local dev, no GA id).
export function trackEvent(name: string, params: Record<string, string | undefined> = {}) {
	if (!(window as { dataLayer?: unknown[] }).dataLayer) return;
	sendGAEvent("event", name, params);
}

// Loads GA4 and records link clicks from one listener. Buttons carry a fixed `data-cta` id
// (their text comes from Sanity and can change), so reports stay stable:
// - Humanitix (enrolment) links → `enrol_click`
// - mailto links → `email_click`
// - any other link with `data-cta` → `cta_click`
// Page views, outbound links and scrolling come from GA4's enhanced measurement.
export default function Analytics({ gaId }: { gaId: string }) {
	useEffect(() => {
		const onClick = (event: MouseEvent) => {
			const link = (event.target as Element | null)?.closest?.("a");
			if (!link) return;
			const params = {
				cta: link.dataset.cta,
				link_text: link.textContent?.trim(),
				page_path: window.location.pathname,
			};
			if (link.href.startsWith("https://events.humanitix.com")) {
				trackEvent("enrol_click", params);
			} else if (link.href.startsWith("mailto:")) {
				trackEvent("email_click", params);
			} else if (link.dataset.cta) {
				trackEvent("cta_click", { ...params, link_url: new URL(link.href).pathname });
			}
		};
		document.addEventListener("click", onClick);
		return () => document.removeEventListener("click", onClick);
	}, []);

	return <GoogleAnalytics gaId={gaId} />;
}
