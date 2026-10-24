"use client";

import { useEffect } from "react";

// When a visitor arrives via /about-us/#name (e.g. from a faculty mention), expand that card's bio.
export default function OpenTargetedBio() {
	useEffect(() => {
		const open = () => {
			const id = decodeURIComponent(window.location.hash.slice(1));
			if (!id) return;
			const bio = document.getElementById(id)?.querySelector("details");
			if (bio) bio.open = true;
		};
		open();
		window.addEventListener("hashchange", open);
		return () => window.removeEventListener("hashchange", open);
	}, []);

	return null;
}
